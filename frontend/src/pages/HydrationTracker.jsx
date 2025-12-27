import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDroplet, FiPlus, FiMinus, FiActivity } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import hydrationVisual from "../assets/hydration-tracking.png";

export default function HydrationTracker() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [waterAmount, setWaterAmount] = useState(0);
    const [goal, setGoal] = useState(8); // 8 glasses (roughly 2L)

    // Load water amount from localStorage on mount
    useEffect(() => {
        const today = new Date().toDateString();
        const savedData = localStorage.getItem('hydration_data');

        if (savedData) {
            try {
                const { date, amount } = JSON.parse(savedData);
                // Only load if it's from today
                if (date === today) {
                    setWaterAmount(amount);
                } else {
                    // New day, reset to 0
                    setWaterAmount(0);
                    localStorage.setItem('hydration_data', JSON.stringify({ date: today, amount: 0 }));
                }
            } catch (error) {
                console.error('Error loading hydration data:', error);
            }
        } else {
            localStorage.setItem('hydration_data', JSON.stringify({ date: today, amount: 0 }));
        }
    }, []);

    // Save water amount to localStorage whenever it changes
    useEffect(() => {
        const today = new Date().toDateString();
        localStorage.setItem('hydration_data', JSON.stringify({ date: today, amount: waterAmount }));
    }, [waterAmount]);

    const addGlass = () => {
        setWaterAmount(prev => prev + 1);
        console.log('Glass added! Total:', waterAmount + 1);
    };

    const removeGlass = () => {
        setWaterAmount(prev => Math.max(0, prev - 1));
        console.log('Glass removed! Total:', Math.max(0, waterAmount - 1));
    };

    const percentage = Math.min(100, (waterAmount / goal) * 100);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="flex-1 p-8 md:p-12 text-left">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-6">
                                    <FiDroplet className="text-blue-500 w-8 h-8" />
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hydration Tracker</h1>
                                <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                                    Stay hydrated to maintain energy and improve workout performance.
                                    Track your daily water intake effortlessly.
                                </p>
                            </div>
                            <div className="md:w-2/5 p-4">
                                <img
                                    src={hydrationVisual}
                                    alt="Hydration Tracker Visual"
                                    className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg shadow-blue-500/10"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Visualizer */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden"
                        >
                            {/* Wave Background */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-blue-500/10 pointer-events-none"
                                animate={{ height: `${percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />

                            <div className="relative z-10 text-center">
                                <div className="text-6xl font-black text-blue-500 mb-2">
                                    {waterAmount} / {goal}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-sm">
                                    Glasses Logged
                                </div>
                            </div>

                            <div className="mt-12 flex gap-6 relative z-10">
                                <button
                                    onClick={removeGlass}
                                    className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-all active:scale-95"
                                    aria-label="Remove glass"
                                >
                                    <FiMinus size={24} />
                                </button>
                                <button
                                    onClick={addGlass}
                                    className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:scale-110 active:scale-90 transition-all"
                                    aria-label="Add glass"
                                >
                                    <FiPlus size={24} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Insights */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FiActivity className="text-accent" /> Why Hydrate?
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Boosts metabolism by up to 30%",
                                        "Lubricates joints for better movement",
                                        "Aids in muscle recovery after workouts",
                                        "Reduces fatigue and increases focus"
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
                                <h3 className="font-bold text-lg mb-2">Smart Reminders</h3>
                                <p className="text-white/80 text-sm mb-4">
                                    We'll send you notifications throughout the day to help you reach your {goal} glass goal.
                                </p>
                                <div className="badge badge-outline text-white border-white/30 text-xs px-4 py-3">
                                    ENABLED: EVERY 2 HOURS
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 text-center">
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                            "Water is the only drink for a wise man." — Henry David Thoreau
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
