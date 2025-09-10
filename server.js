// === GPCQ 2025 PWA - Express Server for Railway ===

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// Early import for file checks
const fsEarly = require('fs');

// Security middleware - adjusted for Safari iOS compatibility
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://snapwidget.com"],
            imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
            connectSrc: ["'self'", "https://api.openweathermap.org", "https://api.weather.gc.ca", "https://graph.instagram.com", "https://www.google-analytics.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'", "https://player.vimeo.com", "https://vimeo.com"],
            frameSrc: ["'self'", "https://player.vimeo.com", "https://www.youtube.com", "https://www.youtube-nocookie.com", "https://www.google.com", "https://www.google.ca", "https://snapwidget.com"],
            childSrc: ["'self'", "https://player.vimeo.com", "https://www.youtube.com", "https://www.youtube-nocookie.com", "https://www.google.com", "https://www.google.ca", "https://snapwidget.com"],
        },
    },
    crossOriginEmbedderPolicy: false,
    // Relax some policies for Safari iOS
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: false // Safari iOS can have issues with preload
    }
}));

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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware (include worker id)
app.use((req, res, next) => {
    const url = req.originalUrl || req.url || req.path;
    const wid = process.env.WORKER_ID || 'primary';
    console.log(`${new Date().toISOString()} [worker:${wid}] ${req.method} ${url}`);
    next();
});

// EARLY OVERRIDE: always serve persisted riders.json BEFORE static
try {
    const isRailwayEarly = !!process.env.RAILWAY_PUBLIC_DOMAIN || !!process.env.RAILWAY_ENVIRONMENT || !!process.env.RAILWAY_STATIC_URL;
    const cmsBaseDirEarly = process.env.CMS_DATA_DIR || (isRailwayEarly ? '/data/cms' : path.join(__dirname, 'cms-data'));
    const ridersFileEarly = path.join(cmsBaseDirEarly, 'riders.json');
    app.get('/riders.json', (req, res, next) => {
        try {
            if (fsEarly.existsSync(ridersFileEarly)) {
                res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
                return res.sendFile(ridersFileEarly);
            }
        } catch(_) { /* fallthrough to static/late route */ }
        return next();
    });
} catch(_) {}

