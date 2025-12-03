@echo off
echo ========================================
echo Demarrage du systeme RSVP - Mode Dev
echo ========================================
echo.
echo Demarrage du backend sur le port 3001...
start "Backend API" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Demarrage du frontend sur le port 5173...
start "Frontend Vite" cmd /k "npm run dev"

echo.
echo ========================================
echo Application demarree!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5173/admin
echo.
echo Identifiants admin: admin / wedding2026
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
pause > nul

