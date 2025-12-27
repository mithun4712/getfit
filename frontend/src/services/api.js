// Determine API URL based on current environment
const getBaseUrl = () => {
    if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;

    // If running on localhost or LAN, assume backend is on same hostname but port 5000
    const hostname = window.location.hostname;
    return `http://${hostname}:5000/api`;
};

const API_URL = getBaseUrl();

let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
};

const getHeaders = () => {
    console.log('getHeaders using token:', authToken);
    return {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : ''
    };
};

// Legacy Auth functions removed. Clerk handles login/register/logout.

export const fetchFoodLogs = async () => {
    const response = await fetch(`${API_URL}/fitness/food`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch food logs');
    const result = await response.json();
    return result.data;
};

export const addFoodLog = async (logData) => {
    const response = await fetch(`${API_URL}/fitness/food`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(logData)
    });
    if (!response.ok) throw new Error('Failed to add food log');
    return response.json();
};

export const deleteFoodLog = async (id) => {
    const response = await fetch(`${API_URL}/fitness/food/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete food log');
    return response.json();
};

// Workout Plans
export const fetchWorkoutPlans = async () => {
    const response = await fetch(`${API_URL}/fitness/workouts`, {
        headers: getHeaders(),
        cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch workout plans');
    const result = await response.json();
    return result.data;
};

export const createWorkoutPlan = async (planData) => {
    const response = await fetch(`${API_URL}/fitness/workouts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(planData)
    });
    if (!response.ok) throw new Error('Failed to create workout plan');
    return response.json();
};

// Weight Logs
export const fetchWeightLogs = async () => {
    const response = await fetch(`${API_URL}/fitness/weight`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch weight logs');
    const result = await response.json();
    return result.data;
};

export const addWeightLog = async (weightData) => {
    const response = await fetch(`${API_URL}/fitness/weight`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(weightData)
    });
    if (!response.ok) throw new Error('Failed to add weight log');
    return response.json();
};

// AI Features
export const generateAIWorkout = async (data) => {
    const response = await fetch(`${API_URL}/ai/generate-workout`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to generate AI workout');
    return response.json();
};
