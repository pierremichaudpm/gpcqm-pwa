// === GPCQM 2025 - Riders Modal Management ===
// Généré automatiquement par le CMS - 2025-09-07T00:37:57.693Z

// Données officielles des équipes et coureurs GPCQM 2025
const ridersData = {
    teams: [
    {
        "id": "emirates",
        "name": "emirates",
        "displayName": "UAE TEAM EMIRATES XRG - TEST CHANGE",
        "jerseyPath": "/listeengages-package/listeengages/images/jerseys/emirates.png?t=1757205477688",
        "riders": [
            {
                "number": "1",
                "name": "POGAČAR Tadej",
                "country": "��🇮"
            },
            {
                "number": "2",
                "name": "ALMEIDA João",
                "country": "🇵🇹"
            },
            {
                "number": "3",
                "name": "AYUSO Juan",
                "country": "🇪🇸"
            },
            {
                "number": "4",
                "name": "BJERG Mikkel",
                "country": "🇩🇰"
            },
            {
                "number": "5",
                "name": "GROSSSCHARTNER Felix",
                "country": "🇦🇹"
            },
            {
                "number": "6",
                "name": "POLITT Nils",
                "country": "🇩🇪"
            },
            {
                "number": "7",
                "name": "YATES Adam",
                "country": "🇬🇧"
            }
        ]
    }
]
};

// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Le reste du code JavaScript reste inchangé...


// Filename overrides for jersey images present in the package
const jerseySlugOverrides = {
    "UAE Team Emirates": "emirates",
    "Lotto Dstny": "lotto",
    "Team Visma | Lease a Bike": "visma",
    "INEOS Grenadiers": "ineos",
    "Soudal Quick-Step": "soudal",
    "Lidl-Trek": "lidltrek",
    "Decathlon AG2R La Mondiale Team": "decathlon",
    "Red Bull - BORA - hansgrohe": "redbullbora",
    "Alpecin-Deceuninck": "alpecin",
    "Groupama-FDJ": "groupama",
    "EF Education - EasyPost": "EF",
    "Bahrain Victorious": "bahrain",
    "Movistar Team": "movistar",
    "Team Jayco AlUla": "jayco",
    "Arkéa-B&B Hotels": "arkea",
    "Team DSM-Firmenich PostNL": "picnic",
    "Intermarché - Wanty": "intermarchewanty",
    "Cofidis": "cofidis",
    "Astana Qazaqstan Team": "astana",
    "Israel - Premier Tech": "palestine",
    "Uno-X Mobility": "uno",
    "Tudor Pro Cycling Team": "tudor",
    "Équipe Canada": "canada"
};

// State management
let currentView = 'teams';
let searchTerm = '';
let expandedTeams = new Set();

