//user.controller

const User = require('../models/User');



const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ _id: userId })
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const newUser = new User({ name, email, image });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { getUsers, createUser, getUserById };
