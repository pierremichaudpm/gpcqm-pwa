// === GPCQM 2025 - Countdown Timer ===

// Race schedule times (EDT - Eastern Daylight Time)
const RACE_SCHEDULE = {
    fanVillageOpening: '2025-09-14T09:00:00-04:00',
    teamPresentation: '2025-09-14T09:05:00-04:00',
    raceStart: '2025-09-14T10:15:00-04:00',
    raceFinish: '2025-09-14T15:45:00-04:00',
    ceremonies: '2025-09-14T16:05:00-04:00'
};

// Countdown intervals
let countdownIntervals = [];

// Initialize countdown on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdowns();
    updateNextEvent();
});

// Initialize all countdowns
function initializeCountdowns() {
    // Main countdown to race start
    startCountdown('mainCountdown', RACE_SCHEDULE.raceStart);
    
    // Update timeline items
    updateTimelineStatus();
}

// Start a countdown timer
function startCountdown(elementId, targetDate) {
    const targetTime = new Date(targetDate).getTime();
    
    // Update immediately
    updateCountdownDisplay(elementId, targetTime);
    
    // Update every second
    const interval = setInterval(() => {
        updateCountdownDisplay(elementId, targetTime);
    }, 1000);
    
    countdownIntervals.push(interval);
}

// Update countdown display
function updateCountdownDisplay(elementId, targetTime) {
    const now = new Date().getTime();
    const distance = targetTime - now;
    
    // Get countdown container
    const container = document.getElementById(elementId);
    if (!container) return;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Adjust separators and visibility (minimalist display)
    const items = container.querySelectorAll('.countdown-item');
    const currentLang = localStorage.getItem('language') || 'fr';
    if (items && items.length >= 4) {
        const dayItem = items[0];
        const hoursItem = items[1];
        const minutesItem = items[2];
        const secondsItem = items[3];

        // Separator after days -> "jours" | "days", others remain ':'
        if (dayItem) dayItem.setAttribute('data-sep', currentLang === 'fr' ? 'jours' : 'days');
        if (hoursItem) hoursItem.setAttribute('data-sep', ':');
        if (minutesItem) minutesItem.setAttribute('data-sep', ':');
        if (secondsItem) secondsItem.setAttribute('data-sep', '');

        // Hide days block when days <= 0 → show only HH:MM:SS
        if (dayItem) {
            if (days <= 0) {
                dayItem.classList.add('hidden');
            } else {
                dayItem.classList.remove('hidden');
            }
        }
    }
    
    // Update display
    const daysEl = container.querySelector('#days');
    const hoursEl = container.querySelector('#hours');
    const minutesEl = container.querySelector('#minutes');
    const secondsEl = container.querySelector('#seconds');
    
    if (distance > 0) {
        // Race hasn't started yet
        if (daysEl) daysEl.textContent = padZero(days);
        if (hoursEl) hoursEl.textContent = padZero(hours);
        if (minutesEl) minutesEl.textContent = padZero(minutes);
        if (secondsEl) secondsEl.textContent = padZero(seconds);
    } else if (distance > -5.5 * 60 * 60 * 1000) {
        // Race is ongoing (assuming ~5.5 hours duration)
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        
        // Update race status to LIVE
        updateRaceStatus('live');
        // Hide countdown, show hero live badge
        const cc = document.getElementById('heroCountdownContainer');
        const hi = document.getElementById('heroStatusIndicator');
        if (cc) cc.style.display = 'none';
        if (hi) hi.style.display = '';
    } else {
        // Race is finished
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        
        // Update race status to FINISHED
        updateRaceStatus('finished');
        // After finish: hide hero live badge, hide countdown title
        const cc = document.getElementById('heroCountdownContainer');
        const hi = document.getElementById('heroStatusIndicator');
        if (hi) hi.style.display = 'none';
        if (cc) cc.style.display = 'none';
    }
}

// Pad numbers with zero
function padZero(num) {
    return num < 10 ? '0' + num : num.toString();
}

