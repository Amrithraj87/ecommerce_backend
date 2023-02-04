var express = require("express")
var router = express.Router()
var productsController = require("../controllers/products")
/* GET users listing. */
router.get("/", productsController.getProducts)
router.get("/:id", productsController.getProduct)
router.post("/", productsController.createProduct)
router.put("/:id", productsController.updateProduct)
router.delete("/:id", productsController.deleteProduct)


module.exports = router
