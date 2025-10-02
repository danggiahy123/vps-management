@echo off
echo Starting VPS Management Backend Server...
echo.
echo Make sure you have Node.js installed!
echo.
cd BACKEND
echo Current directory: %CD%
echo.
echo Installing dependencies...
npm install
echo.
echo Starting server on port 3001...
echo Open http://localhost:3001 in your browser
echo Press Ctrl+C to stop the server
echo.
node server.js
pause
