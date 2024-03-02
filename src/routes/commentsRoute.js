const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const multer = require('multer');
const upload = multer({ dest: './uploads'})

router.get('/id/:event_id', commentsController.getCommentsByEventId)
router.post('/add', upload.array('image'), commentsController.addComments)

module.exports = router;