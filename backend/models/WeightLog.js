const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Weight log must belong to a user']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide weight value']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const WeightLog = mongoose.model('WeightLog', weightLogSchema);
module.exports = WeightLog;
