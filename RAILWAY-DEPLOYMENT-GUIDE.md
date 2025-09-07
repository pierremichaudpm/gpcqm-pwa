# 🚀 Guide de Déploiement Railway GPCQM 2025

## État actuel : PRÊT À DÉPLOYER ✅

### Corrections appliquées :
- ✅ API Météo : Utilise l'API forecast standard
- ✅ Maillots : Vrais maillots des équipes restaurés
- ✅ Chemins : Pas de dépendance aux volumes

## 📦 Option 1 : SANS Volume (Recommandé pour l'événement)

### Avantages :
- ✅ **GRATUIT**
- ✅ Site 100% fonctionnel en lecture
- ✅ Météo fonctionne
- ✅ Tous les maillots officiels affichés
- ✅ Déploiement simple

### Limitations :
- ⚠️ Modifications CMS perdues au redémarrage
- ⚠️ Uploads temporaires seulement

### Pour modifier les données :
1. Éditer localement `cms/teams-data.json`
2. Commit et push
3. Railway redéploie automatiquement

### Commandes de déploiement :
```bash
git add -A
git commit -m "Deploy: Site prêt pour l'événement avec vrais maillots"
git push origin main
```

## 📦 Option 2 : AVEC Volume (Si CMS en ligne nécessaire)

### Configuration Railway :
1. Aller dans Railway Dashboard
2. Ajouter un volume : `/data`
3. Ajouter ces variables d'environnement :
```
CMS_JERSEYS_DIR=/data/jerseys
```

### Puis modifier server.js :
```javascript
// Ligne 153
const DATA_BASE_DIR = IS_RAILWAY ? '/data/cms' : path.join(__dirname, 'cms');
```

### Coût : ~5$/mois pour le volume

## 🔧 Variables d'Environnement Railway

### OBLIGATOIRES :
```
# Aucune ! Tout est configuré par défaut
```

### OPTIONNELLES :
```
# Si vous avez une clé API différente
OPENWEATHER_API_KEY=votre_cle_premium

# Pour changer les identifiants CMS
CMS_USER=admin
CMS_PASS=votre_mot_de_passe
```

## ✅ Checklist Pré-Déploiement

- [x] API Météo configurée avec clé par défaut
- [x] Maillots officiels restaurés
- [x] Pas de dépendance aux volumes
- [x] server.js utilise chemins locaux
- [x] railway.json sans volume

## 🚀 Déploiement Immédiat

```bash
# Vérifier le statut
git status

# Ajouter tous les changements
git add -A

# Commit avec message descriptif
git commit -m "Fix: API météo forecast + vrais maillots équipes + suppression volumes"

# Pousser vers Railway
git push origin main
```

## 📊 Après Déploiement

Vérifier sur https://[votre-app].up.railway.app :
1. Page d'accueil charge ✅
2. Météo s'affiche ✅
3. Liste des équipes avec vrais maillots ✅
4. Images de maillots visibles ✅

## 💡 Conseil pour l'événement

**SANS volume est parfait** car :
- Vous avez déjà tous les vrais maillots
- Les équipes/coureurs sont déjà configurés
- Pas besoin de modifications en ligne pendant l'événement
- Plus stable et prévisible

## 🔄 Pour faire des changements après déploiement

1. Modifier localement
2. Tester avec `npm start`
3. Commit et push
4. Railway redéploie automatiquement (2-3 minutes)

## ⚠️ Important

Si vous choisissez SANS volume :
- Le CMS en ligne est en "lecture seule" effectivement
- Les modifications via /cms seront perdues
- Utilisez Git pour persister les changements
