const SUPABASE_URL = 'https://keklqxdvlfpjyagtmttk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2xxeGR2bGZwanlhZ3RtdHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwOTU1NTEsImV4cCI6MjA5MTY3MTU1MX0.qUE2hd57wrQ528-JKrFvElity2DrDdi4xG8Ji67MsP0';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// Auth helpers
async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

async function getProfile() {
  const user = await getUser();
  if (!user) return null;
  const { data } = await db.from('profiles').select('*').eq('id', user.id).single();
  return data;
}

async function requireAuth() {
  const user = await getUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  return user;
}

function formatNumber(n) {
  return new Intl.NumberFormat('id-ID').format(n || 0);
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showToast(msg, type = 'success') {
  const colors = { success: '#16a34a', error: '#dc2626', warning: '#d97706' };
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:20px;right:20px;background:white;border:1px solid #e5e7eb;border-left:4px solid ${colors[type]};padding:12px 16px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.1);font-size:14px;z-index:9999;max-width:320px;animation:slideIn .2s ease`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

const MOVEMENT_LABELS = {
  in_supplier: 'Masuk Supplier',
  in_rts_good: 'RTS Layak',
  in_rts_damaged: 'RTS Rusak',
  out_packing: 'Packing Keluar',
};

const MOVEMENT_COLORS = {
  in_supplier: 'badge-blue',
  in_rts_good: 'badge-green',
  in_rts_damaged: 'badge-red',
  out_packing: 'badge-purple',
};
