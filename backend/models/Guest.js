const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    wedding: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wedding',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cityVillage: {
        type: String,
        required: true,
    },
    familyCount: {
        type: Number,
        required: true,
        default: 1,
    },
    isInvited: {
        type: Boolean,
        default: false,
    },
    shagunAmount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Guest', guestSchema);
