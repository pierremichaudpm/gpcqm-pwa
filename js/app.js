// === GPCQM 2025 - Main Application JavaScript ===

// App Configuration - Mobile Optimized
const APP_CONFIG = {
  raceDate: "2025-09-14T10:15:00-04:00",
  defaultLanguage: "fr",
  isMobile: (function () {
    // Better mobile detection - check user agent first
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUserAgent =
      /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);

    // If it's a mobile user agent, it's definitely mobile
    if (isMobileUserAgent) {
      return true;
    }

    // Check for touch capability - mobile/tablets have touch
    const hasTouchScreen = navigator.maxTouchPoints > 0;

    // For devices with touch screens, check if it's a tablet
    // Tablets might have width > 768 but are still mobile devices
    if (hasTouchScreen) {
      // Likely a tablet or touch laptop - treat as mobile
      return true;
    }

    // For non-mobile user agents without touch, check screen width
    return window.innerWidth <= 768;
  })(),
};

// Language translations
const translations = {
  fr: {
    // Header
    eventName: "Grand Prix Cycliste de Montréal",

    // Hero
    heroTitle: "GRAND PRIX CYCLISTE DE MONTRÉAL",
    heroSubtitle: "14 septembre 2025\nÉpreuve UCI WorldTour",
    countdownTitle: "Départ de la course dans :",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    viewCourse: "Voir le parcours",
    viewMap: "Voir la carte",
    whereToWatch: "Meilleures zones spectateurs",
    viewSchedule: "Programme",
    gettingThere: "Comment s'y rendre",
    getThereShort: "Comment s'y rendre",
    transportTitle: "Comment s'y rendre",
    bikeTitle: "À vélo",
    metroTitle: "Métro",
    trainTitle: "Train/EXO",
    busTitle: "Autobus",
    carTitle: "Voiture/Covoiturage",
    mapEmbedTitle: "Carte interactive",
    bikeParkingModal:
      "🔒 Parc à vélos surveillé gratuit disponible au Village des Fans (Parc Jeanne-Mance)",

    // Weather
    weatherTitle: "Météo",
    loadingWeather: "Chargement météo...",
    currentWeather: "Météo actuelle",
    temperature: "Température",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    windSpeed: "Vent",

    // Race Status
    raceStatus: "Statut de la course",
    upcoming: "À venir",
    live: "En direct",
    finished: "Terminée",
    nextEvent: "Prochain événement :",
    fanVillageOpening: "Ouverture du Village des Fans",

    // Quick Links
    ridersList: "Liste des partants",
    ridersListTitle: "Découvrez les coureurs",
    viewRiders: "Liste complète",
    quebecResults: "Résultats du Grand Prix Cycliste de Québec",
    quebecMenu: "Grand Prix Cycliste de Québec",
    liveStream: "Le Direct",
    watchStream: "Visionner",
    interactiveCourse: "Parcours",
    edikaContest: "Edika",
    silentAuction: "Encan silencieux",
    socialMedia: "Instagram",
    fanVillageInfo: "Zones animées",
    officialWebsite: "Site officiel",
    // Riders Modal
    ridersTitle: "Liste des Partants - 2025",
    ridersInfo: "Données officielles UCI WorldTour 2025",
    searchRider: "Rechercher un coureur, une équipe... ",
    ridersLabel: "Coureurs",
    teamsLabel: "Équipes UCI",
    resultSingular: "résultat",
    resultPlural: "résultats",
    noResultsFor: "Aucun résultat pour",
    close: "Fermer",

    // Schedule
    scheduleTitle: "Programmation",
    teamPresentation: "Présentation des équipes",
    teamPresentationDesc:
      "Parc Jeanne-Mance – Découvrez les équipes participantes",
    raceStart: "Départ du Grand Prix Cycliste de Montréal",
    raceStartDesc:
      "Avenue du Parc / Monument à sir George-Étienne Cartier – 209,1 km • 17 tours",
    raceFinish: "Arrivée de la course",
    raceFinishDesc: "Avenue du Parc / Monument à sir George-Étienne Cartier",
    ceremonies: "Cérémonies protocolaires",
    ceremoniesDesc: "Parc Jeanne-Mance – Remise des prix",
    fanVillageDesc:
      "Parc Jeanne-Mance – Animation, activités et kiosques d’exposants",

    // Map
    courseTitle: "Parcours",
    animatedCourseTitle: "Parcours animé",
    lapDistance: "Par tour",
    totalLaps: "Tours",
    totalDistance: "Distance totale",
    elevation: "Dénivelé total",
    legendTitle: "Points d'intérêt",
    startFinish: "Départ/Arrivée",
    keyPoints: "Points clés",

    // Map Popups
    startTitle: "Ligne de Départ/Arrivée",
    startContent:
      "Avenue du Parc - Point de départ et d'arrivée de la course. Meilleur endroit pour voir le sprint final.",
    climbTitle: "Côte Camillien-Houde",
    climbContent:
      "Montée de 1,8 km - La principale difficulté du parcours. Pente moyenne de 8%.",
    belvedereTitle: "Belvédère Camillien-Houde",
    belvedereContent:
      "Zone d'animation avec Red Bull, DJ et écran géant. Vue spectaculaire sur la course.",
    fanvillageTitle: "Village des Fans",
    fanvillageContent:
      "Parc Jeanne-Mance - Animations, kiosques partenaires, restauration et boutique officielle.",
    parkingTitle: "Parc à vélos",
    parkingContent:
      "Stationnement sécurisé pour vélos au Parc Jeanne-Mance. Service gratuit.",

    // Social
    socialTitle: "Instagram",
    loadingPosts: "Chargement des publications...",

    // Broadcast
    broadcastTitle: "Diffusion",
    diffusionCta: "Diffusion",
    tvBroadcast: "de 10 h à 16 h",
    streamBroadcast: "Streaming international",
    giantScreen: "Écran Géant",
    webStreamTitle: "Webdiffusion",
    giantScreenDesc: "Au Belvédère Camillien-Houde",
    giantScreens: "Écrans Géants",
    giantScreensDesc:
      "Belvédère Camillien-Houde, Parc Jeanne-Mance, Avenue du Parc",
    giantScreensItem1: "Belvédère Camillien-Houde",
    giantScreensItem2: "Parc Jeanne-Mance",
    giantScreensItem3: "Avenue du Parc",
    tvaApp: "Application TVA Sports",
    tvaAppDesc: "Télécharger",
    onSiteOnly: "Sur site seulement",

    // Contest
    contestTitle: "Concours",
    edikaDesc: "Gagnez des prix exclusifs",
    participate: "Participer",
    auctionDesc: "Maillots et équipements signés",
    bidNow: "Miser",

    // Fan Village
    fanVillageTitle: "Village des Fans",
    location: "Emplacement",
    schedule: "Horaire",
    activities: "Activités",
    activity1: "Kiosques partenaires",
    activity2: "Zone familiale",
    activity3: "Restauration",
    activity4: "Boutique officielle",
    access: "Accès",
    freeEntry: "Entrée gratuite",
    bikeParking: "Parc à vélos disponible",

    // Zones animées (nouvelle section)
    animatedZonesTitle: "Zones animées",
    zonesVillageTitle: "Village des Fans",
    zonesVillageLocationValue: "Parc Jeanne-Mance",
    zonesVillageAct1: "Kiosques d’exposants",
    zonesVillageAct2: "Restauration et service de bar",
    zonesVillageAct3: "Café terrasse Édika",
    zonesVillageAct4: "Boutique officielle GPCQM par Santini",
    zonesVillageAct5: "Toilettes",
    zonesVillageScheduleValue: "9 h à 17 h",
    zonesVillageCTA: "Découvrez nos exposants",
    zonesBelvedereTitle: "Belvédère Camillien-Houde",
    zonesBelvedereAnimTitle: "Animation",
    zonesBelvedereAnim1: "Écran Géant",
    zonesBelvedereAnim2: "Service de bar",
    zonesBelvedereAnim3: "Toilettes",
    zonesBelvedereScheduleValue: "9 h à 17 h",

    // Footer
    officialSite: "Site officiel",
    privacy: "Confidentialité",
    terms: "Conditions",
    contact: "Contact",
    allRights: "Tous droits réservés.",
    // Legal modals
    privacyTitle: "Confidentialité",
    termsTitle: "Conditions",
    openPdf: "Ouvrir le PDF",
    legalIntro:
      "Veuillez consulter le document officiel pour le texte complet.",

    // PWA
    installTitle: "Installer l'application",
    installText: "Ajoutez GPCM à votre écran d'accueil pour un accès rapide",
    installButton: "Installer",
    offlineMode: "Mode hors ligne",

    // New translations
    quebecResults: "Résultats Québec",
    quebecApp: "Appli Québec",
    siteAccess: "Accès au site",
    siteAccessTitle: "Accès au site",
  },
  en: {
    // Header
    eventName: "Montréal Cycling Grand Prix",

    // Hero
    heroTitle: "GRAND PRIX CYCLISTE DE MONTRÉAL",
    heroSubtitle: "September 14, 2025\nUCI WorldTour Event",
    countdownTitle: "Race starts in:",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    viewCourse: "Circuit",
    viewMap: "View Map",
    whereToWatch: "Best spectator zones",
    viewSchedule: "Schedule",
    gettingThere: "Getting there",
    getThereShort: "How to get there",
    transportTitle: "Getting there",
    bikeTitle: "By bike",
    metroTitle: "Subway",
    trainTitle: "Train/EXO",
    busTitle: "Bus",
    carTitle: "Car/Carpool",
    mapEmbedTitle: "Interactive map",
    bikeParkingModal:
      "🔒 Free supervised bike park available at the Fans Village (Jeanne-Mance Park)",

    // Weather
    weatherTitle: "Weather Forecast",
    loadingWeather: "Loading weather...",
    currentWeather: "Current Weather",
    temperature: "Temperature",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    windSpeed: "Wind",

    // Race Status
    raceStatus: "Race Status",
    upcoming: "Upcoming",
    live: "Live",
    finished: "Finished",
    nextEvent: "Next event:",
    fanVillageOpening: "Fans Village Opening",

    // Quick Links
    ridersList: "Start list",
    ridersListTitle: "Discover the Teams",
    viewRiders: "Complete list",
    quebecResults: "Quebec city results",
    quebecMenu: "Grand Prix Cycliste de Québec",
    liveStream: "Live Stream",
    watchStream: "Watch",
    interactiveCourse: "Interactive Course",
    edikaContest: "Edika",
    silentAuction: "Silent Auction",
    socialMedia: "Instagram",
    fanVillageInfo: "Animation area",
    officialWebsite: "Official Website",
    quebecResults: "Québec City Results",

    // Riders Modal
    ridersTitle: "Riders List - 2025",
    ridersInfo: "Official UCI WorldTour 2025 data",
    searchRider: "Search for a rider or a team... ",
    ridersLabel: "Riders",
    teamsLabel: "UCI Teams",
    resultSingular: "result",
    resultPlural: "results",
    noResultsFor: "No results for",
    close: "Close",

    // Schedule
    scheduleTitle: "Program",
    teamPresentation: "Team Presentation",
    teamPresentationDesc: "Jeanne-Mance Park – Meet the participating teams",
    raceStart: "Start of the Grand Prix Cycliste de Montréal",
    raceStartDesc:
      "Park Avenue / Sir George-Étienne Cartier Monument – 209.1 km • 17 laps",
    raceFinish: "End of the race",
    raceFinishDesc: "Park Avenue / Sir George-Étienne Cartier Monument",
    ceremonies: "Award Ceremonies",
    ceremoniesDesc: "Jeanne-Mance Park – Prize giving",
    fanVillageDesc:
      "Jeanne-Mance Park – Entertainment, activities and exhibitor booths",

    // Map
    courseTitle: "Circuit",
    animatedCourseTitle: "Animated Circuit",
    lapDistance: "Per lap",
    totalLaps: "Laps",
    totalDistance: "Total distance",
    elevation: "Total elevation",
    legendTitle: "Points of Interest",
    startFinish: "Start/Finish",
    keyPoints: "Key Points",

    // Map Popups
    startTitle: "Start/Finish Line",
    startContent:
      "Park Avenue - Start and finish point of the race. Best spot to see the final sprint.",
    climbTitle: "Camillien-Houde Climb",
    climbContent:
      "1.8 km climb - The main difficulty of the course. Average gradient of 8%.",
    belvedereTitle: "Camillien-Houde Lookout",
    belvedereContent:
      "Entertainment zone with Red Bull, DJ and giant screen. Spectacular view of the race.",
    fanvillageTitle: "Fans Village",
    fanvillageContent:
      "Jeanne-Mance Park - Entertainment, partner booths, food and Official boutique GPCQM by Santini.",
    parkingTitle: "Bike Park",
    parkingContent: "Secure bike parking at Jeanne-Mance Park. Free service.",

    // Social
    socialTitle: "Instagram",
    loadingPosts: "Loading posts...",

    // Broadcast
    broadcastTitle: "Broadcast",
    diffusionCta: "Broadcast",
    tvBroadcast: "Live broadcast from 10:00 AM to 4:00 PM",
    streamBroadcast: "International streaming",
    webStreamTitle: "Webcast",
    giantScreen: "Giant Screen",
    giantScreenDesc: "At Camillien-Houde Lookout",
    giantScreens: "Giant Screens",
    giantScreensDesc: "Camillien-Houde Lookout, Jeanne-Mance Park, Park Avenue",
    giantScreensItem1: "Camillien-Houde Lookout",
    giantScreensItem2: "Jeanne-Mance Park",
    giantScreensItem3: "Park Avenue",
    tvaApp: "CBC Gem",
    tvaAppDesc: "Download",
    onSiteOnly: "On site only",

    // Fan Zones (new section)
    animatedZonesTitle: "Animation area",
    zonesVillageTitle: "Fans Village",
    zonesVillageLocationValue: "Jeanne-Mance Park",
    zonesVillageAct1: "Exhibitor booths",
    zonesVillageAct2: "Food and bar service",
    zonesVillageAct3: "Édika terrace café",
    zonesVillageAct4: "Official boutique GPCQM by Santini",
    zonesVillageAct5: "Restrooms",
    zonesVillageScheduleValue: "9 AM to 5 PM",
    zonesVillageCTA: "Discover our exhibitors",
    zonesBelvedereTitle: "Camillien-Houde Lookout",
    zonesBelvedereAnimTitle: "Entertainment",
    zonesBelvedereAnim1: "Giant Screen",
    zonesBelvedereAnim2: "Bar service",
    zonesBelvedereAnim3: "Restrooms",
    zonesBelvedereScheduleValue: "9 AM to 5 PM",

    // Contest
    contestTitle: "Contests",
    edikaDesc: "Win exclusive prizes",
    participate: "Participate",
    auctionDesc: "Signed jerseys and equipment",
    bidNow: "Bid Now",

    // Fan Village
    fanVillageTitle: "Fans Village",
    location: "Location",
    schedule: "Schedule",
    activities: "Activities",
    activity1: "Partner booths",
    activity2: "Family zone",
    activity3: "Food court",
    activity4: "Official boutique",
    access: "Access",
    freeEntry: "Free entry",
    bikeParking: "Bike parking available",

    // Footer
    officialSite: "Official Site",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    allRights: "All rights reserved.",
    // Legal modals
    privacyTitle: "Privacy",
    termsTitle: "Terms",
    openPdf: "Open PDF",
    legalIntro: "Please refer to the official document for the full text.",

    // PWA
    installTitle: "Install App",
    installText: "Add GPCM to your home screen for quick access",
    installButton: "Install",
    offlineMode: "Offline Mode",

    // New translations
    quebecResults: "Québec Results",
    quebecApp: "Québec App",
    siteAccess: "Site Access",
    siteAccessTitle: "Site Access",
  },
  // Extra keys for shop
  _extra: {},
};

