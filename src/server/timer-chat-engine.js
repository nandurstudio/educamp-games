const fs = require('fs');
const path = require('path');

const STORAGE_FILE = path.join(__dirname, '../../data/timer-chat-storage.json');

class TimerChatEngine {
  constructor() {
    this.events = {};
    this.activeEventId = null;
    this.loadStorage();
  }

  loadStorage() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.events && typeof data.events === 'object') {
          this.events = data.events;
        }
        if (data.activeEventId && this.events[data.activeEventId]) {
          this.activeEventId = data.activeEventId;
        }
      }

      // Inisialisasi default event jika belum ada
      if (Object.keys(this.events).length === 0) {
        const defaultId = 'event-educamp-2026';
        this.events[defaultId] = {
          id: defaultId,
          name: 'Educamp & Team Building 2026',
          date: '2026-10-25',
          description: 'Sesi utama Educamp, sharing session, dan live presentation.',
          createdAt: new Date().toISOString(),
          timer: {
            durationSeconds: 300, // 5 menit default
            remainingSeconds: 300,
            isRunning: false,
            targetEndTime: null, // Epoch ms saat timer berjalan
            pausedAt: null
          },
          chats: [
            {
              id: 'chat-init-1',
              sender: 'Panitia Educamp',
              photoURL: '',
              email: 'panitia@educamp.local',
              text: 'Selamat datang di ruang Timer & Chat live! Silakan ajukan pertanyaan atau koordinasi di sini.',
              timestamp: new Date().toISOString(),
              role: 'PANITIA'
            }
          ]
        };
        this.activeEventId = defaultId;
        this.saveStorage();
      } else if (!this.activeEventId) {
        this.activeEventId = Object.keys(this.events)[0];
      }
    } catch (err) {
      console.error('[TimerChatEngine] Gagal memuat storage:', err.message);
      this.events = {};
    }
  }

  saveStorage() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        activeEventId: this.activeEventId,
        events: this.events,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[TimerChatEngine] Gagal menyimpan storage:', err.message);
    }
  }

  // === EVENT MANAGEMENT ===
  getAllEvents() {
    return Object.values(this.events).map(ev => ({
      id: ev.id,
      name: ev.name,
      date: ev.date,
      description: ev.description,
      createdAt: ev.createdAt,
      chatCount: ev.chats ? ev.chats.length : 0,
      timer: this.getTimerState(ev.id)
    }));
  }

  getActiveEvent() {
    if (!this.activeEventId || !this.events[this.activeEventId]) {
      this.activeEventId = Object.keys(this.events)[0];
    }
    const ev = this.events[this.activeEventId];
    if (!ev) return null;
    return {
      ...ev,
      timer: this.getTimerState(ev.id)
    };
  }

  setActiveEvent(eventId) {
    if (!this.events[eventId]) {
      throw new Error(`Event '${eventId}' tidak ditemukan.`);
    }
    this.activeEventId = eventId;
    this.saveStorage();
    return this.getActiveEvent();
  }

  createEvent({ name, date, description, defaultDuration = 300 }) {
    if (!name || !name.trim()) throw new Error('Nama acara wajib diisi.');
    const id = `event-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newEvent = {
      id,
      name: name.trim(),
      date: date || new Date().toISOString().split('T')[0],
      description: description ? description.trim() : '',
      createdAt: new Date().toISOString(),
      timer: {
        durationSeconds: parseInt(defaultDuration, 10) || 300,
        remainingSeconds: parseInt(defaultDuration, 10) || 300,
        isRunning: false,
        targetEndTime: null,
        pausedAt: null
      },
      chats: []
    };
    this.events[id] = newEvent;
    this.activeEventId = id;
    this.saveStorage();
    return newEvent;
  }

  deleteEvent(eventId) {
    if (!this.events[eventId]) throw new Error('Event tidak ditemukan.');
    if (Object.keys(this.events).length <= 1) {
      throw new Error('Minimal harus ada 1 acara terdaftar.');
    }
    const deleted = this.events[eventId];
    delete this.events[eventId];
    if (this.activeEventId === eventId) {
      this.activeEventId = Object.keys(this.events)[0];
    }
    this.saveStorage();
    return deleted;
  }

  // === TIMER ENGINE (0ms Target Epoch Calculation) ===
  getTimerState(eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev || !ev.timer) return null;

    const t = ev.timer;
    let remaining = t.remainingSeconds;

    if (t.isRunning && t.targetEndTime) {
      const diffMs = t.targetEndTime - Date.now();
      remaining = Math.max(0, Math.ceil(diffMs / 1000));
      if (remaining <= 0) {
        t.isRunning = false;
        t.remainingSeconds = 0;
        t.targetEndTime = null;
      } else {
        t.remainingSeconds = remaining;
      }
    }

    return {
      eventId: targetId,
      durationSeconds: t.durationSeconds,
      remainingSeconds: remaining,
      status: t.isRunning ? 'RUNNING' : (t.pausedAt ? 'PAUSED' : (remaining <= 0 ? 'TIME_OUT' : 'IDLE')),
      isRunning: t.isRunning,
      targetEndTime: t.targetEndTime,
      serverTime: Date.now()
    };
  }

  getState(eventId) {
    const active = this.getActiveEvent();
    const targetId = eventId || this.activeEventId;
    return {
      activeEvent: active,
      timer: this.getTimerState(targetId),
      chatHistory: this.getChatHistory(targetId)
    };
  }

  setDuration(durationSeconds, eventId) {
    return this.setTimerDuration(durationSeconds, eventId);
  }

  setTimerDuration(durationSeconds, eventId) {
    // Toleran: jika argumen pertama adalah string ID atau object
    let sec = durationSeconds;
    let targetId = eventId;
    if (typeof durationSeconds === 'string' && isNaN(durationSeconds)) {
      targetId = durationSeconds;
      sec = eventId;
    }
    targetId = targetId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const parsedSec = Math.max(1, parseInt(sec, 10) || 300);
    ev.timer.durationSeconds = parsedSec;
    ev.timer.remainingSeconds = parsedSec;
    ev.timer.isRunning = false;
    ev.timer.targetEndTime = null;
    ev.timer.pausedAt = null;

    this.saveStorage();
    return this.getState(targetId);
  }

  startTimer(durationSeconds, eventId) {
    let sec = durationSeconds;
    let targetId = eventId;
    if (typeof durationSeconds === 'string' && isNaN(durationSeconds)) {
      targetId = durationSeconds;
      sec = eventId;
    }
    targetId = targetId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    if (sec && !isNaN(sec)) {
      t.durationSeconds = parseInt(sec, 10);
      t.remainingSeconds = t.durationSeconds;
    } else if (t.remainingSeconds <= 0) {
      t.remainingSeconds = t.durationSeconds;
    }

    t.isRunning = true;
    t.targetEndTime = Date.now() + (t.remainingSeconds * 1000);
    t.pausedAt = null;

    this.saveStorage();
    return this.getState(targetId);
  }

  pauseTimer(eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    if (t.isRunning && t.targetEndTime) {
      const diffMs = t.targetEndTime - Date.now();
      t.remainingSeconds = Math.max(0, Math.ceil(diffMs / 1000));
    }

    t.isRunning = false;
    t.targetEndTime = null;
    t.pausedAt = Date.now();

    this.saveStorage();
    return this.getState(targetId);
  }

  resetTimer(durationSeconds, eventId) {
    let sec = durationSeconds;
    let targetId = eventId;
    if (typeof durationSeconds === 'string' && isNaN(durationSeconds)) {
      targetId = durationSeconds;
      sec = eventId;
    }
    targetId = targetId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    if (sec && !isNaN(sec)) {
      ev.timer.durationSeconds = parseInt(sec, 10);
    }
    ev.timer.isRunning = false;
    ev.timer.remainingSeconds = ev.timer.durationSeconds;
    ev.timer.targetEndTime = null;
    ev.timer.pausedAt = null;

    this.saveStorage();
    return this.getState(targetId);
  }

  // === CHAT SYSTEM (Multi-Event History) ===
  getChatHistory(eventId, limit = 100) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) return [];
    const chats = ev.chats || [];
    return chats.slice(-limit);
  }

  addChatMessage(eventIdOrPayload, payloadMaybe) {
    let targetId = this.activeEventId;
    let data = {};

    if (typeof eventIdOrPayload === 'string') {
      targetId = eventIdOrPayload;
      data = payloadMaybe || {};
    } else if (eventIdOrPayload && typeof eventIdOrPayload === 'object') {
      data = eventIdOrPayload;
      if (data.eventId) targetId = data.eventId;
    }

    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const text = data.text || data.message || '';
    const hasMedia = !!(data.mediaUrl && data.mediaUrl.trim());
    if (!text.trim() && !hasMedia) throw new Error('Pesan atau lampiran tidak boleh kosong.');

    const isSeparator = !!data.isSeparator;

    const msg = {
      id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      eventId: targetId,
      sender: isSeparator ? 'Sistem' : (data.sender || data.userName || 'Peserta'),
      userName: isSeparator ? 'Sistem' : (data.userName || data.sender || 'Peserta'),
      text: text.trim(),
      message: text.trim(),
      photoURL: isSeparator ? '' : (data.photoURL || data.userPhoto || ''),
      userPhoto: isSeparator ? '' : (data.userPhoto || data.photoURL || ''),
      email: isSeparator ? '' : (data.email || data.userEmail || ''),
      userEmail: isSeparator ? '' : (data.userEmail || data.email || ''),
      role: isSeparator ? 'SYSTEM' : (data.role || 'AUDIENCE'),
      isSeparator: isSeparator,
      sessionTitle: data.sessionTitle || '',
      sessionDuration: data.sessionDuration || null,
      mediaUrl: data.mediaUrl || null,
      mediaType: data.mediaType || null, // 'IMAGE' | 'STICKER'
      timestamp: new Date().toISOString()
    };

    if (!Array.isArray(ev.chats)) ev.chats = [];
    ev.chats.push(msg);

    // Batasi riwayat maksimal 1000 pesan per event
    if (ev.chats.length > 1000) {
      ev.chats = ev.chats.slice(-1000);
    }

    this.saveStorage();
    return msg;
  }

  addSessionSeparator(eventId, sessionTitle, sessionDuration = null) {
    return this.addChatMessage(eventId, {
      message: sessionTitle,
      isSeparator: true,
      sessionTitle,
      sessionDuration
    });
  }

  deleteChatMessage(messageId, { requesterEmail, requesterName, isAdmin = false, eventId } = {}) {
    let targetEventId = eventId;
    let foundMsg = null;
    let foundIndex = -1;

    // Cari pesan di event spesifik atau semua event jika eventId tidak dispesifikasikan
    const eventKeys = targetEventId ? [targetEventId] : Object.keys(this.events);
    for (const eId of eventKeys) {
      const ev = this.events[eId];
      if (ev && Array.isArray(ev.chats)) {
        const idx = ev.chats.findIndex(m => m.id === messageId);
        if (idx !== -1) {
          foundMsg = ev.chats[idx];
          foundIndex = idx;
          targetEventId = eId;
          break;
        }
      }
    }

    // Otorisasi: Untuk pesan separator atau admin atau pengirim asli
    const isSeparator = !!foundMsg.isSeparator;
    const isSender = (requesterEmail && foundMsg.email && requesterEmail.toLowerCase() === foundMsg.email.toLowerCase()) ||
                     (requesterName && foundMsg.userName && requesterName.trim().toLowerCase() === foundMsg.userName.trim().toLowerCase());

    if (!isSeparator && !isSender && !isAdmin) {
      throw new Error('Akses ditolak: Hanya pengirim pesan atau Admin yang berhak menghapus pesan ini.');
    }

    // Hapus pesan dari array chats event
    this.events[targetEventId].chats.splice(foundIndex, 1);
    this.saveStorage();

    return {
      success: true,
      deletedMessageId: messageId,
      eventId: targetEventId,
      deletedBy: isSender ? 'SENDER' : (isSeparator ? 'USER_OR_ADMIN' : 'ADMIN')
    };
  }

  updateChatMessage(messageId, { text, sessionTitle, sessionDuration, requesterEmail, requesterName, isAdmin = false, eventId } = {}) {
    let targetEventId = eventId;
    let foundMsg = null;

    const eventKeys = targetEventId ? [targetEventId] : Object.keys(this.events);
    for (const eId of eventKeys) {
      const ev = this.events[eId];
      if (ev && Array.isArray(ev.chats)) {
        const m = ev.chats.find(item => item.id === messageId);
        if (m) {
          foundMsg = m;
          targetEventId = eId;
          break;
        }
      }
    }

    if (!foundMsg) {
      throw new Error('Pesan tidak ditemukan.');
    }

    const isSeparator = !!foundMsg.isSeparator;
    const isSender = (requesterEmail && foundMsg.email && requesterEmail.toLowerCase() === foundMsg.email.toLowerCase()) ||
                     (requesterName && foundMsg.userName && requesterName.trim().toLowerCase() === foundMsg.userName.trim().toLowerCase());

    if (!isSeparator && !isSender && !isAdmin) {
      throw new Error('Akses ditolak: Hanya pengirim pesan atau Admin yang berhak mengedit pesan ini.');
    }

    if (sessionTitle !== undefined) {
      foundMsg.sessionTitle = sessionTitle.trim();
      foundMsg.message = sessionTitle.trim();
      foundMsg.text = sessionTitle.trim();
    } else if (text !== undefined) {
      foundMsg.message = text.trim();
      foundMsg.text = text.trim();
    }

    if (sessionDuration !== undefined) {
      foundMsg.sessionDuration = parseInt(sessionDuration, 10);
    }

    foundMsg.updatedAt = new Date().toISOString();
    this.saveStorage();

    return {
      success: true,
      updatedMessage: foundMsg,
      eventId: targetEventId
    };
  }

  clearChatHistory(eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');
    ev.chats = [];
    this.saveStorage();
    return true;
  }

  // === VMIX INTEGRATION OUTPUT GENERATOR ===
  // Mendukung text murni (format MM:SS atau sisa detik), JSON, atau XML untuk vMix Title / Data Source
  getVmixData(eventId, format = 'json') {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) return null;

    const tState = this.getTimerState(targetId);
    const sec = tState.remainingSeconds;
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    const timeFormatted = `${m}:${s}`;
    const latestChat = (ev.chats && ev.chats.length > 0) ? ev.chats[ev.chats.length - 1] : null;

    if (format === 'text') {
      return timeFormatted;
    }

    if (format === 'xml') {
      return `<?xml version="1.0" encoding="utf-8"?>
<vmix>
  <event>${ev.name}</event>
  <time>${timeFormatted}</time>
  <seconds>${sec}</seconds>
  <duration>${tState.durationSeconds}</duration>
  <isRunning>${tState.isRunning ? '1' : '0'}</isRunning>
  <isBlinking>${sec <= 10 && tState.isRunning ? '1' : '0'}</isBlinking>
  <latestChatSender>${latestChat ? latestChat.sender : ''}</latestChatSender>
  <latestChatMessage>${latestChat ? latestChat.text : ''}</latestChatMessage>
</vmix>`;
    }

    // Default JSON
    return {
      eventName: ev.name,
      eventDate: ev.date,
      time: timeFormatted,
      remainingSeconds: sec,
      durationSeconds: tState.durationSeconds,
      isRunning: tState.isRunning,
      isBlinking: sec <= 10 && tState.isRunning,
      targetEndTime: tState.targetEndTime,
      serverTime: Date.now(),
      latestChat: latestChat ? {
        sender: latestChat.sender,
        text: latestChat.text,
        timestamp: latestChat.timestamp
      } : null
    };
  }
}

module.exports = new TimerChatEngine();
