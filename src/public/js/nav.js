/**
 * Universal Navigation & Side Panel Drawer System
 * Educamp 2026 - Nandur Studio
 */

(function () {
  const currentPath = window.location.pathname.toLowerCase();

  // Expose global open/close functions
  window.openSidePanel = function () {
    const drawer = document.getElementById('side-panel-drawer');
    const overlay = document.getElementById('side-panel-overlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeSidePanel = function () {
    const drawer = document.getElementById('side-panel-drawer');
    const overlay = document.getElementById('side-panel-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Inject Side Panel Drawer and Overlay if not already in DOM
  function ensureDrawerMarkup() {
    let overlay = document.getElementById('side-panel-overlay');
    let drawer = document.getElementById('side-panel-drawer');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'side-panel-overlay';
      overlay.className = 'side-panel-overlay';
      overlay.onclick = window.closeSidePanel;
      document.body.appendChild(overlay);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'side-panel-drawer';
      drawer.className = 'side-panel-drawer';
      drawer.setAttribute('aria-label', 'Menu Navigasi Mobile & Tablet');

      drawer.innerHTML = `
        <div class="side-panel-header">
          <div class="side-panel-brand">
            <img src="/images/Logo%20Educamp%202026.png" alt="Educamp" class="side-panel-logo">
            <span class="side-panel-title-text">MENU NAVIGASI</span>
          </div>
          <button class="side-panel-close" onclick="closeSidePanel()" aria-label="Tutup Menu">✕</button>
        </div>

        <div class="side-panel-body">
          <div>
            <div class="side-panel-section-title">🏆 UTAMA & KLASEMEN</div>
            <div class="side-panel-group">
              <a href="/leaderboard.html" class="side-panel-item" data-path="/leaderboard.html">
                <div class="side-panel-item-left">
                  <span>🏆</span>
                  <span>Grand Leaderboard</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
              <a href="/index.html" class="side-panel-item" data-path="/index.html">
                <div class="side-panel-item-left">
                  <span>🏠</span>
                  <span>Hub Utama (Beranda)</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
            </div>
          </div>

          <div>
            <div class="side-panel-section-title">⚙️ DASHBOARD ADMIN</div>
            <div class="side-panel-group">
              <a href="/super-admin.html" class="side-panel-item" data-path="/super-admin.html" style="border-color: rgba(99, 102, 241, 0.4); background: rgba(79, 70, 229, 0.15);">
                <div class="side-panel-item-left">
                  <span>👑</span>
                  <span style="color: #a5b4fc;">Super Admin Master</span>
                </div>
                <span class="side-panel-chevron" style="color: #818cf8;">›</span>
              </a>
              <a href="/admin.html" class="side-panel-item" data-path="/admin.html">
                <div class="side-panel-item-left">
                  <span>🎋</span>
                  <span>Admin Panjat Pinang</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
              <a href="/tug-admin.html" class="side-panel-item" data-path="/tug-admin.html">
                <div class="side-panel-item-left">
                  <span>🪢</span>
                  <span>Admin Tarik Tambang</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
              <a href="/doorprize-admin.html" class="side-panel-item" data-path="/doorprize-admin.html">
                <div class="side-panel-item-left">
                  <span>🎁</span>
                  <span>Admin Doorprize</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
              <a href="/getting-commitment.html" class="side-panel-item" data-path="/getting-commitment.html">
                <div class="side-panel-item-left">
                  <span>🤝</span>
                  <span>Getting Commitment</span>
                </div>
                <span class="side-panel-chevron">›</span>
              </a>
            </div>
          </div>

          <div>
            <div class="side-panel-section-title">📺 LAYAR ARENA & PROYEKTOR</div>
            <div class="side-panel-group">
              <a href="/arena.html" target="_blank" class="side-panel-item">
                <div class="side-panel-item-left">
                  <span>🌴</span>
                  <span>Arena Panjat Pinang ↗</span>
                </div>
                <span class="side-panel-chevron">↗</span>
              </a>
              <a href="/tug-arena.html" target="_blank" class="side-panel-item">
                <div class="side-panel-item-left">
                  <span>🪢</span>
                  <span>Arena Tarik Tambang ↗</span>
                </div>
                <span class="side-panel-chevron">↗</span>
              </a>
              <a href="/doorprize-arena.html" target="_blank" class="side-panel-item">
                <div class="side-panel-item-left">
                  <span>🎉</span>
                  <span>Arena Doorprize Live ↗</span>
                </div>
                <span class="side-panel-chevron">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div class="side-panel-footer">
          <span>Educamp 2026</span>
          <span style="color: #38bdf8; font-weight: 700;">Live Sync Online</span>
        </div>
      `;

      document.body.appendChild(drawer);
    }

    // Mark active link in drawer
    const items = drawer.querySelectorAll('.side-panel-item');
    items.forEach(item => {
      const href = item.getAttribute('href');
      const dataPath = item.getAttribute('data-path');
      const target = (dataPath || href || '').toLowerCase();
      
      const isMatch = (target === currentPath) ||
                      (target === '/index.html' && (currentPath === '/' || currentPath === '')) ||
                      (target !== '' && currentPath.endsWith(target));

      if (isMatch) {
        item.classList.add('active');
        const chevron = item.querySelector('.side-panel-chevron');
        if (chevron) {
          chevron.outerHTML = '<span style="font-size: 10px; background: #f59e0b; color: #000; font-weight: 800; padding: 2px 7px; border-radius: 4px;">AKTIF</span>';
        }
      }

      // Close on link click if internal
      if (!item.getAttribute('target')) {
        item.addEventListener('click', () => {
          window.closeSidePanel();
        });
      }
    });

    // Close button & overlay clicks
    const closeBtn = drawer.querySelector('.side-panel-close');
    if (closeBtn) {
      closeBtn.onclick = window.closeSidePanel;
    }
  }

  // Keyboard Escape Handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeSidePanel();
    }
  });

  // Ensure initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureDrawerMarkup);
  } else {
    ensureDrawerMarkup();
  }
})();
