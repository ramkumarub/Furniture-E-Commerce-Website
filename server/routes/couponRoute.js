const express = require("express")
const router = express.Router()
const controller = require("../controllers/couponController")
const middleware =  require("../middleware/authMiddleware")

router.post("/", middleware, controller.postCoupon)

module.exports = router