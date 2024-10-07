// models/OTP.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);
