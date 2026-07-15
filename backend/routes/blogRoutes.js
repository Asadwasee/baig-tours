import express from 'express';
import upload from '../middleware/upload.js';
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// Routes with image upload
router.post('/create', upload.single('featuredImage'), createBlog);
router.put('/update/:id', upload.single('featuredImage'), updateBlog);

// Routes without image upload
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/get/:id', getBlogById);
router.delete('/delete/:id', deleteBlog);

export default router;