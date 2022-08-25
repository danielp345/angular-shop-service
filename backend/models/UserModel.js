const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Please enter a login"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
