const express = require('express');
const router = express.Router();
const authorizeController = require("../../controllers/admin/authorize.controller");




router.get("/authorize", authorizeController.authorize)
router.patch("/authorize/change", authorizeController.change)
// router.get("/role/create", roleController.create)
// router.post("/role/create", roleController.createPost)
// router.get("/role/edit/:id", roleController.edit)
// router.patch("/role/edit/:id", roleController.editPatch)




module.exports = router;