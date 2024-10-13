const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveDataSchema = new Schema({
    device_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    liters_remaining: { type: Number, required: true },
    cost: { type: Number, required: true },
    current_plan: { type: String, required: true },
    total_liters: { type: Number, required: true },
    status: { type: String, required: true },
    updated_at: { type: Date, default: Date.now },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7200 // 7200 seconds = 2 hours
    }
});

module.exports = mongoose.model('LiveData', liveDataSchema);
