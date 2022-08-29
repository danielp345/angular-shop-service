const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
	{
		authId: {
			type: String,
			unique: [true, "User exists"],
		},
		login: {
			type: String,
			required: [true, "Please enter a login"],
		},
		password: {
			type: String,
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
)

module.exports = mongoose.model("User", UserSchema)
