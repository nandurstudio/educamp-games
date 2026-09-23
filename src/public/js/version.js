/**
 * Universal App Version Sync (Nandur Studio Educamp Platform)
 * Secara dinamis menyinkronkan nomor versi SemVer di footer seluruh halaman web
 * dari Single Source of Truth (package.json via /api/version).
 */
(function () {
  window.APP_VERSION = "v1.3.0";

  function applyVersion(ver) {
    if (!ver) return;
    const formatted = ver.startsWith("v") ? ver : "v" + ver;
    window.APP_VERSION = formatted;
    
    // Update semua elemen footer SemVer
    const targets = document.querySelectorAll(
      ".footer-semver span:last-child, .app-version-badge, [data-app-version]"
    );
    targets.forEach(function (el) {
      el.textContent = formatted;
    });
  }

  // Terapkan versi awal segera setelah DOM siap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyVersion(window.APP_VERSION);
    });
  } else {
    applyVersion(window.APP_VERSION);
  }

  // Ambil versi terbaru secara dinamis dari server
  fetch("/api/version")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data && data.version) {
        applyVersion(data.version);
      }
    })
    .catch(function () {
      // Fallback tetap menggunakan window.APP_VERSION jika offline
    });
})();
