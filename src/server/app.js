require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');

const gameEngine = require('./game-engine');
const tugEngine = require('./tug-engine');
const superAdminEngine = require('./super-admin-engine');
const questionBank = require('./question-bank');
const backupManager = require('./backup-manager');
const { generateQuizQuestions } = require('./gemini-service');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// Graceful font handler: jika file font korporasi belum diunggah, return 204 No Content agar browser tidak mencatat 404
const fs = require('fs');
app.get('/fonts/:fontname', (req, res, next) => {
  const fontPath = path.join(__dirname, '../public/fonts', req.params.fontname);
  if (fs.existsSync(fontPath)) {
    return res.sendFile(fontPath);
  }
  res.status(204).end();
});

app.use(express.static(path.join(__dirname, '../public')));

// Favicon route
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/images/Logo Educamp 2026.png'));
});

// === REST API ENDPOINTS (PANJAT PINANG) ===

// 1. Ambil state game terkini
app.get('/api/state', (req, res) => {
  res.json(gameEngine.getPublicState());
});

// 2. Ambil bank soal
app.get('/api/questions', (req, res) => {
  const all = questionBank.getAll();
  const game = req.query.game ? req.query.game.toUpperCase() : null;
  const filtered = game ? questionBank.getQuestionsForGame(game) : all;

  const pinangQuestions = all.filter(q => q.game === 'PINANG');
  const tugQuestions = all.filter(q => q.game === 'TUG');

  res.json({
    source: questionBank.getSource(),
    questions: filtered,
    count: filtered.length,
    totalMaster: all.length,
    distribution: {
      pinang: {
        total: pinangQuestions.length,
        easy: pinangQuestions.filter(q => q.difficulty === 'EASY').length,
        medium: pinangQuestions.filter(q => q.difficulty === 'MEDIUM').length,
        hard: pinangQuestions.filter(q => q.difficulty === 'HARD').length
      },
      tug: {
        total: tugQuestions.length,
        easy: tugQuestions.filter(q => q.difficulty === 'EASY').length,
        medium: tugQuestions.filter(q => q.difficulty === 'MEDIUM').length,
        hard: tugQuestions.filter(q => q.difficulty === 'HARD').length
      }
    }
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
  io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
  res.json({ success: true, message: 'Riwayat Tarik Tambang berhasil dikosongkan' });
});

// === REST API ENDPOINTS (SUPER ADMIN & UNIFIED LEADERBOARD) ===
// 1. Ambil Unified Leaderboard lengkap
app.get('/api/super/leaderboard', (req, res) => {
  res.json(superAdminEngine.getUnifiedLeaderboard());
});

// 2. Ambil Master Teams
app.get('/api/super/master-teams', (req, res) => {
  res.json({ teams: superAdminEngine.getMasterTeams() });
});

// 3. Ambil daftar Game Non-Digital
app.get('/api/super/custom-games', (req, res) => {
  res.json({ games: superAdminEngine.getCustomGames() });
});

// 4. Tambah Game Non-Digital baru
app.post('/api/super/custom-games', (req, res) => {
  try {
    const newGame = superAdminEngine.addCustomGame(req.body);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, game: newGame, message: 'Game non-digital berhasil ditambahkan' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. Update Game Non-Digital (Detail & Input Skor Tiap Tim)
app.put('/api/super/custom-games/:id', (req, res) => {
  try {
    const updated = superAdminEngine.updateCustomGame(req.params.id, req.body);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, game: updated, message: 'Game non-digital berhasil diperbarui' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Hapus Game Non-Digital
app.delete('/api/super/custom-games/:id', (req, res) => {
  try {
    const removed = superAdminEngine.deleteCustomGame(req.params.id);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, game: removed, message: 'Game non-digital berhasil dihapus' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 7. Update Pengaturan Poin Game Digital
app.post('/api/super/digital-settings', (req, res) => {
  try {
    const updated = superAdminEngine.updateDigitalSettings(req.body);
    if (typeof req.body.pinangPointsPerWin === 'number') {
      gameEngine.winScore = req.body.pinangPointsPerWin;
    }
    if (typeof req.body.pinangPointsPerLose === 'number') {
      gameEngine.loseScore = req.body.pinangPointsPerLose;
    }
    if (typeof req.body.pinangPointsPerDraw === 'number') {
      gameEngine.drawScore = req.body.pinangPointsPerDraw;
    }
    if (typeof req.body.pinangTurnTimeoutSeconds === 'number') {
      gameEngine.turnTimeoutSeconds = req.body.pinangTurnTimeoutSeconds;
    }
    gameEngine.saveStorage();
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, settings: updated, message: 'Pengaturan poin digital berhasil disimpan' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 8. Reset Skor Game Non-Digital
app.post('/api/super/reset-custom-scores', (req, res) => {
  superAdminEngine.resetAllCustomScores();
  io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
  res.json({ success: true, message: 'Seluruh skor game non-digital berhasil di-reset' });
});

// 9. Tambah Tim Baru
app.post('/api/super/teams', (req, res) => {
  try {
    const team = superAdminEngine.addTeam(req.body);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, team, message: `Tim ${team.name} berhasil ditambahkan!` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 10. Edit Tim
app.put('/api/super/teams/:id', (req, res) => {
  try {
    const team = superAdminEngine.updateTeam(req.params.id, req.body);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, team, message: `Tim ${team.name} berhasil diperbarui!` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 11. Hapus Tim
app.delete('/api/super/teams/:id', (req, res) => {
  try {
    const deleted = superAdminEngine.deleteTeam(req.params.id);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, team: deleted, message: `Tim ${deleted.name} berhasil dihapus!` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 12. Reset Tim ke Default Preloader (6 Tim)
app.post('/api/super/teams/reset-default', (req, res) => {
  try {
    const teams = superAdminEngine.resetTeamsToDefault();
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, teams, message: 'Daftar tim berhasil di-reset ke 6 tim default Educamp!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 13. Direct Set / Edit / Delete Skor Game Fisik
app.post('/api/super/set-score', (req, res) => {
  try {
    const { gameId, teamId, score } = req.body;
    const result = superAdminEngine.setGameScore(gameId, teamId, score);
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    res.json({ success: true, result, message: 'Skor berhasil diperbarui!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// === REST API BACKUP & RESTORE DATA GAME ===

// 14. Export / Download Full Backup Data Game (.json)
app.get('/api/backup/export', (req, res) => {
  try {
    const backup = backupManager.createBackup();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `educamp-2026-backup-${timestamp}.json`;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(JSON.stringify(backup, null, 2));
  } catch (err) {
    console.error('[Backup Export Error]', err);
    res.status(500).json({ error: err.message });
  }
});

// 15. Ambil status & statistik penyimpanan game saat ini
app.get('/api/backup/status', (req, res) => {
  try {
    res.json(backupManager.getStatus());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 16. Restore Data Game dari payload JSON
app.post('/api/backup/restore', (req, res) => {
  try {
    const { backup, options } = req.body;
    const payload = backup || req.body;
    const result = backupManager.restoreBackup(payload, options || {});

    // Broadcast update real-time ke semua client tersambung (Arena, Tablet, Leaderboard, Admin)
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
    io.emit('TUG_STATE_UPDATE', tugEngine.getPublicState());
    io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
    io.emit('MASTER_TEAMS_UPDATE', superAdminEngine.getMasterTeams());
    io.emit('CUSTOM_GAMES_UPDATE', superAdminEngine.getCustomGames());

    res.json({
      success: true,
      message: result.message,
      restoredItems: result.restoredItems,
      state: {
        pinang: gameEngine.getPublicState(),
        tug: tugEngine.getPublicState(),
        leaderboard: superAdminEngine.getUnifiedLeaderboard()
      }
    });
  } catch (err) {
    console.error('[Backup Restore Error]', err);
    res.status(400).json({ error: err.message });
  }
});

// === REALTIME SOCKET.IO DISPATCHER ===
io.on('connection', (socket) => {
  console.log(`[Socket Connected] ID: ${socket.id}`);

  // Kirim state awal saat client tersambung
  socket.emit('STATE_UPDATE', gameEngine.getPublicState());
  socket.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());

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

        // Anti-Stalling Rule: Batas Waktu Giliran Menjawab Per Tim (15s default, 0 = disabled)
        const timeoutLimitSec = typeof gameEngine.turnTimeoutSeconds === 'number' ? gameEngine.turnTimeoutSeconds : 15;
        if (timeoutLimitSec > 0) {
          const timeoutLimitMs = timeoutLimitSec * 1000;
          const now = Date.now();
          Object.keys(gameEngine.teams || {}).forEach(tId => {
            const team = gameEngine.teams[tId];
            if (team && team.questionStartTime && (now - team.questionStartTime >= timeoutLimitMs)) {
              const timeoutRes = gameEngine.handleTurnTimeout(tId);
              if (timeoutRes) {
                io.emit('ANSWER_RESULT', timeoutRes);
                io.emit('STATE_UPDATE', gameEngine.getPublicState());

                if (timeoutRes.isWinner) {
                  stopTimer();
                  io.emit('GAME_OVER', {
                    winner: gameEngine.winner,
                    reason: gameEngine.winnerReason,
                    isDraw: gameEngine.isDraw,
                    matchScores: gameEngine.matchScores
                  });
                  io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
                }
              }
            }
          });
        }

        if (gameEngine.remainingSeconds <= 0) {
          const timeoutResult = gameEngine.handleTimeout();
          stopTimer();
          io.emit('STATE_UPDATE', gameEngine.getPublicState());
          io.emit('GAME_OVER', {
            winner: gameEngine.winner,
            reason: gameEngine.winnerReason || 'TIME_OUT',
            isDraw: gameEngine.isDraw,
            matchScores: gameEngine.matchScores
          });
          io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
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

  // Action: UPDATE CONFIG (Mode, Wipeout style, Duration, Points, Team members, Turn Timeout, Match Scores)
  socket.on('UPDATE_CONFIG', (config) => {
    if (config.mode) gameEngine.setMode(config.mode);
    if (config.wipeoutMode) gameEngine.wipeoutMode = config.wipeoutMode;
    if (typeof config.durationSeconds === 'number' && config.durationSeconds > 0) {
      gameEngine.durationSeconds = config.durationSeconds;
      if (gameEngine.status !== 'PLAYING') {
        gameEngine.remainingSeconds = config.durationSeconds;
      }
    }
    if (typeof config.turnTimeoutSeconds === 'number') {
      gameEngine.turnTimeoutSeconds = Math.max(0, config.turnTimeoutSeconds);
    }
    if (typeof config.winScore === 'number') {
      gameEngine.winScore = Math.max(0, config.winScore);
    }
    if (typeof config.loseScore === 'number') {
      gameEngine.loseScore = Math.max(0, config.loseScore);
    }
    if (typeof config.drawScore === 'number') {
      gameEngine.drawScore = Math.max(0, config.drawScore);
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
        reason: 'REACHED_TOP',
        isDraw: false,
        matchScores: gameEngine.matchScores
      });
      io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
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
                  io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
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
          io.emit('SUPER_LEADERBOARD_UPDATE', superAdminEngine.getUnifiedLeaderboard());
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
