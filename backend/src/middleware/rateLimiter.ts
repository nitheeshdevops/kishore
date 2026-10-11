import rateLimit from 'express-rate-limit';

export const wishRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max 20 wishes per IP per 15 minutes
  message: {
    status: 'error',
    message: 'Too many blessing messages submitted from this IP, please try again in a few minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
