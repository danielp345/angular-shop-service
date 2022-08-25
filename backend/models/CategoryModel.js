const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter a category name"],
    unique: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
