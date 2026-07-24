import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    getDashboardSummary,
    getMonthlyChartData,
    getPopularDestinations,
    getBookingStatusDistribution,
    getRecentBookings,
    getYearlyComparison,
    getCompleteDashboard,
    getBookingsByCategory,
    getCustomerGrowth
} from '../controllers/dashboardController.js';

const router = express.Router();

router.use(protect);
router.get('/summary', getDashboardSummary);
router.get('/complete', getCompleteDashboard);
router.get('/monthly-chart', getMonthlyChartData);
router.get('/popular-destinations', getPopularDestinations);
router.get('/status-distribution', getBookingStatusDistribution);
router.get('/recent-bookings', getRecentBookings);
router.get('/yearly-comparison', getYearlyComparison);
router.get('/bookings-by-category', getBookingsByCategory);
router.get('/customer-growth', getCustomerGrowth);

export default router;