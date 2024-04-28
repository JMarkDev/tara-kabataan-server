const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.get("/id/:event_id", commentsController.getCommentsByEventId);
router.post("/add", upload.array("image"), commentsController.addComments);
router.post("/reply", upload.array("image"), commentsController.replyComments);
router.delete("/delete/:comment_id", commentsController.deleteComment);

module.exports = router;
