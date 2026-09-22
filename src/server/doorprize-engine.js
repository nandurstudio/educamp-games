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
    // 1. Coba baca dari file lokal disk
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        this.applyData(data);
        console.log('[Doorprize Engine] Loaded doorprize state from local disk');
      } catch (err) {
        console.error('[Doorprize Engine] Error parsing local storage:', err.message);
      }
    }

    // 2. Jika belum ada data, inisialisasi data default Educamp 2026
    if (this.events.length === 0) {
      this.initDefaultData();
    }

    // 3. Sinkronisasi dengan Cloud Firestore jika tersedia
    if (firebaseService.isAvailable()) {
      firebaseService.loadDoc('doorprize_storage').then(cloudData => {
        if (cloudData && typeof cloudData === 'object' && cloudData.events) {
          this.applyData(cloudData);
          this.saveLocalDisk();
          console.log('[Doorprize Engine] Synchronized state from Cloud Firestore');
        } else {
          // Upload state awal ke Firestore
          this.saveStorage();
        }
      }).catch(err => {
        console.warn('[Doorprize Engine] Cloud Firestore sync skipped:', err.message);
      });
    }
  }

  initDefaultData() {
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

    // Default 51 peserta aktif
    this.participants = [
      { id: 'p-1', eventId: defaultEventId, nik: 'K123456', name: 'Nandang Duryat', department: 'PLANT GENERAL & DIGITALIZATION', isGrandPrize: true, active: true },
      { id: 'p-2', eventId: defaultEventId, nik: '987654321098', name: 'Jane Smith', department: 'Analytical Center', isGrandPrize: true, active: true },
      { id: 'p-3', eventId: defaultEventId, nik: '112233445566', name: 'Alice Johnson', department: 'Quality Assurance', isGrandPrize: true, active: true },
      { id: 'p-4', eventId: defaultEventId, nik: '223344556677', name: 'Bob Brown', department: 'CMD', isGrandPrize: true, active: true },
      { id: 'p-5', eventId: defaultEventId, nik: '334455667788', name: 'Charlie White', department: 'Corporate QA', isGrandPrize: true, active: true },
      { id: 'p-6', eventId: defaultEventId, nik: '123456789004', name: 'User Empat', department: 'CMD', isGrandPrize: false, active: true },
      { id: 'p-7', eventId: defaultEventId, nik: '123456789005', name: 'User Lima', department: 'Corporate QA', isGrandPrize: false, active: true },
      { id: 'p-8', eventId: defaultEventId, nik: '123456789006', name: 'User Enam', department: 'Costing', isGrandPrize: false, active: true },
      { id: 'p-9', eventId: defaultEventId, nik: '123456789007', name: 'User Tujuh', department: 'EM', isGrandPrize: false, active: true },
      { id: 'p-10', eventId: defaultEventId, nik: '123456789008', name: 'User Delapan', department: 'FG', isGrandPrize: false, active: true },
      { id: 'p-11', eventId: defaultEventId, nik: '123456789009', name: 'User Sembilan', department: 'GVN', isGrandPrize: false, active: true },
      { id: 'p-12', eventId: defaultEventId, nik: '123456789010', name: 'User Sepuluh', department: 'HRGAIR', isGrandPrize: false, active: true },
      { id: 'p-13', eventId: defaultEventId, nik: '123456789011', name: 'User Sebelas', department: 'IDC', isGrandPrize: false, active: true },
      { id: 'p-14', eventId: defaultEventId, nik: '123456789012', name: 'User Dua Belas', department: 'IT', isGrandPrize: true, active: true },
      { id: 'p-15', eventId: defaultEventId, nik: '123456789013', name: 'User Tiga Belas', department: 'MS', isGrandPrize: false, active: true },
      { id: 'p-16', eventId: defaultEventId, nik: '123456789014', name: 'User Empat Belas', department: 'Management', isGrandPrize: true, active: true },
      { id: 'p-17', eventId: defaultEventId, nik: '123456789015', name: 'User Lima Belas', department: 'Nawakara', isGrandPrize: false, active: true },
      { id: 'p-18', eventId: defaultEventId, nik: '123456789016', name: 'User Enam Belas', department: 'PLANT GENERAL', isGrandPrize: false, active: true },
      { id: 'p-19', eventId: defaultEventId, nik: '123456789017', name: 'User Tujuh Belas', department: 'PPC Plant', isGrandPrize: false, active: true },
      { id: 'p-20', eventId: defaultEventId, nik: '123456789018', name: 'User Delapan Belas', department: 'PPIC', isGrandPrize: false, active: true },
      { id: 'p-21', eventId: defaultEventId, nik: '123456789019', name: 'User Sembilan Belas', department: 'Procurement', isGrandPrize: false, active: true },
      { id: 'p-22', eventId: defaultEventId, nik: '123456789020', name: 'User Dua Puluh', department: 'Production', isGrandPrize: false, active: true },
      { id: 'p-23', eventId: defaultEventId, nik: '123456789021', name: 'User Dua Satu', department: 'QA Plant', isGrandPrize: false, active: true },
      { id: 'p-24', eventId: defaultEventId, nik: '123456789022', name: 'User Dua Dua', department: 'QFS-SHE', isGrandPrize: false, active: true },
      { id: 'p-25', eventId: defaultEventId, nik: '123456789023', name: 'User Dua Tiga', department: 'RMPM', isGrandPrize: false, active: true },
      { id: 'p-26', eventId: defaultEventId, nik: '123456789024', name: 'User Dua Empat', department: 'SCM', isGrandPrize: false, active: true },
      { id: 'p-27', eventId: defaultEventId, nik: '123456789025', name: 'User Dua Lima', department: 'Swapro', isGrandPrize: false, active: true },
      { id: 'p-28', eventId: defaultEventId, nik: '123456789026', name: 'User Dua Enam', department: 'TPP', isGrandPrize: false, active: true },
      { id: 'p-29', eventId: defaultEventId, nik: '123456789027', name: 'User Dua Tujuh', department: 'Yogyakarta', isGrandPrize: false, active: true },
      { id: 'p-30', eventId: defaultEventId, nik: '123456789028', name: 'User Dua Delapan', department: 'Bali', isGrandPrize: false, active: true },
      { id: 'p-31', eventId: defaultEventId, nik: '123456789029', name: 'User Dua Sembilan', department: 'Bandung', isGrandPrize: false, active: true },
      { id: 'p-32', eventId: defaultEventId, nik: '123456789030', name: 'User Tiga Puluh', department: 'Jakarta', isGrandPrize: false, active: true },
      { id: 'p-33', eventId: defaultEventId, nik: '123456789031', name: 'User Tiga Satu', department: 'Medan', isGrandPrize: false, active: true },
      { id: 'p-34', eventId: defaultEventId, nik: '123456789032', name: 'User Tiga Dua', department: 'Batam', isGrandPrize: false, active: true },
      { id: 'p-35', eventId: defaultEventId, nik: '123456789033', name: 'User Tiga Tiga', department: 'Makassar', isGrandPrize: false, active: true },
      { id: 'p-36', eventId: defaultEventId, nik: '123456789034', name: 'User Tiga Empat', department: 'Solo', isGrandPrize: false, active: true },
      { id: 'p-37', eventId: defaultEventId, nik: '123456789035', name: 'User Tiga Lima', department: 'Bogor', isGrandPrize: false, active: true },
      { id: 'p-38', eventId: defaultEventId, nik: '123456789036', name: 'User Tiga Enam', department: 'Denpasar', isGrandPrize: false, active: true },
      { id: 'p-39', eventId: defaultEventId, nik: '123456789037', name: 'User Tiga Tujuh', department: 'Banjarmasin', isGrandPrize: false, active: true },
      { id: 'p-40', eventId: defaultEventId, nik: '123456789038', name: 'User Tiga Delapan', department: 'Yogyakarta', isGrandPrize: false, active: true },
      { id: 'p-41', eventId: defaultEventId, nik: '123456789039', name: 'User Tiga Sembilan', department: 'Medan', isGrandPrize: false, active: true },
      { id: 'p-42', eventId: defaultEventId, nik: '123456789040', name: 'User Empat Puluh', department: 'Tangerang', isGrandPrize: false, active: true },
      { id: 'p-43', eventId: defaultEventId, nik: '123456789041', name: 'User Empat Satu', department: 'Solo', isGrandPrize: false, active: true },
      { id: 'p-44', eventId: defaultEventId, nik: '123456789042', name: 'User Empat Dua', department: 'Palembang', isGrandPrize: false, active: true },
      { id: 'p-45', eventId: defaultEventId, nik: '123456789043', name: 'User Empat Tiga', department: 'Batam', isGrandPrize: false, active: true },
      { id: 'p-46', eventId: defaultEventId, nik: '123456789044', name: 'User Empat Empat', department: 'Surabaya', isGrandPrize: false, active: true },
      { id: 'p-47', eventId: defaultEventId, nik: '123456789045', name: 'User Empat Lima', department: 'Jakarta', isGrandPrize: false, active: true }
    ];

    this.winners = [];
    this.saveStorage();
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
        this.prizes[idx] = { ...this.prizes[idx], ...prizeData };
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

  // --- PARTICIPANT MANAGEMENT ---

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

  // --- LOTTERY / DRAWING LOGIC ---

  getEligiblePool(prizeId) {
    const prize = this.prizes.find(p => p.id === prizeId) || this.prizes.find(p => p.id === this.activePrizeId);
    if (!prize) return [];

    const activeWinners = this.winners.filter(w => w.eventId === this.activeEventId && w.active !== false);
    const winnerNiks = new Set(activeWinners.map(w => w.nik));

    let pool = this.participants.filter(p => p.eventId === this.activeEventId && p.active && !winnerNiks.has(p.nik));

    // Jika kategori GRAND PRIZE, wajib memenuhi syarat isGrandPrize === true
    if (prize.category === 'GRAND PRIZE') {
      const gpPool = pool.filter(p => p.isGrandPrize);
      // Jika pool GP ada isinya, gunakan itu
      if (gpPool.length > 0) {
        pool = gpPool;
      }
    }

    return pool;
  }

  drawWinners(prizeId, count = 1) {
    const prize = this.prizes.find(p => p.id === prizeId) || this.prizes.find(p => p.id === this.activePrizeId);
    if (!prize) throw new Error('Hadiah tidak ditemukan');

    const pool = this.getEligiblePool(prize.id);
    if (pool.length === 0) {
      throw new Error('Tidak ada peserta yang memenuhi syarat untuk diundi');
    }

    const drawCount = Math.min(count, pool.length);
    // Fisher-Yates shuffle untuk pengacakan merata
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, drawCount);
    const newWinners = selected.map(p => ({
      id: 'win-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      eventId: this.activeEventId,
      prizeId: prize.id,
      prizeName: prize.name,
      prizeCategory: prize.category,
      prizePhoto: prize.photo,
      participantId: p.id,
      nik: p.nik,
      name: p.name,
      department: p.department,
      timestamp: new Date().toISOString(),
      active: true
    }));

    this.winners.push(...newWinners);
    this.saveStorage();

    return {
      prize,
      winners: newWinners,
      remainingCount: pool.length - drawCount
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
