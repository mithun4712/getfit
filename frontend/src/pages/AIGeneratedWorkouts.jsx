import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiActivity, FiClock, FiCheckCircle, FiLoader } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "@clerk/clerk-react"; // Added Clerk hook
import { generateAIWorkout, setAuthToken } from "../services/api"; // Added setAuthToken

export default function AIGeneratedWorkouts() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [formData, setFormData] = useState({
    goal: "General Fitness",
    difficulty: "Intermediate",
    duration: "45",
    equipment: "Full Gym"
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (token) setAuthToken(token);
      const response = await generateAIWorkout(formData);
      setWorkout(response.data);
    } catch (error) {
      console.error("Failed to generate workout:", error);
      alert("Failed to generate workout. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FiZap className="text-accent w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">AI Workout Generator</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Tell us your goals and we'll craft the perfect routine using Google Gemini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Focus Goal</label>
                <select
                  className="select select-bordered w-full bg-base-100 dark:bg-gray-900 rounded-xl"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                >
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>General Fitness</option>
                  <option>Endurance</option>
                  <option>Flexibility</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Difficulty</label>
                <select
                  className="select select-bordered w-full bg-base-100 dark:bg-gray-900 rounded-xl"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Elite</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Duration (Min)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="45"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Equipment</label>
                <select
                  className="select select-bordered w-full bg-base-100 dark:bg-gray-900 rounded-xl"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                >
                  <option>Full Gym</option>
                  <option>Dumbbells Only</option>
                  <option>No Equipment (Bodyweight)</option>
                  <option>Resistance Bands</option>
                </select>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              className="rounded-full px-12 text-white shadow-lg shadow-accent/20"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <FiLoader className="animate-spin" /> Crafting Plan...
                </span>
              ) : (
                "Generate My Custom Plan"
              )}
            </Button>
          </div>

          <AnimatePresence>
            {workout && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/20"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">{workout.title}</h2>
                    <p className="text-gray-500">{workout.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 px-4 py-2 rounded-xl text-primary font-bold flex items-center gap-2">
                      <FiZap size={18} /> {workout.estimatedCaloriesBurned} kcal
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl flex items-center gap-2">
                      <FiClock size={18} /> {formData.duration} min
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {workout.exercises.map((ex, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center font-bold text-xl text-primary shadow-sm border border-gray-100 dark:border-gray-700 shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-lg">{ex.name}</h4>
                          <span className="badge badge-primary badge-outline">{ex.sets} x {ex.reps}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{ex.instructions}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-center">
                  <Button variant="primary" className="rounded-full px-10">
                    Save to My Workouts
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