// Update race status badge
function updateRaceStatus(status) {
    const statusBadge = document.querySelector('.status-badge');
    if (!statusBadge) return;
    
    // Remove all status classes
    statusBadge.classList.remove('upcoming', 'live', 'finished');
    
    // Add new status class
    statusBadge.classList.add(status);
    
    // Update text/markup based on language and status
    const currentLang = localStorage.getItem('language') || 'fr';
    if (status === 'live') {
        const text = currentLang === 'fr' ? 'Course en cours' : 'Race in progress';
        statusBadge.innerHTML = '<span class="live-dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#fff;margin-right:8px;box-shadow:0 0 0 2px rgba(255,255,255,0.4);"></span>' + text;
        statusBadge.style.animation = 'pulse 2s infinite';
        if (typeof gtag !== 'undefined') {
            gtag('event', 'race_status_live', { event_category: 'Race', event_label: 'Race went live' });
        }
    } else if (status === 'finished') {
        statusBadge.style.animation = '';
        statusBadge.textContent = currentLang === 'fr' ? 'Course terminée' : 'Race finished';
    } else {
        statusBadge.style.animation = '';
        statusBadge.textContent = currentLang === 'fr' ? 'À venir' : 'Upcoming';
    }
}

// Update next event display
function updateNextEvent() {
    const now = new Date().getTime();
    const nextEventEl = document.getElementById('nextEventName');
    const nextEventTimeEl = document.getElementById('nextEventTime');
    
    if (!nextEventEl || !nextEventTimeEl) return;
    
    // Find next event
    let nextEvent = null;
    let nextEventTime = null;
    
    for (const [eventKey, eventTime] of Object.entries(RACE_SCHEDULE)) {
        const eventTimestamp = new Date(eventTime).getTime();
        if (eventTimestamp > now) {
            nextEvent = eventKey;
            nextEventTime = eventTime;
            break;
        }
    }
    
    if (nextEvent) {
        // Get event name based on language
        const eventNames = {
            fanVillageOpening: { 
                fr: 'Ouverture des Zones animées', 
                en: 'Animated aera Opening' 
            },
            teamPresentation: { 
                fr: 'Présentation des équipes', 
                en: 'Team Presentation' 
            },
            raceStart: { 
                fr: 'Départ du Grand Prix', 
                en: 'Grand Prix Start' 
            },
            raceFinish: { 
                fr: 'Arrivée de la course', 
                en: 'Race Finish' 
            },
            ceremonies: { 
                fr: 'Cérémonies protocolaires', 
                en: 'Award Ceremonies' 
            }
        };
        
        const currentLang = localStorage.getItem('language') || 'fr';
        nextEventEl.textContent = eventNames[nextEvent][currentLang];
        
        // Format time
        const eventDate = new Date(nextEventTime);
        const hours = eventDate.getHours();
        const minutes = eventDate.getMinutes();
        nextEventTimeEl.textContent = `${hours}h${minutes > 0 ? padZero(minutes) : '00'}`;
        
        // Start mini countdown to next event
        startMiniCountdown(nextEventTime);
    } else {
        // All events have passed
        const currentLang = localStorage.getItem('language') || 'fr';
        nextEventEl.textContent = currentLang === 'fr' ? 'Course terminée' : 'Race finished';
        nextEventTimeEl.textContent = '';
    }
}

// Mini countdown for next event
function startMiniCountdown(targetDate) {
    const targetTime = new Date(targetDate).getTime();
    
    const updateMini = () => {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        if (distance <= 0) {
            // Event has started, update to next one
            updateNextEvent();
        }
    };
    
    // Update every minute
    setInterval(updateMini, 60000);
}

// Update timeline status
function updateTimelineStatus() {
    const now = new Date().getTime();
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const timeAttr = item.getAttribute('data-time');
        if (!timeAttr) return;
        
        // Parse time from data attribute
        const [hours, minutes] = timeAttr.split(':').map(t => parseInt(t));
        const eventDate = new Date('2025-09-14');
        eventDate.setHours(hours, minutes || 0, 0, 0);
        
        const eventTime = eventDate.getTime();
        
        if (now >= eventTime) {
            item.classList.add('completed');
        } else if (now >= eventTime - 30 * 60 * 1000) {
            // Within 30 minutes of event
            item.classList.add('upcoming');
        }
    });
}

// Clear all countdown intervals (cleanup)
function clearCountdowns() {
    countdownIntervals.forEach(interval => clearInterval(interval));
    countdownIntervals = [];
}

// Auto-refresh countdowns at midnight
function scheduleCountdownRefresh() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        clearCountdowns();
        initializeCountdowns();
        scheduleCountdownRefresh(); // Schedule next refresh
    }, msUntilMidnight);
}

// Start auto-refresh schedule
scheduleCountdownRefresh();

// Export functions if needed
window.updateRaceStatus = updateRaceStatus;
window.updateNextEvent = updateNextEvent;