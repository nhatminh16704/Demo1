const express = require('express');
const router = express.Router();
const roleController = require("../../controllers/admin/role.controller");




router.get("/role", roleController.role)
router.get("/role/create", roleController.create)
router.post("/role/create", roleController.createPost)
router.get("/role/edit/:id", roleController.edit)
router.patch("/role/edit/:id", roleController.editPatch)




module.exports = router;