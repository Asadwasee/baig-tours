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
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/create', upload.single('featuredImage'), blogValidationRules(), validateFields, createBlog);
router.put('/update/:id', upload.single('featuredImage'), blogValidationRules(), validateFields, updateBlog);
router.get('/get', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/get/:id', getBlogById);
router.delete('/delete/:id', protect, deleteBlog);

export default router;