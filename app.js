// ============================================================
//  i-Operasional — Shared Utilities
// ============================================================

// ── Toast ──────────────────────────────────────────────────
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Spinner ────────────────────────────────────────────────
function showSpinner(text = 'Memuat data...') {
  let el = document.getElementById('global-spinner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-spinner';
    el.className = 'spinner-overlay';
    el.innerHTML = `<div class="spinner-ring"></div><div class="spinner-text">${text}</div>`;
    document.body.appendChild(el);
  } else {
    el.querySelector('.spinner-text').textContent = text;
    el.classList.remove('hidden');
  }
}

function hideSpinner() {
  const el = document.getElementById('global-spinner');
  if (el) el.classList.add('hidden');
}

// ── Auth Guard ──────────────────────────────────────────────
function requireAuth() {
  const id = localStorage.getItem('id_spreadsheet');
  const logged = localStorage.getItem('loggedIn');
  if (!id || logged !== 'true') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ── Auto Logout ─────────────────────────────────────────────
function startAutoLogout(minutes = 60) {
  setTimeout(() => {
    localStorage.clear();
    window.location.href = 'login.html';
  }, minutes * 60 * 1000);
}

// ── Format Rupiah ────────────────────────────────────────────
function formatRupiah(val) {
  if (val == null || val === '' || val === '-') return '-';
  const n = Number(String(val).replace(/[^\d.-]/g, ''));
  if (isNaN(n)) return val;
  return 'Rp ' + n.toLocaleString('id-ID');
}

// ── Format Tanggal ───────────────────────────────────────────
function formatTanggal(str) {
  if (!str || str === '-') return '-';
  if (/^\d{2}\/\d{2}\/\d{4}/.test(str)) return str;
  const d = new Date(str);
  if (isNaN(d)) return str;
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2,'0');
  const mi = String(d.getMinutes()).padStart(2,'0');
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

// ── Sidebar Mobile ───────────────────────────────────────────
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburger = document.getElementById('hamburger');
  if (!sidebar) return;

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop && backdrop.classList.toggle('show');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }

  // Active nav
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.getAttribute('href') || el.getAttribute('data-href');
    if (href && href === path) el.classList.add('active');
  });
}

// ── Number Input Format ──────────────────────────────────────
function initNominalInput(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', e => {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v ? new Intl.NumberFormat('id-ID').format(v) : '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  // Show PT name if exists
  const ptEl = document.getElementById('pt-name');
  if (ptEl) ptEl.textContent = localStorage.getItem('nama_pt') || '-';
});
