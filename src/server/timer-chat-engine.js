const fs = require('fs');
const path = require('path');
const firebaseService = require('./firebase-service');
const masterRundowns = require('./master-rundowns');

const STORAGE_FILE = path.join(__dirname, '../../data/timer-chat-storage.json');

class TimerChatEngine {
  constructor() {
    this.events = {};
    this.activeEventId = null;
    this.overlayConfig = { showChat: false };
    this.sessionState = {
      currentDayTab: 'DAY_1',
      currentActiveSession: null,
      rundownDay1: null,
      rundownDay2: null,
      completedSessionsDay1: [],
      completedSessionsDay2: [],
      lastActiveSeparatorMessageId: null,
      lastActiveSeparatorBaseTitle: 'Sesi Acara',
      updatedAt: null
    };
    this.updatedAt = new Date().toISOString();
    this.isHydrated = false;
    this.hydrationPromise = null;
    this.loadStorage();
  }

  
  getMasterRundownForEvent(eventId, dayKey = 'DAY_1') {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    const isGR = (targetId && targetId.includes('gr')) || 
                 (ev && ((ev.name && ev.name.toLowerCase().includes('gladi')) || (ev.sessionId && ev.sessionId.includes('gladi'))));
    const normalizedDay = (dayKey || 'DAY_1').toUpperCase();
    if (isGR) {
      return normalizedDay === 'DAY_1' ? masterRundowns.RUNDOWN_GR_DAY_1 : masterRundowns.RUNDOWN_GR_DAY_2;
    }
    return normalizedDay === 'DAY_1' ? masterRundowns.RUNDOWN_OFFICIAL_DAY_1 : masterRundowns.RUNDOWN_OFFICIAL_DAY_2;
  }

  sanitizeChatsList(chats) {
    if (!Array.isArray(chats)) return [];
    const legacyWelcomeText = 'Selamat datang di ruang Timer & Chat live! Silakan ajukan pertanyaan atau koordinasi di sini.';
    return chats.filter(c => {
      if (!c || typeof c !== 'object') return false;
      if (c.id === 'chat-init-1') return false;
      const txt = (c.text || c.message || '').trim();
      if (txt === legacyWelcomeText && (c.sender === 'Panitia Educamp' || c.email === 'panitia@educamp.local')) {
        return false;
      }
      return true;
    });
  }

  initDefaultStructureOnly() {
    if (!this.events['event-hc-tpm-gk-2026']) {
      this.events['event-hc-tpm-gk-2026'] = {
        id: 'event-hc-tpm-gk-2026',
        sessionId: 'gk-tpm-stage2',
        joinCode: 'GK-TPM-2026',
        name: 'Gladi Kotor (GK) TPM Stage 2',
        date: '2026-10-30',
        description: 'Sesi Gladi Kotor (GK) Health Check Stage 2 TPM PT Sanghiang Perkasa',
        createdAt: new Date().toISOString(),
        timer: { mode: 'COUNTDOWN', durationSeconds: 300, remainingSeconds: 300, status: 'IDLE', isRunning: false, targetEndTime: null },
        chats: [],
        sessionState: {
          rundownDay1: masterRundowns.RUNDOWN_GR_DAY_1,
          rundownDay2: masterRundowns.RUNDOWN_GR_DAY_2,
          completedSessionsDay1: [],
          completedSessionsDay2: []
        }
      };
    }
    if (!this.events['event-hc-tpm-gr-2026']) {
      this.events['event-hc-tpm-gr-2026'] = {
        id: 'event-hc-tpm-gr-2026',
        sessionId: 'gr-tpm-stage2',
        joinCode: 'GR-TPM-2026',
        name: 'Gladi Resik (GR) TPM Stage 2',
        date: '2026-11-02',
        description: 'Sesi Gladi Resik (GR) Health Check Stage 2 TPM PT Sanghiang Perkasa',
        createdAt: new Date().toISOString(),
        timer: { mode: 'COUNTDOWN', durationSeconds: 300, remainingSeconds: 300, status: 'IDLE', isRunning: false, targetEndTime: null },
        chats: [],
        sessionState: {
          rundownDay1: masterRundowns.RUNDOWN_GR_DAY_1,
          rundownDay2: masterRundowns.RUNDOWN_GR_DAY_2,
          completedSessionsDay1: [],
          completedSessionsDay2: []
        }
      };
    }
    if (!this.events['event-hc-tpm-stage2-2026']) {
      this.events['event-hc-tpm-stage2-2026'] = {
        id: 'event-hc-tpm-stage2-2026',
        sessionId: 'hari-h-tpm-stage2',
        joinCode: 'HARI-H-TPM-2026',
        name: 'Health Check TPM Stage 2 (Hari-H)',
        date: '2026-11-03',
        description: 'Health Check Stage 2 TPM PT Sanghiang Perkasa bersama JMAC (Mr. Otsuka)',
        createdAt: new Date().toISOString(),
        timer: { mode: 'COUNTDOWN', durationSeconds: 300, remainingSeconds: 300, status: 'IDLE', isRunning: false, targetEndTime: null },
        chats: [],
        sessionState: {
          rundownDay1: masterRundowns.RUNDOWN_OFFICIAL_DAY_1,
          rundownDay2: masterRundowns.RUNDOWN_OFFICIAL_DAY_2,
          completedSessionsDay1: [],
          completedSessionsDay2: []
        }
      };
    }
    if (!this.activeEventId || !this.events[this.activeEventId]) {
      this.activeEventId = 'event-hc-tpm-gr-2026';
    }
  }

