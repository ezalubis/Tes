const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../../config/uploadConfig");

router.post("/register", [
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("first_name").not().isEmpty().withMessage("First name is required"),
  body("last_name").not().isEmpty().withMessage("Last name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  authController.register,
]);
router.post("/login", authController.login);
router.get("/profile", verifyToken, authController.getProfile);
router.put(
  "/profile/image",
  upload.single("profile_image"),
  verifyToken,
  authController.updateProfile
);
router.put("/profile/update", verifyToken, authController.updateProfileName);
router.get("/balance", verifyToken, authController.getBalance);

module.exports = router;
