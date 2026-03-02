/* ============================================================
   db.js – MongoDB Atlas Storage (works on Vercel)
   All data is stored in MongoDB collections per user.
   ============================================================ */
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || '';
let _client = null;

async function getDB() {
  if (!_client) {
    if (!MONGO_URI) throw new Error('MONGO_URI environment variable is not set');
    _client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    await _client.connect();
  }
  return _client.db('datapath');
}

// ─── Small helper ─────────────────────────────────────────────
async function col(name) {
  const db = await getDB();
  return db.collection(name);
}

/* =============================================================
   USER METHODS
   Collection: users  { _id, username, email, password_hash, avatar, created_at }
   ============================================================= */
const db = {

  async createUser({ username, email, password_hash, avatar }) {
    const c = await col('users');
    const doc = { username, email, password_hash, avatar, created_at: new Date().toISOString() };
    const result = await c.insertOne(doc);
    return { ...doc, id: result.insertedId.toString() };
  },

  async getUserByEmail(email) {
    const c = await col('users');
    return c.findOne({ email });
  },

  async getUserByUsername(username) {
    const c = await col('users');
    return c.findOne({ username });
  },

  async getUserById(id) {
    const c = await col('users');
    try {
      const u = await c.findOne({ _id: new ObjectId(id) });
      if (!u) return null;
      const { password_hash, ...safe } = u;
      return { ...safe, id: u._id.toString() };
    } catch { return null; }
  },

  /* ── PROGRESS ── { userId, topics: { topicId: true } } */
  async getProgress(userId) {
    const c = await col('progress');
    const doc = await c.findOne({ userId });
    return doc?.topics || {};
  },

  async setProgress(userId, topicId, completed) {
    const c = await col('progress');
    if (completed) {
      await c.updateOne({ userId }, { $set: { [`topics.${topicId}`]: true } }, { upsert: true });
    } else {
      await c.updateOne({ userId }, { $unset: { [`topics.${topicId}`]: '' } }, { upsert: true });
    }
  },

  /* ── NOTES ── { userId, id, title, topic, tag, content, created_at } */
  async getNotes(userId) {
    const c = await col('notes');
    const notes = await c.find({ userId }).sort({ created_at: -1 }).toArray();
    return notes.map(n => ({ ...n, _id: undefined }));
  },

  async upsertNote(userId, note) {
    const c = await col('notes');
    await c.updateOne(
      { userId, id: note.id },
      { $set: { ...note, userId, updated_at: new Date().toISOString() } },
      { upsert: true }
    );
  },

  async deleteNote(userId, noteId) {
    const c = await col('notes');
    await c.deleteOne({ userId, id: noteId });
    return true;
  },

  /* ── QUIZ HISTORY ── */
  async getQuizHistory(userId) {
    const c = await col('quiz_history');
    return c.find({ userId }).sort({ taken_at: -1 }).limit(100).toArray();
  },

  async addQuizResult(userId, result) {
    const c = await col('quiz_history');
    await c.insertOne({ ...result, userId, taken_at: new Date().toISOString() });
  },

  /* ── QUIZ BEST ── */
  async getQuizBest(userId) {
    const c = await col('quiz_best');
    const doc = await c.findOne({ userId });
    return doc?.scores || {};
  },

  async updateQuizBest(userId, phase, pct) {
    const c = await col('quiz_best');
    const current = await this.getQuizBest(userId);
    if (current[phase] === undefined || pct > current[phase]) {
      await c.updateOne({ userId }, { $set: { [`scores.${phase}`]: pct } }, { upsert: true });
    }
  },

  /* ── GOALS ── */
  async getGoals(userId) {
    const c = await col('goals');
    const doc = await c.findOne({ userId });
    return doc?.dates || {};
  },

  async setGoals(userId, date, goals) {
    const c = await col('goals');
    await c.updateOne({ userId }, { $set: { [`dates.${date}`]: goals } }, { upsert: true });
  },

  /* ── SETTINGS ── */
  async getSettings(userId) {
    const defaults = { display_name: '', streak: 0, last_date: null, heatmap: {}, activity: [], theme: 'dark' };
    const c = await col('settings');
    const doc = await c.findOne({ userId });
    if (!doc) return defaults;
    const { _id, userId: uid, ...rest } = doc;
    return { ...defaults, ...rest };
  },

  async saveSettings(userId, settings) {
    const c = await col('settings');
    await c.updateOne({ userId }, { $set: { userId, ...settings } }, { upsert: true });
  }
};

module.exports = db;
