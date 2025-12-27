import { useState } from "react";
import { motion } from "framer-motion";
import { FiTarget, FiUser, FiActivity, FiArrowUp } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [calories, setCalories] = useState(null);
  const [bmr, setBmr] = useState(null);

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      alert("Please fill all fields");
      return;
    }

    // Mifflin-St Jeor Equation
    let calculatedBMR;
    if (gender === "male") {
      calculatedBMR = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
    } else {
      calculatedBMR = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    }

    // Total Daily Energy Expenditure (TDEE) = BMR × Activity Level
    const tdee = calculatedBMR * parseFloat(activityLevel);

    setBmr(Math.round(calculatedBMR));
    setCalories(Math.round(tdee));
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

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
                >
                  <option value="1.2">Sedentary (little or no exercise)</option>
                  <option value="1.375">Lightly active (1-3 days/week)</option>
                  <option value="1.55">Moderately active (3-5 days/week)</option>
                  <option value="1.725">Very active (6-7 days/week)</option>
                  <option value="1.9">Super active (intense exercise daily)</option>
                </select>
              </div>

              <button
                onClick={calculateCalories}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
              >
                Calculate Calories
              </button>

              {calories && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 space-y-4"
                >
                  <div className="p-6 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Your BMR (Basal Metabolic Rate)</p>
                    <p className="text-3xl font-bold text-primary">
                      {bmr} <span className="text-lg font-medium opacity-70">kcal/day</span>
                    </p>
                  </div>
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-500/20 rounded-2xl text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Daily Calorie Needs (TDEE)</p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {calories} <span className="text-lg font-medium opacity-70">kcal/day</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Based on your activity level</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
