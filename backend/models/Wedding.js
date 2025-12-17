const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    groomName: {
        type: String,
        required: true,
    },
    brideName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalBudget: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Wedding', weddingSchema);
