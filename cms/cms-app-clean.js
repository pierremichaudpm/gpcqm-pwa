// GPCM CMS - Application JavaScript (Version simplifiée sans maillots)

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
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Boutons principaux
    const saveBtn = document.getElementById('saveBtn');
    const addTeamBtn = document.getElementById('addTeamBtn');
    if (saveBtn) saveBtn.addEventListener('click', saveAllData);
    if (addTeamBtn) addTeamBtn.addEventListener('click', showAddTeamModal);

    // Modal d'équipe
    const addTeamCloseBtn = document.getElementById('addTeamCloseBtn');
    const addTeamCancelBtn = document.getElementById('addTeamCancelBtn');
    const addTeamConfirmBtn = document.getElementById('addTeamConfirmBtn');
    if (addTeamCloseBtn) addTeamCloseBtn.addEventListener('click', () => closeModal('addTeamModal'));
    if (addTeamCancelBtn) addTeamCancelBtn.addEventListener('click', () => closeModal('addTeamModal'));
    if (addTeamConfirmBtn) addTeamConfirmBtn.addEventListener('click', confirmAddTeam);

    // Modal de coureur
    const addRiderCloseBtn = document.getElementById('addRiderCloseBtn');
    const addRiderCancelBtn = document.getElementById('addRiderCancelBtn');
    const addRiderConfirmBtn = document.getElementById('addRiderConfirmBtn');
    if (addRiderCloseBtn) addRiderCloseBtn.addEventListener('click', () => closeModal('addRiderModal'));
    if (addRiderCancelBtn) addRiderCancelBtn.addEventListener('click', () => closeModal('addRiderModal'));
    if (addRiderConfirmBtn) addRiderConfirmBtn.addEventListener('click', confirmAddRider);

    // Modal de drapeau
    const flagCloseBtn = document.getElementById('flagCloseBtn');
    const flagCancelBtn = document.getElementById('flagCancelBtn');
    const flagRemoveBtn = document.getElementById('flagRemoveBtn');
    const flagSearch = document.getElementById('flagSearch');
    if (flagCloseBtn) flagCloseBtn.addEventListener('click', () => closeModal('flagModal'));
    if (flagCancelBtn) flagCancelBtn.addEventListener('click', () => closeModal('flagModal'));
    if (flagRemoveBtn) flagRemoveBtn.addEventListener('click', removeFlag);
    if (flagSearch) flagSearch.addEventListener('keyup', filterFlags);

    // Prévenir la fermeture accidentelle
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
        const response = await fetch('/api/teams');
        if (response.ok) {
            teamsData = await response.json();
        } else {
            loadFromLocalStorage();
        }
    } catch (error) {
        console.log('Chargement depuis localStorage...');
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
        teamsData = getDefaultTeams();
    }
}

// Données par défaut
function getDefaultTeams() {
    return [
        {
            id: 1,
            name: "UAE Team Emirates",
            displayName: "UAE TEAM EMIRATES XRG",
            riders: [
                { number: 11, name: "Tadej POGACAR", country: "🇸🇮" },
                { number: 12, name: "Brandon MCNULTY", country: "🇺🇸" }
            ]
        }
    ];
}

