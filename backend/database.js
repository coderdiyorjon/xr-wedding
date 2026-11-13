const path = require('path');
const fs = require('fs');

let db = null;
let useMemoryFallback = false;

// Ephemeral in-memory fallback if native SQLite cannot load
const memoryWishes = [];
const memoryRsvps = [];
let memoryWishId = 1;
let memoryRsvpId = 1;

function initDatabase() {
  if (db || useMemoryFallback) return;

  try {
    const Database = require('better-sqlite3');
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'wedding.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    db.exec(`
      CREATE TABLE IF NOT EXISTS wishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        attending INTEGER NOT NULL DEFAULT 0,
        guest_count INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT (datetime('now'))
      );
    `);
  } catch (err) {
    console.warn('[Database] better-sqlite3 unavailable, using in-memory store:', err.message);
    useMemoryFallback = true;
  }
}

initDatabase();

function addWish({ name, message }) {
  const createdAt = new Date().toISOString();
  if (useMemoryFallback || !db) {
    const entry = {
      id: memoryWishId++,
      name,
      message,
      created_at: createdAt,
    };
    memoryWishes.unshift(entry);
    return entry;
  }

  const info = db
    .prepare('INSERT INTO wishes (name, message) VALUES (@name, @message)')
    .run({ name, message });
  return {
    id: Number(info.lastInsertRowid),
    name,
    message,
    created_at: createdAt,
  };
}

function getWishes() {
  if (useMemoryFallback || !db) {
    return [...memoryWishes];
  }

  return db
    .prepare('SELECT id, name, message, created_at FROM wishes ORDER BY id DESC')
    .all();
}

function addRsvp({ name, attending, guestCount }) {
  if (useMemoryFallback || !db) {
    const entry = {
      id: memoryRsvpId++,
      name,
      attending: Boolean(attending),
      guestCount: guestCount || 1,
      created_at: new Date().toISOString(),
    };
    memoryRsvps.push(entry);
    return entry;
  }

  const info = db
    .prepare('INSERT INTO rsvps (name, attending, guest_count) VALUES (@name, @attending, @guestCount)')
    .run({
      name,
      attending: attending ? 1 : 0,
      guestCount: guestCount || 1,
    });
  return {
    id: Number(info.lastInsertRowid),
    name,
    attending,
    guestCount,
  };
}

function getRsvpStats() {
  if (useMemoryFallback || !db) {
    return memoryRsvps.reduce(
      (acc, r) => ({
        totalAttending: acc.totalAttending + (r.attending ? r.guestCount : 0),
        totalNotAttending: acc.totalNotAttending + (!r.attending ? 1 : 0),
        totalResponses: acc.totalResponses + 1,
      }),
      { totalAttending: 0, totalNotAttending: 0, totalResponses: 0 }
    );
  }

  return db
    .prepare(`
      SELECT
        COALESCE(SUM(CASE WHEN attending = 1 THEN guest_count ELSE 0 END), 0) AS totalAttending,
        COALESCE(SUM(CASE WHEN attending = 0 THEN 1 ELSE 0 END), 0) AS totalNotAttending,
        COUNT(*) AS totalResponses
      FROM rsvps
    `)
    .get();
}

function closeDatabase() {
  if (db) {
    db.close();
  }
}

module.exports = {
  initDatabase,
  addWish,
  getWishes,
  addRsvp,
  getRsvpStats,
  closeDatabase,
};
