const express = require('express');
const {
  addUser,
  getUsers,
  deleteUser,
  editUser,
  addMultipleUsers,
} = require('../controllers/User');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize(3, 4, 5,6), addUser);
router.post('/get', protect, getUsers);
router.post('/import', protect, authorize(3, 4, 5,6), addMultipleUsers);
router.delete('/:userId', protect, authorize(3, 4, 5,6), deleteUser);
router.put('/:userId', protect, authorize(3, 4, 5,6), editUser);

module.exports = router;