// Add shop translations (keeping structure minimal)
translations.fr.shopTitle = "Boutique GPCQM";
translations.fr.shopSubtitle = "Maillots, casquettes et souvenirs officiels";
translations.fr.shopCta = "Découvrez";
translations.en.shopTitle = "GPCQM Shop";
translations.en.shopSubtitle = "Official jerseys, caps and souvenirs";
translations.en.shopCta = "Discover";

// Current language
let currentLanguage =
  localStorage.getItem("language") || APP_CONFIG.defaultLanguage;

// Export critical functions immediately when script loads - CRITICAL FIX
// Removed to avoid duplication - functions are defined later and exported

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();

  // Ensure critical functions are available globally (Android/iOS fix)
  // Functions are already exported via exportCriticalFunctions()
  console.log("Critical functions exported to window:", {
    toggleMenu: typeof window.toggleMenu === "function",
    setLanguage: typeof window.setLanguage === "function",
    closeInstallPrompt: typeof window.closeInstallPrompt === "function",
  });
});

function sendMetricsVisit() {
  try {
    const payload = JSON.stringify({
      lang: currentLanguage || "fr",
      path: window.location.pathname,
    });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/metrics/visit", blob);
    } else {
      fetch("/api/metrics/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
        credentials: "omit",
      }).catch(() => {});
    }
  } catch (_) {}
}

