const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/forgotpassword', forgotPassword);
router.get('/resetpassword/:resettoken', resetPassword);

module.exports = router;
