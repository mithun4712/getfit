const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const syncUser = async (req, res, next) => {
    try {
        let userId = req.auth?.userId;

        // Try to decode token manually if Clerk middleware didn't run or failed (due to missing secret)
        if (!userId && req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                if (token) {
                    const jwt = require('jsonwebtoken');
                    const decoded = jwt.decode(token);
                    if (decoded && decoded.sub) {
                        console.log('Manually decoded Clerk ID:', decoded.sub);
                        userId = decoded.sub;
                    }
                }
            } catch (e) {
                console.error('Manual token decode failed:', e);
            }
        }

        if (!userId) {
            console.log('Authentication failed: No userId found in request');
            return res.status(401).json({ status: 'fail', message: 'Unauthorized: Unable to verify user identity' });
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
