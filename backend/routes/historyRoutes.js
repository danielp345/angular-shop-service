const express = require("express")
const router = express.Router()
const {
	getHistory,
	getUserHistory,
	addHistory,
} = require("../controllers/historyController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getHistory).post(protect, addHistory)
router.route("/:id").get(protect, getUserHistory)

module.exports = router
