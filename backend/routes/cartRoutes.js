const express = require("express");
const router = express.Router();
const {
  getCartProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCartProducts).post(protect, addCartProduct);

router
  .route("/:id")
  .put(protect, updateCartProduct)
  .delete(protect, deleteCartProduct);

module.exports = router;
