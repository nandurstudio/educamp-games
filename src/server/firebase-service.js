const fs = require('fs');
const path = require('path');

let firebaseConfig = null;
try {
  const configPath = path.join(__dirname, '../../firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('[Firebase Client] Warning: firebase-applet-config.json not loaded:', e.message);
}

class FirestoreSyncService {
  constructor() {
    this.config = firebaseConfig;
    this.enabled = !!(firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.firestoreDatabaseId);
    if (this.enabled) {
      this.baseUrl = `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/${this.config.firestoreDatabaseId}/documents/educamp_data`;
      console.log(`[Firebase Service] Cloud Firestore sync active (Project: ${this.config.projectId}, DB: ${this.config.firestoreDatabaseId})`);
    } else {
      console.log('[Firebase Service] Firebase config not detected. Running local storage fallback.');
    }
  }

  isAvailable() {
    return this.enabled;
  }

  /**
   * Save a JSON payload to a specific document in Firestore
   * @param {string} docId 
   * @param {object} data 
   */
  async saveDoc(docId, data) {
    if (!this.enabled) return null;
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
        console.error(`[Firebase Service] Failed to save '${docId}': ${res.status} ${text}`);
        return null;
      }
      return true;
    } catch (err) {
      console.error(`[Firebase Service] Network error saving '${docId}':`, err.message);
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
        console.error(`[Firebase Service] Failed to load '${docId}': ${res.status} ${text}`);
        return null;
      }
      const data = await res.json();
      if (data && data.fields && data.fields.payload && data.fields.payload.stringValue) {
        return JSON.parse(data.fields.payload.stringValue);
      }
      return null;
    } catch (err) {
      console.error(`[Firebase Service] Network error loading '${docId}':`, err.message);
      return null;
    }
  }
}

module.exports = new FirestoreSyncService();
