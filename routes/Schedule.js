const express = require('express');
const {
  addSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/Schedule');


const router = express.Router();

router.post('/', addSchedule);
router.get('/', getSchedules);
// router.get('/:songID', getSchedules);
router.put('/:scheduleID', updateSchedule);
router.delete('/:scheduleID', deleteSchedule);

module.exports = router;