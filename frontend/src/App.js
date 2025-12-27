import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth, SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from '@clerk/clerk-react';
import { useEffect } from "react";
import { setAuthToken } from "./services/api";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AISuggestions from "./pages/AISuggestions";
import AIGeneratedWorkouts from "./pages/AIGeneratedWorkouts";
import CalorieCalculator from "./pages/CalorieCalculator";
import FoodLog from "./pages/FoodLog";
import WorkoutLog from "./pages/WorkoutLog";
import WeightLog from "./pages/WeightLog";
import HydrationTracker from "./pages/HydrationTracker";

// Component to Sync Clerk Token with API service
const AuthInitializer = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncToken = async () => {
      try {
        if (isSignedIn) {
          const token = await getToken();
          console.log('Token synced:', token ? 'Token exists' : 'No token');
          setAuthToken(token);
        } else {
          console.log('User not signed in, clearing token');
          setAuthToken(null);
        }
      } catch (error) {
        console.error('Error syncing token:', error);
      }
    };

    syncToken();
    // Interval to refresh token if needed
    const intervalId = setInterval(syncToken, 55000);
    return () => clearInterval(intervalId);
  }, [getToken, isSignedIn]);

  return null;
};

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthInitializer />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public Auth Routes managed by Clerk */}
        <Route path="/login/*" element={<div className="flex justify-center items-center h-screen"><SignIn routing="path" path="/login" /></div>} />
        <Route path="/register/*" element={<div className="flex justify-center items-center h-screen"><SignUp routing="path" path="/register" /></div>} />

        <Route path="/calorie-calculator" element={<CalorieCalculator />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/food-log" element={<ProtectedRoute><FoodLog /></ProtectedRoute>} />
        <Route path="/workout-log" element={<ProtectedRoute><WorkoutLog /></ProtectedRoute>} />
        <Route path="/weight-log" element={<ProtectedRoute><WeightLog /></ProtectedRoute>} />
        <Route path="/ai-suggestions" element={<ProtectedRoute><AISuggestions /></ProtectedRoute>} />
        <Route path="/ai-workouts" element={<ProtectedRoute><AIGeneratedWorkouts /></ProtectedRoute>} />
        <Route path="/hydration-tracker" element={<ProtectedRoute><HydrationTracker /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

