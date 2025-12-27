import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiSearch, FiPlus, FiClipboard } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { fetchWorkoutPlans, createWorkoutPlan } from "../services/api";
import workoutVisual from "../assets/workout-logistics.png";

export default function WorkoutLog() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    duration: "",
    caloriesBurned: ""
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await fetchWorkoutPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    console.log('Create button clicked!');

    if (!newPlan.name) {
      alert('Please enter a plan name');
      return;
    }

    console.log('Attempting to create plan:', newPlan);

    try {
      const result = await createWorkoutPlan({
        title: newPlan.name,
        description: newPlan.description,
        caloriesBurned: parseInt(newPlan.caloriesBurned) || 0,
        exercises: []
      });

      console.log('Plan created successfully:', result);

      // Update calories burned in localStorage for dashboard
      if (newPlan.caloriesBurned) {
        const today = new Date().toDateString();
        const savedWorkouts = localStorage.getItem('workout_calories');
        let totalCalories = parseInt(newPlan.caloriesBurned);

        if (savedWorkouts) {
          try {
            const { date, calories } = JSON.parse(savedWorkouts);
            if (date === today) {
              totalCalories += calories;
            }
          } catch (error) {
            console.error('Error loading workout calories:', error);
          }
        }

        localStorage.setItem('workout_calories', JSON.stringify({
          date: today,
          calories: totalCalories
        }));
        console.log('Calories burned saved to localStorage:', totalCalories);
      }

      setNewPlan({ name: "", description: "", duration: "", caloriesBurned: "" });
      loadPlans();
      alert('Workout plan created successfully!');
    } catch (error) {
      console.error("Error creating plan:", error);
      alert(`Error creating plan: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-8 md:p-12 text-left">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <FiActivity className="text-primary w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">Workout Plans</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 mb-8">Craft your journey to strength. Design, log, and dominate your routines.</p>

                <div className="flex gap-4">
                  <div className="bg-primary/10 px-4 py-2 rounded-xl text-primary font-bold">
                    {plans.length} active plans
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img
                  src={workoutVisual}
                  alt="Workout Logistics Visual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-800 to-transparent md:block hidden" />
              </div>
            </div>
          </div>

          {/* Create Plan Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Create New Plan</h3>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Plan Name (e.g., Leg Day)"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Calories Burned"
                  value={newPlan.caloriesBurned}
                  onChange={(e) => setNewPlan({ ...newPlan, caloriesBurned: e.target.value })}
                  className="input input-bordered dark:bg-gray-700 dark:text-white"
                  min="0"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full md:w-auto px-8">
                <FiPlus /> Create Workout Plan
              </button>
            </form>
          </div>

          {/* Search/Filters Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-8 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
            <input
              type="text"
              placeholder="Search plans..."
              className="bg-transparent border-none outline-none flex-1 dark:text-white"
            />
          </div>

          {/* Plans List */}
          <div className="space-y-4">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FiClipboard className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.title || plan.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{plan.description || "No description"}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}

            {!loading && plans.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                  <FiActivity className="text-gray-400 w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No plans found</h2>
                <p className="text-gray-500 dark:text-gray-400">Create your first workout plan above.</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
