const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age:{
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    trim: true,
  },
  work_details: {
    type: String,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String      
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;