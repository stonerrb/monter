const express = require('express');

const { userSignup, OTPverify, addInfo, userLogin, getUser } = require('../controllers/user');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

//--all routes are working fine--//
router.post('/signup', userSignup);
router.post('/verifyOTP', OTPverify);
router.post('/add_info', addInfo);
router.post('/login', userLogin);
router.get('/user', authenticateToken, getUser);

module.exports = router;

