const User = require('../models/User');
const LiveData = require('../models/LiveData');
const Device = require('../models/Device');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createCustomer = async (req, res) => {
    const { username, email, phoneNo, location, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, phoneNo, location, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User Created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getCustomer = async (req, res) => {
    console.log(req);
    const { userId } = req.userId;
    try {
        const users = await User.find({ userId });
        // Extract the first user (since we are using find)
        const user = users[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                username: user.username,
                email: user.email,
                location: user.location,
                phoneNo: user.phoneNo
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching customers' });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        const customer = await User.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
    const { username, email, phoneNo, location } = req.body;
    const userId = req.params.customerId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.phoneNo = phoneNo || user.phoneNo;
        user.location = location || user.location;

        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
    const userId = req.params.customerId;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

exports.getallCustomer = async (req, res) => {
    try {
        const users = await User.find({ role: "customer" });

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching customers' });
    }
};

exports.getLivedata = async (req, res) => {
    const user = await User.findById(req.userId);
    try {
        const liveData = await LiveData.find({ user_id: user.id });
        res.json(liveData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Live Data' });
    }
};

exports.getdeviceInfo = async (req, res) => {
    const user = await User.findById(req.userId);
    try {
        const deviceInfo = await Device.find({ user_id: user.id });
        res.json(deviceInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching Device data' });
    }
};