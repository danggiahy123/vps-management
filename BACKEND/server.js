const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const { authenticateToken, requireAdmin, requireUserOrAdmin } = require('./middleware/auth');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'VPS Management Backend API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes - require authentication
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      user: req.user
    }
  });
});

// Admin only routes
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  const fs = require('fs');
  try {
    const usersPath = path.join(__dirname, '../mock-data/users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    
    // Remove passwords from response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: usersWithoutPasswords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users'
    });
  }
});

// User or Admin routes
app.get('/api/vps', authenticateToken, requireUserOrAdmin, (req, res) => {
  const fs = require('fs');
  try {
    const vmsPath = path.join(__dirname, '../mock-data/vms.json');
    const vms = JSON.parse(fs.readFileSync(vmsPath, 'utf8'));
    
    res.json({
      success: true,
      message: 'VPS list retrieved successfully',
      data: vms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving VPS list'
    });
  }
});

// Serve static files (for web admin)
app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Auth endpoints:`);
  console.log(`  POST /api/auth/login`);
  console.log(`  POST /api/auth/register`);
  console.log(`  POST /api/auth/refresh`);
  console.log(`Protected endpoints:`);
  console.log(`  GET /api/profile (requires auth)`);
  console.log(`  GET /api/admin/users (requires admin)`);
  console.log(`  GET /api/vps (requires user or admin)`);
});

