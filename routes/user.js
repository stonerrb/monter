const express = require('express');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/verify', verifyOTP);
router.post('/resend', resendOTP);

module.exports = router;