// === GPCQM 2025 PWA - Express Server for Railway ===

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
// const multer = require('multer'); // DÉSACTIVÉ - Plus d'upload de maillots
// Ensure fetch is available on Node < 18
const fetch = global.fetch || ((...args) => import('node-fetch').then(({ default: f }) => f(...args)));
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// Basic auth for /cms
const BASIC_USER = process.env.CMS_USER || 'admin';
const BASIC_PASS = process.env.CMS_PASS || 'Axelle20';
function basicAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const [scheme, encoded] = header.split(' ');
    if (scheme !== 'Basic' || !encoded) {
        res.set('WWW-Authenticate', 'Basic realm="CMS"');
        return res.status(401).send('Authentication required');
    }
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
    if (user === BASIC_USER && pass === BASIC_PASS) return next();
    res.set('WWW-Authenticate', 'Basic realm="CMS"');
    return res.status(401).send('Invalid credentials');
}

// Security middleware (disable helmet CSP to manage it manually per-route)
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
// Default CSP for the app - DÉSACTIVÉE TEMPORAIREMENT POUR DEBUG
function setDefaultCspHeaders(res) {
    // CSP COMPLÈTEMENT DÉSACTIVÉE pour identifier le problème
    // res.setHeader('Content-Security-Policy', [
    //     "default-src 'self'",
    //     "img-src 'self' data: https: http:",
    //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    //     "font-src 'self' https://fonts.gstatic.com",
    //     "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://snapwidget.com",
    //     "connect-src 'self' https://api.openweathermap.org https://api.weather.gc.ca https://graph.instagram.com https://www.google-analytics.com",
    //     "frame-src 'self' https://player.vimeo.com https://www.youtube.com https://www.google.com https://www.google.ca https://snapwidget.com",
    //     "child-src 'self' https://player.vimeo.com https://www.youtube.com https://www.google.com https://www.google.ca https://snapwidget.com",
    //     "object-src 'none'",
    //     "media-src 'self' https://player.vimeo.com https://vimeo.com",
    //     "script-src-attr 'unsafe-inline'"
    // ].join('; '));
}

// Apply CSP per request
app.use((req, res, next) => {
    if (req.path.startsWith('/cms')) {
        setCmsCspHeaders(res);
    } else {
        setDefaultCspHeaders(res);
    }
    next();
});

// Enable CORS
app.use(cors());

// Compression for better performance
app.use(compression());

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    const url = req.originalUrl || req.url || req.path;
    console.log(`${new Date().toISOString()} - ${req.method} ${url}`);
    next();
});

// Cache control for static assets
const setCache = (req, res, next) => {
    const isDev = (process.env.NODE_ENV || 'production') === 'development';
    const period = req.path.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/i) ? '1y' :
                   req.path.match(/\.(css|js)$/i) ? '1d' : '1h';

    if (req.method === 'GET') {
        if (isDev || req.path.startsWith('/cms')) {
            // In development, disable caching for quicker feedback
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.set('Pragma', 'no-cache');
            res.set('Expires', '0');
        } else {
            res.set('Cache-Control', `public, max-age=${period === '1y' ? 31536000 : period === '1d' ? 86400 : 3600}`);
        }
    }
    next();
};

// IMPORTANT: Apply Basic Auth for /cms routes BEFORE serving static files
app.use((req, res, next) => {
    // Check if the request is for /cms or any subpath
    if (req.path.startsWith('/cms')) {
        return basicAuth(req, res, next);
    }
    next();
});

