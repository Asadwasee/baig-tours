import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { bookingValidationRules, validateFields } from '../middlewares/validation.js';

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(bookingValidationRules, validateFields, createBooking);

router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;
