const express = require('express');
const { getUserById, getUsers, registerUser, login } = require('../controller/user.controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/:id', protect, getUserById);
router.get('/', protect, getUsers);
router.post('/register', registerUser);
router.post('/login', login);
module.exports = {
    userRoutes: router
}