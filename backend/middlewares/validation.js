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
  // ✅ NEW: Added optional city validator
  body('customerDetails.city')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  // ✅ NEW: Added optional whatsapp validator
  body('customerDetails.whatsappNumber')
    .optional({ values: 'falsy' })
    .isString()
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage('WhatsApp number must be between 7 and 20 characters'),
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

// Fixed Tourism-focused Categories (Synced with Blog.js model)
export const blogValidationRules = () => [
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
    .isIn([
      'travel-tips',
      'destinations',
      'food-guides',
      'road-trips',
      'hotel-reviews',
      'news',
      'tour-guides',
      'visa-guides'
    ])
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

export const newsletterValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email address is required')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
  ];
};

export const loginValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const settingsValidationRules = () => [
  body('companyName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('companyDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Company description cannot exceed 500 characters'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address cannot exceed 500 characters'),

  body('phone')
    .optional()
    .trim()
    .matches(/^[+\d\s\-\(\)]{7,20}$/)
    .withMessage('Please enter a valid phone number'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('socialLinks')
    .optional()
    .isArray()
    .withMessage('Social links must be an array'),

  body('socialLinks.*.platform')
    .if(body('socialLinks').exists())
    .isIn(['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'tiktok', 'whatsapp', 'other'])
    .withMessage('Invalid social media platform'),

  body('socialLinks.*.url')
    .if(body('socialLinks').exists())
    .isURL()
    .withMessage('Please enter a valid URL for social link'),

  body('socialLinks.*.isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('seo.metaTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters'),

  body('seo.metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters'),

  body('seo.metaKeywords')
    .optional()
    .trim(),

  body('seo.canonicalUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid canonical URL'),

  body('seo.robots')
    .optional()
    .trim(),

  body('seo.openGraph.ogTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters'),

  body('seo.openGraph.ogDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('OG description cannot exceed 160 characters'),

  body('seo.openGraph.ogUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please enter a valid OG URL'),

  body('footerContent.copyrightText')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Copyright text cannot exceed 200 characters'),

  body('footerContent.footerDescription')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Footer description cannot exceed 500 characters'),

  body('footerContent.footerLinks')
    .optional()
    .isArray()
    .withMessage('Footer links must be an array'),

  body('footerContent.footerLinks.*.title')
    .if(body('footerContent.footerLinks').exists())
    .trim()
    .isLength({ min: 1 })
    .withMessage('Footer link title is required'),

  body('footerContent.footerLinks.*.url')
    .if(body('footerContent.footerLinks').exists())
    .trim()
    .isURL()
    .withMessage('Please enter a valid URL for footer link'),

  body('googleMaps.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),

  body('googleMaps.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  body('googleMaps.zoom')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Zoom must be between 1 and 20'),
];

export const seoValidationRules = () => {
  return [
    body('metaTitle')
      .optional()
      .trim()
      .isLength({ max: 60 })
      .withMessage('Meta title cannot exceed 60 characters'),

    body('metaDescription')
      .optional()
      .trim()
      .isLength({ max: 160 })
      .withMessage('Meta description cannot exceed 160 characters'),

    body('metaKeywords')
      .optional()
      .trim(),

    body('canonicalUrl')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please enter a valid canonical URL'),

    body('robots')
      .optional()
      .trim(),

    body('openGraph.ogTitle')
      .optional()
      .trim()
      .isLength({ max: 60 })
      .withMessage('OG title cannot exceed 60 characters'),

    body('openGraph.ogDescription')
      .optional()
      .trim()
      .isLength({ max: 160 })
      .withMessage('OG description cannot exceed 160 characters'),

    body('openGraph.ogUrl')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please enter a valid OG URL'),

    body('openGraph.ogImage')
      .optional()
      .trim()
      .isURL()
      .withMessage('Please enter a valid OG image URL')
  ];
};

export const socialLinkValidationRules = () => {
  return [
    body('socialLinks')
      .isArray()
      .withMessage('Social links must be an array')
      .notEmpty()
      .withMessage('Social links cannot be empty'),

    body('socialLinks.*.platform')
      .isIn(['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'tiktok', 'whatsapp', 'other'])
      .withMessage('Invalid social media platform'),

    body('socialLinks.*.url')
      .trim()
      .isURL()
      .withMessage('Please enter a valid URL'),

    body('socialLinks.*.isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean')
  ];
};

export const robotsValidationRules = () => {
  return [
    body('robotsTxt')
      .notEmpty()
      .withMessage('Robots.txt content is required')
      .isString()
      .withMessage('Robots.txt must be a string')
  ];
};

export const galleryValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Title must be between 2 and 100 characters'),

    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description cannot exceed 500 characters'),

    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['domestic', 'international', 'customer-memories'])
      .withMessage('Invalid category')
  ];
};

export const categoryValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Category name is required')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Category name must be between 2 and 50 characters'),

    body('description')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Description cannot exceed 200 characters'),

    body('icon')
      .optional()
      .trim(),

    body('color')
      .optional()
      .trim()
      .matches(/^#[0-9a-f]{6}$/i)
      .withMessage('Color must be a valid hex code (e.g., #6366f1)'),

    body('order')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Order must be a positive number'),

    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean')
  ];
};

export const reviewValidationRules = () => {
  return [
    body('customerName')
      .notEmpty()
      .withMessage('Customer name is required')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Customer name must be between 2 and 50 characters'),

    body('customerEmail')
      .notEmpty()
      .withMessage('Customer email is required')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address'),

    body('tourName')
      .notEmpty()
      .withMessage('Tour name is required')
      .trim(),

    body('rating')
      .notEmpty()
      .withMessage('Rating is required')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),

    body('review')
      .notEmpty()
      .withMessage('Review text is required')
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Review cannot exceed 1000 characters')
  ];
};