// sidebar.js - inject sidebar into all pages
async function initSidebar(activePage) {
  const profile = await getProfile();
  if (!profile) { window.location.href = 'login.html'; return; }

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sb-brand">
      <div class="sb-logo">S</div>
      <span class="sb-name">StokKu</span>
    </div>
    <nav class="sb-nav">
      <a href="dashboard.html" class="nav-item ${activePage==='dashboard'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard
      </a>
      <a href="products.html" class="nav-item ${activePage==='products'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM4 5h16v2H4z"/></svg>
        Produk
      </a>
      <div class="nav-group">Barang Masuk</div>
      <a href="incoming-supplier.html" class="nav-item ${activePage==='supplier'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 3h22v5H1zM1 8h22v13H1z"/></svg>
        Dari Supplier
      </a>
      <a href="incoming-rts.html" class="nav-item ${activePage==='rts'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        RTS (Return)
      </a>
      <a href="packing.html" class="nav-item ${activePage==='packing'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        Packing Harian
      </a>
      <a href="opname.html" class="nav-item ${activePage==='opname'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
        Stock Opname
      </a>
      <a href="history.html" class="nav-item ${activePage==='history'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Riwayat
      </a>
      <a href="laporan.html" class="nav-item ${activePage==='laporan'?'active':''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        Laporan
      </a>
    </nav>
    <div class="sb-user">
      <div class="avatar">${profile.full_name.charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${profile.full_name}</div>
        <div style="font-size:11px;color:#94a3b8;text-transform:capitalize">${profile.role}</div>
      </div>
      <button onclick="logout()" style="background:none;border:none;cursor:pointer;color:#94a3b8;padding:4px" title="Keluar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </div>
  `;
}

async function logout() {
  await db.auth.signOut();
  window.location.href = 'login.html';
}
