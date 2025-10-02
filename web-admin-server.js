const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve static files from web-admin
app.use(express.static(path.join(__dirname, 'web-admin')));

// Serve Next.js pages
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VPS Management Web Admin</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: #f5f5f5;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                border-bottom: 1px solid #e0e0e0;
                padding-bottom: 20px;
                margin-bottom: 20px;
            }
            .nav {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
            }
            .nav a {
                padding: 10px 20px;
                background: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                transition: background 0.2s;
            }
            .nav a:hover {
                background: #0056b3;
            }
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .stat-card {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
            }
            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #007bff;
            }
            .vps-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            .vps-card {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 20px;
            }
            .status-running {
                background: #d4edda;
                color: #155724;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8em;
            }
            .status-stopped {
                background: #f8d7da;
                color: #721c24;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>VPS Management Web Admin</h1>
                <p>Welcome to the VPS Management System</p>
            </div>
            
            <div class="nav">
                <a href="/dashboard">Dashboard</a>
                <a href="/vps">VPS Management</a>
                <a href="/users">Users</a>
                <a href="/alerts">Alerts</a>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">5</div>
                    <div>Total Users</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">5</div>
                    <div>VPS Servers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">3</div>
                    <div>Domains</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">2</div>
                    <div>Active Alerts</div>
                </div>
            </div>
            
            <h2>VPS Management</h2>
            <div class="vps-grid">
                <div class="vps-card">
                    <h3>web-01</h3>
                    <p><strong>IP:</strong> 10.0.0.5</p>
                    <p><strong>Status:</strong> <span class="status-running">Running</span></p>
                    <p><strong>Owner:</strong> John Doe</p>
                    <p><strong>CPU:</strong> 25% | <strong>RAM:</strong> 40%</p>
                </div>
                <div class="vps-card">
                    <h3>db-01</h3>
                    <p><strong>IP:</strong> 10.0.0.6</p>
                    <p><strong>Status:</strong> <span class="status-running">Running</span></p>
                    <p><strong>Owner:</strong> John Doe</p>
                    <p><strong>CPU:</strong> 45% | <strong>RAM:</strong> 70%</p>
                </div>
                <div class="vps-card">
                    <h3>api-01</h3>
                    <p><strong>IP:</strong> 10.0.0.7</p>
                    <p><strong>Status:</strong> <span class="status-stopped">Stopped</span></p>
                    <p><strong>Owner:</strong> Jane Smith</p>
                    <p><strong>CPU:</strong> 0% | <strong>RAM:</strong> 0%</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`VPS Management Web Admin running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
