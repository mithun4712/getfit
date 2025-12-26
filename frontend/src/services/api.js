const API_URL = 'http://localhost:5000/api';

export const fetchFoodLogs = async () => {
    const response = await fetch(`${API_URL}/food-logs`);
    if (!response.ok) throw new Error('Failed to fetch food logs');
    return response.json();
};

export const addFoodLog = async (logData) => {
    const response = await fetch(`${API_URL}/food-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
    });
    if (!response.ok) throw new Error('Failed to add food log');
    return response.json();
};

export const deleteFoodLog = async (id) => {
    const response = await fetch(`${API_URL}/food-logs/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete food log');
    return response.json();
};

export const fetchWorkoutPlans = async () => {
    const response = await fetch(`${API_URL}/plans`);
    if (!response.ok) throw new Error('Failed to fetch workout plans');
    return response.json();
};

export const createWorkoutPlan = async (planData) => {
    const response = await fetch(`${API_URL}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
    });
    if (!response.ok) throw new Error('Failed to create workout plan');
    return response.json();
};

export const fetchWeightLogs = async () => {
    const response = await fetch(`${API_URL}/weight`);
    if (!response.ok) throw new Error('Failed to fetch weight logs');
    return response.json();
};

export const addWeightLog = async (weightData) => {
    const response = await fetch(`${API_URL}/weight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weightData)
    });
    if (!response.ok) throw new Error('Failed to add weight log');
    return response.json();
};
