import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center p-2 rounded-xl bg-gray-100 dark:bg-gray-800 transition-colors duration-200 hover:ring-2 hover:ring-primary-400 group focus:outline-none overflow-hidden"
            aria-label="Toggle Dark Mode"
        >
            <div className="w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3, ease: 'backOut' }}
                        >
                            <HiMoon className="w-6 h-6 text-primary-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3, ease: 'backOut' }}
                        >
                            <HiSun className="w-6 h-6 text-accent-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-primary-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
};

export default DarkModeToggle;
