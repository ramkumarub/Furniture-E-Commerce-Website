const express = require("express")
const router = express.Router()
const controller = require("../controllers/productCategoryController")

router.get("/:slug", controller.getProductCategory)

module.exports = router