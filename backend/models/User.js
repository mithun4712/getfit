const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    // Password field removed
    biometrics: {
        weight: Number, // in kg
        height: Number, // in cm
        age: Number,
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        activityLevel: {
            type: String,
            enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
        }
    },
    goals: {
        targetWeight: Number,
        dailyCaloriesGoal: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Password hashing hook removed

// Method checked password removed

const User = mongoose.model('User', userSchema);
module.exports = User;
