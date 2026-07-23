import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

// 1. Helmet: Secure HTTP headers set karta hai
export const securityMiddleware = helmet();

// 2. Mongo Sanitize: Custom wrapper jo read-only query objects par crash nahi hota
export const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  if (req.query) {
    mongoSanitize.sanitize(req.query);
  }
  next();
};

// 3. Rate Limiter: Brute-force attacks ko rokta hai (15 min mein 100 requests)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { 
    success: false, 
    message: 'Too many requests, please try again after 15 minutes' 
  }
});