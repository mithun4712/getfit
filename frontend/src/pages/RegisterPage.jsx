import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password', '');

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: '', color: '', textColor: '' };
    let strength = 0;
    const checks = {
      length: pwd.length >= 8,
      hasLower: /[a-z]/.test(pwd),
      hasUpper: /[A-Z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[!@#$%^&*]/.test(pwd),
    };

    strength = Object.values(checks).filter(Boolean).length;

    if (strength <= 2) {
      return { strength: 30, label: 'Weak', color: 'bg-error', textColor: 'text-error', checks };
    }
    if (strength <= 3) {
      return { strength: 60, label: 'Medium', color: 'bg-warning', textColor: 'text-warning', checks };
    }
    return { strength: 100, label: 'Strong', color: 'bg-success', textColor: 'text-success', checks };
  };

  const passwordStrength = getPasswordStrength(password);

  const { login } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        biometrics: { weight: 70, height: 175 },
        goals: { targetWeight: 65, caloriesPerDay: 2000 }
      });

      login(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Registration failed. Please try again.');
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
          className="w-full max-w-lg"
        >
          {/* Decorative Elements */}
          <div className="absolute top-32 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-32 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Main Card */}
          <div className="relative card bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            <div className="card-body p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl font-bold font-display mb-3">
                  Join GetFit
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Start your fitness journey today
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name Input */}
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={<FiUser />}
                    error={errors.name?.message}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                  />
                </div>

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
                    placeholder="Create a strong password"
                    icon={<FiLock />}
                    error={errors.password?.message}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 space-y-2"
                    >
                      {/* Strength Bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-base-300 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength.strength}%` }}
                            transition={{ duration: 0.3 }}
                            className={`h-full ${passwordStrength.color} rounded-full`}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${passwordStrength.textColor}`}>
                          {passwordStrength.label}
                        </span>
                      </div>

                      {/* Password Requirements */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <PasswordCheck
                          met={passwordStrength.checks?.length}
                          label="8+ characters"
                        />
                        <PasswordCheck
                          met={passwordStrength.checks?.hasUpper && passwordStrength.checks?.hasLower}
                          label="Upper & lowercase"
                        />
                        <PasswordCheck
                          met={passwordStrength.checks?.hasNumber}
                          label="Number"
                        />
                        <PasswordCheck
                          met={passwordStrength.checks?.hasSpecial}
                          label="Special character"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    icon={<FiLock />}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="form-control">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm mt-0.5"
                      {...register('terms', {
                        required: 'You must accept the terms and conditions',
                      })}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-base-content transition-colors">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline font-medium">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <span className="text-error text-xs mt-1">{errors.terms.message}</span>
                  )}
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
                  className="w-full group mt-6"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    {!isLoading && (
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                </Button>
              </motion.form>

              {/* Divider */}
              <div className="divider text-gray-400 dark:text-gray-600 my-6">OR</div>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                  >
                    Login here
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
            Your data is secure and will never be shared with third parties
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

// Password Check Component
const PasswordCheck = ({ met, label }) => (
  <div className="flex items-center gap-1.5">
    {met ? (
      <FiCheck className="text-success w-3 h-3" />
    ) : (
      <FiX className="text-gray-400/30 dark:text-gray-600/30 w-3 h-3" />
    )}
    <span className={met ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}>
      {label}
    </span>
  </div>
);
