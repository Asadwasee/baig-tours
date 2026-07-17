import Package from '../models/Package.js';
import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';

// @desc    Get Admin Dashboard Summary Analytics
// @route   GET /api/dashboard/summary
// @access  Private/Admin
export const getDashboardSummary = async (req, res) => {
  try {
    // 1. Total Packages Count
    const totalPackages = await Package.countDocuments({});

    // 2. Total Customers Count
    const customerCount = await Customer.countDocuments({});

    // 3. Total Bookings Count
    const totalBookings = await Booking.countDocuments({});

    // 4. Pending Bookings Count
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    // 5. Completed Bookings Count
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    // 6. Total Revenue Aggregation (Sum of paid bookings)
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Final Response sending to Client
    res.status(200).json({
      success: true,
      data: {
        totalPackages,
        totalBookings,
        pendingBookings,
        completedBookings,
        customerCount,
        totalRevenue,
        currency: 'PKR'
      }
    });

  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during dashboard fetch'
    });
  }
};