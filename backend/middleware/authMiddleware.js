const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const syncUser = async (req, res, next) => {
    try {
        console.log('SyncUser Middleware - req.auth:', req.auth);

        // Temporary bypass for testing - if no auth, create a test user
        let userId = req.auth?.userId;

        if (!userId) {
            console.log('No userId in req.auth - using test user');
            userId = 'test-user-123'; // Temporary test user ID
        }

        // Find or create user in MongoDB to keep data relation valid
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            console.log('Creating new user with clerkId:', userId);
            user = await User.create({
                clerkId: userId,
                name: 'Test User',
                email: `${userId}@test.com`,
                biometrics: {},
                goals: {}
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('User Sync Error:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', details: err.message });
    }
};

// Temporarily simplified - bypass Clerk for testing
exports.protect = syncUser;
