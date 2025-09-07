// === GPCQM 2025 - Riders Modal Management ===

// Données des équipes - chargées dynamiquement
let ridersData = { teams: [] };

// Charger les données depuis l'API
async function loadRidersData() {
    try {
        const response = await fetch('/riders.json?t=' + Date.now());
        if (response.ok) {
            ridersData = await response.json();
            console.log('Riders data loaded:', ridersData.teams.length, 'teams');
        }
    } catch (error) {
        console.error('Error loading riders data:', error);
    }
}

// Modal management
function openRidersModal(teamId) {
    const modal = document.getElementById('ridersModal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    const team = ridersData.teams.find(t => t.id == teamId);
    if (!team) {
        console.error('Team not found:', teamId);
        return;
    }
    
    // Update modal content
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) {
        let content = '<h3>' + team.displayName + '</h3>';
        content += '<div class="riders-list">';
        if (team.riders && team.riders.length > 0) {
            team.riders.forEach(rider => {
                content += '<div class="rider-item">';
                content += '<span class="rider-number">' + (rider.number || '') + '</span>';
                content += '<span class="rider-name">' + rider.name + '</span>';
                content += '<span class="rider-country">' + (rider.country || '') + '</span>';
                content += '</div>';
            });
        } else {
            content += '<p>Aucun coureur disponible</p>';
        }
        content += '</div>';
        modalBody.innerHTML = content;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRidersModal() {
    const modal = document.getElementById('ridersModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Riders.js initializing...');
    
    // Load data
    loadRidersData();
    
    // Setup modal close handlers
    const modal = document.getElementById('ridersModal');
    if (modal) {
        // Close on X button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeRidersModal);
        }
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRidersModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeRidersModal();
            }
        });
    }
    
    // Setup team card click handlers
    document.addEventListener('click', function(e) {
        const teamCard = e.target.closest('.team-card');
        if (teamCard) {
            const teamId = teamCard.getAttribute('data-team-id');
            if (teamId) {
                openRidersModal(teamId);
            }
        }
    });
    
    console.log('Riders.js initialized');
});

// Export for global access
window.openRidersModal = openRidersModal;
window.closeRidersModal = closeRidersModal;
window.ridersData = ridersData;
