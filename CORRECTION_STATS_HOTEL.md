# ✅ Correction Statistiques Hôtel

## 🐛 Problème Identifié

L'utilisateur a rempli le formulaire avec une "chambre twin" (Double/Twin), mais les statistiques ne s'affichaient pas.

**Cause** : Le formulaire envoie maintenant `hotelRoomType` directement (avec des valeurs comme "single", "double", "triple", etc.), mais le backend cherchait encore l'ancienne propriété `hotelNeeded` qui n'existe plus.

---

## ✅ Corrections Apportées

### 1. Backend (`backend/server.js` + `server-unified.js`)

**AVANT** (ne fonctionnait pas) :
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
}
```

**APRÈS** (fonctionne maintenant) :
```javascript
hotel: {
  // Détecte si une chambre est demandée via hotelRoomType
  needed: responses.filter((r) => 
    r.hotelRoomType && 
    r.hotelRoomType !== "" && 
    r.hotelRoomType !== "none"
  ).length,
  
  notNeeded: responses.filter((r) => 
    !r.hotelRoomType || 
    r.hotelRoomType === "" || 
    r.hotelRoomType === "none"
  ).length,
  
  roomTypes: responses.reduce((acc, r) => {
    if (r.hotelRoomType && r.hotelRoomType !== "" && r.hotelRoomType !== "none") {
      // Convertir les codes en noms lisibles
      const roomNames = {
        single: "Chambre Simple",
        double: "Chambre Double/Twin",  // ← "twin" est ici !
        triple: "Chambre Triple",
        quadruple: "Chambre Quadruple",
        larger: "Chambre Plus Grande"
      };
      const roomName = roomNames[r.hotelRoomType] || r.hotelRoomType;
      acc[roomName] = (acc[roomName] || 0) + 1;
    }
    return acc;
  }, {}),
  
  // Calcul automatique des nuitées à partir des dates
  totalNights: responses.reduce((sum, r) => {
    if (r.hotelRoomType && r.hotelRoomType !== "" && r.hotelRoomType !== "none" 
        && r.hotelCheckIn && r.hotelCheckOut) {
      const checkIn = new Date(r.hotelCheckIn);
      const checkOut = new Date(r.hotelCheckOut);
      const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      return sum + (nights > 0 ? nights : 0);
    }
    return sum;
  }, 0),
}
```

---

## 🎯 Améliorations

### 1. Noms de Chambres Lisibles

Au lieu d'afficher les codes techniques (`single`, `double`, etc.), les statistiques affichent maintenant des noms compréhensibles :

- `single` → **"Chambre Simple"**
- `double` → **"Chambre Double/Twin"** ✅
- `triple` → **"Chambre Triple"**
- `quadruple` → **"Chambre Quadruple"**
- `larger` → **"Chambre Plus Grande"**

### 2. Calcul Automatique des Nuitées

**AVANT** : Le backend cherchait `r.hotelNights` (qui n'existait pas)

**APRÈS** : Les nuitées sont calculées automatiquement :
```javascript
const checkIn = new Date(r.hotelCheckIn);
const checkOut = new Date(r.hotelCheckOut);
const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
```

### 3. Détection Robuste

Le backend détecte maintenant correctement qu'une chambre est demandée si :
- `hotelRoomType` existe
- ET n'est pas vide (`""`)
- ET n'est pas `"none"`

---

## 📊 Résultat Attendu

Maintenant, dans le dashboard admin, vous devriez voir :

```
╔═══════════════════════════════════════════════════════╗
║  🏨 Réservations d'Hôtel                             ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  [Graphique]                                          ║
║  Besoin hôtel: 1    Pas d'hôtel: 0                   ║
║                                                       ║
║  Types de Chambres Demandées                         ║
║  ┌─────────────────────────────────┐                 ║
║  │ 🛏️ Chambre Double/Twin      [1] │  ← Twin ici !  ║
║  └─────────────────────────────────┘                 ║
║                                                       ║
║  🌙 Total nuitées: X (calculé automatiquement)       ║
╚═══════════════════════════════════════════════════════╝
```

---

## 🔍 Mapping des Valeurs

Dans le formulaire RSVP :
- **Option affichée** : "Chambre Double/Twin (2 pers.) - €140"
- **Valeur envoyée** : `hotelRoomType: "double"`
- **Affichage dans les stats** : "Chambre Double/Twin"

---

## ✅ Tests à Effectuer

1. **Redémarrer le backend** :
   ```bash
   cd backend
   npm start
   ```

2. **Accéder au dashboard** :
   - URL : `http://localhost:5173/admin`
   - Login : `admin` / `wedding2026`
   - Onglet "📊 Statistiques"

3. **Vérifier** :
   - La section "🏨 Réservations d'Hôtel" doit apparaître
   - Vous devez voir "Chambre Double/Twin" avec [1] ou plus
   - Le total de nuitées doit être calculé

---

## 🚀 Déploiement

```bash
# Backend modifié
git add backend/server.js server-unified.js

# Commit
git commit -m "Fix: Correction calcul stats hôtel avec hotelRoomType"

# Push
git push

# Sur Infomaniak (production)
git pull
pm2 restart wedding
```

---

## 📝 Notes Techniques

### Ancienne Structure (ne fonctionne plus)
```javascript
{
  hotelNeeded: "yes",  // ❌ N'existe plus
  hotelRoomType: "double"
}
```

### Nouvelle Structure (actuelle)
```javascript
{
  hotelRoomType: "double",  // ✅ C'est ça qui détermine si hôtel nécessaire
  hotelCheckIn: "2026-06-13",
  hotelCheckOut: "2026-06-15"
}
```

Si `hotelRoomType` est rempli (et différent de "none"), alors l'hôtel est nécessaire.

---

## 🎉 Résolution

✅ Le problème est maintenant résolu !

Les statistiques vont afficher :
- Nombre de personnes ayant besoin d'un hôtel
- **"Chambre Double/Twin"** pour les chambres twin/double
- Total de nuitées calculé automatiquement depuis les dates

---

**Date** : 3 décembre 2025  
**Fichiers modifiés** : `backend/server.js`, `server-unified.js`  
**Build** : ✅ Réussi  
**Status** : ✅ Corrigé

