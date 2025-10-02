# 📊 Mock Data Documentation

## 📋 Overview
Mock data cho VPS Management System với đầy đủ sample data để development và testing.

## 📁 Files Structure
```
mock-data/
├── users.json      # 10 users (2 admin + 8 customers)
├── vms.json        # 10 VMs với different configurations
├── domains.json    # 10 domains với DNS records
├── metrics.json    # Sample timeseries metrics data
├── alerts.json     # 10 alerts với different status
├── logs.json       # 25 activity logs
├── db.json         # Tổng hợp tất cả data
└── README.md       # This file
```

## 📊 Data Summary

### 👤 Users (10 records)
- **2 Admin users**: admin, support_agent
- **8 Customer users**: john_doe, jane_smith, mike_wilson, etc.
- **Roles**: admin, user, viewer
- **Status**: active, inactive, pending

### 🖥️ VMs (10 records)
- **Different status**: running, stopped
- **Various configurations**: CPU (1-4 cores), RAM (2-8GB), Disk (25-100GB)
- **OS**: Ubuntu, CentOS, Debian
- **Locations**: Ho Chi Minh City, Hanoi, Da Nang, Can Tho, Hue, etc.

### 🌐 Domains (10 records)
- **Types**: primary, subdomain
- **Status**: active, inactive
- **SSL**: enabled/disabled
- **DNS Records**: A, MX, CNAME records
- **Providers**: Cloudflare, Route53

### 📈 Metrics (40 records)
- **Types**: cpu, memory, disk, network
- **Timeseries data**: Last 24 hours
- **Status**: normal, warning, critical
- **Units**: %, GB, MB

### 🚨 Alerts (10 records)
- **Types**: info, warning, error, critical
- **Status**: active, acknowledged, resolved, dismissed
- **Priority**: low, medium, high, critical
- **Categories**: performance, system, network, security

### 📝 Logs (25 records)
- **Actions**: login, vm_start, vm_stop, vm_update, etc.
- **Status**: success, failed, pending
- **Levels**: info, warning, error
- **Resources**: vm, domain, user, system, billing

## 🔧 Usage Examples

### Load Individual Files
```javascript
// Load users
const users = require('./mock-data/users.json');

// Load VMs
const vms = require('./mock-data/vms.json');

// Load all data
const db = require('./mock-data/db.json');
```

### API Endpoints Mock
```javascript
// GET /api/users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/vms
app.get('/api/vms', (req, res) => {
  res.json(vms);
});

// GET /api/vms/:id
app.get('/api/vms/:id', (req, res) => {
  const vm = vms.find(v => v.id === req.params.id);
  res.json(vm);
});
```

### Database Seeding
```javascript
// Seed MongoDB
const { User, VM, Domain } = require('./database');

await User.insertMany(users);
await VM.insertMany(vms);
await Domain.insertMany(domains);
```

## 📊 Sample Queries

### Find VMs by Owner
```javascript
const userVMs = vms.filter(vm => vm.ownerId === 'user-02');
// Returns: web-01, db-01
```

### Find Active Alerts
```javascript
const activeAlerts = alerts.filter(alert => alert.status === 'active');
// Returns: 5 active alerts
```

### Find Recent Logs
```javascript
const recentLogs = logs.filter(log => 
  new Date(log.timestamp) > new Date('2024-01-20T00:00:00Z')
);
// Returns: logs from today
```

### Find High CPU Metrics
```javascript
const highCpuMetrics = metrics.filter(metric => 
  metric.type === 'cpu' && metric.value > 80
);
// Returns: metrics with CPU > 80%
```

## 🔗 Relationships

### User → VMs
- `user-02` owns: `vm-01`, `vm-02`
- `user-03` owns: `vm-03`, `vm-04`
- `user-04` owns: `vm-05`, `vm-06`

### VM → Domains
- `vm-01` hosts: `domain-01` (example.com)
- `vm-03` hosts: `domain-02` (api.example.com)
- `vm-05` hosts: `domain-03` (techcorp.com)

### VM → Metrics
- `vm-01` has: 8 metrics (cpu, memory, disk, network)
- `vm-02` has: 4 metrics
- `vm-03` has: 4 metrics

### VM → Alerts
- `vm-01` has: 2 alerts (CPU warning, SSL expiry)
- `vm-02` has: 2 alerts (Memory warning, DB connections)
- `vm-03` has: 2 alerts (Disk critical, API response time)

## 🎯 Use Cases

### Development
- **Frontend**: Use for UI development and testing
- **Backend**: Mock API responses
- **Mobile**: Test data display and interactions

### Testing
- **Unit Tests**: Test business logic with known data
- **Integration Tests**: Test API endpoints
- **UI Tests**: Test with realistic data scenarios

### Demo
- **Presentations**: Show realistic scenarios
- **Documentation**: Provide examples
- **Training**: Learn system functionality

## 📝 Data Notes

### Realistic Values
- **CPU**: 10-85% (mostly normal, some warnings)
- **Memory**: 1.6-6.8GB (realistic usage)
- **Disk**: 15-80GB (various sizes)
- **Network**: 45-203MB (realistic traffic)

### Timestamps
- **Users**: Created over time (Jan 1-20, 2024)
- **VMs**: Created with users
- **Metrics**: Last 24 hours
- **Alerts**: Recent issues
- **Logs**: Recent activities

### Status Distribution
- **VMs**: 8 running, 2 stopped
- **Domains**: 8 active, 2 inactive
- **Alerts**: 5 active, 3 acknowledged, 2 resolved
- **Logs**: 23 success, 2 failed

---
**Last Updated**: $(date)  
**Total Records**: 95+ records across 6 collections
