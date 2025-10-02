/**
 * Database Connection và Schema Registry
 * Kết nối MongoDB và export tất cả schemas
 */

const mongoose = require('mongoose');

// Import all schemas
const User = require('./schemas/users');
const VM = require('./schemas/vms');
const Domain = require('./schemas/domains');
const Metrics = require('./schemas/metrics');
const Alert = require('./schemas/alerts');
const Log = require('./schemas/logs');

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vps-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Database utilities
const dbUtils = {
  // Check if database is connected
  isConnected: () => mongoose.connection.readyState === 1,
  
  // Get connection status
  getStatus: () => {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState];
  },
  
  // Close database connection
  close: async () => {
    try {
      await mongoose.connection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  },
  
  // Clear all collections (for testing)
  clearAll: async () => {
    try {
      await User.deleteMany({});
      await VM.deleteMany({});
      await Domain.deleteMany({});
      await Metrics.deleteMany({});
      await Alert.deleteMany({});
      await Log.deleteMany({});
      console.log('All collections cleared');
    } catch (error) {
      console.error('Error clearing collections:', error);
    }
  }
};

// Export everything
module.exports = {
  // Database connection
  connectDB,
  
  // Models
  User,
  VM,
  Domain,
  Metrics,
  Alert,
  Log,
  
  // Utilities
  dbUtils,
  
  // Mongoose instance
  mongoose
};

