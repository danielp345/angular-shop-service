const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: "User",
	},
	date: {
		type: Date,
		require: true,
		unique: true,
	},
	order: {
		type: [{ title: String, amount: Number, priceOfProduct: Number }],
	},
})

module.exports = mongoose.model("Order", OrderSchema)
