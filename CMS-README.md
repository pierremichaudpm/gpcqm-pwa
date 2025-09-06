# GPCM CMS - Guide d'utilisation

## 🚴 Système de Gestion de Contenu pour le Grand Prix Cycliste de Montréal

### Description

Le GPCM CMS est un système de gestion de contenu spécialement conçu pour gérer les équipes et coureurs du Grand Prix Cycliste de Montréal. Il permet de modifier facilement les informations sans toucher au code.

### Fonctionnalités principales

✅ **Gestion des équipes**
- Ajouter, modifier ou supprimer des équipes
- Modifier le nom et nom d'affichage
- Gérer les drapeaux des pays
- Uploader les maillots des équipes

✅ **Gestion des coureurs**
- Ajouter jusqu'à 7 coureurs par équipe
- Modifier les noms et numéros de dossard
- Gérer les drapeaux de nationalité
- Supprimer des coureurs

✅ **Sauvegarde automatique**
- Sauvegarde sur le serveur
- Backup local dans le navigateur
- Export/Import JSON

---

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Démarrer le serveur CMS**
```bash
npm run cms
```

3. **Accéder au CMS**
Ouvrez votre navigateur et allez à :
```
http://localhost:3001/cms
```

---

## 📖 Guide d'utilisation

### 1. Gestion des équipes

#### Ajouter une équipe
1. Cliquez sur "➕ Ajouter une équipe" dans la barre latérale
2. Remplissez les informations :
   - Nom de l'équipe (obligatoire)
   - Nom d'affichage (optionnel)
   - Drapeau du pays (optionnel)
3. Cliquez sur "Ajouter l'équipe"

#### Modifier une équipe
1. Sélectionnez l'équipe dans la liste de gauche
2. Modifiez les champs souhaités
3. Les changements sont enregistrés automatiquement

#### Supprimer une équipe
1. Sélectionnez l'équipe
2. Cliquez sur "🗑️ Supprimer l'équipe"
3. Confirmez la suppression

### 2. Gestion des maillots

#### Ajouter/Modifier un maillot
1. Sélectionnez l'équipe
2. Cliquez sur "📷 Changer le maillot"
3. Deux options :
   - Uploader une image depuis votre ordinateur
   - Entrer l'URL d'une image en ligne
4. Cliquez sur "Appliquer"

#### Supprimer un maillot
1. Ouvrez le modal de maillot
2. Cliquez sur "Supprimer le maillot"

### 3. Gestion des coureurs

#### Ajouter un coureur
1. Sélectionnez l'équipe
2. Cliquez sur "➕ Ajouter un coureur"
3. Remplissez :
   - Numéro de dossard (optionnel)
   - Nom du coureur (obligatoire)
   - Drapeau de nationalité (optionnel)
4. Cliquez sur "Ajouter le coureur"

#### Modifier un coureur
- Cliquez directement sur les champs pour les modifier
- Pour changer le drapeau, cliquez sur l'emoji du drapeau

#### Supprimer un coureur
- Cliquez sur l'icône 🗑️ à côté du coureur

### 4. Gestion des drapeaux

#### Sélectionner un drapeau
1. Cliquez sur "🏳️ Choisir" ou sur un drapeau existant
2. Recherchez le pays dans la barre de recherche
3. Cliquez sur le drapeau souhaité

#### Supprimer un drapeau
1. Ouvrez le sélecteur de drapeau
2. Cliquez sur "Supprimer le drapeau"

### 5. Sauvegarde et export

#### Sauvegarder les données
- Cliquez sur "💾 Sauvegarder" dans l'en-tête
- Les données sont sauvegardées sur le serveur et localement

#### Exporter les données
- Cliquez sur "📥 Exporter JSON"
- Un fichier JSON sera téléchargé avec toutes les données

#### Importer des données
- Cliquez sur "📤 Importer JSON"
- Sélectionnez un fichier JSON valide
- Les données seront remplacées

---

## 🔧 Configuration avancée

### Structure des données

Les données sont stockées dans plusieurs formats :

1. **cms/teams-data.json** - Données du CMS avec emojis
2. **riders.json** - Format pour l'API avec codes pays
3. **listeengages-package/listeengages/js/riders.js** - JavaScript pour l'application

### Format des données

```json
{
  "id": 1,
  "name": "UAE Team Emirates",
  "displayName": "UAE TEAM EMIRATES XRG",
  "country": "🇦🇪",
  "jerseyPath": "/images/jerseys/emirates.png",
  "riders": [
    {
      "number": 11,
      "name": "Tadej POGACAR",
      "country": "🇸🇮"
    }
  ]
}
```

### Limites

- Maximum 7 coureurs par équipe
- Images de maillot : max 5MB
- Formats acceptés : JPEG, PNG, GIF, SVG, WebP

---

## 🛠️ Dépannage

### Le serveur ne démarre pas
- Vérifiez que le port 3001 est disponible
- Installez les dépendances : `npm install`

### Les données ne se sauvegardent pas
- Vérifiez les permissions d'écriture sur les fichiers
- Regardez la console pour les erreurs

### Les maillots ne s'affichent pas
- Vérifiez que le dossier `images/jerseys/` existe
- Assurez-vous que les chemins d'images sont corrects

### Les drapeaux n'apparaissent pas
- Certains systèmes ne supportent pas tous les emojis
- Utilisez un navigateur moderne (Chrome, Firefox, Safari)

---

## 📝 Notes importantes

1. **Sauvegarde régulière** : Sauvegardez régulièrement vos données
2. **Backup** : Exportez un JSON de sauvegarde avant modifications majeures
3. **Navigateur** : Utilisez Chrome ou Firefox pour une meilleure expérience
4. **Connexion** : Une connexion internet n'est pas requise après le chargement initial

---

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez ce guide
2. Consultez la console du navigateur (F12)
3. Vérifiez les logs du serveur

---

## 🔒 Sécurité

- Le CMS est conçu pour un usage local
- Pour un déploiement en production, ajoutez une authentification
- Sauvegardez régulièrement vos données

---

*Développé pour le Grand Prix Cycliste de Montréal 2025* 🚴‍♂️
