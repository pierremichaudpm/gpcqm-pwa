// GPCM CMS Server - Serveur pour la gestion des données

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Configuration de multer pour l'upload des images
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const dir = path.join(__dirname, 'images', 'jerseys');
        try {
            await fs.mkdir(dir, { recursive: true });
            cb(null, dir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Seules les images sont autorisées'));
        }
    }
});

// Chemins des fichiers de données
const TEAMS_DATA_FILE = path.join(__dirname, 'cms', 'teams-data.json');
const RIDERS_JSON_FILE = path.join(__dirname, 'riders.json');
const RIDERS_JS_FILE = path.join(__dirname, 'listeengages-package', 'listeengages', 'js', 'riders.js');

// Fonction pour lire les données des équipes
async function readTeamsData() {
    try {
        const data = await fs.readFile(TEAMS_DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si le fichier n'existe pas, essayer de lire riders.json
        try {
            const ridersData = await fs.readFile(RIDERS_JSON_FILE, 'utf8');
            const parsed = JSON.parse(ridersData);
            return transformRidersData(parsed);
        } catch (err) {
            return [];
        }
    }
}

// Fonction pour sauvegarder les données des équipes
async function saveTeamsData(teams) {
    try {
        // Créer le dossier cms s'il n'existe pas
        await fs.mkdir(path.dirname(TEAMS_DATA_FILE), { recursive: true });
        
        // Sauvegarder dans teams-data.json
        await fs.writeFile(TEAMS_DATA_FILE, JSON.stringify(teams, null, 2));
        
        // Mettre à jour riders.json
        await updateRidersJson(teams);
        
        // Mettre à jour riders.js
        await updateRidersJs(teams);
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        throw error;
    }
}

// Transformer les données du format riders.json
function transformRidersData(data) {
    if (!data.teams) return [];
    
    const cleanTeams = [];
    const seenTeams = new Set();
    
    data.teams.forEach(team => {
        const teamName = team.name || team.displayName || '';
        
        if (seenTeams.has(teamName)) return;
        seenTeams.add(teamName);
        
        const cleanRiders = [];
        if (team.riders && Array.isArray(team.riders)) {
            team.riders.forEach(rider => {
                if (rider.name && !rider.name.includes('TEAM') && rider.name.trim() !== '') {
                    cleanRiders.push({
                        number: rider.number || '',
                        name: rider.name,
                        country: convertCountryCodeToFlag(rider.country) || ''
                    });
                }
            });
        }
        
        cleanTeams.push({
            id: team.id || Date.now() + Math.random(),
            name: teamName,
            displayName: team.displayName || teamName,
            country: convertCountryCodeToFlag(team.country) || '',
            riders: cleanRiders.slice(0, 7),
            jerseyPath: team.jerseyPath || ''
        });
    });
    
    return cleanTeams;
}

// Convertir les codes pays en emoji
function convertCountryCodeToFlag(code) {
    if (!code) return '';
    
    const countryCodeMap = {
        'FRA': '🇫🇷', 'USA': '🇺🇸', 'GBR': '🇬🇧', 'GER': '🇩🇪', 'DEU': '🇩🇪',
        'ITA': '🇮🇹', 'ESP': '🇪🇸', 'BEL': '🇧🇪', 'NED': '🇳🇱', 'NLD': '🇳🇱',
        'AUS': '🇦🇺', 'CAN': '🇨🇦', 'NOR': '🇳🇴', 'DEN': '🇩🇰', 'DNK': '🇩🇰',
        'SUI': '🇨🇭', 'CHE': '🇨🇭', 'AUT': '🇦🇹', 'POL': '🇵🇱', 'POR': '🇵🇹',
        'PRT': '🇵🇹', 'CZE': '🇨🇿', 'SVK': '🇸🇰', 'SLO': '🇸🇮', 'SVN': '🇸🇮',
        'HUN': '🇭🇺', 'ROU': '🇷🇴', 'RUS': '🇷🇺', 'UKR': '🇺🇦', 'SWE': '🇸🇪',
        'FIN': '🇫🇮', 'EST': '🇪🇪', 'LAT': '🇱🇻', 'LTU': '🇱🇹', 'IRL': '🇮🇪',
        'LUX': '🇱🇺', 'COL': '🇨🇴', 'ARG': '🇦🇷', 'BRA': '🇧🇷', 'MEX': '🇲🇽',
        'JPN': '🇯🇵', 'KOR': '🇰🇷', 'CHN': '🇨🇳', 'NZL': '🇳🇿', 'RSA': '🇿🇦',
        'UAE': '🇦🇪', 'KAZ': '🇰🇿', 'ISR': '🇮🇱', 'ECU': '🇪🇨', 'ERI': '🇪🇷',
        'CRO': '🇭🇷', 'HRV': '🇭🇷', 'BHR': '🇧🇭', 'BIH': '🇧🇦'
    };
    
    return countryCodeMap[code.toUpperCase()] || '';
}

// Convertir emoji en code pays
function convertFlagToCountryCode(flag) {
    if (!flag) return '';
    
    const flagToCodeMap = {
        '🇫🇷': 'FRA', '🇺🇸': 'USA', '🇬🇧': 'GBR', '🇩🇪': 'GER',
        '🇮🇹': 'ITA', '🇪🇸': 'ESP', '🇧🇪': 'BEL', '🇳🇱': 'NED',
        '🇦🇺': 'AUS', '🇨🇦': 'CAN', '🇳🇴': 'NOR', '🇩🇰': 'DEN',
        '🇨🇭': 'SUI', '🇦🇹': 'AUT', '🇵🇱': 'POL', '🇵🇹': 'POR',
        '🇨🇿': 'CZE', '🇸🇰': 'SVK', '🇸🇮': 'SLO', '🇭🇺': 'HUN',
        '🇷🇴': 'ROU', '🇷🇺': 'RUS', '🇺🇦': 'UKR', '🇸🇪': 'SWE',
        '🇫🇮': 'FIN', '🇪🇪': 'EST', '🇱🇻': 'LAT', '🇱🇹': 'LTU',
        '🇮🇪': 'IRL', '🇱🇺': 'LUX', '🇨🇴': 'COL', '🇦🇷': 'ARG',
        '🇧🇷': 'BRA', '🇲🇽': 'MEX', '🇯🇵': 'JPN', '🇰🇷': 'KOR',
        '🇨🇳': 'CHN', '🇳🇿': 'NZL', '🇿🇦': 'RSA', '🇦🇪': 'UAE',
        '🇰🇿': 'KAZ', '🇮🇱': 'ISR', '🇪🇨': 'ECU', '🇪🇷': 'ERI',
        '🇭🇷': 'CRO', '🇧🇭': 'BHR', '🇧🇦': 'BIH'
    };
    
    return flagToCodeMap[flag] || '';
}

// Mettre à jour riders.json
async function updateRidersJson(teams) {
    const ridersData = {
        teams: teams.map(team => ({
            id: team.id,
            name: team.name,
            displayName: team.displayName,
            country: convertFlagToCountryCode(team.country),
            riders: team.riders.map(rider => ({
                number: rider.number,
                name: rider.name,
                country: convertFlagToCountryCode(rider.country)
            }))
        }))
    };
    
    await fs.writeFile(RIDERS_JSON_FILE, JSON.stringify(ridersData, null, 2));
}

// Mettre à jour riders.js
async function updateRidersJs(teams) {
    const jsContent = `// === GPCQM 2025 - Riders Modal Management ===
// Généré automatiquement par le CMS - ${new Date().toISOString()}

// Données officielles des équipes et coureurs GPCQM 2025
const ridersData = {
    teams: ${JSON.stringify(teams.map(team => ({
        id: team.id,
        name: team.name,
        displayName: team.displayName,
        country: team.country,
        director: team.director || '',
        riders: team.riders || []
    })), null, 4)}
};

// Le reste du code JavaScript reste inchangé...
`;

    try {
        // Lire le fichier existant pour préserver le code non-données
        const existingContent = await fs.readFile(RIDERS_JS_FILE, 'utf8');
        
        // Trouver où se termine la définition de ridersData
        const endIndex = existingContent.indexOf('};', existingContent.indexOf('const ridersData')) + 2;
        
        if (endIndex > 2) {
            // Préserver tout le code après ridersData
            const preservedCode = existingContent.substring(endIndex);
            const newContent = jsContent + preservedCode;
            await fs.writeFile(RIDERS_JS_FILE, newContent);
        } else {
            // Si on ne trouve pas la structure, écrire seulement les données
            await fs.writeFile(RIDERS_JS_FILE, jsContent);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de riders.js:', error);
    }
}

// Routes API

// Obtenir toutes les équipes
app.get('/api/teams', async (req, res) => {
    try {
        const teams = await readTeamsData();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

// Sauvegarder toutes les équipes
app.post('/api/teams', async (req, res) => {
    try {
        const teams = req.body;
        await saveTeamsData(teams);
        res.json({ success: true, message: 'Données sauvegardées avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la sauvegarde des données' });
    }
});

// Upload d'image de maillot
app.post('/api/upload-jersey', upload.single('jersey'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier uploadé' });
        }
        
        const jerseyPath = `/images/jerseys/${req.file.filename}`;
        res.json({ success: true, path: jerseyPath });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'upload du maillot' });
    }
});

// Obtenir une équipe spécifique
app.get('/api/teams/:id', async (req, res) => {
    try {
        const teams = await readTeamsData();
        const team = teams.find(t => t.id == req.params.id);
        
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ error: 'Équipe non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

// Mettre à jour une équipe spécifique
app.put('/api/teams/:id', async (req, res) => {
    try {
        const teams = await readTeamsData();
        const index = teams.findIndex(t => t.id == req.params.id);
        
        if (index !== -1) {
            teams[index] = { ...teams[index], ...req.body };
            await saveTeamsData(teams);
            res.json({ success: true, team: teams[index] });
        } else {
            res.status(404).json({ error: 'Équipe non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
});

// Supprimer une équipe
app.delete('/api/teams/:id', async (req, res) => {
    try {
        let teams = await readTeamsData();
        teams = teams.filter(t => t.id != req.params.id);
        await saveTeamsData(teams);
        res.json({ success: true, message: 'Équipe supprimée' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

// Route pour servir le CMS
app.get('/cms', (req, res) => {
    res.sendFile(path.join(__dirname, 'cms.html'));
});

// Route pour servir les fichiers CSS et JS du CMS
app.use('/cms', express.static(path.join(__dirname, 'cms')));

// Route racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║         GPCM CMS Server                ║
╠════════════════════════════════════════╣
║  Serveur démarré sur le port ${PORT}      ║
║                                        ║
║  Application principale:               ║
║  http://localhost:${PORT}                  ║
║                                        ║
║  CMS (Gestion des équipes):           ║
║  http://localhost:${PORT}/cms              ║
║                                        ║
║  API Endpoints:                        ║
║  GET    /api/teams                     ║
║  POST   /api/teams                     ║
║  PUT    /api/teams/:id                 ║
║  DELETE /api/teams/:id                 ║
║  POST   /api/upload-jersey             ║
╚════════════════════════════════════════╝
    `);
});
