const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.get('/all', eventsController.getAllEvents);
router.get('/upcoming', eventsController.getUpcomingEvents);
router.get('/completed', eventsController.getCompletedEvents);

router.get('/id/:id', eventsController.getEventById);
router.post('/add', upload.single('image'), eventsController.addEvents);
router.put('/update/:id', upload.single('image'), eventsController.updateEvents);
router.get('/search-all/:title', eventsController.searchAllEvents);
router.get('/search/:title/:category', eventsController.searchEventsByCategory);
router.get('/search/:title/:status', eventsController.searchEvents);
router.delete('/delete/:id', eventsController.deleteEvent);

router.get('/filter-status/:status', eventsController.filterEventsStatus);
router.get('/filter/event_type', eventsController.filterEvents);
router.get('/filter/:event_category', eventsController.filterEventByCategory);
router.get('/filter/event-type/:type', eventsController.filterEventType)
router.get('/filter/:status/:event_type/:event_category', eventsController.filterByStatusTypeCategory)
router.get('/filter/:status/:event_category', eventsController.filterByStatusCatagory)
router.get('/filter/status/:status/event-type/:event_type', eventsController.filterByStatusType)

router.get('/pagination', eventsController.paginationEvents);
router.get('/category/pagination', eventsController.paginationCategory);

module.exports = router;