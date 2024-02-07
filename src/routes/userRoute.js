const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { registerValidationRules,updateUsernameValidationRules, validateForm } = require('../middlewares/formValidation')

router.get('/all', userController.getAllUsers)
router.get('/role/:role', userController.getUserByRole)
router.get('/id/:id', userController.getUserById)
router.get('/search/:name/:role', userController.searchUsers)
router.get('/filter/:gender/:role', userController.filterByGender)

router.put('/update/:id', registerValidationRules(), validateForm , userController.updateUser)
router.post('/update/username/:id',updateUsernameValidationRules(), validateForm, userController.updateUsername)
router.put('/update/username/verify-otp/:id', userController.verifyOTP)

router.delete('/delete/:id', userController.deleteUser)

module.exports = router;