// Cache control for static assets
const setCache = (req, res, next) => {
    const isDev = (process.env.NODE_ENV || 'production') === 'development';
    const period = req.path.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/i) ? '1y' :
                   req.path.match(/\.(css|js)$/i) ? '1d' : '1h';

    if (req.method === 'GET') {
        if (isDev) {
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

// Serve static files with caching
app.use(setCache);
app.use(express.static(path.join(__dirname), {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
        if (path.endsWith('sw.js')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
        // Strong caching for images (immutable)
        if (path.match(/\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/i)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
    }
}));

// === CMS Integration ===
const fs = require('fs').promises;
const fsSync = require('fs');

// CMS Authentication
const CMS_USER = process.env.CMS_USER || 'admin';
const CMS_PASS = process.env.CMS_PASS || 'Quebec2025';

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

// Persistent CMS data directory (supports Railway volume via CMS_DATA_DIR)
const IS_RAILWAY = !!process.env.RAILWAY_PUBLIC_DOMAIN || !!process.env.RAILWAY_ENVIRONMENT || !!process.env.RAILWAY_STATIC_URL;
const CMS_BASE_DIR = process.env.CMS_DATA_DIR || (IS_RAILWAY ? '/data/cms' : path.join(__dirname, 'cms-data'));
try { fsSync.mkdirSync(CMS_BASE_DIR, { recursive: true }); } catch(_) {}

// Initial data seeding if empty
const DEFAULT_TEAMS_FILE = path.join(__dirname, 'cms', 'teams-data.json');
const DEFAULT_RIDERS_FILE = path.join(__dirname, 'riders.json');

// Effective data files (persisted)
const TEAMS_FILE = path.join(CMS_BASE_DIR, 'teams-data.json');
const RIDERS_FILE = path.join(CMS_BASE_DIR, 'riders.json');

try {
    if (!fsSync.existsSync(TEAMS_FILE) && fsSync.existsSync(DEFAULT_TEAMS_FILE)) {
        fsSync.copyFileSync(DEFAULT_TEAMS_FILE, TEAMS_FILE);
    } else if (!fsSync.existsSync(TEAMS_FILE)) {
        fsSync.writeFileSync(TEAMS_FILE, JSON.stringify({ teams: [] }, null, 2));
    }
    if (!fsSync.existsSync(RIDERS_FILE) && fsSync.existsSync(DEFAULT_RIDERS_FILE)) {
        fsSync.copyFileSync(DEFAULT_RIDERS_FILE, RIDERS_FILE);
    } else if (!fsSync.existsSync(RIDERS_FILE)) {
        fsSync.writeFileSync(RIDERS_FILE, JSON.stringify({ teams: [] }, null, 2));
    }
} catch (e) {
    console.warn('CMS data init warning:', e.message);
}

// Serve CMS interface
app.get('/cms', (req, res) => {
    res.sendFile(path.join(__dirname, 'cms.html'));
});

// CMS API endpoints  

// Get teams
app.get('/api/teams', async (req, res) => {
    try {
        const data = await fs.readFile(TEAMS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading teams:', error);
        res.status(500).json({ error: 'Failed to load teams' });
    }
});

// Save teams (requires auth)
app.post('/api/teams', basicAuth, async (req, res) => {
    try {
        const teams = req.body;
        
        // Save to CMS data file
        await fs.writeFile(TEAMS_FILE, JSON.stringify(teams, null, 2));
        
        // Also update riders.json
        const ridersData = { teams };
        await fs.writeFile(RIDERS_FILE, JSON.stringify(ridersData, null, 2));
        
        // Copy to listeengages directory for the UI
        const listeEngagesPath = path.join(__dirname, 'listeengages-package', 'listeengages', 'riders.json');
        await fs.writeFile(listeEngagesPath, JSON.stringify(ridersData, null, 2));
        
        // Force cache invalidation by updating a timestamp file
        const timestampPath = path.join(__dirname, 'last-update.txt');
        await fs.writeFile(timestampPath, new Date().toISOString());
        
        console.log('Teams saved successfully to all locations at', new Date().toISOString());
        res.json({ success: true, message: 'Teams saved successfully', timestamp: Date.now() });
    } catch (error) {
        console.error('Error saving teams:', error);
        res.status(500).json({ error: 'Failed to save teams' });
    }
});

// Dynamic riders.json (always serve persisted CMS version, bypass static)
app.get('/riders.json', (req, res) => {
    try {
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.sendFile(RIDERS_FILE);
    } catch (e) {
        return res.status(404).json({ error: 'Riders not found' });
    }
});

// API Routes (placeholder for future implementation)

// Handle OPTIONS preflight requests for CORS
app.options('/api/weather/*', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
        'Access-Control-Max-Age': '86400'
    });
    res.sendStatus(204);
});

// Weather proxy endpoint (to hide API key and handle CORS for Safari)
app.get('/api/weather/current', async (req, res) => {
    try {
        // Use the API key from weather.js if env var not set
        const apiKey = process.env.OPENWEATHER_API_KEY || '27fd496c6cc9c8cd6f8981bf682c5dd4';
        const lat = 45.5017; // Montréal centre-ville (Place des Arts)
        const lon = -73.5673;
        const units = 'metric';
        const lang = req.query.lang || 'fr';
        
        console.log(`Weather proxy request - lang: ${lang}, units: ${units}`);
        
        // Set CORS headers specifically for Safari - more comprehensive
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
            'Access-Control-Max-Age': '86400',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        
        // Weather caching key per lang/coords
        const cacheKey = `wx:current:${lat},${lon}:${units}:${lang}`;
        const TTL_SECONDS = Number(process.env.WEATHER_TTL_SECONDS || 900); // 15 minutes default

        const fetch = require('node-fetch');
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;

        // Try Redis cache first (do not alter Safari iOS handling; only storage layer)
        if (redis) {
            try {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    parsed.__cache = true;
                    return res.json(parsed);
                }
            } catch (e) {
                console.warn('Redis get error (weather)', e.message);
            }
        }

        console.log('Fetching from OpenWeather:', url);
        const response = await fetch(url, { timeout: 8000 });
        const data = await response.json();
        
        if (!response.ok) {
            console.error('OpenWeather API error:', data);
            return res.status(response.status).json({ error: 'Weather service error', details: data });
        }
        
        console.log('OpenWeather response:', {
            temp: data.main?.temp,
            description: data.weather?.[0]?.description,
            lang: lang
        });
        
        // Cache successful responses to reduce external calls
        if (redis) {
            try {
                await redis.set(cacheKey, JSON.stringify(data), 'EX', TTL_SECONDS);
            } catch (e) {
                console.warn('Redis set error (weather)', e.message);
            }
        }

        // Support JSONP for Safari iOS fallback (unchanged behavior)
        if (req.query.callback) {
            res.type('application/javascript');
            res.send(`${req.query.callback}(${JSON.stringify(data)})`);
        } else {
            // Return the real OpenWeatherMap data
            res.json(data);
        }
    } catch (error) {
        console.error('Weather API error:', error);
        // Return fallback data for Safari if fetch fails - in French
        const fallbackLang = req.query.lang || 'fr';
        res.json({
            main: {
                temp: 18,
                feels_like: 17,
                humidity: 65
            },
            weather: [{
                main: 'Clouds',
                description: fallbackLang === 'fr' ? 'Nuageux' : 'Cloudy',
                icon: '02d'
            }],
            wind: {
                speed: 3.5
            },
            dt: Math.floor(Date.now() / 1000),
            name: fallbackLang === 'fr' ? 'Montréal' : 'Montreal'
        });
    }
});

