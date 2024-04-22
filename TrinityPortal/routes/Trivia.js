const express = require('express');
const {
  addTrivia,
  getTrivias,
  updateTrivia,
  deleteTrivia,
//   addMultipleSchools,
} = require('../controllers/Trivia');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addTrivia);
router.get('/', getTrivias);
router.put('/:questionID', updateTrivia);
router.delete('/:questionID', deleteTrivia);

// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);

module.exports = router;