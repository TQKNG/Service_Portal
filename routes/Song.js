const express = require('express');
const {
  addSong,
  getSongs,
  updateSong,
  deleteSong,
//   addMultipleSchools,
} = require('../controllers/Song');

const { protect, OauthProtect,GoogleAuthProtect,authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addSong);
// router.post('/import', protect, authorize(5), addMultipleSchools);
router.get('/', getSongs);
router.get('/:songID', getSongs);
// router.put('/:songID', protect, authorize(5), updateSong);
router.put('/:songID', updateSong);
// router.delete('/:schoolId', protect, authorize(5), deleteSchool);
router.delete('/:songID', deleteSong);

module.exports = router;