// Mobile-Optimized Touch Handler
function addSafeTapListener(element, onTap) {
  if (!element) return;
  let startX = 0,
    startY = 0,
    didMove = false,
    lastTouchTime = 0;
  const MOVE_THRESHOLD = APP_CONFIG.isMobile ? 12 : 16;
  const CANCEL_CLICK_MS = 300;

  const onTouchStart = (e) => {
    if (!e.touches?.[0]) return;
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    didMove = false;
  };

  const onTouchMove = (e) => {
    if (!e.touches?.[0]) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - startX);
    const dy = Math.abs(t.clientY - startY);
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      didMove = true;
    }
  };

  const onTouchEnd = (e) => {
    lastTouchTime = performance.now();
    if (didMove) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    requestAnimationFrame(onTap);
  };

  element.addEventListener("touchstart", onTouchStart, { passive: true });
  element.addEventListener("touchmove", onTouchMove, { passive: true });
  element.addEventListener("touchend", onTouchEnd, { passive: false });
  element.addEventListener(
    "touchcancel",
    () => {
      didMove = true;
      lastTouchTime = performance.now();
    },
    { passive: true },
  );

  element.addEventListener(
    "click",
    (e) => {
      // Don't interfere with normal clicks if no recent touch events
      if (
        !e.isTrusted &&
        (didMove || performance.now() - lastTouchTime < CANCEL_CLICK_MS)
      ) {
        e.preventDefault();
        didMove = false;
        return;
      }
      // Allow normal clicks to pass through (important for DevTools)
      onTap();
    },
    false,
  );
}

