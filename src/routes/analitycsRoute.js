const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analitycsController");

router.get("/total", analyticsController.fetchTotals);
router.get("/events/:year", analyticsController.getAttendeesYearly);
router.get("/gender", analyticsController.getUserGender);

module.exports = router;
