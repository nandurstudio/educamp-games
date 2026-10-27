const fs = require('fs');
const path = require('path');

// Ensure dotenv is loaded
try {
  require('dotenv').config();
} catch (e) {
  // Ignore if dotenv is not present or already loaded
}

let fileConfig = null;
try {
  const configPath = path.join(__dirname, '../../firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('[Firebase Client] Warning: firebase-applet-config.json not loaded:', e.message);
}

// Canonical resolution with automatic sanitization for misconfigured UI environment variables
let rawProjectId = process.env.FIREBASE_PROJECT_ID || (fileConfig && fileConfig.projectId);
let rawAppId = process.env.FIREBASE_APP_ID || (fileConfig && fileConfig.appId);
let rawAuthDomain = process.env.FIREBASE_AUTH_DOMAIN || (fileConfig && fileConfig.authDomain);
let rawApiKey = process.env.FIREBASE_API_KEY || (fileConfig && fileConfig.apiKey);
let rawDbId = process.env.FIREBASE_FIRESTORE_DATABASE_ID || process.env.FIREBASE_DATABASE_ID || (fileConfig && (fileConfig.firestoreDatabaseId || fileConfig.databaseId));
let rawBucket = process.env.FIREBASE_STORAGE_BUCKET || (fileConfig && fileConfig.storageBucket);
let rawSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID || (fileConfig && fileConfig.messagingSenderId);

// Guard: detect if App ID and Project ID were accidentally swapped in environment variables
if (rawProjectId && (rawProjectId.includes(':web:') || rawProjectId.startsWith('1:'))) {
  // rawProjectId is actually an App ID
  if (!rawAppId || rawAppId.includes('.firebaseapp.com')) {
    rawAppId = rawProjectId;
  }
  rawProjectId = fileConfig?.projectId || 'gen-lang-client-0569334671';
}

if (rawAppId && rawAppId.includes('.firebaseapp.com')) {
  // rawAppId was accidentally given the Auth Domain
  if (!rawAuthDomain) {
    rawAuthDomain = rawAppId;
  }
  rawAppId = fileConfig?.appId || '1:30984307139:web:fcb6680aff9eb88b32bd76';
}

if (!rawAuthDomain && rawProjectId) {
  rawAuthDomain = `${rawProjectId}.firebaseapp.com`;
}

// Keep process.env clean and correct in runtime memory
process.env.FIREBASE_PROJECT_ID = rawProjectId;
process.env.FIREBASE_APP_ID = rawAppId;
process.env.FIREBASE_AUTH_DOMAIN = rawAuthDomain;
if (rawApiKey) process.env.FIREBASE_API_KEY = rawApiKey;
if (rawDbId) {
  process.env.FIREBASE_FIRESTORE_DATABASE_ID = rawDbId;
  process.env.FIREBASE_DATABASE_ID = rawDbId;
}

const firebaseConfig = {
  projectId: rawProjectId,
  appId: rawAppId,
  apiKey: rawApiKey,
  authDomain: rawAuthDomain,
  firestoreDatabaseId: rawDbId,
  storageBucket: rawBucket,
  messagingSenderId: rawSenderId
};

class FirestoreSyncService {
  constructor() {
    this.config = firebaseConfig;
    this.enabled = !!(firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.firestoreDatabaseId);
    this.cooldownUntil = new Map(); // docId -> timestamp
    this.globalCooldownUntil = 0;
    this.pendingSaves = new Map(); // docId -> { data, timeoutId }
    this.inFlightSaves = new Map(); // docId -> Promise
    this.queuedSaves = new Map(); // docId -> latest data
    this.saveDebounceMs = 1500; // Debounce rapid writes to prevent hitting Firestore rate limits

    if (this.enabled) {
      this.baseUrl = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/${this.config.firestoreDatabaseId}/documents/educamp_data`;
      console.log(`[Firebase Service] Cloud Firestore sync active (Project: ${this.config.projectId}, DB: ${this.config.firestoreDatabaseId})`);
    } else {
      console.log('[Firebase Service] Firebase config not detected. Running local storage fallback.');
    }
  }

  getConfig() {
    return this.config;
  }

  isAvailable() {
    return this.enabled;
  }

  /**
   * Save a JSON payload to a specific document in Firestore with debouncing and 429 backoff
   * @param {string} docId 
   * @param {object} data 
   * @param {boolean} immediate Whether to skip debounce (e.g. on shutdown)
   */
  async saveDoc(docId, data, immediate = false) {
    if (!this.enabled) return null;

    const existing = this.pendingSaves.get(docId);
    if (existing && existing.timeoutId) {
      clearTimeout(existing.timeoutId);
      this.pendingSaves.delete(docId);
    }

    // Check if in active cooldown due to recent 429 Rate Limit
    const now = Date.now();
    const docCooldown = this.cooldownUntil.get(docId) || 0;
    if (now < this.globalCooldownUntil || now < docCooldown) {
      // Store latest data so it can be flushed once cooldown ends
      this.pendingSaves.set(docId, { data, timestamp: now });
      return true; // Local storage already saved, suppress redundant remote failures
    }

    if (immediate) {
      return this._executeSave(docId, data);
    }

    // Debounce writes to avoid spamming REST endpoints during rapid edits/ticks
    return new Promise((resolve) => {
      const timeoutId = setTimeout(async () => {
        const pending = this.pendingSaves.get(docId);
        const latestPayload = pending ? pending.data : data;
        this.pendingSaves.delete(docId);
        const result = await this._executeSave(docId, latestPayload);
        resolve(result);
      }, this.saveDebounceMs);

      this.pendingSaves.set(docId, { data, timeoutId, timestamp: now });
    });
  }

  /**
   * Serialized write executor to Firestore REST API per docId so concurrent saves never overwrite newer data
   */
  async _executeSave(docId, data) {
    if (this.inFlightSaves.has(docId)) {
      this.queuedSaves.set(docId, data);
      return this.inFlightSaves.get(docId);
    }

    const runLoop = async (initialData) => {
      let currentData = initialData;
      let lastResult = null;
      while (currentData !== undefined) {
        lastResult = await this._performNetworkSave(docId, currentData);
        if (this.queuedSaves.has(docId)) {
          currentData = this.queuedSaves.get(docId);
          this.queuedSaves.delete(docId);
        } else {
          currentData = undefined;
        }
      }
      return lastResult;
    };

    const promise = runLoop(data).finally(() => {
      this.inFlightSaves.delete(docId);
    });
    this.inFlightSaves.set(docId, promise);
    return promise;
  }

  async _performNetworkSave(docId, data) {
    try {
      const url = `${this.baseUrl}/${encodeURIComponent(docId)}?key=${this.config.apiKey}`;
      const payloadString = JSON.stringify(data);
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            payload: { stringValue: payloadString },
            updatedAt: { stringValue: new Date().toISOString() }
          }
        })
      });

      if (!res.ok) {
        const text = await res.text();
        if (res.status === 429) {
          // Rate limit / Quota exceeded: set 60s cooldown to protect project quota
          const cooldownDuration = 60000;
          this.globalCooldownUntil = Date.now() + cooldownDuration;
          this.cooldownUntil.set(docId, Date.now() + cooldownDuration);
          console.warn(`[Firebase Service] Quota limit reached (429) saving '${docId}'. Local storage is active. Cooling down cloud sync for 60s.`);
        } else {
          console.warn(`[Firebase Service] Remote sync status ${res.status} for '${docId}': ${text.slice(0, 150)}`);
        }
        return null;
      }

      // Success - clear any cooldown
      this.cooldownUntil.delete(docId);
      return true;
    } catch (err) {
      console.warn(`[Firebase Service] Network notice saving '${docId}':`, err.message);
      return null;
    }
  }

  /**
   * Load and parse JSON payload from a specific document in Firestore
   * @param {string} docId 
   */
  async loadDoc(docId) {
    if (!this.enabled) return null;
    try {
      const url = `${this.baseUrl}/${encodeURIComponent(docId)}?key=${this.config.apiKey}`;
      const res = await fetch(url);
      if (res.status === 404) {
        return null; // Document does not exist yet
      }
      if (!res.ok) {
        const text = await res.text();
        if (res.status === 429) {
          console.warn(`[Firebase Service] Quota limit reached (429) loading '${docId}'. Using local cache.`);
        } else {
          console.warn(`[Firebase Service] Remote status ${res.status} loading '${docId}': ${text.slice(0, 150)}`);
        }
        return null;
      }
      const data = await res.json();
      if (data && data.fields && data.fields.payload && data.fields.payload.stringValue) {
        return JSON.parse(data.fields.payload.stringValue);
      }
      return null;
    } catch (err) {
      console.warn(`[Firebase Service] Network notice loading '${docId}':`, err.message);
      return null;
    }
  }
}

module.exports = new FirestoreSyncService();
