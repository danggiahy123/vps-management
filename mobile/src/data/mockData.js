// Mock data for mobile app
export const mockUsers = [
  {
    id: "user-02",
    username: "john_doe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user"
  }
];

export const mockVMs = [
  {
    id: "vm-01",
    name: "web-01",
    ip: "10.0.0.5",
    ownerId: "user-02",
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
    ownerId: "user-02",
    status: "stopped",
    cpu: 35,
    ram: 50,
    disk: 40,
    os: "CentOS 8",
    createdAt: "2024-01-10T14:20:00Z"
  }
];

export const mockDomains = [
  {
    id: "domain-01",
    name: "example.com",
    ownerId: "user-02",
    vmId: "vm-01",
    status: "active",
    expiresAt: "2025-01-15T00:00:00Z",
    ssl: {
      enabled: true,
      expiresAt: "2024-04-15T00:00:00Z"
    }
  },
  {
    id: "domain-02",
    name: "api.example.com",
    ownerId: "user-02",
    vmId: "vm-03",
    status: "active",
    expiresAt: "2025-01-15T00:00:00Z",
    ssl: {
      enabled: true,
      expiresAt: "2024-04-15T00:00:00Z"
    }
  }
];

export const mockAlerts = [
  {
    id: "alert-001",
    vmId: "vm-01",
    title: "High CPU Usage",
    message: "CPU usage has exceeded 80% for the past 5 minutes",
    type: "warning",
    status: "active",
    createdAt: "2024-01-20T02:00:00Z"
  },
  {
    id: "alert-002",
    vmId: "vm-02",
    title: "Memory Usage Warning",
    message: "Memory usage is at 85% capacity",
    type: "warning",
    status: "active",
    createdAt: "2024-01-20T02:00:00Z"
  },
  {
    id: "alert-003",
    vmId: "vm-01",
    title: "SSL Certificate Expiring Soon",
    message: "SSL certificate expires in 30 days",
    type: "info",
    status: "active",
    createdAt: "2024-01-20T00:00:00Z"
  }
];

export const mockMetrics = [
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
