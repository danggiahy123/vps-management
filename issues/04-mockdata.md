# 📊 Mock Data Implementation

## 📋 Issue Details
**Type**: Data  
**Priority**: Medium  
**Milestone**: MVP-5days  
**Estimated Time**: 0.5 day

## 🎯 Objectives
Create comprehensive mock data for VPS Management System

## 📝 Tasks
- [ ] Design VPS data structure
- [ ] Create user mock data
- [ ] Generate VPS instances data
- [ ] Add server metrics data
- [ ] Create activity logs
- [ ] Implement data seeding scripts
- [ ] Add realistic timestamps
- [ ] Create sample configurations

## 🗃️ Data Structures

### VPS Data
```json
{
  "id": "vps-001",
  "name": "Production Server",
  "status": "running",
  "ip": "192.168.1.100",
  "os": "Ubuntu 22.04",
  "cpu": "4 cores",
  "ram": "8GB",
  "storage": "100GB SSD",
  "bandwidth": "1TB/month",
  "createdAt": "2024-01-15T10:30:00Z",
  "lastBackup": "2024-01-20T02:00:00Z"
}
```

### User Data
```json
{
  "id": "user-001",
  "username": "admin",
  "email": "admin@example.com",
  "role": "admin",
  "permissions": ["read", "write", "delete"],
  "lastLogin": "2024-01-20T09:15:00Z"
}
```

## 📈 Sample Data Sets
- [ ] **10 VPS instances** with different statuses
- [ ] **5 users** with different roles
- [ ] **50 activity logs** spanning 30 days
- [ ] **Server metrics** for each VPS (CPU, RAM, Disk)
- [ ] **Backup records** for each VPS
- [ ] **Billing data** for demonstration

## 🔧 Implementation
- [ ] Create JSON files for static data
- [ ] Implement data seeding scripts
- [ ] Add random data generators
- [ ] Create API endpoints for mock data
- [ ] Add data reset functionality

## ✅ Definition of Done
- [ ] All mock data structures defined
- [ ] Sample data generated
- [ ] Data seeding scripts working
- [ ] API endpoints returning mock data
- [ ] Data covers all use cases
- [ ] Realistic timestamps and values

---
**Assignee**: TBD  
**Labels**: `mock-data`, `json`, `seeding`, `mvp`  
**Created**: $(date)
