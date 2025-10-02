/**
 * Sample Data Seeder
 * Tạo dữ liệu mẫu cho development và testing
 */

const { User, VM, Domain, Metrics, Alert, Log, dbUtils } = require('../index');

// Sample Users
const sampleUsers = [
  {
    id: 'user_admin_001',
    username: 'admin',
    email: 'admin@vps-management.com',
    password: '$2b$10$rQZ8K9mP2nL3oV4wX5yZ6eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_billing'],
    status: 'active',
    emailVerified: true,
    billingInfo: {
      company: 'VPS Management Corp',
      address: '123 Tech Street',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      postalCode: '700000'
    }
  },
  {
    id: 'user_customer_001',
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: '$2b$10$rQZ8K9mP2nL3oV4wX5yZ6eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    permissions: ['read', 'write'],
    status: 'active',
    emailVerified: true,
    billingInfo: {
      company: 'Doe Enterprises',
      address: '456 Business Ave',
      city: 'Hanoi',
      country: 'Vietnam',
      postalCode: '100000'
    }
  },
  {
    id: 'user_viewer_001',
    username: 'viewer_user',
    email: 'viewer@example.com',
    password: '$2b$10$rQZ8K9mP2nL3oV4wX5yZ6eF7gH8iJ9kL0mN1oP2qR3sT4uV5wX6yZ7',
    firstName: 'Viewer',
    lastName: 'User',
    role: 'viewer',
    permissions: ['read'],
    status: 'active',
    emailVerified: true
  }
];

// Sample VMs
const sampleVMs = [
  {
    id: 'vm_prod_001',
    name: 'Production Server',
    description: 'Main production server for web applications',
    ip: '192.168.1.100',
    ownerId: 'user_customer_001',
    status: 'running',
    cpu: { cores: 4, speed: 2.4 },
    ram: { size: 8, type: 'DDR4' },
    disk: { size: 100, type: 'SSD', used: 45 },
    os: { name: 'Ubuntu', version: '22.04 LTS', architecture: 'x86_64' },
    bandwidth: { monthly: 1000, used: 250 },
    location: { country: 'Vietnam', city: 'Ho Chi Minh City', datacenter: 'SG1' },
    pricing: { monthly: 50, currency: 'USD' },
    backup: { enabled: true, frequency: 'daily', retention: 7 },
    monitoring: { enabled: true, cpuThreshold: 80, ramThreshold: 85, diskThreshold: 90 },
    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
  },
  {
    id: 'vm_dev_001',
    name: 'Development Server',
    description: 'Development and testing environment',
    ip: '192.168.1.101',
    ownerId: 'user_customer_001',
    status: 'stopped',
    cpu: { cores: 2, speed: 2.0 },
    ram: { size: 4, type: 'DDR4' },
    disk: { size: 50, type: 'SSD', used: 20 },
    os: { name: 'Ubuntu', version: '20.04 LTS', architecture: 'x86_64' },
    bandwidth: { monthly: 500, used: 100 },
    location: { country: 'Vietnam', city: 'Hanoi', datacenter: 'HN1' },
    pricing: { monthly: 25, currency: 'USD' },
    backup: { enabled: false },
    monitoring: { enabled: true, cpuThreshold: 80, ramThreshold: 85, diskThreshold: 90 },
    expiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 6 months from now
  },
  {
    id: 'vm_test_001',
    name: 'Test Server',
    description: 'Testing and staging environment',
    ip: '192.168.1.102',
    ownerId: 'user_admin_001',
    status: 'running',
    cpu: { cores: 1, speed: 1.8 },
    ram: { size: 2, type: 'DDR4' },
    disk: { size: 25, type: 'SSD', used: 15 },
    os: { name: 'CentOS', version: '8', architecture: 'x86_64' },
    bandwidth: { monthly: 200, used: 50 },
    location: { country: 'Singapore', city: 'Singapore', datacenter: 'SG2' },
    pricing: { monthly: 15, currency: 'USD' },
    backup: { enabled: true, frequency: 'weekly', retention: 4 },
    monitoring: { enabled: true, cpuThreshold: 80, ramThreshold: 85, diskThreshold: 90 },
    expiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 3 months from now
  }
];

// Sample Domains
const sampleDomains = [
  {
    id: 'domain_prod_001',
    name: 'example.com',
    ownerId: 'user_customer_001',
    vmId: 'vm_prod_001',
    status: 'active',
    type: 'primary',
    dnsRecords: [
      { type: 'A', name: '@', value: '192.168.1.100', ttl: 3600 },
      { type: 'A', name: 'www', value: '192.168.1.100', ttl: 3600 },
      { type: 'MX', name: '@', value: 'mail.example.com', ttl: 3600, priority: 10 }
    ],
    ssl: {
      enabled: true,
      issuer: 'Let\'s Encrypt',
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      autoRenew: true
    },
    provider: { name: 'Cloudflare', accountId: 'cf_123456' },
    registration: {
      registrar: 'GoDaddy',
      registeredAt: new Date('2023-01-15'),
      expiresAt: new Date('2025-01-15'),
      autoRenew: true,
      locked: true
    },
    pricing: { monthly: 10, currency: 'USD' },
    monitoring: { enabled: true, uptime: 99.9, responseTime: 150 }
  },
  {
    id: 'domain_dev_001',
    name: 'dev.example.com',
    ownerId: 'user_customer_001',
    vmId: 'vm_dev_001',
    status: 'active',
    type: 'subdomain',
    dnsRecords: [
      { type: 'A', name: '@', value: '192.168.1.101', ttl: 3600 }
    ],
    ssl: { enabled: false },
    provider: { name: 'Cloudflare', accountId: 'cf_123456' },
    registration: {
      registrar: 'GoDaddy',
      registeredAt: new Date('2023-01-15'),
      expiresAt: new Date('2025-01-15'),
      autoRenew: true,
      locked: false
    },
    pricing: { monthly: 0, currency: 'USD' },
    monitoring: { enabled: true, uptime: 95.5, responseTime: 200 }
  }
];

