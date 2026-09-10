const questionBank = require('./question-bank');

class GameEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.status = 'WAITING'; // WAITING, PLAYING, FINISHED
    this.mode = 'VERSUS'; // SINGLE, VERSUS
    this.wipeoutMode = 'HARDCORE'; // HARDCORE (reset 0), SLIP (turun 1 level)
    this.targetHeight = 6; // Standar 6 orang per kelompok untuk mencapai puncak
    this.teams = {
      team1: {
        id: 'team1',
        name: 'Tim Elang',
        color: '#e74c3c', // Merah
        members: [
          { name: 'Andi', bodyType: 'tall-skinny', skinTone: 'fair' },
          { name: 'Budi', bodyType: 'tall-chubby', skinTone: 'tan' },
          { name: 'Citra', bodyType: 'short-skinny', skinTone: 'fair' },
          { name: 'Doni', bodyType: 'short-chubby', skinTone: 'deep' },
          { name: 'Eka', bodyType: 'tall-skinny', skinTone: 'tan' },
          { name: 'Fajar', bodyType: 'short-skinny', skinTone: 'olive' }
        ],
        currentClimbers: 0, // Berapa orang yang sudah memeluk pinang
        currentTurnIndex: 0, // Giliran anggota mana yang harus menjawab
        score: 0,
        streak: 0,
        activeQuestion: null
      },
      team2: {
        id: 'team2',
        name: 'Tim Harimau',
        color: '#3498db', // Biru
        members: [
          { name: 'Gani', bodyType: 'tall-chubby', skinTone: 'tan' },
          { name: 'Hana', bodyType: 'short-skinny', skinTone: 'fair' },
          { name: 'Indra', bodyType: 'tall-skinny', skinTone: 'olive' },
          { name: 'Joko', bodyType: 'short-chubby', skinTone: 'deep' },
          { name: 'Kiki', bodyType: 'short-skinny', skinTone: 'fair' },
          { name: 'Lutfi', bodyType: 'tall-skinny', skinTone: 'tan' }
        ],
        currentClimbers: 0,
        currentTurnIndex: 0,
        score: 0,
        streak: 0,
        activeQuestion: null
      }
    };
    this.winner = null;
    this.startTime = null;
    this.endTime = null;
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'SINGLE') {
      delete this.teams.team2;
    } else if (!this.teams.team2) {
      this.teams.team2 = {
        id: 'team2',
        name: 'Tim Harimau',
        color: '#3498db',
        members: [
          { name: 'Anggota 1', bodyType: 'tall-skinny', skinTone: 'fair' },
          { name: 'Anggota 2', bodyType: 'tall-chubby', skinTone: 'tan' },
          { name: 'Anggota 3', bodyType: 'short-skinny', skinTone: 'olive' },
          { name: 'Anggota 4', bodyType: 'short-chubby', skinTone: 'deep' },
          { name: 'Anggota 5', bodyType: 'tall-skinny', skinTone: 'tan' },
          { name: 'Anggota 6', bodyType: 'short-skinny', skinTone: 'fair' }
        ],
        currentClimbers: 0,
        currentTurnIndex: 0,
        score: 0,
        streak: 0,
        activeQuestion: null
      };
    }
  }

  setTeamsConfig(newTeams) {
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
    this.startTime = Date.now();
    this.targetHeight = Math.max(...Object.values(this.teams).map(t => t.members.length));

    // Reset progress tiap tim & beri pertanyaan pertama
    Object.values(this.teams).forEach(team => {
      team.currentClimbers = 0;
      team.currentTurnIndex = 0;
      team.score = 0;
      team.streak = 0;
      team.activeQuestion = this.pickNextQuestion(team.id);
    });
  }

  pickNextQuestion(teamId) {
    const pool = questionBank.getRandomPool(1);
    return pool[0] || {
      id: 999,
      question: "Semangat Educamp!",
      options: ["Siap", "Maju", "Pasti Bisa", "Juara"],
      correctIndex: 0
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
        this.endTime = Date.now();
        eventType = 'VICTORY';
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
      teams: this.teams,
      winner: this.winner,
      startTime: this.startTime,
      endTime: this.endTime
    };
  }
}

module.exports = new GameEngine();
