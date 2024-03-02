const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const serviceController = require("../controllers/serviceController");
const router = express.Router();
router.get("/services", verifyToken, serviceController.getService);
module.exports = router;
