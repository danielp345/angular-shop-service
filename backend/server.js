const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const session = require("express-session")
const User = require("./models/UserModel")
const jwt = require("jsonwebtoken")
let user = {}

connectDB()

const app = express()

app.use(
	session({
		resave: false,
		saveUnitialized: true,
		secret: "SECRET",
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the Angular fullstack crud app" })
})

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/categories", require("./routes/categoryRoutes"))
app.use("/api/cart", require("./routes/cartRoutes"))
app.use("/api/history", require("./routes/historyRoutes"))

app.use(errorHandler)

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, done) {
	done(null, user)
})
passport.deserializeUser(function (user, done) {
	done(null, user)
})

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FB_CLIENT_ID,
			clientSecret: process.env.FB_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/auth/facebook/callback",
		},
		async (accessToken, refreshToken, profile, cb) => {
			const authId = `facebook:${profile.id}`

			const userExists = await User.findOne({ authId })

			if (userExists) {
				user = { ...userExists }
				return cb(null, userExists)
			}
			try {
				const newUser = await User.create({
					authId,
					login: profile.displayName,
				})
				user = { ...newUser }
				return cb(null, profile)
			} catch (error) {
				cb(error, null)
			}
		}
	)
)
app.get("/auth/facebook", passport.authenticate("facebook"))
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect: `${process.env.CLIENT_URL}/login`,
		// successRedirect: `${process.env.CLIENT_URL}`,
	}),
	(req, res) => {
		res.redirect(`${process.env.CLIENT_URL}`)
	}
)

app.get("/api/authUser", (req, res) => {
	const token = generateToken(user._doc._id)
	res.send({ user, token })
})

app.get("/api/logoutUser", (req, res) => {
	user = {}
	res.send({ success: true })
})

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	})
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
