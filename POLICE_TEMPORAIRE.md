# 🎨 Police Temporaire pour les Noms

## 🔄 Deux Options

### Option 1 : Attendre la Police Boheme Floreal (Recommandé)
✅ **Configuration déjà faite** - Ajoutez simplement les fichiers dans `src/assets/fonts/`

Voir le guide : `AJOUTER_POLICE_BOHEME.md`

---

### Option 2 : Utiliser une Police Similaire MAINTENANT

Si vous voulez voir le résultat tout de suite avec une belle police calligraphique, voici des alternatives gratuites similaires :

## 🆓 Polices Gratuites Similaires

### 1. **Allura** (Très similaire, recommandée)
```css
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
```

### 2. **Tangerine** (Élégante, épaisse)
```css
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap');
```

### 3. **Parisienne** (Calligraphique chic)
```css
@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
```

### 4. **Alex Brush** (Script élégant)
```css
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
```

---

## 🔧 Comment Utiliser une Police Temporaire

### Étape 1 : Modifier `src/index.css`

**Ajouter après la ligne 1** (après le @import existant) :

```css
/* Police temporaire - À remplacer par Boheme Floreal */
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
```

### Étape 2 : Modifier `tailwind.config.js`

**Remplacer** :
```javascript
boheme: ["Calligrafico Boheme Floreal", "Great Vibes", "cursive"],
```

**Par** :
```javascript
boheme: ["Allura", "Great Vibes", "cursive"],
```

### Étape 3 : Rebuild
```bash
npm run build
```

---

## 🎨 Comparaison Visuelle

| Police | Style | Épaisseur | Élégance |
|--------|-------|-----------|----------|
| **Great Vibes** (actuel) | Cursive fine | ⭐⭐ | ⭐⭐⭐⭐ |
| **Allura** | Calligraphique | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Tangerine** | Calligraphique épaisse | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Parisienne** | Scripte chic | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Boheme Floreal** (cible) | Calligraphique premium | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ⚡ Script Automatique

Créez un fichier `switch-to-allura.bat` :

```batch
@echo off
echo Installation de Allura comme police temporaire...

REM Backup
copy tailwind.config.js tailwind.config.js.backup

REM Modifier tailwind.config.js
powershell -Command "(Get-Content tailwind.config.js) -replace 'boheme: \[\"Calligrafico Boheme Floreal\"', 'boheme: [\"Allura\"' | Set-Content tailwind.config.js"

REM Rebuild
call npm run build

echo.
echo ✅ Police Allura activée !
echo Pour revenir à Boheme Floreal : restaurez le backup
pause
```

---

## 🔄 Retour à Boheme Floreal Plus Tard

1. Restaurez le backup : `tailwind.config.js.backup`
2. Ajoutez les fichiers de police dans `src/assets/fonts/`
3. `npm run build`

---

## 💡 Recommandation

**Pour l'instant** : Les noms utilisent "Great Vibes" (fallback actuel)

**Options** :
1. ⏳ **Attendre** → Ajoutez la vraie Boheme Floreal quand vous l'aurez
2. ⚡ **Temporaire** → Utilisez Allura (très similaire, gratuite)
3. ✅ **Laisser** → Great Vibes est déjà élégante

**Mon conseil** : Si vous n'avez pas encore la police Boheme Floreal, utilisez **Allura** temporairement. C'est gratuit, très similaire, et vous pourrez facilement revenir à Boheme plus tard.

