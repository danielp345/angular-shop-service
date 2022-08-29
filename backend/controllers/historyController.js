const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")

const Order = require("../models/OrderModel")
const User = require("../models/UserModel")

// @desc Get all orders for admin
// @route GET /api/history
const getHistory = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	if (!user.isAdmin) {
		res.status(401)
		throw new Error("Only admin can get all orders history")
	}

	const orders = await Order.find({})
	res.status(200).json(orders)
})

// @desc Get user history
// @route GET /api/history/:userId
const getUserHistory = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const userOrders = await Order.find({ userId: req.user.id })
	res.status(200).json(userOrders)
})

// @desc Add user history
// @route POST /api/history
const addHistory = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	const order = await Order.create(req.body)

	res.status(201).json(order)
})

module.exports = {
	getHistory,
	getUserHistory,
	addHistory,
}
