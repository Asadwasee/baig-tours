import { validationResult, body } from 'express-validator';

// GENERIC VALIDATION ERROR HANDLER
export const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};
// ADMIN LOGIN VALIDATION
export const loginValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];
// WEBSITE SETTINGS VALIDATION
export const settingsValidationRules = () => {
  return [
    // Company Info
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

    // Contact Info
    body('address')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Address cannot exceed 500 characters'),

    body('phone')
      .optional()
      .trim()
      .matches(/^[\+\d\s\-\(\)]{7,20}$/)
      .withMessage('Please enter a valid phone number'),

    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address'),

    // Social Links
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

    // SEO Settings
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
      .withMessage('OG title cannot exceed 60 characters'),

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

    // Footer Content
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

    // Google Maps
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
      .withMessage('Zoom must be between 1 and 20')
  ];
};
// SEO ONLY VALIDATION
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
// SOCIAL LINKS ONLY VALIDATION
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
// ROBOTS.TXT VALIDATION
export const robotsValidationRules = () => {
  return [
    body('robotsTxt')
      .notEmpty()
      .withMessage('Robots.txt content is required')
      .isString()
      .withMessage('Robots.txt must be a string')
  ];
};
// GALLERY VALIDATION
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
// REVIEW VALIDATION
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
// BLOG VALIDATION
export const blogValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Blog title is required')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Blog title must be between 3 and 200 characters'),

    body('slug')
      .optional()
      .trim()
      .matches(/^[a-z0-9-]+$/)
      .withMessage('Slug can only contain lowercase letters, numbers and hyphens'),

    body('content')
      .notEmpty()
      .withMessage('Blog content is required')
      .trim(),

    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isIn(['technology', 'health', 'business', 'education', 'lifestyle', 'travel', 'food', 'fashion', 'sports', 'other'])
      .withMessage('Invalid category'),

    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),

    body('isPublished')
      .optional()
      .isBoolean()
      .withMessage('isPublished must be a boolean')
  ];
};