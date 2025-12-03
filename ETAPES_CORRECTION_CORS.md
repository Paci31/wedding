# ✅ Étapes pour Corriger l'Erreur CORS sur Infomaniak

## 📦 1. Build Terminé ✅

Le nouveau `dist/` a été créé avec la correction de détection automatique de l'API.

---

## 🚀 2. Envoyer sur Infomaniak

### Option A : Via FTP/SFTP (Le Plus Simple)

1. **Connectez-vous à votre serveur Infomaniak via FTP**

   - Utilisez FileZilla, WinSCP ou votre client FTP préféré
   - Hôte : `ftp.infomaniak.com` (ou votre hôte spécifique)

2. **Naviguez vers le dossier de votre site**

   ```
   /sites/wedding.pacifico.dev/
   ```

3. **Remplacez TOUT le contenu du dossier `dist/`**
   - Sur votre PC : `C:\DEV\wedding\dist\`
   - Sur le serveur : `/sites/wedding.pacifico.dev/dist/`
   - ⚠️ Supprimez l'ancien contenu et uploadez le nouveau

### Option B : Via SSH (Si Vous Avez Accès)

```bash
# Depuis votre PC local (dans C:\DEV\wedding)
scp -r dist/* user@votre-serveur:/chemin/vers/wedding/dist/
```

---

## ⚙️ 3. Vérifier le Serveur Unifié sur Infomaniak

**C'EST L'ÉTAPE CRUCIALE !**

Sur Infomaniak, vous devez utiliser **`server-unified.js`** (ou l'avoir renommé en `server.js`).

### Vérifiez Quel Fichier est Utilisé

```bash
# Connectez-vous en SSH sur Infomaniak
ssh user@votre-serveur

# Vérifiez le processus en cours
pm2 list

# Ou
ps aux | grep node
```

### Le Bon Fichier Doit Contenir

```javascript
// Routes API RSVP
app.post('/api/rsvp', ...)
app.get('/api/admin/responses', ...)
app.get('/api/admin/stats', ...)
app.post('/api/admin/login', ...)

// Frontend statique
app.use(express.static(dist, ...))
```

### Si Vous Utilisez Encore l'Ancien server.js

**Sur Infomaniak, remplacez `server.js` par `server-unified.js`** :

```bash
# Sur le serveur
cd /chemin/vers/wedding
mv server.js server-old.js
cp server-unified.js server.js

# Redémarrez
pm2 restart wedding
```

---

## 🧪 4. Tester l'API

**Avant de tester le site, testez d'abord que l'API est accessible :**

```bash
curl https://wedding.pacifico.dev/api/health
```

**Devrait retourner :**

```json
{
  "status": "OK",
  "timestamp": "2024-12-03T..."
}
```

❌ **Si vous obtenez 404** → L'API n'est pas configurée → Utilisez le serveur unifié

✅ **Si ça fonctionne** → L'API est OK, passez à l'étape 5

---

## 🌐 5. Tester le Dashboard Admin

1. **Videz le cache du navigateur** :

   - Chrome/Edge : `Ctrl + Shift + Delete`
   - Cochez "Images et fichiers en cache"
   - Cliquez "Effacer les données"

2. **Allez sur** : `https://wedding.pacifico.dev/admin`

3. **Ouvrez la console** (F12)

4. **Tentez de vous connecter**

5. **Vérifiez dans l'onglet Network** :
   - La requête doit aller vers `https://wedding.pacifico.dev/api/admin/login`
   - **PAS** vers `http://localhost:3001`

---

## 🔍 Diagnostic

### Si Vous Voyez Encore "localhost:3001"

✅ **Le build n'a pas été uploadé** → Réenvoyez `dist/`

✅ **Cache navigateur** → Videz le cache (Ctrl + Shift + R)

### Si Vous Voyez "wedding.pacifico.dev/api/admin/login"

✅ **Bonne URL !**

**Mais si erreur 404** :

- L'API n'est pas configurée sur le serveur
- Vous n'utilisez pas le serveur unifié
- Vérifiez le point 3 ci-dessus

**Si erreur 500** :

- L'API est là mais a un problème
- Vérifiez les logs : `pm2 logs wedding`

---

## 📋 Checklist Complète

**Sur Votre PC :**

- [x] Build du frontend : `npm run build` ✅
- [ ] Envoyer `dist/` sur Infomaniak

**Sur le Serveur Infomaniak :**

- [ ] Vérifier que `server-unified.js` est utilisé (ou renommé en `server.js`)
- [ ] Le fichier doit contenir les routes `/api/rsvp`, `/api/admin/*`
- [ ] Redémarrer le serveur : `pm2 restart wedding`

**Tests :**

- [ ] `curl https://wedding.pacifico.dev/api/health` → Retourne JSON ✅
- [ ] Vider le cache du navigateur
- [ ] `https://wedding.pacifico.dev/admin` → Page de connexion
- [ ] Tenter connexion → Vérifier l'URL dans Network
- [ ] Login fonctionne → Dashboard s'affiche ✅

---

## 📂 Structure Correcte sur Infomaniak

```
wedding/
├── server.js               ← Serveur UNIFIÉ (avec API RSVP)
├── dist/                   ← Frontend (nouveau build)
│   ├── index.html
│   ├── assets/
│   │   ├── index-1YgKngss.js   ← Nouveau fichier
│   │   └── index-BBWz3i75.css  ← Nouveau fichier
├── data/                   ← Données RSVP
│   ├── responses.json
│   └── admin.json
├── node_modules/
└── package.json
```

---

## 🆘 Si Ça Ne Fonctionne Toujours Pas

### Vérifiez les Logs du Serveur

```bash
pm2 logs wedding --lines 50
```

Cherchez des erreurs comme :

- `Cannot GET /api/admin/login` → API pas configurée
- `ENOENT` → Fichiers manquants
- `Port already in use` → Conflit de port

### Testez en Local avec le Serveur Unifié

```bash
# Sur votre PC
node server-unified.js
```

Puis testez : `http://localhost:3000/admin`

Si ça fonctionne en local mais pas sur Infomaniak → Le serveur unifié n'est pas utilisé sur Infomaniak.

---

## 🎯 Résumé du Problème

**Le problème CORS vient de 2 choses :**

1. ❌ **Frontend** : Essaie de se connecter à `localhost:3001`

   - **Solution** : Rebuild avec détection auto ✅ FAIT

2. ❌ **Serveur** : N'inclut pas l'API RSVP sur le même port
   - **Solution** : Utiliser `server-unified.js` ⚠️ À VÉRIFIER

**Les deux doivent être corrigés pour que ça fonctionne !**

---

## 💡 Pour Vérifier Rapidement

Ouvrez : `https://wedding.pacifico.dev/api/health`

- ✅ **Affiche du JSON** → L'API est là, le frontend va fonctionner après upload
- ❌ **404 Not Found** → Le serveur unifié n'est pas utilisé, il faut le configurer

---

**La correction est prête, il suffit maintenant d'uploader et de vérifier le serveur !** 🚀
