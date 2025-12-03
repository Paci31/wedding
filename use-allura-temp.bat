@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Activation de la Police Allura (Temporaire)                  ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Cette police gratuite ressemble à Boheme Floreal.
echo Vous pourrez revenir à Boheme quand vous aurez les fichiers.
echo.
pause

echo.
echo [1/4] Backup de tailwind.config.js...
copy tailwind.config.js tailwind.config.js.backup >nul
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du backup
    pause
    exit /b 1
)
echo ✅ Backup créé : tailwind.config.js.backup

echo.
echo [2/4] Ajout de l'import Allura dans index.css...
powershell -Command "$content = Get-Content 'src\index.css' -Raw; if ($content -notmatch 'Allura') { $content = $content -replace '(@import url\(\"https://fonts.googleapis.com.*?display=swap\"\);)', '$1`n`n/* Police temporaire Allura (similaire à Boheme Floreal) */`n@import url(''https://fonts.googleapis.com/css2?family=Allura^&display=swap'');'; Set-Content 'src\index.css' $content }"
echo ✅ Import Allura ajouté

echo.
echo [3/4] Modification de tailwind.config.js...
powershell -Command "(Get-Content tailwind.config.js) -replace 'boheme: \[\"Calligrafico Boheme Floreal\"', 'boheme: [\"Allura\"' | Set-Content tailwind.config.js"
echo ✅ Configuration Tailwind modifiée

echo.
echo [4/4] Rebuild du projet...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du build
    echo Restauration du backup...
    copy tailwind.config.js.backup tailwind.config.js >nul
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  ✅ Police Allura activée avec succès !                       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Les noms Flavio et Letizia utilisent maintenant Allura.
echo.
echo 🔄 Pour revenir à Boheme Floreal plus tard :
echo    1. Ajoutez les fichiers dans src/assets/fonts/
echo    2. Restaurez : copy tailwind.config.js.backup tailwind.config.js
echo    3. npm run build
echo.
pause

