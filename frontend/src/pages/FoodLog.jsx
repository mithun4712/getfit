import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCoffee, FiPlus, FiPieChart, FiTrash2 } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { fetchFoodLogs, addFoodLog, deleteFoodLog } from "../services/api";

export default function FoodLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", calories: "", mealType: "Breakfast" });

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
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
    if (!newItem.name || !newItem.calories) return;

    try {
      await addFoodLog({
        mealType: newItem.mealType,
        items: [{ name: newItem.name, calories: parseInt(newItem.calories) }],
        date: new Date()
      });
      setNewItem({ name: "", calories: "", mealType: "Breakfast" });
      loadLogs();
    } catch (error) {
      console.error("Error adding log:", error);
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
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 text-center mb-8">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <FiCoffee className="text-success w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">Food Log</h1>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 max-w-md mx-auto mt-6">
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

          {/* Add Log Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Entry</h3>
            <form onSubmit={handleAddLog} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Food Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="input input-bordered flex-1 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="Calories"
                value={newItem.calories}
                onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                className="input input-bordered w-32 dark:bg-gray-700 dark:text-white"
                required
              />
              <select
                value={newItem.mealType}
                onChange={(e) => setNewItem({ ...newItem, mealType: e.target.value })}
                className="select select-bordered w-40 dark:bg-gray-700 dark:text-white"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
              <button type="submit" className="btn btn-success text-white">
                <FiPlus className="w-5 h-5" /> Add
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
