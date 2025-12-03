# ✅ Nouvelles Statistiques - Hôtel & Repas

## 📊 Statistiques Ajoutées

### 🏨 Statistiques Hôtel

1. **Besoins en hôtel**
   - Nombre de personnes ayant besoin d'un hôtel
   - Nombre de personnes n'ayant pas besoin d'hôtel
   - Graphique visuel comparatif

2. **Types de chambres demandées**
   - Chambre simple
   - Chambre double
   - Chambre triple
   - Chambre quadruple
   - Chambre plus grande
   - Compteur pour chaque type

3. **Total de nuitées**
   - Somme totale des nuitées réservées
   - Affichage en grand format

### 🍽️ Statistiques Repas de la Veille

1. **Participation au repas à Stresa**
   - Nombre de participants
   - Nombre d'absents
   - Graphique visuel comparatif
   - Cartes récapitulatives

---

## 🔧 Modifications Techniques

### Backend (`backend/server.js`)

Ajout dans l'endpoint `/api/admin/stats` :

```javascript
hotel: {
  needed: responses.filter((r) => r.hotelNeeded === "yes").length,
  notNeeded: responses.filter((r) => r.hotelNeeded === "no").length,
  roomTypes: responses.reduce((acc, r) => {
    if (r.hotelNeeded === "yes" && r.hotelRoomType) {
      acc[r.hotelRoomType] = (acc[r.hotelRoomType] || 0) + 1;
    }
    return acc;
  }, {}),
  totalNights: responses.reduce((sum, r) => {
    if (r.hotelNeeded === "yes" && r.hotelNights) {
      return sum + (parseInt(r.hotelNights) || 0);
    }
    return sum;
  }, 0),
},
dinner: {
  attending: responses.filter((r) => r.dinnerAttending === "yes").length,
  notAttending: responses.filter((r) => r.dinnerAttending === "no").length,
},
```

### Backend Unifié (`server-unified.js`)

Mêmes modifications pour la production.

### Frontend (`src/pages/AdminDashboard.jsx`)

Ajout de deux nouvelles sections visuelles :

1. **Section Hôtel** (lignes ~483-555)
   - Graphique en barres pour besoins/pas besoin
   - Liste des types de chambres avec compteurs
   - Total des nuitées en grand format

2. **Section Repas** (lignes ~557-598)
   - Graphique en barres pour participants/absents
   - Cartes récapitulatives avec icônes

---

## 📸 Aperçu Visuel

### Dashboard Admin - Nouvelles Sections

