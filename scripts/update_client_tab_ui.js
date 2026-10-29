const fs = require('fs');
const file = 'src/public/js/timer-chat/timer-chat.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /function applyDayTabUI\(\)\s*\{[\s\S]*?btnDay2\.classList\.toggle\('active',\s*currentDayTab === 'DAY_2'\);\s*\}\s*\}/;

const replacement = `function applyDayTabUI() {
      const btnDay1 = document.getElementById('tab-day1');
      const btnDay2 = document.getElementById('tab-day2');
      const tabsContainer = document.querySelector('.rundown-tabs');

      // Periksa apakah acara aktif memiliki Day 2
      let hasDay2 = false;
      const ev = currentActiveEvent;
      const evId = (ev && ev.id ? ev.id : '').toLowerCase();
      const evName = (ev && ev.name ? ev.name : '').toLowerCase();
      const evSession = (ev && ev.sessionId ? ev.sessionId : '').toLowerCase();
      const isGK = evId.includes('gk') || evName.includes('gladi kotor') || evSession.includes('gk');

      if (isGK) {
        hasDay2 = false;
      } else if (ev && ev.sessionState && Array.isArray(ev.sessionState.rundownDay2) && ev.sessionState.rundownDay2.length > 0) {
        hasDay2 = true;
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

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated applyDayTabUI in timer-chat.js');
} else {
  console.error('Regex pattern did not match');
}

