const express = require('express');
const { protect } = require('../middleware/auth');
const { createItem, getAllItems, deleteItemById, getItemById, editItem } = require('../controller/item.controller');
const router = express.Router();

router.post('/create', protect, createItem);
router.get('/', protect, getAllItems);
router.delete('/:id', protect, deleteItemById)
router.get('/:id', protect, getItemById)
router.put('/update/:id', protect, editItem)

module.exports = {
    itemRoutes: router
}