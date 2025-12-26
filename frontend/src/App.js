import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AISuggestions from "./pages/AISuggestions";
import AIGeneratedWorkouts from "./pages/AIGeneratedWorkouts";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CalorieCalculator from "./pages/CalorieCalculator";
import FoodLog from "./pages/FoodLog";
import WorkoutLog from "./pages/WorkoutLog";
import WeightLog from "./pages/WeightLog";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/food-log" element={<FoodLog />} />
          <Route path="/workout-log" element={<WorkoutLog />} />
          <Route path="/weight-log" element={<WeightLog />} />
          <Route path="/ai-suggestions" element={<AISuggestions />} />
          <Route path="/ai-workouts" element={<AIGeneratedWorkouts />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