// IMPORTANT: Route riders.json AVANT le middleware static pour pouvoir modifier les données
app.get('/riders.json', async (req, res) => {
    console.log('GET /riders.json - Processing');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    try {
        // Lire le fichier riders.json
        const raw = await fs.readFile(RIDERS_JSON_FILE, 'utf8');
        const data = JSON.parse(raw);
        
        // REMPLACER TOUS les chemins des maillots par les bons chemins officiels
        if (data && data.teams && Array.isArray(data.teams)) {
            data.teams = data.teams.map(team => {
                const newPath = getLocalJerseyPath(team.name, team.displayName);
                return {
                    ...team,
                    jerseyPath: newPath
                };
            });
        }
        
        return res.type('application/json').send(JSON.stringify(data));
    } catch (e) {
        // Si erreur, essayer le fichier de fallback
        try {
            const raw = await fs.readFile(path.join(__dirname, 'riders.json'), 'utf8');
            const data = JSON.parse(raw);
            
            if (data && data.teams && Array.isArray(data.teams)) {
                data.teams = data.teams.map(team => ({
                    ...team,
                    jerseyPath: getLocalJerseyPath(team.name, team.displayName)
                }));
            }
            
            return res.type('application/json').send(JSON.stringify(data));
        } catch (fallbackError) {
            console.error('Error serving riders.json:', fallbackError);
            return res.status(404).json({ error: 'riders_json_not_found' });
        }
    }
});

// Serve static files with caching (AFTER auth check)
app.use(setCache);
app.use((req, res, next) => {
    // Skip global static handling for CMS paths to avoid directory redirect caching
    if (req.path.startsWith('/cms')) return next();
    return express.static(path.join(__dirname), {
        etag: true,
        lastModified: true,
        redirect: false,
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            }
            if (filePath.endsWith('sw.js')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
            if (filePath.endsWith('riders.json')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
        }
    })(req, res, next);
});

// =============================
// CMS Data Helpers & Endpoints
// =============================

// Paths (persistant sur volume Railway si dispo)
const IS_RAILWAY = Boolean(process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_ENVIRONMENT_NAME || process.env.RAILWAY_PROJECT_ID);
const CMS_JERSEYS_DIR = process.env.CMS_JERSEYS_DIR || (IS_RAILWAY ? '/data/jerseys' : path.join(__dirname, 'images', 'jerseys'));
const DATA_BASE_DIR = IS_RAILWAY ? '/data/_data' : path.join(__dirname, 'cms');
const TEAMS_DATA_FILE = path.join(DATA_BASE_DIR, 'teams-data.json');
const TEAMS_COMPLETE_FILE = path.join(__dirname, 'cms', 'teams-complete.json');
const RIDERS_JSON_FILE = path.join(__dirname, 'riders.json');
const RIDERS_JS_FILE = path.join(__dirname, 'listeengages-package', 'listeengages', 'js', 'riders.js');

// Serve persistent jerseys directory with graceful placeholder fallback
const PLACEHOLDER_JERSEY_FILE = path.join(__dirname, 'listeengages-package', 'listeengages', 'images', 'jerseys', 'jersey-placeholder.svg');
const REPO_JERSEYS_DIR = path.join(__dirname, 'images', 'jerseys');
const PACKAGE_JERSEYS_DIR = path.join(__dirname, 'listeengages-package', 'listeengages', 'images', 'jerseys');

function getLocalJerseyPath(teamName, displayName) {
    const name = String(displayName || teamName || '').toLowerCase();
    const base = '/listeengages-package/listeengages/images/jerseys/';
    const pair = [
        [/uae|emirates/, 'emirates.png'],
        [/lidl|trek/, 'lidltrek.png'],
        [/visma|lease a bike/, 'visma.png'],
        [/ineos/, 'ineos.png'],
        [/soudal|quick/, 'soudal.png'],
        [/decathlon|ag2r/, 'decathlon.png'],
        [/red\s*bull|bora/, 'redbullbora.png'],
        [/alpecin/, 'alpecin.png'],
        [/groupama|fdj/, 'groupama.png'],
        [/ef|education/, 'ef.png'],
        [/bahrain/, 'bahrain.png'],
        [/movistar/, 'movistar.png'],
        [/jayco/, 'jayco.png'],
        [/arkea|arkéa/, 'arkea.png'],
        [/lotto|dstny/, 'lotto.png'],
        [/picnic|postnl|dsm/, 'picnic.png'],
        [/intermarche|intermarché|wanty/, 'intermarchewanty.png'],
        [/cofidis/, 'cofidis.png'],
        [/astana/, 'astana.png'],
        [/israel|premier\s*tech|ipt/, 'ipt.png'],
        [/uno\s*-?x|uno\sx/, 'uno.png'],
        [/tudor/, 'tudor.png'],
        [/canada|équipe nationale/, 'canada.png']
    ];
    for (const [re, file] of pair) {
        if (re.test(name)) return base + file;
    }
    return base + 'jersey-placeholder.svg';
}

