const fs = require('fs');
const path = require('path');
const gameEngine = require('./game-engine');
const tugEngine = require('./tug-engine');

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
        if (data.masterTeams && typeof data.masterTeams === 'object' && Object.keys(data.masterTeams).length > 0) {
          this.masterTeams = data.masterTeams;
        } else {
          this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
        }

        if (Array.isArray(data.customGames)) {
          this.customGames = data.customGames;
        } else {
          this.initDefaultGames();
        }

        if (data.digitalSettings && typeof data.digitalSettings === 'object') {
          this.digitalSettings = { ...this.digitalSettings, ...data.digitalSettings };
        }
        console.log(`[SuperAdmin Storage] Loaded ${Object.keys(this.masterTeams).length} teams & ${this.customGames.length} custom games.`);
      } else {
        this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
        this.initDefaultGames();
        this.saveStorage();
      }
    } catch (err) {
      console.error('[SuperAdmin Storage Error] Gagal membaca storage:', err.message);
      this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
      this.initDefaultGames();
    }
  }

  initDefaultGames() {
    this.customGames = [
      {
        id: 'game-pipa-bocor',
        title: 'Pipa Bocor',
        emoji: '🪣',
        description: 'Tantangan kekompakan menutup lubang pipa bocor agar bola pingpong dapat mengapung ke atas.',
        rules: 'Hanya boleh menggunakan telapak tangan dan jari untuk menutup pipa. Air dari ember tidak boleh tercecer keluar lapangan.',
        scores: {
          qatra: 220,
          vbom: 250,
          omega: 270,
          ipc: 240,
          interlock: 260,
          avatar: 300
        },
        maxScore: 300,
        status: 'COMPLETED',
        createdAt: new Date().toISOString()
      },
      {
        id: 'game-yel-yel',
        title: 'Yel-Yel & Formasi Kreatif',
        emoji: '📣',
        description: 'Penilaian kreativitas, kekompakan, dan semangat tempur saat meneriakkan yel-yel kebanggaan regu.',
        rules: 'Waktu tampil maksimal 3 menit. Dinilai berdasarkan kekompakan, vokal, koreografi, dan kostum/atribut.',
        scores: {
          qatra: 260,
          vbom: 280,
          omega: 250,
          ipc: 270,
          interlock: 290,
          avatar: 290
        },
        maxScore: 300,
        status: 'COMPLETED',
        createdAt: new Date().toISOString()
      }
    ];
  }

  saveStorage() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        masterTeams: this.masterTeams,
        customGames: this.customGames,
        digitalSettings: this.digitalSettings,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[SuperAdmin Storage Error] Gagal menulis ke storage:', err.message);
    }
  }

  getStorageData() {
    return {
      masterTeams: this.masterTeams,
      customGames: this.customGames,
      digitalSettings: this.digitalSettings,
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
    this.saveStorage();
    return true;
  }

  // === MASTER TEAMS MANAGEMENT (CRUD DINAMIS) ===
  getMasterTeams() {
    return this.masterTeams;
  }

  addTeam({ name, color, members }) {
    if (!name || !name.trim()) throw new Error('Nama tim wajib diisi');
    const tId = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || `team-${Date.now()}`;
    if (this.masterTeams[tId]) {
      throw new Error(`Tim dengan ID '${tId}' sudah ada`);
    }

    const newTeam = {
      id: tId,
      name: name.trim(),
      color: color || '#38bdf8',
      members: Array.isArray(members) ? members : []
    };

    this.masterTeams[tId] = newTeam;
    this.saveStorage();
    return newTeam;
  }

  updateTeam(tId, { name, color, members }) {
    if (!this.masterTeams[tId]) {
      throw new Error(`Tim dengan ID '${tId}' tidak ditemukan`);
    }
    const team = this.masterTeams[tId];
    if (name) team.name = name.trim();
    if (color) team.color = color.trim();
    if (Array.isArray(members)) team.members = members;

    this.saveStorage();
    return team;
  }

  deleteTeam(tId) {
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

    this.saveStorage();
    return deleted;
  }

  resetTeamsToDefault() {
    this.masterTeams = JSON.parse(JSON.stringify(DEFAULT_PRELOADER_TEAMS));
    this.saveStorage();
    return this.masterTeams;
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

  addCustomGame({ title, emoji, description, rules, scores, maxScore }) {
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
      createdAt: new Date().toISOString()
    };

    this.customGames.push(newGame);
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

    existing.updatedAt = new Date().toISOString();
    this.saveStorage();
    return existing;
  }

  // Update skor tim tunggal secara langsung (Insert / Update / Delete Score)
  setGameScore(gameId, teamId, score) {
    const game = this.customGames.find(g => g.id === gameId);
    if (!game) throw new Error(`Game dengan ID ${gameId} tidak ditemukan`);
    if (!this.masterTeams[teamId]) throw new Error(`Tim dengan ID ${teamId} tidak ditemukan`);

    if (!game.scores) game.scores = {};
    if (score === null || score === undefined || score === '') {
      delete game.scores[teamId];
    } else {
      game.scores[teamId] = parseInt(score, 10) || 0;
    }

    this.saveStorage();
    return { gameId, teamId, score: game.scores[teamId] || 0 };
  }

  deleteCustomGame(id) {
    const idx = this.customGames.findIndex(g => g.id === id);
    if (idx === -1) {
      throw new Error(`Game dengan ID ${id} tidak ditemukan`);
    }
    const removed = this.customGames.splice(idx, 1)[0];
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
