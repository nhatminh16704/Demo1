const express = require('express');
const router = express.Router();
const accountController = require("../../controllers/admin/account.controller");
const multer  = require('multer');
const fileupload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middleware");

router.get("/", accountController.account)
router.get("/create", accountController.create)
router.post(
  "/create",
  fileupload.single('avatar'),
  // This middleware will extract the file from the request, process it, and save information about the file into req.file.
  uploadCloud.upload,
  accountController.createPost
)
router.get("/edit/:id", accountController.edit)
router.patch(
  "/edit/:id",
  fileupload.single('avatar'),
  // This middleware will extract the file from the request, process it, and save information about the file into req.file.
  uploadCloud.upload,
  accountController.editPatch
)







module.exports = router;