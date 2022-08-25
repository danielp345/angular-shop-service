const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a product title"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
  },
  description: {
    type: String,
    required: [true, "Please enter a product description"],
  },
  categories: {
    type: [String],
    required: [true, "Please select product categories"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
