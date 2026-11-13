const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'wedding.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Initialize database tables
 */
function initDatabase() {
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

  console.log('Database tables initialized.');
}

// Initialize tables before preparing statements
initDatabase();

// ── Wishes ──────────────────────────────────────────────────────────

const insertWishStmt = db.prepare(
  'INSERT INTO wishes (name, message) VALUES (@name, @message)'
);

function addWish({ name, message }) {
  const info = insertWishStmt.run({ name, message });
  return { id: info.lastInsertRowid, name, message };
}

const getAllWishesStmt = db.prepare(
  'SELECT id, name, message, created_at FROM wishes ORDER BY created_at DESC'
);

function getWishes() {
  return getAllWishesStmt.all();
}

// ── RSVPs ───────────────────────────────────────────────────────────

const insertRsvpStmt = db.prepare(
  'INSERT INTO rsvps (name, attending, guest_count) VALUES (@name, @attending, @guestCount)'
);

function addRsvp({ name, attending, guestCount }) {
  const info = insertRsvpStmt.run({
    name,
    attending: attending ? 1 : 0,
    guestCount: guestCount || 1,
  });
  return { id: info.lastInsertRowid, name, attending, guestCount };
}

const rsvpStatsStmt = db.prepare(`
  SELECT
    COALESCE(SUM(CASE WHEN attending = 1 THEN guest_count ELSE 0 END), 0) AS totalAttending,
    COALESCE(SUM(CASE WHEN attending = 0 THEN 1 ELSE 0 END), 0) AS totalNotAttending,
    COUNT(*) AS totalResponses
  FROM rsvps
`);

function getRsvpStats() {
  return rsvpStatsStmt.get();
}

// ── Cleanup ─────────────────────────────────────────────────────────

function closeDatabase() {
  db.close();
}

module.exports = {
  initDatabase,
  addWish,
  getWishes,
  addRsvp,
  getRsvpStats,
  closeDatabase,
};
