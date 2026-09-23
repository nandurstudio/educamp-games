const fs = require('fs');
const path = require('path');
const questionBank = require('./question-bank');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/game-storage.json');

class GameEngine {
  constructor() {
    this.reset();
    this.history = [];
    this.loadStorage();
  }

  loadStorage() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyStorageData(data);
        console.log(`[Storage Loaded] Berhasil me-load konfigurasi dari data/game-storage.json (${Object.keys(this.teams).length} tim terdaftar, ${this.history.length} sesi riwayat)`);
      }
    } catch (err) {
      console.error('[Storage Error] Gagal membaca storage lokal:', err.message);
    }

    if (firebaseService.isAvailable()) {
      this.reloadFromFirebase();
    }
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const cloudData = await firebaseService.loadDoc('panjat_pinang');
      if (cloudData && typeof cloudData === 'object') {
        this.applyStorageData(cloudData);
        console.log(`[Panjat Pinang Firebase] Berhasil reload konfigurasi dari Firestore (${this.history.length} riwayat pertandingan)!`);
        this.saveLocalDisk();
        return true;
      }
    } catch (err) {
      console.error('[Panjat Pinang Firebase] Gagal load dari Firestore:', err.message);
    }
    return false;
  }

  applyStorageData(data) {
    if (!data || typeof data !== 'object') return;
    if (data.mode) this.mode = data.mode;
    if (data.wipeoutMode) this.wipeoutMode = data.wipeoutMode;
    if (typeof data.durationSeconds === 'number') {
      this.durationSeconds = data.durationSeconds;
      this.remainingSeconds = data.durationSeconds;
    }
    if (typeof data.pointsPerCorrect === 'number') {
      this.pointsPerCorrect = data.pointsPerCorrect;
    }
    if (typeof data.turnTimeoutSeconds === 'number') {
      this.turnTimeoutSeconds = data.turnTimeoutSeconds;
    }
    if (typeof data.winScore === 'number') {
      this.winScore = data.winScore;
    }
    if (typeof data.loseScore === 'number') {
      this.loseScore = data.loseScore;
    }
    if (typeof data.drawScore === 'number') {
      this.drawScore = data.drawScore;
    }
    if (Array.isArray(data.history)) {
      this.history = data.history;
    }
    if (data.teams && typeof data.teams === 'object') {
      this.setTeamsConfig(data.teams, false);
    }
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        mode: this.mode,
        wipeoutMode: this.wipeoutMode,
        durationSeconds: this.durationSeconds,
        pointsPerCorrect: this.pointsPerCorrect || 100,
        turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
        winScore: typeof this.winScore === 'number' ? this.winScore : 300,
        loseScore: typeof this.loseScore === 'number' ? this.loseScore : 150,
        drawScore: typeof this.drawScore === 'number' ? this.drawScore : 150,
        history: this.history || [],
        teams: {}
      };
      Object.entries(this.teams).forEach(([tId, team]) => {
        data.teams[tId] = {
          id: team.id,
          name: team.name,
          color: team.color,
          members: team.members
        };
      });
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Storage Error] Gagal menyimpan ke storage lokal:', err.message);
    }
  }

  saveStorage() {
    this.saveLocalDisk();
    if (firebaseService.isAvailable()) {
      const data = {
        mode: this.mode,
        wipeoutMode: this.wipeoutMode,
        durationSeconds: this.durationSeconds,
        pointsPerCorrect: this.pointsPerCorrect || 100,
        turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
        winScore: typeof this.winScore === 'number' ? this.winScore : 300,
        loseScore: typeof this.loseScore === 'number' ? this.loseScore : 150,
        drawScore: typeof this.drawScore === 'number' ? this.drawScore : 150,
        history: this.history || [],
        teams: {}
      };
      Object.entries(this.teams).forEach(([tId, team]) => {
        data.teams[tId] = {
          id: team.id,
          name: team.name,
          color: team.color,
          members: team.members
        };
      });
      firebaseService.saveDoc('panjat_pinang', data).catch(err => {
        console.error('[Panjat Pinang Firebase] Gagal menyimpan ke Firestore:', err.message);
      });
    }
  }

  reset() {
    this.status = 'WAITING'; // WAITING, PLAYING, FINISHED
    this.mode = 'VERSUS'; // SINGLE, VERSUS
    this.wipeoutMode = 'HARDCORE'; // HARDCORE (reset 0), SLIP (turun 1 level)
    this.targetHeight = 8;
    this.durationSeconds = 300; // Default 5 menit
    this.remainingSeconds = 300;
    this.turnTimeoutSeconds = 15; // Default 15 detik per giliran menjawab
    this.winScore = 300; // Default 300 poin pemenang selesai game
    this.loseScore = 150; // Default 150 poin kalah selesai game
    this.drawScore = 150; // Default 150 poin seri selesai game
    this.winnerReason = null;
    this.isDraw = false;
    this.matchScores = {};
    this.teams = {};
    this.winner = null;
    this.startTime = null;
    this.endTime = null;
    this.sessionRecorded = false;
  }

  setMode(mode) {
    this.mode = mode;
    this.saveStorage();
  }

  setTeamsConfig(newTeams, shouldPersist = true) {
    if (!newTeams || typeof newTeams !== 'object') return;
    const existing = this.teams;
    const updated = {};

    Object.keys(newTeams).forEach(tId => {
      const current = existing[tId] || {};
      const incoming = newTeams[tId];
      updated[tId] = {
        id: tId,
        name: incoming.name || current.name || `Tim ${tId}`,
        color: incoming.color || current.color || '#e74c3c',
        members: (Array.isArray(incoming.members) && incoming.members.length > 0)
          ? incoming.members
          : (current.members || [
              { name: 'Anggota 1', bodyType: 'tall-skinny', skinTone: 'fair' },
              { name: 'Anggota 2', bodyType: 'tall-chubby', skinTone: 'tan' },
              { name: 'Anggota 3', bodyType: 'short-skinny', skinTone: 'olive' }
            ]),
        currentClimbers: current.currentClimbers || 0,
        currentTurnIndex: current.currentTurnIndex || 0,
        score: current.score || 0,
        streak: current.streak || 0,
        activeQuestion: current.activeQuestion || null
      };
    });

    if (Object.keys(updated).length > 0) {
      this.teams = updated;
      if (shouldPersist) {
        this.saveStorage();
      }
    }
  }

  updateTeamConfig(teamId, { name, color, members }) {
    if (!this.teams[teamId]) {
      this.teams[teamId] = {
        id: teamId,
        name: name || `Tim ${teamId}`,
        color: color || '#e74c3c',
        members: members || [],
        currentClimbers: 0,
        currentTurnIndex: 0,
        score: 0,
        streak: 0,
        activeQuestion: null
      };
    } else {
      if (name) this.teams[teamId].name = name;
      if (color) this.teams[teamId].color = color;
      if (Array.isArray(members) && members.length > 0) {
        this.teams[teamId].members = members;
      }
    }
  }

  startGame() {
    this.status = 'PLAYING';
    this.winner = null;
    this.winnerReason = null;
    this.isDraw = false;
    this.matchScores = {};
    this.startTime = Date.now();
    this.endTime = null;
    this.remainingSeconds = this.durationSeconds;
    this.targetHeight = Math.max(...Object.values(this.teams).map(t => t.members.length));
    this.sessionRecorded = false;

    // Reset progress tiap tim & beri pertanyaan pertama
    Object.values(this.teams).forEach(team => {
      team.currentClimbers = 0;
      team.currentTurnIndex = 0;
      team.score = 0;
      team.streak = 0;
      team.activeQuestion = this.pickNextQuestion(team.id);
      team.questionStartTime = Date.now();
    });
  }

  recordSession() {
    if (this.sessionRecorded) return null;
    this.sessionRecorded = true;
    try {
      const elapsedSeconds = this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0;
      const scoresSummary = {};
      Object.entries(this.teams).forEach(([tId, team]) => {
        scoresSummary[tId] = {
          name: team.name,
          color: team.color,
          climbers: team.currentClimbers,
          score: team.score,
          totalMembers: team.members.length,
          finalMatchScore: (this.matchScores && this.matchScores[tId] !== undefined) ? this.matchScores[tId] : team.score
        };
      });

      const sessionRecord = {
        id: `sesi-${Date.now()}`,
        timestamp: new Date().toISOString(),
        mode: this.mode,
        wipeoutMode: this.wipeoutMode,
        durationSeconds: this.durationSeconds,
        elapsedSeconds: Math.min(elapsedSeconds, this.durationSeconds),
        winner: this.winner ? {
          id: this.winner.id,
          name: this.winner.name,
          color: this.winner.color
        } : null,
        winnerReason: this.winnerReason,
        isDraw: this.isDraw || false,
        matchScores: this.matchScores || {},
        winScore: this.winScore,
        loseScore: this.loseScore,
        drawScore: this.drawScore,
        scores: scoresSummary
      };

      if (!Array.isArray(this.history)) {
        this.history = [];
      }
      this.history.unshift(sessionRecord); // Terbaru di awal
      // Simpan maksimal 50 riwayat terakhir
      if (this.history.length > 50) {
        this.history = this.history.slice(0, 50);
      }
      this.saveStorage();
      console.log(`[History Recorded] Sesi permainan tercatat: ${sessionRecord.isDraw ? 'SERI' : (sessionRecord.winner ? sessionRecord.winner.name : 'Tanpa Pemenang')} (${sessionRecord.winnerReason})`);
      return sessionRecord;
    } catch (err) {
      console.error('[History Error] Gagal mencatat riwayat sesi:', err.message);
      return null;
    }
  }

  clearHistory() {
    this.history = [];
    this.saveStorage();
  }

  handleTimeout() {
    if (this.status !== 'PLAYING') return null;
    this.status = 'FINISHED';
    this.endTime = Date.now();
    this.remainingSeconds = 0;

    const teamsArr = Object.values(this.teams);
    this.matchScores = {};

    if (teamsArr.length === 2) {
      const teamA = teamsArr[0];
      const teamB = teamsArr[1];

      if (teamA.currentClimbers > teamB.currentClimbers) {
        // Aturan 1: Pemenang adalah tim yang orangnya paling banyak ketika waktu habis -> skor 300
        this.winner = teamA;
        this.winnerReason = 'TIME_OUT_MOST_CLIMBERS';
        this.isDraw = false;
        teamA.score = this.winScore;
        teamB.score = this.loseScore;
        this.matchScores[teamA.id] = this.winScore;
        this.matchScores[teamB.id] = this.loseScore;
      } else if (teamB.currentClimbers > teamA.currentClimbers) {
        this.winner = teamB;
        this.winnerReason = 'TIME_OUT_MOST_CLIMBERS';
        this.isDraw = false;
        teamB.score = this.winScore;
        teamA.score = this.loseScore;
        this.matchScores[teamB.id] = this.winScore;
        this.matchScores[teamA.id] = this.loseScore;
      } else {
        // Aturan 3: Seri adalah jumlah orang sama kanan-kiri dan waktu habis dengan skor masing-masing 150
        this.winner = null;
        this.winnerReason = 'DRAW';
        this.isDraw = true;
        teamA.score = this.drawScore;
        teamB.score = this.drawScore;
        this.matchScores[teamA.id] = this.drawScore;
        this.matchScores[teamB.id] = this.drawScore;
      }
    } else {
      teamsArr.sort((a, b) => b.currentClimbers - a.currentClimbers);
      if (teamsArr.length > 1 && teamsArr[0].currentClimbers === teamsArr[1].currentClimbers) {
        this.winner = null;
        this.winnerReason = 'DRAW';
        this.isDraw = true;
        teamsArr.forEach(t => {
          t.score = this.drawScore;
          this.matchScores[t.id] = this.drawScore;
        });
      } else if (teamsArr.length > 0) {
        this.winner = teamsArr[0];
        this.winnerReason = 'TIME_OUT_MOST_CLIMBERS';
        this.isDraw = false;
        teamsArr.forEach((t, idx) => {
          const s = (idx === 0) ? this.winScore : this.loseScore;
          t.score = s;
          this.matchScores[t.id] = s;
        });
      }
    }

    const session = this.recordSession();

    return {
      status: this.status,
      winner: this.winner,
      winnerReason: this.winnerReason,
      isDraw: this.isDraw,
      matchScores: this.matchScores,
      teams: this.teams,
      session
    };
  }

  handleTurnTimeout(teamId) {
    if (this.status !== 'PLAYING') return null;
    const team = this.teams[teamId];
    if (!team) return null;

    const answeredBy = team.members[team.currentTurnIndex] ? team.members[team.currentTurnIndex].name : 'Peserta';

    // Penalti batas waktu 15 detik: streak reset & melorot 1 pemanjat
    team.streak = 0;
    let eventType = 'TIMEOUT_PENALTY';
    if (team.currentClimbers > 0) {
      team.currentClimbers = Math.max(0, team.currentClimbers - 1);
    }

    // Berganti ke giliran anggota regu berikutnya
    team.currentTurnIndex = (team.currentTurnIndex + 1) % team.members.length;

    // Ambil soal baru & reset timer giliran
    team.activeQuestion = this.pickNextQuestion(teamId);
    team.questionStartTime = Date.now();

    return {
      eventType,
      teamId,
      teamName: team.name,
      answeredBy,
      isCorrect: false,
      reason: 'TIMEOUT_TURN',
      timeoutSeconds: this.turnTimeoutSeconds,
      currentClimbers: team.currentClimbers,
      currentTurnIndex: team.currentTurnIndex,
      currentTurnMember: team.members[team.currentTurnIndex],
      totalMembers: team.members.length,
      nextQuestion: team.activeQuestion,
      isWinner: false,
      scores: Object.keys(this.teams).reduce((acc, id) => {
        acc[id] = this.teams[id].score;
        return acc;
      }, {})
    };
  }

  pickNextQuestion(teamId) {
    const team = this.teams ? this.teams[teamId] : null;
    const climbers = team ? (team.currentClimbers || 0) : 0;

    // Tingkat kesulitan berjenjang: 
    // Dasar/bawah (0-2 pemanjat) = EASY
    // Tengah (3-5 pemanjat) = MEDIUM
    // Menjelang puncak (6+ pemanjat) = HARD
    let difficulty = 'EASY';
    if (climbers >= 6) {
      difficulty = 'HARD';
    } else if (climbers >= 3) {
      difficulty = 'MEDIUM';
    }

    const pool = questionBank.getRandomPool(1, { game: 'PINANG', difficulty });
    if (pool && pool[0]) return pool[0];

    const fallbackOptions = ["Siap", "Maju", "Pasti Bisa", "Juara"];
    const rndIdx = Math.floor(Math.random() * fallbackOptions.length);
    return {
      id: 999,
      question: "Semangat Educamp!",
      options: fallbackOptions,
      correctIndex: rndIdx
    };
  }

  answerQuestion(teamId, selectedOptionIndex) {
    const team = this.teams[teamId];
    if (!team || this.status !== 'PLAYING') return null;

    const currentQ = team.activeQuestion;
    if (!currentQ) return null;

    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    const answeredBy = team.members[team.currentTurnIndex] ? team.members[team.currentTurnIndex].name : 'Peserta';

    let eventType = '';
    let climberDelta = 0;

    if (isCorrect) {
      team.currentClimbers += 1;
      team.streak += 1;
      climberDelta = 1;

      // Aturan 1: Pemenang adalah tim yang mencapai puncak duluan -> skor 300, yang kalah 150
      if (team.currentClimbers >= team.members.length) {
        this.status = 'FINISHED';
        this.winner = team;
        this.winnerReason = 'REACHED_TOP';
        this.isDraw = false;
        this.endTime = Date.now();
        eventType = 'VICTORY';

        this.matchScores = {};
        Object.values(this.teams).forEach(t => {
          if (t.id === team.id) {
            t.score = this.winScore;
            this.matchScores[t.id] = this.winScore;
          } else {
            // Aturan 2: Yang kalah adalah yang tidak mencapai puncak (keduluan tim lain) -> skor 150
            t.score = this.loseScore;
            this.matchScores[t.id] = this.loseScore;
          }
        });

        this.recordSession();
      } else {
        eventType = 'CLIMB_SUCCESS';
        // Giliran anggota berikutnya yang maju memanjat
        team.currentTurnIndex = (team.currentTurnIndex + 1) % team.members.length;
      }
    } else {
      // JAWABAN SALAH
      team.streak = 0;
      if (this.wipeoutMode === 'HARDCORE') {
        // RUNTUH TOTAL: Semua melorot ke tanah, kembali ke 0!
        eventType = 'TOTAL_WIPEOUT';
        team.currentClimbers = 0;
      } else {
        // Slip 1 step
        eventType = 'SLIP';
        team.currentClimbers = Math.max(0, team.currentClimbers - 1);
      }
      // Tetap beri kesempatan gilirannya berganti atau coba lagi
      team.currentTurnIndex = (team.currentTurnIndex + 1) % team.members.length;
    }

    // Ambil soal baru untuk tim ini & reset timer giliran 15 detik
    team.activeQuestion = this.status === 'PLAYING' ? this.pickNextQuestion(teamId) : null;
    team.questionStartTime = this.status === 'PLAYING' ? Date.now() : null;

    return {
      eventType,
      teamId,
      teamName: team.name,
      answeredBy,
      isCorrect,
      correctIndex: currentQ.correctIndex,
      selectedOptionIndex,
      currentClimbers: team.currentClimbers,
      currentTurnIndex: team.currentTurnIndex,
      currentTurnMember: team.members[team.currentTurnIndex],
      totalMembers: team.members.length,
      nextQuestion: team.activeQuestion,
      isWinner: team.id === this.winner?.id
    };
  }

  getStorageData() {
    const teamsData = {};
    Object.entries(this.teams).forEach(([tId, team]) => {
      teamsData[tId] = {
        id: team.id,
        name: team.name,
        color: team.color,
        members: team.members
      };
    });
    return {
      mode: this.mode,
      wipeoutMode: this.wipeoutMode,
      durationSeconds: this.durationSeconds,
      turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
      winScore: typeof this.winScore === 'number' ? this.winScore : 300,
      loseScore: typeof this.loseScore === 'number' ? this.loseScore : 150,
      drawScore: typeof this.drawScore === 'number' ? this.drawScore : 150,
      history: this.history || [],
      teams: teamsData
    };
  }

  restoreData(data, includeHistory = true) {
    if (!data || typeof data !== 'object') return false;
    if (data.mode) this.mode = data.mode;
    if (data.wipeoutMode) this.wipeoutMode = data.wipeoutMode;
    if (typeof data.durationSeconds === 'number') {
      this.durationSeconds = data.durationSeconds;
      this.remainingSeconds = data.durationSeconds;
    }
    if (typeof data.turnTimeoutSeconds === 'number') {
      this.turnTimeoutSeconds = data.turnTimeoutSeconds;
    }
    if (typeof data.winScore === 'number') {
      this.winScore = data.winScore;
    }
    if (typeof data.loseScore === 'number') {
      this.loseScore = data.loseScore;
    }
    if (typeof data.drawScore === 'number') {
      this.drawScore = data.drawScore;
    }
    if (includeHistory && Array.isArray(data.history)) {
      this.history = data.history;
    }
    if (data.teams && typeof data.teams === 'object') {
      this.setTeamsConfig(data.teams, false);
    }
    this.saveStorage();
    return true;
  }

  getPublicState() {
    return {
      status: this.status,
      mode: this.mode,
      wipeoutMode: this.wipeoutMode,
      targetHeight: this.targetHeight,
      durationSeconds: this.durationSeconds,
      remainingSeconds: this.remainingSeconds,
      turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
      winScore: typeof this.winScore === 'number' ? this.winScore : 300,
      loseScore: typeof this.loseScore === 'number' ? this.loseScore : 150,
      drawScore: typeof this.drawScore === 'number' ? this.drawScore : 150,
      winnerReason: this.winnerReason,
      isDraw: this.isDraw || false,
      matchScores: this.matchScores || {},
      teams: this.teams,
      winner: this.winner,
      startTime: this.startTime,
      endTime: this.endTime,
      history: this.history || []
    };
  }
}

module.exports = new GameEngine();
