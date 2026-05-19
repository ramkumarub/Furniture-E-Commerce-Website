const express = require("express")
const router = express.Router()
const controller = require("../controllers/checkoutController")
const middleware =  require("../middleware/authMiddleware")

router.get("/:id", controller.getSingleCheckout)
router.get("/", controller.getCheckout)
router.post("/", middleware, controller.postCheckout)

module.exports = router