// controllers/auth.controller.js
const User = require('../models/User');
const OTP = require('../utils/otp');

exports.requestOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log("user email data: ", email);
        const user = await User.findOne({ email });
        console.log("user data: ", user);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = OTP.generateOTP();
        await OTP.sendOTPEmail(email, otp);
        await OTP.saveOTP(user._id, otp);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        next(error);
    }
};

exports.verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = await OTP.verifyOTPService(user._id, otp);

        if (!isValid) return res.status(400).json({ message: 'Invalid or expired OTP' });

        res.status(200).json({success: true});
    } catch (error) {
        next(error);
    }
};
