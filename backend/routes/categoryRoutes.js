import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { validateFields, categoryValidationRules } from '../middlewares/validation.js';
import {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/getall', getAllCategories);
router.get('/category/:slug', getCategoryBySlug);
router.post('/create', protect, categoryValidationRules(), validateFields, createCategory);
router.put('/update/:id', protect, categoryValidationRules(), validateFields, updateCategory);
router.delete('/delete/:id', protect, deleteCategory);

export default router;