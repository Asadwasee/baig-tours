import express from 'express';
import upload from '../middlewares/upload.js'; 
import { protect } from '../middlewares/authMiddleware.js';
import { validateFields, blogValidationRules } from '../middlewares/validation.js';
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogCategories,
    getBlogTags,
    getCategoryDetails,
    getFeaturedBlogs,
    getBlogWithRelated
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/categories/:categoryId', getCategoryDetails);
router.get('/featured', getFeaturedBlogs);
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/slug/related/:slug', getBlogWithRelated);
router.get('/get/:id', getBlogById);
router.post('/create', upload.single('featuredImage'), blogValidationRules(), validateFields, createBlog);
router.put('/update/:id', upload.single('featuredImage'), blogValidationRules(), validateFields, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

export default router;