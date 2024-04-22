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
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);
// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);
// router.put('/:bookID', protect, authorize(3, 4, 5,6), updateSchool);

module.exports = router;