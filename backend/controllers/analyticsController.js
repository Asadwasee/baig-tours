import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import Customer from '../models/Customer.js';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const getMonthlyAnalytics = async (req, res) => {
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

        const bookingsData = new Array(12).fill(0);
        const revenueData = new Array(12).fill(0);

        monthlyData.forEach(item => {
            const index = item._id.month - 1;
            bookingsData[index] = item.bookings;
            revenueData[index] = item.revenue;
        });

        const totalBookings = bookingsData.reduce((a, b) => a + b, 0);
        const totalRevenue = revenueData.reduce((a, b) => a + b, 0);

        res.status(200).json({
            success: true,
            message: 'Monthly analytics fetched successfully',
            data: {
                year: targetYear,
                months: MONTHS,
                bookings: bookingsData,
                revenue: revenueData,
                totals: {
                    bookings: totalBookings,
                    revenue: totalRevenue
                },
                monthlyBreakdown: monthlyData.map(item => ({
                    month: MONTHS[item._id.month - 1],
                    bookings: item.bookings,
                    revenue: item.revenue
                }))
            }
        });
    } catch (error) {
        console.error('Get Monthly Analytics Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// get popular destinations based on bookings
export const getPopularDestinations = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const popularDestinations = await Booking.aggregate([
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
                    revenue: { $sum: '$totalAmount' },
                    packageIds: { $addToSet: '$packageDetails._id' }
                }
            },
            {
                $project: {
                    destination: '$_id',
                    bookings: 1,
                    revenue: 1,
                    packages: { $size: '$packageIds' }
                }
            },
            {
                $sort: { bookings: -1 }
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        const totalBookings = await Booking.countDocuments({
            status: { $in: ['confirmed', 'completed'] }
        });

        const destinationsWithPercentage = popularDestinations.map(dest => ({
            ...dest,
            percentage: totalBookings > 0 ? ((dest.bookings / totalBookings) * 100).toFixed(1) : 0
        }));

        res.status(200).json({
            success: true,
            message: 'Popular destinations fetched successfully',
            data: {
                destinations: destinationsWithPercentage,
                totalBookings,
                totalDestinations: popularDestinations.length
            }
        });
    } catch (error) {
        console.error('Get Popular Destinations Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [
            totalBookings,
            totalRevenue,
            totalCustomers,
            totalPackages,
            monthlyBookings,
            monthlyRevenue,
            pendingBookings,
            completedBookings,
            cancelledBookings,
            recentBookings
        ] = await Promise.all([
            Booking.countDocuments({ status: { $in: ['confirmed', 'completed'] } }),
            
            Booking.aggregate([
                { $match: { status: { $in: ['confirmed', 'completed'] } } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            
            Customer.countDocuments(),
            
            Package.countDocuments(),
            
            Booking.countDocuments({
                status: { $in: ['confirmed', 'completed'] },
                createdAt: { $gte: startOfMonth }
            }),
            
            Booking.aggregate([
                {
                    $match: {
                        status: { $in: ['confirmed', 'completed'] },
                        createdAt: { $gte: startOfMonth }
                    }
                },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            
            Booking.countDocuments({ status: 'pending' }),
            
            Booking.countDocuments({ status: 'completed' }),
            
            Booking.countDocuments({ status: 'cancelled' }),
            
            Booking.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('customer', 'fullName email')
                .populate('package', 'title')
        ]);

        const totalRevenueAmount = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
        const monthlyRevenueAmount = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;

        const popularDestinations = await Booking.aggregate([
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
        ]);

        const statusDistribution = await Booking.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const bookingsByCategory = await Booking.aggregate([
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
                    _id: '$packageDetails.category',
                    bookings: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { bookings: -1 }
            }
        ]);

        // Customer growth (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const customerGrowth = await Customer.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const customerGrowthData = customerGrowth.map(item => ({
            month: `${MONTHS[item._id.month - 1]} ${item._id.year}`,
            customers: item.count
        }));

        res.status(200).json({
            success: true,
            message: 'Dashboard stats fetched successfully',
            data: {
                overview: {
                    totalBookings,
                    totalRevenue: totalRevenueAmount,
                    totalCustomers,
                    totalPackages,
                    monthlyBookings,
                    monthlyRevenue: monthlyRevenueAmount
                },
                statusDistribution: statusDistribution.map(item => ({
                    status: item._id,
                    count: item.count
                })),
                popularDestinations,
                recentBookings,
                bookingsStats: {
                    pending: pendingBookings,
                    completed: completedBookings,
                    cancelled: cancelledBookings
                },
                bookingsByCategory,
                customerGrowth: customerGrowthData
            }
        });
    } catch (error) {
        console.error('Get Dashboard Stats Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET BOOKINGS BY CATEGORY
export const getBookingsByCategory = async (req, res) => {
    try {
        const categoryData = await Booking.aggregate([
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
                    _id: '$packageDetails.category',
                    bookings: { $sum: 1 },
                    revenue: { $sum: '$totalAmount' }
                }
            },
            {
                $sort: { bookings: -1 }
            }
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

        res.status(200).json({
            success: true,
            message: 'Yearly comparison fetched successfully',
            data: yearlyData
        });
    } catch (error) {
        console.error('Get Yearly Comparison Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET CUSTOMER GROWTH
export const getCustomerGrowth = async (req, res) => {
    try {
        const { months = 6 } = req.query;
        const limit = parseInt(months);

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - limit);

        const growthData = await Customer.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
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
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};