const express = require("express")
const router = express.Router()
const {
	loginUser,
	registerUser,
	getUsers,
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getUsers)
router.post("/login", loginUser)
router.post("/register", registerUser)

module.exports = router
