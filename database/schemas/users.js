/**
 * Users Collection Schema
 * Quản lý thông tin người dùng và phân quyền
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Information
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Profile Information
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  avatar: {
    type: String,
    default: null
  },
  
  // Role & Permissions
  role: {
    type: String,
    enum: ['admin', 'user', 'viewer'],
    default: 'user'
  },
  
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'manage_users', 'manage_billing']
  }],
  
  // Account Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  },
  
  emailVerified: {
    type: Boolean,
    default: false
  },
  
  emailVerificationToken: {
    type: String,
    default: null
  },
  
  // Security
  lastLogin: {
    type: Date,
    default: null
  },
  
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockUntil: {
    type: Date,
    default: null
  },
  
  passwordResetToken: {
    type: String,
    default: null
  },
  
  passwordResetExpires: {
    type: Date,
    default: null
  },
  
  // Billing Information
  billingInfo: {
    company: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    taxId: String
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

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account locked status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
