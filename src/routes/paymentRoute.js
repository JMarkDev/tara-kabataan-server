const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/add", paymentController.addTransaction);
router.get(
  "/trasaction/:user_id/:event_id",
  paymentController.getAllTrasactionByID
);
router.get(
  "/transaction/:transaction_id",
  paymentController.getTransactionByID
);

module.exports = router;
