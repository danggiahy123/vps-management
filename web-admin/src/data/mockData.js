// Mock data for web admin
export const mockUsers = [
  {
    id: "user-01",
    username: "admin",
    email: "admin@vps-management.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "user-02",
    username: "john_doe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "user-03",
    username: "jane_smith",
    email: "jane.smith@techcorp.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "user",
    status: "active",
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: "user-04",
    username: "mike_wilson",
    email: "mike.wilson@startup.io",
    firstName: "Mike",
    lastName: "Wilson",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-08T11:15:00Z"
  },
  {
    id: "user-05",
    username: "sarah_johnson",
    email: "sarah.johnson@webdev.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "user",
    status: "active",
    createdAt: "2024-01-05T09:45:00Z"
  }
];

export const mockVMs = [
  {
    id: "vm-01",
    name: "web-01",
    ip: "10.0.0.5",
    ownerId: "user-02",
    ownerName: "John Doe",
    status: "running",
    cpu: 25,
    ram: 40,
    disk: 30,
    os: "Ubuntu 22.04 LTS",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "vm-02",
    name: "db-01",
    ip: "10.0.0.6",
    ownerId: "user-02",
    ownerName: "John Doe",
    status: "running",
    cpu: 45,
    ram: 70,
    disk: 60,
    os: "Ubuntu 22.04 LTS",
    createdAt: "2024-01-15T10:35:00Z"
  },
  {
    id: "vm-03",
    name: "api-01",
    ip: "10.0.0.7",
    ownerId: "user-03",
    ownerName: "Jane Smith",
    status: "stopped",
    cpu: 35,
    ram: 50,
    disk: 40,
    os: "CentOS 8",
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: "vm-04",
    name: "dev-01",
    ip: "10.0.0.8",
    ownerId: "user-03",
    ownerName: "Jane Smith",
    status: "stopped",
    cpu: 15,
    ram: 25,
    disk: 20,
    os: "Ubuntu 20.04 LTS",
    createdAt: "2024-01-10T14:25:00Z"
  },
  {
    id: "vm-05",
    name: "staging-01",
    ip: "10.0.0.9",
    ownerId: "user-04",
    ownerName: "Mike Wilson",
    status: "running",
    cpu: 20,
    ram: 35,
    disk: 25,
    os: "Debian 11",
    createdAt: "2024-01-08T11:15:00Z"
  }
];

export const mockDomains = [
  {
    id: "domain-01",
    name: "example.com",
    ownerId: "user-02",
    ownerName: "John Doe",
    status: "active",
    expiresAt: "2025-01-15T00:00:00Z",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "domain-02",
    name: "api.example.com",
    ownerId: "user-02",
    ownerName: "John Doe",
    status: "active",
    expiresAt: "2025-01-15T00:00:00Z",
    createdAt: "2024-01-10T14:20:00Z"
  },
  {
    id: "domain-03",
    name: "techcorp.com",
    ownerId: "user-03",
    ownerName: "Jane Smith",
    status: "active",
    expiresAt: "2024-08-20T00:00:00Z",
    createdAt: "2024-01-08T11:15:00Z"
  }
];

export const mockAlerts = [
  {
    id: "alert-001",
    vmId: "vm-01",
    vmName: "web-01",
    userId: "user-02",
    userName: "John Doe",
    title: "High CPU Usage",
    message: "CPU usage has exceeded 80% for the past 5 minutes",
    type: "warning",
    status: "active",
    createdAt: "2024-01-20T02:00:00Z"
  },
  {
    id: "alert-002",
    vmId: "vm-02",
    vmName: "db-01",
    userId: "user-02",
    userName: "John Doe",
    title: "Memory Usage Warning",
    message: "Memory usage is at 85% capacity",
    type: "warning",
    status: "acknowledged",
    createdAt: "2024-01-20T02:00:00Z"
  },
  {
    id: "alert-003",
    vmId: "vm-03",
    vmName: "api-01",
    userId: "user-03",
    userName: "Jane Smith",
    title: "Disk Space Critical",
    message: "Disk usage has reached 95%",
    type: "critical",
    status: "active",
    createdAt: "2024-01-20T01:45:00Z"
  }
];

export const mockLogs = [
  {
    id: "log-001",
    userId: "user-02",
    userName: "John Doe",
    action: "vm_start",
    description: "Started web-01 server",
    status: "success",
    timestamp: "2024-01-20T08:50:00Z"
  },
  {
    id: "log-002",
    userId: "user-02",
    userName: "John Doe",
    action: "vm_restart",
    description: "Restarted db-01 server",
    status: "success",
    timestamp: "2024-01-20T09:15:00Z"
  },
  {
    id: "log-003",
    userId: "user-03",
    userName: "Jane Smith",
    action: "vm_update",
    description: "Updated CPU allocation for api-01",
    status: "success",
    timestamp: "2024-01-20T10:30:00Z"
  },
  {
    id: "log-004",
    userId: "user-01",
    userName: "Admin User",
    action: "user_create",
    description: "Created new user sarah_johnson",
    status: "success",
    timestamp: "2024-01-05T09:45:00Z"
  },
  {
    id: "log-005",
    userId: "user-04",
    userName: "Mike Wilson",
    action: "vm_stop",
    description: "Stopped staging-01 server",
    status: "failed",
    timestamp: "2024-01-19T20:15:00Z"
  }
];

export const mockChartData = [
  { time: "00:00", cpu: 25, ram: 40 },
  { time: "01:00", cpu: 28, ram: 42 },
  { time: "02:00", cpu: 85, ram: 45 },
  { time: "03:00", cpu: 30, ram: 38 },
  { time: "04:00", cpu: 22, ram: 35 },
  { time: "05:00", cpu: 18, ram: 32 },
  { time: "06:00", cpu: 35, ram: 48 },
  { time: "07:00", cpu: 45, ram: 52 },
  { time: "08:00", cpu: 55, ram: 58 },
  { time: "09:00", cpu: 65, ram: 62 },
  { time: "10:00", cpu: 70, ram: 65 },
  { time: "11:00", cpu: 75, ram: 68 }
];
