const express = require('express');
const router = express.Router();
const productsController = require("../../controllers/clients/products.controller")


router.get("/", productsController.products)
router.get("/:slug", productsController.detailProduct)

module.exports = router;