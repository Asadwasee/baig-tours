import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  updatePaymentStatus,
  exportBookings,
  getBookingVoucher,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.get('/export', protect, exportBookings);
router.patch('/:id/status', protect, updateBookingStatus);
router.patch('/:id/payment-status', protect, updatePaymentStatus);
router.get('/:id/voucher', protect, getBookingVoucher);

router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;
