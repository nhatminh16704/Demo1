const express = require('express');
const router = express.Router();
const categoryController = require("../../controllers/admin/category.controller");
const multer  = require('multer');
const fileupload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middleware");
//Instead of being written to a local directory, the uploaded files now reside in memory temporarily as a buffer.



router.get("/category", categoryController.category)
router.get("/category/create", categoryController.create)
router.post(
  "/category/create",
  fileupload.single('thumbnail'),
  // This middleware will extract the file from the request, process it, and save information about the file into req.file.
  uploadCloud.upload,
  categoryController.createPost
)
router.get("/category/detail/:id", categoryController.detail)
router.get("/category/edit/:id", categoryController.edit)
router.patch(
  "/category/edit/:id",
  fileupload.single('thumbnail'),
  // This middleware will extract the file from the request, process it, and save information about the file into req.file.
  uploadCloud.upload,
  categoryController.editPost
)


module.exports = router;