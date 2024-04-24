const nofificationController = require("../controllers/notificationController");
const express = require("express");
const router = express.Router();

router.get("/admin/all", nofificationController.getAdminNotifications);
router.get("/user/all", nofificationController.getAdminNotifications);

module.exports = router;
