const express = require("express")
const router = express.Router()
const controller = require("../controllers/categoryController")

router.get("/", controller.getCategory)
router.get("/:id", controller.getCategory)
router.post("/", controller.postCategory)
router.put("/:id", controller.putCategory)
router.delete("/:id", controller.deleteCategory)

module.exports = router