const express = require('express');
const {
  addReception,
getReceptions,
  updateReception,
} = require('../controllers/Reception');

// const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', addReception);
router.get('/', getReceptions);
router.put('/:receptionID', updateReception);

module.exports = router;