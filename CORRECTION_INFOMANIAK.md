# 🔧 Correction du Problème CORS sur Infomaniak

## ❌ Le Problème

Erreur dans la console :
```
Access to fetch at 'http://localhost:3001/api/admin/login' 
from origin 'https://wedding.pacifico.dev' 
has been blocked by CORS policy
```

**Cause** : Le site en production essaie de se connecter à `localhost:3001` au lieu du serveur de production.

---

## ✅ Solution Appliquée

J'ai modifié le code pour **détecter automatiquement l'environnement** :

### Avant
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
```

### Maintenant
```javascript
const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'           // En dev local
    : window.location.origin);          // En production
```

**Résultat** :
- En développement (localhost) → `http://localhost:3001`
- En production (wedding.pacifico.dev) → `https://wedding.pacifico.dev`

---

## 🚀 Étapes pour Corriger

### 1. Le Code est Déjà Modifié ✅

Les fichiers suivants ont été mis à jour :
- `src/components/RSVP.jsx`
- `src/pages/AdminDashboard.jsx`

### 2. Rebuild le Frontend

```bash
npm run build
```

Cela crée un nouveau `dist/` avec la correction.

### 3. Envoyer sur Infomaniak

**Option A - Via FTP/SFTP** :
```bash
# Connectez-vous à votre serveur Infomaniak
# Remplacez le contenu du dossier dist/ sur le serveur
```

**Option B - Si vous avez accès SSH** :
```bash
# Sur votre machine locale
npm run build

# Envoyer vers le serveur
scp -r dist/* user@votre-serveur:/chemin/vers/wedding/dist/
```

**Option C - Via Git** :
```bash
git add src/
git commit -m "Fix: Détection automatique de l'API en production"
git push

# Sur le serveur
git pull
npm run build
pm2 restart wedding
```

### 4. Redémarrer le Serveur (optionnel)

Si vous utilisez PM2 :
```bash
pm2 restart wedding
```

Sinon, pas besoin de redémarrer pour un simple changement de frontend.

---

## 🧪 Vérification

### Test 1 : En Local
```bash
npm run dev
# Ouvrez http://localhost:5173/admin
# L'API utilisera : http://localhost:3001
```
✅ Devrait fonctionner

### Test 2 : En Production
```
https://wedding.pacifico.dev/admin
# L'API utilisera : https://wedding.pacifico.dev
```
✅ Plus d'erreur CORS !

---

## 📋 Checklist de Déploiement

- [x] Code modifié (détection automatique)
- [ ] Build du frontend : `npm run build`
- [ ] Envoyer `dist/` sur Infomaniak
- [ ] Tester : https://wedding.pacifico.dev/admin
- [ ] Vérifier la connexion admin
- [ ] Tester un RSVP
- [ ] Vérifier l'export CSV

---

## 🔍 Comment ça Fonctionne ?

### En Développement (localhost)
```
Site :  http://localhost:5173
API  :  http://localhost:3001  ← Détecté automatiquement
```

### En Production (Infomaniak)
```
Site :  https://wedding.pacifico.dev
API  :  https://wedding.pacifico.dev  ← Même domaine !
```

Le serveur unifié (`server.js`) gère à la fois :
- Le frontend statique (dans `dist/`)
- L'API RSVP (routes `/api/*`)

Tout sur le même domaine = **Pas de problème CORS** !

---

## ⚠️ Si le Problème Persiste

### Vérifiez que le Serveur Unifié est Utilisé

Sur Infomaniak, assurez-vous d'utiliser `server-unified.js` (ou `server.js` si vous l'avez renommé).

Le serveur doit contenir :
```javascript
// Routes API RSVP
app.post('/api/rsvp', ...)
app.get('/api/admin/responses', ...)
app.get('/api/admin/stats', ...)
app.post('/api/admin/login', ...)

// Frontend statique
app.use(express.static(dist, ...))
```

### Vérifiez le .env sur le Serveur

Sur Infomaniak, dans votre `.env` :
```env
PORT=3000
# Pas besoin de VITE_API_URL en production
# La détection automatique s'en charge
```

### Testez l'API Directement

```bash
curl https://wedding.pacifico.dev/api/health
```

Devrait retourner :
```json
{
  "status": "OK",
  "timestamp": "2024-12-03T..."
}
```

---

## 🎯 Résumé de la Correction

| Aspect | Avant | Maintenant |
|--------|-------|------------|
| Dev Local | localhost:3001 ✅ | localhost:3001 ✅ |
| Production | localhost:3001 ❌ | wedding.pacifico.dev ✅ |
| CORS | Bloqué ❌ | Fonctionne ✅ |

---

## 📞 Si Ça Ne Fonctionne Toujours Pas

1. **Vérifiez la console du navigateur** :
   - Ouvrez F12
   - Onglet "Network"
   - Tentez de vous connecter
   - Regardez quelle URL est appelée

2. **Vérifiez les logs du serveur** :
   ```bash
   pm2 logs wedding
   ```

3. **Vérifiez que le build est récent** :
   ```bash
   # Regardez la date du fichier
   ls -la dist/index.html
   ```

---

**La correction est appliquée ! Il suffit maintenant de rebuilder et d'envoyer sur Infomaniak.** 🚀

```bash
npm run build
# Puis envoyer dist/ sur le serveur
```

