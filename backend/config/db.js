const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
    try {
        let dbUrl = process.env.MONGODB_URI;

        // Use memory server if no URI is provided or if we want to force it
        if (!dbUrl || process.env.NODE_ENV === 'test') {
            console.log('Using In-Memory MongoDB...');
            mongoServer = await MongoMemoryServer.create();
            dbUrl = mongoServer.getUri();
        }

        await mongoose.connect(dbUrl);
        console.log('MongoDB Connected successfully to Atlas or local instance.');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongoServer) {
            await mongoServer.stop();
        }
    } catch (err) {
        console.error('Database disconnection error:', err);
    }
};

module.exports = { connectDB, disconnectDB };
