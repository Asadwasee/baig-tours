import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer is required'],
      index: true,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Tour package is required'],
      index: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
      validate: {
        validator: (value) => {
          if (!value) return false;
          const selectedDate = new Date(value);
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          return selectedDate >= startOfToday;
        },
        message: 'Travel date must be today or later',
      },
    },
    adults: {
      type: Number,
      required: [true, 'Adults count is required'],
      min: [1, 'At least one adult is required'],
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'Children count cannot be negative'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'partial', 'refunded'],
      default: 'pending',
    },
    city: {
      type: String,
      trim: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ['web', 'admin', 'phone', 'whatsapp'],
      default: 'web',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;