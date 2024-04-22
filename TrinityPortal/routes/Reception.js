const express = require('express');
const {
  addReception,
getReceptions,
  updateReception,
//   deleteSchool,
//   addMultipleSchools,
} = require('../controllers/Reception');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addReception);
router.get('/', getReceptions);
router.put('/:receptionID', updateReception);
// router.post('/import', protect, authorize(5), addMultipleSchools);
// router.post('/get', protect, getSchools);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);

module.exports = router;