/**
 * Domains Collection Schema
 * Quản lý thông tin domain và DNS
 */

const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `domain_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/, 'Please enter a valid domain name']
  },
  
  // Ownership
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Associated VM
  vmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VM',
    required: true
  },
  
  // Domain Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'expired', 'suspended'],
    default: 'pending'
  },
  
  // Domain Configuration
  type: {
    type: String,
    enum: ['primary', 'subdomain', 'alias'],
    default: 'primary'
  },
  
  parentDomain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    default: null
  },
  
  // DNS Records
  dnsRecords: [{
    type: {
      type: String,
      enum: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    ttl: {
      type: Number,
      default: 3600 // seconds
    },
    priority: {
      type: Number,
      default: null // for MX and SRV records
    }
  }],
  
  // SSL Certificate
  ssl: {
    enabled: {
      type: Boolean,
      default: false
    },
    certificate: {
      type: String,
      default: null
    },
    privateKey: {
      type: String,
      default: null
    },
    issuer: {
      type: String,
      default: null
    },
    expiresAt: {
      type: Date,
      default: null
    },
    autoRenew: {
      type: Boolean,
      default: true
    }
  },
  
  // Domain Provider Information
  provider: {
    name: {
      type: String,
      required: true,
      enum: ['Cloudflare', 'GoDaddy', 'Namecheap', 'Route53', 'Custom']
    },
    accountId: {
      type: String,
      default: null
    },
    apiKey: {
      type: String,
      default: null
    }
  },
  
  // Registration Information
  registration: {
    registrar: {
      type: String,
      required: true
    },
    registeredAt: {
      type: Date,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    autoRenew: {
      type: Boolean,
      default: true
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  
  // Pricing
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
  
  // Monitoring
  monitoring: {
    enabled: {
      type: Boolean,
      default: true
    },
    uptime: {
      type: Number,
      default: 100 // percentage
    },
    lastCheck: {
      type: Date,
      default: Date.now
    },
    responseTime: {
      type: Number,
      default: null // milliseconds
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for days until expiry
domainSchema.virtual('daysUntilExpiry').get(function() {
  const now = new Date();
  const diffTime = this.registration.expiresAt - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for is expired
domainSchema.virtual('isExpired').get(function() {
  return this.registration.expiresAt < new Date();
});

// Virtual for SSL expiry days
domainSchema.virtual('sslDaysUntilExpiry').get(function() {
  if (!this.ssl.enabled || !this.ssl.expiresAt) return null;
  const now = new Date();
  const diffTime = this.ssl.expiresAt - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes
domainSchema.index({ ownerId: 1 });
domainSchema.index({ vmId: 1 });
domainSchema.index({ name: 1 });
domainSchema.index({ status: 1 });
domainSchema.index({ 'registration.expiresAt': 1 });
domainSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Domain', domainSchema);