// Initialize Application - Mobile Optimized
function initializeApp() {
  // Critical rendering path first - ensure language is set before updating
  if (!currentLanguage) {
    currentLanguage = APP_CONFIG.defaultLanguage;
  }
  updateLanguage();
  hideLoader();

  // Send metrics ASAP
  sendMetricsVisit();

  // Export critical functions immediately for onclick handlers
  exportCriticalFunctions();

  // Attach language toggle button event listener
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", toggleLanguage);
  }

  // Lazy load non-critical functionality with fallback
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(() => {
    // initLanguageButtons(); // Removed - no longer needed with new toggle
    initHeroButtons();
    initSmoothScroll();
    initModalBindings();
    initMenuAutoClose();

    // Ensure RidersModal is ready after a delay
    setTimeout(() => {
      if (!window.RidersModal) {
        console.warn("RidersModal not loaded, checking status...");
        const existingScript = document.querySelector(
          'script[src*="riders.js"]',
        );
        if (existingScript) {
          console.log("riders.js exists but RidersModal not initialized");
        }
      } else {
        console.log("RidersModal is ready");
      }
    }, 2000);
  });

  // Network status
  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus, { passive: true });
  window.addEventListener("offline", updateOnlineStatus, { passive: true });

  // Analytics (non-blocking) with fallback
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 100)))(() => {
    if (typeof gtag !== "undefined") {
      gtag("event", "page_view", {
        page_title: "GPCQM 2025 PWA",
        page_location: window.location.href,
      });
    }
    // Send again in idle as a backup
    sendMetricsVisit();
  });

  // Backup on tab hide (quick reloads/navigation)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendMetricsVisit();
    }
  });

  // Show desktop warning modal if on desktop
  if (!APP_CONFIG.isMobile) {
    // Show immediately - no delay
    showDesktopWarningModal();

    // FORCE HIDE INSTALL PROMPT ON DESKTOP
    const installPrompt = document.getElementById("installPrompt");
    if (installPrompt) {
      installPrompt.classList.add("hidden");
    }
    const iosInstallPrompt = document.getElementById("iosInstallPrompt");
    if (iosInstallPrompt) {
      iosInstallPrompt.classList.add("hidden");
    }
  }
}
// Close mobile menu whenever a link/button inside it is activated
function initMenuAutoClose() {
  try {
    const menu = document.getElementById("mobileMenu");
    if (!menu) return;
    const closeMenu = () => {
      const m = document.getElementById("mobileMenu");
      if (!m) return;
      // Prefer the official toggler for aria handling
      if (
        typeof window.toggleMenu === "function" &&
        m.classList.contains("active")
      ) {
        window.toggleMenu();
      } else {
        // Fallback hard close
        m.classList.remove("active");
        document.body.style.overflow = "";
        const btn = document.querySelector(".menu-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    };
    // Attach to all actionable elements in the menu
    const selectors = "a, button";
    menu.querySelectorAll(selectors).forEach((el) => {
      el.addEventListener(
        "click",
        () => {
          // Use a microdelay to allow navigation/hash scroll to process
          setTimeout(closeMenu, 0);
        },
        { passive: true },
      );
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          setTimeout(closeMenu, 0);
        }
      });
    });
    // Also close when clicking outside the menu, but never when pressing the burger button
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!menu.classList.contains("active")) return;
      // Ignore clicks on the burger toggler
      if (target && target.closest && target.closest(".menu-toggle")) return;
      // If click is outside of the menu content, close
      if (!menu.contains(target)) {
        closeMenu();
      }
    });
  } catch (_) {}
}

// Export critical functions immediately
function exportCriticalFunctions() {
  window.toggleMenu = toggleMenu;
  window.setLanguage = setLanguage;
  window.toggleLanguage = toggleLanguage;
  window.scrollToSection = scrollToSection;
  window.closeInstallPrompt = closeInstallPrompt;
  window.openRidersModal = openRidersModal;
  window.closeRidersModal = closeRidersModal;
  window.openMapModal = openMapModal;
  window.closeMapModal = closeMapModal;
  window.openTransportModal = openTransportModal;
  window.closeTransportModal = closeTransportModal;
  window.openWatchModal = openWatchModal;
  window.closeWatchModal = closeWatchModal;
  window.openPrivacyModal = openPrivacyModal;
  window.closePrivacyModal = closePrivacyModal;
  window.openTermsModal = openTermsModal;
  window.closeTermsModal = closeTermsModal;
  window.openBroadcastApp = openBroadcastApp;
  window.loadAnimatedVideo = loadAnimatedVideo;
}

// Mobile-optimized loader hiding
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    // Use CSS transition for better performance
    loader.style.opacity = "0";
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 300);
  }
}

// Removed - No longer needed with new language toggle
// function initLanguageButtons() {
//     document.querySelectorAll('.lang-btn').forEach(btn => {
//         if ((currentLanguage === 'fr' && btn.textContent === 'Français') ||
//             (currentLanguage === 'en' && btn.textContent === 'English')) {
//             btn.classList.add('active');
//         }
//     });
// }

function initHeroButtons() {
  const buttons = document.querySelectorAll(".quick-actions button");
  buttons.forEach((btn) => {
    if (
      btn.textContent.includes("parcours") ||
      btn.textContent.includes("Course") ||
      btn.textContent.includes("Circuit")
    ) {
      btn.onclick = (e) => smoothScrollToSection(e, "map");
    } else if (
      btn.textContent.includes("Partants") ||
      btn.textContent.includes("Riders") ||
      btn.textContent.includes("Start list")
    ) {
      btn.onclick = (e) => smoothScrollToSection(e, "riders");
    } else if (
      btn.textContent.includes("Diffusion") ||
      btn.textContent.includes("Webdiffusion") ||
      btn.textContent.includes("Broadcast") ||
      btn.querySelector('[data-lang="diffusionCta"]')
    ) {
      btn.onclick = (e) => smoothScrollToSection(e, "broadcast");
    }
  });
}

function initModalBindings() {
  const ridersCard = document.querySelector("button.riders-card");
  if (ridersCard) {
    addSafeTapListener(ridersCard, openRidersModal);
  }

  // CRITICAL FIX: Force binding for problematic buttons
  setTimeout(() => {
    // TVA Sports / CBC Gem button
    const broadcastAppBtn = document.getElementById("broadcastAppBtn");
    if (
      broadcastAppBtn &&
      !broadcastAppBtn.hasAttribute("data-listener-added")
    ) {
      broadcastAppBtn.setAttribute("data-listener-added", "true");
      broadcastAppBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openBroadcastApp(e);
      });
    }

    // Language buttons removed - using new toggle button instead

    // Menu toggle - ensure it works
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const menuCloseBtn = document.getElementById("menuCloseBtn");
    if (menuToggleBtn && typeof window.toggleMenu === "function") {
      if (!menuToggleBtn.onclick) {
        menuToggleBtn.addEventListener("click", () => toggleMenu());
      }
    }
    if (menuCloseBtn && typeof window.toggleMenu === "function") {
      if (!menuCloseBtn.onclick) {
        menuCloseBtn.addEventListener("click", () => toggleMenu());
      }
    }

    // Install prompt close button
    const installCloseBtn = document.getElementById("installCloseBtn");
    if (installCloseBtn && typeof window.closeInstallPrompt === "function") {
      if (!installCloseBtn.onclick) {
        installCloseBtn.addEventListener("click", () => closeInstallPrompt());
      }
    }
  }, 100); // Small delay to ensure DOM is ready

  const mapButtons = document.querySelectorAll("#map .map-actions button");
  mapButtons.forEach((btn) => {
    if (
      btn.textContent.includes("carte") ||
      btn.querySelector('[data-lang="viewMap"]')
    ) {
      addSafeTapListener(btn, openMapModal);
    } else if (
      btn.textContent.includes("rendre") ||
      btn.querySelector('[data-lang="getThereShort"]')
    ) {
      addSafeTapListener(btn, openTransportModal);
    } else if (
      btn.textContent.includes("regarder") ||
      btn.querySelector('[data-lang="whereToWatch"]')
    ) {
      addSafeTapListener(btn, openWatchModal);
    }
  });

  // Ensure Fan Village CTA opens the transport modal (works even if inline handlers are blocked)
  const fvButtons = document.querySelectorAll(".getting-there-btn");
  fvButtons.forEach((btn) => addSafeTapListener(btn, openTransportModal));

  // Footer links: privacy and terms
  const privacyLink = document.querySelector(
    '.footer-links [data-lang="privacy"]',
  );
  const termsLink = document.querySelector('.footer-links [data-lang="terms"]');
  if (privacyLink) {
    privacyLink.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        openPrivacyModal();
      },
      { passive: false },
    );
  }
  if (termsLink) {
    termsLink.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        openTermsModal();
      },
      { passive: false },
    );
  }
}

