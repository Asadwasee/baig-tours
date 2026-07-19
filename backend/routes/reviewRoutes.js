import express from 'express';
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

router.get('/approved_reviews', getApprovedReviews);
router.get('/review/:id', getReviewById);
router.post('/create_review', reviewValidationRules(), validateFields, createReview);
router.get('/admin/all', getAllReviewsAdmin);
router.put('/admin/approve/:id', approveReview);
router.put('/admin/reject/:id', rejectReview);
router.delete('/admin/delete/:id', deleteReview);
router.put('/admin/hide/:id', hideReview);
router.put('/admin/update/:id', reviewValidationRules(), validateFields, updateReview);
export default router;