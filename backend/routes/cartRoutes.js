const express = require("express")
const router = express.Router()
const {
	getCartProducts,
	addCartProduct,
	updateCartProduct,
	deleteCartProduct,
	deleteAllUserCartProducts,
} = require("../controllers/cartController")
const { protect } = require("../middleware/authMiddleware")

router
	.route("/")
	.get(protect, getCartProducts)
	.post(protect, addCartProduct)
	.delete(protect, deleteAllUserCartProducts)

router
	.route("/:id")
	.put(protect, updateCartProduct)
	.delete(protect, deleteCartProduct)

module.exports = router
