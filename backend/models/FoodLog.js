const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Food log must belong to a user']
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: [true, 'Please provide meal type']
    },
    items: [{
        name: String,
        calories: Number
    }],
    totalCalories: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema);
module.exports = FoodLog;
