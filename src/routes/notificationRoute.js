const nofificationController = require("../controllers/notificationController");
const express = require("express");
const router = express.Router();

router.get("/admin/all", nofificationController.getAdminNotifications);
router.get("/user/all/:user_id", nofificationController.getUserNotifications);
router.put(
  "/update/id/:user_id/event/:event_id/role/:role",
  nofificationController.updateIsRead
);

module.exports = router;
