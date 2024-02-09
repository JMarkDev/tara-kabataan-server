const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');
const multer = require('multer');
const upload = multer({ dest: './uploads'})

router.get('/all', archiveController.getAllArchives);
router.get('/id/:id', archiveController.getArchiveById);
router.put('/update/:id',upload.array('image'), archiveController.updateEventStatus);

module.exports = router;
