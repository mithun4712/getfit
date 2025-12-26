import { useState } from "react";
import { motion } from "framer-motion";
import { FiTarget, FiUser, FiActivity, FiArrowUp } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      alert("Please fill all fields");
      return;
    }

    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    setCalories(Math.round(bmr));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <FiTarget className="text-primary w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Calorie Calculator</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Estimate your basal metabolic rate (BMR)</p>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiUser className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Age (years)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiActivity className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <FiArrowUp className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>

              <button
                onClick={calculateCalories}
                className="w-full bg-primary hover:bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
              >
                Calculate Calories
              </button>

              {calories && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl text-center"
                >
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Your Estimated BMR</p>
                  <p className="text-4xl font-bold text-primary">
                    {calories} <span className="text-lg font-medium opacity-70">kcal</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
