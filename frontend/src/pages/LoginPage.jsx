import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await loginUser(data);
      login(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Decorative Elements */}
          <div className="absolute top-32 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-32 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          {/* Main Card */}
          <div className="relative card bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            <div className="card-body p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <FiLogIn className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl font-bold font-display mb-3">
                  Welcome Back
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Continue your fitness journey
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email Input */}
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    icon={<FiMail />}
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    icon={<FiLock />}
                    error={errors.password?.message}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-base-content transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Server Error */}
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="alert alert-error"
                  >
                    <span className="text-sm">{serverError}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full group"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                    {!isLoading && (
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                </Button>
              </motion.form>

              {/* Divider */}
              <div className="divider text-gray-400 dark:text-gray-600 my-6">OR</div>

              {/* Register Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                  >
                    Create Account
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6"
          >
            By logging in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
