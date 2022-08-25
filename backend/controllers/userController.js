const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// @desc     Register a new user
// @route    /api/users/register
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ login });

  if (userExists) {
    res.status(400);
    throw new Error("Login already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    login,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      login: user.login,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});

// @desc     Login a user
// @route    /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      login: user.login,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  loginUser,
  registerUser,
};
