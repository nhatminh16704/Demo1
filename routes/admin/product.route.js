const express = require('express');
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const productValidate = require("../../validates/admin/product.validate");
const multer  = require('multer');
const fileupload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middleware");
//Instead of being written to a local directory, the uploaded files now reside in memory temporarily as a buffer.



router.get("/product", productController.product)
router.patch("/product/change-status/:status/:id", productController.changeStatus)
router.patch("/product/change-multi", productController.changeMulti)
router.delete("/product/delete/:id", productController.deleteItem)
router.get("/product/create", productController.createItem)
router.post(
  "/product/create",
  fileupload.single('thumbnail'),
  // This middleware will extract the file from the request, process it, and save information about the file into req.file.
  uploadCloud.upload,
  productValidate.createProduct,
  productController.createProduct
)
router.get("/product/edit/:id", productController.editItem)
router.patch(
  "/product/edit/:id",
  fileupload.single('thumbnail'),
  uploadCloud.upload,
  productValidate.createProduct,
  productController.editProduct
)
router.get("/product/detail/:id", productController.detailItem)


module.exports = router;