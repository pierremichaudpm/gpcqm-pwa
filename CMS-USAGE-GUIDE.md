# Guide d'utilisation du CMS GPCQM 2025

## 🔐 Accès au CMS
- URL : `https://votre-app.railway.app/cms` (ou `http://localhost:3000/cms` en local)
- Identifiants par défaut :
  - Utilisateur : `admin`
  - Mot de passe : `Axelle20`

## 🎨 Gestion des maillots

### Maillots officiels (par défaut)
- Les maillots officiels sont dans `/listeengages-package/listeengages/images/jerseys/`
- Ils sont automatiquement utilisés pour chaque équipe
- Formats disponibles : emirates.png, visma.png, ineos.png, etc.

### Upload de nouveaux maillots via CMS
Le CMS **PERMET** d'uploader de nouveaux maillots pour remplacer temporairement les maillots officiels :

1. **Pour uploader un nouveau maillot :**
   - Aller dans le CMS
   - Cliquer sur l'équipe à modifier
   - Cliquer sur "Changer le maillot"
   - Sélectionner une image PNG/JPG
   - Sauvegarder

2. **Format des uploads :**
   - Les maillots uploadés sont sauvegardés dans `/images/jerseys/`
   - Format : `jersey-[timestamp]-[random].png`
   - Taille recommandée : 200x200px

3. **Priorité d'affichage :**
   - 1️⃣ Maillot uploadé via CMS (s'il existe)
   - 2️⃣ Maillot officiel de l'équipe

4. **Pour revenir au maillot officiel :**
   - Supprimer le fichier uploadé dans `/images/jerseys/`
   - OU modifier `teams-data.json` pour pointer vers le maillot officiel

## 👥 Gestion des équipes et coureurs

### Modifier une équipe
1. Cliquer sur l'équipe dans le CMS
2. Modifier les informations :
   - Nom d'affichage
   - Coureurs (nom, numéro, pays)
3. Sauvegarder

### Ajouter/Supprimer des coureurs
- Maximum 7 coureurs par équipe
- Utiliser les drapeaux emoji pour les pays
- Les numéros de dossard sont optionnels

## 💾 Sauvegarde des données

### Local (navigateur)
- Les données sont automatiquement sauvegardées dans le navigateur
- Persistance même si le serveur est hors ligne

### Serveur
- Cliquer sur "Sauvegarder" pour envoyer au serveur
- Sur Railway : données persistantes dans le volume `/data`
- Fichiers modifiés :
  - `/data/cms/teams-data.json` (Railway)
  - `/data/riders.json` (Railway)
  - `./cms/teams-data.json` (local)
  - `./riders.json` (local)

## ⚠️ Important

### À FAIRE ✅
- Uploader des maillots temporaires pour des événements spéciaux
- Modifier les noms d'équipes et coureurs
- Ajouter/retirer des coureurs
- Utiliser le CMS pour des mises à jour rapides

### À NE PAS FAIRE ❌
- Ne pas uploader 24 maillots d'un coup (utiliser les maillots officiels)
- Ne pas modifier directement les fichiers JSON sans passer par le CMS
- Ne pas utiliser l'API `/api/teams` avec curl (elle remplace TOUTES les données)

## 🔧 Résolution de problèmes

### Les changements ne s'affichent pas
1. Vider le cache du navigateur (Ctrl+F5)
2. Vérifier que le serveur est redémarré
3. Vérifier les logs du serveur

### Maillot incorrect affiché
1. Vérifier dans `/images/jerseys/` s'il y a un upload
2. Si oui, le supprimer pour revenir au maillot officiel
3. Ou uploader un nouveau maillot via le CMS

### Données perdues
1. Les données sont sauvegardées localement dans le navigateur
2. Ouvrir le CMS et les données devraient réapparaître
3. Sauvegarder à nouveau sur le serveur
