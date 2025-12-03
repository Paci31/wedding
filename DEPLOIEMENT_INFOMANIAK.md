# 🚀 Guide de Déploiement sur Infomaniak

## ✅ Serveur Unifié Créé !

Le fichier `server-unified.js` **combine** :
- Le frontend statique (ancien `server.js`)
- L'API RSVP (ancien `backend/server.js`)
- L'API Contact
- Tout sur **UN SEUL port** → Compatible Infomaniak !

---

## 📋 Étapes de Déploiement

### 1. Préparation Locale

#### A) Remplacer le server.js
```bash
# Sauvegarder l'ancien
mv server.js server-old.js

# Utiliser le nouveau serveur unifié
mv server-unified.js server.js
```

#### B) Mettre à jour package.json
Le `package.json` doit avoir :
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server.js"
  },
  "type": "module"
}
```

#### C) Build du frontend
```bash
npm run build
```

Cela crée le dossier `dist/` avec votre site compilé.

---

### 2. Configuration Infomaniak

#### A) Variables d'Environnement (.env)

Sur Infomaniak, créez ces variables d'environnement :

```env
# Port (Infomaniak l'assignera automatiquement)
PORT=3000

# Admin RSVP - CHANGEZ CES VALEURS !
ADMIN_USERNAME=admin
ADMIN_PASSWORD=VotreMotDePasseFort123!

# Email (optionnel, pour l'API contact)
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre@email.com
SMTP_PASS=votremotdepasse
CONTACT_TO=votre@email.com
CONTACT_FROM=votre@email.com
```

⚠️ **IMPORTANT** : Changez le mot de passe admin en production !

#### B) Structure des fichiers à envoyer

Envoyez sur Infomaniak :
```
wedding/
├── server.js               ← Le serveur unifié
├── package.json
├── package-lock.json
├── dist/                   ← Build du frontend
│   ├── index.html
│   ├── assets/
│   └── ...
├── data/                   ← Sera créé automatiquement
│   ├── responses.json
│   └── admin.json
└── .env                    ← Variables d'environnement
```

**NE PAS envoyer** :
- `node_modules/` (sera installé sur le serveur)
- `backend/` (plus nécessaire)
- `src/` (déjà compilé dans `dist/`)

---

### 3. Sur le Serveur Infomaniak

#### A) Installation des dépendances
```bash
npm install --production
```

#### B) Démarrage du serveur
```bash
npm start
```

Ou avec PM2 (recommandé) :
```bash
pm2 start server.js --name wedding
pm2 save
pm2 startup
```

---

## 🔧 Configuration Frontend pour Production

Mettez à jour l'URL de l'API dans votre code :

**Option 1 - Variable d'environnement (.env)** :
```env
# En dev
VITE_API_URL=http://localhost:3000

