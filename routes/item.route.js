const express = require('express');
const { createItem, getAllItems, deleteItemById, getItemById } = require('../controller/item.controller');
const router = express.Router();

router.post('/create', createItem);
router.get('/', getAllItems);
router.delete('/:id',deleteItemById)
router.get('/:id',getItemById)

module.exports = {
    itemRoutes: router
}