function smoothScrollToSection(e, sectionId) {
  e.preventDefault();
  const section = document.getElementById(sectionId);
  if (!section) return;

  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;
  const targetY =
    section.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
  window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  return false;
}

// Fallback: masquer le loader même si une erreur JS empêche l'init
function hideLoaderFallback() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => loader.remove && loader.remove(), 350);
  }
}

// Si tout s'est bien passé, initializeApp masque déjà le loader.
// Sinon, on force un fallback après le chargement de la page.
window.addEventListener("load", () => {
  setTimeout(hideLoaderFallback, 2500);
});

// Riders modal controls
function openRidersModal() {
  console.log("openRidersModal called");
  console.log("RidersModal exists?", !!window.RidersModal);

  if (window.RidersModal && typeof window.RidersModal.open === "function") {
    console.log("Using RidersModal.open()");
    window.RidersModal.open();
  } else {
    console.log("Fallback: opening modal directly");
    const m = document.getElementById("ridersModal");
    if (!m) {
      console.error("Modal element not found!");
      return;
    }
    m.style.display = "block";
    document.body.style.overflow = "hidden";

    // Try to initialize the modal content if RidersModal is not ready
    setTimeout(() => {
      if (window.RidersModal && typeof window.RidersModal.init === "function") {
        console.log("Late initialization of RidersModal");
        window.RidersModal.init();
      }
    }, 100);
  }
}

// Map modal controls
function openMapModal() {
  const m = document.getElementById("mapModal");
  if (!m) return;
  // Swap map image by language (try WebP first, then PNG fallback)
  try {
    const img = document.getElementById("mapModalImage");
    if (img) {
      const frPng = "images/225318gpcmtlparcours.png";
      const enPng = "images/225318gpcmtlparcours_en.png";
      const basePng = currentLanguage === "en" ? enPng : frPng;
      const baseWebp = basePng.replace(".png", ".webp");
      const desiredWebp = `${baseWebp}?t=${Date.now()}`;
      const desiredPng = `${basePng}?t=${Date.now()}`;
      if (img.getAttribute("src") !== desiredWebp) {
        img.setAttribute("src", desiredWebp);
      }
      img.onerror = function onFirstError() {
        img.onerror = function onSecondError() {
          const altPng = `${basePng === frPng ? enPng : frPng}?t=${Date.now()}`;
          if (img.getAttribute("src") !== altPng)
            img.setAttribute("src", altPng);
        };
        if (img.getAttribute("src") !== desiredPng)
          img.setAttribute("src", desiredPng);
      };
      img.style.display = "";
    }
  } catch (_) {}
  m.classList.remove("hidden");
  const closeBtn = m.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.addEventListener("click", closeMapModal, { passive: true });
    closeBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        closeMapModal();
      },
      { passive: false },
    );
  }
  document.addEventListener("keydown", handleModalKey, { once: true });
}

function closeMapModal() {
  const m = document.getElementById("mapModal");
  if (!m) return;
  m.classList.add("hidden");
}

function closeRidersModal() {
  if (window.RidersModal && typeof window.RidersModal.close === "function") {
    window.RidersModal.close();
  } else {
    const m = document.getElementById("ridersModal");
    if (!m) return;
    m.style.display = "none";
  }
}

function handleModalKey(e) {
  if (e.key === "Escape") {
    closeRidersModal();
    closeMapModal();
    closeTransportModal();
    closeWatchModal();
    closePrivacyModal();
    closeTermsModal();
  }
}

// Transport modal controls
function openTransportModal() {
  const m = document.getElementById("transportModal");
  if (!m) return;
  m.classList.remove("hidden");
  // Update site access image based on current language
  const siteAccessImage = document.getElementById("siteAccessImage");
  if (siteAccessImage) {
    const pngPath =
      currentLanguage === "fr"
        ? "images/GPC-11938-CarteGPC-2025_MTL-FR_VF_13août.png"
        : "images/GPC-11938-CarteGPC-2025_MTL-EN_VF_13août.png";
    const webpPath = pngPath.replace(".png", ".webp");
    siteAccessImage.setAttribute("src", `${webpPath}`);
    siteAccessImage.onerror = function onErr() {
      siteAccessImage.onerror = null;
      siteAccessImage.setAttribute("src", `${pngPath}`);
    };
    siteAccessImage.setAttribute(
      "alt",
      currentLanguage === "fr"
        ? "Carte d'accès au site GPCQM 2025"
        : "GPCQM 2025 Site Access Map",
    );
  }
  const closeBtn = m.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.addEventListener("click", closeTransportModal, { passive: true });
    closeBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        closeTransportModal();
      },
      { passive: false },
    );
  }
  document.addEventListener("keydown", handleModalKey, { once: true });

  // Toggle bilingual content blocks within the modal
  try {
    const showFr = currentLanguage === "fr";
    document
      .querySelectorAll("#transportModal .transport-content.lang-fr")
      .forEach((el) => {
        el.style.display = showFr ? "" : "none";
      });
    document
      .querySelectorAll("#transportModal .transport-content.lang-en")
      .forEach((el) => {
        el.style.display = showFr ? "none" : "";
      });
  } catch (_) {}
}

function closeTransportModal() {
  const m = document.getElementById("transportModal");
  if (!m) return;
  m.classList.add("hidden");
}

// Watch modal controls
function openWatchModal() {
  const m = document.getElementById("watchModal");
  if (!m) return;
  const img = document.getElementById("watchModalImage");
  if (img) {
    const frPng = "images/meilleurs_endroits_mtl_fr.png";
    const enPng = "images/meilleurs_endroits_mtl_en.png";
    const basePng = currentLanguage === "en" ? enPng : frPng;
    const baseWebp = basePng.replace(".png", ".webp");
    const desiredWebp = `${baseWebp}?t=${Date.now()}`;
    const desiredPng = `${basePng}?t=${Date.now()}`;
    if (img.getAttribute("src") !== desiredWebp) {
      img.setAttribute("src", desiredWebp);
    }
    img.style.display = "";
    img.onerror = function onErrFirst() {
      img.onerror = function onErrSecond() {
        const altPng = `${basePng === frPng ? enPng : frPng}?t=${Date.now()}`;
        if (img.getAttribute("src") !== altPng) img.setAttribute("src", altPng);
      };
      if (img.getAttribute("src") !== desiredPng)
        img.setAttribute("src", desiredPng);
    };
  }
  m.classList.remove("hidden");
  const closeBtn = m.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.addEventListener("click", closeWatchModal, { passive: true });
    closeBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        closeWatchModal();
      },
      { passive: false },
    );
  }
  document.addEventListener("keydown", handleModalKey, { once: true });
}

