const mongoose = require("mongoose");

let connectionPromise = null;
let connectionError = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    if (connectionError) {
        throw connectionError;
    }

    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        bufferTimeoutMS: 30000,
    });

    try {
        const connection = await connectionPromise;
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        connectionPromise = null;
        connectionError = null;
        return connection;
    } catch (error) {
        connectionError = error;
        connectionPromise = null;
        console.error(`MongoDB Connection Failed: ${error.message}`);
        throw error;
    }
};

const getConnectionState = () => mongoose.connection.readyState;

const getConnectionPromise = () => {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    }

    if (connectionError) {
        return Promise.reject(connectionError);
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        bufferTimeoutMS: 30000,
    });

    connectionPromise
        .then((connection) => {
            console.log(`MongoDB Connected: ${connection.connection.host}`);
            connectionPromise = null;
            connectionError = null;
        })
        .catch((error) => {
            connectionError = error;
            connectionPromise = null;
            console.error(`MongoDB Connection Failed: ${error.message}`);
        });

    return connectionPromise;
};

module.exports = {
    connectDB,
    getConnectionState,
    getConnectionPromise
};
