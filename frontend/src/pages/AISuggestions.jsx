import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiMessageCircle, FiTrendingUp, FiZap, FiRefreshCcw } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function AISuggestions() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [suggestions, setSuggestions] = useState([
    {
      icon: <FiTrendingUp className="text-primary w-6 h-6" />,
      text: "You're performing great! Based on your last 3 runs, we suggest increasing your pace by 5% for tomorrow's session.",
      type: "Performance"
    },
    {
      icon: <FiZap className="text-warning w-6 h-6" />,
      text: "Your protein intake has been slightly low this week. Try adding 20g of protein to your breakfast to support recovery.",
      type: "Nutrition"
    }
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Mocking a new suggestion
      if (suggestions.length < 3) {
        setSuggestions([
          ...suggestions,
          {
            icon: <FiMessageCircle className="text-accent w-6 h-6" />,
            text: "Recovery alert: Based on your workout intensity, we suggest an extra hour of sleep tonight.",
            type: "Lifestyle"
          }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-24 pb-12 px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <FiCpu className="text-primary w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">AI Smart Suggestions</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              Personalized, data-driven insights tailored to your journey.
            </p>

            <div className="space-y-4 text-left">
              <AnimatePresence>
                {suggestions.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-start gap-4"
                  >
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      {s.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">{s.type}</span>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <button
                className={`btn btn-primary rounded-full px-10 gap-2 ${isRefreshing ? 'loading' : ''}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {!isRefreshing && <FiRefreshCcw />}
                {isRefreshing ? "Analyzing Data..." : "Refresh Insights"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary-focus p-8 rounded-3xl text-white shadow-lg">
              <h4 className="font-bold text-xl mb-2">Weekly Goal</h4>
              <p className="text-white/80 text-sm mb-4">You're on track to hit your weight goal 2 weeks early!</p>
              <div className="w-full bg-white/20 h-2 rounded-full">
                <div className="bg-white h-full w-[75%]" />
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl text-white shadow-lg border border-gray-700">
              <h4 className="font-bold text-xl mb-2">AI Tip of the Day</h4>
              <p className="text-gray-400 text-sm">Drinking 500ml of water before meals can boost metabolism by 30%.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
