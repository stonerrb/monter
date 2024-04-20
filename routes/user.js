const express = require('express');

const { userSignup, OTPverify } = require('../controllers/user');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/verifyOTP', OTPverify);

module.exports = router;

