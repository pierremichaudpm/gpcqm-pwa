// FIX POUR RAILWAY - Solution simple et directe
// Ce fichier sera chargé APRÈS tout le reste

(function() {
    console.error('DEBUG RAILWAY: fix-teams-click.js chargé');
    
    // Fonction simple pour toggle une équipe
    function simpleToggleTeam(teamId) {
        console.error(`DEBUG RAILWAY: simpleToggleTeam(${teamId}) appelée`);
        
        const teamCard = document.querySelector(`[data-team-id="${teamId}"]`);
        if (!teamCard) {
            console.error(`DEBUG RAILWAY: Team card ${teamId} non trouvée`);
            return;
        }
        
        const isExpanded = teamCard.classList.contains('expanded');
        const chevron = teamCard.querySelector('.team-chevron');
        const riders = teamCard.querySelector('.team-riders');
        
        if (isExpanded) {
            teamCard.classList.remove('expanded');
            if (chevron) chevron.textContent = '▶';
            if (riders) riders.style.maxHeight = '0px';
        } else {
            teamCard.classList.add('expanded');
            if (chevron) chevron.textContent = '▼';
            if (riders) {
                riders.style.maxHeight = riders.scrollHeight + 'px';
                setTimeout(() => {
                    riders.style.maxHeight = 'none';
                }, 300);
            }
        }
    }
    
    // Attacher les événements après que le DOM soit prêt
    function attachSimpleEvents() {
        console.error('DEBUG RAILWAY: attachSimpleEvents() appelée');
        
        // Utiliser une méthode qui marche à coup sûr
        document.addEventListener('click', function(e) {
            // Vérifier si on a cliqué sur un header d'équipe
            const header = e.target.closest('.team-header');
            if (!header) return;
            
            const teamId = header.getAttribute('data-team-id');
            if (!teamId) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            console.error(`DEBUG RAILWAY: Click détecté sur team ${teamId}`);
            simpleToggleTeam(parseInt(teamId, 10));
        });
        
        console.error('DEBUG RAILWAY: Event listener global attaché');
    }
    
    // Attacher immédiatement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachSimpleEvents);
    } else {
        attachSimpleEvents();
    }
    
    // Exposer globalement pour debug
    window.debugToggleTeam = simpleToggleTeam;
    console.error('DEBUG RAILWAY: window.debugToggleTeam disponible');
})();