function closeWatchModal() {
  const m = document.getElementById("watchModal");
  if (!m) return;
  m.classList.add("hidden");
}

// Open broadcast app (TVA Sports in FR, CBC Gem in EN) with deep-link + store fallback
function openBroadcastApp(e) {
  if (e && e.preventDefault) e.preventDefault();

  const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isFrench = (currentLanguage || "fr") === "fr";

  // App deep links and store URLs
  const tvDeepLink = "tvasports://";
  const tvAppStore = "https://apps.apple.com/ca/app/tva-sports/id909307725";
  const tvPlayStore =
    "https://play.google.com/store/apps/details?id=com.nurun.tva_sports";

  const gemDeepLink = "cbcgem://";
  const gemAppStore = "https://apps.apple.com/ca/app/cbc-gem/id422689480";
  const gemPlayStore =
    "https://play.google.com/store/apps/details?id=ca.cbc.android.cbctv";

  const deepLink = isFrench ? tvDeepLink : gemDeepLink;
  const appStoreUrl = isFrench ? tvAppStore : gemAppStore;
  const playStoreUrl = isFrench ? tvPlayStore : gemPlayStore;

  // Prefer opening app via deep link; if it fails, fallback to store
  let fallbackTimer = null;
  const fallback = () => {
    if (isIOS) {
      window.location.href = appStoreUrl;
    } else if (isAndroid) {
      window.location.href = playStoreUrl;
    } else {
      // Desktop fallback: app landing pages
      window.open(
        isFrench
          ? "https://www.tvasports.ca/application"
          : "https://gem.cbc.ca/",
        "_blank",
        "noopener",
      );
    }
  };

  try {
    // Heuristic: if app doesn't open within 1200ms, go to store
    fallbackTimer = setTimeout(fallback, 1200);
    // Use hidden iframe trick for older Android browsers; else set location
    if (isAndroid) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = deepLink;
      document.body.appendChild(iframe);
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch (_) {}
      }, 1500);
    } else {
      window.location.href = deepLink;
    }
  } catch (_) {
    fallback();
  }
}

// Build localized Google My Maps embed URL for the transport modal map
function buildTransportMapEmbedUrl() {
  const myMapsId = "1yu-IhLZVRZ1-RO2yb8cMH-vSY-RFxQk";
  const languageCode = currentLanguage === "fr" ? "fr" : "en";
  // Using the My Maps embed endpoint instead of the viewer for reliable embedding
  const baseUrl = "https://www.google.com/maps/d/u/0/embed";
  const urlParams = new URLSearchParams({ mid: myMapsId, hl: languageCode });
  // Optional initial view; safe defaults
  urlParams.set("ll", "45.517349021343605,-73.57572219999999");
  urlParams.set("z", "12");
  return baseUrl + "?" + urlParams.toString();
}

// Legal modals controls
function openPrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (!modal) return;
  // Load PDF into iframe once to avoid duplicate loads
  const frame = document.getElementById("privacyPdfFrame");
  if (frame && (!frame.src || frame.src === "")) {
    frame.src = encodeURI(
      "Textes légaux GPCQM - Confidentialité et Conditions.pdf",
    );
  }
  modal.classList.remove("hidden");
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.addEventListener("click", closePrivacyModal, { passive: true });
    closeBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        closePrivacyModal();
      },
      { passive: false },
    );
  }
  document.addEventListener("keydown", handleModalKey, { once: true });
}

function closePrivacyModal() {
  const modal = document.getElementById("privacyModal");
  if (!modal) return;
  modal.classList.add("hidden");
}

function openTermsModal() {
  const modal = document.getElementById("termsModal");
  if (!modal) return;
  const frame = document.getElementById("termsPdfFrame");
  if (frame && (!frame.src || frame.src === "")) {
    frame.src = encodeURI(
      "Textes légaux GPCQM - Confidentialité et Conditions.pdf",
    );
  }
  modal.classList.remove("hidden");
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.addEventListener("click", closeTermsModal, { passive: true });
    closeBtn.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();
        closeTermsModal();
      },
      { passive: false },
    );
  }
  document.addEventListener("keydown", handleModalKey, { once: true });
}

function closeTermsModal() {
  const modal = document.getElementById("termsModal");
  if (!modal) return;
  modal.classList.add("hidden");
}

// Menu Toggle - Mobile Optimized
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuButton = document.querySelector(".menu-toggle");

  if (menu) {
    const isActive = menu.classList.contains("active");
    menu.classList.toggle("active");
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "";

    // Update aria-expanded for accessibility
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", (!isActive).toString());
    }
  }
}

// Make toggleMenu globally available immediately
window.toggleMenu = toggleMenu;

// Set Language
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  updateLanguage();
  if (typeof updateWeatherLanguage === "function") {
    updateWeatherLanguage();
  }

  // Track language change
  if (typeof gtag !== "undefined") {
    gtag("event", "language_change", {
      language: lang,
    });
  }
}

// Toggle Language Function
function toggleLanguage() {
  console.log("toggleLanguage called, current:", currentLanguage);
  const newLang = currentLanguage === "fr" ? "en" : "fr";
  console.log("Switching to:", newLang);
  setLanguage(newLang);
}

// Make functions globally available immediately
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;

