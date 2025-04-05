const pool = require('../config/db');

// Model for fetching caregivers
const getAllCaregivers = async () => {
  const query = 'SELECT id, name FROM caregivers';
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { getAllCaregivers };
