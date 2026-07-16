import express from 'express';
import upload from '../middlewares/upload.js';
import { protect } from '../middlewares/authMiddleware.js';
import {
    uploadMedia,
    getAllMedia,
    getMediaByCategory,
    getMediaById,
    updateMedia,
    deleteMedia,
    getMediaStats
} from '../controllers/galleryController.js';

const router = express.Router();

// Public Routes (Frontend users ya website visitor dekh sakein)
router.get('/media/getall', getAllMedia);
router.get('/media/media_stats', getMediaStats);
router.get('/media/category/:category', getMediaByCategory);
router.get('/media/:id', getMediaById);

// Protected Admin Routes (Sirf authenticated Admin access kar sake)
router.post('/media/upload', protect, upload.single('media'), uploadMedia);
router.put('/media/update/:id', protect, upload.single('media'), updateMedia);
router.delete('/media/:id', protect, deleteMedia);

export default router;