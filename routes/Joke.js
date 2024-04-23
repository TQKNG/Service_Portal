const express = require('express');
const {
  addJoke,
  getJokes,
  updateJoke,
  deleteJoke,
//   addMultipleSchools,
} = require('../controllers/Joke');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addJoke);
router.get('/', getJokes);
router.put('/:jokeID', updateJoke);
router.delete('/:jokeID', deleteJoke);
// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);
// router.delete('/:jokeID', protect, authorize(5), deleteJoke);

module.exports = router;