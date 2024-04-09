const express = require('express');
const {
  addSong,
  getSongs,
//   updateSchool,
//   deleteSchool,
//   addMultipleSchools,
} = require('../controllers/Song');

const { protect, OauthProtect,authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addSong);
// router.post('/import', protect, authorize(5), addMultipleSchools);
router.get('/', OauthProtect, getSongs);
// router.put('/:schoolId', protect, authorize(3, 4, 5,6), updateSchool);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);

module.exports = router;