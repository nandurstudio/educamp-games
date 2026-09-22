// Reusable Firebase Authentication Guard ('auth-guard.js')
// Checks active Firebase Authentication session on page load.
// Redirects unauthorized or unauthenticated users to the index page ('/index.html')
// if they attempt to access any of the admin or game management panels.

(function() {
  const SCRIPT_CDN = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-';

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
      console.warn('[AuthGuard] Gagal mengambil konfigurasi Firebase dari server:', e.message);
    }
    return null;
  }

  class AuthGuard {
    constructor() {
      this.app = null;
      this.auth = null;
      this.currentUser = null;
      this.userRole = null;
      this.requiredRole = 'GAME_MASTER';
      this.redirectUrl = '/index.html';
      this.isChecking = true;
    }

    injectStyles() {
      if (document.getElementById('educamp-authguard-styles')) return;
      const style = document.createElement('style');
      style.id = 'educamp-authguard-styles';
      style.innerHTML = `
        #educamp-auth-blocking-curtain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #090f1d;
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #f8fafc;
          text-align: center;
          padding: 24px;
          box-sizing: border-box;
          transition: opacity 0.25s ease;
        }
        .authguard-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(56, 189, 248, 0.2);
          border-top-color: #38bdf8;
          border-radius: 50%;
          animation: ag-spin 0.8s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes ag-spin { to { transform: rotate(360deg); } }
        .authguard-title {
          font-size: 20px;
          font-weight: 800;
          color: #38bdf8;
          margin-bottom: 8px;
        }
        .authguard-desc {
          font-size: 13px;
          color: #94a3b8;
          max-width: 400px;
          line-height: 1.5;
        }
        .authguard-error-box {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid #ef4444;
          color: #fca5a5;
          padding: 12px 18px;
          border-radius: 8px;
          font-size: 13px;
          margin: 16px 0;
          max-width: 440px;
          line-height: 1.5;
        }
        .authguard-btn-google {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #ffffff;
          color: #1e293b;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.15s, background 0.15s;
        }
        .authguard-btn-google:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }
        .authguard-btn-redirect {
          display: inline-block;
          background: #1e293b;
          color: #cbd5e1;
          border: 1px solid #334155;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          margin-top: 10px;
        }
        .authguard-btn-redirect:hover {
          background: #334155;
          color: #ffffff;
        }
        .authguard-user-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 20px;
          background: #17253d;
          border: 1px solid #1e293b;
          font-size: 12px;
          color: #cbd5e1;
          margin-left: 8px;
        }
        .authguard-user-chip img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }
        .authguard-btn-logout {
          background: #334155;
          color: #e2e8f0;
          border: none;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }
        .authguard-btn-logout:hover {
          background: #475569;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);
    }

    createBlockingCurtain() {
      if (document.getElementById('educamp-auth-blocking-curtain')) return;
      const curtain = document.createElement('div');
      curtain.id = 'educamp-auth-blocking-curtain';
      curtain.innerHTML = `
        <div class="authguard-spinner"></div>
        <h2 class="authguard-title">🔐 Memverifikasi Sesi Firebase...</h2>
        <p class="authguard-desc">Memeriksa kredensial Game Master & Super Admin secara real-time.</p>
      `;
      document.body.prepend(curtain);
    }

    async init(options = {}) {
      this.requiredRole = options.requiredRole || 'GAME_MASTER';
      this.redirectUrl = options.redirectUrl || '/index.html';
      this.pageTitle = options.pageTitle || 'Panel Administrasi';

      this.injectStyles();
      this.createBlockingCurtain();

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

        // Cek sesi aktif Firebase Authentication saat halaman dimuat
        this.auth.onAuthStateChanged(async (user) => {
          if (user) {
            await this.validateSession(user);
          } else {
            this.handleNoSession();
          }
        });
      } catch (err) {
        console.error('[AuthGuard] Gagal inisialisasi Firebase SDK:', err);
        this.showUnauthorizedAndRedirect('Gagal memuat Firebase Authentication SDK. Mengalihkan ke Beranda...');
      }
    }

    async validateSession(user) {
      try {
        const res = await fetch('/api/auth/check-role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, uid: user.uid })
        });
        const data = await res.json();

        // 1. Jika email tidak terdaftar sebagai admin/game master
        if (!data || !data.authorized) {
          this.showUnauthorizedAndRedirect(
            `Akses Ditolak: Akun (${user.email}) tidak memiliki hak akses Game Master atau Super Admin.`
          );
          return;
        }

        // 2. Jika halaman mewajibkan Super Admin namun role hanya Game Master
        const userRole = data.user.role;
        if (this.requiredRole === 'SUPER_ADMIN' && userRole !== 'SUPER_ADMIN') {
          this.showUnauthorizedAndRedirect(
            `Akses Terbatas: Akun (${user.email}) terdaftar sebagai Game Master, tetapi halaman ini khusus Super Admin.`
          );
          return;
        }

        // 3. Berhasil lolos otorisasi
        this.currentUser = user;
        this.userRole = userRole;
        this.grantAccess(user, data.user);
      } catch (err) {
        console.error('[AuthGuard] Kesalahan verifikasi role:', err);
        this.showUnauthorizedAndRedirect('Gagal memverifikasi hak akses dengan server.');
      }
    }

    handleNoSession() {
      // Tidak ada sesi aktif Firebase
      const curtain = document.getElementById('educamp-auth-blocking-curtain');
      if (!curtain) return;

      curtain.innerHTML = `
        <div style="background: #131d33; border: 1px solid #1e293b; border-radius: 14px; padding: 32px; max-width: 440px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          <img src="/images/Logo%20Educamp%202026.png" alt="Educamp 2026" style="height: 48px; object-fit: contain; margin-bottom: 14px;">
          <h2 class="authguard-title">${this.requiredRole === 'SUPER_ADMIN' ? '👑 Super Admin Access' : '🎮 Game Master Access'}</h2>
          <p class="authguard-desc">
            Sesi Firebase aktif tidak terdeteksi. Silakan masuk menggunakan akun Google panitia resmi atau kembali ke beranda utama.
          </p>
          <button id="authguard-btn-login" class="authguard-btn-google">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Masuk dengan Google
          </button>
          <div style="margin-top: 18px;">
            <a href="${this.redirectUrl}" class="authguard-btn-redirect">← Kembali ke Halaman Utama</a>
          </div>
        </div>
      `;

      const loginBtn = document.getElementById('authguard-btn-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            await this.auth.signInWithPopup(provider);
          } catch (e) {
            alert('Gagal login: ' + e.message);
          }
        });
      }
    }

    showUnauthorizedAndRedirect(reason) {
      const curtain = document.getElementById('educamp-auth-blocking-curtain');
      if (!curtain) return;

      let countdown = 3;
      curtain.innerHTML = `
        <div style="background: #131d33; border: 1px solid #ef4444; border-radius: 14px; padding: 32px; max-width: 460px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          <div style="font-size: 40px; margin-bottom: 12px;">🚫</div>
          <h2 style="font-size: 20px; font-weight: 800; color: #ef4444; margin-bottom: 8px;">Akses Ditolak</h2>
          <div class="authguard-error-box">${reason}</div>
          <p class="authguard-desc">
            Anda tidak berwenang mengakses panel ini. Mengalihkan ke Halaman Utama dalam <span id="authguard-countdown" style="font-weight: 800; color: #38bdf8;">${countdown}</span> detik...
          </p>
          <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
            <a href="${this.redirectUrl}" class="authguard-btn-redirect" style="background: #ef4444; color: #ffffff; border: none;">
              Kembali Sekarang ➔
            </a>
            <button id="authguard-btn-switch" class="authguard-btn-redirect">
              Ganti Akun Google
            </button>
          </div>
        </div>
      `;

      const switchBtn = document.getElementById('authguard-btn-switch');
      if (switchBtn) {
        switchBtn.addEventListener('click', async () => {
          clearInterval(timer);
          try {
            if (this.auth) await this.auth.signOut();
            this.handleNoSession();
          } catch (e) {
            window.location.href = this.redirectUrl;
          }
        });
      }

      const timer = setInterval(() => {
        countdown--;
        const cdElem = document.getElementById('authguard-countdown');
        if (cdElem) cdElem.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(timer);
          window.location.href = this.redirectUrl;
        }
      }, 1000);
    }

    grantAccess(user, roleInfo) {
      const curtain = document.getElementById('educamp-auth-blocking-curtain');
      if (curtain) {
        curtain.style.opacity = '0';
        setTimeout(() => {
          curtain.remove();
        }, 260);
      }

      this.renderUserBadge(user, roleInfo);
      console.log(`[AuthGuard] Sesi aktif terverifikasi: ${user.email} (${roleInfo.role})`);
    }

    async logout() {
      if (this.auth) {
        await this.auth.signOut();
        window.location.href = this.redirectUrl;
      }
    }

    renderUserBadge(user, roleInfo) {
      let navRight = document.querySelector('nav > div:last-child, .nav-links-cluster');
      if (!navRight) return;

      const existing = document.getElementById('educamp-authguard-badge');
      if (existing) existing.remove();

      const badge = document.createElement('div');
      badge.id = 'educamp-authguard-badge';
      badge.className = 'authguard-user-chip';
      badge.title = `Login sebagai ${user.email} (${roleInfo.role})`;

      const photo = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp';
      const roleTag = roleInfo.role === 'SUPER_ADMIN'
        ? '<span style="background: #4338ca; color: #e0e7ff; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">👑 SUPER ADMIN</span>'
        : '<span style="background: #0369a1; color: #e0f2fe; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">🎮 GAME MASTER</span>';

      badge.innerHTML = `
        <img src="${photo}" alt="Avatar">
        <span style="max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700;">${user.displayName || user.email.split('@')[0]}</span>
        ${roleTag}
        <button id="authguard-logout-btn" class="authguard-btn-logout" title="Keluar dari sesi Firebase">Keluar</button>
      `;

      navRight.appendChild(badge);

      const btn = document.getElementById('authguard-logout-btn');
      if (btn) {
        btn.addEventListener('click', () => this.logout());
      }
    }
  }

  window.AuthGuard = new AuthGuard();
  // Alias backward compatibility
  window.AdminAuthGuard = window.AuthGuard;
})();
