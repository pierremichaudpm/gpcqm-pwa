// GPCM CMS - Application JavaScript

// État global
let teamsData = [];
let currentTeamId = null;
let currentFlagTarget = null;
let hasUnsavedChanges = false;

// Drapeaux disponibles
const countryFlags = {
    'Afghanistan': '🇦🇫', 'Afrique du Sud': '🇿🇦', 'Albanie': '🇦🇱', 'Algérie': '🇩🇿',
    'Allemagne': '🇩🇪', 'Andorre': '🇦🇩', 'Angola': '🇦🇴', 'Arabie Saoudite': '🇸🇦',
    'Argentine': '🇦🇷', 'Arménie': '🇦🇲', 'Australie': '🇦🇺', 'Autriche': '🇦🇹',
    'Azerbaïdjan': '🇦🇿', 'Bahreïn': '🇧🇭', 'Bangladesh': '🇧🇩', 'Belgique': '🇧🇪',
    'Belize': '🇧🇿', 'Bénin': '🇧🇯', 'Bhoutan': '🇧🇹', 'Biélorussie': '🇧🇾',
    'Bolivie': '🇧🇴', 'Bosnie-Herzégovine': '🇧🇦', 'Botswana': '🇧🇼', 'Brésil': '🇧🇷',
    'Bulgarie': '🇧🇬', 'Burkina Faso': '🇧🇫', 'Burundi': '🇧🇮', 'Cambodge': '🇰🇭',
    'Cameroun': '🇨🇲', 'Canada': '🇨🇦', 'Cap-Vert': '🇨🇻', 'Chili': '🇨🇱',
    'Chine': '🇨🇳', 'Chypre': '🇨🇾', 'Colombie': '🇨🇴', 'Corée du Nord': '🇰🇵',
    'Corée du Sud': '🇰🇷', 'Costa Rica': '🇨🇷', 'Côte d\'Ivoire': '🇨🇮', 'Croatie': '🇭🇷',
    'Cuba': '🇨🇺', 'Danemark': '🇩🇰', 'Djibouti': '🇩🇯', 'Dominique': '🇩🇲',
    'Égypte': '🇪🇬', 'Émirats Arabes Unis': '🇦🇪', 'Équateur': '🇪🇨', 'Érythrée': '🇪🇷',
    'Espagne': '🇪🇸', 'Estonie': '🇪🇪', 'États-Unis': '🇺🇸', 'Éthiopie': '🇪🇹',
    'Fidji': '🇫🇯', 'Finlande': '🇫🇮', 'France': '🇫🇷', 'Gabon': '🇬🇦',
    'Gambie': '🇬🇲', 'Géorgie': '🇬🇪', 'Ghana': '🇬🇭', 'Grèce': '🇬🇷',
    'Grenade': '🇬🇩', 'Guatemala': '🇬🇹', 'Guinée': '🇬🇳', 'Guinée-Bissau': '🇬🇼',
    'Guyane': '🇬🇾', 'Haïti': '🇭🇹', 'Honduras': '🇭🇳', 'Hongrie': '🇭🇺',
    'Inde': '🇮🇳', 'Indonésie': '🇮🇩', 'Irak': '🇮🇶', 'Iran': '🇮🇷',
    'Irlande': '🇮🇪', 'Islande': '🇮🇸', 'Israël': '🇮🇱', 'Italie': '🇮🇹',
    'Jamaïque': '🇯🇲', 'Japon': '🇯🇵', 'Jordanie': '🇯🇴', 'Kazakhstan': '🇰🇿',
    'Kenya': '🇰🇪', 'Kirghizistan': '🇰🇬', 'Kiribati': '🇰🇮', 'Kosovo': '🇽🇰',
    'Koweït': '🇰🇼', 'Laos': '🇱🇦', 'Lettonie': '🇱🇻', 'Liban': '🇱🇧',
    'Libéria': '🇱🇷', 'Libye': '🇱🇾', 'Liechtenstein': '🇱🇮', 'Lituanie': '🇱🇹',
    'Luxembourg': '🇱🇺', 'Macédoine du Nord': '🇲🇰', 'Madagascar': '🇲🇬', 'Malaisie': '🇲🇾',
    'Malawi': '🇲🇼', 'Maldives': '🇲🇻', 'Mali': '🇲🇱', 'Malte': '🇲🇹',
    'Maroc': '🇲🇦', 'Maurice': '🇲🇺', 'Mauritanie': '🇲🇷', 'Mexique': '🇲🇽',
    'Moldavie': '🇲🇩', 'Monaco': '🇲🇨', 'Mongolie': '🇲🇳', 'Monténégro': '🇲🇪',
    'Mozambique': '🇲🇿', 'Myanmar': '🇲🇲', 'Namibie': '🇳🇦', 'Nauru': '🇳🇷',
    'Népal': '🇳🇵', 'Nicaragua': '🇳🇮', 'Niger': '🇳🇪', 'Nigeria': '🇳🇬',
    'Norvège': '🇳🇴', 'Nouvelle-Zélande': '🇳🇿', 'Oman': '🇴🇲', 'Ouganda': '🇺🇬',
    'Ouzbékistan': '🇺🇿', 'Pakistan': '🇵🇰', 'Palestine': '🇵🇸', 'Panama': '🇵🇦',
    'Papouasie-Nouvelle-Guinée': '🇵🇬', 'Paraguay': '🇵🇾', 'Pays-Bas': '🇳🇱', 'Pérou': '🇵🇪',
    'Philippines': '🇵🇭', 'Pologne': '🇵🇱', 'Portugal': '🇵🇹', 'Qatar': '🇶🇦',
    'République Centrafricaine': '🇨🇫', 'République Dominicaine': '🇩🇴', 'République Tchèque': '🇨🇿', 'Roumanie': '🇷🇴',
    'Royaume-Uni': '🇬🇧', 'Russie': '🇷🇺', 'Rwanda': '🇷🇼', 'Saint-Marin': '🇸🇲',
    'Salvador': '🇸🇻', 'Samoa': '🇼🇸', 'Sénégal': '🇸🇳', 'Serbie': '🇷🇸',
    'Seychelles': '🇸🇨', 'Sierra Leone': '🇸🇱', 'Singapour': '🇸🇬', 'Slovaquie': '🇸🇰',
    'Slovénie': '🇸🇮', 'Somalie': '🇸🇴', 'Soudan': '🇸🇩', 'Sri Lanka': '🇱🇰',
    'Suède': '🇸🇪', 'Suisse': '🇨🇭', 'Suriname': '🇸🇷', 'Syrie': '🇸🇾',
    'Tadjikistan': '🇹🇯', 'Tanzanie': '🇹🇿', 'Tchad': '🇹🇩', 'Thaïlande': '🇹🇭',
    'Timor-Leste': '🇹🇱', 'Togo': '🇹🇬', 'Tonga': '🇹🇴', 'Trinité-et-Tobago': '🇹🇹',
    'Tunisie': '🇹🇳', 'Turquie': '🇹🇷', 'Turkménistan': '🇹🇲', 'Tuvalu': '🇹🇻',
    'Ukraine': '🇺🇦', 'Uruguay': '🇺🇾', 'Vanuatu': '🇻🇺', 'Vatican': '🇻🇦',
    'Venezuela': '🇻🇪', 'Vietnam': '🇻🇳', 'Yémen': '🇾🇪', 'Zambie': '🇿🇲',
    'Zimbabwe': '🇿🇼'
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    updateQuickStats();
    // Wire up buttons to avoid inline handlers (CSP safe)
    const saveBtn = document.getElementById('saveBtn');
    const addTeamBtn = document.getElementById('addTeamBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveAllData, { passive: true });
    if (addTeamBtn) addTeamBtn.addEventListener('click', addNewTeam, { passive: true });

    // Modal buttons
    const addTeamCloseBtn = document.getElementById('addTeamCloseBtn');
    const addTeamCancelBtn = document.getElementById('addTeamCancelBtn');
    const addTeamConfirmBtn = document.getElementById('addTeamConfirmBtn');
    if (addTeamCloseBtn) addTeamCloseBtn.addEventListener('click', () => closeModal('addTeamModal'), { passive: true });
    if (addTeamCancelBtn) addTeamCancelBtn.addEventListener('click', () => closeModal('addTeamModal'), { passive: true });
    if (addTeamConfirmBtn) addTeamConfirmBtn.addEventListener('click', confirmAddTeam, { passive: true });

    const addRiderCloseBtn = document.getElementById('addRiderCloseBtn');
    const addRiderCancelBtn = document.getElementById('addRiderCancelBtn');
    const addRiderConfirmBtn = document.getElementById('addRiderConfirmBtn');
    if (addRiderCloseBtn) addRiderCloseBtn.addEventListener('click', () => closeModal('addRiderModal'), { passive: true });
    if (addRiderCancelBtn) addRiderCancelBtn.addEventListener('click', () => closeModal('addRiderModal'), { passive: true });
    if (addRiderConfirmBtn) addRiderConfirmBtn.addEventListener('click', confirmAddRider, { passive: true });

    const jerseyCloseBtn = document.getElementById('jerseyCloseBtn');
    const jerseyCancelBtn = document.getElementById('jerseyCancelBtn');
    const jerseyRemoveBtn = document.getElementById('jerseyRemoveBtn');
    const jerseyConfirmBtn = document.getElementById('jerseyConfirmBtn');
    const jerseyFile = document.getElementById('jerseyFile');
    if (jerseyCloseBtn) jerseyCloseBtn.addEventListener('click', () => closeModal('jerseyModal'), { passive: true });
    if (jerseyCancelBtn) jerseyCancelBtn.addEventListener('click', () => closeModal('jerseyModal'), { passive: true });
    if (jerseyRemoveBtn) jerseyRemoveBtn.addEventListener('click', removeJersey, { passive: true });
    if (jerseyConfirmBtn) jerseyConfirmBtn.addEventListener('click', confirmJerseyChange, { passive: true });
    if (jerseyFile) jerseyFile.addEventListener('change', previewJerseyFile);

    const flagCloseBtn = document.getElementById('flagCloseBtn');
    const flagCancelBtn = document.getElementById('flagCancelBtn');
    const flagRemoveBtn = document.getElementById('flagRemoveBtn');
    const flagSearch = document.getElementById('flagSearch');
    if (flagCloseBtn) flagCloseBtn.addEventListener('click', () => closeModal('flagModal'), { passive: true });
    if (flagCancelBtn) flagCancelBtn.addEventListener('click', () => closeModal('flagModal'), { passive: true });
    if (flagRemoveBtn) flagRemoveBtn.addEventListener('click', removeFlag, { passive: true });
    if (flagSearch) flagSearch.addEventListener('keyup', filterFlags);
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Prévenir la fermeture accidentelle si des changements non sauvegardés
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter?';
        }
    });
}

