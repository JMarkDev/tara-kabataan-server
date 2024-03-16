const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analitycsController");

router.get("/total", analyticsController.fetchTotals);

module.exports = router;
