import express from 'express';
import upload from '../middlewares/upload.js'; 
import { protect } from '../middlewares/authMiddleware.js';
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// 1. Protected Admin Routes (Requires Admin/User JWT token & Handles Cloudinary)
router.post('/create', protect, upload.single('featuredImage'), createBlog);
router.put('/update/:id', protect, upload.single('featuredImage'), updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

// 2. Public Visitor Routes (No Auth required)
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/get/:id', getBlogById);

export default router;