import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route fully protected with JWT validation
router.get('/summary', protect, getDashboardSummary);

export default router;