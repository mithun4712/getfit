import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiSearch, FiPlus, FiClipboard } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { fetchWorkoutPlans, createWorkoutPlan } from "../services/api";

export default function WorkoutLog() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlan, setNewPlan] = useState({ name: "", description: "" });

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
    if (!newPlan.name) return;

    try {
      await createWorkoutPlan({
        name: newPlan.name,
        description: newPlan.description,
        exercises: [] // Initialize with empty exercises for now
      });
      setNewPlan({ name: "", description: "" });
      loadPlans();
    } catch (error) {
      console.error("Error creating plan:", error);
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Workout Plans</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your workout routines</p>
            </div>
          </div>

          {/* Create Plan Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Create New Plan</h3>
            <form onSubmit={handleCreatePlan} className="flex gap-4">
              <input
                type="text"
                placeholder="Plan Name (e.g., Leg Day)"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                className="input input-bordered flex-1 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                className="input input-bordered flex-1 dark:bg-gray-700 dark:text-white"
              />
              <button type="submit" className="btn btn-primary">
                <FiPlus /> Create
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
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
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
