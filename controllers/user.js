const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const OTP = require('../models/otp');

const userSignup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send
    }
}
