import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiMenu, FiX } from 'react-icons/fi';
import DarkModeToggle from './ui/DarkModeToggle';

const Navbar = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Calculator', path: '/calorie-calculator' },
    { name: 'Workouts', path: '/workout-log' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md">
              <span className="text-white font-bold text-xl leading-none">GF</span>
            </div>
            <span className="text-2xl font-bold font-display text-gradient hidden sm:block">GetFit</span>
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(link.path)
                  ? 'bg-primary text-primary-content shadow-lg shadow-primary/30'
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Theme Toggle + Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <DarkModeToggle />

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login">
                <button className="btn btn-ghost btn-sm rounded-full px-6 hover:bg-base-200 transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                  Register
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                onMenuClick?.();
              }}
              className="btn btn-ghost btn-circle md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-base-200 border-t border-base-300"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(link.path)
                  ? 'bg-primary text-primary-content'
                  : 'text-base-content/70 hover:bg-base-300'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-base-300">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn btn-ghost w-full rounded-lg">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn btn-primary w-full rounded-lg">Register</button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
