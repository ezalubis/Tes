const express = require("express");
const bannerController = require("../controllers/bannerController");
const router = express.Router();
router.get("/banner", bannerController.getBanner);
module.exports = router;
