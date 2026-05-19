const express = require("express")
const router = express.Router()
const controller = require("../controllers/reviewController")
const middleware =  require("../middleware/authMiddleware")

router.get("/", controller.getReview)
router.post("/", middleware, controller.postReview)
router.delete("/:id", controller.deleteReview)

module.exports = router