// Fonction pour obtenir le chemin du maillot basé sur le nom de l'équipe
function getJerseyPath(teamName, displayName) {
    const name = (teamName || displayName || '').toLowerCase();
    
    // Mapping des noms d'équipes vers les fichiers de maillots
    const jerseyMap = {
        'uae': 'listeengages-package/listeengages/images/jerseys/emirates.png',
        'emirates': 'listeengages-package/listeengages/images/jerseys/emirates.png',
        'lidl': 'listeengages-package/listeengages/images/jerseys/lidltrek.png',
        'trek': 'listeengages-package/listeengages/images/jerseys/lidltrek.png',
        'bora': 'listeengages-package/listeengages/images/jerseys/redbullbora.png',
        'red bull': 'listeengages-package/listeengages/images/jerseys/redbullbora.png',
        'soudal': 'listeengages-package/listeengages/images/jerseys/soudal.png',
        'quick': 'listeengages-package/listeengages/images/jerseys/soudal.png',
        'ineos': 'listeengages-package/listeengages/images/jerseys/ineos.png',
        'ef': 'listeengages-package/listeengages/images/jerseys/ef.png',
        'education': 'listeengages-package/listeengages/images/jerseys/ef.png',
        'visma': 'listeengages-package/listeengages/images/jerseys/visma.png',
        'alpecin': 'listeengages-package/listeengages/images/jerseys/alpecin.png',
        'decathlon': 'listeengages-package/listeengages/images/jerseys/decathlon.png',
        'ag2r': 'listeengages-package/listeengages/images/jerseys/decathlon.png',
        'movistar': 'listeengages-package/listeengages/images/jerseys/movistar.png',
        'astana': 'listeengages-package/listeengages/images/jerseys/astana.png',
        'bahrain': 'listeengages-package/listeengages/images/jerseys/bahrain.png',
        'jayco': 'listeengages-package/listeengages/images/jerseys/jayco.png',
        'groupama': 'listeengages-package/listeengages/images/jerseys/groupama.png',
        'fdj': 'listeengages-package/listeengages/images/jerseys/groupama.png',
        'cofidis': 'listeengages-package/listeengages/images/jerseys/cofidis.png',
        'arkea': 'listeengages-package/listeengages/images/jerseys/arkea.png',
        'arkéa': 'listeengages-package/listeengages/images/jerseys/arkea.png',
        'intermarche': 'listeengages-package/listeengages/images/jerseys/intermarchewanty.png',
        'intermarché': 'listeengages-package/listeengages/images/jerseys/intermarchewanty.png',
        'wanty': 'listeengages-package/listeengages/images/jerseys/intermarchewanty.png',
        'lotto': 'listeengages-package/listeengages/images/jerseys/lotto.png',
        'tudor': 'listeengages-package/listeengages/images/jerseys/tudor.png',
        'uno': 'listeengages-package/listeengages/images/jerseys/uno.png',
        'uno-x': 'listeengages-package/listeengages/images/jerseys/uno.png',
        'picnic': 'listeengages-package/listeengages/images/jerseys/picnic.png',
        'postnl': 'listeengages-package/listeengages/images/jerseys/picnic.png',
        'canada': 'listeengages-package/listeengages/images/jerseys/canada.png',
        'palestine': 'listeengages-package/listeengages/images/jerseys/palestine.png'
    };
    
    // Chercher une correspondance dans le mapping
    for (const [key, path] of Object.entries(jerseyMap)) {
        if (name.includes(key)) {
            return path;
        }
    }
    
    return null; // Retourner null si aucun maillot n'est trouvé
}

// Initialize the riders modal
function initializeRidersModal() {
    // Essayer de charger les dernières données sauvegardées par le CMS
    tryFetchLatestRidersData().then(() => {
        loadTeamsView();
        updateRidersStats();
    }).catch(() => {
        // En cas d'échec, utiliser les données embarquées
        loadTeamsView();
        updateRidersStats();
    });
}

