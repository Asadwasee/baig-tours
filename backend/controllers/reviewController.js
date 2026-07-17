import Review from '../models/Review.js';
// CREATE REVIEW (Public - Customer submits review)
export const createReview = async (req, res) => {
    try {
        const { customerName, customerEmail, tourName, customerId, rating, review } = req.body;

        // Validation
        if (!customerName || !customerEmail || !tourName || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: customerName, customerEmail, tourName, customerId, rating, review'
            });
        }

        // Check rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Create review
        const newReview = await Review.create({
            customerName,
            customerEmail,
            tourName,
            customerId,
            rating,
            review,
            reviewDate: new Date(),
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully. It will be reviewed by admin.',
            data: newReview
        });

    } catch (error) {
        console.error('Create Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET ALL REVIEWS
export const getApprovedReviews = async (req, res) => {
    try {
        const { customerId, page = 1, limit = 10 } = req.query;
        const query = { status: 'approved', isActive: true };

        if (customerId) query.customerId = customerId;

        const skip = (page - 1) * limit;
        const [reviews, total] = await Promise.all([
            Review.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Review.countDocuments(query)
        ]);

        //Calculate average rating
        const avgRating = await Review.aggregate([
            { $match: query },
            { $group: { _id: null, avg: { $avg: '$rating' } } }
        ]);

        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully',
            data: {
                reviews,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                },
                averageRating: avgRating[0]?.avg || 0,
                totalReviews: total
            }
        });
    } catch (error) {
        console.error('Get Approved Reviews Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET ALL REVIEWS FOR ADMIN
export const getAllReviewsAdmin = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = {};

        if (status) query.status = status;

        const skip = (page - 1) * limit;
        const [reviews, total] = await Promise.all([
            Review.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Review.countDocuments(query)
        ]);

        // Get counts by status
        const counts = await Review.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const statusCounts = {
            pending: 0,
            approved: 0,
            rejected: 0
        };
        counts.forEach(item => {
            if (item._id in statusCounts) {
                statusCounts[item._id] = item.count;
            }
        });

        res.status(200).json({
            success: true,
            message: 'All reviews fetched successfully',
            data: {
                reviews,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                },
                counts: statusCounts
            }
        });
    } catch (error) {
        console.error('Get All Reviews Admin Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// GET SINGLE REVIEW BY ID
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review fetched successfully',
            data: review
        });
    } catch (error) {
        console.error('Get Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// APPROVE REVIEW (Admin)
export const approveReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminNotes } = req.body;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if already approved
        if (review.status === 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Review is already approved'
            });
        }

        review.status = 'approved';
        review.adminNotes = adminNotes || 'Approved by admin';
        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review approved successfully',
            data: review
        });
    } catch (error) {
        console.error('Approve Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// REJECT REVIEW (Admin)
export const rejectReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminNotes } = req.body;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if already rejected
        if (review.status === 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Review is already rejected'
            });
        }

        review.status = 'rejected';
        review.adminNotes = adminNotes || 'Rejected by admin';
        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review rejected successfully',
            data: review
        });
    } catch (error) {
        console.error('Reject Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// DELETE REVIEW (Admin)
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error('Delete Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// SOFT DELETE REVIEW (Admin - Hide from public)
export const hideReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        review.isActive = false;
        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review hidden successfully',
            data: review
        });
    } catch (error) {
        console.error('Hide Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
// UPDATE REVIEW
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;

        const existingReview = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        //  Only allow updating if not approved yet
        if (existingReview.status === 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Approved reviews cannot be updated. Please contact admin.'
            });
        }

        const updateData = {};
        if (rating) updateData.rating = rating;
        if (review) updateData.review = review;

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: updatedReview
        });
    } catch (error) {
        console.error('Update Review Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};