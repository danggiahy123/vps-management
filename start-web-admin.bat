@echo off
echo Starting VPS Management Web Admin...
echo.
echo Make sure you have Node.js installed!
echo.
cd web-admin
echo Current directory: %CD%
echo.
echo Installing dependencies...
npm install --force
echo.
echo Starting Next.js development server on port 3000...
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause
