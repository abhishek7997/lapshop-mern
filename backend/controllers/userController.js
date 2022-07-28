const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")

// Registration of user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body // object destructuring
  console.log(req.body)
  const user = await User.create({
    name,
    email,
    password,
  })

  sendToken(user, 201, res)
})

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400))
  }

  const user = await User.findOne({ email: email }).select("+password")

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }

  const isPasswordMatched = await user.comparePassword(password)
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401))
  }

  sendToken(user, 200, res)
})

// Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
})

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  // Get the resetPasswordToken
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery",
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    })
    console.log("Email sent")
  } catch (err) {
    console.log("Error: ", err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(err.message, 500))
  }
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creatig token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  console.log(req)

  if (!user) {
    return next(
      new ErrorHandler("Reset password is invalid or has been expired", 400)
    )
  }

  if (req.body.password != req.body.confirmPassword) {
    new ErrorHandler("Passwords do not match", 400)
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  sendToken(user, 200, res)
})

// Get User details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    user,
  })
})

// Update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords don't match", 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendToken(user, 200, res)
})

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

// Get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    success: true,
    users,
  })
})

// Get some other single user details // admin panel will view from here
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`)
    )
  }

  res.status(200).json({
    success: true,
    user,
  })
})

// Update user role -- Admin
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
  })
})

// Delete user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400)
    )
  }

  await user.remove()

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
})
