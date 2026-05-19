const express = require("express")
const router = express.Router()
const controller = require("../controllers/logoController")

router.get("/:id", controller.getSingleLogo)
router.get("/", controller.getLogo)
router.post("/", controller.postLogo)
router.put("/:id", controller.putLogo)
router.delete("/:id", controller.deleteLogo)

module.exports = router