# En production (même serveur, même port)
VITE_API_URL=https://votre-domaine.ch
```

**Option 2 - Détection automatique** :

Modifiez vos composants pour utiliser :
```javascript
const API_URL = import.meta.env.VITE_API_URL || window.location.origin;
```

Ainsi, en production, l'API utilisera automatiquement le même domaine.

---

## ✅ Vérification

Une fois déployé, testez :

### 1. Site Web
```
https://votre-domaine.ch
```
✅ Le site s'affiche

### 2. Dashboard Admin
```
https://votre-domaine.ch/admin
```
✅ Page de connexion visible
✅ Login fonctionne (admin / votre-mot-de-passe)

### 3. API RSVP
```
https://votre-domaine.ch/api/health
```
Devrait retourner :
```json
{
  "status": "OK",
  "timestamp": "2024-12-03T..."
}
```

### 4. Formulaire RSVP
- Remplissez le formulaire sur le site
- Vérifiez dans le dashboard admin
- Testez l'export CSV

---

## 📂 Structure de Déploiement

### Fichiers Locaux (Développement)
```
wedding/
├── src/                     ← Code source React
├── backend/                 ← NE PLUS UTILISER
├── server.js                ← Serveur unifié
├── package.json
└── .env
```

### Fichiers Serveur (Production)
```
wedding/
├── server.js                ← Serveur unifié
├── dist/                    ← Frontend compilé
├── data/                    ← Données RSVP
│   ├── responses.json
│   └── admin.json
├── package.json
├── node_modules/
└── .env
```

---

## 🔄 Processus de Mise à Jour

Quand vous modifiez le site :

### 1. Localement
```bash
# Modifier le code dans src/
# Puis rebuild
npm run build
```

### 2. Sur le Serveur
```bash
# Envoyer le nouveau dist/
scp -r dist/* user@serveur:/chemin/wedding/dist/

# Redémarrer (si vous utilisez PM2)
pm2 restart wedding
```

Si vous modifiez uniquement le **contenu** (pas le code) :
- Pas besoin de redémarrer le serveur
- Juste remplacer les fichiers dans `dist/`

Si vous modifiez l'**API** (server.js) :
- Remplacer `server.js`
- Redémarrer obligatoire : `pm2 restart wedding`

---

## 🔒 Sécurité en Production

### 1. Changer le Mot de Passe Admin
Dans `.env` ou directement dans `data/admin.json` :
```json
{
  "username": "admin",
  "password": "UnMotDePasseTrèsFort123!"
}
```

### 2. Utiliser HTTPS
Infomaniak fournit SSL gratuit. Activez-le !

### 3. Sauvegarder les Données
Sauvegardez régulièrement `data/responses.json` :
```bash
# Automatique avec cron
0 2 * * * cp /chemin/wedding/data/responses.json /backup/responses-$(date +\%Y\%m\%d).json
```

### 4. Rate Limiting
Le serveur unifié inclut déjà :
- 10 RSVP max / 10 min
- 5 contacts max / 5 min

---

## 🆚 Comparaison Avant / Après

### ❌ Avant (2 serveurs)
```
Frontend  → localhost:5173 (Vite dev)
Backend   → localhost:3001 (API RSVP)
```
**Problème** : Impossible sur Infomaniak (2 ports)

### ✅ Maintenant (1 serveur)
```
Tout-en-un → localhost:3000
  ├── Frontend (dist/)
  ├── API RSVP (/api/rsvp, /api/admin/*)
  └── API Contact (/api/contact)
```
**Solution** : Compatible Infomaniak (1 seul port)

---

## 🐛 Dépannage

### Le dashboard admin ne charge pas
- Vérifiez que `dist/index.html` existe
- Vérifiez les logs : `pm2 logs wedding`
- Testez `/api/health`

### Les réponses RSVP ne s'enregistrent pas
- Vérifiez que `data/` existe et est accessible en écriture
- Vérifiez les logs du serveur
- Testez directement l'API : `curl https://votre-site.ch/api/health`

### Erreur CORS
- En production, CORS est géré automatiquement
- Vérifiez que `VITE_API_URL` pointe vers le bon domaine

---

## 📞 Support

### Vérifier les Logs
```bash
# Avec PM2
pm2 logs wedding

# Ou directement
tail -f /var/log/wedding.log
```

### Tester l'API
```bash
# Health check
curl https://votre-site.ch/api/health

# Test RSVP (avec données fictives)
curl -X POST https://votre-site.ch/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","attending":"yes","adults":"2"}'
```

---

## ✅ Checklist de Déploiement

Avant de déployer :

- [ ] Build du frontend : `npm run build`
- [ ] Tester localement avec le serveur unifié : `node server.js`
- [ ] Changer le mot de passe admin dans `.env`
- [ ] Configurer les variables d'environnement sur Infomaniak
- [ ] Envoyer les fichiers (server.js, dist/, package.json)
- [ ] Installer les dépendances sur le serveur : `npm install --production`
- [ ] Démarrer avec PM2 : `pm2 start server.js --name wedding`
- [ ] Tester le site : https://votre-domaine.ch
- [ ] Tester le dashboard : https://votre-domaine.ch/admin
- [ ] Tester un RSVP réel
- [ ] Configurer les sauvegardes automatiques

---

**Votre site est maintenant prêt pour Infomaniak ! 🎉**

**Contact** : Si vous avez des questions pendant le déploiement, consultez les logs et le fichier `server.js`.

