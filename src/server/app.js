require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');

const gameEngine = require('./game-engine');
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

// === REST API ENDPOINTS ===

// 1. Ambil state game terkini
app.get('/api/state', (req, res) => {
  res.json(gameEngine.getPublicState());
});

// 2. Ambil bank soal
app.get('/api/questions', (req, res) => {
  res.json(questionBank.getAll());
});

// 3. Simpan bank soal kustom
app.post('/api/questions', (req, res) => {
  const { questions } = req.body;
  if (Array.isArray(questions)) {
    questionBank.setQuestions(questions);
    return res.json({ success: true, count: questions.length });
  }
  res.status(400).json({ error: 'Format pertanyaan tidak valid' });
});

// 4. Generate soal otomatis via Google AI Studio (Gemini)
app.post('/api/generate-ai-quiz', async (req, res) => {
  try {
    const { apiKey, topic, count, difficulty } = req.body;
    const questions = await generateQuizQuestions({ apiKey, topic, count, difficulty });
    questionBank.setQuestions(questions);
    res.json({ success: true, count: questions.length, questions });
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 5. Ambil riwayat pertandingan
app.get('/api/history', (req, res) => {
  res.json({ history: gameEngine.history || [] });
});

// 6. Reset riwayat pertandingan
app.post('/api/history/clear', (req, res) => {
  gameEngine.clearHistory();
  io.emit('STATE_UPDATE', gameEngine.getPublicState());
  res.json({ success: true, message: 'Riwayat pertandingan berhasil dikosongkan' });
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

  // Action: UPDATE CONFIG (Mode, Wipeout style, Duration, Team members)
  socket.on('UPDATE_CONFIG', (config) => {
    if (config.mode) gameEngine.setMode(config.mode);
    if (config.wipeoutMode) gameEngine.wipeoutMode = config.wipeoutMode;
    if (typeof config.durationSeconds === 'number' && config.durationSeconds > 0) {
      gameEngine.durationSeconds = config.durationSeconds;
      if (gameEngine.status !== 'PLAYING') {
        gameEngine.remainingSeconds = config.durationSeconds;
      }
    }
    if (config.teams) {
      gameEngine.setTeamsConfig(config.teams);
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

  // Action: CLEAR HISTORY (dari Admin)
  socket.on('CLEAR_HISTORY', () => {
    gameEngine.clearHistory();
    io.emit('STATE_UPDATE', gameEngine.getPublicState());
  });

  socket.on('disconnect', () => {
    console.log(`[Socket Disconnected] ID: ${socket.id}`);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🌴 Panjat Pinang Virtual - Educamp Game Server Ready`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌐 Local Arena URL: http://localhost:${PORT}/arena.html`);
  console.log(`📱 Tablet Controller: http://localhost:${PORT}/controller.html`);
  console.log(`⚙️  Admin Dashboard: http://localhost:${PORT}/admin.html`);
  console.log(`====================================================`);
});
