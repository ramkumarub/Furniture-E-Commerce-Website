const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

// Signup Route
router.post("/signup", controller.signUp)

// Login Route
router.post("/login", controller.logIn)

// Logout Route
router.post("/logout", controller.logout)

module.exports = router