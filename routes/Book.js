const express = require('express');
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require('../controllers/Book');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.put('/:bookID', updateBook);
router.delete('/:bookID', deleteBook);

module.exports = router;