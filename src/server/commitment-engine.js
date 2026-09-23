const fs = require('fs');
const path = require('path');
const firebaseService = require('./firebase-service');

const STORAGE_FILE = path.join(__dirname, '../../data/commitment-storage.json');

// Kunci jawaban resmi kata kunci komitmen
const VALID_KEYWORDS = {
  'commitment-1': 'Automatic Change Over',
  'commitment-2': 'Green Factory',
  'commitment-3': 'Online / Virtual Learning',
  'commitment-4': 'Lean Manufacturing',
  'commitment-5': 'Lead Time Efficiency',
  'commitment-6': 'Quality Digital Transformation'
};

const ALL_PERSONS = ['Andy Chendra', 'Fajar Fauzan', 'Yuswa Slamet', 'Verdiana'];

class CommitmentEngine {
  constructor() {
    this.commitments = {}; // e.g. { 'commitment-1': 'Automatic Change Over', ... }
    this.selectedPersons = []; // e.g. ['Andy Chendra', ...]
    this.celebrationTriggered = false;
    this.history = []; // Log riwayat komitmen & penandatangan
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
        console.log('[Commitment Engine] Loaded commitment state from local disk');
      } catch (err) {
        console.error('[Commitment Engine] Error parsing local storage:', err.message);
      }
    }

    // 2. Sinkronkan dengan Cloud Firestore jika tersedia
    if (firebaseService.isAvailable()) {
      this.reloadFromFirebase().then(success => {
        if (!success) {
          // Inisialisasi awal ke cloud jika belum ada
          this.saveStorage();
        }
      });
    }
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const cloudData = await firebaseService.loadDoc('getting_commitment');
      if (cloudData && typeof cloudData === 'object') {
        this.applyData(cloudData);
        this.saveLocalDisk();
        console.log('[Commitment Engine] Synchronized state from Cloud Firestore');
        return true;
      }
    } catch (err) {
      console.warn('[Commitment Engine] Firestore pull warning:', err.message);
    }
    return false;
  }

  applyData(data) {
    if (!data || typeof data !== 'object') return;
    this.commitments = data.commitments && typeof data.commitments === 'object' ? data.commitments : {};
    this.selectedPersons = Array.isArray(data.selectedPersons) ? data.selectedPersons : [];
    this.celebrationTriggered = !!data.celebrationTriggered;
    this.history = Array.isArray(data.history) ? data.history : [];
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  saveLocalDisk() {
    try {
      const data = this.getStorageData();
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Commitment Engine] Error saving local storage:', err.message);
    }
  }

  saveStorage() {
    this.updatedAt = new Date().toISOString();
    this.saveLocalDisk();

    if (firebaseService.isAvailable()) {
      const payload = this.getStorageData();
      firebaseService.saveDoc('getting_commitment', payload).catch(err => {
        console.warn('[Commitment Engine] Firestore async save error:', err.message);
      });
    }
  }

  getStorageData() {
    return {
      commitments: this.commitments,
      selectedPersons: this.selectedPersons,
      celebrationTriggered: this.celebrationTriggered,
      history: this.history,
      updatedAt: this.updatedAt
    };
  }

  getPublicState() {
    const isAllCommitmentsFilled = Object.keys(VALID_KEYWORDS).every(
      key => !!this.commitments[key] && this.commitments[key].trim().length > 0
    );
    const isAllPersonsSelected = ALL_PERSONS.every(p => this.selectedPersons.includes(p));

    return {
      commitments: this.commitments,
      selectedPersons: this.selectedPersons,
      isAllCommitmentsFilled,
      isAllPersonsSelected,
      celebrationTriggered: this.celebrationTriggered || (isAllCommitmentsFilled && isAllPersonsSelected),
      history: this.history.slice(0, 50),
      updatedAt: this.updatedAt
    };
  }

  /**
   * Validasi dan simpan kata kunci komitmen
   */
  submitKeyword(commitmentId, inputKeyword, submitter = 'PESERTA') {
    const expected = VALID_KEYWORDS[commitmentId];
    if (!expected) {
      throw new Error(`ID Komitmen '${commitmentId}' tidak dikenali`);
    }

    if (!inputKeyword || typeof inputKeyword !== 'string' || inputKeyword.trim().toLowerCase() !== expected.toLowerCase()) {
      throw new Error('Salah input : Kata kunci salah');
    }

    this.commitments[commitmentId] = expected;
    this.history.unshift({
      action: 'COMMITMENT_SUBMITTED',
      commitmentId,
      keyword: expected,
      submitter: submitter || 'PESERTA',
      timestamp: new Date().toISOString()
    });

    this.saveStorage();
    return {
      success: true,
      commitmentId,
      keyword: expected,
      state: this.getPublicState()
    };
  }

  /**
   * Catat pilihan figur / penandatangan komitmen
   */
  togglePerson(personName, submitter = 'LEADER') {
    if (!ALL_PERSONS.includes(personName)) {
      throw new Error(`Nama person '${personName}' tidak valid dalam daftar pimpinan`);
    }

    const isAllCommitmentsFilled = Object.keys(VALID_KEYWORDS).every(
      key => !!this.commitments[key] && this.commitments[key].trim().length > 0
    );

    if (!isAllCommitmentsFilled) {
      throw new Error('Seluruh 6 komitmen harus diselesaikan terlebih dahulu sebelum menandatangani komitmen');
    }

    if (!this.selectedPersons.includes(personName)) {
      this.selectedPersons.push(personName);
      this.history.unshift({
        action: 'PERSON_SIGNED',
        personName,
        submitter: submitter || 'LEADER',
        timestamp: new Date().toISOString()
      });
    }

    if (ALL_PERSONS.every(p => this.selectedPersons.includes(p))) {
      this.celebrationTriggered = true;
    }

    this.saveStorage();
    return {
      success: true,
      selectedPersons: this.selectedPersons,
      state: this.getPublicState()
    };
  }

  /**
   * Reset seluruh sesi komitmen (Dapat dipanggil dari Super Admin atau Reset Tool)
   */
  resetCommitment(resetBy = 'SUPER_ADMIN') {
    this.commitments = {};
    this.selectedPersons = [];
    this.celebrationTriggered = false;
    this.history.unshift({
      action: 'COMMITMENT_RESET',
      details: 'Semua komitmen dan tanda tangan pimpinan direset ke status awal',
      resetBy: resetBy || 'SUPER_ADMIN',
      timestamp: new Date().toISOString()
    });
    this.saveStorage();
    return {
      success: true,
      message: 'Getting Commitment berhasil di-reset ke kondisi awal',
      state: this.getPublicState()
    };
  }

  restoreData(data) {
    if (!data || typeof data !== 'object') return false;
    this.applyData(data);
    this.saveStorage();
    return true;
  }
}

module.exports = new CommitmentEngine();
