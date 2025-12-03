# 🎉 Dashboard Admin - Système RSVP pour Mariage

## 🌟 Nouvelles Fonctionnalités

### 1. Formulaire RSVP Amélioré
- ✅ **Nombre d'adultes** (obligatoire)
- ✅ **Nombre d'enfants** (optionnel)
- ✅ **Âge des enfants** (apparaît automatiquement si des enfants sont déclarés)
- ✅ Régimes alimentaires spéciaux
- ✅ Messages personnalisés

### 2. Backend API
- 🔒 API sécurisée avec authentification
- 💾 Stockage des réponses dans un fichier JSON
- 📊 Calcul automatique des statistiques
- 🗑️ Possibilité de supprimer des réponses

### 3. Dashboard Admin
- 📊 **Graphiques et statistiques en temps réel**
  - Total des réponses
  - Répartition présents/absents/à confirmer
  - Nombre total d'adultes et d'enfants
  - Graphique en barres
- 📝 **Vue détaillée de toutes les réponses**
  - Recherche par nom ou email
  - Filtrage par statut de présence
  - Détails complets (régimes, messages, etc.)
- 📥 **Export CSV** pour Excel/Google Sheets
- 🔐 **Authentification sécurisée**

## 🚀 Installation et Démarrage

### 1. Installation des dépendances

#### Frontend
```bash
# À la racine du projet
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Configuration

Le fichier `.env` contient la configuration :
```env
VITE_API_URL=http://localhost:3001
PORT=3001
ADMIN_USERNAME=admin
ADMIN_PASSWORD=wedding2026
```

**⚠️ IMPORTANT**: Changez le mot de passe admin avant la mise en production !

### 3. Démarrage

#### Option A : Développement (2 terminaux)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```

#### Option B : Production
```bash
# Build du frontend
npm run build

# Démarrer le backend
cd backend
npm start

# Le backend servira aussi les fichiers statiques du frontend
```

### 4. Accès

- 🌐 **Site web**: http://localhost:5173 (dev) ou http://localhost:3001 (prod)
- 🔐 **Dashboard Admin**: http://localhost:5173/admin (dev) ou http://localhost:3001/admin (prod)

**Identifiants par défaut:**
- Username: `admin`
- Password: `wedding2026`

## 📊 Utilisation du Dashboard Admin

### Connexion
1. Allez sur `/admin`
2. Entrez vos identifiants
3. Vous serez redirigé vers le dashboard

### Onglet Statistiques
- Cartes avec le nombre de réponses par catégorie
- Graphique en barres des présences
- Liste des régimes alimentaires spéciaux
- Réponses par date

### Onglet Réponses
- Liste complète de toutes les réponses
- Recherche et filtrage
- Détails complets de chaque réponse
- Possibilité de supprimer une réponse

### Export CSV
- Cliquez sur "📥 Exporter CSV" en haut à droite
- Le fichier contient toutes les données dans un format compatible Excel
- Nom du fichier: `reponses-mariage-YYYY-MM-DD.csv`

## 🔒 Sécurité

### Recommandations pour la production:

1. **Changer le mot de passe admin**
   - Éditez le fichier `backend/data/admin.json`
   - Ou changez la variable `ADMIN_PASSWORD` dans `.env`

2. **Utiliser HTTPS**
   - Obtenez un certificat SSL (Let's Encrypt gratuit)
   - Configurez votre serveur web (Nginx, Apache)

3. **Implémenter JWT** (optionnel)
   - Pour une meilleure sécurité, remplacez l'authentification basique par JWT
   - Voir les commentaires dans `backend/server.js`

4. **Rate Limiting**
   - Limitez le nombre de tentatives de connexion
   - Protégez contre les attaques DDoS

5. **Backup des données**
   - Sauvegardez régulièrement `backend/data/responses.json`
   - Utilisez un système de backup automatique

## 📁 Structure des fichiers

```
wedding/
├── backend/
│   ├── server.js          # Serveur API Express
│   ├── package.json       # Dépendances backend
│   └── data/              # Données stockées (créé automatiquement)
│       ├── responses.json # Toutes les réponses RSVP
│       └── admin.json     # Identifiants admin
├── src/
│   ├── components/
│   │   └── RSVP.jsx       # Formulaire RSVP (modifié)
│   ├── pages/
│   │   └── AdminDashboard.jsx  # Dashboard admin
│   ├── i18n/
│   │   └── locales/
│   │       ├── fr.json    # Traductions françaises (modifié)
│   │       └── it.json    # Traductions italiennes (modifié)
│   └── App.jsx            # Routes (modifié)
└── .env                   # Configuration
```

## 🛠️ Personnalisation

### Modifier les couleurs du dashboard
Éditez `src/pages/AdminDashboard.jsx` et changez les classes Tailwind CSS.

### Ajouter des champs au formulaire
1. Ajoutez le champ dans `src/components/RSVP.jsx`
2. Ajoutez les traductions dans `src/i18n/locales/*.json`
3. Le backend stockera automatiquement le nouveau champ

### Personnaliser les statistiques
Modifiez la fonction `GET /api/admin/stats` dans `backend/server.js`.

## 🐛 Dépannage

### Le formulaire ne s'envoie pas
- Vérifiez que le backend est démarré
- Vérifiez l'URL dans `.env` (VITE_API_URL)
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Impossible de se connecter à l'admin
- Vérifiez les identifiants
- Vérifiez que `backend/data/admin.json` existe
- Redémarrez le serveur backend

### Erreur CORS
- Vérifiez que le backend a le middleware `cors()` activé
- Vérifiez l'URL de l'API dans `.env`

## 📞 Support

Pour toute question ou problème, consultez :
- Les logs du serveur backend
- La console du navigateur (F12)
- Le fichier `backend/data/responses.json` pour vérifier les données

## ✨ Fonctionnalités futures possibles

- 📧 Notifications par email lors d'une nouvelle réponse
- 📱 Application mobile
- 🎨 Personnalisation du thème du dashboard
- 📈 Plus de graphiques (camemberts, courbes, etc.)
- 👥 Gestion multi-utilisateurs
- 🔄 Mise à jour en temps réel (WebSocket)
- 📱 Envoi de SMS de rappel
- 🎫 Génération de QR codes pour l'entrée

---

**Fait avec ❤️ pour Flavio & Letizia**
**Date: 20 Juin 2026**

