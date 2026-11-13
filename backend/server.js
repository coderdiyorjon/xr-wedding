const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const {
  initDatabase,
  getDatabaseMode,
  addWish,
  getWishes,
  addRsvp,
  getRsvpStats,
  closeDatabase,
} = require('./database');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// ── Middleware ───────────────────────────────────────────────────────
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : null;

app.use(
  cors({
    origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true,
  })
);
app.use(express.json({ limit: '32kb' }));

// Simple in-memory rate limit & duplicate spam guard for wishes
const wishRateLimit = new Map();
const recentWishHashes = new Map();
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_WISHES_PER_WINDOW = 5;
const DUPLICATE_WINDOW_MS = 60 * 1000; // 1 minute

function checkSpamGuard(ip, name, message) {
  const now = Date.now();
  const timestamps = (wishRateLimit.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (timestamps.length >= MAX_WISHES_PER_WINDOW) {
    return "Iltimos, biroz kuting va qayta urinib ko'ring.";
  }

  const signature = `${name.toLowerCase()}::${message.toLowerCase()}`;
  const lastSeen = recentWishHashes.get(signature);
  if (lastSeen && now - lastSeen < DUPLICATE_WINDOW_MS) {
    return "Bu tabrik allaqachon yuborilgan.";
  }

  timestamps.push(now);
  wishRateLimit.set(ip, timestamps);
  recentWishHashes.set(signature, now);
  return null;
}

// ── Health check ────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: getDatabaseMode(),
    timestamp: new Date().toISOString(),
  });
});

// ── Wishes endpoints ────────────────────────────────────────────────

// POST /api/wishes — Submit a congratulatory message
app.post('/api/wishes', async (req, res) => {
  try {
    const { name, message, website } = req.body || {};

    // Honeypot field check against automated bots
    if (typeof website === 'string' && website.trim().length > 0) {
      return res.status(400).json({ error: "So'rov rad etildi." });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: "Iltimos, ism-familiyangizni to'liq kiriting (kamida 2 ta belgi)." });
    }
    if (name.trim().length > 80) {
      return res.status(400).json({ error: "Ism-familiya 80 ta belgidan oshmasligi kerak." });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return res.status(400).json({ error: "Iltimos, samimiy tilagingizni yozing (kamida 3 ta belgi)." });
    }
    if (message.trim().length > 600) {
      return res.status(400).json({ error: "Tilak matni 600 ta belgidan oshmasligi kerak." });
    }

    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const spamError = checkSpamGuard(clientIp, name.trim(), message.trim());
    if (spamError) {
      return res.status(429).json({ error: spamError });
    }

    const wish = await addWish({ name: name.trim(), message: message.trim() });
    res.status(201).json(wish);
  } catch (err) {
    console.error('Error adding wish:', err);
    res.status(500).json({ error: "Tilakni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring." });
  }
});

// GET /api/wishes — Get all wishes (newest first)
app.get('/api/wishes', async (_req, res) => {
  try {
    const wishes = await getWishes();
    res.json(wishes);
  } catch (err) {
    console.error('Error fetching wishes:', err);
    res.status(500).json({ error: 'Tabriklarni yuklashda xatolik yuz berdi.' });
  }
});

// ── RSVP endpoints ──────────────────────────────────────────────────

app.post('/api/rsvp', async (req, res) => {
  try {
    const { name, attending, guestCount } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Ism-familiya kiritilishi shart.' });
    }
    if (typeof attending !== 'boolean') {
      return res.status(400).json({ error: "Ishtirok etish holati noto'g'ri." });
    }
    if (guestCount !== undefined && (typeof guestCount !== 'number' || guestCount < 1)) {
      return res.status(400).json({ error: "Mehmonlar soni musbat bo'lishi kerak." });
    }

    const rsvp = await addRsvp({
      name: name.trim(),
      attending,
      guestCount: attending ? (guestCount || 1) : 0,
    });
    res.status(201).json(rsvp);
  } catch (err) {
    console.error('Error adding RSVP:', err);
    res.status(500).json({ error: "Javobni saqlashda xatolik yuz berdi." });
  }
});

app.get('/api/rsvp', async (_req, res) => {
  try {
    const stats = await getRsvpStats();
    res.json(stats);
  } catch (err) {
    console.error('Error fetching RSVP stats:', err);
    res.status(500).json({ error: "Ma'lumotlarni yuklashda xatolik yuz berdi." });
  }
});

// ── Serve Frontend Static Assets ────────────────────────────────────
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// ── Start server ────────────────────────────────────────────────────
let server = null;

async function startServer() {
  await initDatabase();
  server = app.listen(PORT, HOST, () => {
    console.log(`XR Wedding server listening on http://${HOST}:${PORT} (db: ${getDatabaseMode()})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start XR Wedding server:', err);
  process.exit(1);
});

async function handleShutdown() {
  if (server) {
    server.close();
  }
  await closeDatabase().catch(() => {});
  process.exit(0);
}

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);
