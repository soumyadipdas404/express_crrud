const express = require('express');
const { createCategory, getCategory, deleteCategoryById, editCategory, getCategoryById } = require('../controller/category.controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/create', protect, createCategory);
router.get('/', protect, getCategory);
router.get('/:id', protect, getCategoryById);
router.delete('/:id', protect, deleteCategoryById);
router.put('/update/:id', protect, editCategory);

module.exports = {
    categoryRoutes: router
}