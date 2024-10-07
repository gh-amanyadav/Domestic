const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createAdmin = async (req, res) => {
    const { username, email, phoneNo, location, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, phoneNo, location, password: hashedPassword, role: "admin" });
        await newUser.save();

        res.status(201).json({ message: 'User Created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllAdmin = async (req, res) => {
    try {
        const users = await User.find({role: "admin"});

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching customers' });
    }
};