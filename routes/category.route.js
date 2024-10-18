const express = require('express');
const { createCategory, getCategory, deleteCategoryById, getCategoryById } = require('../controller/category.controller');
const router = express.Router();

router.post('/create', createCategory);
router.get('/', getCategory);
router.delete('/:id', deleteCategoryById);
router.get('/:id', getCategoryById)

module.exports = {
    categoryRoutes: router
}