// Update Language
function updateLanguage() {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
  // Update placeholders for inputs with data-lang-placeholder
  document.querySelectorAll("[data-lang-placeholder]").forEach((input) => {
    const key = input.getAttribute("data-lang-placeholder");
    if (translations[currentLanguage][key]) {
      input.setAttribute("placeholder", translations[currentLanguage][key]);
    }
  });

  // Toggle bilingual legal content visibility in modals
  try {
    const showFr = currentLanguage === "fr";
    document.querySelectorAll(".legal-content.lang-fr").forEach((el) => {
      el.style.display = showFr ? "" : "none";
    });
    document.querySelectorAll(".legal-content.lang-en").forEach((el) => {
      el.style.display = showFr ? "none" : "";
    });
  } catch (e) {
    /* no-op */
  }

  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;

  // Update hero live badge text per language
  try {
    const liveTextEl = document.querySelector(
      '#heroStatusIndicator [data-lang="raceLive"]',
    );
    if (liveTextEl) {
      liveTextEl.textContent =
        currentLanguage === "fr" ? "Course en cours" : "Race in progress";
    }
  } catch (_) {}

  // Update language toggle button text
  const langToggleText = document.getElementById("langToggleText");
  if (langToggleText) {
    langToggleText.textContent = currentLanguage === "fr" ? "Eng" : "Fr";
  }

  // Update old language toggle button (if it exists)
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.textContent = currentLanguage === "fr" ? "EN" : "FR";
  }

  // Highlight specific phrase for Quebec results (FR only)
  const quebecTitle = document.querySelector('h2[data-lang="quebecResults"]');
  if (quebecTitle && currentLanguage === "fr") {
    const fullText = translations.fr.quebecResults;
    const targetPhrase = "Grand Prix Cycliste de Québec";
    quebecTitle.innerHTML = fullText.replace(
      targetPhrase,
      '<span class="quebec-highlight">' + targetPhrase + "</span>",
    );
  }

  // Highlight specific phrase for Riders List title (FR and EN)
  const ridersTitle = document.querySelector(
    '.race-status h2[data-lang="ridersList"]',
  );
  if (ridersTitle) {
    if (currentLanguage === "fr") {
      const fullTextRiders = translations.fr.ridersList;
      const ridersPhrase = "Liste des partants";
      ridersTitle.innerHTML = fullTextRiders.replace(
        ridersPhrase,
        '<span class="riders-highlight">' + ridersPhrase + "</span>",
      );
    } else if (currentLanguage === "en") {
      const fullTextRidersEn = translations.en.ridersList;
      const ridersPhraseEn = "Start list";
      ridersTitle.innerHTML = fullTextRidersEn.replace(
        ridersPhraseEn,
        '<span class="riders-highlight">' + ridersPhraseEn + "</span>",
      );
    }
  }

  // Update shop bigbox image per language with WebP first, then PNG fallback
  const shopImg = document.getElementById("shopBigboxImage");
  if (shopImg) {
    const frPng = "images/bannieres web - boutique_boutique-bigbox-fr_qc.png";
    const enPng = "images/bannieres web - boutique_boutique-bigbox-en_qc.png";
    const basePng = currentLanguage === "en" ? enPng : frPng;
    const baseWebp = basePng.replace(".png", ".webp");
    if (shopImg.getAttribute("src") !== baseWebp) {
      shopImg.setAttribute("src", baseWebp);
    }
    // Ensure a working fallback if an asset fails to load
    shopImg.onerror = function onShopErrFirst() {
      shopImg.onerror = function onShopErrSecond() {
        const altPng = basePng === frPng ? enPng : frPng;
        if (shopImg.getAttribute("src") !== altPng) {
          shopImg.setAttribute("src", altPng);
        } else {
          const container = shopImg.closest(".shop-bigbox");
          if (container) container.style.display = "none";
        }
      };
      if (shopImg.getAttribute("src") !== basePng) {
        shopImg.setAttribute("src", basePng);
      }
    };
  }

  // Update Animated Course placeholder using Vimeo thumbnail (with local fallback)
  // No poster to update when iframe is used by default

  // Update elevation value formatting per language
  try {
    const elevationValueEl = document.querySelector(
      ".course-stats .stat-card-4 .stat-value",
    );
    if (elevationValueEl) {
      elevationValueEl.textContent =
        currentLanguage === "en" ? "4573 m" : "4 573 m";
    }
    const lapValueEl = document.querySelector(
      ".course-stats .stat-card-1 .stat-value",
    );
    if (lapValueEl) {
      lapValueEl.textContent = currentLanguage === "en" ? "12.3 km" : "12,3 km";
    }
    const totalDistanceEl = document.querySelector(
      ".course-stats .stat-card-3 .stat-value",
    );
    if (totalDistanceEl) {
      totalDistanceEl.textContent =
        currentLanguage === "en" ? "209.1 km" : "209,1 km";
    }
  } catch (_) {}

  // Update EKOI contest bigbox image per language with WebP first, then JPG fallback
  const ekoiImg = document.getElementById("ekoiBigboxImage");
  const ekoiLink = document.getElementById("ekoiBigboxLink");
  const ekoiBtn = document.getElementById("ekoiBigboxBtn");
  if (ekoiImg) {
    const frEkoiJpg = "images/concours_ekoi_fr.jpg";
    const enEkoiJpg = "images/concours_ekoi_en.jpg";
    const baseJpg = currentLanguage === "en" ? enEkoiJpg : frEkoiJpg;
    const baseWebp = baseJpg.replace(".jpg", ".webp");
    if (ekoiImg.getAttribute("src") !== baseWebp) {
      ekoiImg.setAttribute("src", baseWebp);
    }
    ekoiImg.onerror = function onEkoiErrFirst() {
      ekoiImg.onerror = function onEkoiErrSecond() {
        const altJpg = baseJpg === frEkoiJpg ? enEkoiJpg : frEkoiJpg;
        if (ekoiImg.getAttribute("src") !== altJpg) {
          ekoiImg.setAttribute("src", altJpg);
        } else {
          const container = ekoiImg.closest(".edika-bigbox");
          if (container) container.style.display = "none";
        }
      };
      if (ekoiImg.getAttribute("src") !== baseJpg) {
        ekoiImg.setAttribute("src", baseJpg);
      }
    };
  }

  // Update EKOI links (FR/EN) per language
  if (ekoiLink || ekoiBtn) {
    const frEkoiUrl =
      "https://www.ekoi.com/fr-ca/content/1267-jeu-concours-ekoi-grand-prix-cyclistes-de-quebec-et-de-montreal?utm_source=ban-grand-prix-quebec&utm_medium=ban&utm_campaign=ads-grand-prix-quebec-jc-0925&utm_id=ads-grand-prix-quebec-jc";
    const enEkoiUrl =
      "https://www.ekoi.com/en-ca/content/1267-contest-game-ekoi-grand-prix-cyclists-of-quebec-and-montreal?utm_source=ban-grand-prix-quebec&utm_medium=ban&utm_campaign=ads-grand-prix-quebec-jc-0925&utm_id=ads-grand-prix-quebec-jc";
    const targetUrl = currentLanguage === "en" ? enEkoiUrl : frEkoiUrl;
    if (ekoiLink && ekoiLink.getAttribute("href") !== targetUrl) {
      ekoiLink.setAttribute("href", targetUrl);
    }
    if (ekoiBtn && ekoiBtn.getAttribute("href") !== targetUrl) {
      ekoiBtn.setAttribute("href", targetUrl);
    }
  }

  // Update Silent Auction bigbox image per language with WebP first, then PNG fallback
  const auctionImg = document.getElementById("auctionBigboxImage");
  if (auctionImg) {
    const frAuctionPng = "images/encan_FR.png";
    const enAuctionPng = "images/encan_EN.png";
    const basePng = currentLanguage === "en" ? enAuctionPng : frAuctionPng;
    const baseWebp = basePng.replace(".png", ".webp");
    if (auctionImg.getAttribute("src") !== baseWebp) {
      auctionImg.setAttribute("src", baseWebp);
    }
    auctionImg.onerror = function onAuctionErrFirst() {
      auctionImg.onerror = function onAuctionErrSecond() {
        const altPng = basePng === frAuctionPng ? enAuctionPng : frAuctionPng;
        if (auctionImg.getAttribute("src") !== altPng) {
          auctionImg.setAttribute("src", altPng);
        } else {
          const container = auctionImg.closest(".edika-bigbox");
          if (container) container.style.display = "none";
        }
      };
      if (auctionImg.getAttribute("src") !== basePng) {
        auctionImg.setAttribute("src", basePng);
      }
    };
  }

  // Update Edika contest bigbox image per language with WebP first, then PNG fallback
  const edikaImg = document.getElementById("edikaBigboxImage");
  if (edikaImg) {
    const frEdikaPng = "images/concoursedika__300x250-fr.png";
    const enEdikaPng = "images/concoursedika__300x250-en.png";
    const basePng = currentLanguage === "en" ? enEdikaPng : frEdikaPng;
    const baseWebp = basePng.replace(".png", ".webp");
    if (edikaImg.getAttribute("src") !== baseWebp) {
      edikaImg.setAttribute("src", baseWebp);
    }
    edikaImg.onerror = function onEdikaErrFirst() {
      edikaImg.onerror = function onEdikaErrSecond() {
        const altPng = basePng === frEdikaPng ? enEdikaPng : frEdikaPng;
        if (edikaImg.getAttribute("src") !== altPng) {
          edikaImg.setAttribute("src", altPng);
        } else {
          const container = edikaImg.closest(".edika-bigbox");
          if (container) container.style.display = "none";
        }
      };
      if (edikaImg.getAttribute("src") !== basePng) {
        edikaImg.setAttribute("src", basePng);
      }
    };
  }
}

