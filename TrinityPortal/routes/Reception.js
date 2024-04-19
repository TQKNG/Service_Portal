const express = require('express');
const {
  addReception,
getReceptions,
//   updateSchool,
//   deleteSchool,
//   addMultipleSchools,
} = require('../controllers/Reception');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addReception);
router.get('/', getReceptions);
// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);
// router.put('/:schoolId', protect, authorize(3, 4, 5,6), updateSchool);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);

module.exports = router;