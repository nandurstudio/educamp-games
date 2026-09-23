const fs = require('fs');
const path = require('path');
const gameEngine = require('./game-engine');
const tugEngine = require('./tug-engine');
const commitmentEngine = require('./commitment-engine');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/superadmin-storage.json');

const DEFAULT_PRELOADER_TEAMS = {
  qatra: {
    id: "qatra",
    name: "QATRA",
    color: "#e74c3c",
    members: [
      { name: "Fajar Fauzan", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Irvan Hasan", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Sri Rejeki", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Malawi", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Fuji S R", bodyType: "short-chubby", skinTone: "tan" },
      { name: "Adi Sofyan", bodyType: "tall-chubby", skinTone: "deep" },
      { name: "Yogi H. P.", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Mahajiwa", bodyType: "short-skinny", skinTone: "tan" }
    ]
  },
  vbom: {
    id: "vbom",
    name: "V-BOM",
    color: "#3498db",
    members: [
      { name: "Andy Chendra", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Cahyo Agung Martanto", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Joko S", bodyType: "short-skinny", skinTone: "olive" },
      { name: "Dimas JP", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Haris Baihaqi", bodyType: "short-chubby", skinTone: "tan" },
      { name: "Sukaryadi", bodyType: "tall-chubby", skinTone: "deep" },
      { name: "Abdul Halim", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Budy Sutrisno", bodyType: "short-skinny", skinTone: "tan" }
    ]
  },
  omega: {
    id: "omega",
    name: "OMEGA",
    color: "#2ecc71",
    members: [
      { name: "Agung Joko Supriyanto", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Budi Santoso", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Ahmad Sanusi", bodyType: "short-skinny", skinTone: "olive" },
      { name: "Riana Kurnianti", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Yudi S", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Dyanza Aria Perdana", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Yogo", bodyType: "short-chubby", skinTone: "deep" },
      { name: "Fendi S", bodyType: "tall-skinny", skinTone: "tan" }
    ]
  },
  ipc: {
    id: "ipc",
    name: "IPC",
    color: "#f39c12",
    members: [
      { name: "Andreas Hari listanto", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Vony", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Satrianto Ariardi", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Dimas Riyantoro", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Eurotiva Pratista", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Isa Dwiyono", bodyType: "tall-skinny", skinTone: "tan" },
      { name: "A Ropi", bodyType: "tall-chubby", skinTone: "olive" }
    ]
  },
  interlock: {
    id: "interlock",
    name: "INTERLOCK",
    color: "#9b59b6",
    members: [
      { name: "Yudha Agus Tri Basuki", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Asep Sopiyan", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Verdiana Zahroh N B", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Yuswa Slamet", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Abu Muntholib", bodyType: "short-chubby", skinTone: "deep" },
      { name: "Hayadi", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Wachid Sadali", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Alim", bodyType: "short-skinny", skinTone: "tan" }
    ]
  },
  avatar: {
    id: "avatar",
    name: "AVATAR",
    color: "#00cec9",
    members: [
      { name: "Dicky F", bodyType: "tall-skinny", skinTone: "fair" },
      { name: "Harmanto", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Priyo Anarkie", bodyType: "tall-skinny", skinTone: "olive" },
      { name: "Stevie", bodyType: "short-skinny", skinTone: "fair" },
      { name: "Dedi Setiadi", bodyType: "short-chubby", skinTone: "deep" },
      { name: "Nanang", bodyType: "tall-chubby", skinTone: "tan" },
      { name: "Dewangga", bodyType: "tall-skinny", skinTone: "olive" }
    ]
  }
};

class SuperAdminEngine {
  constructor() {
    this.masterTeams = {};
    this.customGames = [];
    this.auditLogs = [];
    this.digitalSettings = {
      pinangPointsPerWin: 300,
      pinangPointsPerLose: 150,
      pinangPointsPerDraw: 150,
      pinangTurnTimeoutSeconds: 15,
      tugPointsPerWin: 200,
      includeActiveScore: false
    };
    this.loadStorage();
  }

  loadStorage() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyStorageData(data);
        console.log(`[SuperAdmin Storage] Loaded ${Object.keys(this.masterTeams).length} teams & ${this.customGames.length} custom games from local disk.`);
      } else {
        this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
        this.initDefaultGames();
        this.saveLocalDisk();
      }
    } catch (err) {
      console.error('[SuperAdmin Storage Error] Gagal membaca storage lokal:', err.message);
      this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
      this.initDefaultGames();
    }

    // Sinkronisasi otomatis dari Cloud Firestore saat startup (Cloud Firestore adalah SINGLE SOURCE OF TRUTH)
    if (firebaseService.isAvailable()) {
      this.reloadFromFirebase().then(success => {
        if (!success) {
          // Dokumen di Cloud Firestore belum ada sama sekali, baru lakukan inisialisasi awal
          this.saveStorage();
          console.log('[SuperAdmin Firebase] Inisialisasi awal dokumen superadmin ke Cloud Firestore');
        }
      });
    }
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const cloudData = await firebaseService.loadDoc('superadmin');
      if (cloudData && typeof cloudData === 'object' && cloudData.masterTeams) {
        this.applyStorageData(cloudData);
        this.saveLocalDisk();
        console.log(`[SuperAdmin Firebase] Berhasil memulihkan ${Object.keys(this.masterTeams).length} tim & ${this.customGames.length} game dari Cloud Firestore!`);
        return true;
      }
    } catch (err) {
      console.error('[SuperAdmin Firebase] Gagal load dari Firestore:', err.message);
    }
    return false;
  }

  applyStorageData(data) {
    if (!data || typeof data !== 'object') return;
    if (data.masterTeams && typeof data.masterTeams === 'object' && Object.keys(data.masterTeams).length > 0) {
      this.masterTeams = data.masterTeams;
    }
    if (Array.isArray(data.customGames)) {
      this.customGames = data.customGames;
    }
    if (data.digitalSettings && typeof data.digitalSettings === 'object') {
      this.digitalSettings = { ...this.digitalSettings, ...data.digitalSettings };
    }
    if (Array.isArray(data.auditLogs)) {
      this.auditLogs = data.auditLogs;
    }
  }

  logAudit({ action, target, targetId, details, performedBy }) {
    const entry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      action, // e.g., 'ADD_GAME', 'UPDATE_GAME', 'DELETE_GAME', 'SET_SCORE', 'GLOBAL_RESET', 'ADD_TEAM', 'UPDATE_TEAM', 'DELETE_TEAM'
      target, // e.g., 'CUSTOM_GAME', 'MASTER_TEAM', 'GAME_SCORE', 'SYSTEM'
      targetId: targetId || null,
      details: details || {},
      performedBy: performedBy || 'SYSTEM',
      timestamp: new Date().toISOString()
    };

    if (!Array.isArray(this.auditLogs)) {
      this.auditLogs = [];
    }

    // Simpan hingga 100 entri log terbaru (LIFO)
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 100) {
      this.auditLogs = this.auditLogs.slice(0, 100);
    }

    return entry;
  }

  getAuditLogs(limit = 50) {
    return (this.auditLogs || []).slice(0, limit);
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        masterTeams: this.masterTeams,
        customGames: this.customGames,
        digitalSettings: this.digitalSettings,
        auditLogs: this.auditLogs || [],
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[SuperAdmin Storage Error] Gagal menulis ke storage lokal:', err.message);
    }
  }

  saveStorage() {
    this.saveLocalDisk();
    if (firebaseService.isAvailable()) {
      const payload = {
        masterTeams: this.masterTeams,
        customGames: this.customGames,
        digitalSettings: this.digitalSettings,
        auditLogs: this.auditLogs || [],
        updatedAt: new Date().toISOString()
      };
      firebaseService.saveDoc('superadmin', payload).catch(err => {
        console.error('[SuperAdmin Firebase] Gagal menyimpan ke Firestore:', err.message);
      });
    }
  }

  getStorageData() {
    return {
      masterTeams: this.masterTeams,
      customGames: this.customGames,
      digitalSettings: this.digitalSettings,
      auditLogs: this.auditLogs || [],
      updatedAt: new Date().toISOString()
    };
  }

  restoreData(data) {
    if (!data || typeof data !== 'object') return false;
    if (data.masterTeams && typeof data.masterTeams === 'object' && Object.keys(data.masterTeams).length > 0) {
      this.masterTeams = data.masterTeams;
    }
    if (Array.isArray(data.customGames)) {
      this.customGames = data.customGames;
    }
    if (data.digitalSettings && typeof data.digitalSettings === 'object') {
      this.digitalSettings = { ...this.digitalSettings, ...data.digitalSettings };
    }
    if (Array.isArray(data.auditLogs)) {
      this.auditLogs = data.auditLogs;
    }
    this.saveStorage();
    return true;
  }

  // === GLOBAL RESET FEATURE ===
  // Clears all active game session scores, resets digital games (Panjat Pinang & Tarik Tambang),
  // resets non-digital game scores, clears histories, and syncs reset state across Cloud Firestore & connected clients.
  async globalResetScores(options = {}) {
    const { resetDigital = true, resetNonDigital = true, clearHistory = true, resetCommitment = false } = options;

    // 1. Reset Digital Game 1: Panjat Pinang
    if (resetDigital) {
      gameEngine.reset();
      // Reset skor tim panjat pinang
      Object.keys(gameEngine.teams || {}).forEach(tId => {
        if (gameEngine.teams[tId]) {
          gameEngine.teams[tId].score = 0;
          gameEngine.teams[tId].currentLevel = 0;
          gameEngine.teams[tId].streak = 0;
          gameEngine.teams[tId].currentMemberIndex = 0;
        }
      });
      if (clearHistory) {
        gameEngine.history = [];
      }
      gameEngine.saveStorage();
    }

    // 2. Reset Digital Game 2: Tarik Tambang
    if (resetDigital) {
      tugEngine.reset(true);
      if (tugEngine.teamLeft) tugEngine.teamLeft.score = 0;
      if (tugEngine.teamRight) tugEngine.teamRight.score = 0;
      if (clearHistory) {
        tugEngine.history = [];
      }
      tugEngine.saveStorage();
    }

    // 3. Reset Getting Commitment (Jika dipilih)
    if (resetCommitment) {
      commitmentEngine.resetCommitment(options.resetBy || 'SUPER_ADMIN');
    }

    // 4. Reset Game Non-Digital Outbound Scores
    if (resetNonDigital && Array.isArray(this.customGames)) {
      this.customGames.forEach(game => {
        game.scores = {};
        game.status = 'ACTIVE';
      });
    }

    // 5. Simpan ke local storage dan sinkronkan ke Firebase Firestore
    this.saveStorage();

    // 6. Broadcast reset signal and sync state to Firebase global_state document
    const resetMeta = {
      resetAt: new Date().toISOString(),
      resetBy: options.resetBy || 'SUPER_ADMIN',
      status: 'RESET_COMPLETED',
      clearedDigital: resetDigital,
      clearedNonDigital: resetNonDigital,
      clearedHistory: clearHistory,
      clearedCommitment: resetCommitment
    };

    if (firebaseService.isAvailable()) {
      try {
        await firebaseService.saveDoc('global_reset', resetMeta);
        console.log('[SuperAdmin Global Reset] State berhasil disinkronkan ke Cloud Firestore doc "global_reset"');
      } catch (err) {
        console.error('[SuperAdmin Global Reset] Gagal sync ke Firestore:', err.message);
      }
    }

    this.logAudit({
      action: 'GLOBAL_RESET',
      target: 'SYSTEM',
      targetId: 'all-games',
      details: {
        resetDigital,
        resetNonDigital,
        clearHistory,
        resetCommitment
      },
      performedBy: options.resetBy || 'SUPER_ADMIN'
    });
    this.saveStorage();

    return {
      success: true,
      message: 'Seluruh skor sesi aktif dan riwayat game berhasil di-reset secara global!',
      resetMeta,
      leaderboard: this.getUnifiedLeaderboard()
    };
  }

  // === MASTER TEAMS MANAGEMENT (CRUD DINAMIS) ===
  getMasterTeams() {
    return this.masterTeams;
  }

  addTeam({ name, color, members, createdBy }) {
    if (!name || !name.trim()) throw new Error('Nama tim wajib diisi');
    const tId = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || `team-${Date.now()}`;
    if (this.masterTeams[tId]) {
      throw new Error(`Tim dengan ID '${tId}' sudah ada`);
    }

    const newTeam = {
      id: tId,
      name: name.trim(),
      color: color || '#38bdf8',
      members: Array.isArray(members) ? members : [],
      createdBy: createdBy || 'SUPER_ADMIN',
      createdAt: new Date().toISOString()
    };

    this.masterTeams[tId] = newTeam;
    this.logAudit({
      action: 'ADD_TEAM',
      target: 'MASTER_TEAM',
      targetId: tId,
      details: { name: newTeam.name, membersCount: newTeam.members.length },
      performedBy: createdBy || 'SUPER_ADMIN'
    });
    this.saveStorage();
    return newTeam;
  }

  updateTeam(tId, { name, color, members, updatedBy }) {
    if (!this.masterTeams[tId]) {
      throw new Error(`Tim dengan ID '${tId}' tidak ditemukan`);
    }
    const team = this.masterTeams[tId];
    if (name) team.name = name.trim();
    if (color) team.color = color.trim();
    if (Array.isArray(members)) team.members = members;
    team.updatedBy = updatedBy || 'SUPER_ADMIN';
    team.updatedAt = new Date().toISOString();

    this.logAudit({
      action: 'UPDATE_TEAM',
      target: 'MASTER_TEAM',
      targetId: tId,
      details: { name: team.name, membersCount: team.members.length },
      performedBy: updatedBy || 'SUPER_ADMIN'
    });
    this.saveStorage();
    this.propagateToActiveGames(team);
    return team;
  }

  deleteTeam(tId, deletedBy = 'SUPER_ADMIN') {
    if (!this.masterTeams[tId]) {
      throw new Error(`Tim dengan ID '${tId}' tidak ditemukan`);
    }
    const deleted = this.masterTeams[tId];
    delete this.masterTeams[tId];

    // Bersihkan juga nilai tim ini dari seluruh game non-digital
    this.customGames.forEach(game => {
      if (game.scores && game.scores[tId] !== undefined) {
        delete game.scores[tId];
      }
    });

    this.logAudit({
      action: 'DELETE_TEAM',
      target: 'MASTER_TEAM',
      targetId: tId,
      details: { name: deleted.name },
      performedBy: deletedBy
    });
    this.saveStorage();
    return deleted;
  }

  resetTeamsToDefault() {
    this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
    this.saveStorage();
    Object.values(this.masterTeams).forEach(team => {
      this.propagateToActiveGames(team);
    });
    return this.masterTeams;
  }

  // === SINKRONISASI PEMAIN / ANGGOTA TIM KE SELURUH GAME (SINGLE SOURCE OF TRUTH) ===
  propagateToActiveGames(teamData) {
    if (!teamData || !teamData.name) return { gameEngineChanged: false, tugEngineChanged: false };
    const teamNameUpper = (teamData.name || '').trim().toUpperCase();
    const teamId = teamData.id;

    // 1. Sinkronkan ke GameEngine (Panjat Pinang)
    let gameEngineChanged = false;
    if (gameEngine && gameEngine.teams) {
      Object.keys(gameEngine.teams).forEach(tId => {
        const gTeam = gameEngine.teams[tId];
        if (gTeam && ((gTeam.name && gTeam.name.trim().toUpperCase() === teamNameUpper) || tId === teamId)) {
          gTeam.name = teamData.name;
          if (teamData.color) gTeam.color = teamData.color;
          if (Array.isArray(teamData.members)) {
            gTeam.members = JSON.parse(JSON.stringify(teamData.members));
          }
          gameEngineChanged = true;
        }
      });
      if (gameEngineChanged) {
        gameEngine.saveStorage();
      }
    }

    // 2. Sinkronkan ke TugEngine (Tarik Tambang)
    let tugEngineChanged = false;
    if (tugEngine) {
      ['teamLeft', 'teamRight'].forEach(side => {
        const tTeam = tugEngine[side];
        if (tTeam && ((tTeam.name && tTeam.name.trim().toUpperCase() === teamNameUpper) || tTeam.id === teamId)) {
          tTeam.name = teamData.name;
          if (teamData.color) tTeam.color = teamData.color;
          if (Array.isArray(teamData.members)) {
            tTeam.members = JSON.parse(JSON.stringify(teamData.members));
          }
          tugEngineChanged = true;
        }
      });
      if (tugEngineChanged) {
        tugEngine.saveStorage();
      }
    }

    // 3. Sinkronkan ke DoorprizeEngine (Peserta Terintegrasi Single Source of Truth)
    let doorprizeChanged = false;
    try {
      const doorprizeEngine = require('./doorprize-engine');
      if (doorprizeEngine && typeof doorprizeEngine.syncWithMasterTeams === 'function') {
        doorprizeEngine.syncWithMasterTeams(this.masterTeams, true);
        doorprizeChanged = true;
      }
    } catch (e) {
      console.warn('[SuperAdmin] Gagal sinkronisasi ke Doorprize Engine:', e.message);
    }

    return { gameEngineChanged, tugEngineChanged, doorprizeChanged };
  }

  syncTeamData(identifier, { name, color, members, updatedBy }) {
    if (!identifier && !name) return null;
    const cleanId = (identifier || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanName = (name || '').trim();
    const nameUpper = cleanName.toUpperCase();

    // Cari tim yang cocok di masterTeams (berdasarkan ID atau Nama)
    let targetKey = null;
    if (cleanId && this.masterTeams[cleanId]) {
      targetKey = cleanId;
    } else {
      // Cari via kesamaan nama
      targetKey = Object.keys(this.masterTeams).find(k => {
        const t = this.masterTeams[k];
        return (t.name && t.name.trim().toUpperCase() === nameUpper) || k === cleanId;
      });
    }

    let teamObj = null;
    if (targetKey && this.masterTeams[targetKey]) {
      teamObj = this.masterTeams[targetKey];
      if (cleanName) teamObj.name = cleanName;
      if (color) teamObj.color = color.trim();
      if (Array.isArray(members) && members.length > 0) {
        teamObj.members = JSON.parse(JSON.stringify(members));
      }
      teamObj.updatedBy = updatedBy || 'SYNC_AUTO';
      teamObj.updatedAt = new Date().toISOString();
    } else {
      // Buat tim baru jika belum pernah ada di master
      const newId = cleanId || cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || `team-${Date.now()}`;
      teamObj = {
        id: newId,
        name: cleanName || `Tim ${newId}`,
        color: color || '#38bdf8',
        members: Array.isArray(members) ? JSON.parse(JSON.stringify(members)) : [],
        createdBy: updatedBy || 'SYNC_AUTO',
        createdAt: new Date().toISOString()
      };
      this.masterTeams[newId] = teamObj;
      targetKey = newId;
    }

    this.saveStorage();
    const syncResult = this.propagateToActiveGames(teamObj);

    return {
      team: teamObj,
      targetKey,
      ...syncResult
    };
  }

  // === PERHITUNGAN DIGITAL POINTS ===
  getDigitalPoints() {
    const teams = this.masterTeams;
    const digitalScores = {};

    Object.keys(teams).forEach(tId => {
      digitalScores[tId] = {
        pinangScore: 0,
        pinangWins: 0,
        tugScore: 0,
        tugWins: 0,
        totalDigital: 0
      };
    });

    // Helper match ID / Nama tim
    const findTeamId = (idOrName) => {
      if (!idOrName) return null;
      if (teams[idOrName]) return idOrName;
      const lower = idOrName.toString().toLowerCase().trim();
      for (const [tId, t] of Object.entries(teams)) {
        if (tId.toLowerCase() === lower || t.name.toLowerCase() === lower) {
          return tId;
        }
      }
      return null;
    };

    // 1. Poin dari Panjat Pinang
    // A. Skor aktif (hanya dihitung jika includeActiveScore aktif dan game sedang bermain)
    if (this.digitalSettings.includeActiveScore && gameEngine.status === 'PLAYING') {
      Object.entries(gameEngine.teams || {}).forEach(([tKey, team]) => {
        const matchedId = findTeamId(team.id) || findTeamId(team.name) || findTeamId(tKey);
        if (matchedId && digitalScores[matchedId]) {
          digitalScores[matchedId].pinangScore += (team.score || 0);
        }
      });
    }

    // B. Riwayat sesi Panjat Pinang (Aturan 300 Pemenang / 150 Kalah / 150 Seri)
    const pinangHistory = gameEngine.history || [];
    pinangHistory.forEach(session => {
      if (session.matchScores && typeof session.matchScores === 'object' && Object.keys(session.matchScores).length > 0) {
        Object.entries(session.matchScores).forEach(([tKey, pts]) => {
          const matchedId = findTeamId(tKey);
          if (matchedId && digitalScores[matchedId]) {
            digitalScores[matchedId].pinangScore += (Number(pts) || 0);
          }
        });
        if (session.winner && session.winner.name) {
          const winId = findTeamId(session.winner.id) || findTeamId(session.winner.name);
          if (winId && digitalScores[winId]) {
            digitalScores[winId].pinangWins += 1;
          }
        }
      } else {
        if (session.winner && session.winner.name) {
          const matchedId = findTeamId(session.winner.id) || findTeamId(session.winner.name);
          if (matchedId && digitalScores[matchedId]) {
            digitalScores[matchedId].pinangWins += 1;
            digitalScores[matchedId].pinangScore += (this.digitalSettings.pinangPointsPerWin || 300);
          }
        }
      }
    });

    // 2. Poin dari Tarik Tambang
    const tugHistory = tugEngine.history || [];
    tugHistory.forEach(session => {
      if (session.winner && session.winner.name) {
        const matchedId = findTeamId(session.winner.name);
        if (matchedId && digitalScores[matchedId]) {
          digitalScores[matchedId].tugWins += 1;
          digitalScores[matchedId].tugScore += this.digitalSettings.tugPointsPerWin;
        }
      }
    });

    // Hitung total digital
    Object.keys(digitalScores).forEach(tId => {
      digitalScores[tId].totalDigital = digitalScores[tId].pinangScore + digitalScores[tId].tugScore;
    });

    return digitalScores;
  }

  // === UNIFIED LEADERBOARD DENGAN KOLOM GAME FISIK DINAMIS ===
  getUnifiedLeaderboard() {
    const teams = this.masterTeams;
    const digitalPoints = this.getDigitalPoints();

    const leaderboard = [];

    Object.entries(teams).forEach(([tId, team]) => {
      const dPoint = digitalPoints[tId] || {
        pinangScore: 0,
        pinangWins: 0,
        tugScore: 0,
        tugWins: 0,
        totalDigital: 0
      };

      // Hitung skor dari setiap game non-digital secara dinamis
      const nonDigitalBreakdown = {};
      let totalNonDigital = 0;

      this.customGames.forEach(game => {
        const score = (game.scores && typeof game.scores[tId] === 'number') ? game.scores[tId] : 0;
        nonDigitalBreakdown[game.id] = score;
        totalNonDigital += score;
      });

      const grandTotal = dPoint.totalDigital + totalNonDigital;

      leaderboard.push({
        teamId: tId,
        teamName: team.name,
        teamColor: team.color,
        membersCount: team.members ? team.members.length : 0,
        members: team.members || [],
        digital: dPoint,
        nonDigitalScores: nonDigitalBreakdown, // map: { [gameId]: score }
        totalNonDigital,
        grandTotal
      });
    });

    // Urutkan berdasarkan Grand Total (tertinggi ke terendah)
    leaderboard.sort((a, b) => b.grandTotal - a.grandTotal);

    // Tandai peringkat (1, 2, 3...)
    leaderboard.forEach((item, index) => {
      item.rank = index + 1;
    });

    return {
      leaderboard,
      customGames: this.customGames,
      digitalSettings: this.digitalSettings,
      totalTeams: Object.keys(teams).length,
      totalGames: 2 + this.customGames.length,
      updatedAt: new Date().toISOString()
    };
  }

  // === CRUD CUSTOM GAMES (NON-DIGITAL) ===
  getCustomGames() {
    return this.customGames;
  }

  addCustomGame({ title, emoji, description, rules, scores, maxScore, createdBy }) {
    if (!title || !title.trim()) {
      throw new Error('Judul game wajib diisi');
    }

    const id = `game-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newGame = {
      id,
      title: title.trim(),
      emoji: emoji ? emoji.trim() : '🎯',
      description: description ? description.trim() : '',
      rules: rules ? rules.trim() : '',
      scores: scores && typeof scores === 'object' ? scores : {},
      maxScore: typeof maxScore === 'number' ? maxScore : 300,
      status: 'ACTIVE',
      createdBy: createdBy || 'SUPER_ADMIN',
      createdAt: new Date().toISOString()
    };

    this.customGames.push(newGame);
    this.logAudit({
      action: 'ADD_GAME',
      target: 'CUSTOM_GAME',
      targetId: id,
      details: { title: newGame.title, emoji: newGame.emoji },
      performedBy: createdBy || 'SUPER_ADMIN'
    });
    this.saveStorage();
    return newGame;
  }

  updateCustomGame(id, updateData) {
    const idx = this.customGames.findIndex(g => g.id === id);
    if (idx === -1) {
      throw new Error(`Game dengan ID ${id} tidak ditemukan`);
    }

    const existing = this.customGames[idx];
    if (updateData.title) existing.title = updateData.title.trim();
    if (updateData.emoji) existing.emoji = updateData.emoji.trim();
    if (typeof updateData.description === 'string') existing.description = updateData.description.trim();
    if (typeof updateData.rules === 'string') existing.rules = updateData.rules.trim();
    if (updateData.scores && typeof updateData.scores === 'object') {
      existing.scores = { ...existing.scores, ...updateData.scores };
    }
    if (typeof updateData.maxScore === 'number') existing.maxScore = updateData.maxScore;
    if (updateData.status) existing.status = updateData.status;

    existing.updatedBy = updateData.updatedBy || 'SUPER_ADMIN';
    existing.updatedAt = new Date().toISOString();

    this.logAudit({
      action: 'UPDATE_GAME',
      target: 'CUSTOM_GAME',
      targetId: id,
      details: { title: existing.title, updatedFields: Object.keys(updateData) },
      performedBy: updateData.updatedBy || 'SUPER_ADMIN'
    });
    this.saveStorage();
    return existing;
  }

  // Update skor tim tunggal secara langsung (Insert / Update / Delete Score)
  setGameScore(gameId, teamId, score, setBy = 'SUPER_ADMIN') {
    const game = this.customGames.find(g => g.id === gameId);
    if (!game) throw new Error(`Game dengan ID ${gameId} tidak ditemukan`);
    if (!this.masterTeams[teamId]) throw new Error(`Tim dengan ID ${teamId} tidak ditemukan`);

    if (!game.scores) game.scores = {};
    const oldScore = game.scores[teamId] !== undefined ? game.scores[teamId] : null;

    if (score === null || score === undefined || score === '') {
      delete game.scores[teamId];
    } else {
      game.scores[teamId] = parseInt(score, 10) || 0;
    }

    game.updatedBy = setBy;
    game.updatedAt = new Date().toISOString();

    this.logAudit({
      action: 'SET_SCORE',
      target: 'GAME_SCORE',
      targetId: `${gameId}:${teamId}`,
      details: {
        gameTitle: game.title,
        teamName: this.masterTeams[teamId].name,
        oldScore,
        newScore: game.scores[teamId] !== undefined ? game.scores[teamId] : 0
      },
      performedBy: setBy
    });

    this.saveStorage();
    return { gameId, teamId, score: game.scores[teamId] || 0 };
  }

  initDefaultGames() {
    this.customGames = [
      {
        id: 'game-pipa-bocor',
        title: 'SUSUN KATA',
        emoji: '🪣',
        description: 'Setiap peserta menyebutkan satu huruf dari kata yang diberikan oleh panitia',
        rules: 'peserta berdiri berjajar atau ke samping\n*Panitia memberikan satu kata yang harus di sebutkan perhuruf oleh peserta\n*Setiap kelompok akan mendapatkan 5 kata\n*Setiap kata yang benar akan mendapatkan 100 point\n*waktu yang diberikan 15 menit',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'COMPLETED',
        createdAt: '2026-09-17T01:12:28.451Z',
        updatedAt: '2026-09-17T07:00:56.027Z'
      },
      {
        id: 'game-yel-yel',
        title: 'SEDOT KERTAS',
        emoji: '📣',
        description: 'Peserta memindahkan memasukan kertas ke gelas plastik',
        rules: 'sedot kertas di titik A lalu di transfer ke peserta di sampingnya menggunakan sedotan sampai dengan peserta terakhir,peserta terakhir memasukan kertas ke dalam gelas',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'COMPLETED',
        createdAt: '2026-09-17T01:12:28.452Z',
        updatedAt: '2026-09-17T07:02:05.178Z'
      },
      {
        id: 'game-1789628981942-ybw7',
        title: 'ESTAFET BOLA',
        emoji: '🎯',
        description: 'Memindahkan bola pingpong dari baskom yang berisi air secara estafet dan bergantian',
        rules: 'peserta berbaris ke belakang,pasang gelas plastik di kepala,peserta ambil bola pingpong dari baskom secara estafet jika bola pertama sudah masuk ke baskom yg kosong,lalu di lanjutkan ke peserta kedua,peserta pertama pindah ke belakang,point di hitung dari jumlah bola yang di pindahkan ,satu bola 100 point',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:09:41.942Z'
      },
      {
        id: 'game-1789629224742-exil',
        title: 'ESTAFET ZIG-ZAG',
        emoji: '🎯',
        description: 'Peserta bergandengan tangan lalu berjalan zigzag melewati cones',
        rules: 'Tangan peserta saling bergandengan ,berjalan melewati cones secara zig zag,point di mabil dari waktu yang tercepat,pointnya 120-100-80-60-40-20',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:13:44.742Z'
      },
      {
        id: 'game-1789629436485-ypyh',
        title: 'RELAY DRIBLING',
        emoji: '🎯',
        description: 'Peserta memindahkan balon dari depan ke belakang',
        rules: 'Peserta berbaris,tangan peserta kedua dst memegang pundak peserta yang depannya,balon di arahkan ke belakang balonnya tidak boleh jatuh,point terbesar di hitung dari kelompok yang tercepat,point 120-100-80-60-40-20',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:17:16.485Z'
      },
      {
        id: 'game-1789629877839-jb1c',
        title: 'TRIBAL GAME',
        emoji: '🎯',
        description: 'Peserta memeragakan kata yg di berikan panitia',
        rules: 'Peserta berbaris,peserta yg paling belakang akan di info kata oleh panitia,peserta memeragakan dari KATA yang di berikan oleh panitia,tidak boleh bersuara,point di hitung dari kata yang di bisa di tebak dengan benar',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:24:37.839Z'
      },
      {
        id: 'game-1789630007800-bodj',
        title: 'GRASAK-GRUSUK',
        emoji: '🎯',
        description: 'Merapihkan bangku di ruangan',
        rules: 'peserta memindahkan  bangku dan di susun sesuai kelompok,kelompok yg bisa merapihkan bangku di bawah 1 menit akan mendapatkan point sebesar 300 point',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:26:47.800Z'
      },
      {
        id: 'game-1789630235103-ksop',
        title: 'COLABORATION',
        emoji: '🎯',
        description: 'Menjawab kata-kata dari clue yg diberikan',
        rules: 'kelompok menjawab kata dari kumpulan clue yang ada ,point nilai 300 point',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:30:35.103Z'
      },
      {
        id: 'game-1789630463687-g576',
        title: 'GAME ONLINE',
        emoji: '🎯',
        description: 'Peserta menjawab pertanyaan via WA',
        rules: 'ketua kelompok menjawab pertanyaan yg di berikan oleh painitia di grou panitia,kirim via WA,penjawab tercepat dan benar mendapatkan 100 point',
        scores: { qatra: 0, vbom: 0, omega: 0, ipc: 0, interlock: 0, avatar: 0 },
        maxScore: 300,
        status: 'ACTIVE',
        createdAt: '2026-09-17T07:34:23.687Z'
      }
    ];
  }

  deleteCustomGame(id, deletedBy = 'SUPER_ADMIN') {
    const idx = this.customGames.findIndex(g => g.id === id);
    if (idx === -1) {
      throw new Error(`Game dengan ID ${id} tidak ditemukan`);
    }
    const removed = this.customGames.splice(idx, 1)[0];
    this.logAudit({
      action: 'DELETE_GAME',
      target: 'CUSTOM_GAME',
      targetId: id,
      details: { title: removed.title },
      performedBy: deletedBy
    });
    this.saveStorage();
    return removed;
  }

  updateDigitalSettings(settings) {
    if (!settings || typeof settings !== 'object') return this.digitalSettings;
    if (typeof settings.pinangPointsPerWin === 'number') {
      this.digitalSettings.pinangPointsPerWin = settings.pinangPointsPerWin;
    }
    if (typeof settings.pinangPointsPerLose === 'number') {
      this.digitalSettings.pinangPointsPerLose = settings.pinangPointsPerLose;
    }
    if (typeof settings.pinangPointsPerDraw === 'number') {
      this.digitalSettings.pinangPointsPerDraw = settings.pinangPointsPerDraw;
    }
    if (typeof settings.pinangTurnTimeoutSeconds === 'number') {
      this.digitalSettings.pinangTurnTimeoutSeconds = settings.pinangTurnTimeoutSeconds;
    }
    if (typeof settings.tugPointsPerWin === 'number') {
      this.digitalSettings.tugPointsPerWin = settings.tugPointsPerWin;
    }
    if (typeof settings.includeActiveScore === 'boolean') {
      this.digitalSettings.includeActiveScore = settings.includeActiveScore;
    }
    this.saveStorage();
    return this.digitalSettings;
  }
}

module.exports = new SuperAdminEngine();
