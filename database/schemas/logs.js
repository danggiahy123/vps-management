/**
 * Logs Collection Schema
 * Quản lý activity logs và audit trails
 */

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Resource Information
  resourceType: {
    type: String,
    enum: ['vm', 'domain', 'user', 'system', 'billing'],
    required: true
  },
  
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  
  // Action Information
  action: {
    type: String,
    required: true,
    enum: [
      // VM Actions
      'vm_create', 'vm_start', 'vm_stop', 'vm_restart', 'vm_delete', 'vm_update',
      'vm_backup', 'vm_restore', 'vm_resize', 'vm_migrate',
      
      // Domain Actions
      'domain_create', 'domain_update', 'domain_delete', 'domain_transfer',
      'dns_record_create', 'dns_record_update', 'dns_record_delete',
      'ssl_install', 'ssl_renew', 'ssl_revoke',
      
      // User Actions
      'user_login', 'user_logout', 'user_register', 'user_update', 'user_delete',
      'password_change', 'password_reset', 'email_verify',
      
      // System Actions
      'system_start', 'system_stop', 'system_maintenance', 'system_update',
      'backup_create', 'backup_delete', 'backup_restore',
      
      // Billing Actions
      'payment_success', 'payment_failed', 'invoice_generated', 'invoice_paid',
      'subscription_create', 'subscription_update', 'subscription_cancel'
    ]
  },
  
  // Log Details
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  
  // Status
  status: {
    type: String,
    enum: ['success', 'failed', 'pending', 'cancelled'],
    required: true
  },
  
  // Severity Level
  level: {
    type: String,
    enum: ['debug', 'info', 'warn', 'error', 'critical'],
    default: 'info'
  },
  
  // Additional Data
  metadata: {
    ip: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    },
    sessionId: {
      type: String,
      default: null
    },
    requestId: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: null // milliseconds
    },
    errorCode: {
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  
  // Changes Tracking (for audit)
  changes: {
    before: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    after: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  
  // Location Information
  location: {
    country: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    coordinates: {
      latitude: {
        type: Number,
        default: null
      },
      longitude: {
        type: Number,
        default: null
      }
    }
  },
  
  // Timestamp
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Retention
  retention: {
    type: Number,
    default: 90 // days
  }
}, {
  timestamps: false, // We use custom timestamp field
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for age in days
logSchema.virtual('ageDays').get(function() {
  const now = new Date();
  const diffTime = now - this.timestamp;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is recent (within last 24 hours)
logSchema.virtual('isRecent').get(function() {
  const now = new Date();
  const diffTime = now - this.timestamp;
  return diffTime < (24 * 60 * 60 * 1000); // 24 hours
});

// Virtual for is failed action
logSchema.virtual('isFailed').get(function() {
  return this.status === 'failed';
});

// Indexes for efficient querying
logSchema.index({ userId: 1, timestamp: -1 });
logSchema.index({ resourceType: 1, resourceId: 1, timestamp: -1 });
logSchema.index({ action: 1, timestamp: -1 });
logSchema.index({ status: 1, timestamp: -1 });
logSchema.index({ level: 1, timestamp: -1 });
logSchema.index({ timestamp: -1 });
logSchema.index({ 'metadata.ip': 1, timestamp: -1 });

// TTL index for automatic cleanup
logSchema.index({ timestamp: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Log', logSchema);
