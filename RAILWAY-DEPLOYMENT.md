# 🚀 Guide de Déploiement sur Railway

## 📋 Prérequis

1. **Compte Railway** : https://railway.app
2. **Repository GitHub** avec votre code

## 🔧 Configuration

### 1. Variables d'Environnement sur Railway

Dans votre projet Railway, configurez ces variables :

```env
# Port (Railway le fournit automatiquement)
PORT=3000

# Environnement
NODE_ENV=production

# CMS Authentication
CMS_USER=admin
CMS_PASS=Axelle20

# API Keys
OPENWEATHER_API_KEY=27fd496c6cc9c8cd6f8981bf682c5dd4

# Instagram (optionnel)
INSTAGRAM_ACCESS_TOKEN=votre_token_si_disponible
```

### 2. Étapes de Déploiement

#### Option A : Via GitHub (Recommandé)

1. **Pusher votre code sur GitHub** :
```bash
git add .
git commit -m "Prêt pour déploiement Railway"
git push origin main
```

2. **Sur Railway** :
   - Créer un nouveau projet
   - Choisir "Deploy from GitHub repo"
   - Sélectionner votre repository
   - Railway détectera automatiquement `package.json` et `railway.json`

#### Option B : Via Railway CLI

1. **Installer Railway CLI** :
```bash
npm install -g @railway/cli
```

2. **Login** :
```bash
railway login
```

3. **Créer le projet** :
```bash
railway init
```

4. **Déployer** :
```bash
railway up
```

### 3. Configuration Automatique

Le fichier `railway.json` est déjà configuré avec :
- Build command : `npm install`
- Start command : `npm start` (démarre `server.js`)
- Health check : `/health`
- Region : `us-east`

### 4. Domaine Personnalisé

1. Dans Railway Dashboard → Settings → Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS chez votre registrar

## ✅ Vérifications Post-Déploiement

1. **Site principal** : `https://votre-app.railway.app`
2. **CMS** : `https://votre-app.railway.app/cms/`
3. **API Météo** : `https://votre-app.railway.app/api/weather/current?lat=45.4706&lon=-73.7408&units=metric&lang=fr`
4. **Health Check** : `https://votre-app.railway.app/health`

## 🔍 Debugging

### Logs Railway
```bash
railway logs
```

### Redémarrer l'application
```bash
railway restart
```

## 📁 Structure Importante

Les fichiers suivants sont critiques pour le déploiement :

- `server.js` : Serveur principal
- `package.json` : Dépendances et scripts
- `railway.json` : Configuration Railway
- `riders.json` : Données des équipes
- `/listeengages-package/` : Images des maillots
- `/cms/` : Fichiers du CMS

## ⚠️ Notes Importantes

1. **Maillots** : Les maillots sont maintenant dans `/listeengages-package/listeengages/images/jerseys/`
2. **CMS** : Protégé par authentification Basic Auth
3. **API Météo** : Utilise OpenWeatherMap (clé incluse)
4. **Service Worker** : Activé pour le mode offline

## 🚨 Problèmes Courants

### Port non défini
Railway fournit automatiquement la variable `PORT`. Ne pas la hardcoder.

### Erreur de build
Vérifier que toutes les dépendances sont dans `package.json`

### CMS ne fonctionne pas
Vérifier les variables `CMS_USER` et `CMS_PASS`

### Météo ne fonctionne pas
Vérifier la clé API OpenWeather

## 📞 Support

Pour toute question, consultez :
- Documentation Railway : https://docs.railway.app
- Status Railway : https://status.railway.app
