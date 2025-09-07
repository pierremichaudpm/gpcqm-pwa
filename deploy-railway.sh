#!/bin/bash

# Script de déploiement pour Railway
echo "🚀 Préparation du déploiement sur Railway..."

# Vérifier les changements
echo "📝 Vérification des fichiers modifiés..."
git status

# Ajouter tous les fichiers
echo "➕ Ajout des fichiers..."
git add .

# Commit avec message
echo "💾 Commit des changements..."
git commit -m "Déploiement Railway - Maillots corrigés, CMS simplifié"

# Push vers GitHub
echo "📤 Push vers GitHub..."
git push origin main

echo "✅ Code poussé sur GitHub !"
echo ""
echo "📌 Prochaines étapes :"
echo "1. Allez sur https://railway.app"
echo "2. Créez un nouveau projet ou sélectionnez votre projet existant"
echo "3. Connectez votre repo GitHub"
echo "4. Configurez les variables d'environnement :"
echo "   - CMS_USER=admin"
echo "   - CMS_PASS=Axelle20"
echo "   - OPENWEATHER_API_KEY=27fd496c6cc9c8cd6f8981bf682c5dd4"
echo ""
echo "Railway déploiera automatiquement à chaque push sur main !"
