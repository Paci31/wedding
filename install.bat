@echo off
echo ========================================
echo Installation du systeme RSVP - Mariage
echo ========================================
echo.

echo [1/4] Installation des dependances frontend...
call npm install

echo.
echo [2/4] Installation des dependances backend...
cd backend
call npm install
cd ..

echo.
echo [3/4] Creation du fichier .env...
if not exist .env (
    copy env.example .env
    echo Fichier .env cree avec la configuration par defaut
) else (
    echo Le fichier .env existe deja
)

echo.
echo [4/4] Creation des dossiers de donnees...
if not exist backend\data mkdir backend\data

echo.
echo ========================================
echo Installation terminee avec succes!
echo ========================================
echo.
echo Pour demarrer l'application:
echo 1. Backend: cd backend ^&^& npm start
echo 2. Frontend: npm run dev
echo.
echo Acces admin: http://localhost:5173/admin
echo Identifiants: admin / wedding2026
echo.
pause

