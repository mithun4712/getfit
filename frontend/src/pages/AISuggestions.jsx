import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiMessageCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function AISuggestions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <FiCpu className="text-primary w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">AI Suggestions</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Unlock personalized, data-driven insights to optimize your fitness journey. Our AI analyzes your progress to provide the perfect roadmap.
            </p>
            <div className="p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 flex items-center gap-4 text-left mb-8">
              <FiMessageCircle className="text-primary w-6 h-6 shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">
                You're performing great! Based on your last 3 runs, we suggest increasing your pace by 5% for tomorrow's session.
              </p>
            </div>
            <button className="btn btn-primary rounded-full px-10">
              Refresh Insights
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
