@echo off
echo ========================================
echo VPS Management - Fix All Issues
echo ========================================
echo.

echo 1. Fixing Backend JWT Secret...
cd BACKEND
echo JWT_SECRET=your-super-secret-jwt-key-here > .env
echo PORT=3001 >> .env
echo.

echo 2. Installing Backend Dependencies...
npm install
echo.

echo 3. Starting Backend Server...
start "Backend Server" cmd /k "node server.js"
echo.

echo 4. Starting Simple Web Admin...
cd ..
start "Web Admin" cmd /k "node simple-server.js"
echo.

echo 5. Opening Test Pages...
timeout /t 3 /nobreak > nul
start http://localhost:3001/auth-test.html
start http://localhost:3000/web-admin-3000.html
echo.

echo ========================================
echo All services started!
echo ========================================
echo Backend: http://localhost:3001
echo Web Admin: http://localhost:3000
echo Auth Test: http://localhost:3001/auth-test.html
echo ========================================
pause
