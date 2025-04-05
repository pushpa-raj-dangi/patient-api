const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Patient Schedule Route
router.get('/patient-schedule', patientController.getPatientSchedule);

module.exports = router;