// Open modal
function openRidersModal() {
    const modal = document.getElementById('ridersModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize content if not already loaded
    if (!modal.dataset.initialized) {
        initializeRidersModal();
        modal.dataset.initialized = 'true';
    } else {
        // Always refresh latest data and stats when reopening
        tryFetchLatestRidersData().finally(() => {
            loadTeamsView();
            updateRidersStats();
        });
    }
}

// Close modal
function closeRidersModal() {
    const modal = document.getElementById('ridersModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// No longer needed - only teams view

// Load teams view
function loadTeamsView() {
    const container = document.getElementById('teamsAccordion');
    const teamsView = document.getElementById('teamsView');
    
    let html = '';

    // Sort teams according to the desired display order
    const desiredOrder = [
        'jayco','uae','visma','lidl','soudal','ineos','bora','alpecin','groupama','bahrain',
        'decathlon','ef education','movistar','xds','picnic','intermarche','cofidis','arkea',
        'lotto','israel','uno x','tudor','canada'
    ];
    const labelToIndex = Object.create(null);
    desiredOrder.forEach((label, idx) => { labelToIndex[label] = idx; });

    function normalizeLabel(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function teamOrderIndex(team) {
        const base = normalizeLabel((team.name || '') + ' ' + (team.displayName || ''));
        const candidates = [
            'jayco','uae','visma','lidl','soudal','ineos','bora','alpecin','groupama','bahrain',
            'decathlon','ef education','movistar','xds','picnic','intermarche','cofidis','arkea',
            'lotto','israel','uno x','tudor','canada'
        ];
        for (let i = 0; i < candidates.length; i++) {
            const token = candidates[i];
            // match token in normalized string (ensure hyphen/space equivalence)
            if (base.includes(token)) {
                return labelToIndex[token];
            }
        }
        return Number.MAX_SAFE_INTEGER;
    }

    const sortedTeams = (ridersData.teams || []).slice().sort((a, b) => {
        const ia = teamOrderIndex(a);
        const ib = teamOrderIndex(b);
        if (ia !== ib) return ia - ib;
        // stable fallback by name to keep deterministic order among unknowns
        const an = (a.displayName || a.name || '').toLowerCase();
        const bn = (b.displayName || b.name || '').toLowerCase();
        return an.localeCompare(bn);
    });

    sortedTeams.forEach(team => {
        const isExpanded = expandedTeams.has(team.id);
        
        // Obtenir le chemin du maillot, plus un fallback local déterministe
        const fallbackPath = getJerseyPath(team.name, team.displayName) || 'listeengages-package/listeengages/images/jerseys/jersey-placeholder.svg';
        const jerseyPath = team.jerseyPath || fallbackPath;
        
        html += `
            <div class="team-card ${isExpanded ? 'expanded' : ''}" data-team-id="${team.id}">
                <div class="team-header" role="button" tabindex="0" aria-expanded="${isExpanded ? 'true' : 'false'}">
                    <div class="team-info">
                        <span class="team-jersey-icon">
                            <img src="${jerseyPath}" alt="Maillot ${team.name}" style="width: 30px; height: 30px; object-fit: contain; vertical-align: middle;" onerror="this.onerror=null; this.src='${fallbackPath}'">
                        </span>
                        <span class="team-name">${team.displayName || team.name}</span>
                    </div>
                    <span class="team-chevron">${isExpanded ? '▼' : '▶'}</span>
                </div>
                <div class="team-riders">
                    <div class="team-jersey-display">
                        <div class="team-jersey-bg" data-team="${team.name}"></div>
                        <img class="team-jersey-img" alt="Maillot ${team.name}" src="${jerseyPath}" onerror="this.onerror=null; this.src='${fallbackPath}'">
                    </div>
                    <div class="riders-grid">
                        ${team.riders.map(rider => `
                            <div class="rider-item">
                                <span class="rider-number">${rider.number}</span>
                                <span class="rider-name">${rider.name}</span>
                                <span class="rider-flag">${rider.country}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    teamsView.style.display = 'block';
    
    // Apply jersey backgrounds (guard against runtime errors)
    try { applyJerseyBackgrounds(); } catch(_) {}

    // Ensure jersey <img> has a resilient fallback if custom path 404s
    try {
        const cards = container.querySelectorAll('.team-card');
        cards.forEach(card => {
            const img = card.querySelector('.team-jersey-img');
            if (!img || img.dataset.fallbackBound === 'true') return;
            const bg = card.querySelector('.team-jersey-bg');
            const teamName = (bg && bg.getAttribute('data-team')) || (card.querySelector('.team-name')?.textContent) || '';
            // Si l'image est déjà chargée et que ce n'est pas le placeholder, supprimer le bg tout de suite
            try {
                const srcNow = img.getAttribute('src') || '';
                if (bg && srcNow.indexOf('jersey-placeholder.svg') === -1 && img.complete && img.naturalWidth > 0) {
                    bg.style.backgroundImage = 'none';
                }
            } catch(_) {}
            // Quand l'image réelle est chargée, retirer le placeholder de fond pour éviter l'effet de "double" maillot
            img.addEventListener('load', function onLoad() {
                try {
                    const src = img.getAttribute('src') || '';
                    if (bg && !src.includes('jersey-placeholder.svg')) {
                        bg.style.backgroundImage = 'none';
                    }
                } catch(_) {}
            }, { once: true });
            img.addEventListener('error', function onErr() {
                try {
                    const fallback = getJerseyPath(teamName, teamName) || 'listeengages-package/listeengages/images/jerseys/jersey-placeholder.svg';
                    if (img.getAttribute('src') !== fallback) {
                        img.setAttribute('src', fallback);
                    }
                } catch(_) {}
            }, { once: true });
            img.dataset.fallbackBound = 'true';

            // Also bind fallback for the small jersey icon in the header
            const iconImg = card.querySelector('.team-jersey-icon img');
            if (iconImg && iconImg.dataset.fallbackBound !== 'true') {
                iconImg.addEventListener('error', function onIconErr() {
                    try {
                        const iconFallback = getJerseyPath(teamName, teamName) || 'listeengages-package/listeengages/images/jerseys/jersey-placeholder.svg';
                        if (iconImg.getAttribute('src') !== iconFallback) {
                            iconImg.setAttribute('src', iconFallback);
                        }
                    } catch(_) {}
                }, { once: true });
                iconImg.dataset.fallbackBound = 'true';
            }
        });
    } catch(_) {}

    // Ensure clicks on team headers toggle expansion (event delegation + direct bind)
    bindTeamsAccordionDelegation();
    bindTeamHeaders();

    // Ne pas ouvrir d'équipe par défaut
}

function updateRidersStats() {
    try {
        const teams = ridersData.teams || [];
        const teamCount = teams.length;
        let riderCount = 0;
        teams.forEach(t => { riderCount += (t.riders ? t.riders.length : 0); });
        const ridersEl = document.getElementById('ridersCount');
        const teamsEl = document.getElementById('teamsCount');
        if (ridersEl) ridersEl.textContent = String(riderCount);
        if (teamsEl) teamsEl.textContent = String(teamCount);
    } catch(_) {}
}

// Ensure teamStyles exists to prevent runtime errors in applyJerseyBackgrounds
const teamStyles = (typeof window !== 'undefined' && window.teamStyles) ? window.teamStyles : {};

// Apply jersey backgrounds to expanded teams
function applyJerseyBackgrounds() {
    const bgs = document.querySelectorAll('.team-jersey-bg');
    bgs.forEach(bg => {
        try {
            bg.style.backgroundImage = 'none';
            bg.style.display = 'none';
        } catch(_) {}
    });
    return; // Désactiver les backgrounds pour éviter tout mélange d'images
}

function slugifyTeamName(name) {
    return name
        .toLowerCase()
        .replace(/\|/g, ' ')
        .replace(/\s+&\s+/g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/--+/g, '-');
}

function tryLoadImageInOrder(paths, onSuccess, onFailure) {
    let index = 0;
    function tryNext() {
        if (index >= paths.length) {
            try { console.warn('[Jersey] No image found for candidates:', paths); } catch(_){}
            onFailure && onFailure();
            return;
        }
        const path = paths[index++];
        const testImg = new Image();
        testImg.onload = function() { try { console.debug('[Jersey] Loaded', path); } catch(_){} onSuccess && onSuccess(path); };
        testImg.onerror = function() { tryNext(); };
        testImg.src = path;
    }
    tryNext();
}

// Toggle team expansion
function toggleTeam(teamId) {
    const teamCard = document.querySelector(`[data-team-id="${teamId}"]`);
    
    if (expandedTeams.has(teamId)) {
        expandedTeams.delete(teamId);
        teamCard.classList.remove('expanded');
        const header = teamCard.querySelector('.team-header');
        if (header) header.setAttribute('aria-expanded', 'false');
        const chevron = teamCard.querySelector('.team-chevron');
        if (chevron) chevron.textContent = '▶';
        const content = teamCard.querySelector('.team-riders');
        if (content) {
            content.style.maxHeight = '0px';
        }
    } else {
        expandedTeams.add(teamId);
        teamCard.classList.add('expanded');
        const header = teamCard.querySelector('.team-header');
        if (header) header.setAttribute('aria-expanded', 'true');
        const chevron = teamCard.querySelector('.team-chevron');
        if (chevron) chevron.textContent = '▼';
        
        // Apply jersey background when expanding
        setTimeout(() => applyJerseyBackgrounds(), 50);
        const content = teamCard.querySelector('.team-riders');
        if (content) {
            // Force correct height for smooth expansion regardless of CSS cap
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
}



// Search functionality
function searchRiders() {
    const searchInput = document.getElementById('ridersSearch');
    searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        // Show normal view if search is too short
        document.getElementById('searchResultsView').style.display = 'none';
        document.getElementById('teamsView').style.display = 'block';
        return;
    }
    
    // Hide all views
    document.querySelectorAll('.riders-view').forEach(v => {
        v.style.display = 'none';
    });
    
    // Collect matching riders
    let results = [];
    ridersData.teams.forEach(team => {
        // Check if team name matches
        if (team.name.toLowerCase().includes(searchTerm)) {
            team.riders.forEach(rider => {
                results.push({
                    ...rider,
                    teamName: team.name,
                    matchType: 'team'
                });
            });
        } else {
            // Check individual riders
            team.riders.forEach(rider => {
                if (rider.name.toLowerCase().includes(searchTerm)) {
                    results.push({
                        ...rider,
                        teamName: team.name,
                        matchType: 'rider'
                    });
                }
            });
        }
    });
    
    // Display results
    const searchResultsView = document.getElementById('searchResultsView');
    const searchResultsList = document.getElementById('searchResultsList');
    
    const lang = (window.currentLanguage || (window.localStorage && localStorage.getItem('language')) || 'fr');
    const isEn = String(lang).toLowerCase() === 'en';
    const resultWord = isEn ? 'result' : 'résultat';
    const resultPlural = isEn ? 'results' : 'résultats';
    const noResultsPrefix = isEn ? 'No results for' : 'Aucun résultat pour';

    if (results.length > 0) {
        searchResultsList.innerHTML = `
            <div class="search-results">
                <div class="search-results-header">
                    <h3>${results.length} ${results.length > 1 ? resultPlural : resultWord}</h3>
                </div>
                ${results.map(rider => `
                    <div class="rider-item ${rider.matchType}">
                        <span class="rider-number">${rider.number}</span>
                        <span class="rider-name">${highlightMatch(rider.name, searchTerm)}</span>
                        <span class="rider-team">${highlightMatch(rider.teamName, searchTerm)}</span>
                        <span class="rider-flag">${rider.country}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        searchResultsList.innerHTML = `
            <div class="no-results">
                <p>${noResultsPrefix} "<strong>${searchTerm}</strong>"</p>
            </div>
        `;
    }
    
    searchResultsView.style.display = 'block';
}

// Highlight search matches
function highlightMatch(text, search) {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}



// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('ridersModal');
    if (modal && modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeRidersModal();
        } else if (e.key === '/' || (e.ctrlKey && e.key === 'f')) {
            e.preventDefault();
            document.getElementById('ridersSearch').focus();
        }
    }
});

// Add some missing CSS styles for new elements
const style = document.createElement('style');
style.textContent = `
    .rider-team {
        font-size: 0.85rem;
        color: #666;
        margin-left: 10px;
    }
    
    .search-results .rider-item {
        margin-bottom: 5px;
    }
    
    .search-results .rider-item.team {
        background: #e8f5e8;
    }
    
    .search-results-header {
        padding: 15px 0;
        border-bottom: 2px solid #6BA053;
        margin-bottom: 15px;
    }
    
    .search-results-header h3 {
        margin: 0;
        color: #6BA053;
        font-size: 1.1rem;
    }
    
    mark {
        background: #ffeb3b;
        padding: 2px;
        border-radius: 2px;
    }
    
    .no-results {
        text-align: center;
        padding: 40px;
        color: #666;
    }
    
    .team-jersey-icon {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }
    
    .team-jersey-icon img {
        display: inline-block;
        vertical-align: middle;
    }
    
    .team-info {
        display: flex;
        align-items: center;
    }
`;
document.head.appendChild(style);

// Expose a namespaced API for integration
window.RidersModal = window.RidersModal || {
    open: openRidersModal,
    close: closeRidersModal,
    init: initializeRidersModal,
    search: searchRiders,
    toggleTeam: toggleTeam
};

// Robust bind for the close button in case inline handler fails
document.addEventListener('click', function(evt) {
    const target = evt.target;
    if (target && target.classList && target.classList.contains('riders-modal-close')) {
        try { closeRidersModal(); } catch (e) {}
    }
});

// Global capture as last-resort to ensure headers toggle even if other handlers fail
document.addEventListener('click', function(e){
    try {
        const header = e.target.closest && e.target.closest('.team-header');
        if (!header) return;
        const card = header.closest('.team-card');
        if (!card) return;
        const idAttr = card.getAttribute('data-team-id');
        const teamId = parseInt(idAttr, 10);
        if (!isNaN(teamId)) {
            e.preventDefault();
            toggleTeam(teamId);
        }
    } catch(_){ /* no-op */ }
}, true);

// Delegate clicks on team headers to toggle expansion
function bindTeamsAccordionDelegation() {
    const container = document.getElementById('teamsAccordion');
    if (!container || container.dataset.bound === 'true') return;
    container.addEventListener('click', function(e) {
        const header = e.target.closest('.team-header');
        if (!header) return;
        const card = header.closest('.team-card');
        if (!card) return;
        const teamId = parseInt(card.getAttribute('data-team-id'), 10);
        if (!isNaN(teamId)) {
            toggleTeam(teamId);
        }
    });
    container.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const header = e.target.closest('.team-header');
        if (!header) return;
        e.preventDefault();
        const card = header.closest('.team-card');
        if (!card) return;
        const teamId = parseInt(card.getAttribute('data-team-id'), 10);
        if (!isNaN(teamId)) {
            toggleTeam(teamId);
        }
    });
    container.dataset.bound = 'true';
}

// Direct binding on each rendered header (fallback for environments where delegation/inline is blocked)
function bindTeamHeaders() {
    const container = document.getElementById('teamsAccordion');
    if (!container) return;
    const headers = container.querySelectorAll('.team-header');
    headers.forEach(header => {
        if (header.dataset.bound === 'true') return;
        header.addEventListener('click', function() {
            const card = header.closest('.team-card');
            if (!card) return;
            const teamId = parseInt(card.getAttribute('data-team-id'), 10);
            if (!isNaN(teamId)) toggleTeam(teamId);
        });
        header.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            const card = header.closest('.team-card');
            if (!card) return;
            const teamId = parseInt(card.getAttribute('data-team-id'), 10);
            if (!isNaN(teamId)) toggleTeam(teamId);
        });
        header.dataset.bound = 'true';
    });
}

