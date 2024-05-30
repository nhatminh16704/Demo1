const express = require('express');
const router = express.Router();
const roleController = require("../../controllers/admin/role.controller");




router.get("/role", roleController.role)
router.get("/role/create", roleController.create)
router.post("/role/create", roleController.createPost)
router.get("/role/edit/:id", roleController.edit)
router.patch("/role/edit/:id", roleController.editPatch)
// router.get("/category/detail/:id", categoryController.detail)
// router.get("/category/edit/:id", categoryController.edit)
// router.patch(
//   "/category/edit/:id",
//   fileupload.single('thumbnail'),
//   // This middleware will extract the file from the request, process it, and save information about the file into req.file.
//   uploadCloud.upload,
//   categoryController.editPost
// )


module.exports = router;