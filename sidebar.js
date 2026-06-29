// ============================================================
//  i-Operasional — Sidebar Builder
//  Call buildSidebar(activeHref) in each page
// ============================================================

const NAV_ITEMS = [
  {
    section: 'Menu Utama',
    items: [
      { href: 'dashboard.html',       icon: '🏠', label: 'Dashboard' },
      { href: 'index.html',           icon: '📝', label: 'Form Bukti TF Pangkalan' },
    ]
  },
  {
    section: 'Rekap & Laporan',
    items: [
      { href: 'rekapoperasional.html', icon: '📊', label: 'Rekap Operasional' },
      { href: 'rekapkeseluruhan.html', icon: '💾', label: 'Rekap Global Operasional' },
      { href: 'Combowombo.html',       icon: '💻', label: 'Rekap SA Sim3lon & Jadwal' },
    ]
  },
  {
    section: 'Data & Master',
    items: [
      { href: 'brimola.html',          icon: '💸', label: 'Brimola Agen & Pangkalan' },
      { href: 'datakaryawan.html',     icon: '👥', label: 'Pos Pembayaran' },
      { href: 'dbpangkalan.html',      icon: '💱', label: 'Data Pangkalan' },
      { href: 'masterrekapdata.html',  icon: '🔑', label: 'Master Data Bukti TF' },
    ]
  }
];

function buildSidebar() {
  const path = window.location.pathname.split('/').pop();
  const ptName = localStorage.getItem('nama_pt') || '-';

  const nav = NAV_ITEMS.map(section => `
    <div class="nav-section">
      <div class="nav-section-label">${section.section}</div>
      ${section.items.map(item => `
        <a href="${item.href}" class="nav-item ${path === item.href ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `).join('')}
    </div>
  `).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <a href="dashboard.html" class="brand-logo">
          <div class="brand-icon">⛽</div>
          <div>
            <div class="brand-text">i-Operasional</div>
          </div>
        </a>
      </div>

      <nav class="sidebar-nav">
        ${nav}
      </nav>

      <div class="sidebar-footer">
        <div class="pt-badge">
          <div class="pt-label">Perusahaan aktif</div>
          <div class="pt-name" id="pt-name">${ptName}</div>
        </div>
        <button class="nav-item" onclick="logout()" style="color:#F87171;width:100%">
          <span class="nav-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
  `;
}

function buildTopbar(title) {
  return `
    <div class="topbar">
      <div class="flex gap-2" style="align-items:center;gap:12px">
        <button class="hamburger" id="hamburger">☰</button>
        <span class="topbar-title">${title}</span>
      </div>
      <div class="flex gap-2" style="align-items:center;gap:8px">
        <span style="font-size:0.8rem;color:var(--text-muted)" id="pt-name-top"></span>
      </div>
    </div>
  `;
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

// Inject page shell
function injectShell(title, pageHtml) {
  document.body.innerHTML = `
    <div class="app-layout">
      ${buildSidebar()}
      <div class="main-content">
        ${buildTopbar(title)}
        <div class="page-content">
          ${pageHtml}
        </div>
      </div>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;

  const ptTop = document.getElementById('pt-name-top');
  if (ptTop) ptTop.textContent = localStorage.getItem('nama_pt') || '';

  // Re-init sidebar
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburger = document.getElementById('hamburger');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('show');
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }
}
