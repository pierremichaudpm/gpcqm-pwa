# 📦 Guide de Migration du GPCM CMS

## Fichiers à copier pour réutiliser le CMS dans une autre application

### 🎯 **Option 1 : Version Autonome (RECOMMANDÉ - Plus simple)**

#### Fichier unique à copier :
```
✅ cms-standalone.html
```

**C'est tout !** Ce fichier contient tout le CMS en un seul fichier HTML.

#### Instructions :
1. Copiez `cms-standalone.html` dans votre projet Québec
2. Renommez-le si désiré (ex: `admin-quebec.html`)
3. Ouvrez le fichier et modifiez le titre si nécessaire :
   - Cherchez "GPCM CMS" et remplacez par "GPCQ CMS"
   - Cherchez "Grand Prix Cycliste de Montréal" et remplacez par "Grand Prix Cycliste de Québec"

---

### 🔧 **Option 2 : Version avec Serveur Node.js**

#### Fichiers essentiels à copier :

##### 1. **Fichiers du CMS :**
```
✅ cms.html                    # Interface principale du CMS
✅ cms-server.js               # Serveur backend Node.js
✅ cms/                        # Dossier complet avec :
   ├── cms-app.js             # Logique JavaScript du CMS
   ├── cms-styles.css         # Styles du CMS
   └── teams-complete.json    # Données d'exemple (optionnel)
```

##### 2. **Fichiers de support (optionnels mais utiles) :**
```
📄 test-cms.html              # Page de test
📄 test-integration.html      # Tests d'intégration
📄 load-teams-data.html       # Chargeur de données
📄 admin.html                 # Redirection vers le CMS
```

##### 3. **Dépendances à ajouter dans package.json :**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1"
  },
  "scripts": {
    "cms": "node cms-server.js"
  }
}
```

---

### 📁 **Structure recommandée dans votre projet Québec :**

```
projet-quebec/
├── index.html              # Votre app principale
├── cms-standalone.html     # CMS autonome (Option 1)
│
└── cms/                    # OU Version serveur (Option 2)
    ├── cms.html
    ├── cms-server.js
    └── cms/
        ├── cms-app.js
        ├── cms-styles.css
        └── teams-complete.json
```

---

### 🔄 **Modifications à faire après la copie :**

#### Pour la version autonome (cms-standalone.html) :
1. **Titre et textes** : Remplacer "GPCM" par "GPCQ"
2. **Données par défaut** : Modifier la fonction `getDefaultTeams()` avec vos équipes

#### Pour la version serveur :
1. **Dans cms-server.js** :
   - Ligne 15 : Changer le titre "GPCM CMS Server" → "GPCQ CMS Server"
   - Ajuster les ports si nécessaire (3001 → autre)

2. **Dans cms.html** :
   - Ligne 8 : Changer le titre de la page
   - Ligne 20 : Changer "GPCM CMS" → "GPCQ CMS"

3. **Dans cms/cms-app.js** :
   - Ligne 3 : Adapter les données par défaut si nécessaire
   - Les clés localStorage utilisent `gpcm_` - vous pouvez les changer en `gpcq_`

---

### 💡 **Conseils pour la migration :**

1. **Pour commencer rapidement** : Utilisez `cms-standalone.html`
   - Aucune configuration serveur nécessaire
   - Fonctionne sur n'importe quel hébergeur statique

2. **Pour une solution plus robuste** : Utilisez la version serveur
   - Permet la sauvegarde centralisée
   - Gestion des images de maillots

3. **Adaptation des chemins d'images** :
   - Les maillots sont dans `listeengages-package/listeengages/images/jerseys/`
   - Ajustez les chemins selon votre structure

4. **localStorage** :
   - Les données sont stockées avec la clé `gpcm_teams_data`
   - Pour éviter les conflits, changez en `gpcq_teams_data`

---

### ✅ **Checklist de migration rapide :**

- [ ] Copier les fichiers nécessaires
- [ ] Remplacer "GPCM" par "GPCQ" dans les titres
- [ ] Ajuster les chemins d'images si nécessaire
- [ ] Changer les clés localStorage si les deux apps coexistent
- [ ] Tester le chargement et la sauvegarde des données
- [ ] Vérifier que les maillots s'affichent correctement

---

### 🚀 **Commande rapide pour démarrer :**

#### Option 1 - Autonome :
```bash
# Ouvrir simplement le fichier dans le navigateur
open cms-standalone.html
```

#### Option 2 - Avec serveur :
```bash
# Installer les dépendances
npm install express multer

# Lancer le serveur CMS
npm run cms
```

---

### 📝 **Notes importantes :**

- Le CMS est **indépendant** de l'application principale
- Les modifications sont sauvegardées dans `localStorage` (version autonome) ou `teams.json` (version serveur)
- Pour synchroniser avec l'app principale, exportez/importez les données JSON
- Les images de maillots doivent être dans le bon dossier pour s'afficher

---

## Support

Si vous avez des questions lors de la migration, les points clés à vérifier sont :
1. Les chemins des fichiers (relatifs vs absolus)
2. Les clés localStorage pour éviter les conflits
3. La structure des données JSON reste la même

Bonne migration ! 🚴‍♂️
