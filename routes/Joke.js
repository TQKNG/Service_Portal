const express = require('express');
const {
  addJoke,
  getJokes,
  updateJoke,
  deleteJoke,
} = require('../controllers/Joke');

const router = express.Router();

router.post('/', addJoke);
router.get('/', getJokes);
router.put('/:jokeID', updateJoke);
router.delete('/:jokeID', deleteJoke);

module.exports = router;