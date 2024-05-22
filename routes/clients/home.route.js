const express = require('express');
const router = express.Router();
const homeController = require("../../controllers/clients/home.controller")

router.get("/", homeController.home)

module.exports = router;