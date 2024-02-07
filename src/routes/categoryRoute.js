const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.post('/add', upload.single('image'), categoryController.addCategory);
router.get('/all', categoryController.getAllCategories);
router.get('/id/:id', categoryController.getCategoryById);
router.put('/update/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/search/:category_name', categoryController.searchCategory);
router.get('/pagination', categoryController.paginationCategory);

module.exports = router;
