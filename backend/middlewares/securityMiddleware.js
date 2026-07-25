import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

export const securityMiddleware = helmet();

// Custom sanitization wrapper to prevent read-only req.query re-assignment error
export const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  }
  if (req.params) {
    req.params = mongoSanitize.sanitize(req.params, { replaceWith: '_' });
  }
  if (req.query) {
    const sanitizedQuery = mongoSanitize.sanitize({ ...req.query }, { replaceWith: '_' });
    for (const key in req.query) {
      delete req.query[key];
    }
    Object.assign(req.query, sanitizedQuery);
  }
  next();
};

// General API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

// Strict Rate Limiter for Authentication Endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many login/registration attempts, please try again after 15 minutes.',
  },
});