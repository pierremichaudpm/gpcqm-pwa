# 🚀 Configuration Volume Railway pour GPCM 2025

## ✅ Configuration appliquée

Le code est maintenant configuré pour utiliser un volume Railway persistant. Cela permettra :
- ✅ CMS complètement fonctionnel en ligne
- ✅ Modifications persistantes entre redémarrages
- ✅ Upload d'images persistant
- ✅ Éditions d'équipes/coureurs sauvegardées

## 📦 Structure du volume

```
/data/
├── cms/
│   └── teams-data.json    # Données des équipes (persistant)
├── jerseys/                # Images uploadées (persistant)
└── riders.json             # Données des coureurs (persistant)
```

## 🔧 Configuration Railway

### 1. Créer le volume dans Railway Dashboard

1. Aller dans votre projet Railway
2. Cliquer sur votre service
3. Aller dans l'onglet "Volumes"
4. Cliquer sur "Create Volume"
5. Configuration :
   - **Mount path**: `/data`
   - **Size**: 1GB (suffisant pour des milliers d'images)
   - Cliquer "Create"

### 2. Variables d'environnement (déjà configurées)

Le fichier `railway.json` configure automatiquement :
```json
"CMS_JERSEYS_DIR": "/data/jerseys"
```

### 3. Initialisation automatique

Au premier déploiement, le serveur :
1. Détecte que c'est Railway
2. Vérifie si le volume est vide
3. Copie automatiquement les données du repo vers le volume
4. Les futures modifications seront persistantes

## 🚀 Déploiement

```bash
# Vérifier les changements
git status

# Ajouter tout
git add -A

# Commit
git commit -m "Config: Ajout volume Railway pour persistance CMS"

# Pousser vers Railway
git push origin main
```

## 📊 Après déploiement

### Vérifier dans les logs Railway :
```
Volume data already exists
```
ou lors du premier déploiement :
```
Initializing volume with repository data...
Volume initialized successfully
```

### Tester le CMS :
1. Aller sur https://[votre-app].up.railway.app/cms
2. Se connecter (admin/Axelle20)
3. Modifier une équipe
4. Sauvegarder
5. Redémarrer le service Railway
6. Vérifier que les modifications persistent ✅

## 💰 Coût

- Volume 1GB : ~5$/mois
- Inclus : Backups automatiques
- Scalable jusqu'à 100GB si nécessaire

## ⚠️ Important

### Backup des données
Railway fait des backups automatiques, mais vous pouvez aussi :
1. Exporter via le CMS
2. Télécharger depuis Railway CLI
3. Faire des snapshots manuels

### Migration des données existantes
Si vous avez déjà des données modifiées localement :
1. Uploadez-les via le CMS après déploiement
2. Ou commitez-les dans Git avant de déployer

## 🔄 Rollback si nécessaire

Pour revenir sans volume :
1. Supprimer le volume dans Railway
2. Dans `server.js`, remplacer :
   ```javascript
   const DATA_BASE_DIR = IS_RAILWAY ? '/data/cms' : path.join(__dirname, 'cms');
   ```
   par :
   ```javascript
   const DATA_BASE_DIR = path.join(__dirname, 'cms');
   ```

## ✨ Avantages du volume

1. **Éditions en ligne** : Modifiez directement sur le site en production
2. **Uploads persistants** : Les images restent après redémarrage
3. **Indépendance** : Pas besoin de redéployer pour chaque changement
4. **Backups** : Railway sauvegarde automatiquement
5. **Performance** : Accès direct au disque, très rapide

## 🎯 Résumé

Avec cette configuration :
- ✅ Site 100% fonctionnel
- ✅ CMS complet en ligne
- ✅ Données persistantes
- ✅ Météo fonctionnelle
- ✅ Vrais maillots des équipes
