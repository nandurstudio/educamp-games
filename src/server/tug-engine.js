const fs = require('fs');
const path = require('path');
const questionBank = require('./question-bank');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/tug-storage.json');

class TugEngine {
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
        console.log(`[Tug Storage Loaded] Data Tarik Tambang berhasil dimuat (${this.history.length} sesi riwayat)`);
      }
    } catch (err) {
      console.error('[Tug Storage Error] Gagal membaca storage lokal:', err.message);
    }

    if (firebaseService.isAvailable()) {
      firebaseService.loadDoc('tarik_tambang').then(cloudData => {
        if (cloudData && typeof cloudData === 'object') {
          this.applyStorageData(cloudData);
          console.log(`[Tug Firebase] Data Tarik Tambang berhasil dimuat dari Firestore (${this.history.length} sesi riwayat)!`);
          this.saveLocalDisk();
        }
      }).catch(err => {
        console.error('[Tug Firebase] Gagal load dari Firestore:', err.message);
      });
    }
  }

  applyStorageData(data) {
    if (!data || typeof data !== 'object') return;
    if (typeof data.durationSeconds === 'number') {
      this.durationSeconds = data.durationSeconds;
      this.remainingSeconds = data.durationSeconds;
    }
    if (typeof data.turnTimeoutSeconds === 'number') {
      this.turnTimeoutSeconds = data.turnTimeoutSeconds;
    }
    if (typeof data.pullStep === 'number') {
      this.pullStep = data.pullStep;
    }
    if (typeof data.slipPenalty === 'number') {
      this.slipPenalty = data.slipPenalty;
    }
    if (typeof data.pointsPerCorrect === 'number') {
      this.pointsPerCorrect = data.pointsPerCorrect;
    }
    if (Array.isArray(data.history)) {
      this.history = data.history;
    }
    if (data.teamLeft) this.teamLeft = { ...this.teamLeft, ...data.teamLeft };
    if (data.teamRight) this.teamRight = { ...this.teamRight, ...data.teamRight };
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        durationSeconds: this.durationSeconds,
        turnTimeoutSeconds: this.turnTimeoutSeconds,
        pullStep: this.pullStep,
        slipPenalty: this.slipPenalty,
        pointsPerCorrect: this.pointsPerCorrect || 100,
        history: this.history || [],
        teamLeft: {
          id: this.teamLeft.id,
          name: this.teamLeft.name,
          color: this.teamLeft.color,
          members: this.teamLeft.members
        },
        teamRight: {
          id: this.teamRight.id,
          name: this.teamRight.name,
          color: this.teamRight.color,
          members: this.teamRight.members
        }
      };
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Tug Storage Error] Gagal menyimpan storage lokal:', err.message);
    }
  }

  saveStorage() {
    this.saveLocalDisk();
    if (firebaseService.isAvailable()) {
      const data = {
        durationSeconds: this.durationSeconds,
        turnTimeoutSeconds: this.turnTimeoutSeconds,
        pullStep: this.pullStep,
        slipPenalty: this.slipPenalty,
        pointsPerCorrect: this.pointsPerCorrect || 100,
        history: this.history || [],
        teamLeft: {
          id: this.teamLeft.id,
          name: this.teamLeft.name,
          color: this.teamLeft.color,
          members: this.teamLeft.members
        },
        teamRight: {
          id: this.teamRight.id,
          name: this.teamRight.name,
          color: this.teamRight.color,
          members: this.teamRight.members
        }
      };
      firebaseService.saveDoc('tarik_tambang', data).catch(err => {
        console.error('[Tug Firebase] Gagal menyimpan ke Firestore:', err.message);
      });
    }
  }

  reset(keepTeams = true) {
    this.status = 'WAITING'; // WAITING, PLAYING, FINISHED
    this.durationSeconds = this.durationSeconds || 180; // Default 3 menit untuk tarik tambang
    this.remainingSeconds = this.durationSeconds;
    this.turnTimeoutSeconds = typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15;
    this.ropeOffset = 0; // -100 (Kiri Menang Mutlak) s/d +100 (Kanan Menang Mutlak)
    this.pullStep = this.pullStep || 8;
    this.slipPenalty = this.slipPenalty || 5;
    this.pointsPerCorrect = this.pointsPerCorrect || 100;
    this.winner = null;
    this.winnerReason = null;
    this.startTime = null;
    this.endTime = null;
    this.sessionRecorded = false;

    const prevLeft = this.teamLeft;
    const prevRight = this.teamRight;

    // Tim Kiri (Default QATRA atau pertahankan konfigurasi tersimpan)
    this.teamLeft = {
      id: 'left',
      name: (keepTeams && prevLeft && prevLeft.name) ? prevLeft.name : 'QATRA',
      color: (keepTeams && prevLeft && prevLeft.color) ? prevLeft.color : '#e74c3c',
      members: (keepTeams && prevLeft && Array.isArray(prevLeft.members) && prevLeft.members.length > 0) ? prevLeft.members : [
        { name: "Fajar Fauzan", bodyType: "tall-skinny", skinTone: "fair" },
        { name: "Irvan Hasan", bodyType: "tall-chubby", skinTone: "tan" },
        { name: "Sri Rejeki", bodyType: "short-skinny", skinTone: "fair" },
        { name: "Malawi", bodyType: "tall-skinny", skinTone: "olive" },
        { name: "Fuji S R", bodyType: "short-chubby", skinTone: "tan" },
        { name: "Adi Sofyan", bodyType: "tall-chubby", skinTone: "deep" },
        { name: "Yogi H. P.", bodyType: "tall-skinny", skinTone: "olive" },
        { name: "Mahajiwa", bodyType: "short-skinny", skinTone: "tan" }
      ],
      currentTurnIndex: 0,
      score: 0,
      activeQuestion: null,
      questionStartTime: null
    };

    // Tim Kanan (Default V-BOM atau pertahankan konfigurasi tersimpan)
    this.teamRight = {
      id: 'right',
      name: (keepTeams && prevRight && prevRight.name) ? prevRight.name : 'V-BOM',
      color: (keepTeams && prevRight && prevRight.color) ? prevRight.color : '#3498db',
      members: (keepTeams && prevRight && Array.isArray(prevRight.members) && prevRight.members.length > 0) ? prevRight.members : [
        { name: "Andy Chendra", bodyType: "tall-skinny", skinTone: "fair" },
        { name: "Cahyo Agung Martanto", bodyType: "tall-chubby", skinTone: "tan" },
        { name: "Joko S", bodyType: "short-skinny", skinTone: "olive" },
        { name: "Dimas JP", bodyType: "tall-skinny", skinTone: "fair" },
        { name: "Haris Baihaqi", bodyType: "short-chubby", skinTone: "tan" },
        { name: "Sukaryadi", bodyType: "tall-chubby", skinTone: "deep" },
        { name: "Abdul Halim", bodyType: "tall-skinny", skinTone: "olive" },
        { name: "Budy Sutrisno", bodyType: "short-skinny", skinTone: "tan" }
      ],
      currentTurnIndex: 0,
      score: 0,
      activeQuestion: null,
      questionStartTime: null
    };
  }

  setTeams({ teamLeft, teamRight }) {
    if (teamLeft) {
      this.teamLeft.id = 'left';
      if (teamLeft.name && typeof teamLeft.name === 'string') this.teamLeft.name = teamLeft.name.trim();
      if (teamLeft.color && typeof teamLeft.color === 'string') this.teamLeft.color = teamLeft.color;
      if (Array.isArray(teamLeft.members) && teamLeft.members.length > 0) this.teamLeft.members = teamLeft.members;
    }
    if (teamRight) {
      this.teamRight.id = 'right';
      if (teamRight.name && typeof teamRight.name === 'string') this.teamRight.name = teamRight.name.trim();
      if (teamRight.color && typeof teamRight.color === 'string') this.teamRight.color = teamRight.color;
      if (Array.isArray(teamRight.members) && teamRight.members.length > 0) this.teamRight.members = teamRight.members;
    }
    this.saveStorage();
  }

  startGame() {
    this.status = 'PLAYING';
    this.winner = null;
    this.winnerReason = null;
    this.ropeOffset = 0;
    this.remainingSeconds = this.durationSeconds;
    this.startTime = Date.now();
    this.endTime = null;
    this.sessionRecorded = false;

    // Reset progress tim & generate pertanyaan pertama untuk kedua tim
    const now = Date.now();
    [this.teamLeft, this.teamRight].forEach(team => {
      team.currentTurnIndex = 0;
      team.score = 0;
      team.activeQuestion = this.pickNextQuestion();
      team.questionStartTime = now;
    });
  }

  pauseGame() {
    if (this.status !== 'PLAYING') return false;
    this.status = 'PAUSED';
    return true;
  }

  resumeGame() {
    if (this.status !== 'PAUSED') return false;
    this.status = 'PLAYING';
    // Perbarui questionStartTime agar jeda pause tidak dihitung penalti
    const now = Date.now();
    if (this.teamLeft) this.teamLeft.questionStartTime = now;
    if (this.teamRight) this.teamRight.questionStartTime = now;
    return true;
  }

  stopGame() {
    if (this.status !== 'PLAYING' && this.status !== 'PAUSED') return null;
    this.status = 'FINISHED';
    this.endTime = Date.now();
    this.winnerReason = 'STOPPED_BY_ADMIN';

    if (this.ropeOffset < 0) {
      this.winner = this.teamLeft;
    } else if (this.ropeOffset > 0) {
      this.winner = this.teamRight;
    } else {
      this.winner = null;
    }

    const session = this.recordSession();
    return {
      status: this.status,
      winner: this.winner,
      winnerReason: this.winnerReason,
      ropeOffset: this.ropeOffset,
      session
    };
  }

  pickNextQuestion() {
    // Tingkat kesulitan berjenjang di Tarik Tambang:
    // Awal / seimbang (|ropeOffset| < 35) = EASY
    // Mulai saling tarik (|ropeOffset| >= 35 && < 70) = MEDIUM
    // Fase kritis / mendekati garis finis (|ropeOffset| >= 70) = HARD
    const absOffset = Math.abs(this.ropeOffset || 0);
    let difficulty = 'EASY';
    if (absOffset >= 70) {
      difficulty = 'HARD';
    } else if (absOffset >= 35) {
      difficulty = 'MEDIUM';
    }

    const pool = questionBank.getRandomPool(1, { game: 'TUG', difficulty });
    if (pool && pool[0]) return pool[0];

    const fallbackOptions = ["Siap", "Maju", "Pasti Bisa", "Juara"];
    const rndIdx = Math.floor(Math.random() * fallbackOptions.length);
    return {
      id: 999,
      question: "Semangat Tarik Tambang Educamp!",
      options: fallbackOptions,
      correctIndex: rndIdx
    };
  }

  recordSession() {
    if (this.sessionRecorded) return null;
    this.sessionRecorded = true;
    try {
      const elapsedSeconds = this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0;
      const sessionRecord = {
        id: `tug-sesi-${Date.now()}`,
        timestamp: new Date().toISOString(),
        game: 'TARIK_TAMBANG',
        durationSeconds: this.durationSeconds,
        elapsedSeconds: Math.min(elapsedSeconds, this.durationSeconds),
        finalRopeOffset: this.ropeOffset,
        winner: this.winner ? {
          side: this.winner.id,
          name: this.winner.name,
          color: this.winner.color
        } : null,
        winnerReason: this.winnerReason,
        scores: {
          left: {
            name: this.teamLeft.name,
            color: this.teamLeft.color,
            score: this.teamLeft.score
          },
          right: {
            name: this.teamRight.name,
            color: this.teamRight.color,
            score: this.teamRight.score
          }
        }
      };

      if (!Array.isArray(this.history)) {
        this.history = [];
      }
      this.history.unshift(sessionRecord);
      if (this.history.length > 50) {
        this.history = this.history.slice(0, 50);
      }
      this.saveStorage();
      console.log(`[Tug Session Recorded] Sesi tercatat: ${sessionRecord.winner ? sessionRecord.winner.name : 'SERI'} (${sessionRecord.winnerReason})`);
      return sessionRecord;
    } catch (err) {
      console.error('[Tug Session Error] Gagal mencatat riwayat:', err.message);
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
    this.winnerReason = 'TIME_OUT';

    // Evaluasi pemenang berdasarkan posisi ropeOffset
    if (this.ropeOffset < 0) {
      // Tali lebih condong ke kiri
      this.winner = this.teamLeft;
    } else if (this.ropeOffset > 0) {
      // Tali lebih condong ke kanan
      this.winner = this.teamRight;
    } else {
      // Seri di tengah
      this.winner = null;
    }

    const session = this.recordSession();
    return {
      status: this.status,
      winner: this.winner,
      winnerReason: this.winnerReason,
      ropeOffset: this.ropeOffset,
      session
    };
  }

  answerQuestion(side, selectedOptionIndex) {
    if (this.status !== 'PLAYING') return null;
    const team = (side === 'left') ? this.teamLeft : (side === 'right') ? this.teamRight : null;
    if (!team || !team.activeQuestion) return null;

    const opponent = (side === 'left') ? this.teamRight : this.teamLeft;
    const currentQ = team.activeQuestion;
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    const answeredBy = team.members[team.currentTurnIndex] ? team.members[team.currentTurnIndex].name : 'Peserta';

    let eventType = '';
    let delta = 0;

    if (isCorrect) {
      team.score += (this.pointsPerCorrect || 100);
      // Jika Tim Kiri benar, menarik ke Kiri (- pullStep).
      // Jika Tim Kanan benar, menarik ke Kanan (+ pullStep).
      delta = (side === 'left') ? -this.pullStep : this.pullStep;
      this.ropeOffset = Math.max(-100, Math.min(100, this.ropeOffset + delta));
      eventType = 'PULL_SUCCESS';
    } else {
      // Jawaban Salah: Tergelincir / tersentak ke arah lawan
      delta = (side === 'left') ? this.slipPenalty : -this.slipPenalty;
      this.ropeOffset = Math.max(-100, Math.min(100, this.ropeOffset + delta));
      eventType = 'PULL_SLIP';
    }

    // Pergantian giliran anggota
    team.currentTurnIndex = (team.currentTurnIndex + 1) % team.members.length;

    // Cek apakah ada tim yang kalah telak (melewati garis batas -100 atau +100)
    let isWinner = false;
    if (this.ropeOffset <= -100) {
      this.status = 'FINISHED';
      this.winner = this.teamLeft;
      this.winnerReason = 'KNOCKOUT';
      this.endTime = Date.now();
      isWinner = true;
      eventType = 'VICTORY';
      this.recordSession();
    } else if (this.ropeOffset >= 100) {
      this.status = 'FINISHED';
      this.winner = this.teamRight;
      this.winnerReason = 'KNOCKOUT';
      this.endTime = Date.now();
      isWinner = true;
      eventType = 'VICTORY';
      this.recordSession();
    }

    // Siapkan soal baru untuk tim ini
    team.activeQuestion = this.status === 'PLAYING' ? this.pickNextQuestion() : null;
    team.questionStartTime = this.status === 'PLAYING' ? Date.now() : null;

    return {
      eventType,
      side,
      teamName: team.name,
      answeredBy,
      isCorrect,
      correctIndex: currentQ.correctIndex,
      selectedOptionIndex,
      ropeOffset: this.ropeOffset,
      isWinner,
      scores: {
        left: this.teamLeft.score,
        right: this.teamRight.score
      }
    };
  }

  handleTurnTimeout(side, penalty = null) {
    if (this.status !== 'PLAYING') return null;
    const team = (side === 'left') ? this.teamLeft : (side === 'right') ? this.teamRight : null;
    if (!team) return null;

    const actualPenalty = typeof penalty === 'number' ? penalty : (this.slipPenalty * 1.5 || 8);
    const answeredBy = team.members[team.currentTurnIndex] ? team.members[team.currentTurnIndex].name : 'Peserta';
    // Penalti diam / tidak menjawab batas waktu: tergelincir ke arah lawan
    const delta = (side === 'left') ? actualPenalty : -actualPenalty;
    this.ropeOffset = Math.max(-100, Math.min(100, this.ropeOffset + delta));

    // Pergantian giliran anggota
    team.currentTurnIndex = (team.currentTurnIndex + 1) % team.members.length;

    // Cek apakah ada tim yang kalah telak
    let isWinner = false;
    let eventType = 'TIMEOUT_PENALTY';

    if (this.ropeOffset <= -100) {
      this.status = 'FINISHED';
      this.winner = this.teamLeft;
      this.winnerReason = 'KNOCKOUT';
      this.endTime = Date.now();
      isWinner = true;
      eventType = 'VICTORY';
      this.recordSession();
    } else if (this.ropeOffset >= 100) {
      this.status = 'FINISHED';
      this.winner = this.teamRight;
      this.winnerReason = 'KNOCKOUT';
      this.endTime = Date.now();
      isWinner = true;
      eventType = 'VICTORY';
      this.recordSession();
    }

    team.activeQuestion = this.status === 'PLAYING' ? this.pickNextQuestion() : null;
    team.questionStartTime = this.status === 'PLAYING' ? Date.now() : null;

    return {
      eventType,
      side,
      teamName: team.name,
      answeredBy,
      isCorrect: false,
      reason: 'TIMEOUT_TURN',
      timeoutSeconds: this.turnTimeoutSeconds,
      penaltyPercent: actualPenalty,
      ropeOffset: this.ropeOffset,
      isWinner,
      scores: {
        left: this.teamLeft.score,
        right: this.teamRight.score
      }
    };
  }

  getStorageData() {
    return {
      durationSeconds: this.durationSeconds,
      turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
      pullStep: this.pullStep,
      slipPenalty: this.slipPenalty,
      pointsPerCorrect: this.pointsPerCorrect || 100,
      history: this.history || [],
      teamLeft: {
        id: this.teamLeft.id,
        name: this.teamLeft.name,
        color: this.teamLeft.color,
        members: this.teamLeft.members
      },
      teamRight: {
        id: this.teamRight.id,
        name: this.teamRight.name,
        color: this.teamRight.color,
        members: this.teamRight.members
      }
    };
  }

  restoreData(data, includeHistory = true) {
    if (!data || typeof data !== 'object') return false;
    if (typeof data.durationSeconds === 'number') {
      this.durationSeconds = data.durationSeconds;
      this.remainingSeconds = data.durationSeconds;
    }
    if (typeof data.turnTimeoutSeconds === 'number') {
      this.turnTimeoutSeconds = data.turnTimeoutSeconds;
    }
    if (typeof data.pullStep === 'number') {
      this.pullStep = data.pullStep;
    }
    if (typeof data.slipPenalty === 'number') {
      this.slipPenalty = data.slipPenalty;
    }
    if (typeof data.pointsPerCorrect === 'number') {
      this.pointsPerCorrect = data.pointsPerCorrect;
    }
    if (includeHistory && Array.isArray(data.history)) {
      this.history = data.history;
    }
    if (data.teamLeft && typeof data.teamLeft === 'object') {
      this.teamLeft = {
        ...this.teamLeft,
        id: data.teamLeft.id || 'left',
        name: data.teamLeft.name || this.teamLeft.name,
        color: data.teamLeft.color || this.teamLeft.color,
        members: Array.isArray(data.teamLeft.members) ? data.teamLeft.members : this.teamLeft.members
      };
    }
    if (data.teamRight && typeof data.teamRight === 'object') {
      this.teamRight = {
        ...this.teamRight,
        id: data.teamRight.id || 'right',
        name: data.teamRight.name || this.teamRight.name,
        color: data.teamRight.color || this.teamRight.color,
        members: Array.isArray(data.teamRight.members) ? data.teamRight.members : this.teamRight.members
      };
    }
    this.saveStorage();
    return true;
  }

  getPublicState() {
    return {
      status: this.status,
      durationSeconds: this.durationSeconds,
      remainingSeconds: this.remainingSeconds,
      turnTimeoutSeconds: typeof this.turnTimeoutSeconds === 'number' ? this.turnTimeoutSeconds : 15,
      ropeOffset: this.ropeOffset,
      pullStep: this.pullStep,
      slipPenalty: this.slipPenalty,
      pointsPerCorrect: this.pointsPerCorrect || 100,
      winner: this.winner ? {
        id: this.winner.id,
        name: this.winner.name,
        color: this.winner.color
      } : null,
      winnerReason: this.winnerReason,
      startTime: this.startTime,
      endTime: this.endTime,
      teamLeft: this.teamLeft,
      teamRight: this.teamRight,
      history: this.history || []
    };
  }
}

module.exports = new TugEngine();
