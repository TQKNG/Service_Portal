const express = require('express');
const {
  login,
  getCurrentUser,
  checkAuth,
  logout,
  resetPasswordEmail,
  resetPassword,
} = require('../controllers/Auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.get('/check', protect, checkAuth);
router.get('/me', protect, getCurrentUser);
router.get('/logout', protect, logout);
router.post('/reset', resetPasswordEmail);
router.post('/reset/:token', resetPassword);

module.exports = router;
