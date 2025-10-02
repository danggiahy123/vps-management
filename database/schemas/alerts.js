/**
 * Alerts Collection Schema
 * Quản lý alerts và notifications
 */

const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  // Associated Resources
  vmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VM',
    default: null
  },
  
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    default: null
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Alert Information
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical', 'success'],
    required: true
  },
  
  category: {
    type: String,
    enum: ['system', 'performance', 'security', 'billing', 'maintenance', 'network'],
    required: true
  },
  
  // Alert Status
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved', 'dismissed'],
    default: 'active'
  },
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  
  // Alert Data
  data: {
    metric: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: null
    },
    threshold: {
      type: Number,
      default: null
    },
    previousValue: {
      type: Number,
      default: null
    }
  },
  
  // Notification Settings
  notifications: {
    email: {
      enabled: {
        type: Boolean,
        default: true
      },
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: {
        type: Date,
        default: null
      }
    },
    
    sms: {
      enabled: {
        type: Boolean,
        default: false
      },
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: {
        type: Date,
        default: null
      }
    },
    
    push: {
      enabled: {
        type: Boolean,
        default: true
      },
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: {
        type: Date,
        default: null
      }
    },
    
    webhook: {
      enabled: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: null
      },
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: {
        type: Date,
        default: null
      }
    }
  },
  
  // Resolution Information
  resolution: {
    acknowledgedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    acknowledgedAt: {
      type: Date,
      default: null
    },
    
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    
    resolutionNote: {
      type: String,
      default: null,
      maxlength: 500
    }
  },
  
  // Auto-resolution
  autoResolve: {
    enabled: {
      type: Boolean,
      default: false
    },
    condition: {
      type: String,
      default: null
    },
    timeout: {
      type: Number,
      default: null // minutes
    }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  expiresAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age in minutes
alertSchema.virtual('ageMinutes').get(function() {
  const now = new Date();
  const diffTime = now - this.createdAt;
  return Math.floor(diffTime / (1000 * 60));
});

// Virtual for is acknowledged
alertSchema.virtual('isAcknowledged').get(function() {
  return this.status === 'acknowledged' || this.status === 'resolved';
});

// Virtual for is resolved
alertSchema.virtual('isResolved').get(function() {
  return this.status === 'resolved';
});

// Virtual for is expired
alertSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

// Indexes
alertSchema.index({ userId: 1, status: 1, createdAt: -1 });
alertSchema.index({ vmId: 1, status: 1, createdAt: -1 });
alertSchema.index({ domainId: 1, status: 1, createdAt: -1 });
alertSchema.index({ type: 1, priority: 1, createdAt: -1 });
alertSchema.index({ status: 1, createdAt: -1 });
alertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Alert', alertSchema);
