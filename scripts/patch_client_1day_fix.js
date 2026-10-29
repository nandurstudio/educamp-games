const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/public/js/timer-chat/timer-chat.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Helper isEventGK
const isEventGKFn = `
    function isEventGK(evId) {
      const ev = currentActiveEvent;
      const targetId = (evId || (ev && ev.id ? ev.id : '')).toLowerCase();
      const targetName = (ev && ev.name ? ev.name : '').toLowerCase();
      const targetSession = (ev && ev.sessionId ? ev.sessionId : '').toLowerCase();
      return targetId.includes('gk') || targetName.includes('gladi kotor') || targetSession.includes('gk') || targetId.includes('kotor');
    }
`;

// Inject isEventGK before getStoredRundown if not exists
if (!code.includes('function isEventGK(')) {
  code = code.replace('function getStoredRundown(', isEventGKFn + '\n    function getStoredRundown(');
}

// 2. Overwrite getStoredRundown to never load Day 2 for GK and prioritize server state
const oldGetStoredRundownRegex = /function getStoredRundown\(dayKey,\s*eventId\)\s*\{[\s\S]*?return JSON\.parse\(JSON\.stringify\(getMasterRundownForEvent\(evId,\s*dayKey\)\)\);\s*\}/;

const newGetStoredRundown = `function getStoredRundown(dayKey, eventId) {
      const evId = eventId || (currentActiveEvent ? currentActiveEvent.id : 'default');
      const isGK = isEventGK(evId);

      // Jika Gladi Kotor (1-day event), Day 2 MUTLAK KOSONG
      if (isGK && dayKey === 'DAY_2') {
        try {
          const key = \`tpm_rundown_\${evId}_day_2\`;
          sessionStorage.removeItem(key);
          localStorage.removeItem(key);
          sessionStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
          localStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
          sessionStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
          localStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
        } catch(e) {}
        return [];
      }

      // Prioritas 1: Ambil dari sessionState event aktif yang disinkronkan dari Firebase/Server
      if (currentActiveEvent && currentActiveEvent.sessionState) {
        const list = dayKey === 'DAY_1' ? currentActiveEvent.sessionState.rundownDay1 : currentActiveEvent.sessionState.rundownDay2;
        if (Array.isArray(list)) {
          if (list.length > 0) return JSON.parse(JSON.stringify(list));
          if (dayKey === 'DAY_2') return []; // Jika server menyatakan Day 2 kosong, hormati!
        }
      }

      try {
        const key = \`tpm_rundown_\${evId}_\${dayKey.toLowerCase()}\`;
        const stored = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Gagal membaca storage rundown');
      }

      return JSON.parse(JSON.stringify(getMasterRundownForEvent(evId, dayKey)));
    }`;

if (oldGetStoredRundownRegex.test(code)) {
  code = code.replace(oldGetStoredRundownRegex, newGetStoredRundown);
  console.log('[Patch] getStoredRundown replaced successfully!');
} else {
  console.warn('[Patch] oldGetStoredRundownRegex did not match');
}

// 3. Update applyDayTabUI
const oldApplyDayTabRegex = /function applyDayTabUI\(\)\s*\{[\s\S]*?btnDay2\.classList\.toggle\('active',\s*currentDayTab === 'DAY_2'\);\s*\}\s*\}/;

const newApplyDayTab = `function applyDayTabUI() {
      const btnDay1 = document.getElementById('tab-day1');
      const btnDay2 = document.getElementById('tab-day2');
      const tabsContainer = document.querySelector('.rundown-tabs');

      const ev = currentActiveEvent;
      const isGK = isEventGK(ev ? ev.id : '');

      let hasDay2 = false;
      if (isGK) {
        hasDay2 = false;
        currentDayTab = 'DAY_1';
        try {
          localStorage.setItem('tpm_current_day_tab', 'DAY_1');
          sessionStorage.setItem('tpm_current_day_tab', 'DAY_1');
        } catch(e){}
      } else if (ev && ev.sessionState && Array.isArray(ev.sessionState.rundownDay2)) {
        hasDay2 = ev.sessionState.rundownDay2.length > 0;
      } else {
        const d2 = getStoredRundown('DAY_2');
        hasDay2 = Array.isArray(d2) && d2.length > 0;
      }

      if (!hasDay2) {
        currentDayTab = 'DAY_1';
        if (btnDay2) btnDay2.style.display = 'none';
        if (tabsContainer) tabsContainer.style.display = 'none';
      } else {
        if (btnDay2) btnDay2.style.display = '';
        if (tabsContainer) tabsContainer.style.display = '';
      }

      if (btnDay1 && btnDay2) {
        btnDay1.classList.toggle('active', currentDayTab === 'DAY_1');
        btnDay2.classList.toggle('active', currentDayTab === 'DAY_2');
      }
    }`;

