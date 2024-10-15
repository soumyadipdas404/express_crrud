const express = require('express');
const { createCategory, getCategory, deleteCategoryById } = require('../controller/category.controller');
const router = express.Router();

router.post('/create', createCategory);
router.get('/', getCategory);
router.delete('/:id', deleteCategoryById)

module.exports = {
    categoryRoutes: router
}