'use strict'
const jwt = require('jsonwebtoken');
const userModel = require('../schema/user.schema');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'your_jwt_secret', { expiresIn: '1h' });
};
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userRes = await userModel.findOne({ uId: id })
        if (!userRes) {
            return res.status(404).json(
                {
                    message: "User not found",
                    uId: id,
                    data: null
                }
            )
        }
        res.status(200).json({
            message: "User found",
            data: {name:userRes.name,email:userRes.email,uId:userRes.uId}
        });
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
const getUsers = async (req, res, next) => {
    try {
        const key = req.query.key;
        if (key === 'jo-boley-sone-hal') {
            const useRes = await userModel.find({})
            if (!useRes) {
                return res.status(404).json({
                    message: 'User(s) not found',
                    data:[]
                });
            }
            res.status(200).json({
                message:"user(s) found",
                data:useRes
            });
        }
        else {
            res.status(401).json({ message: "Fear the god" })
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            res.status(400).json({
                message: "User already exist",
                data: user
            })
        }
        const data = new userModel({ name, email, password });
        const savedUser = await data.save();
        const token = generateToken(savedUser.uId);
        res.status(200).json({ 
            message:"user registered successfuly",
            token,
            data 
        })
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json(error)
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserById,
    getUsers,
    registerUser,
    login
}