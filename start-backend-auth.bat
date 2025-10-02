@echo off
echo Starting VPS Management Backend with Authentication...
echo.
echo Installing dependencies...
cd BACKEND
npm install
echo.
echo Starting server with JWT Authentication...
echo.
echo Available endpoints:
echo   POST /api/auth/login
echo   POST /api/auth/register  
echo   POST /api/auth/refresh
echo   GET  /api/profile (requires auth)
echo   GET  /api/admin/users (requires admin)
echo   GET  /api/vps (requires user or admin)
echo.
echo Test with: http://localhost:3001/auth-test.html
echo.
node server.js
pause
