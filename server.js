// server.js
require('dotenv').config();
const express = require('express');
const patientRoutes = require('./src/routes/patientRoutes');
const limiter = require('./src/config/rateLimiter'); // Import rate limiter middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use rate limiter for all /api/ routes
app.use('/api/', limiter);

// Mount routes
app.use('/api', patientRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
