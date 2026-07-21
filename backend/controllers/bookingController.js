import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import Package from '../models/Package.js';
import {
  getBookingStatusLabel,
  getStatusTransitionMessage,
  isValidBookingStatus,
} from '../utils/bookingStatus.js';
import { sendBookingStatusEmail } from '../utils/sendEmail.js';

// @desc    Create a booking (With Atomic Concurrency Control)
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const {
      customer,
      customerDetails,
      package: packageId,
      travelDate,
      adults,
      children,
      totalAmount,
      ...rest
    } = req.body;

    const normalizedName = typeof customerDetails?.fullName === 'string'
      ? customerDetails.fullName.trim()
      : typeof customerDetails?.name === 'string'
        ? customerDetails.name.trim()
        : '';
    const normalizedEmail = typeof customerDetails?.email === 'string'
      ? customerDetails.email.trim().toLowerCase()
      : '';
    const normalizedPhone = typeof customerDetails?.phone === 'string'
      ? customerDetails.phone.trim()
      : '';

    if (customer) {
      const customerExists = await Customer.findById(customer);
      if (!customerExists) {
        return res.status(404).json({ message: 'Customer not found with this ID' });
      }
    } else if (!normalizedName || !normalizedEmail || !normalizedPhone) {
      return res.status(400).json({ message: 'Please provide full name, email, and phone number' });
    }

    if (!packageId) {
      return res.status(400).json({ message: 'Please select a tour package' });
    }

    if (!travelDate) {
      return res.status(400).json({ message: 'Travel date is required' });
    }

    const parsedTravelDate = new Date(travelDate);
    if (Number.isNaN(parsedTravelDate.getTime())) {
      return res.status(400).json({ message: 'Travel date is invalid' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedTravelDate < today) {
      return res.status(400).json({ message: 'Travel date must be today or later' });
    }

    const parsedAdults = Number(adults);
    const parsedChildren = Number(children || 0);
    if (!Number.isInteger(parsedAdults) || parsedAdults < 1) {
      return res.status(400).json({ message: 'At least one adult is required' });
    }

    if (!Number.isInteger(parsedChildren) || parsedChildren < 0) {
      return res.status(400).json({ message: 'Children count cannot be negative' });
    }

    const totalSeatsRequested = parsedAdults + parsedChildren;
    if (totalSeatsRequested < 1) {
      return res.status(400).json({ message: 'Please select at least one traveler' });
    }

    const parsedTotalAmount = totalAmount === undefined || totalAmount === '' ? null : Number(totalAmount);
    if (parsedTotalAmount !== null && (!Number.isFinite(parsedTotalAmount) || parsedTotalAmount < 0)) {
      return res.status(400).json({ message: 'Total amount must be a valid positive number' });
    }

    // Atomic seat reservation to avoid race conditions
    const reservedPackage = await Package.findOneAndUpdate(
      { _id: packageId, availableSeats: { $gte: totalSeatsRequested } },
      { $inc: { availableSeats: -totalSeatsRequested } },
      { new: true }
    );

    if (!reservedPackage) {
      const checkPackage = await Package.findById(packageId);
      if (!checkPackage) {
        return res.status(404).json({ message: 'Package not found' });
      }
      return res.status(400).json({
        message: `Booking failed. Only ${checkPackage.availableSeats} seats are available for this package.`
      });
    }

    let finalCustomerId;
    if (customer) {
      finalCustomerId = customer;
    } else {
      let existingCustomer = await Customer.findOne({ email: normalizedEmail });
      if (!existingCustomer) {
        existingCustomer = await Customer.create({
          fullName: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          whatsappNumber: customerDetails?.whatsappNumber || '',
          city: customerDetails?.city || '',
          cnic: customerDetails?.cnic || customerDetails?.passportNumber || '',
          passportNumber: customerDetails?.passportNumber || customerDetails?.cnic || '',
        });
      }
      finalCustomerId = existingCustomer._id;
    }

    const activePrice = reservedPackage.discountPrice || reservedPackage.price;
    const finalAmount = parsedTotalAmount ?? (activePrice * totalSeatsRequested);

    const booking = await Booking.create({
      customer: finalCustomerId,
      package: packageId,
      travelDate: parsedTravelDate,
      adults: parsedAdults,
      children: parsedChildren,
      totalAmount: finalAmount,
      city: req.body.city || customerDetails?.city || '',
      whatsappNumber: req.body.whatsappNumber || customerDetails?.whatsappNumber || '',
      ...rest,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'fullName email phone whatsappNumber city')
      .populate('package', 'title destination price');

    // Send emails in parallel
    const statusLabel = getBookingStatusLabel(populatedBooking.status);

    Promise.allSettled([
      sendBookingStatusEmail({
        to: populatedBooking.customer.email,
        customerName: populatedBooking.customer.fullName,
        bookingId: populatedBooking._id.toString(),
        status: statusLabel,
        message: `Thank you for choosing Baig Tours! Your booking request for "${populatedBooking.package.title}" has been successfully submitted and is currently pending review.`,
      }),
      sendBookingStatusEmail({
        to: process.env.EMAIL_TO || 'admin@baigtours.com',
        customerName: 'Admin Team',
        bookingId: populatedBooking._id.toString(),
        status: 'New Booking Submitted',
        message: `Alert: A new booking request has been created by ${populatedBooking.customer.fullName} for the package "${populatedBooking.package.title}". Please review it in the admin dashboard.`,
      })
    ]).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Booking email ${index === 0 ? 'Customer' : 'Admin'} failed:`, result.reason);
        }
      });
    });

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 })
      .populate('customer', 'fullName email phone whatsappNumber city')
      .populate('package', 'title destination price');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private/Admin
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'fullName email phone whatsappNumber city')
      .populate('package', 'title destination price');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking (With Correct Seat Sync Logic)
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.body.status && !isValidBookingStatus(req.body.status)) {
      return res.status(400).json({ message: 'Invalid booking status' });
    }

    const previousStatus = booking.status;
    const newStatus = req.body.status;
    const totalSeats = (booking.adults || 0) + (booking.children || 0);

    // Handle seat logic on status transition
    if (newStatus && newStatus !== previousStatus) {
      if (newStatus === 'cancelled' && previousStatus !== 'cancelled') {
        // Return seats to package
        await Package.updateOne(
          { _id: booking.package },
          { $inc: { availableSeats: totalSeats } }
        );
      } else if (previousStatus === 'cancelled' && newStatus !== 'cancelled') {
        // Re-deduct seats if reactivating booking
        const reactivated = await Package.findOneAndUpdate(
          { _id: booking.package, availableSeats: { $gte: totalSeats } },
          { $inc: { availableSeats: -totalSeats } },
          { new: true }
        );

        if (!reactivated) {
          return res.status(400).json({
            message: 'Re-activation failed. Not enough available seats in this package.'
          });
        }
      }
    }

    if (req.body.customerDetails) {
      const customer = await Customer.findById(booking.customer);
      if (customer) {
        if (req.body.customerDetails.fullName) customer.fullName = req.body.customerDetails.fullName;
        if (req.body.customerDetails.email) customer.email = req.body.customerDetails.email.toLowerCase();
        if (req.body.customerDetails.phone) customer.phone = req.body.customerDetails.phone;
        if (req.body.customerDetails.whatsappNumber) customer.whatsappNumber = req.body.customerDetails.whatsappNumber;
        if (req.body.customerDetails.city) customer.city = req.body.customerDetails.city;
        if (req.body.customerDetails.cnic) customer.cnic = req.body.customerDetails.cnic;
        if (req.body.customerDetails.passportNumber) customer.passportNumber = req.body.customerDetails.passportNumber;
        await customer.save();
      }
    }

    Object.assign(booking, req.body);
    const updatedBooking = await booking.save();

    if (newStatus && newStatus !== previousStatus) {
      const customer = await Customer.findById(updatedBooking.customer);
      const statusLabel = getBookingStatusLabel(newStatus);
      const statusMessage = getStatusTransitionMessage(newStatus);

      await sendBookingStatusEmail({
        to: customer?.email || process.env.EMAIL_TO || 'admin@baigtours.com',
        customerName: customer?.fullName || 'Customer',
        bookingId: updatedBooking._id.toString(),
        status: statusLabel,
        message: statusMessage,
      });
    }

    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('customer', 'fullName email phone whatsappNumber city')
      .populate('package', 'title destination price');

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'cancelled') {
      const totalSeats = (booking.adults || 0) + (booking.children || 0);
      await Package.updateOne(
        { _id: booking.package },
        { $inc: { availableSeats: totalSeats } }
      );
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate Printable Booking Voucher HTML
// @route   GET /api/bookings/:id/voucher
// @access  Private/Admin
export const getBookingVoucher = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'fullName email phone city whatsappNumber cnic passportNumber')
      .populate('package', 'title destination price duration durationDays durationNights itinerary');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const htmlVoucher = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Booking Voucher - ${booking._id}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #333; background: #fff; }
        .voucher-card { max-width: 800px; margin: 0 auto; border: 2px solid #0284c7; border-radius: 12px; padding: 30px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e0f2fe; padding-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #0284c7; }
        .badge { background: #0284c7; color: white; padding: 6px 16px; border-radius: 20px; font-weight: bold; text-transform: uppercase; font-size: 12px; }
        .section { margin-top: 25px; }
        .section-title { font-size: 16px; font-weight: bold; color: #0369a1; border-bottom: 1px solid #bae6fd; padding-bottom: 6px; margin-bottom: 12px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px; }
        .label { font-weight: 600; color: #64748b; }
        .val { color: #0f172a; font-weight: 500; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px; }
        @media print {
          body { padding: 0; }
          .voucher-card { border: none; }
        }
      </style>
    </head>
    <body>
      <div class="voucher-card">
        <div class="header">
          <div class="logo">BAIG TOURS</div>
          <div>
            <span class="badge">${booking.status}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">BOOKING CONFIRMATION VOUCHER</div>
          <div class="grid">
            <div><span class="label">Voucher / Booking ID:</span> <span class="val">${booking._id}</span></div>
            <div><span class="label">Booking Date:</span> <span class="val">${new Date(booking.createdAt).toLocaleDateString()}</span></div>
            <div><span class="label">Travel Date:</span> <span class="val">${new Date(booking.travelDate).toLocaleDateString()}</span></div>
            <div><span class="label">Payment Status:</span> <span class="val">${booking.paymentStatus.toUpperCase()}</span></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">CUSTOMER DETAILS</div>
          <div class="grid">
            <div><span class="label">Full Name:</span> <span class="val">${booking.customer?.fullName || 'N/A'}</span></div>
            <div><span class="label">Email Address:</span> <span class="val">${booking.customer?.email || 'N/A'}</span></div>
            <div><span class="label">Phone:</span> <span class="val">${booking.customer?.phone || 'N/A'}</span></div>
            <div><span class="label">WhatsApp:</span> <span class="val">${booking.whatsappNumber || booking.customer?.whatsappNumber || 'N/A'}</span></div>
            <div><span class="label">City:</span> <span class="val">${booking.city || booking.customer?.city || 'N/A'}</span></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">TOUR PACKAGE DETAILS</div>
          <div class="grid">
            <div><span class="label">Package Name:</span> <span class="val">${booking.package?.title || 'N/A'}</span></div>
            <div><span class="label">Destination:</span> <span class="val">${booking.package?.destination || 'N/A'}</span></div>
            <div><span class="label">Travelers:</span> <span class="val">${booking.adults} Adults, ${booking.children} Children</span></div>
            <div><span class="label">Total Amount:</span> <span class="val">${booking.currency} ${booking.totalAmount?.toLocaleString()}</span></div>
          </div>
        </div>

        ${booking.specialRequests ? `
        <div class="section">
          <div class="section-title">SPECIAL REQUESTS</div>
          <p style="font-size: 14px; color: #334155;">${booking.specialRequests}</p>
        </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for booking with Baig Tours! For queries, contact support at support@baigtours.com</p>
          <p>This voucher is system generated and valid without a physical signature.</p>
        </div>
      </div>
      <script>
        if (window.location.search.includes('print=true')) {
          window.print();
        }
      </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(htmlVoucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export All Bookings to CSV Format
// @route   GET /api/bookings/export/csv
// @access  Private/Admin
export const exportBookingsCSV = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .populate('customer', 'fullName email phone city whatsappNumber')
      .populate('package', 'title destination price');

    const headers = [
      'Booking ID',
      'Customer Name',
      'Customer Email',
      'Phone',
      'City',
      'Package Title',
      'Destination',
      'Travel Date',
      'Adults',
      'Children',
      'Total Amount (PKR)',
      'Status',
      'Payment Status',
      'Created At'
    ].join(',');

    const rows = bookings.map(b => [
      `"${b._id}"`,
      `"${b.customer?.fullName || ''}"`,
      `"${b.customer?.email || ''}"`,
      `"${b.customer?.phone || ''}"`,
      `"${b.city || b.customer?.city || ''}"`,
      `"${b.package?.title || ''}"`,
      `"${b.package?.destination || ''}"`,
      `"${new Date(b.travelDate).toISOString().split('T')[0]}"`,
      b.adults || 0,
      b.children || 0,
      b.totalAmount || 0,
      `"${b.status}"`,
      `"${b.paymentStatus}"`,
      `"${new Date(b.createdAt).toISOString().split('T')[0]}"`
    ].join(','));

    const csvContent = [headers, ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=baig_tours_bookings.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};