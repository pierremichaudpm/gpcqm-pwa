# 📦 GPCM CMS Package - Version Portable

Package CMS autonome pour la gestion des équipes et coureurs GPCM, facilement intégrable dans n'importe quelle application.

## 🎯 Fonctionnalités

- ✅ Gestion complète des équipes (ajout, modification, suppression)
- ✅ Gestion des coureurs par équipe
- ✅ Interface web intuitive
- ✅ API REST complète
- ✅ Authentification basique
- ✅ Synchronisation automatique avec l'app parente
- ✅ Données identiques à l'app GPCM principale

## 📋 Installation

### 1. Copier le package dans votre app

```bash
# Dans votre nouvelle app
cp -r /chemin/vers/cms-package ./
cd cms-package
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créer un fichier `.env` (optionnel) :

```env
PORT=3001
CMS_USER=admin
CMS_PASS=VotreMotDePasse
```

### 4. Lancer le CMS

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 🔧 Intégration dans votre app

### Option A : Serveur séparé (Recommandé)

Le CMS tourne sur son propre port (3001) et met à jour le fichier `riders.json` de votre app principale.

```bash
# Terminal 1 : Votre app principale
npm start  # Port 3000

# Terminal 2 : CMS
cd cms-package
npm start  # Port 3001
```

### Option B : Intégration dans votre serveur

Ajoutez ces routes à votre serveur principal :

```javascript
// Dans votre server.js principal
const cmsRoutes = require('./cms-package/cms-server');
app.use('/cms', cmsRoutes);
```

## 🌐 Utilisation

1. **Accéder au CMS** : http://localhost:3001/cms/
2. **Authentification** : 
   - Utilisateur : `admin`
   - Mot de passe : `Axelle20` (ou votre configuration)
3. **Gérer les équipes et coureurs**
4. **Les changements sont automatiquement synchronisés** avec votre app principale

## 📁 Structure des fichiers

```
cms-package/
├── package.json              # Dépendances
├── cms-server.js             # Serveur CMS
├── cms-app-clean.js          # Interface JavaScript
├── cms-styles.css            # Styles CSS
├── teams-data-template.json  # Template des données
└── README.md                 # Ce fichier
```

## 🔄 Synchronisation des données

Le CMS maintient deux fichiers :
- `teams-data.json` : Données internes du CMS
- `../riders.json` : Fichier de l'app parente (synchronisé automatiquement)

## 🚀 Déploiement

### Railway (Recommandé)

1. Copier le package dans votre app
2. Ajouter les variables d'environnement :
   ```
   CMS_USER=admin
   CMS_PASS=VotreMotDePasse
   ```
3. Le CMS sera accessible sur votre domaine : `https://votre-app.railway.app/cms/`

### Autres plateformes

Compatible avec Heroku, Vercel, Netlify, etc. Assurez-vous que :
- Node.js est supporté
- Les variables d'environnement sont configurées
- Le port est dynamique (`process.env.PORT`)

## 🔐 Sécurité

- Authentification HTTP Basic
- CORS configuré
- Helmet pour la sécurité des headers
- Pas de CSP stricte (pour compatibilité)

## 📊 API Endpoints

- `GET /api/teams` - Lister toutes les équipes
- `POST /api/teams` - Ajouter une équipe (auth requise)
- `PUT /api/teams/:id` - Modifier une équipe (auth requise)
- `DELETE /api/teams/:id` - Supprimer une équipe (auth requise)
- `GET /health` - Status du serveur

## 🎨 Personnalisation

### Modifier les styles
Éditez `cms-styles.css` pour personnaliser l'apparence.

### Modifier les données par défaut
Éditez `teams-data-template.json` avec vos équipes.

### Changer l'authentification
Modifiez la fonction `basicAuth` dans `cms-server.js`.

## 🆘 Support

Le package contient les mêmes données et fonctionnalités que l'app GPCM principale. 
Si vous rencontrez des problèmes, vérifiez :

1. Les dépendances sont installées (`npm install`)
2. Le port n'est pas déjà utilisé
3. Les permissions de fichiers sont correctes
4. Les variables d'environnement sont configurées

## 📝 Notes importantes

- **Ne pas modifier** les fichiers pendant que le serveur tourne
- Les changements dans le CMS sont **immédiatement** reflétés dans l'app parente
- Sauvegardez `teams-data.json` régulièrement
- Le CMS fonctionne de manière autonome, pas besoin de base de données

---

*Package créé pour l'événement de Québec avec les mêmes données que l'app GPCM principale.*
