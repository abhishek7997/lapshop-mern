const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  //   const {
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //   } = req.body

  const order = await Order.create({
    ...req.body,
    paidAt: Date.now(),
    user: req.user._id,
  })

  res.status(201).json({
    success: true,
    order,
  })
})

// Get single order details
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user", // use the user id we get
    "name email" // the return the name email from the user document stored in mongodb
  )

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    order,
  })
})

// Get all order details of logged in user
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }) // there can be more than one orders, hence we use find()

  res.status(200).json({
    success: true,
    orders,
  })
})

// Get all order details -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

// Update order status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id: ${req.params.id}`, 404)
    )
  }

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400))
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity)
  })

  order.orderStatus = req.body.status
  if (req.body.status === "delivered") order.deliveredAt = Date.now()

  await order.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id)
  product.stock -= quantity
  product.save({ validateBeforeSave: false })
}

// Delete order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id: ${req.params.id}`, 404)
    )
  }

  await order.remove()

  res.status(200).json({
    success: true,
  })
})
