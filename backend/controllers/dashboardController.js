import Package from '../models/Package.js';
import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// @desc    GET ADMIN DASHBOARD SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const totalPackages = await Package.countDocuments({});
    const customerCount = await Customer.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const revenueData = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET MONTHLY BOOKINGS & REVENUE CHART
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
      { $sort: { '_id.month': 1 } }
    ]);

    const bookingsData = new Array(12).fill(0);
    const revenueData = new Array(12).fill(0);

    monthlyData.forEach(item => {
      const index = item._id.month - 1;
      bookingsData[index] = item.bookings;
      revenueData[index] = item.revenue;
    });

    res.status(200).json({
      success: true,
      message: 'Monthly chart data fetched successfully',
      data: {
        year: targetYear,
        months: MONTHS,
        bookings: bookingsData,
        revenue: revenueData,
        totals: {
          bookings: bookingsData.reduce((a, b) => a + b, 0),
          revenue: revenueData.reduce((a, b) => a + b, 0)
        }
      }
    });
  } catch (error) {
    console.error('Monthly Chart Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET POPULAR DESTINATIONS CHART
export const getPopularDestinations = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const destinations = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      {
        $lookup: {
          from: 'packages',
          localField: 'package',
          foreignField: '_id',
          as: 'packageDetails'
        }
      },
      { $unwind: '$packageDetails' },
      {
        $group: {
          _id: '$packageDetails.destination',
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { bookings: -1 } },
      { $limit: parseInt(limit) }
    ]);

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET BOOKING STATUS DISTRIBUTION (Pie Chart) - Required by dashboardRoutes.js
export const getBookingStatusDistribution = async (req, res) => {
  try {
    const statusDistribution = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET RECENT BOOKINGS
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET COMPLETE ADMIN DASHBOARD (All Data in One Call)
export const getCompleteDashboard = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();

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
      Package.countDocuments({}),
      Customer.countDocuments({}),
      Booking.countDocuments({}),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'completed' }),
      
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
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
      
      Booking.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      
      Booking.aggregate([
        { $match: { status: { $in: ['confirmed', 'completed'] } } },
        {
          $lookup: {
            from: 'packages',
            localField: 'package',
            foreignField: '_id',
            as: 'packageDetails'
          }
        },
        { $unwind: '$packageDetails' },
        {
          $group: {
            _id: '$packageDetails.destination',
            bookings: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { bookings: -1 } },
        { $limit: 5 }
      ]),
      
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('customer', 'fullName email phone')
        .populate('package', 'title destination price')
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    const bookingsChart = new Array(12).fill(0);
    const revenueChart = new Array(12).fill(0);

    monthlyData.forEach(item => {
      const index = item._id.month - 1;
      bookingsChart[index] = item.bookings;
      revenueChart[index] = item.revenue;
    });

    const totalStatusCount = statusDistribution.reduce((sum, item) => sum + item.count, 0);
    const statusWithPercentage = statusDistribution.map(item => ({
      status: item._id,
      count: item.count,
      percentage: totalStatusCount > 0 ? ((item.count / totalStatusCount) * 100).toFixed(1) : 0
    }));

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
            months: MONTHS,
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET BOOKINGS BY CATEGORY (Brought from analytics controller)
export const getBookingsByCategory = async (req, res) => {
  try {
    const categoryData = await Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      {
        $lookup: {
          from: 'packages',
          localField: 'package',
          foreignField: '_id',
          as: 'packageDetails'
        }
      },
      { $unwind: '$packageDetails' },
      {
        $group: {
          _id: '$packageDetails.category',
          bookings: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { bookings: -1 } }
    ]);

    const totalBookings = categoryData.reduce((sum, item) => sum + item.bookings, 0);
    const dataWithPercentage = categoryData.map(item => ({
      category: item._id,
      bookings: item.bookings,
      revenue: item.revenue,
      percentage: totalBookings > 0 ? ((item.bookings / totalBookings) * 100).toFixed(1) : 0
    }));

    res.status(200).json({
      success: true,
      message: 'Bookings by category fetched successfully',
      data: dataWithPercentage
    });
  } catch (error) {
    console.error('Get Bookings By Category Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET YEARLY COMPARISON WITH GROWTH PERCENTAGES
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
        growth: { bookings: bookingsGrowth, revenue: revenueGrowth }
      }
    });
  } catch (error) {
    console.error('Yearly Comparison Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    GET CUSTOMER GROWTH TRENDS
export const getCustomerGrowth = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const limit = parseInt(months);

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - limit);

    const growthData = await Customer.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const formattedData = growthData.map(item => ({
      month: `${MONTHS[item._id.month - 1]} ${item._id.year}`,
      customers: item.count
    }));

    res.status(200).json({
      success: true,
      message: 'Customer growth data fetched successfully',
      data: formattedData
    });
  } catch (error) {
    console.error('Get Customer Growth Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};