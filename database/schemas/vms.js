/**
 * VMs Collection Schema
 * Quản lý thông tin máy ảo VPS
 */

const mongoose = require('mongoose');

const vmSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `vm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  
  // Network Information
  ip: {
    type: String,
    required: true,
    unique: true,
    match: [/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 'Please enter a valid IP address']
  },
  
  ipv6: {
    type: String,
    default: null
  },
  
  // Ownership
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // VM Configuration
  status: {
    type: String,
    enum: ['running', 'stopped', 'starting', 'stopping', 'restarting', 'maintenance', 'error'],
    default: 'stopped'
  },
  
  // Hardware Specifications
  cpu: {
    cores: {
      type: Number,
      required: true,
      min: 1,
      max: 32
    },
    speed: {
      type: Number, // GHz
      required: true,
      min: 1.0
    }
  },
  
  ram: {
    size: {
      type: Number, // GB
      required: true,
      min: 1
    },
    type: {
      type: String,
      enum: ['DDR3', 'DDR4', 'DDR5'],
      default: 'DDR4'
    }
  },
  
  disk: {
    size: {
      type: Number, // GB
      required: true,
      min: 10
    },
    type: {
      type: String,
      enum: ['HDD', 'SSD', 'NVMe'],
      default: 'SSD'
    },
    used: {
      type: Number, // GB
      default: 0
    }
  },
  
  // Operating System
  os: {
    name: {
      type: String,
      required: true,
      enum: ['Ubuntu', 'CentOS', 'Debian', 'Windows Server', 'Fedora', 'Alpine']
    },
    version: {
      type: String,
      required: true
    },
    architecture: {
      type: String,
      enum: ['x86_64', 'ARM64'],
      default: 'x86_64'
    }
  },
  
  // Network & Bandwidth
  bandwidth: {
    monthly: {
      type: Number, // GB/month
      required: true,
      min: 100
    },
    used: {
      type: Number, // GB
      default: 0
    },
    resetDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }
  },
  
  // Location & Provider
  location: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    datacenter: {
      type: String,
      required: true
    }
  },
  
  // Pricing & Billing
  pricing: {
    monthly: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'VND'],
      default: 'USD'
    }
  },
  
  // Backup Configuration
  backup: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    retention: {
      type: Number, // days
      default: 7
    },
    lastBackup: {
      type: Date,
      default: null
    }
  },
  
  // Monitoring & Alerts
  monitoring: {
    enabled: {
      type: Boolean,
      default: true
    },
    cpuThreshold: {
      type: Number,
      default: 80 // percentage
    },
    ramThreshold: {
      type: Number,
      default: 85 // percentage
    },
    diskThreshold: {
      type: Number,
      default: 90 // percentage
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
  
  expiry: {
    type: Date,
    required: true
  },
  
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for disk usage percentage
vmSchema.virtual('diskUsagePercent').get(function() {
  return this.disk.size > 0 ? (this.disk.used / this.disk.size) * 100 : 0;
});

// Virtual for bandwidth usage percentage
vmSchema.virtual('bandwidthUsagePercent').get(function() {
  return this.bandwidth.monthly > 0 ? (this.bandwidth.used / this.bandwidth.monthly) * 100 : 0;
});

// Virtual for days until expiry
vmSchema.virtual('daysUntilExpiry').get(function() {
  const now = new Date();
  const diffTime = this.expiry - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is expired
vmSchema.virtual('isExpired').get(function() {
  return this.expiry < new Date();
});

// Indexes
vmSchema.index({ ownerId: 1 });
vmSchema.index({ status: 1 });
vmSchema.index({ ip: 1 });
vmSchema.index({ createdAt: -1 });
vmSchema.index({ expiry: 1 });
vmSchema.index({ 'location.country': 1, 'location.city': 1 });

module.exports = mongoose.model('VM', vmSchema);

