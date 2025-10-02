# 🗄️ Database Documentation

## 📋 Overview
Database layer cho VPS Management System sử dụng MongoDB với Mongoose ODM.

## 🏗️ Structure
```
database/
├── schemas/           # Mongoose schemas
│   ├── users.js      # Users collection
│   ├── vms.js        # VMs collection
│   ├── domains.js    # Domains collection
│   ├── metrics.js    # Metrics collection
│   ├── alerts.js     # Alerts collection
│   └── logs.js       # Logs collection
├── seeders/          # Data seeders
│   └── sample-data.js
├── index.js          # Database connection & exports
├── DATA_MODEL.md     # Complete data model documentation
└── README.md         # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install mongoose
```

### 2. Environment Variables
```bash
# .env
MONGODB_URI=mongodb://localhost:27017/vps-management
NODE_ENV=development
```

### 3. Connect to Database
```javascript
const { connectDB, User, VM, Domain } = require('./database');

// Connect
await connectDB();

// Use models
const users = await User.find({});
const vms = await VM.find({ status: 'running' });
```

### 4. Seed Sample Data
```javascript
const { seedDatabase } = require('./database/seeders/sample-data');

// Seed database with sample data
await seedDatabase();
```

## 📊 Collections Overview

| Collection | Purpose | Key Features |
|------------|---------|--------------|
| **users** | User management & auth | Roles, permissions, billing |
| **vms** | VPS management | Hardware specs, pricing, expiry |
| **domains** | Domain & DNS | SSL, DNS records, monitoring |
| **metrics** | Performance data | CPU, RAM, disk, network |
| **alerts** | Notifications | Multi-channel, priority levels |
| **logs** | Audit trail | Activity tracking, changes |

## 🔧 Usage Examples

### Users
```javascript
// Create user
const user = new User({
  username: 'john_doe',
  email: 'john@example.com',
  role: 'user',
  permissions: ['read', 'write']
});
await user.save();

// Find users by role
const admins = await User.find({ role: 'admin' });
```

### VMs
```javascript
// Create VM
const vm = new VM({
  name: 'Production Server',
  ip: '192.168.1.100',
  ownerId: user._id,
  cpu: { cores: 4, speed: 2.4 },
  ram: { size: 8, type: 'DDR4' },
  disk: { size: 100, type: 'SSD' }
});
await vm.save();

// Find VMs by owner
const userVMs = await VM.find({ ownerId: user._id });
```

### Metrics
```javascript
// Create metric
const metric = new Metrics({
  vmId: vm._id,
  type: 'cpu',
  data: { value: 75.5, unit: '%' },
  timestamp: new Date()
});
await metric.save();

// Get recent metrics
const recentMetrics = await Metrics
  .find({ vmId: vm._id })
  .sort({ timestamp: -1 })
  .limit(100);
```

### Alerts
```javascript
// Create alert
const alert = new Alert({
  vmId: vm._id,
  userId: user._id,
  title: 'High CPU Usage',
  message: 'CPU usage exceeded 90%',
  type: 'warning',
  priority: 'high'
});
await alert.save();

// Get active alerts
const activeAlerts = await Alert.find({ status: 'active' });
```

## 🔍 Query Examples

### Complex Queries
```javascript
// VMs with high CPU usage
const highCpuVMs = await VM.aggregate([
  {
    $lookup: {
      from: 'metrics',
      localField: '_id',
      foreignField: 'vmId',
      as: 'metrics'
    }
  },
  {
    $match: {
      'metrics.type': 'cpu',
      'metrics.data.value': { $gt: 80 }
    }
  }
]);

// User activity summary
const userActivity = await Log.aggregate([
  {
    $match: {
      userId: user._id,
      timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }
  },
  {
    $group: {
      _id: '$action',
      count: { $sum: 1 },
      lastActivity: { $max: '$timestamp' }
    }
  }
]);
```

### Indexes Usage
```javascript
// Efficient queries using indexes
const recentLogs = await Log
  .find({ userId: user._id })
  .sort({ timestamp: -1 })
  .limit(50);

const expiredVMs = await VM
  .find({ expiry: { $lt: new Date() } })
  .sort({ expiry: 1 });
```

## 🛠️ Development Tools

### Database Utilities
```javascript
const { dbUtils } = require('./database');

// Check connection status
console.log(dbUtils.getStatus()); // 'connected'

// Clear all data (testing)
await dbUtils.clearAll();

// Close connection
await dbUtils.close();
```

### Sample Data
```javascript
const { seedDatabase } = require('./database/seeders/sample-data');

// Seed with sample data
await seedDatabase();
```

## 📈 Performance Considerations

### Indexes
- **Compound indexes** for complex queries
- **TTL indexes** for auto-cleanup
- **Text indexes** for search

### Data Retention
- **Metrics**: 30 days (configurable)
- **Logs**: 90 days (configurable)
- **Alerts**: Auto-expire based on status

### Virtual Fields
- Computed fields (disk usage %, expiry days)
- No storage overhead
- Business logic encapsulation

## 🔒 Security

### Data Validation
- Schema validation with Mongoose
- Custom validators for business rules
- Input sanitization

### Access Control
- User roles and permissions
- Resource ownership validation
- Audit logging

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [DATA_MODEL.md](./DATA_MODEL.md) - Complete data model documentation

---
**Last Updated**: $(date)  
**Version**: 1.0.0

