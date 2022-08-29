const asyncHandler = require("express-async-handler")

const Product = require("../models/ProductModel")
const User = require("../models/UserModel")

// @desc     Get products
// @route    GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.status(200).json(products)
})

// @desc Add product
// @route POST /api/products
const addProduct = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	if (!user.isAdmin) {
		res.status(401)
		throw new Error("You are not an admin")
	}

	const { title, price, categories, description } = req.body

	if (!title || !price || !categories || !description) {
		res.status(400)
		throw new Error("Please fill all fields")
	}

	const productExists = await Product.findOne({ title })

	if (productExists) {
		res.status(400)
		throw new Error("Product with this title already exists")
	}

	const product = await Product.create(req.body)

	if (product) {
		res.status(201).json(product)
	}
})

// @desc Update product
// @route PUT /api/product/:id
const updateProduct = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	if (!user.isAdmin) {
		res.status(401)
		throw new Error("You are not an admin")
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error("Product not found")
	}

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)

	res.status(200).json(updatedProduct)
})

// @desc Delete product
// @route DELETE /api/product/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (!user) {
		res.status(401)
		throw new Error("User not found")
	}

	if (!user.isAdmin) {
		res.status(401)
		throw new Error("You are not an admin")
	}

	const product = await Product.findById(req.params.id)

	if (!product) {
		res.status(404)
		throw new Error("Product not found")
	}

	await product.remove()

	res.status(200).json({ success: true })
})

module.exports = {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
}
