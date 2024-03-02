const express = require('express')
const router = express.Router()
const attendeesController = require('../controllers/attendeesController')

router.post('/add', attendeesController.addAttendees)
router.get('/event_id/:event_id', attendeesController.allAttendeesByEventID)

module.exports = router;