// Ensure content and bindings are ready in production even before opening the modal
document.addEventListener('DOMContentLoaded', function() {
    try {
        const modal = document.getElementById('ridersModal');
        const accordion = document.getElementById('teamsAccordion');
        if (modal && accordion) {
            // Charger les dernières données (riders.json) puis construire la vue
            tryFetchLatestRidersData().finally(() => {
                loadTeamsView();
                updateRidersStats();
            });
            modal.dataset.initialized = 'true';
        }
        // Rafraîchir les totaux quand on revient sur l’onglet/fenêtre
        const refresh = () => {
            tryFetchLatestRidersData().finally(() => {
                loadTeamsView();
                updateRidersStats();
            });
        };
        window.addEventListener('focus', refresh);
        document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
    } catch (_) {}
});

// =============================
// Chargement dynamique riders.json
// =============================

function countryCodeToFlag(code) {
    if (!code || typeof code !== 'string') return code;
    // Déjà un drapeau
    if (/\p{Emoji}/u.test(code) || code.length > 3) return code;
    const map = {
        FRA:'🇫🇷', USA:'🇺🇸', GBR:'🇬🇧', GER:'🇩🇪', DEU:'🇩🇪',
        ITA:'🇮🇹', ESP:'🇪🇸', BEL:'🇧🇪', NED:'🇳🇱', NLD:'🇳🇱',
        AUS:'🇦🇺', CAN:'🇨🇦', NOR:'🇳🇴', DEN:'🇩🇰', DNK:'🇩🇰',
        SUI:'🇨🇭', CHE:'🇨🇭', AUT:'🇦🇹', POL:'🇵🇱', POR:'🇵🇹', PRT:'🇵🇹',
        CZE:'🇨🇿', SVK:'🇸🇰', SLO:'🇸🇮', SVN:'🇸🇮', HUN:'🇭🇺', ROU:'🇷🇴',
        RUS:'🇷🇺', UKR:'🇺🇦', SWE:'🇸🇪', FIN:'🇫🇮', EST:'🇪🇪', LAT:'🇱🇻', LTU:'🇱🇹',
        IRL:'🇮🇪', LUX:'🇱🇺', COL:'🇨🇴', ARG:'🇦🇷', BRA:'🇧🇷', MEX:'🇲🇽',
        JPN:'🇯🇵', KOR:'🇰🇷', CHN:'🇨🇳', NZL:'🇳🇿', RSA:'🇿🇦', UAE:'🇦🇪',
        KAZ:'🇰🇿', ISR:'🇮🇱', ECU:'🇪🇨', ERI:'🇪🇷', CRO:'🇭🇷', HRV:'🇭🇷',
        BHR:'🇧🇭', BIH:'🇧🇦'
    };
    return map[code.toUpperCase()] || code;
}

function normalizeRidersJson(data) {
    try {
        const teams = Array.isArray(data && data.teams) ? data.teams : [];
        teams.forEach(team => {
            team.riders = Array.isArray(team.riders) ? team.riders.map(r => ({
                number: r.number || '',
                name: r.name || '',
                country: countryCodeToFlag(r.country || '')
            })) : [];
        });
        return { teams };
    } catch(_) {
        return { teams: [] };
    }
}

async function tryFetchLatestRidersData() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);
        const cacheBuster = Date.now();
        const resp = await fetch(`/riders.json?t=${cacheBuster}`, { signal: controller.signal, cache: 'no-cache' });
        clearTimeout(timeout);
        if (!resp.ok) return;
        const json = await resp.json();
        const normalized = normalizeRidersJson(json);
        if (normalized.teams && normalized.teams.length) {
            // Preserve jerseyPath from server when available
            normalized.teams.forEach(team => {
                const serverTeam = (json.teams || []).find(t => String(t.id) === String(team.id));
                if (serverTeam && serverTeam.jerseyPath) {
                    team.jerseyPath = serverTeam.jerseyPath;
                }
            });
            ridersData.teams = normalized.teams;
        }
    } catch(_) {
        // silencieux: on garde les données embarquées
    }
}