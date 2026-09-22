// Client-side Firebase Authentication Guard for Educamp Game Master & Super Admin
(function() {
  const SCRIPT_CDN = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-';

  // Inject Firebase App and Auth SDK if not present
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  let cachedFirebaseConfig = null;
  async function fetchFirebaseConfig() {
    if (cachedFirebaseConfig) return cachedFirebaseConfig;
    try {
      const res = await fetch('/api/auth/firebase-config');
      if (res.ok) {
        cachedFirebaseConfig = await res.json();
        return cachedFirebaseConfig;
      }
    } catch (e) {
      console.warn('[AdminAuthGuard] Gagal mengambil konfigurasi Firebase dari server:', e.message);
    }
    return null;
  }

  class AdminAuthGuard {
    constructor() {
      this.app = null;
      this.auth = null;
      this.currentUser = null;
      this.userRole = null;
      this.requiredRole = 'GAME_MASTER'; // Default required minimum role
      this.isInitialized = false;
      this.isChecking = true;
    }

    async init(options = {}) {
      this.requiredRole = options.requiredRole || 'GAME_MASTER';
      this.pageTitle = options.pageTitle || 'Admin Management';
      
      // Load styles and create auth modal backdrop
      this.injectStyles();
      this.createAuthOverlay();

      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        try {
          const savedLocal = JSON.parse(localStorage.getItem('educamp_local_admin_session') || '{}');
          if (savedLocal && savedLocal.email) {
            await this.handleUserSignedIn(savedLocal);
            return;
          }
        } catch (e) {}
      }

      try {
        await loadScript(SCRIPT_CDN + 'app-compat.js');
        await loadScript(SCRIPT_CDN + 'auth-compat.js');

        if (!firebase.apps.length) {
          const config = await fetchFirebaseConfig();
          if (!config) {
            throw new Error('Konfigurasi Firebase tidak tersedia dari server');
          }
          this.app = firebase.initializeApp(config);
        } else {
          this.app = firebase.app();
        }
        this.auth = firebase.auth();

        // Listen to Auth State
        this.auth.onAuthStateChanged(async (user) => {
          if (user) {
            await this.handleUserSignedIn(user);
          } else {
            this.handleUserSignedOut();
          }
        });
      } catch (err) {
        console.error('[AdminAuthGuard] Inisialisasi Firebase Auth gagal:', err);
        if (isLocalhost) {
          this.handleUserSignedOut();
        } else {
          this.showLoginCard({ error: 'Gagal memuat Firebase Authentication SDK. Periksa koneksi internet.' });
        }
      }
    }

    injectStyles() {
      if (document.getElementById('educamp-auth-styles')) return;
      const style = document.createElement('style');
      style.id = 'educamp-auth-styles';
      style.innerHTML = `
        #educamp-auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(11, 19, 43, 0.94);
          backdrop-filter: blur(12px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
          box-sizing: border-box;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .auth-card {
          background: #1e293b;
          border: 1px solid #334155;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
          border-radius: 16px;
          padding: 32px;
          max-width: 440px;
          width: 100%;
          text-align: center;
          color: #f8fafc;
        }
        .auth-logo {
          height: 52px;
          object-fit: contain;
          margin-bottom: 16px;
        }
        .auth-title {
          font-size: 20px;
          font-weight: 800;
          color: #38bdf8;
          margin-bottom: 6px;
        }
        .auth-subtitle {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .auth-btn-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #ffffff;
          color: #1e293b;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }
        .auth-btn-google:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }
        .auth-badge-role {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 10px;
        }
        .auth-badge-super {
          background: #4f46e5;
          color: #e0e7ff;
        }
        .auth-badge-gm {
          background: #0284c7;
          color: #e0f2fe;
        }
        .auth-user-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 20px;
          background: #1e293b;
          border: 1px solid #334155;
          font-size: 12px;
          color: #cbd5e1;
        }
        .auth-user-chip img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .auth-btn-logout {
          background: #334155;
          color: #cbd5e1;
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          font-weight: 600;
        }
        .auth-btn-logout:hover {
          background: #475569;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);
    }

    createAuthOverlay() {
      if (document.getElementById('educamp-auth-overlay')) return;
      const overlay = document.createElement('div');
      overlay.id = 'educamp-auth-overlay';
      overlay.innerHTML = `
        <div class="auth-card">
          <img class="auth-logo" src="/images/Logo%20Educamp%202026.png" alt="Educamp 2026">
          <h2 class="auth-title">🔐 Verifikasi Akses Game Master</h2>
          <p class="auth-subtitle">Memeriksa kredensial otorisasi Firebase...</p>
          <div style="display: inline-block; width: 32px; height: 32px; border: 3px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: auth-spin 1s linear infinite;"></div>
          <style>@keyframes auth-spin { to { transform: rotate(360deg); } }</style>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    showLoginCard(opts = {}) {
      const overlay = document.getElementById('educamp-auth-overlay');
      if (!overlay) return;
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';

      const errorHtml = opts.error ? `
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; padding: 10px; border-radius: 8px; font-size: 13px; margin-bottom: 18px; text-align: left;">
          ⚠️ ${opts.error}
        </div>
      ` : '';

      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const localhostQuickHtml = isLocalhost ? `
        <div style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(56, 189, 248, 0.3);">
          <div style="font-size: 11px; color: #38bdf8; font-weight: 700; margin-bottom: 8px;">💻 AKSES CEPAT LOCALHOST / DEV</div>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            <button id="adminauth-quick-reki" type="button" style="background: #0284c7; color: #ffffff; border: none; padding: 8px 12px; font-size: 12px; font-weight: 700; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
              👑 Maulid Reki (Super Admin)
            </button>
            <button id="adminauth-quick-nandang" type="button" style="background: #334155; color: #cbd5e1; border: none; padding: 8px 12px; font-size: 12px; font-weight: 700; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
              👑 Nandang D.
            </button>
          </div>
        </div>
      ` : '';

      overlay.innerHTML = `
        <div class="auth-card">
          <img class="auth-logo" src="/images/Logo%20Educamp%202026.png" alt="Educamp 2026">
          <h2 class="auth-title">${this.requiredRole === 'SUPER_ADMIN' ? '👑 Super Admin Portal' : '🎮 Game Master Portal'}</h2>
          <p class="auth-subtitle">
            Halaman ini dilindungi oleh <strong>Firebase Authentication</strong>. Silakan masuk menggunakan akun Google resmi panitia untuk melanjutkan.
          </p>
          ${errorHtml}
          <button id="btn-firebase-google-login" class="auth-btn-google">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Masuk dengan Akun Google
          </button>
          ${localhostQuickHtml}
          <div style="margin-top: 20px;">
            <a href="/index.html" style="color: #64748b; font-size: 12px; text-decoration: none;">← Kembali ke Beranda Hub</a>
          </div>
        </div>
      `;

      const btn = document.getElementById('btn-firebase-google-login');
      if (btn) {
        btn.addEventListener('click', () => this.signInGoogle());
      }

      const quickReki = document.getElementById('adminauth-quick-reki');
      if (quickReki) {
        quickReki.addEventListener('click', async () => {
          const localUser = {
            email: 'maulidreki@gmail.com',
            displayName: 'Maulid Reki (Super Admin)',
            uid: 'local-reki'
          };
          localStorage.setItem('educamp_local_admin_session', JSON.stringify(localUser));
          await this.handleUserSignedIn(localUser);
        });
      }

      const quickNandang = document.getElementById('adminauth-quick-nandang');
      if (quickNandang) {
        quickNandang.addEventListener('click', async () => {
          const localUser = {
            email: 'nandang.dhe@gmail.com',
            displayName: 'Nandang Duryat (Owner)',
            uid: 'local-nandang'
          };
          localStorage.setItem('educamp_local_admin_session', JSON.stringify(localUser));
          await this.handleUserSignedIn(localUser);
        });
      }
    }

    async signInGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        await this.auth.signInWithPopup(provider);
      } catch (err) {
        console.error('[AdminAuthGuard] Error signInWithPopup:', err);
        this.showLoginCard({ error: `Gagal masuk: ${err.message}` });
      }
    }

    async handleUserSignedIn(user) {
      if (this.pendingPollTimer) {
        clearInterval(this.pendingPollTimer);
        this.pendingPollTimer = null;
      }
      this.currentUser = user;
      try {
        // Verifikasi ke server REST API mengenai role email
        const res = await fetch('/api/auth/check-role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName || user.name || '',
            photoURL: user.photoURL || '',
            uid: user.uid
          })
        });
        const data = await res.json();

        // Jika PENDING: Tampilkan Waiting Room
        if (data && data.status === 'PENDING') {
          this.showPendingWaitingRoom(user, data);
          return;
        }

        if (!data.authorized) {
          this.showLoginCard({
            error: data?.message || `Akun Google (${user.email}) belum terdaftar sebagai Game Master atau Super Admin.`
          });
          return;
        }

        // Cek apakah memenuhi minimum requiredRole
        const role = data.user.role;
        this.userRole = role;

        if (this.requiredRole === 'SUPER_ADMIN' && role !== 'SUPER_ADMIN') {
          this.showLoginCard({
            error: `Akun (${user.email}) memiliki hak akses Game Master, namun halaman ini memerlukan hak akses Super Admin.`
          });
          return;
        }

        // Lolos otorisasi
        this.grantAccess(user, data.user);
      } catch (err) {
        console.error('[AdminAuthGuard] Gagal memverifikasi role:', err);
        this.showLoginCard({ error: 'Gagal memverifikasi status hak akses server.' });
      }
    }

    showPendingWaitingRoom(user, data) {
      const card = document.getElementById('educamp-auth-card');
      if (!card) return;

      const userName = user.displayName || data.name || user.email.split('@')[0];
      const photoURL = user.photoURL || data.photoURL || 'https://www.gravatar.com/avatar/?d=mp';

      card.innerHTML = `
        <div style="position: relative; display: inline-block; margin-bottom: 12px;">
          <img src="${photoURL}" alt="Profile" style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid #38bdf8; object-fit: cover; margin: 0 auto; display: block;">
          <span style="position: absolute; bottom: 0; right: 0; background: #f59e0b; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #131d33; display: flex; align-items: center; justify-content: center; font-size: 10px;">⏳</span>
        </div>
        <h2 style="font-size: 17px; font-weight: 800; color: #f8fafc; margin: 0 0 2px 0;">${userName}</h2>
        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 14px;">${user.email}</div>
        
        <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.5); border-radius: 8px; padding: 12px; margin-bottom: 16px; text-align: left;">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #fbbf24; margin-bottom: 4px;">
            <span>⏳</span>
            <span>Akses Tertahan di Ruang Tunggu</span>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
            Akun Google Anda terhubung. Akses Anda saat ini tertahan agar Super Admin dapat langsung menyetujui (<strong>Admit</strong>) dari dashboard tanpa mengetik email Anda secara manual.
          </div>
        </div>

        <div id="adminauth-status-box" style="background: #0b1326; border: 1px solid #1e293b; border-radius: 6px; padding: 10px; font-size: 12px; color: #38bdf8; margin-bottom: 16px;">
          <span>⏳ Menunggu konfirmasi Admit dari admin...</span>
        </div>

        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <button id="adminauth-btn-check-now" class="admin-auth-btn-switch" style="background: #0284c7; color: #ffffff; border: none; font-weight: 700;">
            🔄 Cek Status
          </button>
          <button id="adminauth-btn-switch" class="admin-auth-btn-switch">
            Ganti Akun
          </button>
          <a href="${this.redirectUrl}" class="admin-auth-btn-switch" style="border: none; background: transparent; color: #64748b;">
            ← Beranda
          </a>
        </div>
      `;

      const btnCheck = document.getElementById('adminauth-btn-check-now');
      if (btnCheck) {
        btnCheck.addEventListener('click', async () => {
          btnCheck.disabled = true;
          try {
            const res = await fetch(`/api/auth/check-status?email=${encodeURIComponent(user.email)}`);
            const sData = await res.json();
            if (sData && sData.status === 'APPROVED') {
              this.handleUserSignedIn(user);
              return;
            }
          } catch (e) {}
          setTimeout(() => { if (btnCheck) btnCheck.disabled = false; }, 800);
        });
      }

      const btnSwitch = document.getElementById('adminauth-btn-switch');
      if (btnSwitch) {
        btnSwitch.addEventListener('click', async () => {
          if (this.pendingPollTimer) clearInterval(this.pendingPollTimer);
          if (this.auth) await this.auth.signOut();
          this.showLoginCard({});
        });
      }

      // Socket & Polling fallback
      if (window.io) {
        try {
          if (!this.socketInstance) this.socketInstance = window.io();
          this.socketInstance.on('AUTH_USER_ADMITTED', (p) => {
            if (p && p.email && p.email.toLowerCase() === user.email.toLowerCase()) {
              this.handleUserSignedIn(user);
            }
          });
        } catch (e) {}
      }

      this.pendingPollTimer = setInterval(async () => {
        try {
          const res = await fetch(`/api/auth/check-status?email=${encodeURIComponent(user.email)}`);
          const sData = await res.json();
          if (sData && sData.status === 'APPROVED') {
            clearInterval(this.pendingPollTimer);
            this.handleUserSignedIn(user);
          }
        } catch (e) {}
      }, 2500);
    }

    grantAccess(user, roleInfo) {
      const overlay = document.getElementById('educamp-auth-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 300);
      }

      // Inject widget profil di pojok navbar admin
      this.renderUserBadge(user, roleInfo);
      console.log(`[AdminAuthGuard] Akses diberikan: ${user.email} (${roleInfo.role})`);
    }

    handleUserSignedOut() {
      this.currentUser = null;
      this.userRole = null;
      this.showLoginCard();
    }

    async logout() {
      try {
        localStorage.removeItem('educamp_local_admin_session');
      } catch (e) {}
      if (this.auth) {
        try {
          await this.auth.signOut();
        } catch (e) {}
      }
    }

    renderUserBadge(user, roleInfo) {
      let navRight = document.querySelector('nav > div:last-child');
      if (!navRight) return;

      const existing = document.getElementById('educamp-auth-user-widget');
      if (existing) existing.remove();

      const widget = document.createElement('div');
      widget.id = 'educamp-auth-user-widget';
      widget.style.display = 'inline-flex';
      widget.style.alignItems = 'center';
      widget.style.gap = '8px';
      widget.style.marginLeft = '8px';

      const photo = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
      const roleBadge = roleInfo.role === 'SUPER_ADMIN'
        ? '<span style="background: #4338ca; color: #e0e7ff; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">👑 SUPER ADMIN</span>'
        : '<span style="background: #0369a1; color: #e0f2fe; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">🎮 GAME MASTER</span>';

      widget.innerHTML = `
        <div class="auth-user-chip" title="${user.email}">
          <img src="${photo}" alt="Avatar">
          <span style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600;">${user.displayName || user.email}</span>
          ${roleBadge}
          <button id="btn-educamp-auth-logout" class="auth-btn-logout" title="Keluar">Keluar</button>
        </div>
      `;

      navRight.appendChild(widget);

      const btnLogout = document.getElementById('btn-educamp-auth-logout');
      if (btnLogout) {
        btnLogout.addEventListener('click', () => this.logout());
      }
    }
  }

  window.AdminAuthGuard = new AdminAuthGuard();
})();
