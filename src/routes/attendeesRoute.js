const express = require('express')
const router = express.Router()
const attendeesController = require('../controllers/attendeesController')

router.post('/add', attendeesController.addAttendees)
router.get('/event_id/:event_id', attendeesController.allAttendeesByEventID)
router.get('/join-events/:user_id', attendeesController.userJoinEvents)

module.exports = router;