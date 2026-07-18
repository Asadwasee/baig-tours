import express from 'express';
import upload from '../middlewares/upload.js';
import { protect } from '../middlewares/authMiddleware.js';import { validateFields, galleryValidationRules } from '../middlewares/validation.js';
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
router.get('/media/getall', getAllMedia);
router.get('/media/media_stats', getMediaStats);
router.get('/media/category/:category', getMediaByCategory);
router.get('/media/:id', getMediaById);
router.post('/media/upload', protect, upload.single('media'), galleryValidationRules(), validateFields, uploadMedia);
router.put('/media/update/:id', protect, upload.single('media'), galleryValidationRules(), validateFields, updateMedia);
router.delete('/media/:id', protect, deleteMedia);
export default router;