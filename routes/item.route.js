const express = require('express');
const { createItem, getAllItems } = require('../controller/item.controller');
const router = express.Router();

router.post('/create', createItem);
router.get('/', getAllItems);

module.exports = {
    itemRoutes: router
}