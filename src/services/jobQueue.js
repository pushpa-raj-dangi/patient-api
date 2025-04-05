const Queue = require('bull');
const redisClient = require('../config/redis');  // Redis client to cache data
const { getPatientScheduleFromDB } = require('../services/database');  // Function to fetch data from DB

// Setup Bull Queue for patient schedule fetching
const patientScheduleQueue = new Queue('patientScheduleQueue', 'redis://127.0.0.1:6379');

// Process the jobs in the queue
patientScheduleQueue.process(async (job, done) => {
  console.log(`Processing job for patient ${job.data.patientId}`);

  try {
    // Fetch patient schedule from the database
    const schedule = await getPatientScheduleFromDB(job.data.patientId);

    // Cache the result in Redis
    const cacheKey = `patient_schedule:${job.data.patientId}`;
    await redisClient.set(cacheKey, 600, JSON.stringify(schedule));  // Cache for 10 minutes

    console.log(`Job completed and cached schedule for patient ${job.data.patientId}`);

    // Return the result
    done(null, schedule);

  } catch (error) {
    console.error(`Error processing job for patient ${job.data.patientId}:`, error);
    done(new Error(`Failed to fetch schedule for patient ${job.data.patientId}: ${error.message}`));
  }
});

module.exports = patientScheduleQueue;
