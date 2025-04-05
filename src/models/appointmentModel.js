const pool = require('../config/db');

// Model for fetching appointments
const getAppointmentsByPatientId = async (patientId) => {
  const query = `
    SELECT 
      a.time, 
      c.name AS caregiver_name
    FROM 
      appointments a
    INNER JOIN 
      caregivers c ON a.caregiver_id = c.id
    WHERE 
      a.patient_id = $1
    ORDER BY 
      a.time DESC
  `;
  const { rows } = await pool.query(query, [patientId]);
  return rows;
};

module.exports = { getAppointmentsByPatientId };
