const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/all', userController.getAllUsers)
router.get('/role/:role', userController.getUserByRole)
router.get('/id/:id', userController.getUserById)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/search/:name/:role', userController.searchUsers)
router.get('/filter/:gender/:role', userController.filterByGender)

module.exports = router;