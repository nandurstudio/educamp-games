require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');

const gameEngine = require('./game-engine');
const tugEngine = require('./tug-engine');
const questionBank = require('./question-bank');
const { generateQuizQuestions } = require('./gemini-service');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Fallback favicon agar tidak 404 di browser
app.get('/favicon.ico', (req, res) => res.status(204).end());

// === REST API ENDPOINTS (PANJAT PINANG) ===

// 1. Ambil state game terkini
app.get('/api/state', (req, res) => {
  res.json(gameEngine.getPublicState());
});

// 2. Ambil bank soal
app.get('/api/questions', (req, res) => {
  res.json({
    source: questionBank.getSource(),
    questions: questionBank.getAll(),
    count: questionBank.getAll().length
  });
});

// 3. Simpan bank soal kustom
app.post('/api/questions', (req, res) => {
  const { questions } = req.body;
  if (Array.isArray(questions)) {
    questionBank.setQuestions(questions, 'CUSTOM');
    return res.json({ success: true, count: questions.length });
  }
  res.status(400).json({ error: 'Format pertanyaan tidak valid' });
});

// 3b. Upload Bank Soal via CSV
app.post('/api/questions/csv', (req, res) => {
  try {
    const { csvContent } = req.body;
    if (!csvContent || typeof csvContent !== 'string') {
      return res.status(400).json({ error: 'Konten CSV tidak boleh kosong' });
    }
    const questions = questionBank.loadFromCSV(csvContent);
    res.json({
      success: true,
      message: `Berhasil mengimpor ${questions.length} soal dari CSV!`,
      count: questions.length,
      questions
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3c. Reset Bank Soal ke Default
app.post('/api/questions/reset-default', (req, res) => {
  const questions = questionBank.resetToDefault();
  res.json({
    success: true,
    message: `Bank soal dikembalikan ke default (${questions.length} soal).`,
    count: questions.length,
    questions
  });
});

// 4. Generate soal otomatis via Google AI Studio (Gemini)
app.post('/api/generate-ai-quiz', async (req, res) => {
  try {
    const { apiKey, topic, count, difficulty } = req.body;
    const questions = await generateQuizQuestions({ apiKey, topic, count, difficulty });
    questionBank.setQuestions(questions, 'AI');
    res.json({ success: true, count: questions.length, questions });
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 5. Ambil riwayat pertandingan Panjat Pinang
app.get('/api/history', (req, res) => {
  res.json({ history: gameEngine.history || [] });
});

// 6. Reset riwayat pertandingan Panjat Pinang
app.post('/api/history/clear', (req, res) => {
  gameEngine.clearHistory();
  io.emit('STATE_UPDATE', gameEngine.getPublicState());
  res.json({ success: true, message: 'Riwayat pertandingan berhasil dikosongkan' });
});

// === REST API ENDPOINTS (TARIK TAMBANG) ===
app.get('/api/tug/state', (req, res) => {
  res.json(tugEngine.getPublicState());
});

app.get('/api/tug/history', (req, res) => {
  res.json({ history: tugEngine.history || [] });
});

app.post('/api/tug/history/clear', (req, res) => {
  tugEngine.clearHistory();
  io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
  res.json({ success: true, message: 'Riwayat Tarik Tambang berhasil dikosongkan' });
});

// === REALTIME SOCKET.IO DISPATCHER ===
io.on('connection', (socket) => {
  console.log(`[Socket Connected] ID: ${socket.id}`);

  // Kirim state awal saat client tersambung
  socket.emit('STATE_UPDATE', gameEngine.getPublicState());

  // Bergabung ke room role tertentu (arena, controller-team1, controller-team2, admin)
  socket.on('JOIN_ROLE', ({ role, teamId }) => {
    socket.role = role;
    socket.teamId = teamId;
    if (role === 'CONTROLLER' && teamId) {
      socket.join(`controller-${teamId}`);
      console.log(`[Tablet Joined] Tim: ${teamId}`);
    } else if (role === 'ARENA') {
      socket.join('arena');
    } else if (role === 'ADMIN') {
      socket.join('admin');
    }
  });

  // Timer Interval Manager
  let timerInterval = null;

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      if (gameEngine.status === 'PLAYING') {
        gameEngine.remainingSeconds = Math.max(0, gameEngine.remainingSeconds - 1);
        io.emit('TIMER_TICK', {
          remainingSeconds: gameEngine.remainingSeconds,
          durationSeconds: gameEngine.durationSeconds
        });

        if (gameEngine.remainingSeconds <= 0) {
          const timeoutResult = gameEngine.handleTimeout();
          stopTimer();
          io.emit('STATE_UPDATE', gameEngine.getPublicState());
          io.emit('GAME_OVER', {
            winner: gameEngine.winner,
            reason: 'TIME_OUT'
          });
        }
      } else {
        stopTimer();
      }
    }, 1000);
  }

  // Action: START GAME (dari Admin)
  socket.on('START_GAME', () => {
    gameEngine.startGame();
    startTimer();
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
    io.emit('GAME_STARTED');
  });

  // Action: RESET GAME (dari Admin)
  socket.on('RESET_GAME', () => {
    stopTimer();
    gameEngine.reset();
    gameEngine.loadStorage();
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
    io.emit('GAME_RESET');
  });

  // Action: UPDATE CONFIG (Mode, Wipeout style, Duration, Points, Team members)
  socket.on('UPDATE_CONFIG', (config) => {
    if (config.mode) gameEngine.setMode(config.mode);
    if (config.wipeoutMode) gameEngine.wipeoutMode = config.wipeoutMode;
    if (typeof config.pointsPerCorrect === 'number' && config.pointsPerCorrect > 0) {
      gameEngine.pointsPerCorrect = config.pointsPerCorrect;
    }
    if (typeof config.durationSeconds === 'number' && config.durationSeconds > 0) {
      gameEngine.durationSeconds = config.durationSeconds;
      if (gameEngine.status !== 'PLAYING') {
        gameEngine.remainingSeconds = config.durationSeconds;
      }
    }
    if (config.teams) {
      gameEngine.setTeamsConfig(config.teams);
    } else {
      gameEngine.saveStorage();
    }
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
  });

  // Action: CONTROLLER ANSWER (Peserta menjawab dari tablet)
  socket.on('SUBMIT_ANSWER', ({ teamId, selectedIndex }) => {
    const result = gameEngine.answerQuestion(teamId, selectedIndex);
    if (!result) return;

    // Siarkan hasil jawaban ke seluruh arena dan controller
    io.emit('ANSWER_RESULT', result);
    io.emit('STATE_UPDATE', gameEngine.getPublicState());

    if (result.isWinner) {
      stopTimer();
      io.emit('GAME_OVER', {
        winner: gameEngine.winner,
        reason: 'REACHED_TOP'
      });
    }
  });

  // Action: CLEAR HISTORY (dari Admin Panjat Pinang)
  socket.on('CLEAR_HISTORY', () => {
    gameEngine.clearHistory();
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
  });

  // ==========================================
  // === REALTIME SOCKET: TARIK TAMBANG (TUG) ===
  // ==========================================

  // Kirim state awal Tarik Tambang
  socket.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());

  let tugTimerInterval = null;

  function stopTugTimer() {
    if (tugTimerInterval) {
      clearInterval(tugTimerInterval);
      tugTimerInterval = null;
    }
  }

  function startTugTimer() {
    stopTugTimer();
    tugTimerInterval = setInterval(() => {
      if (tugEngine.status === 'PLAYING') {
        tugEngine.remainingSeconds = Math.max(0, tugEngine.remainingSeconds - 1);
        io.emit('TUG_TIMER_TICK', {
          remainingSeconds: tugEngine.remainingSeconds,
          durationSeconds: tugEngine.durationSeconds
        });

        // Anti-Stalling Rule: Cek batas waktu giliran per tim (0 = disabled)
        const timeoutLimitSec = typeof tugEngine.turnTimeoutSeconds === 'number' ? tugEngine.turnTimeoutSeconds : 15;
        if (timeoutLimitSec > 0) {
          const timeoutLimitMs = timeoutLimitSec * 1000;
          const now = Date.now();
          ['left', 'right'].forEach(side => {
            const team = (side === 'left') ? tugEngine.teamLeft : tugEngine.teamRight;
            if (team && team.questionStartTime && (now - team.questionStartTime >= timeoutLimitMs)) {
              const timeoutRes = tugEngine.handleTurnTimeout(side); // Gunakan penalti proporsional seimbang
              if (timeoutRes) {
                io.emit('TUG_ANSWER_RESULT', timeoutRes);
                io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());

                if (timeoutRes.isWinner) {
                  stopTugTimer();
                  io.emit('TUG_GAME_OVER', {
                    winner: tugEngine.winner,
                    reason: tugEngine.winnerReason,
                    ropeOffset: tugEngine.ropeOffset
                  });
                }
              }
            }
          });
        }

        if (tugEngine.remainingSeconds <= 0) {
          const timeoutResult = tugEngine.handleTimeout();
          stopTugTimer();
          io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
          io.emit('TUG_GAME_OVER', {
            winner: tugEngine.winner,
            reason: 'TIME_OUT',
            ropeOffset: tugEngine.ropeOffset
          });
        }
      } else {
        stopTugTimer();
      }
    }, 1000);
  }

  // Mulai Tarik Tambang
  socket.on('TUG_START_GAME', () => {
    tugEngine.startGame();
    startTugTimer();
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
    io.emit('TUG_GAME_STARTED');
  });

  // Pause Pertandingan
  socket.on('TUG_PAUSE_GAME', () => {
    if (tugEngine.pauseGame()) {
      stopTugTimer();
      io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
      io.emit('TUG_GAME_PAUSED');
    }
  });

  // Resume Pertandingan
  socket.on('TUG_RESUME_GAME', () => {
    if (tugEngine.resumeGame()) {
      startTugTimer();
      io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
      io.emit('TUG_GAME_RESUMED');
    }
  });

  // Stop / Selesaikan Pertandingan Lebih Awal
  socket.on('TUG_STOP_GAME', () => {
    const stopResult = tugEngine.stopGame();
    if (stopResult) {
      stopTugTimer();
      io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
      io.emit('TUG_GAME_OVER', {
        winner: tugEngine.winner,
        reason: 'STOPPED_BY_ADMIN',
        ropeOffset: tugEngine.ropeOffset
      });
    }
  });

  // Reset Tarik Tambang
  socket.on('TUG_RESET_GAME', () => {
    stopTugTimer();
    tugEngine.reset();
    tugEngine.loadStorage();
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
    io.emit('TUG_GAME_RESET');
  });

  // Update Konfigurasi Tim & Parameter Tarik Tambang
  socket.on('TUG_UPDATE_CONFIG', (cfg) => {
    if (typeof cfg.durationSeconds === 'number' && cfg.durationSeconds > 0) {
      tugEngine.durationSeconds = cfg.durationSeconds;
      if (tugEngine.status !== 'PLAYING') tugEngine.remainingSeconds = cfg.durationSeconds;
    }
    if (typeof cfg.pointsPerCorrect === 'number' && cfg.pointsPerCorrect > 0) {
      tugEngine.pointsPerCorrect = cfg.pointsPerCorrect;
    }
    if (typeof cfg.turnTimeoutSeconds === 'number') {
      tugEngine.turnTimeoutSeconds = cfg.turnTimeoutSeconds;
    }
    if (typeof cfg.pullStep === 'number') tugEngine.pullStep = cfg.pullStep;
    if (typeof cfg.slipPenalty === 'number') tugEngine.slipPenalty = cfg.slipPenalty;
    if (cfg.teamLeft || cfg.teamRight) {
      tugEngine.setTeams({ teamLeft: cfg.teamLeft, teamRight: cfg.teamRight });
    } else {
      tugEngine.saveStorage();
    }
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
  });

  // Jawaban Tablet Peserta Tarik Tambang
  socket.on('TUG_SUBMIT_ANSWER', ({ side, selectedIndex }) => {
    const result = tugEngine.answerQuestion(side, selectedIndex);
    if (!result) return;

    io.emit('TUG_ANSWER_RESULT', result);
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());

    if (result.isWinner) {
      stopTugTimer();
      io.emit('TUG_GAME_OVER', {
        winner: tugEngine.winner,
        reason: tugEngine.winnerReason,
        ropeOffset: tugEngine.ropeOffset
      });
    }
  });

  // Clear History Tarik Tambang
  socket.on('TUG_CLEAR_HISTORY', () => {
    tugEngine.clearHistory();
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
  });

  socket.on('disconnect', () => {
    console.log(`[Socket Disconnected] ID: ${socket.id}`);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🌴 Educamp Game Hub Server Ready`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🏠 Super-App Lobby: http://localhost:${PORT}/index.html`);
  console.log(`----------------------------------------------------`);
  console.log(`🌴 Panjat Pinang Arena : http://localhost:${PORT}/arena.html`);
  console.log(`📱 Panjat Pinang Tablet: http://localhost:${PORT}/controller.html`);
  console.log(`⚙️  Panjat Pinang Admin : http://localhost:${PORT}/admin.html`);
  console.log(`----------------------------------------------------`);
  console.log(`🪢 Tarik Tambang Arena : http://localhost:${PORT}/tug-arena.html`);
  console.log(`📱 Tarik Tambang Tablet: http://localhost:${PORT}/tug-controller.html`);
  console.log(`⚙️  Tarik Tambang Admin : http://localhost:${PORT}/tug-admin.html`);
  console.log(`====================================================`);
});
