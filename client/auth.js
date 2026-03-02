/* auth.js – Client-side authentication utilities */
const API_BASE = 'http://localhost:3001/api';

function getToken() { return localStorage.getItem('dp_token'); }
function getUser()  { try { return JSON.parse(localStorage.getItem('dp_user')); } catch(e) { return null; } }
function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch(e) { return false; }
}
function logout() {
  localStorage.removeItem('dp_token');
  localStorage.removeItem('dp_user');
  window.location.href = '/login.html';
}

async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}

async function apiPost(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}

async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (res.status === 401) { logout(); return null; }
  return res.json();
}
