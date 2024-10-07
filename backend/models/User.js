const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    phoneNo: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['customer', 'admin', 'superadmin'], default: 'customer' },
});

module.exports = model('User', UserSchema);
