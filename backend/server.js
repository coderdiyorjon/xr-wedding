const express = require('express');
const cors = require('cors');
const { initDatabase, addWish, getWishes, addRsvp, getRsvpStats } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Wishes endpoints ────────────────────────────────────────────────

// POST /api/wishes — Submit a congratulatory message
app.post('/api/wishes', (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const wish = addWish({ name: name.trim(), message: message.trim() });
    res.status(201).json(wish);
  } catch (err) {
    console.error('Error adding wish:', err);
    res.status(500).json({ error: 'Failed to save wish.' });
  }
});

// GET /api/wishes — Get all wishes (newest first)
app.get('/api/wishes', (_req, res) => {
  try {
    const wishes = getWishes();
    res.json(wishes);
  } catch (err) {
    console.error('Error fetching wishes:', err);
    res.status(500).json({ error: 'Failed to fetch wishes.' });
  }
});

// ── RSVP endpoints ──────────────────────────────────────────────────

// POST /api/rsvp — Submit an RSVP
app.post('/api/rsvp', (req, res) => {
  try {
    const { name, attending, guestCount } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (typeof attending !== 'boolean') {
      return res.status(400).json({ error: 'Attending must be a boolean.' });
    }
    if (guestCount !== undefined && (typeof guestCount !== 'number' || guestCount < 1)) {
      return res.status(400).json({ error: 'Guest count must be a positive number.' });
    }

    const rsvp = addRsvp({
      name: name.trim(),
      attending,
      guestCount: attending ? (guestCount || 1) : 0,
    });
    res.status(201).json(rsvp);
  } catch (err) {
    console.error('Error adding RSVP:', err);
    res.status(500).json({ error: 'Failed to save RSVP.' });
  }
});

// GET /api/rsvp — Get RSVP stats
app.get('/api/rsvp', (_req, res) => {
  try {
    const stats = getRsvpStats();
    res.json(stats);
  } catch (err) {
    console.error('Error fetching RSVP stats:', err);
    res.status(500).json({ error: 'Failed to fetch RSVP stats.' });
  }
});

// ── Start server ────────────────────────────────────────────────────
initDatabase();

app.listen(PORT, () => {
  console.log(`Wedding API server running on port ${PORT}`);
});