```
╔══════════════════════════════════════════════════════════════╗
║  🏨 Réservations d'Hôtel                                    ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌────────────────┐  ┌────────────────┐                     ║
║  │  Besoin hôtel  │  │  Pas d'hôtel   │                     ║
║  │      ████      │  │      ██        │                     ║
║  │      ████      │  │      ██        │                     ║
║  │      ████      │  │      ██        │                     ║
║  │       25       │  │       8        │                     ║
║  └────────────────┘  └────────────────┘                     ║
║                                                              ║
║  Types de Chambres Demandées                                ║
║  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐║
║  │ 🛏️ Double   [12]│ │ 🛏️ Triple   [8] │ │ 🛏️ Simple [3] │║
║  └─────────────────┘ └─────────────────┘ └────────────────┘║
║                                                              ║
║  🌙 Total de nuitées réservées: 75                          ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  🍽️ Repas de la Veille à Stresa                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌────────────────┐  ┌────────────────────────┐             ║
║  │ Participeront  │  │ Ne participeront pas   │             ║
║  │     ████       │  │         ██             │             ║
║  │     ████       │  │         ██             │             ║
║  │     ████       │  │         ██             │             ║
║  │      20        │  │         13             │             ║
║  └────────────────┘  └────────────────────────┘             ║
║                                                              ║
║  ┌──────────────────┐ ┌────────────────────────────┐        ║
║  │ ✅ Participants  │ │ ❌ Absents                 │        ║
║  │       20         │ │       13                   │        ║
║  └──────────────────┘ └────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 🎨 Couleurs Utilisées

- **Hôtel** : Bleu (`bg-blue-500`, `bg-blue-50`, `border-blue-200`)
- **Repas** : Vert émeraude (`bg-emerald-500`, `bg-emerald-50`, `border-emerald-500`)
- **Pas besoin** : Gris (`bg-gray-400`, `bg-gray-50`)

---

## 📋 Structure des Données

### Exemple de réponse API (`/api/admin/stats`)

```json
{
  "success": true,
  "data": {
    "total": 42,
    "attending": {
      "yes": 35,
      "no": 7
    },
    "guests": {
      "totalAdults": 68,
      "totalChildren": 12,
      "total": 80
    },
    "hotel": {
      "needed": 25,
      "notNeeded": 17,
      "roomTypes": {
        "Chambre double": 12,
        "Chambre triple": 8,
        "Chambre simple": 3,
        "Chambre plus grande": 2
      },
      "totalNights": 75
    },
    "dinner": {
      "attending": 20,
      "notAttending": 22
    },
    "childrenByAge": { ... },
    "dietary": [ ... ],
    "byDate": { ... }
  }
}
```

---

## ✅ Fonctionnalités

### Section Hôtel

- ✅ Affichage conditionnel (seulement si des données existent)
- ✅ Graphique en barres comparatif
- ✅ Tri des types de chambres par popularité (plus demandé en premier)
- ✅ Icône 🛏️ pour chaque type de chambre
- ✅ Badge avec compteur pour chaque type
- ✅ Total de nuitées en grand format avec icône 🌙

### Section Repas

- ✅ Affichage conditionnel
- ✅ Graphique en barres comparatif
- ✅ Cartes récapitulatives avec bordure colorée
- ✅ Icônes ✅/❌ pour participants/absents
- ✅ Police grande et lisible pour les chiffres

---

## 🚀 Déploiement

### En Local

```bash
# Backend
cd backend
npm start

# Frontend
npm run dev
```

### Sur Infomaniak

```bash
# Sur le serveur
git pull
npm run build
pm2 restart wedding
```

---

## 🔍 Tests

Pour tester les nouvelles statistiques :

1. **Soumettre plusieurs RSVP** avec :
   - `hotelNeeded: "yes"`
   - `hotelRoomType: "Chambre double"` (ou autre)
   - `hotelCheckIn: "2026-06-13"`
   - `hotelCheckOut: "2026-06-15"`
   - `hotelNights: 2`
   - `dinnerAttending: "yes"`

2. **Accéder au dashboard admin** :
   - URL : `http://localhost:5173/admin`
   - Login : `admin` / `wedding2026`

3. **Vérifier les nouvelles sections** :
   - Section "🏨 Réservations d'Hôtel"
   - Section "🍽️ Repas de la Veille à Stresa"

---

## 📝 Notes

- Les statistiques sont calculées en temps réel à chaque chargement du dashboard
- Les graphiques utilisent le composant `BarChart` existant
- Le style est cohérent avec les autres sections (shadow-lg, rounded-xl)
- Les couleurs sont en accord avec la palette du site (rose-gold, bleu, vert)

---

## 🎯 Prochaines Améliorations Possibles

- [ ] Exporter les statistiques hôtel/repas dans le CSV
- [ ] Graphique en camembert pour les types de chambres
- [ ] Liste détaillée des participants au repas
- [ ] Calcul du coût total estimé des chambres
- [ ] Timeline des arrivées/départs à l'hôtel

---

**Date d'implémentation** : 3 décembre 2025
**Versions modifiées** : backend/server.js, server-unified.js, src/pages/AdminDashboard.jsx
**Build** : ✅ Réussi
**Tests** : ✅ À tester avec données réelles

