import Package from '../models/Package.js';
import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import Review from '../models/Review.js';

// GET ADMIN DASHBOARD SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const totalPackages = await Package.countDocuments({});
    const customerCount = await Customer.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

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
// GET MONTHLY BOOKINGS & REVENUE CHART
export const getMonthlyChartData = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = parseInt(year) || new Date().getFullYear();

    const monthlyData = await Booking.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] },
          createdAt: {
            $gte: new Date(`${targetYear}-01-01`),
            $lte: new Date(`${targetYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { '_id.month': 1 }
      }
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const bookingsData = new Array(12).fill(0);
    const revenueData = new Array(12).fill(0);

    monthlyData.forEach(item => {
      const index = item._id.month - 1;
      bookingsData[index] = item.bookings;
      revenueData[index] = item.revenue;
    });

    // Calculate totals
    const totalBookings = bookingsData.reduce((a, b) => a + b, 0);
    const totalRevenue = revenueData.reduce((a, b) => a + b, 0);

    res.status(200).json({
      success: true,
      message: 'Monthly chart data fetched successfully',
      data: {
        year: targetYear,
        months,
        bookings: bookingsData,
        revenue: revenueData,
        totals: {
          bookings: totalBookings,
          revenue: totalRevenue
        },
        monthlyBreakdown: monthlyData.map(item => ({
          month: months[item._id.month - 1],
          bookings: item.bookings,
          revenue: item.revenue
        }))
      }
    });
  } catch (error) {
    console.error('Monthly Chart Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
// GET POPULAR DESTINATIONS CHART
export const getPopularDestinations = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const destinations = await Booking.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'package',
          foreignField: '_id',
          as: 'packageDetails'
        }
      },
      {
        $unwind: '$packageDetails'
      },
      {
        $group: {
          _id: '$packageDetails.destination',
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { bookings: -1 }
      },
      {
        $limit: parseInt(limit)
      }
    ]);

    // Calculate percentages
    const totalBookings = destinations.reduce((sum, d) => sum + d.bookings, 0);

    const dataWithPercentage = destinations.map(d => ({
      destination: d._id,
      bookings: d.bookings,
      revenue: d.revenue,
      percentage: totalBookings > 0 ? ((d.bookings / totalBookings) * 100).toFixed(1) : 0
    }));

    res.status(200).json({
      success: true,
      message: 'Popular destinations fetched successfully',
      data: dataWithPercentage
    });
  } catch (error) {
    console.error('Popular Destinations Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
// GET BOOKING STATUS DISTRIBUTION (Pie Chart)
export const getBookingStatusDistribution = async (req, res) => {
  try {
    const statusDistribution = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate total and percentages
    const total = statusDistribution.reduce((sum, item) => sum + item.count, 0);
    const dataWithPercentage = statusDistribution.map(item => ({
      status: item._id,
      count: item.count,
      percentage: total > 0 ? ((item.count / total) * 100).toFixed(1) : 0
    }));

    res.status(200).json({
      success: true,
      message: 'Booking status distribution fetched successfully',
      data: dataWithPercentage
    });
  } catch (error) {
    console.error('Status Distribution Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
// GET RECENT BOOKINGS
export const getRecentBookings = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('customer', 'fullName email phone')
      .populate('package', 'title destination price');

    res.status(200).json({
      success: true,
      message: 'Recent bookings fetched successfully',
      data: recentBookings
    });
  } catch (error) {
    console.error('Recent Bookings Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
// GET YEARLY COMPARISON
export const getYearlyComparison = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear];

    const yearlyData = await Promise.all(
      years.map(async (year) => {
        const data = await Booking.aggregate([
          {
            $match: {
              status: { $in: ['confirmed', 'completed'] },
              createdAt: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`)
              }
            }
          },
          {
            $group: {
              _id: null,
              bookings: { $sum: 1 },
              revenue: { $sum: '$totalAmount' }
            }
          }
        ]);

        return {
          year,
          bookings: data.length > 0 ? data[0].bookings : 0,
          revenue: data.length > 0 ? data[0].revenue : 0
        };
      })
    );

    // Calculate growth
    const currentYearData = yearlyData.find(d => d.year === currentYear);
    const prevYearData = yearlyData.find(d => d.year === currentYear - 1);
    
    const bookingsGrowth = prevYearData && prevYearData.bookings > 0
      ? ((currentYearData.bookings - prevYearData.bookings) / prevYearData.bookings * 100).toFixed(1)
      : 0;
    
    const revenueGrowth = prevYearData && prevYearData.revenue > 0
      ? ((currentYearData.revenue - prevYearData.revenue) / prevYearData.revenue * 100).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      message: 'Yearly comparison fetched successfully',
      data: {
        yearlyData,
        growth: {
          bookings: bookingsGrowth,
          revenue: revenueGrowth
        }
      }
    });
  } catch (error) {
    console.error('Yearly Comparison Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
// GET COMPLETE ADMIN DASHBOARD (All Data in One Call)
export const getCompleteDashboard = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentYear = now.getFullYear();

    // Parallel queries for all data
    const [
      totalPackages,
      customerCount,
      totalBookings,
      pendingBookings,
      completedBookings,
      revenueData,
      monthlyData,
      statusDistribution,
      popularDestinations,
      recentBookings
    ] = await Promise.all([
      // Stats
      Package.countDocuments({}),
      Customer.countDocuments({}),
      Booking.countDocuments({}),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'completed' }),
      
      // Total Revenue
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Monthly Data (Current Year)
      Booking.aggregate([
        {
          $match: {
            status: { $in: ['confirmed', 'completed'] },
            createdAt: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { month: { $month: '$createdAt' } },
            bookings: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { '_id.month': 1 } }
      ]),
      
      // Status Distribution
      Booking.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      // Popular Destinations
      Booking.aggregate([
        {
          $match: {
            status: { $in: ['confirmed', 'completed'] }
          }
        },
        {
          $lookup: {
            from: 'packages',
            localField: 'package',
            foreignField: '_id',
            as: 'packageDetails'
          }
        },
        {
          $unwind: '$packageDetails'
        },
        {
          $group: {
            _id: '$packageDetails.destination',
            bookings: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        {
          $sort: { bookings: -1 }
        },
        {
          $limit: 5
        }
      ]),
      
      // Recent Bookings
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('customer', 'fullName email phone')
        .populate('package', 'title destination price')
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Format monthly data for charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const bookingsChart = new Array(12).fill(0);
    const revenueChart = new Array(12).fill(0);

    monthlyData.forEach(item => {
      const index = item._id.month - 1;
      bookingsChart[index] = item.bookings;
      revenueChart[index] = item.revenue;
    });

    // Status distribution with percentages
    const totalStatusCount = statusDistribution.reduce((sum, item) => sum + item.count, 0);
    const statusWithPercentage = statusDistribution.map(item => ({
      status: item._id,
      count: item.count,
      percentage: totalStatusCount > 0 ? ((item.count / totalStatusCount) * 100).toFixed(1) : 0
    }));

    // Popular destinations with percentages
    const totalDestBookings = popularDestinations.reduce((sum, d) => sum + d.bookings, 0);
    const destinationsWithPercentage = popularDestinations.map(d => ({
      destination: d._id,
      bookings: d.bookings,
      revenue: d.revenue,
      percentage: totalDestBookings > 0 ? ((d.bookings / totalDestBookings) * 100).toFixed(1) : 0
    }));

    res.status(200).json({
      success: true,
      message: 'Complete dashboard data fetched successfully',
      data: {
        stats: {
          totalPackages,
          totalBookings,
          pendingBookings,
          completedBookings,
          customerCount,
          totalRevenue,
          currency: 'PKR'
        },
        charts: {
          monthlyBookings: {
            months,
            bookings: bookingsChart,
            revenue: revenueChart
          },
          statusDistribution: statusWithPercentage,
          popularDestinations: destinationsWithPercentage
        },
        recentBookings
      }
    });
  } catch (error) {
    console.error('Complete Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};