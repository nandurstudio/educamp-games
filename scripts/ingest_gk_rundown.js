const fs = require('fs');
const path = require('path');
const firebaseService = require('../src/server/firebase-service');
const timerChatEngine = require('../src/server/timer-chat-engine');

const GK_45_ITEMS = [
  { no: 1, time: "08:30 - 08:35", durMin: 5, sec: 300, title: "Opening MC ( Pray , Indonesia Raya , Kalbe Panca Sradha )", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 2, time: "08:35 - 08:36", durMin: 1, sec: 60, title: "Video : Safety Breafing", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 3, time: "08:36 - 08:37", durMin: 1, sec: 60, title: "Video Journey TPM", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 4, time: "08:37 - 08:38", durMin: 1, sec: 60, title: "Video Rundown ( Day 1 )", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 5, time: "08:38 - 08:39", durMin: 1, sec: 60, title: "Opening Speech Top Management PT Sanghiang Perkasa", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 6, time: "08:39 - 08:40", durMin: 1, sec: 60, title: "Opening Speech JMAC", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 7, time: "08:40 - 09:10", durMin: 30, sec: 1800, title: "Presentation Chapter 1,2,3,12", pic: "Mrs. Verdiana Zahroh Narendra Bawanti", area: "KNLC A-C", isYellow: false },
  { no: 8, time: "09:10 - 09:15", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 9, time: "09:15 - 09:30", durMin: 15, sec: 900, title: "Presentation Chapter 4 Focused Improvement", pic: "Mr. Dyanza Arya Perdana", area: "KNLC A-C", isYellow: false },
  { no: 10, time: "09:30 - 09:45", durMin: 15, sec: 900, title: "Presentation Chapter 5 Autonomous Maintenance", pic: "Mr. Agung Joko Suprihanto", area: "KNLC A-C", isYellow: false },
  { no: 11, time: "09:45 - 09:50", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 12, time: "09:50 - 10:05", durMin: 15, sec: 900, title: "Presentation Chapter 6 Planned Maintenance", pic: "Mr. Cahyo Agung Martanto", area: "KNLC A-C", isYellow: false },
  { no: 13, time: "10:05 - 10:20", durMin: 15, sec: 900, title: "Presentation Chapter 7 Quality Maintenance", pic: "Mrs. Sri Rejeki", area: "KNLC A-C", isYellow: false },
  { no: 14, time: "10:20 - 10:25", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 15, time: "10:25 - 10:40", durMin: 15, sec: 900, title: "Presentation Chapter 8 Early Management", pic: "Mr. Sukaryadi", area: "KNLC A-C", isYellow: false },
  { no: 16, time: "10:40 - 10:55", durMin: 15, sec: 900, title: "Presentation Chapter 9 Education & Training", pic: "Mr. Andreas Hari Listanto", area: "KNLC A-C", isYellow: false },
  { no: 17, time: "10:55 - 11:00", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 18, time: "11:00 - 11:15", durMin: 15, sec: 900, title: "Presentation Chapter 10 Office & Administration", pic: "Mr. Priyo Anarkie", area: "KNLC A-C", isYellow: false },
  { no: 19, time: "11:15 - 11:30", durMin: 15, sec: 900, title: "Presentation Chapter 11 Safety, Health & Environtment", pic: "Mr. Ainurrofik", area: "KNLC A-C", isYellow: false },
  { no: 20, time: "11:30 - 11:35", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 21, time: "11:35 - 13:00", durMin: 85, sec: 5100, title: "Lunch", pic: "-", area: "KNLC D", isYellow: true },
  { no: 22, time: "13:00 - 13:01", durMin: 1, sec: 60, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 23, time: "13:01 - 13:16", durMin: 15, sec: 900, title: "Go to Highcare Area", pic: "-", area: "IBC lt.2 & 3", isYellow: false },
  { no: 24, time: "13:16 - 13:23", durMin: 7, sec: 420, title: "Quick Win 1 : AM & EM ( Achieving Zero Defect & Safety Through AM STEP 6 Implementation )", pic: "Mr. Lilik Sektiawan & Mr. Reki Maulid", area: "IBC lt.2 & 3", isYellow: false },
  { no: 25, time: "13:23 - 13:28", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "IBC lt.2 & 3", isYellow: false },
  { no: 26, time: "13:28 - 13:38", durMin: 10, sec: 600, title: "Go to Packing", pic: "-", area: "Packing Line G", isYellow: false },
  { no: 27, time: "13:38 - 13:45", durMin: 7, sec: 420, title: "Quick Win 2 : QM ( Zero Defect Prevention System: Eliminating Unseal Defects Through Sealing Pressure Measurement )", pic: "Mr. Budy Sutrisno", area: "Packing Line G", isYellow: false },
  { no: 28, time: "13:45 - 13:50", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "Packing Line G", isYellow: false },
  { no: 29, time: "13:50 - 13:55", durMin: 5, sec: 300, title: "Prepare to next Quickwin", pic: "-", area: "Packing Robot", isYellow: false },
  { no: 30, time: "13:55 - 14:02", durMin: 7, sec: 420, title: "Quick Win 3 :PM & ET ( Reducing Mechanical Stress, Bending, Twisting on Palletizing Robot Cable, through Wireless 1/0 and sling ring trough Maintenance Profesional Program )", pic: "Mr. Joko Suprianto & Mr. Dimas Riyantono", area: "Packing Robot", isYellow: false },
  { no: 31, time: "14:02 - 14:07", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "Packing Robot", isYellow: false },
  { no: 32, time: "14:07 - 14:17", durMin: 10, sec: 600, title: "Go to View Gallery", pic: "-", area: "View Gallery", isYellow: false },
  { no: 33, time: "14:17 - 14:24", durMin: 7, sec: 420, title: "Quick Win 4 : EM & OSA ( Trial Integrated Evaluation Report )", pic: "Mr. Dimas JP", area: "View Gallery", isYellow: false },
  { no: 34, time: "14:24 - 14:29", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 35, time: "14:29 - 14:31", durMin: 2, sec: 120, title: "Prepare to next Quickwin", pic: "-", area: "View Gallery", isYellow: false },
  { no: 36, time: "14:31 - 14:38", durMin: 7, sec: 420, title: "Quick Win 5 : FI ( OMEGA: Turning Operational Complexity into Strategic Clarity )", pic: "Ms. Fifi", area: "View Gallery", isYellow: false },
  { no: 37, time: "14:38 - 14:43", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 38, time: "14:43 - 14:45", durMin: 2, sec: 120, title: "Prepare next Quickwin", pic: "-", area: "View Gallery", isYellow: false },
  { no: 39, time: "14:45 - 14:52", durMin: 7, sec: 420, title: "Quick Win 6 : SHE ( Transforming Food Surplus into Sustainability Impact )", pic: "Mr. Isa Dwiyono", area: "View Gallery", isYellow: false },
  { no: 40, time: "14:52 - 14:57", durMin: 5, sec: 300, title: "Question & Answer", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 41, time: "14:57 - 15:02", durMin: 5, sec: 300, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 42, time: "15:02 - 15:12", durMin: 10, sec: 600, title: "Break", pic: "-", area: "KNLC D", isYellow: true },
  { no: 43, time: "15:12 - 15:13", durMin: 1, sec: 60, title: 'Lecture : " World Class TPM Benchmarking – Best Practices in Cross-Site Collaboration " & Feedback', pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 44, time: "15:13 - 15:18", durMin: 5, sec: 300, title: "Closing Speech", pic: "Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 45, time: "15:18 - 15:23", durMin: 5, sec: 300, title: "Closing MC & Pray", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false }
];

async function ingest() {
  await timerChatEngine.ensureHydrated();
  console.log('[Ingest] Hydrated. Updating Gladi Kotor event...');

  const evId = 'event-hc-tpm-gk-2026';
  const ev = timerChatEngine.events[evId];
  if (!ev) {
    console.error(`[Ingest] Error: ${evId} not found in timerChatEngine.events!`);
    return;
  }

  if (!ev.sessionState) ev.sessionState = {};
  ev.sessionState.rundownDay1 = GK_45_ITEMS;
  ev.sessionState.currentDayTab = 'DAY_1';
  ev.sessionState.updatedAt = new Date().toISOString();

  // Jika Gladi Kotor sedang aktif, update juga state aktif
  if (timerChatEngine.activeEventId === evId) {
    timerChatEngine.sessionState.rundownDay1 = GK_45_ITEMS;
  }

  // Simpan ke local disk
  timerChatEngine.saveLocalDisk();
  console.log('[Ingest] Saved to local disk data/timer-chat-storage.json');

  // Simpan langsung ke Cloud Firestore doc 'timer_chat'
  if (firebaseService.isAvailable()) {
    console.log('[Ingest] Saving directly to Cloud Firestore...');
    const exportData = timerChatEngine.exportData();
    await firebaseService.saveDoc('timer_chat', exportData, true);
    console.log('[Ingest] SUCCESS: Ingested 45 rundown items directly to Cloud Firestore!');
  } else {
    console.warn('[Ingest] Firebase service is not available!');
  }

  console.log('[Ingest] Ingestion completed. 45 items stored and synced!');
}

ingest().then(() => process.exit(0)).catch(err => {
  console.error('[Ingest] Fatal error:', err);
  process.exit(1);
});
