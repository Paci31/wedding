# 🚀 Guide de Démarrage Rapide

## ⚡ Installation Ultra-Rapide (Windows)

### Méthode Automatique (Recommandée)

1. **Double-cliquez sur `install.bat`**
   - Installe toutes les dépendances
   - Configure l'environnement

2. **Double-cliquez sur `start-dev.bat`**
   - Démarre le backend et le frontend automatiquement
   - Ouvre deux terminaux

3. **Ouvrez votre navigateur**
   - Site: http://localhost:5173
   - Admin: http://localhost:5173/admin

**C'est tout ! Votre système est opérationnel ! 🎉**

---

## 📋 Méthode Manuelle

### 1. Installation

```bash
# À la racine du projet
npm install

# Backend
cd backend
npm install
cd ..

# Créer le fichier .env
copy env.example .env
```

### 2. Démarrage

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 3. Accès

- **Site web**: http://localhost:5173
- **Dashboard Admin**: http://localhost:5173/admin
  - Username: `admin`
  - Password: `wedding2026`

---

## 🎯 Utilisation

### Pour les invités
1. Remplir le formulaire RSVP sur la page principale
2. Cliquer sur "Envoyer ma Réponse"
3. Recevoir une confirmation

### Pour les organisateurs (Admin)
1. Aller sur `/admin`
2. Se connecter avec les identifiants
3. Consulter les statistiques et réponses
4. Exporter en CSV si nécessaire

---

## 🔧 Configuration

### Changer le mot de passe admin

**Option 1 - Fichier .env:**
```env
ADMIN_PASSWORD=VotreNouveauMotDePasse
```

**Option 2 - Fichier backend/data/admin.json:**
```json
{
  "username": "admin",
  "password": "VotreNouveauMotDePasse"
}
```

⚠️ Redémarrez le backend après modification

### Changer le port

Dans le fichier `.env`:
```env
PORT=3001
VITE_API_URL=http://localhost:3001
```

---

## ❓ Problèmes Courants

### Le formulaire ne s'envoie pas
✅ **Solution**: Vérifiez que le backend est bien démarré (Terminal 1)

### Erreur "Cannot connect to server"
✅ **Solution**: 
1. Vérifiez que le backend tourne sur le port 3001
2. Vérifiez le fichier `.env`

### Impossible de se connecter à l'admin
✅ **Solution**: 
1. Vérifiez les identifiants: `admin` / `wedding2026`
2. Vérifiez que `backend/data/admin.json` existe

### Page blanche sur /admin
✅ **Solution**: 
1. Installez react-router-dom: `npm install react-router-dom`
2. Redémarrez le serveur frontend

---

## 📊 Fonctionnalités

### ✅ Formulaire RSVP
- Nom, email, téléphone
- Présence (Oui/Non/À confirmer)
- **Nombre d'adultes**
- **Nombre d'enfants**
- **Âge des enfants** (si enfants > 0)
- Régimes alimentaires
- Message personnalisé

### 📈 Dashboard Admin
- **Statistiques en temps réel**
  - Total des réponses
  - Présents/Absents/À confirmer
  - Total adultes et enfants
  - Graphiques en barres
- **Liste des réponses**
  - Recherche et filtrage
  - Détails complets
  - Suppression possible
- **Export CSV**
  - Compatible Excel/Google Sheets

---

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les fichiers avec les classes Tailwind CSS:
- `src/components/RSVP.jsx`
- `src/pages/AdminDashboard.jsx`

### Modifier les traductions
Éditez les fichiers:
- `src/i18n/locales/fr.json` (Français)
- `src/i18n/locales/it.json` (Italien)

---

## 🚀 Déploiement en Production

### 1. Build du frontend
```bash
npm run build
```

### 2. Configurer l'URL de production
Dans `.env`:
```env
VITE_API_URL=https://votre-domaine.com/api
```

### 3. Démarrer le serveur
```bash
cd backend
npm start
```

### 4. Serveur web (Nginx/Apache)
Pointez vers le dossier `dist/` pour le frontend

---

## 📞 Besoin d'Aide ?

Consultez le fichier `README_ADMIN.md` pour la documentation complète.

---

**Bon mariage ! 💑**

