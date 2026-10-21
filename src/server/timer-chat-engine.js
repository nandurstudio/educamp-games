const fs = require('fs');
const path = require('path');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/timer-chat-storage.json');

class TimerChatEngine {
  constructor() {
    this.events = {};
    this.activeEventId = null;
    this.overlayConfig = { showChat: false };
    this.updatedAt = new Date().toISOString();
    this.loadStorage();
  }

  loadStorage() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyData(data);
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
      console.error('[TimerChatEngine] Gagal memuat storage lokal:', err.message);
      this.events = {};
    }

    // Sinkronkan dari Cloud Firestore jika tersedia
    if (firebaseService.isAvailable()) {
      this.reloadFromFirebase().then(success => {
        if (!success) {
          this.saveStorage();
        }
      });
    }
  }

  applyData(data) {
    if (!data || typeof data !== 'object') return;
    if (data.events && typeof data.events === 'object') {
      this.events = data.events;
    }
    if (data.activeEventId && this.events[data.activeEventId]) {
      this.activeEventId = data.activeEventId;
    }
    if (data.overlayConfig && typeof data.overlayConfig === 'object') {
      this.overlayConfig = { ...this.overlayConfig, ...data.overlayConfig };
    }
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const cloudData = await firebaseService.loadDoc('timer_chat');
      if (cloudData && typeof cloudData === 'object' && cloudData.events) {
        this.applyData(cloudData);
        this.saveLocalDisk();
        console.log(`[TimerChatEngine] State berhasil disinkronkan dari Cloud Firestore (${Object.keys(this.events).length} acara)!`);
        return true;
      }
    } catch (err) {
      console.warn('[TimerChatEngine] Firestore sync warning:', err.message);
    }
    return false;
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = {
        activeEventId: this.activeEventId,
        events: this.events,
        overlayConfig: this.overlayConfig,
        updatedAt: this.updatedAt
      };
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[TimerChatEngine] Gagal menyimpan storage lokal:', err.message);
    }
  }

  saveStorage() {
    this.updatedAt = new Date().toISOString();
    this.saveLocalDisk();

    // Simpan persisten ke Cloud Firestore
    if (firebaseService.isAvailable()) {
      const payload = {
        activeEventId: this.activeEventId,
        events: this.events,
        overlayConfig: this.overlayConfig,
        updatedAt: this.updatedAt
      };
      firebaseService.saveDoc('timer_chat', payload).catch(err => {
        console.warn('[TimerChatEngine] Firestore async save warning:', err.message);
      });
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
    const allowOvertime = t.allowOvertime !== false; // Default true
    let remaining = t.remainingSeconds;
    let isOvertime = false;
    let overtimeSeconds = 0;

    if (t.isRunning && t.targetEndTime) {
      const diffMs = t.targetEndTime - Date.now();
      if (diffMs >= 0) {
        remaining = Math.max(0, Math.ceil(diffMs / 1000));
        t.remainingSeconds = remaining;
      } else {
        // Melewati 00:00
        const passedSec = Math.floor(Math.abs(diffMs) / 1000);
        if (allowOvertime) {
          isOvertime = true;
          overtimeSeconds = passedSec;
          remaining = -passedSec;
          t.remainingSeconds = -passedSec;
        } else {
          t.isRunning = false;
          t.remainingSeconds = 0;
          t.targetEndTime = null;
          remaining = 0;
        }
      }
    } else if (t.remainingSeconds < 0) {
      isOvertime = true;
      overtimeSeconds = Math.abs(t.remainingSeconds);
      remaining = t.remainingSeconds;
    }

    return {
      eventId: targetId,
      durationSeconds: t.durationSeconds,
      remainingSeconds: remaining,
      overtimeSeconds: overtimeSeconds,
      isOvertime: isOvertime,
      allowOvertime: allowOvertime,
      status: t.isRunning ? (isOvertime ? 'OVERTIME' : 'RUNNING') : (t.status === 'STOPPED' ? 'STOPPED' : (t.pausedAt ? 'PAUSED' : (remaining <= 0 ? 'TIME_OUT' : 'IDLE'))),
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
      chatHistory: this.getChatHistory(targetId),
      overlayConfig: this.overlayConfig
    };
  }

  setOverlayChatVisibility(visible) {
    this.overlayConfig.showChat = !!visible;
    this.saveStorage();
    return this.overlayConfig;
  }

  setDuration(durationSeconds, eventId, options = {}) {
    return this.setTimerDuration(durationSeconds, eventId, options);
  }

  setTimerDuration(durationSeconds, eventId, options = {}) {
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

    // Cegah penggantian durasi timer saat timer sedang aktif berjalan
    if (ev.timer.isRunning && !(options && options.force)) {
      throw new Error('Timer sedang berjalan aktif. Harap hentikan (Stop / Pause) timer terlebih dahulu sebelum mengganti durasi.');
    }

    const parsedSec = Math.max(1, parseInt(sec, 10) || 300);
    ev.timer.durationSeconds = parsedSec;
    ev.timer.remainingSeconds = parsedSec;
    ev.timer.isRunning = false;
    ev.timer.targetEndTime = null;
    ev.timer.pausedAt = null;
    ev.timer.status = 'IDLE';

    this.saveStorage();
    return this.getState(targetId);
  }

  setOvertimeToggle(allowOvertime, eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    ev.timer.allowOvertime = !!allowOvertime;
    this.saveStorage();
    return this.getState(targetId);
  }

  startTimer(durationSeconds, eventId, options = {}) {
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
    if (options.allowOvertime !== undefined) {
      t.allowOvertime = !!options.allowOvertime;
    }
    if (sec && !isNaN(sec)) {
      t.durationSeconds = parseInt(sec, 10);
      t.remainingSeconds = t.durationSeconds;
    } else if (t.remainingSeconds <= 0 && !t.pausedAt && t.status !== 'STOPPED') {
      t.remainingSeconds = t.durationSeconds;
    }

    t.isRunning = true;
    t.targetEndTime = Date.now() + (t.remainingSeconds * 1000);
    t.pausedAt = null;
    t.status = 'RUNNING';

    this.saveStorage();
    return this.getState(targetId);
  }

  pauseTimer(eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    const allowOvertime = t.allowOvertime !== false;
    if (t.isRunning && t.targetEndTime) {
      const diffMs = t.targetEndTime - Date.now();
      if (diffMs >= 0) {
        t.remainingSeconds = Math.max(0, Math.ceil(diffMs / 1000));
      } else {
        // Sedang overtime saat di-pause/stop
        const passedSec = Math.floor(Math.abs(diffMs) / 1000);
        t.remainingSeconds = allowOvertime ? -passedSec : 0;
      }
    }

    t.isRunning = false;
    t.targetEndTime = null;
    t.pausedAt = Date.now();
    t.status = 'PAUSED';

    this.saveStorage();
    return this.getState(targetId);
  }

  stopTimer(eventId) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    const allowOvertime = t.allowOvertime !== false;
    if (t.isRunning && t.targetEndTime) {
      const diffMs = t.targetEndTime - Date.now();
      if (diffMs >= 0) {
        t.remainingSeconds = Math.max(0, Math.ceil(diffMs / 1000));
      } else {
        const passedSec = Math.floor(Math.abs(diffMs) / 1000);
        t.remainingSeconds = allowOvertime ? -passedSec : 0;
      }
    }

    // Freeze waktu saat di-stop (tidak kembali ke durasi preset!)
    t.isRunning = false;
    t.targetEndTime = null;
    t.pausedAt = null;
    t.status = 'STOPPED';

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
      quote: data.quote || null, // { id, userName, text }
      reactions: {}, // { '👍': ['name1', 'name2'], '❤️': ['name3'] }
      isDeleted: false,
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

  getCleanSeparatorTitle(raw) {
    if (!raw) return '';
    return String(raw).split(' - Aktual (')[0].split(' • Actual:')[0].trim().toLowerCase();
  }

  addSessionSeparator(eventId, sessionTitle, sessionDuration = null) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (ev && Array.isArray(ev.chats)) {
      const cleanIncoming = this.getCleanSeparatorTitle(sessionTitle);
      const existing = ev.chats.find(c => {
        if (!c.isSeparator || c.isDeleted) return false;
        const cleanExisting = this.getCleanSeparatorTitle(c.sessionTitle || c.message || c.text);
        return cleanExisting === cleanIncoming;
      });
      if (existing) {
        throw new Error(`Separator untuk sesi "${sessionTitle}" sudah ada di riwayat chat! Hapus terlebih dahulu separator lama untuk membuat yang baru.`);
      }
    }

    return this.addChatMessage(targetId, {
      message: sessionTitle,
      isSeparator: true,
      sessionTitle,
      sessionDuration
    });
  }

  deleteChatMessage(messageId, { requesterEmail, requesterName, requesterRole, isAdmin = false, eventId } = {}) {
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

    if (!foundMsg) {
      throw new Error('Pesan tidak ditemukan.');
    }

    // Otorisasi: Untuk pesan separator atau admin atau pengirim asli
    const isSeparator = !!foundMsg.isSeparator;
    const isSender = (requesterEmail && foundMsg.email && requesterEmail.toLowerCase() === foundMsg.email.toLowerCase()) ||
                     (requesterName && foundMsg.userName && requesterName.trim().toLowerCase() === foundMsg.userName.trim().toLowerCase());

    if (!isSeparator && !isSender && !isAdmin) {
      throw new Error('Akses ditolak: Hanya pengirim pesan atau Admin yang berhak menghapus pesan ini.');
    }

    if (isSeparator) {
      // Separator dihapus permanen
      this.events[targetEventId].chats.splice(foundIndex, 1);
      this.saveStorage();
      return {
        success: true,
        deletedMessageId: messageId,
        eventId: targetEventId,
        isPermanent: true,
        deletedBy: isSender ? 'SENDER' : 'ADMIN'
      };
    }

    // Hapus attachment secara fisik dari server jika berupa file lokal
    if (foundMsg.mediaUrl && typeof foundMsg.mediaUrl === 'string') {
      const url = foundMsg.mediaUrl.trim();
      // Hanya hapus file fisik lokal (misal: /uploads/...) dan jangan hapus aset bawaan /images/ atau data: URI
      if (url.startsWith('/uploads/') || url.startsWith('/storage/') || url.startsWith('uploads/')) {
        try {
          const relativePath = url.replace(/^\/+/, '');
          const localFilePath = path.join(__dirname, '../public', relativePath);
          if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log(`[TimerChatEngine] Berhasil menghapus file fisik: ${localFilePath}`);
          }
        } catch (fileErr) {
          console.error('[TimerChatEngine] Gagal menghapus file attachment fisik:', fileErr.message);
        }
      }
    }

    // Tentukan label & nama yang menghapus
    let deleteNoticeText = 'Pesan telah dihapus';
    if (!isSender && isAdmin) {
      const adminRole = requesterRole || 'Admin';
      const cleanName = (requesterName || 'Admin').trim();
      const firstName = cleanName.split(/\s+/)[0] || cleanName;
      deleteNoticeText = `Pesan dihapus oleh ${adminRole} ${firstName}`;
    }

    // Soft delete: bubble tetap ada dengan status isDeleted = true & pesan notice dinamis
    foundMsg.isDeleted = true;
    foundMsg.text = deleteNoticeText;
    foundMsg.message = deleteNoticeText;
    foundMsg.mediaUrl = null;
    foundMsg.mediaType = null;
    foundMsg.deletedAt = new Date().toISOString();
    foundMsg.deletedBy = isSender ? (requesterName || 'Pengirim') : 'Admin';
    foundMsg.deletedByRole = isSender ? 'SENDER' : (requesterRole || 'ADMIN');
    foundMsg.deletedByName = requesterName || (isSender ? 'Pengirim' : 'Admin');
    foundMsg.deleteNotice = deleteNoticeText;
    this.saveStorage();

    return {
      success: true,
      deletedMessageId: messageId,
      eventId: targetEventId,
      isPermanent: false,
      updatedMessage: foundMsg,
      deletedBy: isSender ? 'SENDER' : 'ADMIN',
      deleteNotice: deleteNoticeText
    };
  }

  toggleReaction(messageId, { emoji, userName, userEmail, eventId } = {}) {
    if (!emoji || !userName) throw new Error('Emoji dan nama pengguna wajib disertakan.');
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

    if (!foundMsg) throw new Error('Pesan tidak ditemukan.');
    if (!foundMsg.reactions || typeof foundMsg.reactions !== 'object') {
      foundMsg.reactions = {};
    }

    const currentList = foundMsg.reactions[emoji] || [];
    const userIdentifier = userEmail || userName;
    const existingIndex = currentList.findIndex(u => (typeof u === 'string' ? u : u.id) === userIdentifier);

    if (existingIndex !== -1) {
      // Toggle off / remove reaction
      currentList.splice(existingIndex, 1);
      if (currentList.length === 0) {
        delete foundMsg.reactions[emoji];
      } else {
        foundMsg.reactions[emoji] = currentList;
      }
    } else {
      // Add reaction
      currentList.push(userIdentifier);
      foundMsg.reactions[emoji] = currentList;
    }

    this.saveStorage();
    return {
      success: true,
      messageId,
      reactions: foundMsg.reactions,
      eventId: targetEventId,
      updatedMessage: foundMsg
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
    const isOvertime = tState.isOvertime || sec < 0;
    const absSec = Math.abs(sec);
    const m = Math.floor(absSec / 60).toString().padStart(2, '0');
    const s = (absSec % 60).toString().padStart(2, '0');
    const timeFormatted = isOvertime ? `+${m}:${s}` : `${m}:${s}`;
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
  <isBlinking>${(isOvertime || (sec <= 10 && sec > 0)) && tState.isRunning ? '1' : '0'}</isBlinking>
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
      status: tState.status,
      isRunning: tState.isRunning,
      isBlinking: (isOvertime || (sec <= 10 && sec > 0)) && tState.isRunning,
      isOvertime: isOvertime,
      overtimeSeconds: tState.overtimeSeconds || 0,
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
