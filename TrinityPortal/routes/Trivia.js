const express = require('express');
const {
  addTrivia,
  getTrivias,
//   updateSchool,
//   deleteSchool,
//   addMultipleSchools,
} = require('../controllers/Trivia');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addTrivia);
router.get('/', getTrivias);

// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);
// router.put('/:schoolId', protect, authorize(3, 4, 5,6), updateSchool);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);

module.exports = router;