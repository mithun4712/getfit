import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiTarget,
  FiZap,
  FiDroplet,
  FiClock
} from 'react-icons/fi';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import { fetchFoodLogs } from '../services/api';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    caloriesConsumed: 0,
    caloriesBurned: 0,
    caloriesGoal: 2000,
    workoutsCompleted: 0,
    waterIntake: 0,
    waterGoal: 8,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const logs = await fetchFoodLogs();

        // Calculate today's calories
        const today = new Date().toDateString();
        const todaysLogs = logs.filter(log => new Date(log.date).toDateString() === today);
        const consumed = todaysLogs.reduce((sum, log) => sum + log.totalCalories, 0);

        // Load hydration data from localStorage
        const savedHydration = localStorage.getItem('hydration_data');
        let waterIntake = 0;
        if (savedHydration) {
          try {
            const { date, amount } = JSON.parse(savedHydration);
            if (date === today) {
              waterIntake = amount;
            }
          } catch (error) {
            console.error('Error loading hydration data:', error);
          }
        }

        // Load workout calories from localStorage
        const savedWorkouts = localStorage.getItem('workout_calories');
        let caloriesBurned = 0;
        if (savedWorkouts) {
          try {
            const { date, calories } = JSON.parse(savedWorkouts);
            if (date === today) {
              caloriesBurned = calories;
            }
          } catch (error) {
            console.error('Error loading workout calories:', error);
          }
        }

        setDashboardData(prev => ({
          ...prev,
          caloriesConsumed: consumed,
          waterIntake: waterIntake,
          caloriesBurned: caloriesBurned
        }));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();

    // Refresh dashboard every 30 seconds to catch updates
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const caloriesRemaining = dashboardData.caloriesGoal - (dashboardData.caloriesConsumed - dashboardData.caloriesBurned);
  const caloriesPercentage = ((dashboardData.caloriesConsumed - dashboardData.caloriesBurned) / dashboardData.caloriesGoal) * 100;

  // Use dashboardData instead of 'today' in the rest of the component
  const today = dashboardData;

  // Weekly data for charts
  const weeklyData = [
    { day: 'Mon', calories: 1800, burned: 300 },
    { day: 'Tue', calories: 2100, burned: 450 },
    { day: 'Wed', calories: 1900, burned: 280 },
    { day: 'Thu', calories: 1700, burned: 400 },
    { day: 'Fri', calories: 2000, burned: 350 },
    { day: 'Sat', calories: 1600, burned: 500 },
    { day: 'Sun', calories: 1450, burned: 320 },
  ];

  const recentWorkouts = [
    { name: 'Morning Run', duration: '30 min', calories: 250, time: '8:00 AM' },
    { name: 'Weight Training', duration: '45 min', calories: 180, time: '6:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's your fitness progress today.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Calories Consumed"
              value={today.caloriesConsumed}
              icon={<FiActivity size={28} />}
              color="primary"
              trend={5}
              delay={0.1}
            />
            <StatCard
              title="Calories Burned"
              value={today.caloriesBurned}
              icon={<FiZap size={28} />}
              color="accent"
              trend={12}
              delay={0.2}
            />
            <StatCard
              title="Calories Remaining"
              value={caloriesRemaining}
              icon={<FiTarget size={28} />}
              color="success"
              delay={0.3}
            />
            <StatCard
              title="Workouts Today"
              value={today.workoutsCompleted}
              icon={<FiTrendingUp size={28} />}
              color="warning"
              delay={0.4}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Calorie Progress */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="card bg-white dark:bg-gray-800 shadow-lg lg:col-span-1"
            >
              <div className="card-body items-center text-center">
                <h3 className="card-title mb-4">Daily Calorie Goal</h3>
                <ProgressBar
                  type="circular"
                  value={today.caloriesConsumed - today.caloriesBurned}
                  max={today.caloriesGoal}
                  color="primary"
                  size="lg"
                />
                <div className="mt-4 space-y-2 w-full">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Consumed:</span>
                    <span className="font-semibold">{today.caloriesConsumed} kcal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Burned:</span>
                    <span className="font-semibold text-accent">-{today.caloriesBurned} kcal</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Net Calories:</span>
                    <span className="text-primary">{today.caloriesConsumed - today.caloriesBurned} / {today.caloriesGoal}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card bg-white dark:bg-gray-800 shadow-lg lg:col-span-2"
            >
              <div className="card-body">
                <h3 className="card-title mb-4">Weekly Calories Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#007bff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff4747" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ff4747" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-card, #fff)',
                        border: '1px solid var(--border-subtle, #e5e7eb)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: 'var(--text-main, #111827)' }}
                    />
                    <Area type="monotone" dataKey="calories" stroke="#007bff" fillOpacity={1} fill="url(#colorCalories)" />
                    <Area type="monotone" dataKey="burned" stroke="#ff4747" fillOpacity={1} fill="url(#colorBurned)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Consumed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm">Burned</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Insights & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="card bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 md:col-span-2 border border-primary/20">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="card-title text-primary dark:text-primary-focus flex items-center gap-2">
                    <FiZap /> AI Smart Insights
                  </h3>
                  <Link to="/ai-suggestions" className="btn btn-ghost btn-xs">More Tips</Link>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg shrink-0">
                    <FiTrendingUp className="text-accent w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg mb-1">Weekly Momentum is Building!</p>
                    <p className="text-sm opacity-80 leading-relaxed">
                      You've stayed within your calorie limit for 4 days straight. Based on your progress,
                      increasing protein by 10% this weekend could help speed up muscle recovery.
                    </p>
                  </div>
                  <Link to="/ai-workouts">
                    <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-primary/20 whitespace-nowrap">
                      Get AI Workout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-white dark:bg-gray-800 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-sm opacity-70 mb-2 uppercase tracking-wider">Today's Focus</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <p className="text-sm font-medium">Protein: 80/120g</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    <p className="text-sm font-medium">Cardio: 0/30 min</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <p className="text-sm font-medium">Next: AI Leg Routine</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Workouts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="card-title">Today's Workouts</h3>
                  <Link to="/workout-log" className="btn btn-ghost btn-sm">View All</Link>
                </div>

                {recentWorkouts.length > 0 ? (
                  <div className="space-y-3">
                    {recentWorkouts.map((workout, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-accent/20 p-2 rounded-lg">
                            <FiActivity className="text-accent" size={20} />
                          </div>
                          <div>
                            <p className="font-semibold">{workout.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <FiClock size={12} />
                              {workout.duration} • {workout.calories} kcal
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400 dark:text-gray-500">{workout.time}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                    <FiActivity size={48} className="mx-auto mb-2 opacity-30" />
                    <p>No workouts logged today</p>
                    <Link to="/workout-log" className="btn btn-primary btn-sm mt-4">
                      Log Workout
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Water Intake & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              {/* Water Intake */}
              <div className="card bg-white dark:bg-gray-800 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Water Intake</h3>
                  <div className="flex items-center gap-4">
                    <FiDroplet size={40} className="text-info" />
                    <div className="flex-1">
                      <ProgressBar
                        value={today.waterIntake}
                        max={today.waterGoal}
                        color="info"
                        label={`${today.waterIntake} / ${today.waterGoal} glasses`}
                        showPercentage={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Footer */}
            <div className="mt-12">
              <Footer />
            </div>
          </div>
        </main>
      </div >
    </div >
  );
}
