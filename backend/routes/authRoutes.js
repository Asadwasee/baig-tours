import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';
import { loginValidationRules, validateFields } from '../middlewares/validation.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginValidationRules, validateFields, loginAdmin);

export default router;
