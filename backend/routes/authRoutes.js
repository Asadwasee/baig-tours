import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  updateAdminPassword,
} from '../controllers/authController.js';
import { loginValidationRules, validateFields } from '../middlewares/validation.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/securityMiddleware.js';

const router = express.Router();

// Public Authentication Routes (Strict Rate Limited)
router.post('/register', authLimiter, registerAdmin);
router.post('/login', authLimiter, loginValidationRules, validateFields, loginAdmin);

// Private Admin Management Routes
router.get('/profile', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);
router.put('/change-password', protect, updateAdminPassword);

export default router;