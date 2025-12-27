const FoodLog = require('../models/FoodLog');
const Workout = require('../models/Workout');
const WeightLog = require('../models/WeightLog');

// Food Logs
exports.getFoodLogs = async (req, res) => {
    try {
        const logs = await FoodLog.find({ userId: req.user.id }).sort('-date');
        res.status(200).json({ status: 'success', data: logs });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.addFoodLog = async (req, res) => {
    try {
        const totalCalories = req.body.items.reduce((sum, item) => sum + item.calories, 0);
        const newLog = await FoodLog.create({
            ...req.body,
            totalCalories,
            userId: req.user.id
        });
        res.status(201).json({ status: 'success', data: newLog });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Workouts
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id }).sort('-date');
        res.status(200).json({ status: 'success', data: workouts });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.addWorkout = async (req, res) => {
    try {
        console.log('Received workout data:', req.body);
        const newWorkout = await Workout.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json({ status: 'success', data: newWorkout });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Weight Logs
exports.getWeightLogs = async (req, res) => {
    try {
        const logs = await WeightLog.find({ userId: req.user.id }).sort('-date');
        res.status(200).json({ status: 'success', data: logs });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.addWeightLog = async (req, res) => {
    try {
        const newLog = await WeightLog.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json({ status: 'success', data: newLog });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.deleteFoodLog = async (req, res) => {
    try {
        const log = await FoodLog.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!log) {
            return res.status(404).json({ status: 'fail', message: 'No log found with that ID' });
        }
        res.status(204).json({ status: 'success', data: null });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
