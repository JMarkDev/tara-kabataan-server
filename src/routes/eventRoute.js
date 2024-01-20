const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.get('/all', eventsController.getAllEvents);
router.get('/id/:id', eventsController.getEventById);
router.post('/add', upload.single('image'), eventsController.addEvents);
router.put('/update/:id', upload.single('image'), eventsController.updateEvents);
router.get('/search/:title', eventsController.searchEvents);
router.delete('/delete/:id', eventsController.deleteEvent);
router.get('/filter/:is_free', eventsController.filterEvents);

module.exports = router;