// Sample Metrics (last 24 hours)
const generateSampleMetrics = () => {
  const metrics = [];
  const now = new Date();
  const vmIds = ['vm_prod_001', 'vm_dev_001', 'vm_test_001'];
  const types = ['cpu', 'memory', 'disk', 'network'];
  
  vmIds.forEach(vmId => {
    types.forEach(type => {
      for (let i = 0; i < 24; i++) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        let value, unit, threshold;
        
        switch (type) {
          case 'cpu':
            value = Math.random() * 100;
            unit = '%';
            threshold = { warning: 70, critical: 90 };
            break;
          case 'memory':
            value = Math.random() * 8;
            unit = 'GB';
            threshold = { warning: 6, critical: 7 };
            break;
          case 'disk':
            value = Math.random() * 100;
            unit = 'GB';
            threshold = { warning: 80, critical: 95 };
            break;
          case 'network':
            value = Math.random() * 1000;
            unit = 'MB';
            threshold = { warning: 800, critical: 950 };
            break;
        }
        
        metrics.push({
          id: `metric_${vmId}_${type}_${timestamp.getTime()}`,
          vmId,
          type,
          data: { value, unit, threshold },
          status: value > threshold.critical ? 'critical' : value > threshold.warning ? 'warning' : 'normal',
          timestamp,
          source: 'agent'
        });
      }
    });
  });
  
  return metrics;
};

// Sample Alerts
const sampleAlerts = [
  {
    id: 'alert_cpu_001',
    vmId: 'vm_prod_001',
    userId: 'user_customer_001',
    title: 'High CPU Usage',
    message: 'CPU usage has exceeded 90% for the past 5 minutes',
    type: 'warning',
    category: 'performance',
    status: 'active',
    priority: 'high',
    data: {
      metric: 'cpu',
      value: 92.5,
      threshold: 90
    },
    notifications: {
      email: { enabled: true, sent: true, sentAt: new Date() },
      push: { enabled: true, sent: true, sentAt: new Date() }
    }
  },
  {
    id: 'alert_disk_001',
    vmId: 'vm_dev_001',
    userId: 'user_customer_001',
    title: 'Disk Space Warning',
    message: 'Disk usage is at 85% capacity',
    type: 'warning',
    category: 'performance',
    status: 'acknowledged',
    priority: 'medium',
    data: {
      metric: 'disk',
      value: 85,
      threshold: 80
    },
    notifications: {
      email: { enabled: true, sent: true, sentAt: new Date() },
      push: { enabled: true, sent: true, sentAt: new Date() }
    },
    resolution: {
      acknowledgedBy: 'user_customer_001',
      acknowledgedAt: new Date()
    }
  }
];

// Sample Logs
const sampleLogs = [
  {
    id: 'log_login_001',
    userId: 'user_customer_001',
    resourceType: 'user',
    resourceId: 'user_customer_001',
    action: 'user_login',
    description: 'User logged in successfully',
    status: 'success',
    level: 'info',
    metadata: {
      ip: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      sessionId: 'sess_123456789'
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'log_vm_start_001',
    userId: 'user_customer_001',
    resourceType: 'vm',
    resourceId: 'vm_prod_001',
    action: 'vm_start',
    description: 'Started Production Server',
    status: 'success',
    level: 'info',
    metadata: {
      ip: '192.168.1.50',
      duration: 45000 // 45 seconds
    },
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    id: 'log_vm_stop_001',
    userId: 'user_customer_001',
    resourceType: 'vm',
    resourceId: 'vm_dev_001',
    action: 'vm_stop',
    description: 'Stopped Development Server',
    status: 'success',
    level: 'info',
    metadata: {
      ip: '192.168.1.50',
      duration: 30000 // 30 seconds
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  }
];

// Seeder function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await dbUtils.clearAll();
    
    // Insert sample data
    console.log('👤 Seeding users...');
    await User.insertMany(sampleUsers);
    
    console.log('🖥️ Seeding VMs...');
    await VM.insertMany(sampleVMs);
    
    console.log('🌐 Seeding domains...');
    await Domain.insertMany(sampleDomains);
    
    console.log('📊 Seeding metrics...');
    const sampleMetrics = generateSampleMetrics();
    await Metrics.insertMany(sampleMetrics);
    
    console.log('🚨 Seeding alerts...');
    await Alert.insertMany(sampleAlerts);
    
    console.log('📝 Seeding logs...');
    await Log.insertMany(sampleLogs);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Seeded ${sampleUsers.length} users, ${sampleVMs.length} VMs, ${sampleDomains.length} domains`);
    console.log(`📈 Seeded ${sampleMetrics.length} metrics, ${sampleAlerts.length} alerts, ${sampleLogs.length} logs`);
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Export seeder
module.exports = {
  seedDatabase,
  sampleUsers,
  sampleVMs,
  sampleDomains,
  sampleAlerts,
  sampleLogs
};

