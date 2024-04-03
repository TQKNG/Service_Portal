const express = require('express');
const {
  addMap,
  getMaps,
  addLocation,
  getLocations,
//   updateSchool,
//   deleteSchool,
//   addMultipleSchools,
} = require('../controllers/RobotService');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/map', addMap);
// router.post('/import', protect, authorize(5), addMultipleSchools);
router.get('/map/:id', getMaps);
// router.put('/:schoolId', protect, authorize(3, 4, 5,6), updateSchool);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);
router.post('/location', addLocation);
router.get('/location', getLocations);

module.exports = router;