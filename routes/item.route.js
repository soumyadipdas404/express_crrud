const express = require('express');
const { createItem, getAllItems, deleteItemById } = require('../controller/item.controller');
const router = express.Router();

router.post('/create', createItem);
router.get('/', getAllItems);
router.delete('/:id',deleteItemById)

module.exports = {
    itemRoutes: router
}