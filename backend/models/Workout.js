const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Workout must belong to a user']
    },
    title: {
        type: String,
        required: [true, 'Please provide workout title']
    },
    description: String,
    exercises: [{
        name: String,
        sets: Number,
        reps: Number,
        weight: Number,
        duration: Number // in minutes
    }],
    caloriesBurned: Number,
    date: {
        type: Date,
        default: Date.now
    },
    isAIProjected: {
        type: Boolean,
        default: false
    }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
