import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import Package from '../models/Package.js';
import {
  getBookingStatusLabel,
  getStatusTransitionMessage,
  isValidBookingStatus,
} from '../utils/bookingStatus.js';
import { sendBookingStatusEmail } from '../utils/sendEmail.js';

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
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'fullName email phone')
      .populate('package', 'title destination price');

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

    if (req.body.status && !isValidBookingStatus(req.body.status)) {
      return res.status(400).json({ message: 'Invalid booking status' });
    }

    if (req.body.status === 'cancelled' && booking.status !== 'cancelled') {
      const tourPackage = await Package.findById(booking.package);
      if (tourPackage) {
        const totalSeats = (booking.adults || 0) + (booking.children || 0);
        tourPackage.availableSeats += totalSeats;
        await tourPackage.save();
      }
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

    const previousStatus = booking.status;
    Object.assign(booking, req.body);
    const updatedBooking = await booking.save();

    if (req.body.status && req.body.status !== previousStatus) {
      const customer = await Customer.findById(updatedBooking.customer);
      const statusLabel = getBookingStatusLabel(req.body.status);
      const statusMessage = getStatusTransitionMessage(req.body.status);

      await sendBookingStatusEmail({
        to: customer?.email || process.env.EMAIL_TO || 'admin@baigtours.com',
        customerName: customer?.fullName || 'Customer',
        bookingId: updatedBooking._id.toString(),
        status: statusLabel,
        message: statusMessage,
      });
    }

    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('customer', 'fullName email phone')
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

    // Delete hone par bhi package seats restore karein
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