const express = require("express")
const router = express.Router()
const controller = require("../controllers/subscribeController")

// Subscribe Routes
router.get("/", controller.getSubscribeEmail)
router.post("", controller.postSubscribeEmail)
router.delete("/:id", controller.deleteSubscribeEmail)

module.exports = router