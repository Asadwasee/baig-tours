import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    getMonthlyAnalytics,
    getPopularDestinations,
    getDashboardStats,
    getBookingsByCategory,
    getYearlyComparison,
    getCustomerGrowth
} from '../controllers/analyticsController.js';

const router = express.Router();

router.use(protect);
router.get('/dashboard', getDashboardStats);
router.get('/monthly', getMonthlyAnalytics);
router.get('/yearly', getYearlyComparison);
router.get('/popular-destinations', getPopularDestinations);
router.get('/by-category', getBookingsByCategory);
router.get('/customer-growth', getCustomerGrowth);

export default router;