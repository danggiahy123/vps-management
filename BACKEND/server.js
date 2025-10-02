const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'VPS Management Backend API' });
});

// Mock data endpoints
app.get('/api/vps', (req, res) => {
  res.json([
    { id: 1, name: 'VPS-001', status: 'running', ip: '192.168.1.100' },
    { id: 2, name: 'VPS-002', status: 'stopped', ip: '192.168.1.101' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
