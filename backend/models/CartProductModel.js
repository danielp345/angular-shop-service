const mongoose = require("mongoose");

const CartProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true],
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true],
    ref: "User",
  },
  title: {
    type: String,
    require: [true],
  },
  amount: {
    type: Number,
    require: [true],
  },
  priceOfProduct: {
    type: Number,
    require: [true],
  },
});

module.exports = mongoose.model("CartProduct", CartProductSchema);
