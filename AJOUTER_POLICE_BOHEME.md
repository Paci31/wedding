# 🎨 Comment Ajouter la Police Calligrafico Boheme Floreal

## ✅ Configuration Déjà Prête !

Tout le code est configuré pour utiliser la police "Calligrafico Boheme Floreal" pour les noms **Flavio** et **Letizia** dans le header.

---

## 📥 Étapes pour Ajouter la Police

### 1. Obtenez les Fichiers de Police

Vous devez avoir les fichiers de la police **Calligrafico Boheme Floreal** dans l'un de ces formats :
- `.woff2` (recommandé - meilleure compression)
- `.woff` (bon support navigateur)
- `.ttf` ou `.otf` (fallback)

**Sources possibles** :
- Si vous l'avez achetée → Utilisez les fichiers fournis
- MyFonts : https://www.myfonts.com
- Creative Market : https://creativemarket.com
- Dafont : https://www.dafont.com/fr/

### 2. Renommez les Fichiers

Pour que ça fonctionne automatiquement, renommez les fichiers :
```
CalligraficoBohemeFloreal.woff2
CalligraficoBohemeFloreal.woff
CalligraficoBohemeFloreal.ttf
```

### 3. Placez les Fichiers

Copiez les fichiers dans :
```
src/assets/fonts/
```

**Structure finale** :
```
src/assets/fonts/
├── CalligraficoBohemeFloreal.woff2
├── CalligraficoBohemeFloreal.woff
├── CalligraficoBohemeFloreal.ttf
└── README.md
```

### 4. Rebuild et Push

```bash
npm run build
git add src/assets/fonts/
git commit -m "Ajout police Calligrafico Boheme Floreal"
git push
```

### 5. Sur Infomaniak

```bash
git pull
npm run build
pm2 restart wedding
```

---

## 🔍 Ce Qui a Été Configuré

### 1. Déclaration CSS (`src/index.css`)
```css
@font-face {
  font-family: "Calligrafico Boheme Floreal";
  src: url("./assets/fonts/CalligraficoBohemeFloreal.woff2") format("woff2"),
       url("./assets/fonts/CalligraficoBohemeFloreal.woff") format("woff"),
       url("./assets/fonts/CalligraficoBohemeFloreal.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 2. Configuration Tailwind (`tailwind.config.js`)
```javascript
fontFamily: {
  boheme: ["Calligrafico Boheme Floreal", "Great Vibes", "cursive"],
  // ...
}
```

**Note** : Fallback sur "Great Vibes" si la police Boheme n'est pas chargée.

### 3. Application dans le Header (`src/components/Header.jsx`)
```jsx
<p className="text-7xl md:text-9xl font-boheme text-gray-900 leading-none">
  Flavio
</p>
// ...
<p className="text-7xl md:text-9xl font-boheme text-gray-900 leading-none">
  Letizia
</p>
```

---

## ⚠️ Sans les Fichiers de Police

**Actuellement**, les noms utilisent "Great Vibes" (police de fallback) car les fichiers de la police Boheme ne sont pas encore ajoutés.

**Une fois les fichiers ajoutés**, les noms utiliseront automatiquement "Calligrafico Boheme Floreal".

---

## 🎨 Exemple Visuel

**Avant (Great Vibes)** :
```
╔════════════════════════════╗
║         Flavio             ║ ← Style cursive Google Fonts
║           et               ║
║         Letizia            ║ ← Style cursive Google Fonts
╚════════════════════════════╝
```

**Après (Boheme Floreal)** :
```
╔════════════════════════════╗
║       𝓕𝓵𝓪𝓿𝓲𝓸              ║ ← Style calligraphique élégant
║           et               ║
║       𝓛𝓮𝓽𝓲𝔃𝓲𝓪             ║ ← Style calligraphique élégant
╚════════════════════════════╝
```

---

## 🔄 Conversion de Police

Si vous avez la police dans un autre format (ex: `.otf`), vous pouvez la convertir :

**Convertisseur en ligne (gratuit)** :
- https://transfonter.org/
- https://cloudconvert.com/otf-to-woff2

**Formats à générer** :
1. WOFF2 (meilleur, recommandé)
2. WOFF (bon support)
3. TTF (fallback)

---

## 📝 Alternative : Police Similaire Gratuite

Si vous n'avez pas accès à Calligrafico Boheme Floreal, voici des alternatives gratuites similaires :

### Sur Google Fonts
- **Allura** : https://fonts.google.com/specimen/Allura
- **Alex Brush** : https://fonts.google.com/specimen/Alex+Brush
- **Parisienne** : https://fonts.google.com/specimen/Parisienne
- **Tangerine** : https://fonts.google.com/specimen/Tangerine

Pour utiliser une police Google Fonts :
1. Ajoutez l'import dans `src/index.css`
2. Modifiez `tailwind.config.js` → `boheme: ["Votre Police", "cursive"]`

---

## ✅ Checklist

- [ ] Obtenir les fichiers de police (woff2, woff, ttf)
- [ ] Renommer en CalligraficoBohemeFloreal.*
- [ ] Copier dans src/assets/fonts/
- [ ] npm run build
- [ ] git add src/assets/fonts/
- [ ] git commit -m "Ajout police Boheme"
- [ ] git push
- [ ] Sur Infomaniak : git pull + npm run build + pm2 restart

---

**En attendant d'avoir la police, les noms utilisent "Great Vibes" comme fallback.** ✨

**Une fois la police ajoutée, elle s'appliquera automatiquement !** 🎉

