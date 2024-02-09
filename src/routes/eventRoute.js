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
router.get('/search-completed/:title', eventsController.searchEventsCompleted);
router.delete('/delete/:id', eventsController.deleteEvent);
router.get('/filter/event_type', eventsController.filterEvents);
router.get('/filter/event_category', eventsController.filterEventByCategory);
//http://localhost:5000/event/filter/event_category?event_category=Seminar
router.get('/pagination', eventsController.paginationEvents);
router.get('/pagination-completed', eventsController.paginationEventsCompleted);
router.get('/category/pagination', eventsController.paginationCategory);

module.exports = router;