const express = require('express');
const fitnessController = require('../controllers/fitnessController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/food', fitnessController.getFoodLogs);
router.post('/food', fitnessController.addFoodLog);
router.delete('/food/:id', fitnessController.deleteFoodLog);

router.get('/workouts', fitnessController.getWorkouts);
router.post('/workouts', fitnessController.addWorkout);

router.get('/weight', fitnessController.getWeightLogs);
router.post('/weight', fitnessController.addWeightLog);

module.exports = router;