// Afficher la liste des équipes
function renderTeamsList() {
    const teamsList = document.getElementById('teamsList');
    
    if (teamsData.length === 0) {
        teamsList.innerHTML = `
            <div class="empty-state">
                <p>Aucune équipe</p>
            </div>
        `;
        return;
    }
    
    teamsList.innerHTML = teamsData.map(team => `
        <div class="team-item ${team.id === currentTeamId ? 'active' : ''}" 
             data-team-id="${team.id}">
            <div class="team-info">
                <div class="team-name">${team.displayName || team.name}</div>
                <div class="team-stats">${team.riders ? team.riders.length : 0} coureurs</div>
            </div>
        </div>
    `).join('');

    // Ajouter les écouteurs de clic
    teamsList.querySelectorAll('.team-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.getAttribute('data-team-id'));
            if (!isNaN(id)) selectTeam(id);
        });
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
    
    editor.innerHTML = `
        <div class="editor-header">
            <div class="editor-title">
                <h2>${team.displayName || team.name}</h2>
            </div>
            <div class="editor-actions">
                <button class="btn btn-danger btn-sm" data-action="deleteTeam">
                    🗑️ Supprimer l'équipe
                </button>
            </div>
        </div>
        
        <div class="form-section">
            <h3>📝 Informations de l'équipe</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Nom de l'équipe</label>
                    <input type="text" value="${team.name}" data-field="name">
                </div>
                <div class="form-group">
                    <label>Nom d'affichage</label>
                    <input type="text" value="${team.displayName || ''}" data-field="displayName">
                </div>
            </div>
        </div>
        
        <div class="form-section riders-section">
            <div class="riders-header">
                <h3>🚴 Coureurs (${team.riders ? team.riders.length : 0}/7)</h3>
                <button class="btn btn-primary btn-sm" data-action="addRider"
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
                                       data-rider-field="number" data-index="${index}">
                            </div>
                            <div class="rider-info">
                                <input type="text" class="rider-name-input" value="${rider.name}" 
                                       data-rider-field="name" data-index="${index}">
                                <div class="rider-flag" data-action="riderFlag" data-index="${index}" 
                                     title="Cliquer pour changer le drapeau">
                                    ${rider.country || '🏳️'}
                                </div>
                            </div>
                            <div class="rider-actions">
                                <button class="btn btn-danger btn-icon btn-sm" 
                                        data-action="deleteRider" data-index="${index}" 
                                        title="Supprimer le coureur">
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

    // Ajouter les écouteurs d'événements
    attachEditorEvents(editor, team);
}

// Attacher les événements de l'éditeur
function attachEditorEvents(editor, team) {
    // Champs de l'équipe
    editor.querySelectorAll('[data-field]').forEach(input => {
        input.addEventListener('change', (e) => {
            const field = e.target.getAttribute('data-field');
            updateTeamField(team.id, field, e.target.value);
        });
    });

    // Actions
    editor.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]').getAttribute('data-action');
            const index = e.target.closest('[data-index]')?.getAttribute('data-index');
            
            switch(action) {
                case 'deleteTeam':
                    deleteTeam(team.id);
                    break;
                case 'addRider':
                    openAddRiderModal(team.id);
                    break;
                case 'deleteRider':
                    deleteRider(team.id, parseInt(index));
                    break;
                case 'riderFlag':
                    openFlagPicker('rider', team.id, parseInt(index));
                    break;
            }
        });
    });

    // Champs des coureurs
    editor.querySelectorAll('[data-rider-field]').forEach(input => {
        input.addEventListener('change', (e) => {
            const field = e.target.getAttribute('data-rider-field');
            const index = parseInt(e.target.getAttribute('data-index'));
            updateRiderField(team.id, index, field, e.target.value);
        });
    });
}

// Mettre à jour un champ de l'équipe
function updateTeamField(teamId, field, value) {
    const team = teamsData.find(t => t.id === teamId);
    if (team) {
        team[field] = value;
        markAsUnsaved();
        renderTeamsList();
        if (field === 'name' || field === 'displayName') {
            renderTeamEditor(team);
        }
    }
}

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

// Afficher le modal d'ajout d'équipe
function showAddTeamModal() {
    document.getElementById('addTeamModal').style.display = 'flex';
    document.getElementById('newTeamName').value = '';
    document.getElementById('newTeamDisplayName').value = '';
    document.getElementById('newTeamCountry').value = '';
}

// Confirmer l'ajout d'une équipe
function confirmAddTeam() {
    const name = document.getElementById('newTeamName').value.trim();
    const displayName = document.getElementById('newTeamDisplayName').value.trim();
    
    if (!name) {
        showToast('Le nom de l\'équipe est obligatoire', 'error');
        return;
    }
    
    const newTeam = {
        id: Date.now(),
        name: name,
        displayName: displayName || name,
        riders: []
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
    document.getElementById('newRiderNumber').value = '';
    document.getElementById('newRiderName').value = '';
    document.getElementById('newRiderCountry').value = '';
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
    
    // Générer la grille de drapeaux
    grid.innerHTML = Object.entries(countryFlags).map(([country, flag]) => `
        <div class="flag-option" data-flag="${flag}" data-country="${country}" 
             title="${country}" role="button" tabindex="0">
            ${flag}
        </div>
    `).join('');
    
    // Ajouter les écouteurs si pas déjà fait
    if (!grid.dataset.bound) {
        grid.addEventListener('click', (e) => {
            const el = e.target.closest('.flag-option');
            if (!el) return;
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
    
    if (type === 'rider') {
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
    
    if (type === 'rider') {
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

// Sauvegarder toutes les données
async function saveAllData() {
    // Sauvegarder dans localStorage
    localStorage.setItem('gpcm_teams_data', JSON.stringify(teamsData));
    hasUnsavedChanges = false;
    
    try {
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamsData)
        });
        
        if (response.ok) {
            showToast('Données sauvegardées avec succès', 'success');
        } else {
            showToast('Données sauvegardées localement', 'warning');
        }
    } catch (error) {
        console.log('Sauvegarde locale uniquement');
        showToast('Données sauvegardées localement', 'info');
    }
}

// Mettre à jour les statistiques
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
        <button class="toast-close" data-close-toast>×</button>
    `;
    
    container.appendChild(toast);
    
    // Ajouter l'écouteur pour fermer
    toast.querySelector('[data-close-toast]').addEventListener('click', () => {
        toast.remove();
    });
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}