// Chargement des données
async function loadData() {
    try {
        // Essayer de charger depuis le serveur avec un timeout court
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch('/api/teams', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
            teamsData = await response.json();
            console.log('Données chargées depuis le serveur');
        } else {
            // Charger depuis le localStorage ou les données par défaut
            loadFromLocalStorage();
        }
    } catch (error) {
        console.log('Chargement depuis localStorage...', error.message);
        loadFromLocalStorage();
    }
    
    renderTeamsList();
    updateQuickStats();
}

// Chargement depuis localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('gpcm_teams_data');
    if (saved) {
        teamsData = JSON.parse(saved);
    } else {
        // Charger les données par défaut depuis riders.js
        loadDefaultData();
    }
}

// Charger les données par défaut
async function loadDefaultData() {
    try {
        // Essayer de charger riders.json avec un timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        
        const response = await fetch('../riders.json', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            // Transformer le format du fichier riders.json
            teamsData = transformRidersData(data);
        } else {
            // Utiliser des données de base
            teamsData = getDefaultTeams();
        }
    } catch (error) {
        console.log('Utilisation des données par défaut intégrées');
        teamsData = getDefaultTeams();
    }
}

// Données par défaut intégrées
function getDefaultTeams() {
    return [
        {
            id: 1,
            name: "UAE Team Emirates",
            displayName: "UAE TEAM EMIRATES XRG",
            country: "🇦🇪",
            jerseyPath: "",
            riders: [
                { number: 11, name: "Tadej POGACAR", country: "🇸🇮" },
                { number: 12, name: "Brandon MCNULTY", country: "🇺🇸" },
                { number: 13, name: "Jhonatan NARVAEZ", country: "🇪🇨" },
                { number: 14, name: "Nils POLITT", country: "🇩🇪" },
                { number: 15, name: "Pavel SIVAKOV", country: "🇫🇷" },
                { number: 16, name: "Tim WELLENS", country: "🇧🇪" },
                { number: 17, name: "Adam YATES", country: "🇬🇧" }
            ]
        },
        {
            id: 2,
            name: "Team Visma | Lease a Bike",
            displayName: "TEAM VISMA | LEASE A BIKE",
            country: "🇳🇱",
            jerseyPath: "",
            riders: [
                { number: 21, name: "Wout VAN AERT", country: "🇧🇪" },
                { number: 22, name: "Tiesj BENOOT", country: "🇧🇪" },
                { number: 23, name: "Christophe LAPORTE", country: "🇫🇷" },
                { number: 24, name: "Jorgen NORDHAGEN", country: "🇳🇴" },
                { number: 25, name: "Attila VALTER", country: "🇭🇺" },
                { number: 26, name: "Simon YATES", country: "🇬🇧" },
                { number: 27, name: "Steven KRUIJSWIJK", country: "🇳🇱" }
            ]
        },
        {
            id: 3,
            name: "Équipe Canada",
            displayName: "ÉQUIPE NATIONALE CANADA",
            country: "🇨🇦",
            jerseyPath: "",
            riders: [
                { number: 221, name: "Philippe JACOB", country: "🇨🇦" },
                { number: 222, name: "Jérôme GAUTHIER", country: "🇨🇦" },
                { number: 223, name: "Carson MATTERN", country: "🇨🇦" },
                { number: 224, name: "Samuel COUTURE", country: "🇨🇦" },
                { number: 225, name: "Quentin COWAN", country: "🇨🇦" },
                { number: 226, name: "Félix BOUCHARD", country: "🇨🇦" },
                { number: 227, name: "Félix HAMEL", country: "🇨🇦" }
            ]
        }
    ];
}