// DÉSACTIVÉ - Cette route servait les mauvais maillots
/*
app.get('/images/jerseys/:file', async (req, res) => {
    // Route désactivée
});
*/

// DÉSACTIVÉ - Les maillots viennent du dossier officiel
// app.use('/images/jerseys', express.static(CMS_JERSEYS_DIR));

// Multer storage for jersey uploads - DÉSACTIVÉ
// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         // Upload désactivé - retourner une erreur
//         cb(new Error('Upload de maillots désactivé'), null);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// Utility: append cache-buster to asset URL (prevents stale jersey images)
function appendCacheBusterToUrl(url) {
    try {
        if (!url || typeof url !== 'string') return url;
        const now = Date.now();
        // Replace existing t= param, otherwise append
        if (url.includes('t=')) {
            return url.replace(/([?&])t=\d+/g, `$1t=${now}`);
        }
        return url + (url.includes('?') ? `&t=${now}` : `?t=${now}`);
    } catch (_) {
        return url;
    }
}

// Convert flags <-> codes (minimal maps to cover known cases)
function convertCountryCodeToFlag(code) {
    if (!code || typeof code !== 'string') return '';
    const map = {
        FRA: '🇫🇷', USA: '🇺🇸', GBR: '🇬🇧', GER: '🇩🇪', DEU: '🇩🇪',
        ITA: '🇮🇹', ESP: '🇪🇸', BEL: '🇧🇪', NED: '🇳🇱', NLD: '🇳🇱',
        AUS: '🇦🇺', CAN: '🇨🇦', NOR: '🇳🇴', DEN: '🇩🇰', DNK: '🇩🇰',
        SUI: '🇨🇭', CHE: '🇨🇭', AUT: '🇦🇹', POL: '🇵🇱', POR: '🇵🇹',
        PRT: '🇵🇹', CZE: '🇨🇿', SVK: '🇸🇰', SLO: '🇸🇮', SVN: '🇸🇮',
        HUN: '🇭🇺', ROU: '🇷🇴', RUS: '🇷🇺', UKR: '🇺🇦', SWE: '🇸🇪',
        FIN: '🇫🇮', EST: '🇪🇪', LAT: '🇱🇻', LTU: '🇱🇹', IRL: '🇮🇪',
        LUX: '🇱🇺', COL: '🇨🇴', ARG: '🇦🇷', BRA: '🇧🇷', MEX: '🇲🇽',
        JPN: '🇯🇵', KOR: '🇰🇷', CHN: '🇨🇳', NZL: '🇳🇿', RSA: '🇿🇦',
        UAE: '🇦🇪', KAZ: '🇰🇿', ISR: '🇮🇱', ECU: '🇪🇨', ERI: '🇪🇷',
        CRO: '🇭🇷', HRV: '🇭🇷', BHR: '🇧🇭', BIH: '🇧🇦'
    };
    return map[code.toUpperCase()] || '';
}

