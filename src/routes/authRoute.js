const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const otpController = require('../controllers/otpController')

router.post('/register', authController.handleRegister)
router.post('/verify-otp', otpController.verifyOTP)

module.exports = router