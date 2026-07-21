import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingVoucher,
  exportBookingsCSV,
} from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { bookingValidationRules, validateFields } from '../middlewares/validation.js';

const router = express.Router();

// Base Routes
router.route('/')
  .get(protect, getBookings)
  .post(bookingValidationRules, validateFields, createBooking);

// Special Routes (Must be before /:id)
router.get('/export/csv', protect, exportBookingsCSV);
router.get('/:id/voucher', protect, getBookingVoucher);

// ID Specific Routes
router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;