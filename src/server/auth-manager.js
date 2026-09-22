const superAdminEngine = require('./super-admin-engine');
const firebaseService = require('./firebase-service');

const OWNER_EMAIL = 'nandang.dhe@gmail.com';
const PERMANENT_SUPER_ADMINS = [
  { email: 'nandang.dhe@gmail.com', role: 'SUPER_ADMIN', name: 'Nandang Duryat (Owner)', isOwner: true },
  { email: 'maulidreki@gmail.com', role: 'SUPER_ADMIN', name: 'Maulid Reki (Super Admin)', isOwner: true }
];

class AuthManager {
  constructor() {
    this.adminUsers = PERMANENT_SUPER_ADMINS.map(u => ({ ...u }));
    this.loadAdminUsers();
  }

  loadAdminUsers() {
    if (firebaseService.isAvailable()) {
      firebaseService.loadDoc('authorized_admins').then(data => {
        if (data && Array.isArray(data.users)) {
          this.adminUsers = data.users;
          // Pastikan admin utama selalu ada
          for (const perm of PERMANENT_SUPER_ADMINS) {
            const foundIdx = this.adminUsers.findIndex(u => u.email.toLowerCase() === perm.email.toLowerCase());
            if (foundIdx === -1) {
              this.adminUsers.push({ email: perm.email, role: 'SUPER_ADMIN', name: perm.name });
            } else {
              this.adminUsers[foundIdx].role = 'SUPER_ADMIN'; // Pastikan role selalu SUPER_ADMIN
            }
          }
          this.saveAdminUsers();
        }
      }).catch(err => {
        console.error('[AuthManager] Gagal load admins dari Firestore:', err.message);
      });
    }
  }

  saveAdminUsers() {
    if (firebaseService.isAvailable()) {
      firebaseService.saveDoc('authorized_admins', {
        users: this.adminUsers,
        updatedAt: new Date().toISOString()
      }).catch(err => {
        console.error('[AuthManager] Gagal simpan admins ke Firestore:', err.message);
      });
    }
  }

  getAdminUsers() {
    return this.adminUsers;
  }

  addAdminUser({ email, role, name }) {
    if (!email || !email.includes('@')) throw new Error('Email tidak valid');
    const cleanEmail = email.trim().toLowerCase();
    if (this.adminUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error(`Email ${cleanEmail} sudah terdaftar`);
    }
    const newUser = {
      email: cleanEmail,
      role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'GAME_MASTER',
      name: (name || cleanEmail.split('@')[0]).trim(),
      addedAt: new Date().toISOString()
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
      return { email: found.email, role: found.role, name: found.name, isOwner: false };
    }
    return null;
  }
}

module.exports = new AuthManager();
