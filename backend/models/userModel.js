const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name must contain more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [8, "Password must contain more than 8 characters"],
    select: false, // exclude password from any queries
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {
  // we cannot use 'this' inside arrow functions

  // when updating user details (name and email), we don't want to re-hash the password, we put this condition
  // if user did not change password, don't hash
  if (!this.isModified("password")) {
    next()
  }

  this.password = await bcryptjs.hash(this.password, 10)
})

// JWT token
// We will generate token and store it in cookie so that we can verify that user is correct/authenticated
userSchema.methods.getJWTToken = function () {
  // this -> userSchema of individual user
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare user entered password to the password of user stored in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

// Generating password reset token
userSchema.methods.getResetPasswordToken = async function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex") // "hex" used to convert "Buffer" object to string

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken
}

module.exports = mongoose.model("User", userSchema)

/*
https://www.youtube.com/watch?v=iw5RSIflYGU
*/
