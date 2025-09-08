# 🚀 Guide de Migration CMS - App Québec

Guide étape par étape pour migrer le CMS dans votre nouvelle app pour l'événement de Québec.

## 📋 Prérequis

- ✅ Node.js installé
- ✅ Votre nouvelle app Québec prête
- ✅ Accès aux fichiers de l'app GPCM actuelle

## 🔄 Migration Étape par Étape

### Étape 1 : Copier le package CMS

```bash
# Depuis le dossier GPCM actuel
cp -r cms-package /chemin/vers/votre-app-quebec/

# Ou via zip
zip -r cms-package.zip cms-package/
# Puis extraire dans votre nouvelle app
```

### Étape 2 : Installer dans la nouvelle app

```bash
cd /chemin/vers/votre-app-quebec/cms-package/
npm install
```

### Étape 3 : Adapter les chemins

Éditez `cms-server.js` ligne 12 pour pointer vers votre fichier riders.json :

```javascript
// Ligne 12 - Adapter selon votre structure
const RIDERS_FILE = path.join(__dirname, '..', 'riders.json'); // ← Modifier ce chemin
```

### Étape 4 : Configuration

Créer `.env` dans le dossier cms-package :

```env
PORT=3001
CMS_USER=admin
CMS_PASS=VotreMotDePasseQuebec
```

### Étape 5 : Tester localement

```bash
# Dans le dossier cms-package
npm start
```

Vérifiez : http://localhost:3001/cms/

### Étape 6 : Intégration avec votre app principale

#### Option A : Serveurs séparés (Plus simple)

```bash
# Terminal 1 : Votre app Québec
cd /chemin/vers/votre-app-quebec
npm start  # Port 3000

# Terminal 2 : CMS
cd /chemin/vers/votre-app-quebec/cms-package
npm start  # Port 3001
```

#### Option B : Serveur intégré

Dans votre `server.js` principal :

```javascript
// Ajouter ces routes
app.use('/cms', express.static(path.join(__dirname, 'cms-package')));

// Ajouter les routes API du CMS
const cmsAPI = require('./cms-package/cms-server');
// ... (copier les routes API du cms-server.js)
```

## 🔧 Personnalisation pour Québec

### Modifier le titre et branding

Dans `cms-server.js`, ligne ~50 :

```html
<title>CMS GPCQ - Gestion des Équipes</title>
<h1>🚴‍♂️ CMS GPCQ</h1> <!-- Changer GPCM → GPCQ -->
```

### Adapter les styles (optionnel)

Modifier `cms-styles.css` pour les couleurs de l'événement Québec.

### Changer l'authentification

Modifier les variables dans `.env` ou directement dans `cms-server.js` :

```javascript
const CMS_USER = process.env.CMS_USER || 'adminqc';
const CMS_PASS = process.env.CMS_PASS || 'Quebec2025';
```

## 📁 Structure finale dans votre app

```
votre-app-quebec/
├── package.json
├── server.js
├── riders.json              ← Fichier synchronisé par le CMS
├── cms-package/             ← Package CMS
│   ├── package.json
│   ├── cms-server.js
│   ├── cms-app-clean.js
│   ├── cms-styles.css
│   ├── teams-data.json      ← Données internes CMS
│   └── .env
└── ... (reste de votre app)
```

## 🚀 Déploiement sur Railway

### 1. Pousser sur GitHub

```bash
git add .
git commit -m "Ajout CMS package pour événement Québec"
git push origin main
```

### 2. Configurer Railway

Variables d'environnement à ajouter :
```
CMS_USER=adminqc
CMS_PASS=Quebec2025
NODE_ENV=production
```

### 3. Scripts de démarrage

Dans votre `package.json` principal :

```json
{
  "scripts": {
    "start": "node server.js",
    "start:cms": "node cms-package/cms-server.js",
    "dev": "concurrently \"npm start\" \"npm run start:cms\""
  }
}
```

## 🔄 Synchronisation des données

Le CMS maintient automatiquement :
- `cms-package/teams-data.json` : Données internes
- `riders.json` : Fichier utilisé par votre app (synchronisé automatiquement)

**Important** : Quand vous modifiez dans le CMS, les changements apparaissent immédiatement dans votre app !

## ✅ Checklist de migration

- [ ] Package CMS copié
- [ ] Dépendances installées (`npm install`)
- [ ] Chemins adaptés dans `cms-server.js`
- [ ] Configuration `.env` créée
- [ ] Test local réussi
- [ ] Intégration avec l'app principale
- [ ] Personnalisation pour Québec
- [ ] Déploiement Railway configuré
- [ ] Variables d'environnement définies
- [ ] Tests de synchronisation OK

## 🆘 Dépannage

### Le CMS ne démarre pas
```bash
# Vérifier les dépendances
npm install

# Vérifier le port
lsof -i :3001
```

### Pas de synchronisation avec l'app
- Vérifier le chemin `RIDERS_FILE` dans `cms-server.js`
- Vérifier les permissions de fichiers
- Regarder les logs du serveur

### Erreur d'authentification
- Vérifier les variables `CMS_USER` et `CMS_PASS`
- Tester avec curl : `curl -u admin:password http://localhost:3001/api/teams`

### Sur Railway
- Vérifier les variables d'environnement
- Regarder les logs de déploiement
- Tester le endpoint de santé : `/health`

---

**🎯 Résultat** : Vous aurez le même CMS fonctionnel dans votre app Québec avec les mêmes données et fonctionnalités que l'app GPCM principale !
