const express = require("express")
const router = express.Router()
const controller =  require("../controllers/productController")

// Products Routes
router.get("/:id", controller.getSingleProduct)
router.get("/", controller.getProducts)
router.post("/", controller.postProducts)
router.put("/:id", controller.putProducts)
router.delete("/:id", controller.deleteProducts)

// Variants Routes
router.put("/:productId/variants/:variantId", controller.putOrPostVariant)
router.put("/:productId/variants", controller.putOrPostVariant)
router.delete("/:productId/variants/:variantId", controller.deleteVariant)

// Stock Route
router.put("/:productId/variants/:variantId/stock", controller.updateStock)
router.put("/:productId/variants/:variantId/updatestock", controller.updateNewStock) 

module.exports = router