// Smooth Scroll
function initSmoothScroll() {
  // Intercepter les clics d'ancre pour appliquer un offset lié au header sticky
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothScrollWithOffset(target);
        if (typeof gtag !== "undefined") {
          gtag("event", "navigation", { nav_target: href });
        }
      }
    });
  });

  // Si la page se charge avec un hash, réaligner avec offset après rendu
  if (location.hash && location.hash.length > 1) {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => smoothScrollWithOffset(target, 0), 0);
    }
  }
}

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  smoothScrollWithOffset(section);
  // Track scroll action
  if (typeof gtag !== "undefined") {
    gtag("event", "scroll_to_section", { section: sectionId });
  }
}

// Défilement avec offset pour header sticky
function smoothScrollWithOffset(targetElement, extraOffset = 8) {
  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;
  const targetY =
    targetElement.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    extraOffset;
  window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
}

// Replace animated course placeholder with Vimeo iframe (language-aware)
function loadAnimatedVideo() {
  try {
    const embed = document.getElementById("animatedVideoEmbed");
    if (!embed) return;
    const frVideo =
      "https://player.vimeo.com/video/1110556490?title=0&byline=0&portrait=0";
    const enVideo =
      "https://player.vimeo.com/video/1112334365?title=0&byline=0&portrait=0";
    const src = currentLanguage === "en" ? enVideo : frVideo;
    embed.innerHTML =
      '<iframe src="' +
      src +
      '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe>';
  } catch (_) {}
}

// Online/Offline Status
function updateOnlineStatus() {
  const offlineIndicator = document.getElementById("offlineIndicator");
  if (offlineIndicator) {
    if (navigator.onLine) {
      offlineIndicator.classList.add("hidden");
      // Reload dynamic content if coming back online
      loadWeather();
      loadInstagramFeed();
    } else {
      offlineIndicator.classList.remove("hidden");
    }
  }
}

// Close Install Prompt
function closeInstallPrompt() {
  const prompt = document.getElementById("installPrompt");
  if (prompt) {
    prompt.classList.add("hidden");
    localStorage.setItem("installPromptDismissed", "true");
    localStorage.setItem("installPromptDismissedTime", Date.now().toString());

    // Track dismissal
    if (typeof gtag !== "undefined") {
      gtag("event", "install_prompt_dismissed", {
        event_category: "PWA",
      });
    }
  }
}

// Make closeInstallPrompt globally available immediately
window.closeInstallPrompt = closeInstallPrompt;

// Desktop Warning Modal Functions
function showDesktopWarningModal() {
  // Force check current window width (not just initial load)
  const isDesktopNow = window.innerWidth > 768;

  if (!isDesktopNow) {
    return; // Don't show on mobile
  }

  const modal = document.getElementById("desktopWarningModal");
  if (!modal) {
    console.error("Desktop warning modal not found in DOM");
    return;
  }

  // Check if user has already dismissed the warning
  const warningDismissed = localStorage.getItem("desktopWarningDismissed");
  if (warningDismissed) {
    return; // Already dismissed
  }

  // FORCE: Hide any install prompts first
  const installPrompt = document.getElementById("installPrompt");
  if (installPrompt) {
    installPrompt.classList.add("hidden");
  }
  const iosInstallPrompt = document.getElementById("iosInstallPrompt");
  if (iosInstallPrompt) {
    iosInstallPrompt.classList.add("hidden");
  }

  // Show the modal
  modal.classList.remove("hidden");
  console.log(
    "Desktop warning modal shown (window width:",
    window.innerWidth,
    "px)",
  );
}

function closeDesktopWarningModal() {
  const modal = document.getElementById("desktopWarningModal");
  if (modal) {
    modal.classList.add("hidden");
    localStorage.setItem("desktopWarningDismissed", "true");
    console.log("Desktop warning modal closed and dismissed");
  }
}

// Make functions globally available immediately
window.showDesktopWarningModal = showDesktopWarningModal;
window.closeDesktopWarningModal = closeDesktopWarningModal;

// Test function to manually show desktop warning (for debugging)
window.testDesktopWarning = function () {
  console.log("=== MANUAL DESKTOP WARNING TEST ===");
  console.log("Window width:", window.innerWidth, "px");
  console.log("APP_CONFIG.isMobile:", APP_CONFIG.isMobile);
  console.log(
    "localStorage.desktopWarningDismissed:",
    localStorage.getItem("desktopWarningDismissed"),
  );

  // Clear dismissal for testing
  localStorage.removeItem("desktopWarningDismissed");
  console.log("Cleared localStorage dismissal");

  // Force show modal
  const modal = document.getElementById("desktopWarningModal");
  if (modal) {
    modal.classList.remove("hidden");
    console.log("Modal shown manually");
  } else {
    console.error("Modal not found!");
  }
};

// Functions are now exported immediately in exportCriticalFunctions()

// Lazy load third-party content for mobile performance
if (navigator.onLine && !APP_CONFIG.isMobile) {
  // Only on desktop or fast connections
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 2000)))(() => {
    if (typeof loadWeather === "function") loadWeather();
    if (typeof loadInstagramFeed === "function") loadInstagramFeed();
  });
} else if (navigator.onLine) {
  // Mobile: delay more for performance
  setTimeout(() => {
    if (typeof loadWeather === "function") loadWeather();
  }, 1500);
  setTimeout(() => {
    if (typeof loadInstagramFeed === "function") loadInstagramFeed();
  }, 3000);
}
