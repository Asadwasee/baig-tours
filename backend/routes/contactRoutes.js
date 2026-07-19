import express from 'express';
import { validateFields } from '../middlewares/validation.js';
import { body } from 'express-validator';
import {
    submitContact,
    getAllContacts,
    getContactById,
    replyContact,
    deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Contact Validation Rules
const contactValidationRules = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters'),

        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email address'),

        body('phone')
            .optional()
            .trim(),

        body('subject')
            .notEmpty()
            .withMessage('Subject is required')
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Subject must be between 3 and 100 characters'),

        body('message')
            .notEmpty()
            .withMessage('Message is required')
            .trim()
            .isLength({ min: 10, max: 2000 })
            .withMessage('Message must be between 10 and 2000 characters')
    ];
};

// Reply Validation Rules
const replyValidationRules = () => {
    return [
        body('adminResponse')
            .notEmpty()
            .withMessage('Reply message is required')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Reply must be at least 5 characters')
    ];
};

router.post('/submit', contactValidationRules(), validateFields, submitContact);
router.get('/admin/all', getAllContacts);
router.get('/admin/:id', getContactById);
router.put('/admin/reply/:id', replyValidationRules(), validateFields, replyContact);
router.delete('/admin/delete/:id', deleteContact);

export default router;