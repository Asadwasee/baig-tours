import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import Package from '../models/Package.js';

const VALID_BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];
const VALID_PAYMENT_STATUSES = ['pending', 'paid', 'partial', 'refunded'];

const populateBookingData = async (bookingId) => {
  return Booking.findById(bookingId)
    .populate('customer', 'fullName email phone')
    .populate('package', 'title destination price availableSeats');
};

const adjustPackageSeats = async (booking, nextStatus) => {
  const tourPackage = await Package.findById(booking.package);
  if (!tourPackage) return;

  const totalSeats = (booking.adults || 0) + (booking.children || 0);

  if (booking.status !== nextStatus) {
    if (booking.status !== 'cancelled' && nextStatus === 'cancelled') {
      tourPackage.availableSeats += totalSeats;
    }

    if (booking.status === 'cancelled' && nextStatus !== 'cancelled') {
      tourPackage.availableSeats -= totalSeats;
    }

    await tourPackage.save();
  }
};

const createCsvLine = (values) => values.map((value) => {
  const normalized = `${value ?? ''}`.replace(/"/g, '""');
  return `"${normalized}"`;
}).join(',');

const createBookingInvoiceData = (booking) => {
  const customer = booking.customer || {};
  const packageInfo = booking.package || {};

  return {
    bookingId: booking._id.toString(),
    customerName: customer.fullName || 'N/A',
    customerEmail: customer.email || 'N/A',
    customerPhone: customer.phone || 'N/A',
    packageTitle: packageInfo.title || 'N/A',
    destination: packageInfo.destination || 'N/A',
    travelDate: booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-PK') : 'N/A',
    adults: booking.adults || 0,
    children: booking.children || 0,
    totalAmount: booking.totalAmount || 0,
    currency: booking.currency || 'PKR',
    status: booking.status || 'pending',
    paymentStatus: booking.paymentStatus || 'pending',
    source: booking.source || 'web',
  };
};

const createPdfFromBookings = (bookings) => {
  const lines = bookings.map((booking) => {
    const invoice = createBookingInvoiceData(booking);
    return `Booking ${invoice.bookingId} | ${invoice.customerName} | ${invoice.packageTitle} | ${invoice.status} | ${invoice.paymentStatus} | ${invoice.totalAmount} ${invoice.currency}`;
  });

  const contentLines = lines.length ? lines : ['No bookings available'];
  const textStream = contentLines
    .map((line) => `BT /F1 10 Tf 50 ${780 - (contentLines.indexOf(line) * 14)} Td (${line.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}) Tj ET`)
    .join('\n');

  const pdf = [
    '%PDF-1.4',
    '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj',
    '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj',
    '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>endobj',
    '4 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj',
    '5 0 obj<< /Length ' + Buffer.byteLength(textStream, 'utf8') + ' >>stream\n' + textStream + '\nendstream',
    'endobj',
    'xref',
    '0 6',
    '0000000000 65535 f ',
    '0000000010 00000 n ',
    '0000000062 00000 n ',
    '0000000123 00000 n ',
    '0000000241 00000 n ',
    '0000000360 00000 n ',
    'trailer',
    '<< /Root 1 0 R /Size 6 >>',
    'startxref',
    '420',
    '%%EOF'
  ].join('\n');

  return Buffer.from(pdf, 'utf8');
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private/Admin
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
          cnic: customerDetails?.cnic || customerDetails?.passportNumber || '',
          passportNumber: customerDetails?.passportNumber || customerDetails?.cnic || '',
        });
      }
      finalCustomerId = existingCustomer._id;
    }

    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (packageExists.availableSeats < totalSeatsRequested) {
      return res.status(400).json({
        message: `Booking failed. Only ${packageExists.availableSeats} seats are available for this package.`
      });
    }

    const activePrice = packageExists.discountPrice || packageExists.price;
    const finalAmount = parsedTotalAmount ?? (activePrice * totalSeatsRequested);

    const booking = await Booking.create({
      customer: finalCustomerId,
      package: packageId,
      travelDate: parsedTravelDate,
      adults: parsedAdults,
      children: parsedChildren,
      totalAmount: finalAmount,
      ...rest,
    });

    packageExists.availableSeats -= totalSeatsRequested;
    await packageExists.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'fullName email phone')
      .populate('package', 'title destination price');

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
      .populate('customer', 'fullName email phone')
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
    const booking = await populateBookingData(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.body.status === 'cancelled' && booking.status !== 'cancelled') {
      await adjustPackageSeats(booking, 'cancelled');
    }

    if (req.body.customerDetails) {
      const customer = await Customer.findById(booking.customer);
      if (customer) {
        if (req.body.customerDetails.fullName) {
          customer.fullName = req.body.customerDetails.fullName;
        }
        if (req.body.customerDetails.email) {
          customer.email = req.body.customerDetails.email.toLowerCase();
        }
        if (req.body.customerDetails.phone) {
          customer.phone = req.body.customerDetails.phone;
        }
        if (req.body.customerDetails.cnic) {
          customer.cnic = req.body.customerDetails.cnic;
        }
        if (req.body.customerDetails.passportNumber) {
          customer.passportNumber = req.body.customerDetails.passportNumber;
        }
        await customer.save();
      }
    }

    Object.assign(booking, req.body);
    const updatedBooking = await booking.save();
    const populatedBooking = await populateBookingData(updatedBooking._id);

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!VALID_BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid booking status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await adjustPackageSeats(booking, status);
    booking.status = status;
    const updatedBooking = await booking.save();
    const populatedBooking = await populateBookingData(updatedBooking._id);

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking payment status
// @route   PATCH /api/bookings/:id/payment-status
// @access  Private/Admin
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!VALID_PAYMENT_STATUSES.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = paymentStatus;
    const updatedBooking = await booking.save();
    const populatedBooking = await populateBookingData(updatedBooking._id);

    res.json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export bookings
