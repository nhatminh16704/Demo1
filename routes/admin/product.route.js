const express = require('express');
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const productValidate = require("../../validates/admin/product.validate");
const multer  = require('multer');
const storage = require('../../helpers/storageMulter.js');
const upload = multer({ storage: storage() });


router.get("/product", productController.product)
router.patch("/product/change-status/:status/:id", productController.changeStatus)
router.patch("/product/change-multi", productController.changeMulti)
router.delete("/product/delete/:id", productController.deleteItem)
router.get("/product/create", productController.createItem)
router.post(
  "/product/create",
  upload.single('thumbnail'),
  productValidate.createProduct,
  productController.createProduct
)
router.get("/product/edit/:id", productController.editItem)
router.patch(
  "/product/edit/:id",
  upload.single('thumbnail'),
  productValidate.createProduct,
  productController.editProduct
)
router.get("/product/detail/:id", productController.detailItem)


module.exports = router;