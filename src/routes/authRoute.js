const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const otpController = require('../controllers/otpController')
const { registerValidationRules, loginValidationRules, validateForm } = require('../middlewares/formValidation') 

router.post('/register', registerValidationRules(), validateForm, authController.handleRegister)
router.post('/login', loginValidationRules(), validateForm, authController.handleLogin)
router.post('/verify-otp', otpController.verifyOTP)
router.post('/resend-otp', otpController.resendOTP)

module.exports = router