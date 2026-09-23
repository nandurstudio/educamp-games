const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/doorprize-storage.json');

class DoorprizeEngine {
  constructor() {
    this.events = [];
    this.prizes = [];
    this.participants = [];
    this.winners = [];
    this.activeEventId = null;
    this.activePrizeId = null;
    this.isRolling = false;
    this.pendingDraw = null;
    this.updatedAt = new Date().toISOString();

    this.ensureDataDir();
    this.loadStorage();
  }

  ensureDataDir() {
    const dataDir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  loadStorage() {
    // 1. Coba baca dari file lokal disk jika tersedia
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyData(data);
        console.log(`[Doorprize Engine] Loaded state from local disk (${this.participants.length} peserta, ${this.winners.length} pemenang)`);
      } catch (err) {
        console.error('[Doorprize Engine] Error parsing local storage:', err.message);
      }
    }

    // 2. Jika disk kosong, siapkan struktur baseline tanpa peserta dummy
    if (this.events.length === 0) {
      this.initDefaultStructureOnly();
    }

    // 3. Sinkronkan dengan Cloud Firestore
    this.reloadFromFirebase().catch(err => {
      console.warn('[Doorprize Engine] Cloud Firestore initial sync warning:', err.message);
    });
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) {
      return false;
    }
    try {
      const cloudData = await firebaseService.loadDoc('doorprize_storage');
      if (cloudData && typeof cloudData === 'object' && Array.isArray(cloudData.events)) {
        this.applyData(cloudData);
        this.saveLocalDisk();
        console.log(`[Doorprize Engine] Cloud Firestore sync complete: ${this.participants.length} peserta, ${this.prizes.length} hadiah, ${this.winners.length} pemenang`);
        return true;
      } else {
        // Inisialisasi struktur awal ke Firestore jika belum ada
        this.initDefaultStructureOnly();
        await firebaseService.saveDoc('doorprize_storage', this.exportData());
        this.saveLocalDisk();
        console.log('[Doorprize Engine] Inisialisasi struktur awal ke Cloud Firestore (0 peserta dummy)');
        return true;
      }
    } catch (err) {
      console.error('[Doorprize Engine] Error loading from Cloud Firestore:', err.message);
      return false;
    }
  }

  initDefaultStructureOnly() {
    const defaultEventId = 'ev-educamp-2026';
    this.events = [
      {
        id: defaultEventId,
        name: 'EDUCAMP & GATHERING 2026',
        date: new Date().toISOString().split('T')[0],
        active: true,
        createdAt: new Date().toISOString()
      }
    ];
    this.activeEventId = defaultEventId;

    this.prizes = [
      {
        id: 'pz-tv-55',
        eventId: defaultEventId,
        name: 'Smart TV 55 Inch 4K UHD',
        photo: '/images/doorprize/grandprize/TV.png',
        category: 'GRAND PRIZE',
        totalWinners: 1,
        orderIndex: 1,
        active: true
      },
      {
        id: 'pz-sepeda',
        eventId: defaultEventId,
        name: 'Sepeda Lipat Premium',
        photo: '/images/doorprize/grandprize/Sepeda Lipat.webp',
        category: 'GRAND PRIZE',
        totalWinners: 1,
        orderIndex: 2,
        active: true
      },
      {
        id: 'pz-blender',
        eventId: defaultEventId,
        name: 'Blender Chopper Portable',
        photo: '/images/doorprize/batch3/blender_chopper.webp',
        category: 'DOORPRIZE',
        totalWinners: 3,
        orderIndex: 3,
        active: true
      },
      {
        id: 'pz-kompor',
        eventId: defaultEventId,
        name: 'Kompor Gas Portable Camping',
        photo: '/images/doorprize/batch2/kompor_portable.webp',
        category: 'DOORPRIZE',
        totalWinners: 5,
        orderIndex: 4,
        active: true
      },
      {
        id: 'pz-termos',
        eventId: defaultEventId,
        name: 'Termos Stainless Steel Vacuum',
        photo: '/images/doorprize/batch1/termos.webp',
        category: 'DOORPRIZE',
        totalWinners: 10,
        orderIndex: 5,
        active: true
      }
    ];
    this.activePrizeId = this.prizes[0].id;
    this.participants = []; // Bersih dari peserta dummy hardcoded
    this.winners = [];
  }

  // Backup method jika ingin inisialisasi default data
  initDefaultData() {
    this.initDefaultStructureOnly();
  }

  applyData(data) {
    if (data.events && Array.isArray(data.events)) this.events = data.events;
    if (data.prizes && Array.isArray(data.prizes)) this.prizes = data.prizes;
    if (data.participants && Array.isArray(data.participants)) this.participants = data.participants;
    if (data.winners && Array.isArray(data.winners)) this.winners = data.winners;
    if (data.activeEventId) this.activeEventId = data.activeEventId;
    if (data.activePrizeId) this.activePrizeId = data.activePrizeId;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }

  exportData() {
    return {
      events: this.events,
      prizes: this.prizes,
      participants: this.participants,
      winners: this.winners,
      activeEventId: this.activeEventId,
      activePrizeId: this.activePrizeId,
      updatedAt: this.updatedAt
    };
  }

  saveLocalDisk() {
    try {
      this.ensureDataDir();
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(this.exportData(), null, 2), 'utf-8');
    } catch (err) {
      console.error('[Doorprize Engine] Error saving local storage:', err.message);
    }
  }

  saveStorage() {
    this.updatedAt = new Date().toISOString();
    this.saveLocalDisk();

    // Sinkronisasi background ke Cloud Firestore
    if (firebaseService.isAvailable()) {
      firebaseService.saveDoc('doorprize_storage', this.exportData()).then(success => {
        if (success) {
          console.log('[Doorprize Engine] Successfully synced state to Cloud Firestore');
        }
      }).catch(err => {
        console.warn('[Doorprize Engine] Error updating Cloud Firestore:', err.message);
      });
    }
  }

  // --- GETTERS & METRICS ---

  getState() {
    const activeEvent = this.events.find(e => e.id === this.activeEventId) || this.events[0] || null;
    const activePrize = this.prizes.find(p => p.id === this.activePrizeId) || this.prizes[0] || null;
    const eventPrizes = this.prizes.filter(p => p.eventId === this.activeEventId);
    const eventParticipants = this.participants.filter(p => p.eventId === this.activeEventId);
    const activeWinners = this.winners.filter(w => w.eventId === this.activeEventId && w.active !== false);

    // Kumpulan NIK pemenang aktif
    const winnerNiks = new Set(activeWinners.map(w => w.nik));
    const availableParticipants = eventParticipants.filter(p => p.active && !winnerNiks.has(p.nik));

    return {
      activeEvent,
      activePrize,
      events: this.events,
      prizes: eventPrizes,
      totalParticipants: eventParticipants.length,
      availableParticipantsCount: availableParticipants.length,
      grandPrizeParticipantsCount: eventParticipants.filter(p => p.isGrandPrize && p.active).length,
      totalWinnersCount: activeWinners.length,
      winners: activeWinners,
      isRolling: this.isRolling,
      pendingDraw: this.pendingDraw,
      updatedAt: this.updatedAt
    };
  }

  getParticipants(filter = 'ALL', search = '') {
    let list = this.participants.filter(p => p.eventId === this.activeEventId);

    if (filter === 'GP') {
      list = list.filter(p => p.isGrandPrize);
    } else if (filter === 'NON_GP') {
      list = list.filter(p => !p.isGrandPrize);
    }

    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.nik.toLowerCase().includes(q) || (p.department && p.department.toLowerCase().includes(q)));
    }

    // Beri flag apakah sudah jadi pemenang
    const winnerMap = {};
    this.winners.filter(w => w.eventId === this.activeEventId && w.active !== false).forEach(w => {
      winnerMap[w.nik] = w.prizeName;
    });

    return list.map(p => ({
      ...p,
      wonPrize: winnerMap[p.nik] || null
    }));
  }

  // --- EVENT & PRIZE MANAGEMENT ---

  setActiveEvent(eventId) {
    const found = this.events.find(e => e.id === eventId);
    if (found) {
      this.activeEventId = eventId;
      const prize = this.prizes.find(p => p.eventId === eventId);
      this.activePrizeId = prize ? prize.id : null;
      this.saveStorage();
      return true;
    }
    return false;
  }

  saveEvent(eventData) {
    if (eventData.id) {
      const idx = this.events.findIndex(e => e.id === eventData.id);
      if (idx !== -1) {
        this.events[idx] = { ...this.events[idx], ...eventData, updatedAt: new Date().toISOString() };
      }
    } else {
      const newEvent = {
        id: 'ev-' + Date.now(),
        name: eventData.name,
        date: eventData.date || new Date().toISOString().split('T')[0],
        active: true,
        createdAt: new Date().toISOString()
      };
      this.events.push(newEvent);
      this.activeEventId = newEvent.id;
    }
    this.saveStorage();
    return this.getState();
  }

  setActivePrize(prizeId) {
    const found = this.prizes.find(p => p.id === prizeId);
    if (found) {
      this.activePrizeId = prizeId;
      this.saveStorage();
      return true;
    }
    return false;
  }

  savePrize(prizeData) {
    if (prizeData.id) {
      const idx = this.prizes.findIndex(p => p.id === prizeData.id);
      if (idx !== -1) {
        this.prizes[idx] = { 
          ...this.prizes[idx],
          name: prizeData.name || this.prizes[idx].name,
          category: prizeData.category || this.prizes[idx].category,
          totalWinners: parseInt(prizeData.totalWinners) || this.prizes[idx].totalWinners || 1,
          photo: prizeData.photo !== undefined && prizeData.photo !== null && prizeData.photo !== '' 
            ? prizeData.photo 
            : this.prizes[idx].photo
        };

        // Sinkronkan nama dan kategori hadiah di data pemenang jika sudah ada yang menang
        if (Array.isArray(this.winners)) {
          this.winners.forEach(w => {
            if (w.prizeId === prizeData.id) {
              w.prizeName = this.prizes[idx].name;
              w.prizeCategory = this.prizes[idx].category;
            }
          });
        }
      }
    } else {
      const newPrize = {
        id: 'pz-' + Date.now(),
        eventId: prizeData.eventId || this.activeEventId,
        name: prizeData.name,
        photo: prizeData.photo || '/images/doorprize/grandprize/TV.png',
        category: prizeData.category || 'DOORPRIZE',
        totalWinners: parseInt(prizeData.totalWinners) || 1,
        orderIndex: this.prizes.length + 1,
        active: true
      };
      this.prizes.push(newPrize);
      if (!this.activePrizeId) this.activePrizeId = newPrize.id;
    }
    this.saveStorage();
    return this.getState();
  }

  deletePrize(prizeId) {
    this.prizes = this.prizes.filter(p => p.id !== prizeId);
    if (this.activePrizeId === prizeId) {
      const remaining = this.prizes.filter(p => p.eventId === this.activeEventId);
      this.activePrizeId = remaining.length > 0 ? remaining[0].id : null;
    }
    this.saveStorage();
    return this.getState();
  }

  // --- PARTICIPANT MANAGEMENT (CRUD LENGKAP & RELIABLE) ---

  getParticipantById(participantId) {
    return this.participants.find(p => p.id === participantId) || null;
  }

  saveParticipant(data) {
    if (!data.name || !data.nik) {
      throw new Error('NIK dan Nama Lengkap wajib diisi');
    }
    const nik = data.nik.toString().trim();
    const name = data.name.toString().trim();
    const department = (data.department || 'Umum').toString().trim();
    const isGrandPrize = data.isGrandPrize !== undefined ? !!data.isGrandPrize : true;
    const active = data.active !== undefined ? !!data.active : true;

    if (data.id) {
      const idx = this.participants.findIndex(p => p.id === data.id);
      if (idx === -1) throw new Error('Peserta tidak ditemukan');
      const oldNik = this.participants[idx].nik;
      this.participants[idx] = {
        ...this.participants[idx],
        nik,
        name,
        department,
        isGrandPrize,
        active,
        updatedAt: new Date().toISOString()
      };

      // Sinkronkan data pemenang jika peserta ini sudah pernah menang
      if (Array.isArray(this.winners)) {
        this.winners.forEach(w => {
          if (w.participantId === data.id || w.nik === oldNik) {
            w.nik = nik;
            w.name = name;
            w.department = department;
          }
        });
      }

      this.saveStorage();
      return { participant: this.participants[idx], state: this.getState() };
    } else {
      // Cek apakah NIK sudah terdaftar di event ini
      const targetEventId = data.eventId || this.activeEventId;
      const existing = this.participants.find(p => p.nik.toString() === nik && p.eventId === targetEventId);
      if (existing) {
        throw new Error(`Peserta dengan NIK ${nik} sudah terdaftar atas nama: ${existing.name}`);
      }
      const newParticipant = {
        id: 'p-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        eventId: targetEventId,
        nik,
        name,
        department,
        isGrandPrize,
        active,
        createdAt: new Date().toISOString()
      };
      this.participants.push(newParticipant);
      this.saveStorage();
      return { participant: newParticipant, state: this.getState() };
    }
  }

  deleteParticipant(participantId) {
    const idx = this.participants.findIndex(p => p.id === participantId);
    if (idx === -1) throw new Error('Peserta tidak ditemukan');
    const removed = this.participants.splice(idx, 1)[0];

    // Hapus juga dari pendingDraw jika ada
    if (this.pendingDraw && Array.isArray(this.pendingDraw.candidates)) {
      this.pendingDraw.candidates = this.pendingDraw.candidates.filter(c => c.participantId !== participantId && c.nik !== removed.nik);
      if (this.pendingDraw.candidates.length === 0) {
        this.pendingDraw = null;
      }
    }

    this.saveStorage();
    return { success: true, removed, state: this.getState() };
  }

  toggleParticipantActive(participantId) {
    const p = this.participants.find(x => x.id === participantId);
    if (!p) throw new Error('Peserta tidak ditemukan');
    p.active = !p.active;
    this.saveStorage();
    return { participant: p, state: this.getState() };
  }

  clearParticipants(eventId = null) {
    const targetEventId = eventId || this.activeEventId;
    this.participants = this.participants.filter(p => p.eventId !== targetEventId);
    if (this.pendingDraw && this.pendingDraw.eventId === targetEventId) {
      this.pendingDraw = null;
    }
    this.saveStorage();
    return this.getState();
  }

  toggleGrandPrize(participantId) {
    const p = this.participants.find(x => x.id === participantId);
    if (p) {
      p.isGrandPrize = !p.isGrandPrize;
      this.saveStorage();
      return true;
    }
    return false;
  }

  importParticipants(items, eventId = null) {
    const targetEventId = eventId || this.activeEventId;
    let added = 0;
    let updated = 0;

    items.forEach(item => {
      if (!item.nik || !item.name) return;
      const existing = this.participants.find(p => p.nik.toString() === item.nik.toString() && p.eventId === targetEventId);
      if (existing) {
        existing.name = item.name;
        existing.department = item.department || existing.department;
        if (item.isGrandPrize !== undefined) existing.isGrandPrize = !!item.isGrandPrize;
        updated++;
      } else {
        this.participants.push({
          id: 'p-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          eventId: targetEventId,
          nik: item.nik.toString(),
          name: item.name,
          department: item.department || 'Umum',
          isGrandPrize: item.isGrandPrize !== undefined ? !!item.isGrandPrize : true,
          active: true
        });
        added++;
      }
    });

    this.saveStorage();
    return { added, updated, total: this.participants.filter(p => p.eventId === targetEventId).length };
  }

  // --- LOTTERY / DRAWING LOGIC (KUOTA KETAT & KOCOK ULANG INDIVIDU) ---

  getEligiblePool(prizeId, replacingWinnerId = null) {
    const prize = this.prizes.find(p => p.id === prizeId) || this.prizes.find(p => p.id === this.activePrizeId);
    if (!prize) return [];

    let activeWinners = this.winners.filter(w => w.eventId === this.activeEventId && w.active !== false);
    if (replacingWinnerId) {
      // Jika sedang mengganti pemenang tertentu, pemenang tersebut dikecualikan dari activeWinners
      activeWinners = activeWinners.filter(w => w.id !== replacingWinnerId);
    }
    const winnerNiks = new Set(activeWinners.map(w => w.nik));

    let pool = this.participants.filter(p => p.eventId === this.activeEventId && p.active && !winnerNiks.has(p.nik));

    // Jika kategori GRAND PRIZE, wajib memenuhi syarat isGrandPrize === true
    if (prize.category === 'GRAND PRIZE') {
      const gpPool = pool.filter(p => p.isGrandPrize);
      if (gpPool.length > 0) {
        pool = gpPool;
      }
    }

    return pool;
  }

  // 1. Draw candidate pemenang (TIDAK LANGSUNG DISIMPAN, menunggu konfirmasi Game Master)
  drawCandidates(prizeId, count = 1, replaceWinnerId = null) {
    const prize = this.prizes.find(p => p.id === prizeId) || this.prizes.find(p => p.id === this.activePrizeId);
    if (!prize) throw new Error('Hadiah tidak ditemukan');

    const pool = this.getEligiblePool(prize.id, replaceWinnerId);
    if (pool.length === 0) {
      throw new Error('Tidak ada peserta yang memenuhi syarat untuk diundi (semua sudah menang atau tidak ada peserta eligible)');
    }

    // Cek pemenang aktif saat ini untuk hadiah ini
    const existingPrizeWinners = this.winners.filter(w => w.prizeId === prize.id && w.eventId === this.activeEventId && w.active !== false);

    // Deteksi apakah ini merupakan mode REPLACEMENT (kocok ulang individu)
    const isReplacement = !!replaceWinnerId;
    let targetReplaceWinnerId = replaceWinnerId;

    let targetCount = 1;
    let drawCount = 1;

    if (isReplacement) {
      // Mode kocok ulang individu: HANYA 1 orang yang diundi menggantikan pemenang target
      targetCount = 1;
      drawCount = 1;
      if (!targetReplaceWinnerId && existingPrizeWinners.length > 0) {
        targetReplaceWinnerId = existingPrizeWinners[existingPrizeWinners.length - 1].id;
      }
    } else {
      // Mode kocokan normal: Hitung sisa kuota yang belum terisi
      const remainingQuota = prize.totalWinners - existingPrizeWinners.length;
      if (remainingQuota <= 0) {
        throw new Error(`Kuota hadiah '${prize.name}' sudah terpenuhi penuh (${existingPrizeWinners.length}/${prize.totalWinners} pemenang). Gunakan tombol [Kocok Ulang (Replace)] pada nama pemenang tertentu jika ingin mengganti.`);
      }
      const requestedCount = Math.max(1, parseInt(count) || 1);
      targetCount = Math.min(requestedCount, remainingQuota);
      // Jangan pernah menarik melebihi sisa kuota yang tersedia atau sisa pool
      drawCount = Math.min(targetCount, pool.length);
    }

    const requestedCount = isReplacement ? 1 : Math.max(1, parseInt(count) || 1);
    const insufficientPool = pool.length < targetCount;
    const shortage = insufficientPool ? (targetCount - pool.length) : 0;

    // Fisher-Yates shuffle untuk pengacakan merata
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, drawCount);
    const candidateWinners = selected.map((p, idx) => ({
      id: 'win-' + Date.now() + '-' + idx + '-' + Math.random().toString(36).substr(2, 5),
      eventId: this.activeEventId,
      prizeId: prize.id,
      prizeName: prize.name,
      prizeCategory: prize.category,
      prizePhoto: prize.photo,
      participantId: p.id,
      nik: p.nik,
      name: p.name,
      department: p.department,
      orderNumber: idx + 1,
      timestamp: new Date().toISOString(),
      active: true
    }));

    // Simpan ke state pendingDraw (JANGAN masukkan ke this.winners dulu!)
    this.pendingDraw = {
      prizeId: prize.id,
      prize,
      candidates: candidateWinners,
      isReplacement,
      replaceWinnerId: targetReplaceWinnerId,
      targetReplaceWinner: existingPrizeWinners.find(w => w.id === targetReplaceWinnerId) || null,
      requestedCount,
      drawCount,
      insufficientPool,
      shortage,
      drawnAt: new Date().toISOString()
    };

    return {
      prize,
      candidates: candidateWinners,
      isReplacement,
      replaceWinnerId: targetReplaceWinnerId,
      targetReplaceWinner: this.pendingDraw.targetReplaceWinner,
      requestedCount,
      drawCount,
      insufficientPool,
      shortage,
      remainingCount: pool.length - drawCount
    };
  }

  // 2. Konfirmasi simpan pemenang (menangani opsi Simpan atau Replace kuota)
  confirmPendingDraw(chosenReplaceWinnerId = null) {
    if (!this.pendingDraw || !this.pendingDraw.candidates || this.pendingDraw.candidates.length === 0) {
      throw new Error('Tidak ada calon pemenang yang menunggu konfirmasi');
    }

    const { prizeId, prize, isReplacement } = this.pendingDraw;
    let candidates = [...this.pendingDraw.candidates];
    const targetReplaceId = chosenReplaceWinnerId || this.pendingDraw.replaceWinnerId;

    // Ambil pemenang aktif hadiah ini
    const existingPrizeWinners = this.winners.filter(w => w.prizeId === prizeId && w.eventId === this.activeEventId && w.active !== false);

    // Penanganan Mode Replace vs Penambahan Kuota Baru
    if (isReplacement || targetReplaceId) {
      if (targetReplaceId === 'ALL') {
        // Hapus seluruh pemenang lama untuk hadiah ini
        this.winners = this.winners.filter(w => !(w.prizeId === prizeId && w.eventId === this.activeEventId));
      } else if (targetReplaceId) {
        // Hapus pemenang yang digantikan secara spesifik
        this.winners = this.winners.filter(w => w.id !== targetReplaceId);
      }
    } else {
      // Mode penambahan normal: Cegah melebihi totalWinners
      const availableSlots = Math.max(0, prize.totalWinners - existingPrizeWinners.length);
      if (availableSlots <= 0) {
        throw new Error(`Gagal menyimpan: Kuota pemenang untuk hadiah '${prize.name}' sudah penuh (${existingPrizeWinners.length}/${prize.totalWinners}).`);
      }
      if (candidates.length > availableSlots) {
        candidates = candidates.slice(0, availableSlots);
      }
    }

    // Masukkan kandidat baru ke dalam daftar pemenang resmi
    this.winners.push(...candidates);

    const savedWinners = [...candidates];
    this.pendingDraw = null;
    this.saveStorage();

    return {
      success: true,
      winners: savedWinners,
      state: this.getState()
    };
  }

  // 3. Batalkan hasil undian (tidak disimpan / kocok ulang)
  cancelPendingDraw() {
    this.pendingDraw = null;
    return {
      success: true,
      state: this.getState()
    };
  }

  // Metode drawWinners lama dipertahankan untuk kompatibilitas
  drawWinners(prizeId, count = 1) {
    const drawRes = this.drawCandidates(prizeId, count);
    const confirmRes = this.confirmPendingDraw();
    return {
      prize: drawRes.prize,
      winners: confirmRes.winners,
      remainingCount: drawRes.remainingCount
    };
  }

  resetPrizeWinners(prizeId) {
    this.winners = this.winners.filter(w => !(w.prizeId === prizeId && w.eventId === this.activeEventId));
    this.saveStorage();
    return this.getState();
  }

  resetAllWinners(eventId = null) {
    const targetEventId = eventId || this.activeEventId;
    this.winners = this.winners.filter(w => w.eventId !== targetEventId);
    this.saveStorage();
    return this.getState();
  }

  exportWinners() {
    const activeWinners = this.winners.filter(w => w.eventId === this.activeEventId && w.active !== false);
    return activeWinners.map((w, index) => ({
      No: index + 1,
      NIK: w.nik,
      Nama: w.name,
      Departemen: w.department,
      Hadiah: w.prizeName,
      Kategori: w.prizeCategory,
      WaktuMenang: new Date(w.timestamp).toLocaleString('id-ID')
    }));
  }
}

module.exports = new DoorprizeEngine();
