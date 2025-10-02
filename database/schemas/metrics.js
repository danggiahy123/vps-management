/**
 * Metrics Collection Schema
 * Quản lý metrics và monitoring data
 */

const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  // Associated Resources
  vmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VM',
    required: true
  },
  
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    default: null
  },
  
  // Metric Type
  type: {
    type: String,
    enum: ['cpu', 'memory', 'disk', 'network', 'uptime', 'response_time', 'bandwidth'],
    required: true
  },
  
  // Metric Data
  data: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      enum: ['%', 'MB', 'GB', 'TB', 'ms', 'seconds', 'bytes', 'packets']
    },
    threshold: {
      warning: {
        type: Number,
        default: null
      },
      critical: {
        type: Number,
        default: null
      }
    }
  },
  
  // Additional Context
  context: {
    process: {
      type: String,
      default: null
    },
    interface: {
      type: String,
      default: null
    },
    mountPoint: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    }
  },
  
  // Status
  status: {
    type: String,
    enum: ['normal', 'warning', 'critical'],
    default: 'normal'
  },
  
  // Timestamp
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Data Source
  source: {
    type: String,
    enum: ['agent', 'api', 'snmp', 'ping', 'http'],
    default: 'agent'
  },
  
  // Retention
  retention: {
    type: Number,
    default: 30 // days
  }
}, {
  timestamps: false, // We use custom timestamp field
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age in hours
metricsSchema.virtual('ageHours').get(function() {
  const now = new Date();
  const diffTime = now - this.timestamp;
  return Math.floor(diffTime / (1000 * 60 * 60));
});

// Virtual for is recent (within last hour)
metricsSchema.virtual('isRecent').get(function() {
  const now = new Date();
  const diffTime = now - this.timestamp;
  return diffTime < (60 * 60 * 1000); // 1 hour
});

// Indexes for efficient querying
metricsSchema.index({ vmId: 1, type: 1, timestamp: -1 });
metricsSchema.index({ domainId: 1, type: 1, timestamp: -1 });
metricsSchema.index({ timestamp: -1 });
metricsSchema.index({ status: 1, timestamp: -1 });
metricsSchema.index({ 'data.value': 1, timestamp: -1 });

// TTL index for automatic cleanup
metricsSchema.index({ timestamp: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Metrics', metricsSchema);

