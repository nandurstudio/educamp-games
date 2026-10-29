const fs = require('fs');
const path = require('path');
const fb = require('../src/server/firebase-service.js');
const mr = require('../src/server/master-rundowns.js');

async function enforceGK() {
  console.log('[EnforceGK] 1. Updating timer-chat-engine.js...');
  const enginePath = path.join(__dirname, '../src/server/timer-chat-engine.js');
  let engineCode = fs.readFileSync(enginePath, 'utf8');

  // Replace sanitizeEvents logic for GK
  const oldSanitizeGK = `      const isGK = id.includes('gk') || name.includes('gladi kotor');
      const isGR = !isGK && (id.includes('gr') || name.includes('gladi resik'));

      if (!Array.isArray(ev.sessionState.rundownDay1) || ev.sessionState.rundownDay1.length === 0) {
        if (isGK) ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_GK_DAY_1;
        else if (isGR) ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_GR_DAY_1;
        else ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_OFFICIAL_DAY_1;
      }
      if (!Array.isArray(ev.sessionState.rundownDay2) || ev.sessionState.rundownDay2.length === 0) {
        if (isGK) ev.sessionState.rundownDay2 = [];
        else if (isGR) ev.sessionState.rundownDay2 = masterRundowns.RUNDOWN_GR_DAY_2;
        else ev.sessionState.rundownDay2 = masterRundowns.RUNDOWN_OFFICIAL_DAY_2;
      }`;

  const newSanitizeGK = `      const isGK = id.includes('gk') || name.includes('gladi kotor') || (ev.sessionId && ev.sessionId.toLowerCase().includes('gk'));
      const isGR = !isGK && (id.includes('gr') || name.includes('gladi resik') || (ev.sessionId && ev.sessionId.toLowerCase().includes('gr')));

      if (isGK) {
        // Gladi Kotor (GK) MUTLAK 1-DAY ONLY (45 sesi PDF resmi)
        ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_GK_DAY_1;
        ev.sessionState.rundownDay2 = [];
        ev.sessionState.currentDayTab = 'DAY_1';
      } else {
        if (!Array.isArray(ev.sessionState.rundownDay1) || ev.sessionState.rundownDay1.length === 0) {
          if (isGR) ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_GR_DAY_1;
          else ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_OFFICIAL_DAY_1;
        }
        if (!Array.isArray(ev.sessionState.rundownDay2) || ev.sessionState.rundownDay2.length === 0) {
          if (isGR) ev.sessionState.rundownDay2 = masterRundowns.RUNDOWN_GR_DAY_2;
          else ev.sessionState.rundownDay2 = masterRundowns.RUNDOWN_OFFICIAL_DAY_2;
        }
      }`;

  if (engineCode.includes('if (isGK) ev.sessionState.rundownDay1 = masterRundowns.RUNDOWN_GK_DAY_1;')) {
    engineCode = engineCode.replace(oldSanitizeGK.replace(/\r\n/g, '\n'), newSanitizeGK);
    engineCode = engineCode.replace(oldSanitizeGK, newSanitizeGK);
    fs.writeFileSync(enginePath, engineCode, 'utf8');
    console.log('[EnforceGK] timer-chat-engine.js sanitizeEvents updated!');
  } else {
    console.log('[EnforceGK] Pattern not found in timer-chat-engine.js');
  }

  // 2. Update CSS in timer-chat.css to hard-hide Day 2 when single-day
  console.log('[EnforceGK] 2. Updating timer-chat.css...');
  const cssPath = path.join(__dirname, '../src/public/css/timer-chat.css');
  let cssCode = fs.readFileSync(cssPath, 'utf8');
  const cssRule = `
/* HARD GUARD SINGLE-DAY (GLADI KOTOR): Day 2 Tab & Rundown Tabs Hidden */
body.is-single-day-event .rundown-tabs,
body.is-single-day-event #tab-day2,
.is-single-day-event .rundown-tabs,
.is-single-day-event #tab-day2 {
  display: none !important;
}
`;
  if (!cssCode.includes('HARD GUARD SINGLE-DAY')) {
    cssCode += cssRule;
    fs.writeFileSync(cssPath, cssCode, 'utf8');
    console.log('[EnforceGK] timer-chat.css hard guard added!');
  }

  // 3. Update client JS (timer-chat.js)
  console.log('[EnforceGK] 3. Updating timer-chat.js...');
  const clientJsPath = path.join(__dirname, '../src/public/js/timer-chat/timer-chat.js');
  let clientJs = fs.readFileSync(clientJsPath, 'utf8');

  // Ensure applyDayTabUI adds/removes body class and completely hides Day 2
  const oldApplyDayTabRegex = /function applyDayTabUI\(\)\s*\{[\s\S]*?btnDay2\.classList\.toggle\('active',\s*currentDayTab === 'DAY_2'\);\s*\}\s*\}/;

  const newApplyDayTab = `function applyDayTabUI() {
      const btnDay1 = document.getElementById('tab-day1');
      const btnDay2 = document.getElementById('tab-day2');
      const tabsContainer = document.querySelector('.rundown-tabs');

      const ev = currentActiveEvent;
      const isGK = isEventGK(ev ? ev.id : '');

      if (isGK) {
        document.body.classList.add('is-single-day-event');
        currentDayTab = 'DAY_1';
        if (btnDay2) btnDay2.style.display = 'none';
        if (tabsContainer) tabsContainer.style.display = 'none';
        if (btnDay1) btnDay1.classList.add('active');
        if (btnDay2) btnDay2.classList.remove('active');
        rundownItemsDay2 = [];
        try {
          localStorage.setItem('tpm_current_day_tab', 'DAY_1');
          sessionStorage.setItem('tpm_current_day_tab', 'DAY_1');
          localStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
          sessionStorage.removeItem('tpm_rundown_event-hc-tpm-gk-2026_day_2');
          localStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
          sessionStorage.removeItem('tpm_rundown_gk-tpm-stage2_day_2');
        } catch(e){}
        return;
      }

      document.body.classList.remove('is-single-day-event');
      let hasDay2 = false;
      if (ev && ev.sessionState && Array.isArray(ev.sessionState.rundownDay2)) {
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

  if (oldApplyDayTabRegex.test(clientJs)) {
    clientJs = clientJs.replace(oldApplyDayTabRegex, newApplyDayTab);
    console.log('[EnforceGK] applyDayTabUI updated with hard CSS class toggle and absolute GK guard!');
  } else {
    console.warn('[EnforceGK] oldApplyDayTabRegex did not match');
  }

  // Ensure getCurrentRundownList always returns DAY_1 for GK
  const oldGetCurrentRundownRegex = /function getCurrentRundownList\(\)\s*\{\s*return currentDayTab === 'DAY_1' \? rundownItemsDay1 : rundownItemsDay2;\s*\}/;
  const newGetCurrentRundown = `function getCurrentRundownList() {
      if (isEventGK()) {
        currentDayTab = 'DAY_1';
        return rundownItemsDay1;
      }
      return currentDayTab === 'DAY_1' ? rundownItemsDay1 : rundownItemsDay2;
    }`;

  if (oldGetCurrentRundownRegex.test(clientJs)) {
    clientJs = clientJs.replace(oldGetCurrentRundownRegex, newGetCurrentRundown);
    console.log('[EnforceGK] getCurrentRundownList updated!');
  }

  // Ensure initial renderRundownItems enforces single day class on GK
  const oldRenderItemsRegex = /function renderRundownItems\(\)\s*\{/;
  const newRenderItems = `function renderRundownItems() {
      if (isEventGK()) {
        currentDayTab = 'DAY_1';
        document.body.classList.add('is-single-day-event');
        const b2 = document.getElementById('tab-day2');
        const tc = document.querySelector('.rundown-tabs');
        if (b2) b2.style.display = 'none';
        if (tc) tc.style.display = 'none';
      }`;

  if (!clientJs.includes("document.body.classList.add('is-single-day-event');") && oldRenderItemsRegex.test(clientJs)) {
    clientJs = clientJs.replace(oldRenderItemsRegex, newRenderItems);
    console.log('[EnforceGK] renderRundownItems updated with initial guard!');
  }

  fs.writeFileSync(clientJsPath, clientJs, 'utf8');
  console.log('[EnforceGK] timer-chat.js updated!');

  // 4. Update Cloud Firestore
  console.log('[EnforceGK] 4. Updating Cloud Firestore...');
  const cloudDoc = await fb.loadDoc('timer_chat');
  if (cloudDoc && cloudDoc.events) {
    const gk = cloudDoc.events['event-hc-tpm-gk-2026'];
    if (gk) {
      if (!gk.sessionState) gk.sessionState = {};
      gk.sessionState.rundownDay1 = mr.RUNDOWN_GK_DAY_1;
      gk.sessionState.rundownDay2 = [];
      gk.sessionState.currentDayTab = 'DAY_1';
      gk.sessionState.completedSessionsDay2 = [];
      gk.sessionState.updatedAt = new Date().toISOString();
    }
    // Set active event to GK
    cloudDoc.activeEventId = 'event-hc-tpm-gk-2026';
    if (!cloudDoc.sessionState) cloudDoc.sessionState = {};
    cloudDoc.sessionState.rundownDay1 = mr.RUNDOWN_GK_DAY_1;
    cloudDoc.sessionState.rundownDay2 = [];
    cloudDoc.sessionState.currentDayTab = 'DAY_1';
    cloudDoc.sessionState.completedSessionsDay2 = [];

    const ok = await fb._performNetworkSave('timer_chat', cloudDoc);
    console.log('[EnforceGK] Cloud Firestore saved result:', ok);
  }

  // 5. Update local disk storage
  console.log('[EnforceGK] 5. Updating data/timer-chat-storage.json...');
  const localStoragePath = path.join(__dirname, '../data/timer-chat-storage.json');
  if (fs.existsSync(localStoragePath)) {
    const localData = JSON.parse(fs.readFileSync(localStoragePath, 'utf8'));
    if (localData && localData.events && localData.events['event-hc-tpm-gk-2026']) {
      localData.events['event-hc-tpm-gk-2026'].sessionState.rundownDay1 = mr.RUNDOWN_GK_DAY_1;
      localData.events['event-hc-tpm-gk-2026'].sessionState.rundownDay2 = [];
      localData.events['event-hc-tpm-gk-2026'].sessionState.currentDayTab = 'DAY_1';
      localData.events['event-hc-tpm-gk-2026'].sessionState.completedSessionsDay2 = [];
      localData.activeEventId = 'event-hc-tpm-gk-2026';
      fs.writeFileSync(localStoragePath, JSON.stringify(localData, null, 2), 'utf8');
      console.log('[EnforceGK] Local storage json successfully updated!');
    }
  }

  console.log('[EnforceGK] ALL DONE!');
}

enforceGK().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('[EnforceGK] Error:', err);
  process.exit(1);
});

