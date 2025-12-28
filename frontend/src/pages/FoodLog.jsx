import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCoffee, FiPlus, FiPieChart, FiTrash2 } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useAuth, useUser } from "@clerk/clerk-react"; // Added Clerk hooks
import { setAuthToken, fetchFoodLogs, addFoodLog, deleteFoodLog } from "../services/api"; // Added setAuthToken
import calVisual from "../assets/calorie-tracking.png";

export default function FoodLog() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", calories: "", mealType: "Breakfast" });

  useEffect(() => {
    if (user) {
      loadLogs();
    }
  }, [user]);

  const loadLogs = async () => {
    try {
      const token = await getToken();
      if (token) setAuthToken(token);
      const data = await fetchFoodLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error loading logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = async (e) => {
    e.preventDefault();
    console.log('Add food log clicked!', newItem);

    if (!newItem.name || !newItem.calories) {
      alert('Please fill in both food name and calories');
      return;
    }

    try {
      console.log('Submitting food log...');
      const result = await addFoodLog({
        mealType: newItem.mealType,
        items: [{ name: newItem.name, calories: parseInt(newItem.calories) }],
        date: new Date()
      });
      console.log('Food log added successfully:', result);
      setNewItem({ name: "", calories: "", mealType: "Breakfast" });
      loadLogs();
      alert('Food entry added successfully!');
    } catch (error) {
      console.error("Error adding log:", error);
      alert(`Error adding food entry: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this log?")) {
      await deleteFoodLog(id);
      loadLogs();
    }
  };

  const totalCalories = logs.reduce((sum, log) => sum + log.totalCalories, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-24 pb-12 px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-8 md:p-12 text-left">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mb-6">
                  <FiCoffee className="text-success w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">Food Log</h1>
                <p className="text-gray-500 mb-6">Track your nutrition with precision. Every calorie counts toward your goal.</p>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-900 dark:text-white font-bold flex items-center gap-2">
                      <FiPieChart className="text-success" />
                      Today's Calories
                    </span>
                    <span className="text-sm text-gray-500">{totalCalories} / 2,000 kcal</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-success h-full transition-all duration-500"
                      style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img
                  src={calVisual}
                  alt="Calorie Tracking Visual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-800 to-transparent md:block hidden" />
              </div>
            </div>
          </div>

          {/* Add Log Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
              <FiPlus className="text-success" />
              Add Food Entry
            </h3>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Food Name (e.g., Chicken Breast)"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="input input-bordered md:col-span-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={newItem.calories}
                  onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                  className="input input-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                  min="0"
                />
                <select
                  value={newItem.mealType}
                  onChange={(e) => setNewItem({ ...newItem, mealType: e.target.value })}
                  className="select select-bordered dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full md:w-auto px-8 shadow-lg hover:shadow-xl transition-all"
                onClick={() => console.log('Add button clicked!')}
              >
                <FiPlus className="w-5 h-5" /> Add Food Entry
              </button>
            </form>
          </div>

          {/* Logs List */}
          <div className="space-y-4">
            {logs.map((log) => (
              <motion.div
                key={log._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-12 rounded-full ${log.mealType === 'Breakfast' ? 'bg-orange-400' :
                    log.mealType === 'Lunch' ? 'bg-blue-400' :
                      log.mealType === 'Dinner' ? 'bg-purple-400' : 'bg-green-400'
                    }`}></div>
                  <div>
                    <h4 className="font-bold dark:text-white">{log.mealType}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {log.items.map(i => i.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-gray-900 dark:text-white">{log.totalCalories} kcal</span>
                  <button
                    onClick={() => handleDelete(log._id)}
                    className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {!loading && logs.length === 0 && (
              <p className="text-center text-gray-500">No logs yet.</p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
