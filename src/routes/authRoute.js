const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const otpController = require('../controllers/otpController')
const { registerValidationRules, loginValidationRules, passwordValidationRules, validateForm } = require('../middlewares/formValidation') 
const changePassController = require('../controllers/changePassController')

router.post('/register', registerValidationRules(), validateForm, authController.handleRegister)
router.post('/login', loginValidationRules(), validateForm, authController.handleLogin)
router.post('/verify-otp', otpController.verifyOTP)
router.post('/resend-otp', otpController.resendOTP)

router.post('/change-password', changePassController.changePassController)
router.post('/confirm-otp', changePassController.confirmOTP)
router.put('/reset-password', passwordValidationRules(), validateForm, changePassController.confirmPassword)

module.exports = router