const asyncHandler = require("express-async-handler");

const CartProduct = require("../models/CartProductModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

// @desc Get user cart products
// @route GET /api/cart
const getCartProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const cartProducts = await CartProduct.find({ userId: req.user.id });

  res.status(200).json(cartProducts);
});

// @desc Add user cart product
// @route POST /api/cart
const addCartProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const product = await Product.findById(req.body.productId);

  if (!product) {
    res.status(401);
    throw new Error("Product not found");
  }

  const cartProduct = await CartProduct.create(req.body);

  res.status(200).json(cartProduct);
});

// @desc Update user cart product
// @route PUT /api/cart/:id
const updateCartProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const { userId, productId } = req.body;
  const cartProduct = await CartProduct.find({ userId, productId });

  if (!cartProduct) {
    res.status(404);
    throw new Error("Cart product not found");
  }

  const updatedCartProduct = await CartProduct.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCartProduct);
});

// @desc Delete user cart product
// @route DELETE /api/cart/:id
const deleteCartProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const cartProduct = await CartProduct.findById(req.params.id);

  if (!cartProduct) {
    res.status(404);
    throw new Error("Cart product not found");
  }

  if (!cartProduct.userId.equals(req.user.id)) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await cartProduct.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getCartProducts,
  addCartProduct,
  updateCartProduct,
  deleteCartProduct,
};
