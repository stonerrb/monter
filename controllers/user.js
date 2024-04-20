require('dotenv').config();

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const OTP = require('../models/otp');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
})

const userSignup = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All input fields are required");
        } else {
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).send("User already registered");
            } else {
                const hash = await bcrypt.hash(password, 10);
                const newUser = new User({
                    email,
                    password: hash,
                });

                await newUser.save();

                // OTP verification
                await sendVerificationOTP(newUser, res);

                // Once OTP verification is complete, send the success response
                return res.status(200).send("User registered successfully");
            }
        }
    } catch (err) {
        return res.status(400).send({ message: "Something went wrong", err });
    }
};

// Send OTP
const sendVerificationOTP = async ({_id, email }, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        
        //mail OTP
        const mailOptions = {
            from: process.env.user,
            to: email,
            subject: "OTP for Verification",
            html: `<h2>Your OTP is ${otp}</h2><br><p>OTP is valid for 1 hr</p>`,
        }

        // has the otp 
        const hashedOTP = bcrypt.hash(otp, 10)

        // Save OTP
        const newOTP = new OTP({
            user: _id,
            otp: hashedOTP
        });

        await newOTP.save();

        console.log("god was here")

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).send({ message: "Something went wrong", err });
            } else {
                return res.status(200).send({ message: "OTP sent successfully" });
            }
        });
    } catch (err) {
        return res.status(400).send({ message: "Something went wrong", err });
    }
}

module.exports = { userSignup };