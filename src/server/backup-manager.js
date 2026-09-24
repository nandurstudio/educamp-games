const fs = require('fs');
const path = require('path');
const gameEngine = require('./game-engine');
const tugEngine = require('./tug-engine');
const superAdminEngine = require('./super-admin-engine');
const questionBank = require('./question-bank');
const commitmentEngine = require('./commitment-engine');
const doorprizeEngine = require('./doorprize-engine');
const firebaseService = require('./firebase-service');

class BackupManager {
  /**
   * Menghasilkan object backup terpadu seluruh data game
   */
  createBackup() {
    const now = new Date();
    const superAdminData = superAdminEngine.getStorageData();
    const panjatPinangData = gameEngine.getStorageData();
    const tarikTambangData = tugEngine.getStorageData();
    const questionsData = questionBank.getStorageData();
    const commitmentData = commitmentEngine.getStorageData();
    const doorprizeData = doorprizeEngine.exportData();

    const masterTeamsCount = Object.keys(superAdminData.masterTeams || {}).length;
    const customGamesCount = (superAdminData.customGames || []).length;
    const pinangHistoryCount = (panjatPinangData.history || []).length;
    const tugHistoryCount = (tarikTambangData.history || []).length;
    const totalQuestions = (questionsData.questions || []).length;
    const totalCommitments = Object.keys(commitmentData.commitments || {}).length;
    const doorprizeParticipantsCount = (doorprizeData.participants || []).length;

    return {
      format: 'EDUCAMP_GAME_BACKUP',
      version: '1.2.0',
      exportedAt: now.toISOString(),
      exportedAtFormatted: now.toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'Asia/Jakarta'
      }) + ' WIB',
      app: 'Educamp 2026 - PT Sanghiang Perkasa (Kalbe Nutritionals)',
      summary: {
        masterTeamsCount,
        customGamesCount,
        pinangHistoryCount,
        tugHistoryCount,
        totalQuestions,
        totalCommitments,
        doorprizeParticipantsCount,
        questionSource: questionsData.source || 'DEFAULT'
      },
      data: {
        superAdmin: superAdminData,
        panjatPinang: panjatPinangData,
        tarikTambang: tarikTambangData,
        questions: questionsData,
        commitment: commitmentData,
        doorprize: doorprizeData
      }
    };
  }

  /**
   * Mengembalikan ringkasan status data yang tersimpan saat ini
   */
  getStatus() {
    const superAdminData = superAdminEngine.getStorageData();
    const panjatPinangData = gameEngine.getStorageData();
    const tarikTambangData = tugEngine.getStorageData();
    const questionsData = questionBank.getStorageData();
    const commitmentData = commitmentEngine.getStorageData();
    const doorprizeData = doorprizeEngine.exportData();

    return {
      storageFiles: {
        superAdmin: fs.existsSync(path.join(__dirname, '../../data/superadmin-storage.json')),
        gameStorage: fs.existsSync(path.join(__dirname, '../../data/game-storage.json')),
        tugStorage: fs.existsSync(path.join(__dirname, '../../data/tug-storage.json')),
        commitmentStorage: fs.existsSync(path.join(__dirname, '../../data/commitment-storage.json')),
        doorprizeStorage: fs.existsSync(path.join(__dirname, '../../data/doorprize-storage.json'))
      },
      firebase: {
        connected: firebaseService.isAvailable(),
        projectId: firebaseService.config ? firebaseService.config.projectId : null,
        databaseId: firebaseService.config ? firebaseService.config.firestoreDatabaseId : null
      },
      counts: {
        masterTeams: Object.keys(superAdminData.masterTeams || {}).length,
        customGames: (superAdminData.customGames || []).length,
        pinangHistory: (panjatPinangData.history || []).length,
        tugHistory: (tarikTambangData.history || []).length,
        questions: (questionsData.questions || []).length,
        commitments: Object.keys(commitmentData.commitments || {}).length,
        doorprizeParticipants: (doorprizeData.participants || []).length
      },
      questionSource: questionsData.source || 'DEFAULT',
      lastExportSample: new Date().toISOString()
    };
  }

  /**
   * Melakukan restore data dari payload backup JSON
   * @param {Object} payload - Objek JSON hasil backup
   * @param {Object} options - Pilihan restore granular
   */
  restoreBackup(payload, options = {}) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Format file backup tidak valid: isi file kosong atau bukan JSON yang benar.');
    }

    // Ekstraksi data container (mendukung format standar wrapper atau langsung data)
    const backupData = payload.data && typeof payload.data === 'object' ? payload.data : payload;

    const opts = {
      restoreSuperAdmin: options.restoreSuperAdmin !== false,
      restorePinang: options.restorePinang !== false,
      restoreTug: options.restoreTug !== false,
      restoreQuestions: options.restoreQuestions !== false,
      restoreHistory: options.restoreHistory !== false,
      restoreDoorprize: options.restoreDoorprize !== false
    };

    const restoredItems = [];

    // 1. Restore Super Admin (Master Teams, Custom Games, Bobot Digital)
    if (opts.restoreSuperAdmin && backupData.superAdmin) {
      superAdminEngine.restoreData(backupData.superAdmin);
      const teamCount = Object.keys(backupData.superAdmin.masterTeams || {}).length;
      const gameCount = (backupData.superAdmin.customGames || []).length;
      restoredItems.push(`Super Admin (${teamCount} tim master, ${gameCount} game non-digital)`);
    }

    // 2. Restore Panjat Pinang
    if (opts.restorePinang && backupData.panjatPinang) {
      gameEngine.restoreData(backupData.panjatPinang, opts.restoreHistory);
      const pHistory = opts.restoreHistory ? (backupData.panjatPinang.history || []).length : 0;
      restoredItems.push(`Panjat Pinang (konfigurasi & ${pHistory} riwayat)`);
    }

    // 3. Restore Tarik Tambang
    if (opts.restoreTug && backupData.tarikTambang) {
      tugEngine.restoreData(backupData.tarikTambang, opts.restoreHistory);
      const tHistory = opts.restoreHistory ? (backupData.tarikTambang.history || []).length : 0;
      restoredItems.push(`Tarik Tambang (warna jersey, tim & ${tHistory} riwayat)`);
    }

    // 4. Restore Bank Soal
    if (opts.restoreQuestions && backupData.questions) {
      questionBank.restoreData(backupData.questions);
      const qCount = (backupData.questions.questions || []).length;
      restoredItems.push(`Bank Soal (${qCount} soal)`);
    }

    // 5. Restore Getting Commitment
    if (backupData.commitment) {
      commitmentEngine.restoreData(backupData.commitment);
      const cCount = Object.keys(backupData.commitment.commitments || {}).length;
      restoredItems.push(`Getting Commitment (${cCount} komitmen)`);
    }

    // 6. Restore Doorprize
    if (opts.restoreDoorprize && backupData.doorprize) {
      doorprizeEngine.applyData(backupData.doorprize);
      doorprizeEngine.saveStorage();
      const pCount = (backupData.doorprize.participants || []).length;
      restoredItems.push(`Doorprize (${pCount} peserta)`);
    }

    if (restoredItems.length === 0) {
      throw new Error('Tidak ada modul data yang cocok untuk di-restore dari file ini.');
    }

    return {
      success: true,
      message: `Berhasil merestore: ${restoredItems.join(', ')}`,
      restoredItems,
      restoredAt: new Date().toISOString()
    };
  }
}

module.exports = new BackupManager();
