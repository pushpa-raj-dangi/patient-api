
const { getPatientScheduleFromDB } = require('../services/database');  
const redisClient = require('../config/redis'); 

const getPatientSchedule = async (req, res) => {
  const patientId = req.query.patientId;

  if (!patientId) {
    return res.status(400).json({ error: 'Patient ID is required' });
  }

  const cacheKey = `patient_schedule:${patientId}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log('✅ Cache hit');
      return res.json(JSON.parse(cached));
    }

    try {
      const data = await getPatientScheduleFromDB(patientId);
      await redisClient.set(cacheKey, JSON.stringify(data), 'EX', 3600);
      res.status(200).json({ data });

    } catch (error) {
      console.error('Error enqueuing job:', error);
      return res.status(500).json({ error: 'Failed to enqueue job' });
    }
  } catch (err) {
    console.error('Error checking cache:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPatientSchedule };