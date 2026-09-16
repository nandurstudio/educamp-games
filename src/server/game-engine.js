const fs = require('fs');
const path = require('path');
const questionBank = require('./question-bank');

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
        if (data.mode) this.mode = data.mode;
        if (data.wipeoutMode) this.wipeoutMode = data.wipeoutMode;
        if (typeof data.durationSeconds === 'number') {
          this.durationSeconds = data.durationSeconds;
          this.remainingSeconds = data.durationSeconds;
        }
        if (Array.isArray(data.history)) {
          this.history = data.history;
        }
        if (data.teams && typeof data.teams === 'object') {
          this.setTeamsConfig(data.teams, false);
        }
        console.log(`[Storage Loaded] Berhasil me-load konfigurasi dari data/game-storage.json (${Object.keys(this.teams).length} tim terdaftar, ${this.history.length} sesi riwayat)`);
      }
    } catch (err) {
      console.error('[Storage Error] Gagal membaca storage lokal:', err.message);
    }
  }

  saveStorage() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        mode: this.mode,
        wipeoutMode: this.wipeoutMode,
        durationSeconds: this.durationSeconds,
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

  reset() {
    this.status = 'WAITING'; // WAITING, PLAYING, FINISHED
    this.mode = 'VERSUS'; // SINGLE, VERSUS
    this.wipeoutMode = 'HARDCORE'; // HARDCORE (reset 0), SLIP (turun 1 level)
    this.targetHeight = 8;
    this.durationSeconds = 300; // Default 5 menit
    this.remainingSeconds = 300;
    this.winnerReason = null;
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
          totalMembers: team.members.length
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
      console.log(`[History Recorded] Sesi permainan tercatat: ${sessionRecord.winner ? sessionRecord.winner.name : 'Tanpa Pemenang'} (${sessionRecord.winnerReason})`);
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
    this.winnerReason = 'TIME_OUT';

    // Cari pemenang berdasarkan siapa yang memanjat paling tinggi / skor tertinggi
    const teamsArr = Object.values(this.teams);
    teamsArr.sort((a, b) => {
      if (b.currentClimbers !== a.currentClimbers) {
        return b.currentClimbers - a.currentClimbers;
      }
      return b.score - a.score;
    });

    this.winner = teamsArr[0] || null;
    const session = this.recordSession();

    return {
      status: this.status,
      winner: this.winner,
      winnerReason: this.winnerReason,
      teams: this.teams,
      session
    };
  }

  pickNextQuestion(teamId) {
    const pool = questionBank.getRandomPool(1);
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
      team.score += 100;
      team.streak += 1;
      climberDelta = 1;

      // Cek apakah sudah mencapai puncak (menang!)
      if (team.currentClimbers >= team.members.length) {
        this.status = 'FINISHED';
        this.winner = team;
        this.winnerReason = 'REACHED_TOP';
        this.endTime = Date.now();
        eventType = 'VICTORY';
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

    // Ambil soal baru untuk tim ini
    team.activeQuestion = this.status === 'PLAYING' ? this.pickNextQuestion(teamId) : null;

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
      nextQuestion: team.activeQuestion,
      isWinner: team.id === this.winner?.id
    };
  }

  getPublicState() {
    return {
      status: this.status,
      mode: this.mode,
      wipeoutMode: this.wipeoutMode,
      targetHeight: this.targetHeight,
      durationSeconds: this.durationSeconds,
      remainingSeconds: this.remainingSeconds,
      winnerReason: this.winnerReason,
      teams: this.teams,
      winner: this.winner,
      startTime: this.startTime,
      endTime: this.endTime,
      history: this.history || []
    };
  }
}

module.exports = new GameEngine();
