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
    'Tunisie': '🇹🇳', 'Turkménistan': '🇹🇲', 'Turquie': '🇹🇷', 'Tuvalu': '🇹🇻',
    'Ukraine': '🇺🇦', 'Uruguay': '🇺🇾', 'Vanuatu': '🇻🇺', 'Vatican': '🇻🇦',
    'Venezuela': '🇻🇪', 'Vietnam': '🇻🇳', 'Yémen': '🇾🇪', 'Zambie': '🇿🇲',
    'Zimbabwe': '🇿🇼'
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaires d'événements
    const addTeamBtn = document.getElementById('addTeamBtn');
    const saveBtn = document.getElementById('saveBtn');
    const revertBtn = document.getElementById('revertBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (addTeamBtn) addTeamBtn.addEventListener('click', addNewTeam, { passive: true });
    if (saveBtn) saveBtn.addEventListener('click', saveChanges, { passive: true });
    if (revertBtn) revertBtn.addEventListener('click', revertChanges, { passive: true });
    if (searchInput) searchInput.addEventListener('input', filterTeams, { passive: true });
    
    // Modal de coureur
    const riderCloseBtn = document.getElementById('riderCloseBtn');
    const riderCancelBtn = document.getElementById('riderCancelBtn');
    const riderSaveBtn = document.getElementById('riderSaveBtn');
    if (riderCloseBtn) riderCloseBtn.addEventListener('click', () => closeModal('riderModal'), { passive: true });
    if (riderCancelBtn) riderCancelBtn.addEventListener('click', () => closeModal('riderModal'), { passive: true });
    if (riderSaveBtn) riderSaveBtn.addEventListener('click', saveRider, { passive: true });
    
    // Modal de drapeau
    const flagCloseBtn = document.getElementById('flagCloseBtn');
    const flagSearchInput = document.getElementById('flagSearchInput');
    if (flagCloseBtn) flagCloseBtn.addEventListener('click', () => closeModal('flagModal'), { passive: true });
    if (flagSearchInput) flagSearchInput.addEventListener('input', filterFlags, { passive: true });
    
    // Charger les données
    loadTeams();
    
    // Avertir avant de quitter si modifications non sauvegardées
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});

