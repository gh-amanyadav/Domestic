const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const liveDataRoutes = require('./routes/liveDataRoutes')
const adminRoutes = require('./routes/adminRoutes');
const otpRoutes = require('./routes/otpRoutes');
require('dotenv').config();

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/dashboard', dashboardRoutes); // Dashboard routes (role-based access)
app.use('/api/customer', customerRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/liveData', liveDataRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN app with Role-Based Authentication');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