function convertFlagToCountryCode(flag) {
    if (!flag || typeof flag !== 'string') return '';
    const map = {
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
    return map[flag] || '';
}

async function readTeamsData() {
    try {
        await fs.mkdir(path.dirname(TEAMS_DATA_FILE), { recursive: true }).catch(()=>{});
        const data = await fs.readFile(TEAMS_DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        try {
            // Try complete teams file first (if provided)
            const completeRaw = await fs.readFile(TEAMS_COMPLETE_FILE, 'utf8');
            const complete = JSON.parse(completeRaw);
            if (Array.isArray(complete) && complete.length) {
                return complete;
            }
        } catch (e) {
            // ignore
        }
        try {
            const ridersData = await fs.readFile(RIDERS_JSON_FILE, 'utf8');
            const parsed = JSON.parse(ridersData);
            if (!parsed.teams) return [];
            // Normalize from riders.json
            const seen = new Set();
            return parsed.teams.reduce((acc, team) => {
                const teamName = team.name || team.displayName || '';
                if (seen.has(teamName)) return acc;
                seen.add(teamName);
                const riders = Array.isArray(team.riders) ? team.riders
                    .filter(r => r.name && !String(r.name).includes('TEAM') && String(r.name).trim() !== '')
                    .map(r => ({ number: r.number || '', name: r.name, country: convertCountryCodeToFlag(r.country) || r.country || '' }))
                    .slice(0, 7) : [];
                acc.push({
                    id: team.id || Date.now() + Math.random(),
                    name: teamName,
                    displayName: team.displayName || teamName,
                    riders,
                    jerseyPath: team.jerseyPath || ''
                });
                return acc;
            }, []);
        } catch (err) {
            return [];
        }
    }
}

async function updateRidersJson(teams) {
    const ridersData = {
        teams: teams.map(team => ({
            id: team.id,
            name: team.name,
            displayName: team.displayName,
            jerseyPath: team.jerseyPath || '',
            riders: (team.riders || []).map(r => ({
                number: r.number,
                name: r.name,
                country: convertFlagToCountryCode(r.country) || r.country || ''
            }))
        }))
    };
    await fs.writeFile(RIDERS_JSON_FILE, JSON.stringify(ridersData, null, 2));
}

async function updateRidersJs(teams) {
    const jsContent = `// === GPCQM 2025 - Riders Modal Management ===
// Généré automatiquement par le CMS - ${new Date().toISOString()}

// Données officielles des équipes et coureurs GPCQM 2025
const ridersData = {
    teams: ${JSON.stringify(teams.map(team => ({
        id: team.id,
        name: team.name,
        displayName: team.displayName,
        jerseyPath: team.jerseyPath || '',
        riders: team.riders || []
    })), null, 4)}
};

// Le reste du code JavaScript reste inchangé...
`;

    try {
        const existingContent = await fs.readFile(RIDERS_JS_FILE, 'utf8');
        const startIndex = existingContent.indexOf('const ridersData');
        const endIndex = existingContent.indexOf('};', startIndex) + 2;
        if (startIndex !== -1 && endIndex > startIndex) {
            const preserved = existingContent.substring(endIndex);
            await fs.writeFile(RIDERS_JS_FILE, jsContent + preserved);
        } else {
            await fs.writeFile(RIDERS_JS_FILE, jsContent);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de riders.js:', error);
    }
}

async function saveTeamsData(teams) {
    // Ensure jersey paths include a cache-buster to avoid stale caches in clients
    const teamsWithBusters = Array.isArray(teams) ? teams.map(team => ({
        ...team,
        jerseyPath: team && team.jerseyPath ? appendCacheBusterToUrl(team.jerseyPath) : team?.jerseyPath
    })) : teams;

    await fs.mkdir(path.dirname(TEAMS_DATA_FILE), { recursive: true });
    await fs.writeFile(TEAMS_DATA_FILE, JSON.stringify(teamsWithBusters, null, 2));
    await updateRidersJson(teamsWithBusters);
    await updateRidersJs(teamsWithBusters);
}

// CMS API routes
app.get('/api/teams', async (req, res) => {
    try {
        const teams = await readTeamsData();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

app.post('/api/teams', async (req, res) => {
    try {
        const teams = req.body;
        await saveTeamsData(teams);
        res.json({ success: true, message: 'Données sauvegardées avec succès' });
    } catch (error) {
        console.error('Save teams error:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde des données' });
    }
});

app.get('/api/teams/:id', async (req, res) => {
    try {
        const teams = await readTeamsData();
        const team = teams.find(t => t.id == req.params.id);
        if (team) return res.json(team);
        res.status(404).json({ error: "Équipe non trouvée" });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

app.put('/api/teams/:id', async (req, res) => {
    try {
        const teams = await readTeamsData();
        const index = teams.findIndex(t => t.id == req.params.id);
        if (index === -1) return res.status(404).json({ error: "Équipe non trouvée" });
        teams[index] = { ...teams[index], ...req.body };
        await saveTeamsData(teams);
        res.json({ success: true, team: teams[index] });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
});

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

// Upload de maillots DÉSACTIVÉ - Les maillots sont gérés uniquement depuis le dossier officiel
app.post('/api/upload-jersey', (req, res) => {
    res.status(403).json({ 
        error: "L'upload de maillots est désactivé. Les maillots proviennent uniquement du dossier officiel." 
    });
});

// Optional endpoint used by cms-app.js (sauvegarde riders.json brute)
app.post('/api/riders-json', async (req, res) => {
    try {
        await fs.writeFile(RIDERS_JSON_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de riders.json' });
    }
});

// Route déplacée plus bas après le middleware static

// CMS routes are handled below after CSP setup

// Relaxed CSP for CMS (allows inline handlers used in cms.html/js)
function setCmsCspHeaders(res) {
    try { res.removeHeader('Content-Security-Policy'); } catch (_) {}
    res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "img-src 'self' data: https: http:",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "script-src 'self' 'unsafe-inline'",
        "script-src-attr 'unsafe-inline'"
    ].join('; '));
}

// Serve CMS HTML with proper CSP headers
app.get('/cms', (req, res) => {
    setCmsCspHeaders(res);
    res.sendFile(path.join(__dirname, 'cms.html'));
});

app.get('/cms/', (req, res) => {
    setCmsCspHeaders(res);
    res.sendFile(path.join(__dirname, 'cms.html'));
});

// Serve CMS static files with relaxed CSP headers
app.use('/cms', (req, res, next) => {
    setCmsCspHeaders(res);
    express.static(path.join(__dirname, 'cms'))(req, res, next);
});

// Weather proxy endpoints (hide API key and centralize calls)
app.get('/api/weather/current', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY || '27fd496c6cc9c8cd6f8981bf682c5dd4';
        if (!apiKey) return res.status(503).json({ error: 'Weather service not configured' });

        const lat = parseFloat(req.query.lat) || 45.5019; // Montréal
        const lon = parseFloat(req.query.lon) || -73.5674;
        const units = (req.query.units || 'metric');
        const lang = (req.query.lang || 'fr');

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;
        let r;
        try {
            if (typeof AbortController !== 'undefined') {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 5000);
                r = await fetch(url, { signal: controller.signal });
                clearTimeout(timer);
            } else {
                r = await fetch(url);
            }
        } catch (e) {
            console.error('OWM current fetch error:', e);
            return res.status(502).json({ error: 'owm_current_fetch_error' });
        }
        if (!r.ok) {
            const text = await r.text().catch(() => '');
            console.error('OWM current failed:', r.status, text);
            return res.status(r.status).json({ error: 'owm_current_failed' });
        }
        const json = await r.json();
        return res.json(json);
    } catch (error) {
        console.error('Weather API error:', error);
        return res.status(500).json({ error: 'weather_current_failed' });
    }
});

// Weather hourly forecast proxy (One Call 3.0 puis 2.5)
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY || '27fd496c6cc9c8cd6f8981bf682c5dd4';
        if (!apiKey) return res.status(503).json({ error: 'Weather service not configured' });

        const lat = parseFloat(req.query.lat) || 45.5019;
        const lon = parseFloat(req.query.lon) || -73.5674;
        const units = (req.query.units || 'metric');
        const lang = (req.query.lang || 'fr');

        // Utiliser l'API forecast standard au lieu de onecall (qui nécessite un abonnement)
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();
        
        // Transformer les données de l'API forecast en format hourly
        const hourly = data.list.slice(0, 6).map(item => ({
            dt: item.dt,
            main: { 
                temp: item.main.temp, 
                feels_like: item.main.feels_like 
            },
            weather: item.weather || []
        }));
        
        return res.json({ hourly, timezone_offset: 0 });
    } catch (error) {
        console.error('Weather forecast error:', error);
        return res.status(500).json({ error: 'weather_forecast_failed' });
    }
});

// Instagram feed proxy (to hide access token)
app.get('/api/instagram/feed', async (req, res) => {
    try {
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
        if (!accessToken) {
            return res.status(503).json({ error: 'Instagram service not configured' });
        }
        
        // Implementation would fetch from Instagram API
        // For now, return mock data
        res.json({
            data: [
                {
                    id: '1',
                    caption: 'Grand Prix Cycliste de Montréal 2025!',
                    media_url: 'https://via.placeholder.com/400',
                    permalink: 'https://instagram.com/grandsprixcyclistes',
                    like_count: 342,
                    comments_count: 28
                }
            ]
        });
    } catch (error) {
        console.error('Instagram API error:', error);
        res.status(500).json({ error: 'Failed to fetch Instagram feed' });
    }
});

// Race status endpoint
app.get('/api/race-status', (req, res) => {
    const now = new Date();
    const raceDate = new Date('2025-09-14T10:15:00-04:00');
    
    let status = 'upcoming';
    if (now >= raceDate && now <= new Date('2025-09-14T16:00:00-04:00')) {
        status = 'live';
    } else if (now > new Date('2025-09-14T16:00:00-04:00')) {
        status = 'finished';
    }
    
    res.json({
        status,
        raceDate: raceDate.toISOString(),
        lastUpdated: now.toISOString()
    });
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
    res.json({
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpuUsage: process.cpuUsage(),
        timestamp: new Date().toISOString()
    });
});

// SEO: Robots and Sitemap (dynamic based on request host)
function getBaseUrl(req) {
    const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'https');
    const host = (req.headers['x-forwarded-host'] || req.get('host'));
    return `${proto}://${host}`;
}

app.get('/robots.txt', (req, res) => {
    try {
        const baseUrl = getBaseUrl(req);
        const lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /cms',
            'Disallow: /api',
            `Sitemap: ${baseUrl}/sitemap.xml`
        ];
        res.type('text/plain').send(lines.join('\n'));
    } catch (e) {
        res.type('text/plain').send('User-agent: *\nAllow: /');
    }
});

app.get('/sitemap.xml', (req, res) => {
    try {
        const baseUrl = getBaseUrl(req);
        const urls = [
            '/',
            '/offline.html'
        ];
        const now = new Date().toISOString();
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
            urls.map(u => (
                `\n  <url>\n    <loc>${baseUrl}${u}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${u === '/' ? '1.0' : '0.5'}</priority>\n    <lastmod>${now}</lastmod>\n  </url>`
            )).join('') +
            `\n</urlset>`;
        res.type('application/xml').send(body);
    } catch (e) {
        res.status(500).type('text/plain').send('sitemap unavailable');
    }
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'offline.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ========================================
    🚴 GPCQM 2025 PWA Server
    ========================================
    Server running on port ${PORT}
    Environment: ${process.env.NODE_ENV || 'production'}
    URL: http://localhost:${PORT}
    ========================================
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = app;