// Transformer les données du format riders.json
function transformRidersData(data) {
    if (!data.teams) return [];
    
    // Nettoyer et restructurer les données
    const cleanTeams = [];
    const seenTeams = new Set();
    
    data.teams.forEach(team => {
        // Nettoyer les coureurs pour cette équipe
        const cleanRiders = [];
        const teamName = team.name || team.displayName || '';
        
        // Éviter les doublons d'équipes
        if (seenTeams.has(teamName)) return;
        seenTeams.add(teamName);
        
        if (team.riders && Array.isArray(team.riders)) {
            team.riders.forEach(rider => {
                // Filtrer les entrées invalides
                if (rider.name && !rider.name.includes('TEAM') && rider.name.trim() !== '') {
                    cleanRiders.push({
                        number: rider.number || '',
                        name: rider.name,
                        country: convertCountryCodeToFlag(rider.country) || ''
                    });
                }
            });
        }
        
        // Limiter à 7 coureurs maximum par équipe
        const limitedRiders = cleanRiders.slice(0, 7);
        
        cleanTeams.push({
            id: team.id || Date.now() + Math.random(),
            name: teamName,
            displayName: team.displayName || teamName,
            country: convertCountryCodeToFlag(team.country) || '',
            riders: limitedRiders,
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

// Afficher la liste des équipes
function renderTeamsList() {
    const teamsList = document.getElementById('teamsList');
    
    if (teamsData.length === 0) {
        teamsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>Aucune équipe</p>
                <button class="btn btn-primary btn-sm" onclick="addNewTeam()">
                    Ajouter une équipe
                </button>
            </div>
        `;
        return;
    }
    
    const safePath = (p) => (p && p.startsWith('/') ? p : (p ? '/' + p : ''));
    teamsList.innerHTML = teamsData.map(team => `
        <div class="team-item ${team.id === currentTeamId ? 'active' : ''}" 
             data-team-id="${team.id}">
            <div class="team-jersey">
                ${team.jerseyPath ? 
                    `<img src="${safePath(team.jerseyPath)}" alt="Maillot" style="width: 40px; height: 40px; object-fit: contain;">` : 
                    '👕'
                }
            </div>
            <div class="team-info">
                <div class="team-name">${team.displayName || team.name}</div>
                <div class="team-stats">${team.riders ? team.riders.length : 0} coureurs</div>
            </div>
        </div>
    `).join('');

    // Bind clicks (CSP safe)
    teamsList.querySelectorAll('.team-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.getAttribute('data-team-id'), 10);
            if (!Number.isNaN(id)) selectTeam(id);
        }, { passive: true });
    });
}

// Sélectionner une équipe
function selectTeam(teamId) {
    currentTeamId = teamId;
    const team = teamsData.find(t => t.id === teamId);
    
    if (!team) return;
    
    renderTeamsList();
    renderTeamEditor(team);
    
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('teamEditor').style.display = 'block';
}

// Afficher l'éditeur d'équipe
function renderTeamEditor(team) {
    const editor = document.getElementById('teamEditor');
    const safePath = (p) => (p && p.startsWith('/') ? p : (p ? '/' + p : ''));
    
    editor.innerHTML = `
        <div class="editor-header">
            <div class="editor-title">
                <span class="team-jersey-large">
                    ${team.jerseyPath ? 
                        `<img src="${safePath(team.jerseyPath)}" alt="Maillot" style="width: 60px; height: 60px; object-fit: contain;">` : 
                        '👕'
                    }
                </span>
                <h2>${team.displayName || team.name}</h2>
            </div>
            <div class="editor-actions">
                <button class="btn btn-danger btn-sm" id="deleteTeamBtn">
                    🗑️ Supprimer l'équipe
                </button>
            </div>
        </div>
        
        <div class="form-section">
            <h3>📝 Informations de l'équipe</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Nom de l'équipe</label>
                    <input type="text" value="${team.name}" id="teamNameInput">
                </div>
                <div class="form-group">
                    <label>Nom d'affichage</label>
                    <input type="text" value="${team.displayName || ''}" id="teamDisplayInput">
                </div>
                <div class="form-group">
                    <label>Maillot de l'équipe</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="text" value="${team.jerseyPath || ''}" 
                               placeholder="Ex: listeengages-package/listeengages/images/jerseys/team.png"
                               id="teamJerseyInput" style="flex: 1;">
                        <button class="btn btn-secondary btn-sm" id="previewJerseyBtn">
                            👁️ Aperçu
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section riders-section">
            <div class="riders-header">
                <h3>🚴 Coureurs (${team.riders ? team.riders.length : 0}/7)</h3>
                <button class="btn btn-primary btn-sm" id="addRiderBtn"
                        ${team.riders && team.riders.length >= 7 ? 'disabled' : ''}>
                    ➕ Ajouter un coureur
                </button>
            </div>
            <div class="riders-grid">
                ${team.riders && team.riders.length > 0 ? 
                    team.riders.map((rider, index) => `
                        <div class="rider-card">
                            <div class="rider-number">
                                <input type="number" value="${rider.number || ''}" 
                                       style="background: none; border: none; color: white; width: 100%; text-align: center;"
                                       data-action="riderNumber" data-index="${index}">
                            </div>
                            <div class="rider-info">
                                <input type="text" class="rider-name-input" value="${rider.name}" data-action="riderName" data-index="${index}">
                                <div class="rider-flag" data-action="riderFlag" data-index="${index}" title="Cliquer pour changer le drapeau">
                                    ${rider.country || '🏳️'}
                                </div>
                            </div>
                            <div class="rider-actions">
                                <button class="btn btn-danger btn-icon btn-sm" data-action="deleteRider" data-index="${index}" title="Supprimer le coureur">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    `).join('') :
                    '<div class="empty-state"><p>Aucun coureur dans cette équipe</p></div>'
                }
            </div>
        </div>
    `;

    // Bind editor events (CSP safe)
    const nameInput = editor.querySelector('#teamNameInput');
    const displayInput = editor.querySelector('#teamDisplayInput');
    const jerseyInput = editor.querySelector('#teamJerseyInput');
    const delBtn = editor.querySelector('#deleteTeamBtn');
    const prevBtn = editor.querySelector('#previewJerseyBtn');
    // Upload désactivé - const uploadBtn = editor.querySelector('#uploadJerseyBtn');
    const addRiderBtn = editor.querySelector('#addRiderBtn');
    if (nameInput) nameInput.addEventListener('change', e => updateTeamField(team.id, 'name', e.target.value));
    if (displayInput) displayInput.addEventListener('change', e => updateTeamField(team.id, 'displayName', e.target.value));
    if (jerseyInput) jerseyInput.addEventListener('change', e => updateTeamField(team.id, 'jerseyPath', e.target.value));
    if (delBtn) delBtn.addEventListener('click', () => deleteTeam(team.id), { passive: true });
    if (prevBtn) prevBtn.addEventListener('click', () => previewJersey(team.id), { passive: true });
    // Upload désactivé - if (uploadBtn) uploadBtn.addEventListener('click', () => uploadJersey(team.id), { passive: true });
    if (addRiderBtn) addRiderBtn.addEventListener('click', () => openAddRiderModal(team.id), { passive: true });

    editor.querySelectorAll('[data-action="riderNumber"]').forEach(inp => {
        const idx = parseInt(inp.getAttribute('data-index'), 10);
        inp.addEventListener('change', e => updateRiderField(team.id, idx, 'number', e.target.value));
    });
    editor.querySelectorAll('[data-action="riderName"]').forEach(inp => {
        const idx = parseInt(inp.getAttribute('data-index'), 10);
        inp.addEventListener('change', e => updateRiderField(team.id, idx, 'name', e.target.value));
    });
    editor.querySelectorAll('[data-action="riderFlag"]').forEach(btn => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        btn.addEventListener('click', () => openFlagPicker('rider', team.id, idx), { passive: true });
    });
    editor.querySelectorAll('[data-action="deleteRider"]').forEach(btn => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        btn.addEventListener('click', () => deleteRider(team.id, idx), { passive: true });
    });
}

// Mettre à jour un champ de l'équipe
function updateTeamField(teamId, field, value) {
    const team = teamsData.find(t => t.id === teamId);
    if (team) {
        team[field] = value;
        markAsUnsaved();
        renderTeamsList();
        if (field === 'name' || field === 'displayName' || field === 'jerseyPath') {
            renderTeamEditor(team);
        }
    }
}

// Aperçu du maillot
function previewJersey(teamId) {
    const team = teamsData.find(t => t.id === teamId);
    if (!team || !team.jerseyPath) {
        showToast('Aucun chemin de maillot défini', 'error');
        return;
    }
    
    // Ouvrir une nouvelle fenêtre avec l'image
    const path = team.jerseyPath.startsWith('/') ? team.jerseyPath : '/' + team.jerseyPath;
    window.open(path, '_blank', 'width=500,height=500');
}

// Upload du maillot DÉSACTIVÉ - Les maillots viennent du dossier officiel
/*
async function uploadJersey(teamId) {
    alert("L'upload de maillots est désactivé. Les maillots proviennent uniquement du dossier officiel.");
    return;
    // Code original commenté
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('jersey', file);
        formData.append('teamId', teamId);
        
        try {
            const response = await fetch('/api/upload-jersey', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                updateTeamField(teamId, 'jerseyPath', result.path);
                showToast('Maillot téléchargé avec succès', 'success');
            } else {
                showToast('Erreur lors du téléchargement', 'error');
            }
        } catch (error) {
            console.error('Erreur upload:', error);
            showToast('Erreur de connexion au serveur', 'error');
        }
    };
    
    input.click();
}
*/

// Mettre à jour un champ d'un coureur
function updateRiderField(teamId, riderIndex, field, value) {
    const team = teamsData.find(t => t.id === teamId);
    if (team && team.riders && team.riders[riderIndex]) {
        if (field === 'number') {
            team.riders[riderIndex][field] = parseInt(value) || '';
        } else {
            team.riders[riderIndex][field] = value;
        }
        markAsUnsaved();
    }
}

// Ajouter une nouvelle équipe
function addNewTeam() {
    document.getElementById('addTeamModal').style.display = 'flex';
}

// Confirmer l'ajout d'une équipe
function confirmAddTeam() {
    const name = document.getElementById('newTeamName').value.trim();
    const displayName = document.getElementById('newTeamDisplayName').value.trim();
    const country = document.getElementById('newTeamCountry').value.trim();
    
    if (!name) {
        showToast('Le nom de l\'équipe est obligatoire', 'error');
        return;
    }
    
    const newTeam = {
        id: Date.now(),
        name: name,
        displayName: displayName || name,
        country: country,
        riders: [],
        jerseyPath: ''
    };
    
    teamsData.push(newTeam);
    markAsUnsaved();
    renderTeamsList();
    selectTeam(newTeam.id);
    closeModal('addTeamModal');
    showToast('Équipe ajoutée avec succès', 'success');
}

// Supprimer une équipe
function deleteTeam(teamId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette équipe et tous ses coureurs?')) {
        return;
    }
    
    teamsData = teamsData.filter(t => t.id !== teamId);
    markAsUnsaved();
    renderTeamsList();
    document.getElementById('teamEditor').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
    updateQuickStats();
    showToast('Équipe supprimée', 'success');
}

// Ouvrir le modal d'ajout de coureur
function openAddRiderModal(teamId) {
    currentTeamId = teamId;
    document.getElementById('addRiderModal').style.display = 'flex';
}

// Confirmer l'ajout d'un coureur
function confirmAddRider() {
    const team = teamsData.find(t => t.id === currentTeamId);
    if (!team) return;
    
    const number = document.getElementById('newRiderNumber').value;
    const name = document.getElementById('newRiderName').value.trim();
    const country = document.getElementById('newRiderCountry').value.trim();
    
    if (!name) {
        showToast('Le nom du coureur est obligatoire', 'error');
        return;
    }
    
    if (!team.riders) team.riders = [];
    
    if (team.riders.length >= 7) {
        showToast('Maximum 7 coureurs par équipe', 'error');
        return;
    }
    
    team.riders.push({
        number: parseInt(number) || '',
        name: name,
        country: country
    });
    
    markAsUnsaved();
    renderTeamEditor(team);
    closeModal('addRiderModal');
    showToast('Coureur ajouté avec succès', 'success');
}

// Supprimer un coureur
function deleteRider(teamId, riderIndex) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce coureur?')) {
        return;
    }
    
    const team = teamsData.find(t => t.id === teamId);
    if (team && team.riders) {
        team.riders.splice(riderIndex, 1);
        markAsUnsaved();
        renderTeamEditor(team);
        showToast('Coureur supprimé', 'success');
    }
}

// Ouvrir le sélecteur de drapeau
function openFlagPicker(type, teamId, riderIndex = null) {
    currentFlagTarget = { type, teamId, riderIndex };
    
    const modal = document.getElementById('flagModal');
    const grid = document.getElementById('flagsGrid');
    
    // Générer la grille de drapeaux (sans inline handlers)
    grid.innerHTML = Object.entries(countryFlags).map(([country, flag]) => `
        <div class="flag-option" data-flag="${flag}" data-country="${country}" title="${country}" role="button" tabindex="0">
            ${flag}
        </div>
    `).join('');
    
    // Délégation d'événements pour sélectionner un drapeau
    if (!grid.dataset.bound) {
        grid.addEventListener('click', (e) => {
            const el = e.target.closest('.flag-option');
            if (!el) return;
            const flag = el.getAttribute('data-flag');
            if (flag) selectFlag(flag);
        });
        grid.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const el = e.target.closest('.flag-option');
            if (!el) return;
            e.preventDefault();
            const flag = el.getAttribute('data-flag');
            if (flag) selectFlag(flag);
        });
        grid.dataset.bound = 'true';
    }
    
    modal.style.display = 'flex';
}

// Sélectionner un drapeau
function selectFlag(flag) {
    if (!currentFlagTarget) return;
    
    const { type, teamId, riderIndex } = currentFlagTarget;
    
    if (type === 'team') {
        // Ignorer les drapeaux d'équipe (désactivé par demande produit)
        closeModal('flagModal');
        showToast('Le drapeau d’équipe n’est plus utilisé. Utilisez le maillot.', 'info');
        return;
    } else if (type === 'rider') {
        const team = teamsData.find(t => t.id === teamId);
        if (team && team.riders && team.riders[riderIndex] !== undefined) {
            team.riders[riderIndex].country = flag;
            markAsUnsaved();
            renderTeamEditor(team);
        }
    }
    
    closeModal('flagModal');
    showToast('Drapeau mis à jour', 'success');
}

// Supprimer un drapeau
function removeFlag() {
    if (!currentFlagTarget) return;
    
    const { type, teamId, riderIndex } = currentFlagTarget;
    
    if (type === 'team') {
        // Ignorer côté équipe
        closeModal('flagModal');
        showToast('Le drapeau d’équipe n’est plus utilisé.', 'info');
        return;
    } else if (type === 'rider') {
        const team = teamsData.find(t => t.id === teamId);
        if (team && team.riders && team.riders[riderIndex] !== undefined) {
            team.riders[riderIndex].country = '';
            markAsUnsaved();
            renderTeamEditor(team);
        }
    }
    
    closeModal('flagModal');
    showToast('Drapeau supprimé', 'success');
}

// Filtrer les drapeaux
function filterFlags() {
    const search = document.getElementById('flagSearch').value.toLowerCase();
    const grid = document.getElementById('flagsGrid');
    if (!grid) return;
    grid.querySelectorAll('.flag-option').forEach(el => {
        const country = (el.getAttribute('data-country') || '').toLowerCase();
        el.style.display = country.includes(search) ? '' : 'none';
    });
}

// Ouvrir le modal de maillot
function openJerseyModal(teamId) {
    currentTeamId = teamId;
    const team = teamsData.find(t => t.id === teamId);
    if (!team) return;
    
    const modal = document.getElementById('jerseyModal');
    const currentJersey = document.getElementById('currentJersey');
    
    if (team.jerseyPath) {
        currentJersey.src = team.jerseyPath;
        currentJersey.style.display = 'block';
    } else {
        currentJersey.style.display = 'none';
    }
    
    modal.style.display = 'flex';
}

// Aperçu du maillot
function previewJerseyFile(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('jerseyPreview').style.display = 'block';
            document.getElementById('newJerseyPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Confirmer le changement de maillot
async function confirmJerseyChange() {
    const team = teamsData.find(t => t.id === currentTeamId);
    if (!team) return;
    
    const fileInput = document.getElementById('jerseyFile');
    const urlInput = document.getElementById('jerseyUrl').value.trim();
    
    if (fileInput.files.length > 0) {
        // Uploader le fichier au serveur pour obtenir un chemin stable
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('jersey', file);
        formData.append('teamId', String(currentTeamId));
        try {
            const resp = await fetch('/api/upload-jersey', { method: 'POST', body: formData });
            if (resp.ok) {
                const result = await resp.json();
                if (result && result.path) {
                    team.jerseyPath = result.path;
                    markAsUnsaved();
                    renderTeamEditor(team);
                    closeModal('jerseyModal');
                    showToast('Maillot uploadé', 'success');
                } else {
                    showToast('Upload échoué', 'error');
                }
            } else {
                showToast('Upload échoué', 'error');
            }
        } catch(_) {
            showToast('Upload échoué', 'error');
        }
    } else if (urlInput) {
        // Utiliser l'URL fournie
        team.jerseyPath = urlInput;
        markAsUnsaved();
        renderTeamEditor(team);
        closeModal('jerseyModal');
        showToast('Maillot mis à jour', 'success');
    } else {
        showToast('Veuillez sélectionner un fichier ou entrer une URL', 'error');
    }
}

// Supprimer le maillot
function removeJersey() {
    const team = teamsData.find(t => t.id === currentTeamId);
    if (team) {
        team.jerseyPath = '';
        markAsUnsaved();
        renderTeamEditor(team);
        closeModal('jerseyModal');
        showToast('Maillot supprimé', 'success');
    }
}

// Sauvegarder toutes les données
async function saveAllData() {
    // Toujours sauvegarder dans localStorage d'abord
    localStorage.setItem('gpcm_teams_data', JSON.stringify(teamsData));
    hasUnsavedChanges = false;
    
    try {
        // Essayer de sauvegarder sur le serveur avec un timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamsData),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
            showToast('Données sauvegardées sur le serveur', 'success');
            // Aussi sauvegarder dans riders.json pour l'application principale
            saveToRidersJson();
        } else {
            showToast('Données sauvegardées localement (serveur indisponible)', 'warning');
        }
    } catch (error) {
        console.log('Sauvegarde locale uniquement:', error.message);
        showToast('Données sauvegardées localement', 'info');
    }
}

// Sauvegarder dans riders.json
async function saveToRidersJson() {
    const ridersData = {
        teams: teamsData.map(team => ({
            id: team.id,
            name: team.name,
            displayName: team.displayName,
            // country retiré à la demande produit
            riders: team.riders || [],
            jerseyPath: team.jerseyPath
        }))
    };
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch('/api/riders-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ridersData),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
            console.log('riders.json mis à jour');
        }
    } catch (error) {
        console.log('Mise à jour de riders.json ignorée (mode hors ligne)');
    }
}

// Exporter les données
// exportData retiré

// Importer les données
// importData retiré

// Mettre à jour les statistiques rapides
function updateQuickStats() {
    const totalTeams = teamsData.length;
    const totalRiders = teamsData.reduce((sum, team) => sum + (team.riders ? team.riders.length : 0), 0);
    
    const statsHtml = `
        <div class="stat-card">
            <div class="stat-value">${totalTeams}</div>
            <div class="stat-label">Équipes</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${totalRiders}</div>
            <div class="stat-label">Coureurs</div>
        </div>
    `;
    
    const quickStats = document.getElementById('quickStats');
    if (quickStats) {
        quickStats.innerHTML = statsHtml;
    }
}

// Marquer comme non sauvegardé
function markAsUnsaved() {
    hasUnsavedChanges = true;
}

// Fermer un modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    
    // Réinitialiser les champs
    if (modalId === 'addTeamModal') {
        document.getElementById('newTeamName').value = '';
        document.getElementById('newTeamDisplayName').value = '';
        document.getElementById('newTeamCountry').value = '';
    } else if (modalId === 'addRiderModal') {
        document.getElementById('newRiderNumber').value = '';
        document.getElementById('newRiderName').value = '';
        document.getElementById('newRiderCountry').value = '';
    } else if (modalId === 'jerseyModal') {
        document.getElementById('jerseyFile').value = '';
        document.getElementById('jerseyUrl').value = '';
        document.getElementById('jerseyPreview').style.display = 'none';
    }
}

// Afficher une notification toast
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <span class="toast-close" onclick="this.parentElement.remove()">×</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}
