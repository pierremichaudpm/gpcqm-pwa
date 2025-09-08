// GPCM CMS Server - Version Portable
// Serveur CMS autonome pour la gestion des équipes et coureurs

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration
const TEAMS_FILE = path.join(__dirname, 'teams-data.json');
const RIDERS_FILE = path.join(__dirname, '..', 'riders.json'); // Fichier dans l'app parente

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Authentification basique
const CMS_USER = process.env.CMS_USER || 'admin';
const CMS_PASS = process.env.CMS_PASS || 'Axelle20';

function basicAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Basic ')) {
        return res.status(401).set('WWW-Authenticate', 'Basic realm="CMS"').send('Authentication required');
    }
    
    const credentials = Buffer.from(auth.slice(6), 'base64').toString().split(':');
    if (credentials[0] !== CMS_USER || credentials[1] !== CMS_PASS) {
        return res.status(401).send('Invalid credentials');
    }
    
    next();
}

// Routes statiques
app.use('/cms', express.static(__dirname));

// Page CMS principale
app.get('/cms/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS GPCM - Gestion des Équipes</title>
    <link rel="stylesheet" href="cms-styles.css">
</head>
<body>
    <div class="cms-container">
        <header class="cms-header">
            <h1>🚴‍♂️ CMS GPCM</h1>
            <p>Gestion des équipes et coureurs</p>
        </header>

        <main class="cms-main">
            <div class="stats-bar">
                <div class="stat-item">
                    <span class="stat-number" id="totalTeams">-</span>
                    <span class="stat-label">Équipes</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="totalRiders">-</span>
                    <span class="stat-label">Coureurs</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="lastUpdate">-</span>
                    <span class="stat-label">Dernière MAJ</span>
                </div>
            </div>

            <div class="teams-section">
                <div class="section-header">
                    <h2>📋 Équipes</h2>
                    <button class="btn btn-primary" onclick="addTeam()">
                        ➕ Ajouter une équipe
                    </button>
                </div>
                
                <div id="teamsContainer" class="teams-container">
                    <!-- Les équipes seront chargées ici -->
                </div>
            </div>
        </main>
    </div>

    <!-- Modals -->
    <div id="teamModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">Ajouter une équipe</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <form id="teamForm">
                    <input type="hidden" id="teamId">
                    
                    <div class="form-group">
                        <label for="teamName">Nom de l'équipe :</label>
                        <input type="text" id="teamName" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="teamDisplayName">Nom d'affichage :</label>
                        <input type="text" id="teamDisplayName">
                    </div>
                    
                    <div class="form-group">
                        <label for="teamJerseyPath">Chemin du maillot :</label>
                        <input type="text" id="teamJerseyPath" placeholder="/images/jerseys/team.png">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                <button type="button" class="btn btn-primary" onclick="saveTeam()">Sauvegarder</button>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>

    <script src="cms-app-clean.js"></script>
</body>
</html>
    `);
});

// API Routes
app.get('/api/teams', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teams = JSON.parse(data);
        res.json(teams);
    } catch (error) {
        console.error('Erreur lecture teams:', error);
        res.json({ teams: [] });
    }
});

app.post('/api/teams', basicAuth, async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teamsData = JSON.parse(data);
        
        const newTeam = {
            id: Date.now(),
            name: req.body.name,
            displayName: req.body.displayName || req.body.name,
            jerseyPath: req.body.jerseyPath || '',
            riders: []
        };
        
        teamsData.teams.push(newTeam);
        
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teamsData, null, 2));
        await updateRidersFile(teamsData);
        
        res.json(newTeam);
    } catch (error) {
        console.error('Erreur ajout équipe:', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'équipe' });
    }
});

app.put('/api/teams/:id', basicAuth, async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teamsData = JSON.parse(data);
        
        const teamIndex = teamsData.teams.findIndex(t => t.id == req.params.id);
        if (teamIndex === -1) {
            return res.status(404).json({ error: 'Équipe non trouvée' });
        }
        
        teamsData.teams[teamIndex] = {
            ...teamsData.teams[teamIndex],
            ...req.body
        };
        
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teamsData, null, 2));
        await updateRidersFile(teamsData);
        
        res.json(teamsData.teams[teamIndex]);
    } catch (error) {
        console.error('Erreur modification équipe:', error);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'équipe' });
    }
});

app.delete('/api/teams/:id', basicAuth, async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        const teamsData = JSON.parse(data);
        
        teamsData.teams = teamsData.teams.filter(t => t.id != req.params.id);
        
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teamsData, null, 2));
        await updateRidersFile(teamsData);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erreur suppression équipe:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'équipe' });
    }
});

// Fonction pour mettre à jour le fichier riders.json de l'app parente
async function updateRidersFile(teamsData) {
    try {
        await fs.writeFile(RIDERS_FILE, JSON.stringify(teamsData, null, 2));
        console.log('Fichier riders.json mis à jour');
    } catch (error) {
        console.error('Erreur mise à jour riders.json:', error);
    }
}

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║         GPCM CMS Server (Portable)     ║
╠════════════════════════════════════════╣
║  Serveur démarré sur le port ${PORT}      ║
║                                        ║
║  CMS (Gestion des équipes):           ║
║  http://localhost:${PORT}/cms/             ║
║                                        ║
║  API Endpoints:                        ║
║  GET    /api/teams                     ║
║  POST   /api/teams                     ║
║  PUT    /api/teams/:id                 ║
║  DELETE /api/teams/:id                 ║
║                                        ║
║  Authentification:                     ║
║  User: ${CMS_USER}                          ║
║  Pass: ${CMS_PASS}                     ║
╚════════════════════════════════════════╝
    `);
});
