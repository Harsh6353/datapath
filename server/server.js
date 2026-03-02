// Load .env file for local development
try { require('dotenv').config(); } catch(e) {}

const express   = require('express');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const cors      = require('cors');
const path      = require('path');
const db        = require('./db');

const app = express();
const PORT       = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'datapath_jwt_secret_2026_secure_key';

// ─── MIDDLEWARE ───────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ─── AUTH ROUTES ─────────────────────────────────────────────

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    if (await db.getUserByEmail(email))
      return res.status(409).json({ error: 'Email already registered' });
    if (await db.getUserByUsername(username))
      return res.status(409).json({ error: 'Username already taken' });

    const password_hash = await bcrypt.hash(password, 10);
    const avatar = username.slice(0, 2).toUpperCase();
    const user = await db.createUser({ username, email, password_hash, avatar });

    await db.saveSettings(user._id.toString(), {
      display_name: username, streak: 0, last_date: null,
      heatmap: {}, activity: [], theme: 'dark'
    });

    const userId = user._id.toString();
    const token = jwt.sign({ id: userId, username, email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: userId, username, email, avatar } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' });

    const user = await db.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const userId = user._id.toString();
    const token = jwt.sign({ id: userId, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: userId, username: user.username, email: user.email, avatar: user.avatar } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await db.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── PROGRESS ────────────────────────────────────────────────
app.get('/api/progress', auth, async (req, res) => {
  try { res.json({ progress: await db.getProgress(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/progress', auth, async (req, res) => {
  try {
    const { topicId, completed } = req.body;
    await db.setProgress(req.user.id, topicId, !!completed);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── NOTES ───────────────────────────────────────────────────
app.get('/api/notes', auth, async (req, res) => {
  try { res.json({ notes: await db.getNotes(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/notes', auth, async (req, res) => {
  try {
    const { id, title, topic, tag, content, created_at } = req.body;
    if (!id || !title || !content)
      return res.status(400).json({ error: 'id, title and content are required' });
    await db.upsertNote(req.user.id, { id, title, topic: topic || 'General', tag: tag || 'Concept', content, created_at });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.delete('/api/notes/:id', auth, async (req, res) => {
  try { await db.deleteNote(req.user.id, req.params.id); res.json({ ok: true }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── QUIZ ─────────────────────────────────────────────────────
app.get('/api/quiz/history', auth, async (req, res) => {
  try { res.json({ history: await db.getQuizHistory(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.get('/api/quiz/best', auth, async (req, res) => {
  try { res.json({ best: await db.getQuizBest(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/quiz/result', auth, async (req, res) => {
  try {
    const { phase, score, total, pct } = req.body;
    await db.addQuizResult(req.user.id, { phase, score, total, pct });
    await db.updateQuizBest(req.user.id, phase, pct);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── GOALS ───────────────────────────────────────────────────
app.get('/api/goals', auth, async (req, res) => {
  try { res.json({ goals: await db.getGoals(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/goals', auth, async (req, res) => {
  try {
    const { date, goals } = req.body;
    await db.setGoals(req.user.id, date, goals);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── SETTINGS ────────────────────────────────────────────────
app.get('/api/settings', auth, async (req, res) => {
  try { res.json({ settings: await db.getSettings(req.user.id) }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

app.post('/api/settings', auth, async (req, res) => {
  try {
    const { display_name, streak, last_date, heatmap, activity, theme } = req.body;
    await db.saveSettings(req.user.id, { display_name, streak, last_date, heatmap, activity, theme });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// ─── CATCH-ALL → CLIENT ───────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'login.html'));
});

// ─── START (only when running locally, not on Vercel) ────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('\n✅  DataPath server is running!');
    console.log(`\n   🌐  Open this in your browser:`);
    console.log(`   👉  http://localhost:${PORT}\n`);
    console.log('   Press Ctrl+C to stop the server.\n');
  });
}

// Export for Vercel serverless
module.exports = app;
