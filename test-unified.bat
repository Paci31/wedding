@echo off
echo ========================================
echo TEST DU SERVEUR UNIFIE
echo ========================================
echo.

echo [1/2] Build du frontend...
call npm run build

echo.
echo [2/2] Demarrage du serveur unifie...
echo.
echo Le serveur va demarrer sur le port 3000
echo.
echo Site web:        http://localhost:3000
echo Dashboard admin: http://localhost:3000/admin
echo API Health:      http://localhost:3000/api/health
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.

node server-unified.js

