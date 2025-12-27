import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiActivity, FiZap, FiTarget, FiTrendingUp, FiSmartphone, FiCheck, FiDroplet } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import calVisual from '../assets/calorie-tracking.png';
import workoutVisual from '../assets/workout-logistics.png';
import hydrationVisual from '../assets/hydration-tracking.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/ai-suggestions">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-base-200 border border-base-300 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                  <span className="text-sm font-medium text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    AI-Powered Fitness Tracking
                    <FiZap className="w-3 h-3 transition-transform group-hover:scale-125" />
                  </span>
                </div>
              </Link>
              <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-8 leading-tight">
                Transform Your Body <br />
                <span className="text-gradient">Master Your Health</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the next generation of fitness tracking. Intelligent insights,
                personalized workout plans, and comprehensive calorie tracking—all in one beautiful place.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-shadow">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="lg" className="rounded-full px-8 text-lg">
                    Login Existing Account
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto group"
          >
            <Link to="/dashboard" aria-label="Go to interactive dashboard">
              <div className="bg-base-200 rounded-2xl p-2 sm:p-4 shadow-2xl border border-base-300 transition-all duration-300 group-hover:shadow-primary/20 group-hover:border-primary/30">
                <div className="bg-base-100 rounded-xl overflow-hidden aspect-[16/9] relative grid place-items-center bg-grid-pattern group-hover:bg-primary/5 transition-colors duration-300">
                  <div className="absolute inset-0 bg-base-100/50" />
                  <div className="relative text-center z-10 p-8">
                    <FiActivity className="w-20 h-20 text-primary mx-auto mb-4 opacity-80 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Interactive Dashboard</h3>
                    <p className="text-gray-500 dark:text-gray-400">Connect to visualize your progress in real-time</p>
                  </div>
                </div>
              </div>
            </Link>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 md:right-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-[200px] hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <FiTrendingUp className="text-success w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Daily Goal</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">2,150 <span className="text-xs font-normal">kcal</span></p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-success h-full w-[85%]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Everything You Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools designed to help you reach your fitness goals faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiZap />}
              title="Calorie Tracking"
              description="Effortlessly log meals and track your daily caloric intake with our extensive food database."
              color="text-warning"
              bg="bg-warning/10"
              delay={0}
              to="/food-log"
              img={calVisual}
            />
            <FeatureCard
              icon={<FiActivity />}
              title="Workout Logistics"
              description="Log strength and cardio sessions, track personal records, and visualize your progress over time."
              color="text-primary"
              bg="bg-primary/10"
              delay={0.1}
              to="/workout-log"
              img={workoutVisual}
            />
            <FeatureCard
              icon={<FiDroplet />}
              title="Hydration Tracking"
              description="Stay peak performing with our smart water intake log and hydration reminders tailored to your weight."
              color="text-info"
              bg="bg-info/10"
              delay={0.2}
              to="/hydration-tracker"
              img={hydrationVisual}
            />
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">
                Your Personal <br />
                <span className="text-gradient">AI Fitness Coach</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Stop guessing and start progressing. Our AI analyzes your biometrics, activity levels,
                and goals to create the perfect plan for you.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Customized nutritional breakdowns',
                  'Adaptive workout plans that evolve with you',
                  'Real-time feedback and progress adjustments',
                  'Smart suggestions to overcome plateaus'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <FiCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/ai-suggestions">
                <Button variant="outline" className="rounded-full px-6">
                  Explore AI Features
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full opacity-60" />
              <div className="relative bg-base-100 border border-base-200 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6 border-b border-base-200 pb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                    AI
                  </div>
                  <div>
                    <h4 className="font-bold">Coach suggestions</h4>
                    <p className="text-xs text-base-content/60">Just now</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-base-200 p-4 rounded-xl rounded-tl-none">
                    <p className="text-sm">
                      Based on your recent activity, I suggest increasing your protein intake by 15g today to aid recovery. Also, try adding a 10 min mobility session.
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-xl rounded-tr-none text-right ml-auto max-w-[80%]">
                    <p className="text-sm text-primary-content dark:text-primary">
                      That sounds great! Can you generate a mobility routine for me?
                    </p>
                  </div>
                  <div className="bg-base-200 p-4 rounded-xl rounded-tl-none">
                    <p className="text-sm mb-2">Generating routine...</p>
                    <div className="flex gap-2">
                      <span className="loading loading-dots loading-sm bg-primary"></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 relative z-10">Start Your Transformation</h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto relative z-10">
              Join thousands of users who have already achieved their dream body with GetFit.
              Your best self is waiting.
            </p>
            <Link to="/register" className="relative z-10">
              <button className="btn btn-lg bg-white text-blue-600 border-none hover:bg-gray-100 rounded-full px-10 shadow-xl transition-all hover:scale-105 active:scale-95">
                Get Started for Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color, bg, delay, to, img }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 card-hover group overflow-hidden"
    >
      <Link to={to} className="p-0 cursor-pointer flex flex-col h-full">
        {img && (
          <div className="h-48 overflow-hidden relative">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 ${bg} opacity-20 group-hover:opacity-10 transition-opacity`} />
          </div>
        )}
        <div className="card-body p-8">
          <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
            <div className={`${color} text-2xl`}>{icon}</div>
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
          <div className="mt-4 text-primary font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Explore <FiZap size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LandingPage;

