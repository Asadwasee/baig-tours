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

router.post('/create', upload.single('featuredImage'), createBlog);
router.put('/update/:id', upload.single('featuredImage'), updateBlog);
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/get/:id', getBlogById);

export default router;