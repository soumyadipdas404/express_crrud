const express = require('express');
const { getProjectInfo } = require('../controller/index.controller');
const router = express.Router();

router.get('/', getProjectInfo);

module.exports = {
    indexRouter: router
}