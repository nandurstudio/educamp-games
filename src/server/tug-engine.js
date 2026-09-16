const fs = require('fs');
const path = require('path');
const questionBank = require('./question-bank');

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
        console.log(`[Tug Storage Loaded] Data Tarik Tambang berhasil dimuat (${this.history.length} sesi riwayat)`);
      }
    } catch (err) {
      console.error('[Tug Storage Error] Gagal membaca storage:', err.message);
    }
  }

  saveStorage() {
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
      console.error('[Tug Storage Error] Gagal menyimpan storage:', err.message);
    }
  }

  reset() {
    this.status = 'WAITING'; // WAITING, PLAYING, FINISHED
    this.durationSeconds = 180; // Default 3 menit untuk tarik tambang
    this.remainingSeconds = 180;
    this.turnTimeoutSeconds = 15; // Batas waktu per giliran (detik). 0 = disabled / tidak ada batas waktu
    this.ropeOffset = 0; // -100 (Kiri Menang Mutlak) s/d +100 (Kanan Menang Mutlak)
    this.pullStep = 8; // Besaran tarikan saat 1 tim benar (8%: butuh ~12-13 tarikan bersih untuk knockout)
    this.slipPenalty = 5; // Sentakan ke arah lawan jika salah (5%)
    this.pointsPerCorrect = 100; // Default 100 poin per jawaban benar (configurable)
    this.winner = null;
    this.winnerReason = null;
    this.startTime = null;
    this.endTime = null;
    this.sessionRecorded = false;

    // Tim Kiri (Default QATRA)
    this.teamLeft = {
      id: 'left',
      name: 'QATRA',
      color: '#e74c3c',
      members: [
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

    // Tim Kanan (Default V-BOM)
    this.teamRight = {
      id: 'right',
      name: 'V-BOM',
      color: '#3498db',
      members: [
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
      if (teamLeft.name) this.teamLeft.name = teamLeft.name;
      if (teamLeft.color) this.teamLeft.color = teamLeft.color;
      if (Array.isArray(teamLeft.members)) this.teamLeft.members = teamLeft.members;
    }
    if (teamRight) {
      this.teamRight.id = 'right';
      if (teamRight.name) this.teamRight.name = teamRight.name;
      if (teamRight.color) this.teamRight.color = teamRight.color;
      if (Array.isArray(teamRight.members)) this.teamRight.members = teamRight.members;
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
    const pool = questionBank.getRandomPool(1);
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
