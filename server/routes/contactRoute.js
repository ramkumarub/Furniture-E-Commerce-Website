const express = require("express")
const router = express.Router()
const controller = require("../controllers/contactController")

router.get("/", controller.getContact)
router.post("/", controller.postContact)
router.delete("/:id", controller.deleteContact)

module.exports = router