const rateLimit = require('express-rate-limit');

// ✅ Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per IP per window
  message: '🚫 Too many requests, please try again later.'
});

module.exports = limiter;