// Charger les équipes
async function loadTeams() {
    try {
        const response = await fetch('/api/teams');
        if (response.ok) {
            teamsData = await response.json();
            renderTeams();
        } else {
            showToast('Erreur lors du chargement des équipes', 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showToast('Erreur de connexion au serveur', 'error');
    }
}

// Afficher les équipes
function renderTeams() {
    const container = document.getElementById('teamsContainer');
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const filteredTeams = teamsData.filter(team => 
        team.name.toLowerCase().includes(search) ||
        (team.displayName && team.displayName.toLowerCase().includes(search)) ||
        team.riders.some(r => r.name.toLowerCase().includes(search))
    );
    
    container.innerHTML = filteredTeams.map(team => `
        <div class="team-card" data-team-id="${team.id}">
            <div class="team-header" onclick="toggleTeam(${team.id})">
                <h3>${team.displayName || team.name}</h3>
                <span class="team-riders-count">${team.riders.length} coureurs</span>
            </div>
            <div class="team-content" id="team-content-${team.id}" style="display: none;">
                ${renderTeamEditor(team)}
            </div>
        </div>
    `).join('');
}

// Basculer l'affichage d'une équipe
function toggleTeam(teamId) {
    const content = document.getElementById(`team-content-${teamId}`);
    const isOpen = content.style.display !== 'none';
    
    // Fermer toutes les autres équipes
    document.querySelectorAll('.team-content').forEach(el => {
        el.style.display = 'none';
    });
    
    // Ouvrir/fermer l'équipe sélectionnée
    if (!isOpen) {
        content.style.display = 'block';
        const team = teamsData.find(t => t.id === teamId);
        if (team) {
            content.innerHTML = renderTeamEditor(team);
            attachTeamEditorEvents(team);
        }
    }
}

// Rendre l'éditeur d'équipe
function renderTeamEditor(team) {
    return `
        <div class="team-editor">
            <div class="team-info">
                <h2>${team.displayName || team.name}</h2>
                <div class="form-group">
                    <label>Nom technique</label>
                    <input type="text" value="${team.name}" id="teamNameInput" readonly 
                           style="background: #f5f5f5;">
                </div>
                <div class="form-group">
                    <label>Nom d'affichage</label>
                    <input type="text" value="${team.displayName || ''}" 
                           placeholder="Nom affiché sur le site"
                           id="teamDisplayInput">
                </div>
            </div>
            
            <div class="riders-section">
                <div class="section-header">
                    <h3>Coureurs (${team.riders.length})</h3>
                    <button class="btn btn-primary btn-sm" id="addRiderBtn">
                        ➕ Ajouter un coureur
                    </button>
                </div>
                <div class="riders-list">
                    ${team.riders.map((rider, index) => `
                        <div class="rider-item" data-rider-index="${index}">
                            <span class="rider-flag" onclick="openFlagModal(${team.id}, ${index})" 
                                  title="Cliquer pour changer">
                                ${rider.flag || '🏳️'}
                            </span>
                            <input type="text" value="${rider.name}" 
                                   onchange="updateRider(${team.id}, ${index}, 'name', this.value)"
                                   placeholder="Nom du coureur">
                            <button class="btn btn-danger btn-sm" 
                                    onclick="removeRider(${team.id}, ${index})">
                                ✖
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="team-actions">
                <button class="btn btn-danger" id="deleteTeamBtn">
                    🗑️ Supprimer l'équipe
                </button>
            </div>
        </div>
    `;
}

// Attacher les événements de l'éditeur
function attachTeamEditorEvents(team) {
    const editor = document.querySelector(`#team-content-${team.id}`);
    if (!editor) return;
    
    const displayInput = editor.querySelector('#teamDisplayInput');
    const delBtn = editor.querySelector('#deleteTeamBtn');
    const addRiderBtn = editor.querySelector('#addRiderBtn');
    
    if (displayInput) displayInput.addEventListener('change', e => updateTeamField(team.id, 'displayName', e.target.value));
    if (delBtn) delBtn.addEventListener('click', () => deleteTeam(team.id), { passive: true });
    if (addRiderBtn) addRiderBtn.addEventListener('click', () => openAddRiderModal(team.id), { passive: true });
}

// Mettre à jour un champ d'équipe
function updateTeamField(teamId, field, value) {
    const team = teamsData.find(t => t.id === teamId);
    if (team) {
        team[field] = value;
        hasUnsavedChanges = true;
        updateSaveButton();
        
        // Mettre à jour l'affichage si nécessaire
        if (field === 'name' || field === 'displayName') {
            const header = document.querySelector(`.team-card[data-team-id="${teamId}"] .team-header h3`);
            if (header) header.textContent = team.displayName || team.name;
        }
    }
}

// Ajouter une nouvelle équipe
function addNewTeam() {
    const name = prompt('Nom technique de l\'équipe (ex: jayco-alula):');
    if (!name) return;
    
    const displayName = prompt('Nom d\'affichage (ex: Team Jayco AlUla):') || name;
    
    const newTeam = {
        id: Date.now(),
        name: name.toLowerCase().replace(/\s+/g, '-'),
        displayName: displayName,
        riders: []
    };
    
    teamsData.push(newTeam);
    hasUnsavedChanges = true;
    updateSaveButton();
    renderTeams();
    showToast('Équipe ajoutée', 'success');
}

// Supprimer une équipe
function deleteTeam(teamId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) return;
    
    const index = teamsData.findIndex(t => t.id === teamId);
    if (index !== -1) {
        teamsData.splice(index, 1);
        hasUnsavedChanges = true;
        updateSaveButton();
        renderTeams();
        showToast('Équipe supprimée', 'success');
    }
}

// Ouvrir le modal d'ajout de coureur
function openAddRiderModal(teamId) {
    currentTeamId = teamId;
    document.getElementById('riderName').value = '';
    document.getElementById('riderFlag').textContent = '🏳️';
    document.getElementById('riderModal').style.display = 'flex';
}

// Sauvegarder un coureur
function saveRider() {
    const team = teamsData.find(t => t.id === currentTeamId);
    if (!team) return;
    
    const name = document.getElementById('riderName').value.trim();
    const flag = document.getElementById('riderFlag').textContent;
    
    if (!name) {
        showToast('Le nom du coureur est requis', 'error');
        return;
    }
    
    team.riders.push({ name, flag });
    hasUnsavedChanges = true;
    updateSaveButton();
    
    const content = document.getElementById(`team-content-${currentTeamId}`);
    if (content) {
        content.innerHTML = renderTeamEditor(team);
        attachTeamEditorEvents(team);
    }
    
    // Mettre à jour le compteur
    const counter = document.querySelector(`.team-card[data-team-id="${currentTeamId}"] .team-riders-count`);
    if (counter) counter.textContent = `${team.riders.length} coureurs`;
    
    closeModal('riderModal');
    showToast('Coureur ajouté', 'success');
}

// Mettre à jour un coureur
function updateRider(teamId, riderIndex, field, value) {
    const team = teamsData.find(t => t.id === teamId);
    if (team && team.riders[riderIndex]) {
        team.riders[riderIndex][field] = value;
        hasUnsavedChanges = true;
        updateSaveButton();
    }
}

// Supprimer un coureur
function removeRider(teamId, riderIndex) {
    const team = teamsData.find(t => t.id === teamId);
    if (team) {
        team.riders.splice(riderIndex, 1);
        hasUnsavedChanges = true;
        updateSaveButton();
        
        const content = document.getElementById(`team-content-${teamId}`);
        if (content) {
            content.innerHTML = renderTeamEditor(team);
            attachTeamEditorEvents(team);
        }
        
        // Mettre à jour le compteur
        const counter = document.querySelector(`.team-card[data-team-id="${teamId}"] .team-riders-count`);
        if (counter) counter.textContent = `${team.riders.length} coureurs`;
        
        showToast('Coureur supprimé', 'success');
    }
}

// Ouvrir le modal de drapeau
function openFlagModal(teamId, riderIndex) {
    currentTeamId = teamId;
    currentFlagTarget = { type: 'rider', index: riderIndex };
    
    const modal = document.getElementById('flagModal');
    const grid = document.getElementById('flagGrid');
    
    // Afficher tous les drapeaux
    grid.innerHTML = Object.entries(countryFlags).map(([country, flag]) => `
        <div class="flag-option" onclick="selectFlag('${flag}')" title="${country}">
            <span class="flag">${flag}</span>
            <span class="country-name">${country}</span>
        </div>
    `).join('');
    
    modal.style.display = 'flex';
    document.getElementById('flagSearchInput').value = '';
    document.getElementById('flagSearchInput').focus();
}

// Sélectionner un drapeau
function selectFlag(flag) {
    if (currentFlagTarget?.type === 'rider') {
        const team = teamsData.find(t => t.id === currentTeamId);
        if (team && team.riders[currentFlagTarget.index]) {
            team.riders[currentFlagTarget.index].flag = flag;
            hasUnsavedChanges = true;
            updateSaveButton();
            
            // Mettre à jour l'affichage
            const content = document.getElementById(`team-content-${currentTeamId}`);
            if (content) {
                content.innerHTML = renderTeamEditor(team);
                attachTeamEditorEvents(team);
            }
        }
    } else if (currentFlagTarget?.type === 'newRider') {
        document.getElementById('riderFlag').textContent = flag;
    }
    
    closeModal('flagModal');
}

// Filtrer les drapeaux
function filterFlags() {
    const search = document.getElementById('flagSearchInput').value.toLowerCase();
    const grid = document.getElementById('flagGrid');
    
    const filtered = Object.entries(countryFlags).filter(([country]) => 
        country.toLowerCase().includes(search)
    );
    
    grid.innerHTML = filtered.map(([country, flag]) => `
        <div class="flag-option" onclick="selectFlag('${flag}')" title="${country}">
            <span class="flag">${flag}</span>
            <span class="country-name">${country}</span>
        </div>
    `).join('');
}

// Filtrer les équipes
function filterTeams() {
    renderTeams();
}

// Sauvegarder les changements
async function saveChanges() {
    try {
        // Préparer les données pour l'envoi
        const dataToSave = teamsData.map(team => ({
            id: team.id,
            name: team.name,
            displayName: team.displayName,
            riders: team.riders
        }));
        
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });
        
        if (response.ok) {
            hasUnsavedChanges = false;
            updateSaveButton();
            showToast('Changements sauvegardés avec succès', 'success');
        } else {
            const error = await response.text();
            showToast(`Erreur: ${error}`, 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showToast('Erreur lors de la sauvegarde', 'error');
    }
}

// Annuler les changements
function revertChanges() {
    if (!hasUnsavedChanges || confirm('Annuler tous les changements non sauvegardés ?')) {
        hasUnsavedChanges = false;
        updateSaveButton();
        loadTeams();
    }
}

// Mettre à jour le bouton de sauvegarde
function updateSaveButton() {
    const saveBtn = document.getElementById('saveBtn');
    const revertBtn = document.getElementById('revertBtn');
    
    if (saveBtn) {
        saveBtn.disabled = !hasUnsavedChanges;
        saveBtn.textContent = hasUnsavedChanges ? '💾 Sauvegarder les changements' : '✓ Tout est sauvegardé';
    }
    
    if (revertBtn) {
        revertBtn.disabled = !hasUnsavedChanges;
    }
}

// Fermer un modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Réinitialiser les champs
        if (modalId === 'riderModal') {
            document.getElementById('riderName').value = '';
            document.getElementById('riderFlag').textContent = '🏳️';
        }
    }
}

// Afficher un toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Fonction utilitaire pour échapper le HTML
function safePath(path) {
    const div = document.createElement('div');
    div.textContent = path;
    return div.innerHTML;
}

// Marquer comme non sauvegardé
function markAsUnsaved() {
    hasUnsavedChanges = true;
    updateSaveButton();
}

// Exporter les fonctions globales
window.toggleTeam = toggleTeam;
window.updateRider = updateRider;
window.removeRider = removeRider;
window.openFlagModal = openFlagModal;
window.selectFlag = selectFlag;
window.openAddRiderModal = openAddRiderModal;
window.deleteTeam = deleteTeam;
window.updateTeamField = updateTeamField;
