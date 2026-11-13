const path = require('path');
const fs = require('fs');

let sqliteDb = null;
let pgPool = null;
let dbMode = 'uninitialized'; // 'postgres' | 'sqlite' | 'memory'

// Ephemeral in-memory fallback if neither PostgreSQL nor native SQLite is available
const memoryWishes = [];
const memoryRsvps = [];
let memoryWishId = 1;
let memoryRsvpId = 1;

function resolvePgSslConfig(connectionString) {
  const lower = connectionString.toLowerCase();
  if (
    lower.includes('railway.internal') ||
    lower.includes('localhost') ||
    lower.includes('127.0.0.1') ||
    lower.includes('sslmode=disable')
  ) {
    return false;
  }
  return { rejectUnauthorized: false };
}

function toIsoString(value) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  const str = String(value);
  const normalized = !str.includes('T') ? `${str.replace(' ', 'T')}Z` : str;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? str : parsed.toISOString();
}

async function initDatabase() {
  if (dbMode !== 'uninitialized') return dbMode;

  const databaseUrl = process.env.DATABASE_URL && process.env.DATABASE_URL.trim();

  if (databaseUrl) {
    try {
      const { Pool } = require('pg');
      pgPool = new Pool({
        connectionString: databaseUrl,
        ssl: resolvePgSslConfig(databaseUrl),
      });

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS wishes (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS rsvps (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          attending BOOLEAN NOT NULL DEFAULT FALSE,
          guest_count INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      dbMode = 'postgres';
      console.log('[Database] Connected to PostgreSQL');
      return dbMode;
    } catch (err) {
      console.error('[Database] PostgreSQL initialization failed:', err.message);
      if (pgPool) {
        await pgPool.end().catch(() => {});
        pgPool = null;
      }
    }
  }

  try {
    const Database = require('better-sqlite3');
    const customPath = process.env.SQLITE_DB_PATH && process.env.SQLITE_DB_PATH.trim();
    const dbPath = customPath || path.join(__dirname, 'data', 'wedding.db');
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    sqliteDb = new Database(dbPath);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');

    sqliteDb.exec(`
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

    dbMode = 'sqlite';
    console.log(`[Database] Using SQLite at ${dbPath}`);
    return dbMode;
  } catch (err) {
    console.warn('[Database] better-sqlite3 unavailable, using in-memory store:', err.message);
    dbMode = 'memory';
    return dbMode;
  }
}

function getDatabaseMode() {
  return dbMode;
}

async function addWish({ name, message }) {
  await initDatabase();

  if (dbMode === 'postgres' && pgPool) {
    const { rows } = await pgPool.query(
      'INSERT INTO wishes (name, message) VALUES ($1, $2) RETURNING id, name, message, created_at',
      [name, message]
    );
    const row = rows[0];
    return {
      id: Number(row.id),
      name: row.name,
      message: row.message,
      created_at: toIsoString(row.created_at),
    };
  }

  const createdAt = new Date().toISOString();
  if (dbMode === 'sqlite' && sqliteDb) {
    const info = sqliteDb
      .prepare('INSERT INTO wishes (name, message) VALUES (@name, @message)')
      .run({ name, message });
    return {
      id: Number(info.lastInsertRowid),
      name,
      message,
      created_at: createdAt,
    };
  }

  const entry = {
    id: memoryWishId++,
    name,
    message,
    created_at: createdAt,
  };
  memoryWishes.unshift(entry);
  return entry;
}

async function getWishes() {
  await initDatabase();

  if (dbMode === 'postgres' && pgPool) {
    const { rows } = await pgPool.query(
      'SELECT id, name, message, created_at FROM wishes ORDER BY id DESC'
    );
    return rows.map((row) => ({
      id: Number(row.id),
      name: row.name,
      message: row.message,
      created_at: toIsoString(row.created_at),
    }));
  }

  if (dbMode === 'sqlite' && sqliteDb) {
    return sqliteDb
      .prepare('SELECT id, name, message, created_at FROM wishes ORDER BY id DESC')
      .all();
  }

  return [...memoryWishes];
}

async function addRsvp({ name, attending, guestCount }) {
  await initDatabase();

  if (dbMode === 'postgres' && pgPool) {
    const { rows } = await pgPool.query(
      'INSERT INTO rsvps (name, attending, guest_count) VALUES ($1, $2, $3) RETURNING id, name, attending, guest_count',
      [name, Boolean(attending), guestCount || 1]
    );
    const row = rows[0];
    return {
      id: Number(row.id),
      name: row.name,
      attending: Boolean(row.attending),
      guestCount: Number(row.guest_count),
    };
  }

  if (dbMode === 'sqlite' && sqliteDb) {
    const info = sqliteDb
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

async function getRsvpStats() {
  await initDatabase();

  if (dbMode === 'postgres' && pgPool) {
    const { rows } = await pgPool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN attending THEN guest_count ELSE 0 END), 0)::INTEGER AS "totalAttending",
        COALESCE(SUM(CASE WHEN NOT attending THEN 1 ELSE 0 END), 0)::INTEGER AS "totalNotAttending",
        COUNT(*)::INTEGER AS "totalResponses"
      FROM rsvps
    `);
    return rows[0];
  }

  if (dbMode === 'sqlite' && sqliteDb) {
    return sqliteDb
      .prepare(`
        SELECT
          COALESCE(SUM(CASE WHEN attending = 1 THEN guest_count ELSE 0 END), 0) AS totalAttending,
          COALESCE(SUM(CASE WHEN attending = 0 THEN 1 ELSE 0 END), 0) AS totalNotAttending,
          COUNT(*) AS totalResponses
        FROM rsvps
      `)
      .get();
  }

  return memoryRsvps.reduce(
    (acc, r) => ({
      totalAttending: acc.totalAttending + (r.attending ? r.guestCount : 0),
      totalNotAttending: acc.totalNotAttending + (!r.attending ? 1 : 0),
      totalResponses: acc.totalResponses + 1,
    }),
    { totalAttending: 0, totalNotAttending: 0, totalResponses: 0 }
  );
}

async function closeDatabase() {
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
  }
  dbMode = 'uninitialized';
}

module.exports = {
  initDatabase,
  getDatabaseMode,
  addWish,
  getWishes,
  addRsvp,
  getRsvpStats,
  closeDatabase,
};
