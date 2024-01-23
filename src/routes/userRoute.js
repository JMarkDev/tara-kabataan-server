const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


router.get('/all', userController.getAllUsers)
router.get('/id/:id', userController.getUserById)
router.get('/delete/:id', userController.deleteUser)
router.get('/search/:name/:role', userController.searchUsers)


module.exports = router;