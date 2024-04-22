const express = require('express');
const {
  addClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,
  addClassroomStudent,
  deleteClassroomStudent,
} = require('../controllers/Classroom');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize(3, 4, 5,6), addClassroom);
router.post('/get', protect, getClassrooms);
router.put('/:classroomId', protect, authorize(3, 4, 5,6), updateClassroom);
router.delete('/:classroomId', protect, authorize(3, 4, 5,6), deleteClassroom);
router.post('/student', protect, authorize(3, 4, 5,6), addClassroomStudent);
router.delete(
  '/student/:studentId',
  protect,
  authorize(3, 4, 5,6),
  deleteClassroomStudent,
);

module.exports = router;
