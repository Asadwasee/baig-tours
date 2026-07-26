import express from 'express';
import { getDashboardNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/dashboard', getDashboardNotifications);

export default router;