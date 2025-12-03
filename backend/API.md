# 📡 Documentation API Backend

## Base URL
```
http://localhost:3001/api
```

---

## 🔓 Endpoints Publics

### POST /api/rsvp
Soumettre une nouvelle réponse RSVP.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "phone": "+33 6 12 34 56 78",
  "attending": "yes",
  "adults": "2",
  "children": "1",
  "childrenAges": "5 ans",
  "dietary": "Végétarien",
  "message": "Hâte d'y être !"
}
```

**Réponse Success (201):**
```json
{
  "success": true,
  "message": "Réponse enregistrée avec succès",
  "id": "1704123456789"
}
```

**Réponse Error (500):**
```json
{
  "success": false,
  "error": "Erreur lors de la sauvegarde"
}
```

---

## 🔒 Endpoints Authentifiés

Tous les endpoints admin nécessitent une authentification via les headers:

**Headers:**
```
username: admin
password: wedding2026
```

### GET /api/admin/responses
Récupérer toutes les réponses RSVP.

**Réponse Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1704123456789",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "name": "Jean Dupont",
      "email": "jean.dupont@example.com",
      "phone": "+33 6 12 34 56 78",
      "attending": "yes",
      "adults": "2",
      "children": "1",
      "childrenAges": "5 ans",
      "dietary": "Végétarien",
      "message": "Hâte d'y être !"
    }
  ]
}
```

**Réponse Error (401):**
```json
{
  "error": "Non autorisé"
}
```

---

### GET /api/admin/stats
Récupérer les statistiques agrégées.

**Réponse Success (200):**
```json
{
  "success": true,
  "data": {
    "total": 42,
    "attending": {
      "yes": 35,
      "no": 5,
      "maybe": 2
    },
    "guests": {
      "totalAdults": 70,
      "totalChildren": 15,
      "total": 85
    },
    "dietary": [
      {
        "name": "Jean Dupont",
        "dietary": "Végétarien"
      }
    ],
    "byDate": {
      "01/01/2024": 5,
      "02/01/2024": 8
    }
  }
}
```

---

### DELETE /api/admin/responses/:id
Supprimer une réponse RSVP.

**Paramètres:**
- `id` - L'identifiant de la réponse à supprimer

**Réponse Success (200):**
```json
{
  "success": true,
  "message": "Réponse supprimée"
}
```

**Réponse Error (404):**
```json
{
  "success": false,
  "error": "Réponse non trouvée"
}
```

---

### POST /api/admin/login
Authentifier un administrateur.

**Body:**
```json
{
  "username": "admin",
  "password": "wedding2026"
}
```

**Réponse Success (200):**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "token": "YWRtaW46d2VkZGluZzIwMjY="
}
```

**Réponse Error (401):**
```json
{
  "success": false,
  "error": "Identifiants incorrects"
}
```

---

## ⚙️ Endpoint Utilitaire

### GET /api/health
Vérifier l'état du serveur.

**Réponse (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 📝 Codes d'État HTTP

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 401 | Non autorisé (authentification échouée) |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

---

## 🔐 Authentification

L'API utilise une authentification basique avec username/password dans les headers.

**En production, il est recommandé de:**
1. Utiliser JWT (JSON Web Tokens)
2. Implémenter HTTPS obligatoire
3. Ajouter un rate limiting
4. Hasher les mots de passe avec bcrypt

---

## 📂 Stockage des Données

Les données sont stockées dans:
- `backend/data/responses.json` - Toutes les réponses RSVP
- `backend/data/admin.json` - Identifiants administrateur

**Format de responses.json:**
```json
[
  {
    "id": "1704123456789",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33 6 12 34 56 78",
    "attending": "yes",
    "adults": "2",
    "children": "1",
    "childrenAges": "5 ans",
    "dietary": "Végétarien",
    "message": "Hâte d'y être !"
  }
]
```

---

## 🔧 Configuration

Variables d'environnement dans `.env`:

```env
PORT=3001                    # Port du serveur
ADMIN_USERNAME=admin         # Username admin (optionnel)
ADMIN_PASSWORD=wedding2026   # Password admin (optionnel)
```

---

## 🛡️ CORS

Le serveur accepte les requêtes de toutes les origines grâce au middleware `cors()`.

En production, limitez les origines autorisées:

```javascript
app.use(cors({
  origin: 'https://votre-domaine.com'
}));
```

---

## 📊 Exemple d'Utilisation (JavaScript)

### Soumettre un RSVP
```javascript
const response = await fetch('http://localhost:3001/api/rsvp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jean Dupont',
    email: 'jean@example.com',
    attending: 'yes',
    adults: '2',
    children: '0'
  })
});

const data = await response.json();
console.log(data);
```

### Récupérer les statistiques (Admin)
```javascript
const response = await fetch('http://localhost:3001/api/admin/stats', {
  headers: {
    'username': 'admin',
    'password': 'wedding2026'
  }
});

const data = await response.json();
console.log(data.data.guests.total); // Total invités
```

---

## 🐛 Gestion des Erreurs

Toutes les erreurs retournent un objet JSON avec:
```json
{
  "success": false,
  "error": "Message d'erreur descriptif"
}
```

Les erreurs sont également loggées dans la console du serveur.

---

## 🚀 Améliorations Futures

- [ ] Implémenter JWT pour l'authentification
- [ ] Ajouter bcrypt pour hasher les mots de passe
- [ ] Implémenter une base de données (PostgreSQL, MongoDB)
- [ ] Ajouter des websockets pour les mises à jour en temps réel
- [ ] Rate limiting pour éviter les abus
- [ ] Validation des données avec Joi ou Zod
- [ ] Tests unitaires et d'intégration
- [ ] Documentation OpenAPI/Swagger

---

**API développée pour le mariage de Flavio & Letizia 💕**