// Weather forecast endpoint for Safari
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY || '27fd496c6cc9c8cd6f8981bf682c5dd4';
        const lat = 45.4706;
        const lon = -73.7408;
        const units = 'metric';
        const lang = req.query.lang || 'fr';
        const cnt = 8; // Get 8 3-hour forecasts
        
        console.log(`Forecast proxy request - lang: ${lang}, units: ${units}`);
        
        // Set CORS headers
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cache-Control': 'no-cache' // Disable cache for testing
        });
        
        const fetch = require('node-fetch');
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&cnt=${cnt}&appid=${apiKey}`;

        // Cache per lang/coords
        const cacheKey = `wx:forecast:${lat},${lon}:${units}:${lang}:cnt:${cnt}`;
        const TTL_SECONDS = Number(process.env.WEATHER_TTL_SECONDS || 900);
        if (redis) {
            try {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    parsed.__cache = true;
                    return res.json(parsed);
                }
            } catch (e) {
                console.warn('Redis get error (forecast)', e.message);
            }
        }

        console.log('Fetching forecast from OpenWeather:', url);
        const response = await fetch(url, { timeout: 8000 });
        const data = await response.json();
        
        if (!response.ok) {
            console.error('OpenWeather Forecast API error:', data);
            return res.status(response.status).json({ error: 'Forecast service error', details: data });
        }
        
        console.log(`Forecast received: ${data.list?.length} items, first temp: ${data.list?.[0]?.main?.temp}`);
        
        // Transform to simpler format for the widget - keep first 6 items only
        const simplified = data.list.slice(0, 6).map(item => ({
            dt: item.dt,
            main: item.main,
            weather: item.weather
        }));
        
        // Cache successful simplified forecast
        if (redis) {
            try {
                await redis.set(cacheKey, JSON.stringify(simplified), 'EX', TTL_SECONDS);
            } catch (e) {
                console.warn('Redis set error (forecast)', e.message);
            }
        }
        res.json(simplified);
    } catch (error) {
        console.error('Forecast API error:', error);
        // Return fallback forecast in correct language
        const fallbackLang = req.query.lang || 'fr';
        const baseTime = Math.floor(Date.now() / 1000);
        const fallback = [];
        for (let i = 1; i <= 6; i++) {
            fallback.push({
                dt: baseTime + (i * 3600),
                main: { temp: 18 + (Math.random() * 4 - 2), feels_like: 17 },
                weather: [{ 
                    main: 'Clouds', 
                    description: fallbackLang === 'fr' ? 'Nuageux' : 'Cloudy', 
                    icon: '02d' 
                }]
            });
        }
        res.json(fallback);
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
    const raceDate = new Date('2025-09-12T11:00:00-04:00');
    
    let status = 'upcoming';
    if (now >= raceDate && now <= new Date('2025-09-12T16:25:00-04:00')) {
        status = 'live';
    } else if (now > new Date('2025-09-12T16:25:00-04:00')) {
        status = 'finished';
    }
    
    res.json({
        status,
        raceDate: raceDate.toISOString(),
        lastUpdated: now.toISOString()
    });
});

// Database (optional) - PostgreSQL pooling; enable only if env provided
let dbPool = null;
const dbType = (process.env.DB_TYPE || '').toLowerCase();
if (dbType === 'postgres' || process.env.DATABASE_URL) {
    try {
        const { Pool } = require('pg');
        dbPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            // High concurrency: allow 200+ pooled connections across workers
            // Tune per Railway PG plan limits
            max: Number(process.env.DB_POOL_MAX || 200),
            idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_MS || 30000),
            connectionTimeoutMillis: Number(process.env.DB_POOL_CONN_MS || 5000),
            ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : undefined
        });
        dbPool.on('error', (err) => console.error('PG pool error', err));
        console.log('PostgreSQL pool initialized');
    } catch (e) {
        console.warn('PostgreSQL not available, continuing without DB pool');
    }
}

// Health check endpoint for Railway (enhanced)
app.get('/health', async (req, res) => {
    const mem = process.memoryUsage();
    const payload = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        worker: process.env.WORKER_ID || 'primary',
        memory: {
            rss: mem.rss,
            heapTotal: mem.heapTotal,
            heapUsed: mem.heapUsed,
            external: mem.external
        },
        db: { available: false }
    };
    try {
        if (dbPool) {
            const r = await dbPool.query('SELECT 1 as ok');
            payload.db.available = true;
            payload.db.result = r.rows[0];
        }
    } catch (e) {
        payload.db.error = e.message;
    }
    res.status(200).json(payload);
});

// Worker info endpoint
app.get('/worker', (req, res) => {
    res.json({ worker: process.env.WORKER_ID || 'primary', pid: process.pid, timestamp: new Date().toISOString() });
});

// ===== Redis (Weather caching only) =====
let redis = null;
try {
    if (process.env.REDIS_URL) {
        const IORedis = require('ioredis');
        redis = new IORedis(process.env.REDIS_URL, {
            maxRetriesPerRequest: 3,
            enableAutoPipelining: true,
            lazyConnect: false
        });
        redis.on('error', (e) => console.error('Redis error', e.message));
        redis.on('connect', () => console.log('Redis connected'));
    }
} catch (e) {
    console.warn('Redis client not available');
}

// Metrics endpoint
app.get('/metrics', (req, res) => {
    res.json({
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpuUsage: process.cpuUsage(),
        timestamp: new Date().toISOString()
    });
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
    🚴 GPCQ 2025 PWA Server
    ========================================
    Server running on port ${PORT} (worker=${process.env.WORKER_ID || 'primary'})
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