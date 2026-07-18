import { body, validationResult } from 'express-validator';

export const bookingValidationRules = [
  body('customerDetails.fullName')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('customerDetails.email')
    .optional({ values: 'falsy' })
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('customerDetails.phone')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 characters'),
  body('package')
    .notEmpty()
    .withMessage('Please select a tour package'),
  body('travelDate')
    .notEmpty()
    .withMessage('Travel date is required')
    .isISO8601()
    .withMessage('Travel date must be a valid date'),
  body('adults')
    .notEmpty()
    .withMessage('Adults count is required')
    .isInt({ min: 1 })
    .withMessage('At least one adult is required'),
  body('children')
    .optional({ values: 'falsy' })
    .isInt({ min: 0 })
    .withMessage('Children count cannot be negative'),
  body('totalAmount')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a valid positive number'),
];

export const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

export const blogValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must be between 3 and 120 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['technology', 'health', 'business', 'education', 'lifestyle', 'travel', 'food', 'fashion', 'sports', 'other'])
    .withMessage('Category is invalid'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 20, max: 20000 })
    .withMessage('Content must be between 20 and 20000 characters'),
  body('slug')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must be lowercase with hyphens only'),
];
