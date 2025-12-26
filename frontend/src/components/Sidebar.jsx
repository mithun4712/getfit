import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiActivity, FiTrendingUp, FiClipboard, FiZap, FiTarget } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: <FiHome size={20} />, label: 'Dashboard' },
        { path: '/calorie-calculator', icon: <FiTarget size={20} />, label: 'Calorie Calculator' },
        { path: '/calories-count', icon: <FiTrendingUp size={20} />, label: 'Calories Count' },
        { path: '/food-log', icon: <FiClipboard size={20} />, label: 'Food Log' },
        { path: '/workout-log', icon: <FiActivity size={20} />, label: 'Workout Log' },
        { path: '/weight-log', icon: <FiTrendingUp size={20} />, label: 'Weight Log' },
        { path: '/ai-suggestions', icon: <FiZap size={20} />, label: 'AI Suggestions' },
        { path: '/ai-workouts', icon: <FiZap size={20} />, label: 'AI Workouts' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isOpen ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-base-200 shadow-xl z-40 lg:relative lg:top-0 lg:h-screen lg:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4">
                    <h2 className="text-xl font-bold mb-6 px-2">Navigation</h2>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => onClose && onClose()}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-primary text-primary-content shadow-md'
                                        : 'hover:bg-base-300 text-base-content'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