  loadStorage() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyData(data);
      }

      if (Object.keys(this.events).length === 0) {
        // Hanya siapkan struktur dasar di memori tanpa menimpa Cloud Firestore!
        this.initDefaultStructureOnly();
      } else if (!this.activeEventId || !this.events[this.activeEventId]) {
        this.activeEventId = Object.keys(this.events)[0];
      }
    } catch (err) {
      console.error('[TimerChatEngine] Gagal memuat storage lokal:', err.message);
      this.events = {};
      this.initDefaultStructureOnly();
    }

    // Sinkronkan dari Cloud Firestore jika tersedia sebelum mengizinkan write ke cloud
    if (firebaseService.isAvailable()) {
      this.hydrationPromise = this.reloadFromFirebase();
    } else {
      this.isHydrated = true;
      this.saveLocalDisk();
    }
  }

  async ensureHydrated() {
    if (this.isHydrated) return true;
    if (this.hydrationPromise) {
      try {
        await this.hydrationPromise;
      } catch (_) {}
      return this.isHydrated;
    }
    return this.reloadFromFirebase();
  }

  mergeChatArrays(localChats = [], cloudChats = [], clearedAt = null) {
    const cleanLocal = this.sanitizeChatsList(localChats);
    const cleanCloud = this.sanitizeChatsList(cloudChats);
    const clearTime = clearedAt ? new Date(clearedAt).getTime() : 0;

    const map = new Map();
    for (const msg of cleanCloud) {
      if (!msg || !msg.id) continue;
      const msgTime = msg.timestamp ? new Date(msg.timestamp).getTime() : 0;
      if (clearTime && msgTime > 0 && msgTime < clearTime) continue;
      map.set(msg.id, { ...msg });
    }
    for (const msg of cleanLocal) {
      if (!msg || !msg.id) continue;
      const msgTime = msg.timestamp ? new Date(msg.timestamp).getTime() : 0;
      if (clearTime && msgTime > 0 && msgTime < clearTime) continue;
      if (map.has(msg.id)) {
        const existing = map.get(msg.id);
        const existingUpd = new Date(existing.updatedAt || existing.deletedAt || existing.timestamp || 0).getTime();
        const localUpd = new Date(msg.updatedAt || msg.deletedAt || msg.timestamp || 0).getTime();
        if (localUpd >= existingUpd || (msg.isDeleted && !existing.isDeleted)) {
          map.set(msg.id, { ...existing, ...msg });
        }
      } else {
        map.set(msg.id, { ...msg });
      }
    }

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      const tA = new Date(a.timestamp || 0).getTime();
      const tB = new Date(b.timestamp || 0).getTime();
      return tA - tB;
    });
    return merged.slice(-1000);
  }

  mergeSessionStates(localSession, cloudSession) {
    if (!cloudSession && !localSession) return { ...this.sessionState };
    if (!cloudSession) return { ...this.sessionState, ...localSession };
    if (!localSession) return { ...this.sessionState, ...cloudSession };

    const localTime = localSession.updatedAt ? new Date(localSession.updatedAt).getTime() : 0;
    const cloudTime = cloudSession.updatedAt ? new Date(cloudSession.updatedAt).getTime() : 0;
    const primary = cloudTime >= localTime ? cloudSession : localSession;
    const secondary = cloudTime >= localTime ? localSession : cloudSession;

    const completedDay1 = Array.from(new Set([
      ...(Array.isArray(secondary.completedSessionsDay1) ? secondary.completedSessionsDay1 : []),
      ...(Array.isArray(primary.completedSessionsDay1) ? primary.completedSessionsDay1 : [])
    ]));
    const completedDay2 = Array.from(new Set([
      ...(Array.isArray(secondary.completedSessionsDay2) ? secondary.completedSessionsDay2 : []),
      ...(Array.isArray(primary.completedSessionsDay2) ? primary.completedSessionsDay2 : [])
    ]));

    return {
      ...this.sessionState,
      ...secondary,
      ...primary,
      currentActiveSession: primary.currentActiveSession || secondary.currentActiveSession || null,
      rundownDay1: (Array.isArray(primary.rundownDay1) && primary.rundownDay1.length > 0)
        ? primary.rundownDay1
        : (Array.isArray(secondary.rundownDay1) && secondary.rundownDay1.length > 0 ? secondary.rundownDay1 : null),
      rundownDay2: (Array.isArray(primary.rundownDay2) && primary.rundownDay2.length > 0)
        ? primary.rundownDay2
        : (Array.isArray(secondary.rundownDay2) && secondary.rundownDay2.length > 0 ? secondary.rundownDay2 : null),
      completedSessionsDay1: completedDay1,
      completedSessionsDay2: completedDay2
    };
  }

  applyData(data, mergeWithCurrent = false) {
    if (!data || typeof data !== 'object') return;

    if (data.sessionState && typeof data.sessionState === 'object') {
      this.sessionState = mergeWithCurrent
        ? this.mergeSessionStates(this.sessionState, data.sessionState)
        : { ...this.sessionState, ...data.sessionState };
    }

    if (data.events && typeof data.events === 'object') {
      if (!mergeWithCurrent || Object.keys(this.events).length === 0) {
        const cleanedEvents = {};
        for (const [evId, evObj] of Object.entries(data.events)) {
          if (!evObj || typeof evObj !== 'object') continue;
          const cleanSession = evObj.sessionId || evId.replace(/^event-/, '') || 'educamp-2026';
          cleanedEvents[evId] = {
            ...evObj,
            sessionId: cleanSession,
            joinCode: evObj.joinCode || cleanSession.toUpperCase(),
            chats: this.sanitizeChatsList(evObj.chats || []),
            sessionState: evObj.sessionState
              ? this.mergeSessionStates(this.sessionState, evObj.sessionState)
              : { ...this.sessionState }
          };
        }
        if (Object.keys(cleanedEvents).length > 0) {
          this.events = cleanedEvents;
        }
      } else {
        // Deep merge antara event di memori/lokal dan event dari Cloud Firestore
        const allEventIds = new Set([...Object.keys(data.events), ...Object.keys(this.events)]);
        const mergedEvents = {};
        for (const evId of allEventIds) {
          const localEv = this.events[evId];
          const cloudEv = data.events[evId];
          const baseSession = (cloudEv && cloudEv.sessionId) || (localEv && localEv.sessionId) || evId.replace(/^event-/, '') || 'educamp-2026';
          const baseJoinCode = (cloudEv && cloudEv.joinCode) || (localEv && localEv.joinCode) || baseSession.toUpperCase();

          if (localEv && cloudEv) {
            const localClear = localEv.chatsClearedAt ? new Date(localEv.chatsClearedAt).getTime() : 0;
            const cloudClear = cloudEv.chatsClearedAt ? new Date(cloudEv.chatsClearedAt).getTime() : 0;
            const latestClearedAt = Math.max(localClear, cloudClear) > 0
              ? new Date(Math.max(localClear, cloudClear)).toISOString()
              : null;

            const mergedChats = this.mergeChatArrays(localEv.chats, cloudEv.chats, latestClearedAt);
            const mergedSession = this.mergeSessionStates(localEv.sessionState, cloudEv.sessionState);

            // Pilih state timer terbaru (jika cloud sedang running atau lebih baru)
            const cloudTimer = cloudEv.timer || {};
            const localTimer = localEv.timer || {};
            const useCloudTimer = cloudTimer.isRunning || (!localTimer.isRunning && (new Date(data.updatedAt || 0).getTime() >= new Date(this.updatedAt || 0).getTime()));

            mergedEvents[evId] = {
              ...localEv,
              ...cloudEv,
              sessionId: baseSession,
              joinCode: baseJoinCode,
              timer: useCloudTimer ? { ...localTimer, ...cloudTimer } : { ...cloudTimer, ...localTimer },
              chats: mergedChats,
              chatsClearedAt: latestClearedAt,
              sessionState: mergedSession
            };
          } else if (cloudEv) {
            mergedEvents[evId] = {
              ...cloudEv,
              sessionId: baseSession,
              joinCode: baseJoinCode,
              chats: this.sanitizeChatsList(cloudEv.chats || []),
              sessionState: cloudEv.sessionState
                ? this.mergeSessionStates(this.sessionState, cloudEv.sessionState)
                : { ...this.sessionState }
            };
          } else if (localEv) {
            mergedEvents[evId] = {
              ...localEv,
              sessionId: baseSession,
              joinCode: baseJoinCode,
              chats: this.sanitizeChatsList(localEv.chats || []),
              sessionState: localEv.sessionState
                ? this.mergeSessionStates(this.sessionState, localEv.sessionState)
                : { ...this.sessionState }
            };
          }
        }
        if (Object.keys(mergedEvents).length > 0) {
          this.events = mergedEvents;
        }
      }
    }

    if (data.activeEventId && this.events[data.activeEventId]) {
      this.activeEventId = data.activeEventId;
    } else if (!this.activeEventId || !this.events[this.activeEventId]) {
      this.activeEventId = Object.keys(this.events)[0] || null;
    }

    if (data.overlayConfig && typeof data.overlayConfig === 'object') {
      this.overlayConfig = { ...this.overlayConfig, ...data.overlayConfig };
    }
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  exportData() {
    return {
      activeEventId: this.activeEventId,
      events: this.events,
      overlayConfig: this.overlayConfig,
      sessionState: this.sessionState,
      updatedAt: this.updatedAt
    };
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) {
      this.isHydrated = true;
      return false;
    }
    try {
      const cloudData = await firebaseService.loadDoc('timer_chat');
      if (cloudData && typeof cloudData === 'object' && cloudData.events) {
        this.applyData(cloudData, true);
        this.isHydrated = true;
        this.saveLocalDisk();
        // Simpan kembali hasil merge bersih (tanpa chat-init-1) ke Firestore
        await firebaseService.saveDoc('timer_chat', this.exportData(), true);
        const activeEv = this.getActiveEvent();
        const chatLen = activeEv && Array.isArray(activeEv.chats) ? activeEv.chats.length : 0;
        console.log(`[TimerChatEngine] State & Session berhasil disinkronkan dari Cloud Firestore (${Object.keys(this.events).length} acara, ${chatLen} chat aktif)!`);
        return true;
      } else {
        // Dokumen timer_chat belum ada di Firestore, inisialisasi dari state lokal saat ini
        this.isHydrated = true;
        this.saveLocalDisk();
        await firebaseService.saveDoc('timer_chat', this.exportData(), true);
        return true;
      }
    } catch (err) {
      console.warn('[TimerChatEngine] Firestore sync warning:', err.message);
      this.isHydrated = true;
    }
    return false;
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(STORAGE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(this.exportData(), null, 2), 'utf-8');
    } catch (err) {
      console.error('[TimerChatEngine] Gagal menyimpan storage lokal:', err.message);
    }
  }

  saveStorage(immediate = true) {
    this.updatedAt = new Date().toISOString();
    this.saveLocalDisk();

    // Simpan persisten ke Cloud Firestore (pastikan sudah hydrate agar tidak menimpa data cloud!)
    if (firebaseService.isAvailable()) {
      if (!this.isHydrated && this.hydrationPromise) {
        this.hydrationPromise.then(() => {
          firebaseService.saveDoc('timer_chat', this.exportData(), true).catch(err => {
            console.warn('[TimerChatEngine] Firestore post-hydration save warning:', err.message);
          });
        }).catch(() => {});
        return;
      }
      firebaseService.saveDoc('timer_chat', this.exportData(), immediate).catch(err => {
        console.warn('[TimerChatEngine] Firestore async save warning:', err.message);
      });
    }
  }

  generateCleanSessionSlug(raw) {
    if (!raw) return `room-${Date.now().toString(36)}`;
    const slug = String(raw).toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30);
    return slug || `room-${Date.now().toString(36)}`;
  }

  findEventByIdOrSession(identifier) {
    if (!identifier) return this.getActiveEvent();
    const raw = String(identifier).trim().toLowerCase();

    // Check direct id match
    if (this.events[raw]) return this.events[raw];
    if (this.events[`event-${raw}`]) return this.events[`event-${raw}`];

    // Check by sessionId, joinCode, or normalized id
    for (const ev of Object.values(this.events)) {
      if (!ev) continue;
      const evId = (ev.id || '').toLowerCase();
      const evSession = (ev.sessionId || '').toLowerCase();
      const evCode = (ev.joinCode || '').toLowerCase();

      if (evId === raw || evSession === raw || evCode === raw) {
        return ev;
      }
      if (raw.replace(/^event-/, '') === evSession || raw.replace(/^event-/, '') === evId.replace(/^event-/, '')) {
        return ev;
      }
    }
    return null;
  }

  // === EVENT MANAGEMENT ===
  getAllEvents() {
    return Object.values(this.events).map(ev => {
      const cleanSession = ev.sessionId || ev.id.replace(/^event-/, '') || 'educamp-2026';
      return {
        id: ev.id,
        sessionId: cleanSession,
        joinCode: ev.joinCode || cleanSession.toUpperCase(),
        name: ev.name,
        date: ev.date,
        description: ev.description,
        createdAt: ev.createdAt,
        chatCount: ev.chats ? ev.chats.length : 0,
        timer: this.getTimerState(ev.id)
      };
    });
  }

  getActiveEvent() {
    if (!this.activeEventId || !this.events[this.activeEventId]) {
      this.activeEventId = Object.keys(this.events)[0];
    }
    const ev = this.events[this.activeEventId];
    if (!ev) return null;
    const cleanSession = ev.sessionId || ev.id.replace(/^event-/, '') || 'educamp-2026';
    return {
      ...ev,
      sessionId: cleanSession,
      joinCode: ev.joinCode || cleanSession.toUpperCase(),
      timer: this.getTimerState(ev.id)
    };
  }

  setActiveEvent(eventIdOrSession) {
    const ev = this.findEventByIdOrSession(eventIdOrSession);
    if (!ev) {
      throw new Error(`Event '${eventIdOrSession}' tidak ditemukan.`);
    }
    this.activeEventId = ev.id;
    this.saveStorage();
    return this.getActiveEvent();
  }

  createEvent({ name, date, description, defaultDuration = 300, sessionId = null }) {
    if (!name || !name.trim()) throw new Error('Nama acara wajib diisi.');
    const id = `event-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let finalSessionId = this.generateCleanSessionSlug(sessionId || name);
    if (this.findEventByIdOrSession(finalSessionId)) {
      finalSessionId = `${finalSessionId}-${Math.random().toString(36).substr(2, 3)}`;
    }
    const newEvent = {
      id,
      sessionId: finalSessionId,
      joinCode: finalSessionId.toUpperCase(),
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
      chats: [],
      sessionState: { ...this.sessionState }
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
    const mode = (t.mode || 'COUNTDOWN').toUpperCase();
    const allowOvertime = t.allowOvertime !== false; // Default true
    let remaining = t.remainingSeconds;
    let isOvertime = false;
    let overtimeSeconds = 0;
    let elapsed = t.elapsedSeconds || 0;

    if (mode === 'COUNTUP') {
      if (t.isRunning && t.startTime) {
        elapsed = Math.max(0, Math.floor((Date.now() - t.startTime) / 1000));
        t.elapsedSeconds = elapsed;
        remaining = elapsed;
        t.remainingSeconds = elapsed;
      } else {
        elapsed = t.elapsedSeconds || 0;
        remaining = elapsed;
      }
      return {
        eventId: targetId,
        mode: 'COUNTUP',
        durationSeconds: t.durationSeconds || 300,
        remainingSeconds: remaining,
        elapsedSeconds: elapsed,
        startTime: t.startTime || null,
        overtimeSeconds: 0,
        isOvertime: false,
        allowOvertime: allowOvertime,
        status: t.isRunning ? 'RUNNING' : (t.status === 'STOPPED' ? 'STOPPED' : (t.pausedAt ? 'PAUSED' : 'IDLE')),
        isRunning: !!t.isRunning,
        targetEndTime: null,
        startedBy: t.startedBy || null,
        stoppedBy: t.stoppedBy || null,
        lastAction: t.lastAction || null,
        actionLogs: Array.isArray(t.actionLogs) ? t.actionLogs.slice(-50) : [],
        serverTime: Date.now()
      };
    }

    // COUNTDOWN MODE
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
      mode: 'COUNTDOWN',
      durationSeconds: t.durationSeconds,
      remainingSeconds: remaining,
      elapsedSeconds: t.elapsedSeconds || 0,
      startTime: null,
      overtimeSeconds: overtimeSeconds,
      isOvertime: isOvertime,
      allowOvertime: allowOvertime,
      status: t.isRunning ? (isOvertime ? 'OVERTIME' : 'RUNNING') : (t.status === 'STOPPED' ? 'STOPPED' : (t.pausedAt ? 'PAUSED' : (remaining <= 0 ? 'TIME_OUT' : 'IDLE'))),
      isRunning: t.isRunning,
      targetEndTime: t.targetEndTime,
      startedBy: t.startedBy || null,
      stoppedBy: t.stoppedBy || null,
      lastAction: t.lastAction || null,
      actionLogs: Array.isArray(t.actionLogs) ? t.actionLogs.slice(-50) : [],
      serverTime: Date.now()
    };
  }

  getSessionState(eventId) {
    let targetId = eventId || this.activeEventId;
    if (!this.events[targetId]) {
      targetId = this.activeEventId || Object.keys(this.events)[0];
    }
    const ev = this.events[targetId];
    if (ev && ev.sessionState) {
      return { ...this.sessionState, ...ev.sessionState };
    }
    return { ...this.sessionState };
  }

  updateSessionState(sessionPatch = {}, eventId = null) {
    if (!sessionPatch || typeof sessionPatch !== 'object') return this.getSessionState(eventId);
    let targetId = eventId || sessionPatch.eventId || this.activeEventId;
    if (!this.events[targetId]) {
      targetId = this.activeEventId || Object.keys(this.events)[0];
    }
    const nowIso = new Date().toISOString();

    const cleanPatch = { ...sessionPatch, updatedAt: nowIso };
    delete cleanPatch.eventId;

    this.sessionState = {
      ...this.sessionState,
      ...cleanPatch
    };

    const ev = this.events[targetId];
    if (ev) {
      ev.sessionState = {
        ...(ev.sessionState || this.sessionState),
        ...cleanPatch
      };
    }

    this.saveStorage(true);
    return this.getSessionState(targetId);
  }

  syncClientSessionData(payload = {}) {
    if (!payload || typeof payload !== 'object') return this.getState();
    let targetId = payload.eventId || this.activeEventId;
    if (!this.events[targetId]) {
      targetId = this.activeEventId || Object.keys(this.events)[0];
    }
    const ev = this.events[targetId];
    let changed = false;

    if (ev && Array.isArray(payload.chatHistory) && payload.chatHistory.length > 0) {
      const beforeLen = Array.isArray(ev.chats) ? ev.chats.length : 0;
      const mergedChats = this.mergeChatArrays(payload.chatHistory, ev.chats || [], ev.chatsClearedAt || null);
      if (mergedChats.length !== beforeLen) {
        ev.chats = mergedChats;
        changed = true;
      } else {
        ev.chats = mergedChats;
      }
    }

    if (payload.sessionState && typeof payload.sessionState === 'object') {
      const mergedSession = this.mergeSessionStates(payload.sessionState, ev ? ev.sessionState : this.sessionState);
      this.sessionState = mergedSession;
      if (ev) {
        ev.sessionState = mergedSession;
      }
      changed = true;
    }

    if (changed) {
      this.saveStorage(true);
    }
    return this.getState(targetId);
  }

  getState(eventIdOrSessionId) {
    let ev = null;
    if (eventIdOrSessionId) {
      ev = this.findEventByIdOrSession(eventIdOrSessionId);
    }
    if (!ev) {
      ev = this.getActiveEvent();
    }
    const targetId = ev ? ev.id : this.activeEventId;
    return {
      activeEvent: ev,
      timer: this.getTimerState(targetId),
      chatHistory: this.getChatHistory(targetId),
      overlayConfig: this.overlayConfig,
      sessionState: this.getSessionState(targetId)
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
    if (!t.actionLogs) t.actionLogs = [];
    if (options.mode) {
      t.mode = options.mode.toUpperCase() === 'COUNTUP' ? 'COUNTUP' : 'COUNTDOWN';
    } else if (!t.mode) {
      t.mode = 'COUNTDOWN';
    }

    if (options.allowOvertime !== undefined) {
      t.allowOvertime = !!options.allowOvertime;
    }

    const userName = options.userName || options.requesterName || 'Operator';
    const userEmail = options.userEmail || options.email || '';
    const nowIso = new Date().toISOString();

    if (t.mode === 'COUNTUP') {
      if (sec && !isNaN(sec)) {
        t.durationSeconds = parseInt(sec, 10);
      }
      const currentElapsed = t.pausedAt ? (t.elapsedSeconds || 0) : 0;
      t.elapsedSeconds = currentElapsed;
      t.startTime = Date.now() - (currentElapsed * 1000);
      t.targetEndTime = null;
      t.remainingSeconds = currentElapsed;
    } else {
      if (sec && !isNaN(sec)) {
        t.durationSeconds = parseInt(sec, 10);
        t.remainingSeconds = t.durationSeconds;
      } else if (t.remainingSeconds <= 0 && !t.pausedAt && t.status !== 'STOPPED') {
        t.remainingSeconds = t.durationSeconds;
      }
      t.targetEndTime = Date.now() + (t.remainingSeconds * 1000);
      t.startTime = null;
    }

    t.isRunning = true;
    t.pausedAt = null;
    t.status = 'RUNNING';

    t.startedBy = {
      name: userName,
      email: userEmail,
      time: nowIso
    };
    t.lastAction = {
      type: 'START',
      mode: t.mode,
      userName,
      userEmail,
      time: nowIso,
      sessionTitle: options.sessionTitle || null
    };
    t.actionLogs.push({
      id: 'log-' + Date.now(),
      action: 'START',
      mode: t.mode,
      userName,
      userEmail,
      timestamp: nowIso,
      sessionTitle: options.sessionTitle || null
    });
    if (t.actionLogs.length > 50) t.actionLogs = t.actionLogs.slice(-50);

    this.saveStorage();
    return this.getState(targetId);
  }

  pauseTimer(eventId, options = {}) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    if (!t.actionLogs) t.actionLogs = [];
    const userName = options.userName || options.requesterName || 'Operator';
    const userEmail = options.userEmail || options.email || '';
    const nowIso = new Date().toISOString();

    if (t.mode === 'COUNTUP') {
      if (t.isRunning && t.startTime) {
        t.elapsedSeconds = Math.max(0, Math.floor((Date.now() - t.startTime) / 1000));
        t.remainingSeconds = t.elapsedSeconds;
      }
      t.startTime = null;
    } else {
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
      t.targetEndTime = null;
    }

    t.isRunning = false;
    t.pausedAt = Date.now();
    t.status = 'PAUSED';

    t.lastAction = {
      type: 'PAUSE',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      time: nowIso
    };
    t.actionLogs.push({
      id: 'log-' + Date.now(),
      action: 'PAUSE',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      timestamp: nowIso
    });
    if (t.actionLogs.length > 50) t.actionLogs = t.actionLogs.slice(-50);

    this.saveStorage();
    return this.getState(targetId);
  }

  stopTimer(eventId, options = {}) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const t = ev.timer;
    if (!t.actionLogs) t.actionLogs = [];
    const userName = options.userName || options.requesterName || 'Operator';
    const userEmail = options.userEmail || options.email || '';
    const nowIso = new Date().toISOString();

    if (t.mode === 'COUNTUP') {
      if (t.isRunning && t.startTime) {
        t.elapsedSeconds = Math.max(0, Math.floor((Date.now() - t.startTime) / 1000));
        t.remainingSeconds = t.elapsedSeconds;
      }
      t.startTime = null;
    } else {
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
      t.targetEndTime = null;
    }

    // Freeze waktu saat di-stop
    t.isRunning = false;
    t.pausedAt = null;
    t.status = 'STOPPED';

    t.stoppedBy = {
      name: userName,
      email: userEmail,
      time: nowIso
    };
    t.lastAction = {
      type: 'STOP',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      time: nowIso
    };
    t.actionLogs.push({
      id: 'log-' + Date.now(),
      action: 'STOP',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      timestamp: nowIso
    });
    if (t.actionLogs.length > 50) t.actionLogs = t.actionLogs.slice(-50);

    this.saveStorage();
    return this.getState(targetId);
  }

  resetTimer(durationSeconds, eventId, options = {}) {
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
    if (!t.actionLogs) t.actionLogs = [];
    const userName = options.userName || options.requesterName || 'Operator';
    const userEmail = options.userEmail || options.email || '';
    const nowIso = new Date().toISOString();

    if (sec && !isNaN(sec)) {
      t.durationSeconds = parseInt(sec, 10);
    }
    t.isRunning = false;
    t.remainingSeconds = t.mode === 'COUNTUP' ? 0 : (t.durationSeconds || 300);
    t.elapsedSeconds = 0;
    t.targetEndTime = null;
    t.startTime = null;
    t.pausedAt = null;
    t.status = 'IDLE';

    t.lastAction = {
      type: 'RESET',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      time: nowIso,
      sessionTitle: options.sessionTitle || null
    };
    t.actionLogs.push({
      id: 'log-' + Date.now(),
      action: 'RESET',
      mode: t.mode || 'COUNTDOWN',
      userName,
      userEmail,
      timestamp: nowIso,
      sessionTitle: options.sessionTitle || null
    });
    if (t.actionLogs.length > 50) t.actionLogs = t.actionLogs.slice(-50);

    this.saveStorage();
    return this.getState(targetId);
  }

  setTimerMode(mode, eventId, options = {}) {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) throw new Error('Event tidak ditemukan.');

    const newMode = (mode || '').toUpperCase() === 'COUNTUP' ? 'COUNTUP' : 'COUNTDOWN';
    const t = ev.timer;
    t.mode = newMode;
    t.isRunning = false;
    t.targetEndTime = null;
    t.startTime = null;
    t.pausedAt = null;
    t.status = 'IDLE';
    if (newMode === 'COUNTUP') {
      t.elapsedSeconds = 0;
      t.remainingSeconds = 0;
    } else {
      t.remainingSeconds = t.durationSeconds || 300;
      t.elapsedSeconds = 0;
    }

    const userName = options.userName || options.requesterName || 'Operator';
    const userEmail = options.userEmail || options.email || '';
    const nowIso = new Date().toISOString();
    if (!t.actionLogs) t.actionLogs = [];
    t.lastAction = {
      type: 'SET_MODE',
      mode: newMode,
      userName,
      userEmail,
      time: nowIso
    };
    t.actionLogs.push({
      id: 'log-' + Date.now(),
      action: 'SET_MODE',
      mode: newMode,
      userName,
      userEmail,
      timestamp: nowIso
    });
    if (t.actionLogs.length > 50) t.actionLogs = t.actionLogs.slice(-50);

    this.saveStorage();
    return this.getState(targetId);
  }

  // === CHAT SYSTEM (Multi-Event History) ===
  getChatHistory(eventIdOrSessionId, limit = 100) {
    const ev = this.findEventByIdOrSession(eventIdOrSessionId) || this.getActiveEvent();
    if (!ev) return [];
    const chats = ev.chats || [];
    return chats.slice(-limit);
  }

  addChatMessage(eventIdOrPayload, payloadMaybe) {
    let target = this.activeEventId;
    let data = {};

    if (typeof eventIdOrPayload === 'string') {
      target = eventIdOrPayload;
      data = payloadMaybe || {};
    } else if (eventIdOrPayload && typeof eventIdOrPayload === 'object') {
      data = eventIdOrPayload;
      if (data.eventId || data.sessionId) target = data.eventId || data.sessionId;
    }

    const ev = this.findEventByIdOrSession(target) || this.getActiveEvent();
    if (!ev) throw new Error('Event atau sesi tidak ditemukan.');
    const targetId = ev.id;

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
    let clean = String(raw).split(' - Aktual (')[0].split(' • Actual:')[0].split(' - Aktual:')[0].trim();
    clean = clean.replace(/\s*\(\d+m\)$/i, '').trim();
    return clean.toLowerCase().replace(/\s+/g, ' ');
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
    ev.chatsClearedAt = new Date().toISOString();
    this.saveStorage(true);
    return true;
  }

  // === VMIX INTEGRATION OUTPUT GENERATOR ===
  // Mendukung text murni (format MM:SS atau sisa detik), JSON, atau XML untuk vMix Title / Data Source
  getVmixData(eventId, format = 'json') {
    const targetId = eventId || this.activeEventId;
    const ev = this.events[targetId];
    if (!ev) return null;

    const tState = this.getTimerState(targetId);
    let sec = tState.remainingSeconds;
    const isCountup = (tState.mode === 'COUNTUP');
    if (isCountup) {
      sec = tState.elapsedSeconds || tState.remainingSeconds || 0;
    }
    const isOvertime = !isCountup && (tState.isOvertime || sec < 0);
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
