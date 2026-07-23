import express from 'express';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerBookingHistory,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCustomers)
  .post(protect, createCustomer);

router.get('/:id/bookings', protect, getCustomerBookingHistory);

router.route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

export default router;
