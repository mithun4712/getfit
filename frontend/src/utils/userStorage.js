/**
 * User-specific localStorage utility
 * Ensures data is scoped to the current logged-in user
 */

let currentUserId = null;

export const setCurrentUserId = (userId) => {
    currentUserId = userId;
};

export const getCurrentUserId = () => {
    return currentUserId;
};

/**
 * Get a user-specific localStorage key
 */
const getUserKey = (key) => {
    if (!currentUserId) {
        console.warn('No user ID set for localStorage operation');
        return key; // Fallback to non-prefixed key
    }
    return `user_${currentUserId}_${key}`;
};

/**
 * Set item in localStorage with user-specific key
 */
export const setUserItem = (key, value) => {
    try {
        const userKey = getUserKey(key);
        localStorage.setItem(userKey, value);
    } catch (error) {
        console.error('Error setting user item:', error);
    }
};

/**
 * Get item from localStorage with user-specific key
 */
export const getUserItem = (key) => {
    try {
        const userKey = getUserKey(key);
        return localStorage.getItem(userKey);
    } catch (error) {
        console.error('Error getting user item:', error);
        return null;
    }
};

/**
 * Remove item from localStorage with user-specific key
 */
export const removeUserItem = (key) => {
    try {
        const userKey = getUserKey(key);
        localStorage.removeItem(userKey);
    } catch (error) {
        console.error('Error removing user item:', error);
    }
};

/**
 * Clear all data for the current user
 */
export const clearUserData = () => {
    if (!currentUserId) return;

    const prefix = `user_${currentUserId}_`;
    const keysToRemove = [];

    // Find all keys for this user
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
            keysToRemove.push(key);
        }
    }

    // Remove them
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared ${keysToRemove.length} items for user ${currentUserId}`);
};

/**
 * Clear all user data when switching accounts
 */
export const clearAllUserData = () => {
    const keysToRemove = [];

    // Find all user-specific keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user_')) {
            keysToRemove.push(key);
        }
    }

    // Remove them
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared all user data (${keysToRemove.length} items)`);
};
