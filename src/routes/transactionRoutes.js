const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const transactionController = require("../controllers/transactionController");

router.post(
  "/topup",
  verifyToken,
  [
    body("amount")
      .isNumeric()
      .withMessage("Amount harus angka dan tidak boleh lebih kecil dari 0"),
  ],
  transactionController.topUp
);

router.post("/transaction", verifyToken, transactionController.makePayment);
router.get("/transaction/history", transactionController.getHistory);

module.exports = router;
