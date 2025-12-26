import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiLayout } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function AIGeneratedWorkouts() {
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
            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <FiZap className="text-accent w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">AI-Generated Workouts</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Experience workouts tailored to your unique biometrics and goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-accent mb-1">Coming Up Next</p>
                <p className="text-gray-900 dark:text-white font-bold">HIIT Cardio Session</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: 450 kcal | 45 min</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 opacity-50">
                <p className="text-sm font-semibold text-gray-400 mb-1">Tomorrow</p>
                <p className="text-gray-900 dark:text-white font-bold">Full Body Strength</p>
                <p className="text-xs text-gray-500 mt-1">Locked until completion</p>
              </div>
            </div>
            <button className="btn btn-accent rounded-full px-10 text-white">
              Generate New Plan
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
