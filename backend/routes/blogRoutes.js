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

// Public Routes (Inhein koi bhi dekh sakta hai)
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/categories/:categoryId', getCategoryDetails);
router.get('/featured', getFeaturedBlogs);
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/slug/related/:slug', getBlogWithRelated);
router.get('/get/:id', getBlogById);

// Admin-Only Protected Routes (In ke liye login token zaroori hai)
router.post('/create', protect, upload.single('featuredImage'), blogValidationRules(), validateFields, createBlog);
router.put('/update/:id', protect, upload.single('featuredImage'), blogValidationRules(), validateFields, updateBlog);
router.delete('/delete/:id', protect, deleteBlog);

export default router;