if (oldApplyDayTabRegex.test(code)) {
  code = code.replace(oldApplyDayTabRegex, newApplyDayTab);
  console.log('[Patch] applyDayTabUI replaced successfully!');
} else {
  console.warn('[Patch] oldApplyDayTabRegex did not match');
}

// 4. Update applyRemoteSessionState so rundownDay2 empty array is respected
const oldRundownDay2Regex = /if \(Array\.isArray\(remoteSession\.rundownDay2\) && remoteSession\.rundownDay2\.length > 0\) \{[\s\S]*?saveStoredRundown\('DAY_2',\s*rundownItemsDay2,\s*evId\);\s*\}/;

const newRundownDay2 = `if (Array.isArray(remoteSession.rundownDay2)) {
        rundownItemsDay2 = remoteSession.rundownDay2;
        saveStoredRundown('DAY_2', rundownItemsDay2, evId);
      }`;

if (oldRundownDay2Regex.test(code)) {
  code = code.replace(oldRundownDay2Regex, newRundownDay2);
  console.log('[Patch] applyRemoteSessionState rundownDay2 handling updated!');
} else {
  console.warn('[Patch] oldRundownDay2Regex did not match');
}

// 5. Ensure applyDayTabUI is called at the end of applyRemoteSessionState
const oldApplyEndRegex = /updateRundownVsActualUI\(\);\s*\}\s*try \{\s*const savedEventRaw = sessionStorage\.getItem\('tc_cached_active_event'\)/;

if (oldApplyEndRegex.test(code)) {
  code = code.replace(
    oldApplyEndRegex,
    `updateRundownVsActualUI();\n      applyDayTabUI();\n    }\n\n    try {\n      const savedEventRaw = sessionStorage.getItem('tc_cached_active_event')`
  );
  console.log('[Patch] applyDayTabUI wired into applyRemoteSessionState end!');
}

// 6. Update updateEventLabels to enforce GK single day and trigger applyDayTabUI
const oldUpdateLabelsRundownRegex = /rundownItemsDay1 = getStoredRundown\('DAY_1',\s*event\.id\);\s*rundownItemsDay2 = getStoredRundown\('DAY_2',\s*event\.id\);/;

if (oldUpdateLabelsRundownRegex.test(code)) {
  code = code.replace(
    oldUpdateLabelsRundownRegex,
    `rundownItemsDay1 = getStoredRundown('DAY_1', event.id);
        rundownItemsDay2 = getStoredRundown('DAY_2', event.id);
        if (isEventGK(event.id)) {
          currentDayTab = 'DAY_1';
          rundownItemsDay2 = [];
        }
        applyDayTabUI();`
  );
  console.log('[Patch] updateEventLabels enhanced with GK single-day check & applyDayTabUI call!');
}

// 7. Initial startup clean up of legacy storage
const startupCleanCode = `
    try {
      localStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
      sessionStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
      localStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
      sessionStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
    } catch (e) {}
`;

if (!code.includes('tpm_rundown_event-hc-tpm-gk-2026_day_2')) {
  code = code.replace(
    "const savedTab = sessionStorage.getItem('tpm_current_day_tab')",
    startupCleanCode + "\n      const savedTab = sessionStorage.getItem('tpm_current_day_tab')"
  );
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('[Patch] All done for timer-chat.js!');

