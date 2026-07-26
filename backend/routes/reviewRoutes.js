import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { validateFields, reviewValidationRules } from '../middlewares/validation.js';
import {
    createReview,
    getApprovedReviews,
    getAllReviewsAdmin,
    getReviewById,
    approveReview,
    rejectReview,
    deleteReview,
    hideReview,
    updateReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Public Routes
router.get('/approved_reviews', getApprovedReviews);
router.get('/review/:id', getReviewById);
router.post('/create_review', reviewValidationRules(), validateFields, createReview);

// Protected Admin Routes
router.get('/admin/all', protect, getAllReviewsAdmin);
router.put('/admin/approve/:id', protect, approveReview);
router.put('/admin/reject/:id', protect, rejectReview);
router.delete('/admin/delete/:id', protect, deleteReview);
router.put('/admin/hide/:id', protect, hideReview);
router.put('/admin/update/:id', protect, reviewValidationRules(), validateFields, updateReview);

export default router;