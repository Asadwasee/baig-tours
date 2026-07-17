import express from 'express';
import upload from '../middlewares/upload.js';
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
router.post('/media/upload', upload.single('media'), uploadMedia);
router.get('/media/getall', getAllMedia);
router.get('/media/media_stats', getMediaStats);
router.get('/media/category/:category', getMediaByCategory);
router.get('/media/:id', getMediaById);
router.put('/media/update/:id', upload.single('media'), updateMedia);
router.delete('/media/:id', deleteMedia);

export default router;