// @route   GET /api/bookings/export
// @access  Private/Admin
export const exportBookings = async (req, res) => {
  try {
    const { format = 'excel', status, paymentStatus } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 })
      .populate('customer', 'fullName email phone')
      .populate('package', 'title destination price');

    if (format === 'pdf') {
      const pdfBuffer = createPdfFromBookings(bookings);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="baig-tours-bookings.pdf"');
      return res.send(pdfBuffer);
    }

    const header = [
      'Booking ID',
      'Customer Name',
      'Email',
      'Phone',
      'Package',
      'Destination',
      'Travel Date',
      'Adults',
      'Children',
      'Total Amount',
      'Status',
      'Payment Status',
      'Source',
    ];

    const rows = bookings.map((booking) => createBookingInvoiceData(booking));
    const csvLines = [createCsvLine(header), ...rows.map((row) => createCsvLine([
      row.bookingId,
      row.customerName,
      row.customerEmail,
      row.customerPhone,
      row.packageTitle,
      row.destination,
      row.travelDate,
      row.adults,
      row.children,
      `${row.totalAmount} ${row.currency}`,
      row.status,
      row.paymentStatus,
      row.source,
    ]))];

    res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="baig-tours-bookings.xls"');
    res.send(csvLines.join('\r\n'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking voucher printable content
// @route   GET /api/bookings/:id/voucher
// @access  Private/Admin
export const getBookingVoucher = async (req, res) => {
  try {
    const booking = await populateBookingData(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const invoice = createBookingInvoiceData(booking);
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Booking Voucher</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
    .voucher { max-width: 720px; margin: 0 auto; border: 1px solid #d1d5db; border-radius: 12px; padding: 24px; }
    .title { font-size: 28px; font-weight: 700; margin-bottom: 12px; }
    .meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 16px 0; }
    .row { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .label { font-weight: 700; }
    @media print { body { margin: 0; } .voucher { border: none; } }
  </style>
</head>
<body>
  <div class="voucher">
    <div class="title">Baig Tours - Booking Voucher</div>
    <div class="row"><span class="label">Booking ID:</span> ${invoice.bookingId}</div>
    <div class="row"><span class="label">Customer:</span> ${invoice.customerName}</div>
    <div class="row"><span class="label">Email:</span> ${invoice.customerEmail}</div>
    <div class="row"><span class="label">Phone:</span> ${invoice.customerPhone}</div>
    <div class="row"><span class="label">Package:</span> ${invoice.packageTitle}</div>
    <div class="row"><span class="label">Destination:</span> ${invoice.destination}</div>
    <div class="row"><span class="label">Travel Date:</span> ${invoice.travelDate}</div>
    <div class="row"><span class="label">Travelers:</span> ${invoice.adults} adults, ${invoice.children} children</div>
    <div class="row"><span class="label">Total Amount:</span> ${invoice.totalAmount} ${invoice.currency}</div>
    <div class="row"><span class="label">Booking Status:</span> ${invoice.status}</div>
    <div class="row"><span class="label">Payment Status:</span> ${invoice.paymentStatus}</div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
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
      const tourPackage = await Package.findById(booking.package);
      if (tourPackage) {
        const totalSeats = (booking.adults || 0) + (booking.children || 0);
        tourPackage.availableSeats += totalSeats;
        await tourPackage.save();
      }
    }

    await booking.deleteOne();
    res.json({ message: 'Booking removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};