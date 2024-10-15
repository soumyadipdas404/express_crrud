const express = require('express');
const { createItem } = require('../controller/item.controller');
const router = express.Router();

router.post('/create', createItem);

module.exports = {
    itemRoutes: router
}