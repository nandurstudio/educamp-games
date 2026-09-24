const fs = require('fs');
const path = require('path');
const superAdminEngine = require('./super-admin-engine');
const firebaseService = require('./firebase-service');

const LOCAL_STORAGE_PATH = path.join(__dirname, '../../data/auth-storage.json');

const OWNER_EMAIL = 'nandang.dhe@gmail.com';
const PERMANENT_SUPER_ADMINS = [
  { email: 'nandang.dhe@gmail.com', role: 'SUPER_ADMIN', name: 'Nandang Duryat (Owner)', isOwner: true },
  { email: 'maulidreki@gmail.com', role: 'SUPER_ADMIN', name: 'Maulid Reki (Super Admin)', isOwner: true }
];

class AuthManager {
  constructor() {
    this.adminUsers = PERMANENT_SUPER_ADMINS.map(u => ({ ...u }));
    this.pendingRequests = [];
    this.loadLocalDisk();
    this.loadAdminUsers();
  }

  loadLocalDisk() {
    try {
      if (fs.existsSync(LOCAL_STORAGE_PATH)) {
        const raw = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.users)) {
          this.adminUsers = parsed.users;
        }
        if (Array.isArray(parsed.pendingRequests)) {
          this.pendingRequests = parsed.pendingRequests;
        }
      }
    } catch (e) {
      console.warn('[AuthManager] Gagal load data auth lokal:', e.message);
    }
  }

  saveLocalDisk() {
    try {
      const dir = path.dirname(LOCAL_STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify({
        users: this.adminUsers,
        pendingRequests: this.pendingRequests,
        updatedAt: new Date().toISOString()
      }, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[AuthManager] Gagal simpan data auth lokal:', e.message);
    }
  }

  loadAdminUsers() {
    this.reloadFromFirebase().catch(err => {
      console.warn('[AuthManager] Initial Firebase reload warning:', err.message);
    });
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const data = await firebaseService.loadDoc('authorized_admins');
      if (data) {
        if (Array.isArray(data.users)) {
          this.adminUsers = data.users;
          // Pastikan admin utama selalu ada
          for (const perm of PERMANENT_SUPER_ADMINS) {
            const foundIdx = this.adminUsers.findIndex(u => u.email.toLowerCase() === perm.email.toLowerCase());
            if (foundIdx === -1) {
              this.adminUsers.push({ email: perm.email, role: 'SUPER_ADMIN', name: perm.name, isOwner: true });
            } else {
              this.adminUsers[foundIdx].role = 'SUPER_ADMIN';
              this.adminUsers[foundIdx].isOwner = true;
            }
          }
        }
        if (Array.isArray(data.pendingRequests)) {
          this.pendingRequests = data.pendingRequests;
        }
        this.saveLocalDisk();
        return true;
      }
      return false;
    } catch (err) {
      console.error('[AuthManager] Gagal load admins dari Firestore:', err.message);
      return false;
    }
  }

  saveAdminUsers() {
    this.saveLocalDisk();
    if (firebaseService.isAvailable()) {
      firebaseService.saveDoc('authorized_admins', {
        users: this.adminUsers,
        pendingRequests: this.pendingRequests,
        updatedAt: new Date().toISOString()
      }).catch(err => {
        console.error('[AuthManager] Gagal simpan admins ke Firestore:', err.message);
      });
    }
  }

  getAdminUsers() {
    return this.adminUsers;
  }

  getPendingRequests() {
    return this.pendingRequests;
  }

  /**
   * Daftarkan user ke antrean pending jika belum terdaftar sebagai admin
   */
  registerOrUpdatePending({ email, name, photoURL }) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();

    // Cek jika sudah terotorisasi
    const roleInfo = this.resolveRole(cleanEmail);
    if (roleInfo) {
      return { status: 'APPROVED', user: roleInfo };
    }

    const now = new Date().toISOString();
    const existing = this.pendingRequests.find(p => p.email.toLowerCase() === cleanEmail);
    if (existing) {
      existing.lastSeen = now;
      if (name) existing.name = name.trim();
      if (photoURL) existing.photoURL = photoURL;
      existing.status = 'PENDING';
    } else {
      this.pendingRequests.unshift({
        email: cleanEmail,
        name: (name || cleanEmail.split('@')[0]).trim(),
        photoURL: photoURL || '',
        requestedAt: now,
        lastSeen: now,
        status: 'PENDING'
      });
    }
    this.saveAdminUsers();
    return { status: 'PENDING', email: cleanEmail };
  }

  /**
   * Super Admin menyetujui (Admit) user yang tertahan di antrean
   */
  admitUser({ email, role = 'GAME_MASTER', admittedBy }) {
    if (!email) throw new Error('Email wajib disertakan');
    const cleanEmail = email.trim().toLowerCase();

    // Ambil info dari pending jika ada
    const pIdx = this.pendingRequests.findIndex(p => p.email.toLowerCase() === cleanEmail);
    let pendingInfo = null;
    if (pIdx !== -1) {
      pendingInfo = this.pendingRequests.splice(pIdx, 1)[0];
    }

    const targetRole = role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'GAME_MASTER';
    const targetName = (pendingInfo && pendingInfo.name) || cleanEmail.split('@')[0];
    const photoURL = (pendingInfo && pendingInfo.photoURL) || '';

    const existingAdmin = this.adminUsers.find(u => u.email.toLowerCase() === cleanEmail);
    let userResult;
    if (existingAdmin) {
      existingAdmin.role = targetRole;
      if (targetName) existingAdmin.name = targetName;
      if (photoURL) existingAdmin.photoURL = photoURL;
      existingAdmin.updatedAt = new Date().toISOString();
      userResult = existingAdmin;
    } else {
      userResult = {
        email: cleanEmail,
        role: targetRole,
        name: targetName,
        photoURL,
        addedAt: new Date().toISOString(),
        admittedBy: admittedBy || 'SUPER_ADMIN'
      };
      this.adminUsers.push(userResult);
    }

    this.saveAdminUsers();
    return userResult;
  }

  /**
   * Super Admin menyetujui massal semua user yang tertahan di antrean
   */
  admitAll({ role = 'GAME_MASTER', admittedBy }) {
    const admittedList = [];
    const targetRole = role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'GAME_MASTER';

    while (this.pendingRequests.length > 0) {
      const pending = this.pendingRequests.shift();
      const cleanEmail = pending.email.toLowerCase();
      const existingAdmin = this.adminUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (existingAdmin) {
        existingAdmin.role = targetRole;
        existingAdmin.name = pending.name || existingAdmin.name;
        admittedList.push(existingAdmin);
      } else {
        const newUser = {
          email: cleanEmail,
          role: targetRole,
          name: pending.name || cleanEmail.split('@')[0],
          photoURL: pending.photoURL || '',
          addedAt: new Date().toISOString(),
          admittedBy: admittedBy || 'SUPER_ADMIN'
        };
        this.adminUsers.push(newUser);
        admittedList.push(newUser);
      }
    }

    this.saveAdminUsers();
    return admittedList;
  }

  /**
   * Menolak atau membuang permintaan pending
   */
  rejectPending(email) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    const idx = this.pendingRequests.findIndex(p => p.email.toLowerCase() === cleanEmail);
    if (idx !== -1) {
      const removed = this.pendingRequests.splice(idx, 1)[0];
      this.saveAdminUsers();
      return removed;
    }
    return null;
  }

  /**
   * Cek status spesifik user untuk keperluan polling status admission
   */
  checkStatus(email) {
    if (!email) return { status: 'NOT_FOUND' };
    const cleanEmail = email.trim().toLowerCase();
    const roleInfo = this.resolveRole(cleanEmail);
    if (roleInfo) {
      return { status: 'APPROVED', user: roleInfo };
    }
    const pending = this.pendingRequests.find(p => p.email.toLowerCase() === cleanEmail);
    if (pending) {
      return { status: 'PENDING', request: pending };
    }
    return { status: 'NOT_FOUND' };
  }

  addAdminUser({ email, role, name, admittedBy }) {
    if (!email || !email.includes('@')) throw new Error('Email tidak valid');
    const cleanEmail = email.trim().toLowerCase();
    if (this.adminUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error(`Email ${cleanEmail} sudah terdaftar`);
    }

    // Bersihkan dari pending jika ada
    const pIdx = this.pendingRequests.findIndex(p => p.email.toLowerCase() === cleanEmail);
    let photoURL = '';
    if (pIdx !== -1) {
      const p = this.pendingRequests.splice(pIdx, 1)[0];
      photoURL = p.photoURL || '';
    }

    const newUser = {
      email: cleanEmail,
      role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'GAME_MASTER',
      name: (name || cleanEmail.split('@')[0]).trim(),
      photoURL,
      addedAt: new Date().toISOString(),
      admittedBy: admittedBy || 'MANUAL'
    };
    this.adminUsers.push(newUser);
    this.saveAdminUsers();
    return newUser;
  }

  removeAdminUser(email) {
    const cleanEmail = email.trim().toLowerCase();
    if (PERMANENT_SUPER_ADMINS.some(p => p.email.toLowerCase() === cleanEmail)) {
      throw new Error('Admin utama tidak dapat dihapus');
    }
    const idx = this.adminUsers.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (idx === -1) {
      throw new Error(`Pengguna ${cleanEmail} tidak ditemukan`);
    }
    const removed = this.adminUsers.splice(idx, 1)[0];
    this.saveAdminUsers();
    return removed;
  }

  /**
   * Cek role berdasarkan decoded Firebase Auth token atau email
   */
  resolveRole(email) {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    
    // Cek permanent super admins
    const perm = PERMANENT_SUPER_ADMINS.find(p => p.email.toLowerCase() === cleanEmail);
    if (perm) {
      return { email: cleanEmail, role: 'SUPER_ADMIN', name: perm.name, isOwner: true };
    }

    const found = this.adminUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (found) {
      return { email: found.email, role: found.role, name: found.name, photoURL: found.photoURL, isOwner: !!found.isOwner };
    }
    return null;
  }
}

module.exports = new AuthManager();
