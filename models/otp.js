const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  otp: {
    type: String,
    required: true,
    trim: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  expires_at: {
    type: Date,
    default: Date.now() + 3600000,
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
