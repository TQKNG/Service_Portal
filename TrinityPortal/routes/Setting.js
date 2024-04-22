const express = require('express');
const {
  addSetting,
  getSettings,
  updateSetting,
  deleteSetting,
} = require('../controllers/Setting');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addSetting);
router.get('/', getSettings);
router.put('/', updateSetting);
// router.delete('/:bookID', deleteSetting);

module.exports = router;