import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { newsletterValidationRules, validateFields } from '../middlewares/validation.js';
import {
  subscribeNewsletter,
  unsubscribeNewsletter,
  getAllSubscribers,
  sendNewsletterCampaign,
  deleteSubscriber,
} from '../controllers/newsletterController.js';

const router = express.Router();

// Public Routes
router.post('/subscribe', newsletterValidationRules(), validateFields, subscribeNewsletter);
router.post('/unsubscribe', unsubscribeNewsletter);

// Protected Admin Routes
router.get('/', protect, getAllSubscribers);
router.post('/send-campaign', protect, sendNewsletterCampaign);
router.delete('/:id', protect, deleteSubscriber);

export default router;