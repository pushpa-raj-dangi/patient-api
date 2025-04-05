require('dotenv').config();

const Redis = require('ioredis');

// Configure Redis connection options
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',  
  port: 6379, 
  password: process.env.REDIS_PASSWORD || '', 
  db: process.env.REDIS_DB || 0, // Select the Redis database (default is 0)
  maxRetriesPerRequest: 50, // Increase retry attempts
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000); // 50ms, 100ms, 150ms, etc., maxing out at 2000ms (2 seconds)
  },
  connectionName: 'patient-api', 
  showFriendlyErrorStack: true, 
});


// When connected to Redis
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

// When an error occurs with Redis
redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

// When Redis connection is closed
redisClient.on('close', () => {
  console.log('❌ Redis connection closed');
});

// When Redis reconnects after failure
redisClient.on('reconnecting', () => {
  console.log('🔄 Reconnecting to Redis...');
});

// Handling Redis ready event (after Redis server has been started and is ready to accept connections)
redisClient.on('ready', () => {
  console.log('✅ Redis is ready');
});

// Handling Redis client end event
redisClient.on('end', () => {
  console.log('❌ Redis client has ended');
});



module.exports = redisClient;

