const asyncHandler = require("express-async-handler");

const Category = require("../models/CategoryModel");

// @desc Get categories
// @route GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// @desc Add category
// @route POST /api/categories
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please enter a category name");
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
  });

  if (category) {
    res.status(201).json({
      name: category.name,
    });
  }
});

// @desc Delete category
// @route DELETE /api/categories
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
};
