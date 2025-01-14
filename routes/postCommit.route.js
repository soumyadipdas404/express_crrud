const express = require('express');
const { protect } = require('../middleware/auth');
const {createItem, getAllItems } = require('../controller/postCommit.controller');
const router = express.Router();

router.post('/create', createItem);
router.get('/', getAllItems);

module.exports = {
    postCommitRoutes: router
}