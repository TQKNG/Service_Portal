const express = require('express');
const {
  addMap,
  getMaps,
  addLocation,
  getLocations,
  getSchedules,
  addStatisticLogs,
  getStatisticLogs,
  addVoiceCommand,
} = require('../controllers/RobotService');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Map Routing Services
router.post('/map', addMap);
router.get('/map/:id', getMaps);

// Schedule Routing Services
router.get('/schedules', getSchedules);

// Statistic Logs Routing Services
router.post('/statisticLogs', addStatisticLogs);
router.get('/statisticLogs', getStatisticLogs);

// Location Routing Services
router.post('/locations', addLocation);
router.post('/get/locations', getLocations);

// Voice Command Routing Services
router.post('/voicecommand', addVoiceCommand);

module.exports = router;