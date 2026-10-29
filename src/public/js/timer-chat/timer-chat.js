// =========================================================================
// === DATA MASTER RUNDOWN RESMI DARI DOKUMEN HEALTH CHECK TPM STAGE 2 ===
// =========================================================================

// --- 0. RUNDOWN GLADI KOTOR / GK (Friday, October 30, 2026) ---
const RUNDOWN_GK_DAY_1 = [
  { no: 1, time: "08:30 - 08:35", durMin: 5, sec: 300, title: "Opening MC (Pray, Indonesia Raya, Kalbe Panca Sradha)", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 2, time: "08:35 - 08:40", durMin: 5, sec: 300, title: "Video : Safety Briefing", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 3, time: "08:40 - 08:45", durMin: 5, sec: 300, title: "Video Journey TPM", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 4, time: "08:45 - 08:50", durMin: 5, sec: 300, title: "Video Rundown (Day 1)", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 5, time: "08:50 - 08:51", durMin: 1, sec: 60, title: "Opening Speech Top Management PT Sanghiang Perkasa", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 6, time: "08:51 - 08:52", durMin: 1, sec: 60, title: "Opening Speech JMAC", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 7, time: "08:52 - 09:22", durMin: 30, sec: 1800, title: "Presentation Chapter 1,2,3,12", pic: "Mrs. Verdiana Zahroh Narendra Bawanti", area: "KNLC A-C", isYellow: false },
  { no: 8, time: "09:22 - 09:27", durMin: 5, sec: 300, title: "Question & Answer Chapter 1,2,3,12", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 9, time: "09:27 - 09:42", durMin: 15, sec: 900, title: "Break (Day 1)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 10, time: "09:42 - 09:57", durMin: 15, sec: 900, title: "Presentation Chapter 4 Focused Improvement", pic: "Mr. Dyanza Arya Perdana", area: "KNLC A-C", isYellow: false },
  { no: 11, time: "09:57 - 10:12", durMin: 15, sec: 900, title: "Presentation Chapter 5 Autonomous Maintenance", pic: "Mr. Agung Joko Suprihanto", area: "KNLC A-C", isYellow: false },
  { no: 12, time: "10:12 - 10:17", durMin: 5, sec: 300, title: "Question & Answer Chapter 4 & 5", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 13, time: "10:17 - 10:32", durMin: 15, sec: 900, title: "Presentation Chapter 6 Planned Maintenance", pic: "Mr. Cahyo Agung Martanto", area: "KNLC A-C", isYellow: false },
  { no: 14, time: "10:32 - 10:47", durMin: 15, sec: 900, title: "Presentation Chapter 7 Quality Maintenance", pic: "Mrs. Sri Rejeki", area: "KNLC A-C", isYellow: false },
  { no: 15, time: "10:47 - 10:52", durMin: 5, sec: 300, title: "Question & Answer Chapter 6 & 7", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 16, time: "10:52 - 10:53", durMin: 1, sec: 60, title: "Lunch (RD Day 1)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 17, time: "10:53 - 10:54", durMin: 1, sec: 60, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 18, time: "10:54 - 11:09", durMin: 15, sec: 900, title: "Go to Highcare Area", pic: "-", area: "IBC lt.2 & 3", isYellow: false },
  { no: 19, time: "11:09 - 11:16", durMin: 7, sec: 420, title: "Quick Win 1 : AM & EM (Achieving Zero Defect & Safety Through AM STEP 6 Implementation)", pic: "Mr. Lilik Sektiawan & Mr. Reki Maulid", area: "IBC lt.2 & 3", isYellow: false },
  { no: 20, time: "11:16 - 11:21", durMin: 5, sec: 300, title: "Question & Answer Quick Win 1", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "IBC lt.2 & 3", isYellow: false },
  { no: 21, time: "11:21 - 11:31", durMin: 10, sec: 600, title: "Go to Packing", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 22, time: "11:31 - 13:00", durMin: 89, sec: 5340, title: "Lunch (RD GK)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 23, time: "13:00 - 13:07", durMin: 7, sec: 420, title: "Quick Win 2 : QM (Zero Defect Prevention System: Eliminating Unseal Defects Through Sealing Pressure Measurement)", pic: "Mr. Budy Sutrisno", area: "Packing Line G", isYellow: false },
  { no: 24, time: "13:07 - 13:12", durMin: 5, sec: 300, title: "Question & Answer Quick Win 2", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "Packing Line G", isYellow: false },
  { no: 25, time: "13:12 - 13:17", durMin: 5, sec: 300, title: "Prepare to next Quickwin", pic: "-", area: "Packing Line G", isYellow: false },
  { no: 26, time: "13:17 - 13:24", durMin: 7, sec: 420, title: "Quick Win 3 : PM & ET (Reducing Mechanical Stress, Bending, Twisting on Palletizing Robot Cable)", pic: "Mr. Joko Suprihanto & Mr. Dimas Riyantono", area: "Packing Robot", isYellow: false },
  { no: 27, time: "13:24 - 13:29", durMin: 5, sec: 300, title: "Question & Answer Quick Win 3", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "Packing Robot", isYellow: false },
  { no: 28, time: "13:29 - 13:39", durMin: 10, sec: 600, title: "Back to Main Room", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 29, time: "13:39 - 13:40", durMin: 1, sec: 60, title: "Break (Day 1)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 30, time: "13:40 - 13:45", durMin: 5, sec: 300, title: "Closing Day 1", pic: "Mr. Fajar Fauzan", area: "KNLC A-C", isYellow: false },
  { no: 31, time: "13:45 - 13:50", durMin: 5, sec: 300, title: "Closing MC & Pray", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false }
];

const RUNDOWN_GK_DAY_2 = [
  { no: 1, time: "13:50 - 13:55", durMin: 5, sec: 300, title: "Opening MC", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 2, time: "13:55 - 14:00", durMin: 5, sec: 300, title: "Video Rundown (Day 2)", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 3, time: "14:00 - 14:15", durMin: 15, sec: 900, title: "Presentation Chapter 8 Early Management", pic: "Mr. Sukaryadi", area: "KNLC A-C", isYellow: false },
  { no: 4, time: "14:15 - 14:30", durMin: 15, sec: 900, title: "Presentation Chapter 9 Education & Training", pic: "Mr. Andreas Hari Listanto", area: "KNLC A-C", isYellow: false },
  { no: 5, time: "14:30 - 14:35", durMin: 5, sec: 300, title: "Question & Answer Chapter 8 & 9", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 6, time: "14:35 - 14:36", durMin: 1, sec: 60, title: "Break (Day 2)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 7, time: "14:36 - 14:51", durMin: 15, sec: 900, title: "Presentation Chapter 10 Office & Administration", pic: "Mr. Priyo Anarkie", area: "KNLC A-C", isYellow: false },
  { no: 8, time: "14:51 - 15:06", durMin: 15, sec: 900, title: "Presentation Chapter 11 Safety, Health & Environtment", pic: "Mr. Ainurrofik", area: "KNLC A-C", isYellow: false },
  { no: 9, time: "15:06 - 15:11", durMin: 5, sec: 300, title: "Question & Answer Chapter 10 & 11", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 10, time: "15:11 - 15:16", durMin: 5, sec: 300, title: "Go to View Gallery", pic: "-", area: "View Gallery", isYellow: false },
  { no: 11, time: "15:16 - 15:23", durMin: 7, sec: 420, title: "Quick Win 4 : EM & OSA (Trial Integrated Evaluation Report)", pic: "Mr. Dimas JP", area: "View Gallery", isYellow: false },
  { no: 12, time: "15:23 - 15:28", durMin: 5, sec: 300, title: "Question & Answer Quick Win 4", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 13, time: "15:28 - 15:33", durMin: 5, sec: 300, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 14, time: "15:33 - 15:34", durMin: 1, sec: 60, title: "Lunch (RD Day 2)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 15, time: "15:34 - 15:35", durMin: 1, sec: 60, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 16, time: "15:35 - 15:36", durMin: 1, sec: 60, title: "Go to View Gallery", pic: "-", area: "View Gallery", isYellow: false },
  { no: 17, time: "15:36 - 15:43", durMin: 7, sec: 420, title: "Quick Win 5 : FI (OMEGA: Turning Operational Complexity into Strategic Clarity)", pic: "Ms. Fifi", area: "View Gallery", isYellow: false },
  { no: 18, time: "15:43 - 15:48", durMin: 5, sec: 300, title: "Question & Answer Quick Win 5", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 19, time: "15:48 - 15:50", durMin: 2, sec: 120, title: "Prepare next Quickwin", pic: "-", area: "View Gallery", isYellow: false },
  { no: 20, time: "15:50 - 15:57", durMin: 7, sec: 420, title: "Quick Win 6 : SHE (Transforming Food Surplus into Sustainability Impact)", pic: "Mr. Isa Dwiyono", area: "View Gallery", isYellow: false },
  { no: 21, time: "15:57 - 16:02", durMin: 5, sec: 300, title: "Question & Answer Quick Win 6", pic: "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki", area: "View Gallery", isYellow: false },
  { no: 22, time: "16:02 - 16:07", durMin: 5, sec: 300, title: "Back to Main Room", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false },
  { no: 23, time: "16:07 - 16:17", durMin: 10, sec: 600, title: "Break (Day 2)", pic: "KNLC D", area: "KNLC D", isYellow: true },
  { no: 24, time: "16:17 - 16:18", durMin: 1, sec: 60, title: "Lecture & Feedback", pic: "-", area: "KNLC A-C", isYellow: false },
  { no: 25, time: "16:18 - 16:23", durMin: 5, sec: 300, title: "Closing Speech", pic: "Mr. Yudha Agus Tri Basuki", area: "KNLC A-C", isYellow: false },
  { no: 26, time: "16:23 - 16:28", durMin: 5, sec: 300, title: "Closing MC & Pray", pic: "Ms. Anisa Septia Azhara", area: "KNLC A-C", isYellow: false }
];

// =========================================================================
// 2. GLADI RESIK / GR (Monday, November 2, 2026)
// =========================================================================

// --- 1. RUNDOWN GLADI RESIK / GR (Monday, November 2, 2026) ---
const RUNDOWN_GR_DAY_1 = [
  {
    "no": 1,
    "time": "08:30 - 08:35",
    "durMin": 5,
    "sec": 300,
    "title": "Opening MC (Pray, Indonesia Raya, Kalbe Panca Sradha)",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 2,
    "time": "08:35 - 08:40",
    "durMin": 5,
    "sec": 300,
    "title": "Video : Safety Briefing",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 3,
    "time": "08:40 - 08:45",
    "durMin": 5,
    "sec": 300,
    "title": "Video Journey TPM",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 4,
    "time": "08:45 - 08:50",
    "durMin": 5,
    "sec": 300,
    "title": "Video Rundown (Day 1)",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 5,
    "time": "08:50 - 08:51",
    "durMin": 1,
    "sec": 60,
    "title": "Opening Speech Top Management PT Sanghiang Perkasa",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 6,
    "time": "08:51 - 08:52",
    "durMin": 1,
    "sec": 60,
    "title": "Opening Speech JMAC",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 7,
    "time": "08:52 - 09:22",
    "durMin": 30,
    "sec": 1800,
    "title": "Presentation Chapter 1,2,3,12",
    "pic": "Mrs. Verdiana Zahroh Narendra Bawanti",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 8,
    "time": "09:22 - 09:27",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Chapter 1,2,3,12",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 9,
    "time": "09:27 - 09:42",
    "durMin": 15,
    "sec": 900,
    "title": "Break (Day 1)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 10,
    "time": "09:42 - 09:57",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 4 Focused Improvement",
    "pic": "Mr. Dyanza Arya Perdana",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 11,
    "time": "09:57 - 10:12",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 5 Autonomous Maintenance",
    "pic": "Mr. Agung Joko Suprihanto",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 12,
    "time": "10:12 - 10:17",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Chapter 4 & 5",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 13,
    "time": "10:17 - 10:32",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 6 Planned Maintenance",
    "pic": "Mr. Cahyo Agung Martanto",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 14,
    "time": "10:32 - 10:47",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 7 Quality Maintenance",
    "pic": "Mrs. Sri Rejeki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 15,
    "time": "10:47 - 10:52",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Chapter 6 & 7",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 16,
    "time": "10:52 - 10:53",
    "durMin": 1,
    "sec": 60,
    "title": "Lunch (RD Day 1)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 17,
    "time": "10:53 - 10:54",
    "durMin": 1,
    "sec": 60,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 18,
    "time": "10:54 - 11:09",
    "durMin": 15,
    "sec": 900,
    "title": "Go to Highcare Area",
    "pic": "-",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 19,
    "time": "11:09 - 11:16",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 1 : AM & EM (Achieving Zero Defect & Safety Through AM STEP 6 Implementation)",
    "pic": "Mr. Lilik Sektiawan & Mr. Reki Maulid",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 20,
    "time": "11:16 - 11:21",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 1",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 21,
    "time": "11:21 - 11:31",
    "durMin": 10,
    "sec": 600,
    "title": "Go to Packing",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 22,
    "time": "11:31 - 12:31",
    "durMin": 60,
    "sec": 3600,
    "title": "Lunch (RD GR)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 23,
    "time": "12:31 - 12:38",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 2 : QM (Zero Defect Prevention System: Eliminating Unseal Defects Through Sealing Pressure Measurement)",
    "pic": "Mr. Budy Sutrisno",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 24,
    "time": "12:38 - 12:43",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 2",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 25,
    "time": "12:43 - 12:48",
    "durMin": 5,
    "sec": 300,
    "title": "Prepare to next Quickwin",
    "pic": "-",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 26,
    "time": "12:48 - 12:55",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 3 : PM & ET (Reducing Mechanical Stress, Bending, Twisting on Palletizing Robot Cable)",
    "pic": "Mr. Joko Suprihanto & Mr. Dimas Riyantono",
    "area": "Packing Robot",
    "isYellow": false
  },
  {
    "no": 27,
    "time": "12:55 - 13:00",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 3",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "Packing Robot",
    "isYellow": false
  },
  {
    "no": 28,
    "time": "13:00 - 13:10",
    "durMin": 10,
    "sec": 600,
    "title": "Back to Main Room",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 29,
    "time": "13:10 - 13:11",
    "durMin": 1,
    "sec": 60,
    "title": "Break (Day 1)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 30,
    "time": "13:11 - 13:16",
    "durMin": 5,
    "sec": 300,
    "title": "Closing Day 1",
    "pic": "Mr. Fajar Fauzan",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 31,
    "time": "13:16 - 13:21",
    "durMin": 5,
    "sec": 300,
    "title": "Closing MC & Pray",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  }
];

const RUNDOWN_GR_DAY_2 = [
  {
    "no": 1,
    "time": "13:21 - 13:26",
    "durMin": 5,
    "sec": 300,
    "title": "Opening MC",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 2,
    "time": "13:26 - 13:31",
    "durMin": 5,
    "sec": 300,
    "title": "Video Rundown (Day 2)",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 3,
    "time": "13:31 - 13:46",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 8 Early Management",
    "pic": "Mr. Sukaryadi",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 4,
    "time": "13:46 - 14:01",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 9 Education & Training",
    "pic": "Mr. Andreas Hari Listanto",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 5,
    "time": "14:01 - 14:06",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Chapter 8 & 9",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 6,
    "time": "14:06 - 14:07",
    "durMin": 1,
    "sec": 60,
    "title": "Break (Day 2)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 7,
    "time": "14:07 - 14:22",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 10 Office & Administration",
    "pic": "Mr. Priyo Anarkie",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 8,
    "time": "14:22 - 14:37",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 11 Safety, Health & Environtment",
    "pic": "Mr. Ainurrofik",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 9,
    "time": "14:37 - 14:42",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Chapter 10 & 11",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 10,
    "time": "14:42 - 14:47",
    "durMin": 5,
    "sec": 300,
    "title": "Go to View Gallery",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 11,
    "time": "14:47 - 14:54",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 4 : EM & OSA (Trial Integrated Evaluation Report)",
    "pic": "Mr. Dimas JP",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 12,
    "time": "14:54 - 14:59",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 4",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 13,
    "time": "14:59 - 15:04",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 14,
    "time": "15:04 - 15:05",
    "durMin": 1,
    "sec": 60,
    "title": "Lunch (RD Day 2)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 15,
    "time": "15:05 - 15:06",
    "durMin": 1,
    "sec": 60,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 16,
    "time": "15:06 - 15:07",
    "durMin": 1,
    "sec": 60,
    "title": "Go to View Gallery",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 17,
    "time": "15:07 - 15:14",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 5 : FI (OMEGA: Turning Operational Complexity into Strategic Clarity)",
    "pic": "Ms. Fifi",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 18,
    "time": "15:14 - 15:19",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 5",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 19,
    "time": "15:19 - 15:21",
    "durMin": 2,
    "sec": 120,
    "title": "Prepare next Quickwin",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 20,
    "time": "15:21 - 15:28",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 6 : SHE (Transforming Food Surplus into Sustainability Impact)",
    "pic": "Mr. Isa Dwiyono",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 21,
    "time": "15:28 - 15:33",
    "durMin": 5,
    "sec": 300,
    "title": "Question & Answer Quick Win 6",
    "pic": "Mr. Fajar Fauzan & Mr. Yudha Agus Tri Basuki",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 22,
    "time": "15:33 - 15:38",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 23,
    "time": "15:38 - 15:53",
    "durMin": 15,
    "sec": 900,
    "title": "Break (Day 2)",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 24,
    "time": "15:53 - 15:54",
    "durMin": 1,
    "sec": 60,
    "title": "Lecture & Feedback",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 25,
    "time": "15:54 - 15:59",
    "durMin": 5,
    "sec": 300,
    "title": "Closing Speech",
    "pic": "Mr. Yudha Agus Tri Basuki",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 26,
    "time": "15:59 - 16:04",
    "durMin": 5,
    "sec": 300,
    "title": "Closing MC & Pray",
    "pic": "Ms. Anisa Septia Azhara",
    "area": "KNLC A-C",
    "isYellow": false
  }
];

// --- 2. RUNDOWN RESMI HEALTH CHECK STAGE 2 TPM HARI-H (Tuesday-Wednesday, November 3-4, 2026) ---
const RUNDOWN_OFFICIAL_DAY_1 = [
  {
    "no": 1,
    "time": "08:30 - 08:35",
    "durMin": 5,
    "sec": 300,
    "title": "Opening MC (Pray, Indonesia Raya, Kalbe Panca Sradha)",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 2,
    "time": "08:35 - 08:40",
    "durMin": 5,
    "sec": 300,
    "title": "Video : Safety Briefing",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 3,
    "time": "08:40 - 08:45",
    "durMin": 5,
    "sec": 300,
    "title": "Video Journey TPM",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 4,
    "time": "08:45 - 08:50",
    "durMin": 5,
    "sec": 300,
    "title": "Video Rundown (Day 1)",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 5,
    "time": "08:50 - 08:55",
    "durMin": 5,
    "sec": 300,
    "title": "Opening Speech Top Management PT Sanghiang Perkasa",
    "pic": "Mr. Andi Chendra (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 6,
    "time": "08:55 - 09:00",
    "durMin": 5,
    "sec": 300,
    "title": "Opening Speech JMAC",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 7,
    "time": "09:00 - 09:30",
    "durMin": 30,
    "sec": 1800,
    "title": "Presentation Chapter 1,2,3,12",
    "pic": "Mrs. Verdiana Zahroh Narendra Bawanti (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 8,
    "time": "09:30 - 10:00",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Chapter 1,2,3,12",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 9,
    "time": "10:00 - 10:15",
    "durMin": 15,
    "sec": 900,
    "title": "Break",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 10,
    "time": "10:15 - 10:30",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 4 Focused Improvement",
    "pic": "Mr. Dyanza Arya Perdana (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 11,
    "time": "10:30 - 10:45",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 5 Autonomous Maintenance",
    "pic": "Mr. Agung Joko Suprihanto (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 12,
    "time": "10:45 - 11:15",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Chapter 4 & 5",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 13,
    "time": "11:15 - 11:30",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 6 Planned Maintenance",
    "pic": "Mr. Cahyo Agung Martanto (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 14,
    "time": "11:30 - 11:45",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 7 Quality Maintenance",
    "pic": "Mrs. Sri Rejeki (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 15,
    "time": "11:45 - 12:15",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Chapter 6 & 7",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 16,
    "time": "12:15 - 13:15",
    "durMin": 60,
    "sec": 3600,
    "title": "Lunch",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 17,
    "time": "13:15 - 13:20",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 18,
    "time": "13:20 - 13:35",
    "durMin": 15,
    "sec": 900,
    "title": "Go to Highcare Area",
    "pic": "-",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 19,
    "time": "13:35 - 13:42",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 1 : AM & EM (Achieving Zero Defect & Safety Through AM STEP 6 Implementation)",
    "pic": "Mr. Lilik Sektiawan & Mr. Reki Maulid (Interpreter: Mr. Arief)",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 20,
    "time": "13:42 - 14:12",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 1",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "IBC lt.2 & 3",
    "isYellow": false
  },
  {
    "no": 21,
    "time": "14:12 - 14:22",
    "durMin": 10,
    "sec": 600,
    "title": "Go to Packing",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 22,
    "time": "14:22 - 14:29",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 2 : QM (Zero Defect Prevention System: Eliminating Unseal Defects Through Sealing Pressure Measurement)",
    "pic": "Mr. Budy Sutrisno (Interpreter: Mr. Arief)",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 23,
    "time": "14:29 - 14:59",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 2",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 24,
    "time": "14:59 - 15:04",
    "durMin": 5,
    "sec": 300,
    "title": "Prepare to next Quickwin",
    "pic": "-",
    "area": "Packing Line G",
    "isYellow": false
  },
  {
    "no": 25,
    "time": "15:04 - 15:11",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 3 : PM & ET (Reducing Mechanical Stress, Bending, Twisting on Palletizing Robot Cable)",
    "pic": "Mr. Joko Suprihanto & Mr. Dimas Riyantono (Interpreter: Mr. Arief)",
    "area": "Packing Robot",
    "isYellow": false
  },
  {
    "no": 26,
    "time": "15:11 - 15:41",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 3",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "Packing Robot",
    "isYellow": false
  },
  {
    "no": 27,
    "time": "15:41 - 15:51",
    "durMin": 10,
    "sec": 600,
    "title": "Back to Main Room",
    "pic": "-",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 28,
    "time": "15:51 - 16:06",
    "durMin": 15,
    "sec": 900,
    "title": "Break",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 29,
    "time": "16:06 - 16:11",
    "durMin": 5,
    "sec": 300,
    "title": "Closing Day 1",
    "pic": "Mr. Fajar Fauzan (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 30,
    "time": "16:11 - 16:16",
    "durMin": 5,
    "sec": 300,
    "title": "Closing MC & Pray",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  }
];

const RUNDOWN_OFFICIAL_DAY_2 = [
  {
    "no": 1,
    "time": "08:30 - 08:35",
    "durMin": 5,
    "sec": 300,
    "title": "Opening MC",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 2,
    "time": "08:35 - 08:40",
    "durMin": 5,
    "sec": 300,
    "title": "Video Rundown (Day 2)",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 3,
    "time": "08:40 - 08:55",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 8 Early Management",
    "pic": "Mr. Sukaryadi (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 4,
    "time": "08:55 - 09:10",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 9 Education & Training",
    "pic": "Mr. Andreas Hari Listanto (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 5,
    "time": "09:10 - 09:40",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Chapter 8 & 9",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 6,
    "time": "09:40 - 09:55",
    "durMin": 15,
    "sec": 900,
    "title": "Break",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 7,
    "time": "09:55 - 10:10",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 10 Office & Administration",
    "pic": "Mr. Priyo Anarkie (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 8,
    "time": "10:10 - 10:25",
    "durMin": 15,
    "sec": 900,
    "title": "Presentation Chapter 11 Safety, Health & Environtment",
    "pic": "Mr. Ainurrofik (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 9,
    "time": "10:25 - 10:55",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Chapter 10 & 11",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 10,
    "time": "10:55 - 11:00",
    "durMin": 5,
    "sec": 300,
    "title": "Go to View Gallery",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 11,
    "time": "11:00 - 11:07",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 4 : EM & OSA (Trial Integrated Evaluation Report)",
    "pic": "Mr. Dimas JP (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 12,
    "time": "11:07 - 11:37",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 4",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 13,
    "time": "11:37 - 11:42",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 14,
    "time": "11:42 - 12:42",
    "durMin": 60,
    "sec": 3600,
    "title": "Lunch",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 15,
    "time": "12:42 - 12:47",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 16,
    "time": "12:47 - 12:52",
    "durMin": 5,
    "sec": 300,
    "title": "Go to View Gallery",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 17,
    "time": "12:52 - 12:59",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 5 : FI (OMEGA: Turning Operational Complexity into Strategic Clarity)",
    "pic": "Ms. Fifi (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 18,
    "time": "12:59 - 13:29",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 5",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 19,
    "time": "13:29 - 13:31",
    "durMin": 2,
    "sec": 120,
    "title": "Prepare next Quickwin",
    "pic": "-",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 20,
    "time": "13:31 - 13:38",
    "durMin": 7,
    "sec": 420,
    "title": "Quick Win 6 : SHE (Transforming Food Surplus into Sustainability Impact)",
    "pic": "Mr. Isa Dwiyono (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 21,
    "time": "13:38 - 14:08",
    "durMin": 30,
    "sec": 1800,
    "title": "Question & Answer Quick Win 6",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "View Gallery",
    "isYellow": false
  },
  {
    "no": 22,
    "time": "14:08 - 14:13",
    "durMin": 5,
    "sec": 300,
    "title": "Back to Main Room",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 23,
    "time": "14:13 - 14:28",
    "durMin": 15,
    "sec": 900,
    "title": "Break",
    "pic": "KNLC D",
    "area": "KNLC D",
    "isYellow": true
  },
  {
    "no": 24,
    "time": "14:28 - 15:58",
    "durMin": 90,
    "sec": 5400,
    "title": "Lecture & Feedback",
    "pic": "Mr. Otsuka (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 25,
    "time": "15:58 - 16:03",
    "durMin": 5,
    "sec": 300,
    "title": "Closing Speech",
    "pic": "Mr. Yudha Agus Tri Basuki (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  },
  {
    "no": 26,
    "time": "16:03 - 16:08",
    "durMin": 5,
    "sec": 300,
    "title": "Closing MC & Pray",
    "pic": "Ms. Anisa Septia Azhara (Interpreter: Mr. Arief)",
    "area": "KNLC A-C",
    "isYellow": false
  }
];

let currentActiveEvent = null;

function getMasterRundownForEvent(eventId, dayKey) {
  const targetId = eventId || (currentActiveEvent ? currentActiveEvent.id : '');
  const ev = currentActiveEvent;
  const normalizedDay = (dayKey || 'DAY_1').toUpperCase();
  const id = (targetId || '').toLowerCase();
  const name = (ev && ev.name ? ev.name.toLowerCase() : '');
  const session = (ev && ev.sessionId ? ev.sessionId.toLowerCase() : '');

  const isGK = id.includes('gk') || name.includes('gladi kotor') || session.includes('gk') || id.includes('kotor');
  const isGR = !isGK && (id.includes('gr') || name.includes('gladi resik') || session.includes('gr') || id.includes('resik'));

  if (isGK) {
    return normalizedDay === 'DAY_1' ? RUNDOWN_GK_DAY_1 : RUNDOWN_GK_DAY_2;
  }
  if (isGR) {
    return normalizedDay === 'DAY_1' ? RUNDOWN_GR_DAY_1 : RUNDOWN_GR_DAY_2;
  }
  return normalizedDay === 'DAY_1' ? RUNDOWN_OFFICIAL_DAY_1 : RUNDOWN_OFFICIAL_DAY_2;
}

const RUNDOWN_DAY_1 = RUNDOWN_GR_DAY_1;
const RUNDOWN_DAY_2 = RUNDOWN_GR_DAY_2;
let currentDayTab = 'DAY_1';
    let pendingSessionSeparator = null;
    let currentActiveSession = {
      title: 'Opening / Standby',
      planSeconds: 300,
      timeLabel: '-'
    };
    let activeTimerState = {
      status: 'IDLE',
      durationSeconds: 300,
      targetEndTime: null,
      remainingSeconds: 300,
      isBlinking: false
    };

    try {
      const savedTab = sessionStorage.getItem('tpm_current_day_tab') || localStorage.getItem('tpm_current_day_tab');
      if (savedTab === 'DAY_1' || savedTab === 'DAY_2') {
        currentDayTab = savedTab;
      }
      const savedActiveSess = sessionStorage.getItem('tpm_active_session') || localStorage.getItem('tpm_active_session');
      if (savedActiveSess) {
        const parsedSess = JSON.parse(savedActiveSess);
        if (parsedSess && typeof parsedSess === 'object' && parsedSess.title) {
          currentActiveSession = parsedSess;
        }
      }
    } catch (e) {}

    function persistLocalSessionMeta() {
      try {
        sessionStorage.setItem('tpm_current_day_tab', currentDayTab);
        localStorage.setItem('tpm_current_day_tab', currentDayTab);
        if (currentActiveSession) {
          const raw = JSON.stringify(currentActiveSession);
          sessionStorage.setItem('tpm_active_session', raw);
          localStorage.setItem('tpm_active_session', raw);
        }
      } catch (e) {}
    }

    // Ambil data rundown dari localStorage atau gunakan default master (terisolasi per event)
    function getStoredRundown(dayKey, eventId) {
      const evId = eventId || (currentActiveEvent ? currentActiveEvent.id : 'default');
      try {
        const key = `tpm_rundown_${evId}_${dayKey.toLowerCase()}`;
        const stored = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Gagal membaca storage rundown, gunakan default');
      }
      return JSON.parse(JSON.stringify(getMasterRundownForEvent(evId, dayKey)));
    }

    function saveStoredRundown(dayKey, items, eventId) {
      const evId = eventId || (currentActiveEvent ? currentActiveEvent.id : 'default');
      try {
        const key = `tpm_rundown_${evId}_${dayKey.toLowerCase()}`;
        const str = JSON.stringify(items);
        sessionStorage.setItem(key, str);
        localStorage.setItem(key, str);
      } catch (e) {
        console.error('Gagal menyimpan storage rundown', e);
      }
    }

    let rundownItemsDay1 = getStoredRundown('DAY_1');
    let rundownItemsDay2 = getStoredRundown('DAY_2');

    function getCurrentRundownList() {
      return currentDayTab === 'DAY_1' ? rundownItemsDay1 : rundownItemsDay2;
    }

    function setCurrentRundownList(items, syncRemote = true) {
      if (currentDayTab === 'DAY_1') {
        rundownItemsDay1 = items;
        saveStoredRundown('DAY_1', items);
      } else {
        rundownItemsDay2 = items;
        saveStoredRundown('DAY_2', items);
      }
      if (syncRemote && typeof emitSessionStateToFirebase === 'function') {
        emitSessionStateToFirebase();
      }
    }

    function getCompletedSessionsForDay(dayKey) {
      try {
        const key = `tpm_completed_sessions_${dayKey.toLowerCase()}`;
        const stored = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return new Set(parsed);
        }
      } catch (e) {
        console.warn('Gagal membaca completed sessions storage', e);
      }
      return new Set();
    }

    function getCompletedSessions() {
      return getCompletedSessionsForDay(currentDayTab);
    }

    function saveCompletedSessionsForDay(dayKey, set, syncRemote = true) {
      try {
        const key = `tpm_completed_sessions_${dayKey.toLowerCase()}`;
        const str = JSON.stringify([...set]);
        sessionStorage.setItem(key, str);
        localStorage.setItem(key, str);
        if (syncRemote && typeof emitSessionStateToFirebase === 'function') {
          emitSessionStateToFirebase();
        }
      } catch (e) {
        console.error('Gagal menyimpan completed sessions storage', e);
      }
    }

    function saveCompletedSessions(set, syncRemote = true) {
      saveCompletedSessionsForDay(currentDayTab, set, syncRemote);
    }

    function markSessionAsCompleted(sessionTitle, markPreviousAsWell = true) {
      if (!sessionTitle || sessionTitle === 'Opening / Standby') return;
      const completedSet = getCompletedSessions();
      completedSet.add(sessionTitle);

      if (markPreviousAsWell) {
        const currentList = getCurrentRundownList();
        const activeIdx = currentList.findIndex(it => it.title === sessionTitle);
        if (activeIdx !== -1) {
          for (let i = 0; i <= activeIdx; i++) {
            if (currentList[i] && currentList[i].title) {
              completedSet.add(currentList[i].title);
            }
          }
        }
      }

      saveCompletedSessions(completedSet, true);
      renderRundownItems();
    }

    function unmarkSessionCompleted(sessionTitle) {
      if (!sessionTitle) return;
      const completedSet = getCompletedSessions();
      completedSet.delete(sessionTitle);
      saveCompletedSessions(completedSet, true);
      renderRundownItems();
      updateRundownVsActualUI();
    }

    function toggleSessionCompleted(sessionTitle) {
      if (!sessionTitle) return;
      const completedSet = getCompletedSessions();
      if (completedSet.has(sessionTitle)) {
        completedSet.delete(sessionTitle);
      } else {
        completedSet.add(sessionTitle);
      }
      saveCompletedSessions(completedSet, true);
      renderRundownItems();
      updateRundownVsActualUI();
    }

    let draggedRundownIndex = null;
    let rundownInsertPositionIndex = null;

    function cleanupRundownDrag() {
      document.body.classList.remove('is-rundown-dragging');
      const container = document.getElementById('rundown-list');
      if (container) {
        container.classList.remove('is-sorting-active');
        container.querySelectorAll('.rundown-row').forEach(r => {
          r.draggable = false;
          r.classList.remove('is-dragging', 'drag-over-top', 'drag-over-bottom');
        });
      }
      draggedRundownIndex = null;
    }

    // Fail-safe global listener jika drag dibatalkan atau dilepas di luar elemen
    window.addEventListener('dragend', cleanupRundownDrag);
    window.addEventListener('drop', cleanupRundownDrag);

    function createInsertDivider(insertIdx) {
      const divider = document.createElement('div');
      divider.className = 'rundown-insert-divider';
      divider.dataset.insertIndex = insertIdx;
      divider.innerHTML = `
        <button type="button" class="btn-insert-between" title="Sisipkan sesi baru di sini">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          <span>Sesi</span>
        </button>
      `;

      const btn = divider.querySelector('.btn-insert-between');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!checkTimerControlPermission()) return;
        openRundownModal('ADD_AT', insertIdx);
      });

      return divider;
    }

    let rundownSearchFilterText = '';

    function renderRundownItems() {
      const container = document.getElementById('rundown-list');
      if (!container) return;
      container.innerHTML = '';
      const items = getCurrentRundownList();
      const completedSet = getCompletedSessions();

      const searchInput = document.getElementById('rundown-search-input');
      const searchCount = document.getElementById('rundown-search-count');
      const clearSearchBtn = document.getElementById('btn-clear-rundown-search');
      const query = (rundownSearchFilterText || (searchInput ? searchInput.value : '')).trim().toLowerCase();

      if (clearSearchBtn) {
        clearSearchBtn.style.display = query ? 'inline-flex' : 'none';
      }

      let displayItems = items.map((it, idx) => ({ ...it, originalIndex: idx }));
      if (query) {
        displayItems = displayItems.filter(it => {
          const t = (it.title || '').toLowerCase();
          const p = (it.pic || '').toLowerCase();
          return t.includes(query) || p.includes(query);
        });
        if (searchCount) {
          searchCount.textContent = `${displayItems.length}/${items.length} sesi`;
        }
      } else {
        if (searchCount) searchCount.textContent = '';
      }

      if (items.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 24px 10px; color: #64748b; font-size: 12px;">
            Belum ada sesi di tab ini. Klik <strong>+ Tambah Sesi</strong> untuk menambahkan.
          </div>
        `;
        return;
      }

      if (displayItems.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 24px 10px; color: #94a3b8; font-size: 12px;">
            Tidak ditemukan sesi dengan kata kunci "<strong>${escapeHtml(query)}</strong>" pada ${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'}.
          </div>
        `;
        return;
      }

      // Pastikan container menerima drop event dari HTML5 DnD (hanya jika tidak sedang search)
      container.ondragover = (e) => {
        if (draggedRundownIndex !== null && !query) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
      };

      displayItems.forEach((item, displayIndex) => {
        const index = item.originalIndex;
        // Divider untuk menyisipkan sesi sebelum item pertama (hanya jika tidak sedang search)
        if (displayIndex === 0 && !query) {
          container.appendChild(createInsertDivider(0));
        }

        const isTimerRunningOrPaused = (typeof activeTimerState !== 'undefined' && activeTimerState && (activeTimerState.status === 'RUNNING' || activeTimerState.status === 'PAUSED'));
        const isCurrentPlaying = currentActiveSession && currentActiveSession.title === item.title && isTimerRunningOrPaused;
        const isPassed = !isCurrentPlaying && completedSet.has(item.title);

        const row = document.createElement('div');
        row.className = `rundown-row ${item.isYellow ? 'is-highlight' : ''} ${isCurrentPlaying ? 'is-current-playing' : ''} ${isPassed ? 'is-passed' : ''}`;
        row.dataset.index = index;
        row.dataset.title = item.title;
        row.draggable = false; // Default false: klik normal tidak akan memicu drag / memudarkan elemen
        if (isPassed) {
          row.title = `Sesi "${item.title}" sudah terlewat / selesai dan tidak dapat dipilih kembali.`;
        }

        row.innerHTML = `
          <div class="rundown-drag-handle" title="${isPassed ? 'Sesi terlewat' : 'Tahan dan geser untuk mengubah urutan sesi'}">
            <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="6" r="1.5"/><circle cx="15.5" cy="6" r="1.5"/><circle cx="8.5" cy="12" r="1.5"/><circle cx="15.5" cy="12" r="1.5"/><circle cx="8.5" cy="18" r="1.5"/><circle cx="15.5" cy="18" r="1.5"/></svg>
          </div>
          <div class="rundown-meta-left">
            <span class="rundown-time-badge">${escapeHtml(item.time || '-')}</span>
            <div class="rundown-activity">
              <span>${escapeHtml(item.title)}</span>
              ${item.pic ? `<span class="rundown-pic">• ${escapeHtml(item.pic)}</span>` : ''}
              ${isPassed ? `<span class="rundown-passed-badge" title="Sesi telah terlewat / selesai">✓ Lewat</span>` : ''}
            </div>
          </div>
          <div class="rundown-meta-right">
            <span class="rundown-dur-pill ${item.isYellow ? 'yellow' : ''}">${item.durMin}m</span>
            <div class="rundown-item-actions">
              <button type="button" class="btn-rundown-action btn-toggle-pass ${isPassed ? 'is-active' : ''}" title="${isPassed ? 'Sesi dicoret/selesai. Klik untuk membatalkan coret (aktifkan kembali)' : 'Klik untuk mencoret / menandai sesi ini selesai'}" data-title="${escapeHtml(item.title)}">
                ${isPassed 
                  ? `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>` 
                  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="width: 12px; height: 12px;"><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="12" r="9"></circle></svg>`
                }
              </button>
              <button class="btn-rundown-action btn-edit" title="Edit sesi ini" data-index="${index}">✎</button>
              <button class="btn-rundown-action btn-del" title="Hapus sesi ini" data-index="${index}">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </div>
        `;

        // Hanya aktifkan draggable saat kursor menekan grip handle titik 6 (hanya jika sesi belum terlewat)
        const dragHandle = row.querySelector('.rundown-drag-handle');
        if (dragHandle && !isPassed) {
          dragHandle.addEventListener('mousedown', (e) => {
            if (!checkTimerControlPermission()) return;
            row.draggable = true;
          });
          dragHandle.addEventListener('mouseup', () => {
            if (draggedRundownIndex === null) {
              row.draggable = false;
            }
          });
          dragHandle.addEventListener('mouseleave', () => {
            if (draggedRundownIndex === null) {
              row.draggable = false;
            }
          });
        }

        // Drag and drop listeners
        row.addEventListener('dragstart', (e) => {
          if (!checkTimerControlPermission() || !row.draggable) {
            e.preventDefault();
            return;
          }
          draggedRundownIndex = index;
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', String(index));
          document.body.classList.add('is-rundown-dragging');
          container.classList.add('is-sorting-active');

          requestAnimationFrame(() => {
            if (draggedRundownIndex !== null) {
              row.classList.add('is-dragging');
            }
          });
        });

        row.addEventListener('dragend', () => {
          cleanupRundownDrag();
        });

        row.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          if (draggedRundownIndex === null || draggedRundownIndex === index) return;
          const rect = row.getBoundingClientRect();
          const isAbove = e.clientY < (rect.top + rect.height / 2);
          if (isAbove) {
            row.classList.add('drag-over-top');
            row.classList.remove('drag-over-bottom');
          } else {
            row.classList.add('drag-over-bottom');
            row.classList.remove('drag-over-top');
          }
        });

        row.addEventListener('dragleave', (e) => {
          if (!row.contains(e.relatedTarget)) {
            row.classList.remove('drag-over-top', 'drag-over-bottom');
          }
        });

        row.addEventListener('drop', (e) => {
          e.preventDefault();
          row.classList.remove('drag-over-top', 'drag-over-bottom');
          if (draggedRundownIndex === null || draggedRundownIndex === index) {
            cleanupRundownDrag();
            return;
          }

          const rect = row.getBoundingClientRect();
          const isAbove = e.clientY < (rect.top + rect.height / 2);

          const currentList = getCurrentRundownList();
          const [movedItem] = currentList.splice(draggedRundownIndex, 1);

          let targetIdx = index;
          if (draggedRundownIndex < index) {
            targetIdx = isAbove ? index - 1 : index;
          } else {
            targetIdx = isAbove ? index : index + 1;
          }
          targetIdx = Math.max(0, Math.min(targetIdx, currentList.length));
          currentList.splice(targetIdx, 0, movedItem);

          currentList.forEach((it, i) => it.no = i + 1);

          // Update active session index jika sesi yang sedang dimainkan ikut bergeser
          if (currentActiveSession && currentActiveSession.title) {
            const newActiveIdx = currentList.findIndex(it => it.title === currentActiveSession.title);
            if (newActiveIdx !== -1) {
              currentActiveSession.index = newActiveIdx;
            }
          }

          cleanupRundownDrag();
          setCurrentRundownList(currentList);
          renderRundownItems();
        });

        // 1-Klik Set Waktu + Siapkan Separator Sesi (Hanya terkirim saat timer di-Play)
        row.addEventListener('click', (e) => {
          if (e.target.closest('.rundown-item-actions') || e.target.closest('.rundown-drag-handle')) return;

          if (!checkTimerControlPermission()) return;

          // JIKA SESI SUDAH TERLEWAT: TIDAK BISA DI-SELECT ULANG!
          if (isPassed) {
            showAlertDialog({
              title: 'Sesi Sedang Dicoret / Selesai',
              message: `Sesi "${item.title}" saat ini berstatus dicoret / selesai. Klik tombol centang/coret di sebelah kanan jika ingin mengaktifkannya kembali.`
            });
            return;
          }

          // Jangan langsung berubah jika timer sedang berjalan! Harus di-stop/pause terlebih dahulu
          // Jangan langsung berubah jika timer sedang berjalan atau dijeda! Harus di-stop terlebih dahulu
          if (activeTimerState.status === 'RUNNING') {
            showAlertDialog({
              title: 'Timer Sedang Berjalan',
              message: `Timer sesi saat ini sedang aktif berjalan! Mohon jeda atau hentikan (Stop) timer terlebih dahulu sebelum berpindah ke sesi "${item.title}".`
            });
            return;
          }

          if (activeTimerState.status === 'PAUSED') {
            showAlertDialog({
              title: 'Timer Sedang Dijeda',
              message: `Timer saat ini sedang dalam status Jeda! Harap tekan tombol "Stop" terlebih dahulu untuk menyelesaikan sesi sebelumnya sebelum berpindah ke sesi "${item.title}".`
            });
            return;
          }

          const totalSec = item.sec || (item.durMin * 60);
          isCustomDurationSelected = false; // Dipilih dari rundown, separator wajib aktif
          
          currentActiveSession = {
            index: index,
            title: item.title,
            planSeconds: totalSec,
            timeLabel: item.time || '-'
          };
          persistLocalSessionMeta();

          socket.emit('TC_SET_DURATION', {
            durationSeconds: totalSec,
            userEmail: currentUser ? currentUser.email : ''
          });

          // Simpan sebagai pending separator, HANYA dikirim saat tombol Mulai (Play) ditekan
          pendingSessionSeparator = {
            eventId: currentActiveEvent ? currentActiveEvent.id : null,
            sessionTitle: `${item.title} (${item.durMin}m)`,
            sessionDuration: totalSec,
            userEmail: currentUser ? currentUser.email : ''
          };

          if (typeof emitSessionStateToFirebase === 'function') {
            emitSessionStateToFirebase();
          }

          // Tandai row aktif di rundown list
          document.querySelectorAll('.rundown-row').forEach(r => r.classList.remove('is-current-playing'));
          row.classList.add('is-current-playing');
          updateRundownVsActualUI();
        });

        // Tombol Toggle Coret / Lewat (Bisa dicoret atau dibatalkan coretnya kapan saja)
        const btnTogglePass = row.querySelector('.btn-toggle-pass');
        if (btnTogglePass) {
          btnTogglePass.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!checkTimerControlPermission()) return;
            toggleSessionCompleted(item.title);
          });
        }

        // Backward-compat jika ada elemen dengan class btn-unpass
        const btnUnpass = row.querySelector('.btn-unpass');
        if (btnUnpass) {
          btnUnpass.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!checkTimerControlPermission()) return;
            unmarkSessionCompleted(item.title);
          });
        }

        // Edit button
        const btnEdit = row.querySelector('.btn-edit');
        if (btnEdit) {
          btnEdit.addEventListener('click', (e) => {
            e.stopPropagation();
            openRundownModal('EDIT', index, item);
          });
        }

        // Delete button
        const btnDel = row.querySelector('.btn-del');
        if (btnDel) {
          btnDel.addEventListener('click', async (e) => {
            e.stopPropagation();
            const ok = await showConfirmDialog({
              title: 'Hapus Sesi Rundown',
              message: `Apakah Anda yakin ingin menghapus sesi "${item.title}" dari rundown?`,
              confirmText: 'Hapus Sesi'
            });
            if (ok) {
              const currentList = getCurrentRundownList();
              currentList.splice(index, 1);
              setCurrentRundownList(currentList);
              renderRundownItems();
            }
          });
        }

        container.appendChild(row);

        // Divider untuk menyisipkan sesi setelah item saat ini
        container.appendChild(createInsertDivider(index + 1));
      });
    }

    // Modal Add / Edit Rundown Item Logic
    const rundownModal = document.getElementById('rundown-item-modal');
    const rundownModalTitle = document.getElementById('rundown-modal-title');
    const rundownItemId = document.getElementById('rundown-item-id');
    const rundownFormTitle = document.getElementById('rundown-form-title');
    const rundownFormTime = document.getElementById('rundown-form-time');
    const rundownFormDur = document.getElementById('rundown-form-dur');
    const rundownFormPic = document.getElementById('rundown-form-pic');
    const rundownFormHighlight = document.getElementById('rundown-form-highlight');
    const btnCloseRundownModal = document.getElementById('btn-close-rundown-modal');
    const btnCancelRundownItem = document.getElementById('btn-cancel-rundown-item');
    const btnSaveRundownItem = document.getElementById('btn-save-rundown-item');
    const btnAddRundownItem = document.getElementById('btn-add-rundown-item');

    function openRundownModal(mode, index = null, item = null) {
      if (mode === 'ADD') {
        rundownInsertPositionIndex = null;
        rundownModalTitle.textContent = `Tambah Sesi (${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'})`;
        rundownItemId.value = '';
        rundownFormTitle.value = '';
        rundownFormTime.value = '';
        rundownFormDur.value = '15';
        rundownFormPic.value = '';
        rundownFormHighlight.checked = false;
      } else if (mode === 'ADD_AT') {
        rundownInsertPositionIndex = typeof index === 'number' ? index : null;
        const posText = rundownInsertPositionIndex !== null ? `(Urutan ke-${rundownInsertPositionIndex + 1})` : '';
        rundownModalTitle.textContent = `Sisipkan Sesi Baru ${posText} - ${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'}`;
        rundownItemId.value = '';
        rundownFormTitle.value = '';
        rundownFormTime.value = '';
        rundownFormDur.value = '15';
        rundownFormPic.value = '';
        rundownFormHighlight.checked = false;
      } else {
        rundownInsertPositionIndex = null;
        rundownModalTitle.textContent = `Edit Sesi (${currentDayTab === 'DAY_1' ? 'Day 1' : 'Day 2'})`;
        rundownItemId.value = String(index);
        rundownFormTitle.value = item.title || '';
        rundownFormTime.value = item.time || '';
        rundownFormDur.value = item.durMin || 15;
        rundownFormPic.value = item.pic || '';
        rundownFormHighlight.checked = !!item.isYellow;
      }
      rundownModal.classList.add('active');
      setTimeout(() => rundownFormTitle.focus(), 150);
    }

    function closeRundownModal() {
      rundownModal.classList.remove('active');
    }

    if (btnAddRundownItem) {
      btnAddRundownItem.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        openRundownModal('ADD');
      });
    }
    if (btnCloseRundownModal) btnCloseRundownModal.addEventListener('click', closeRundownModal);
    if (btnCancelRundownItem) btnCancelRundownItem.addEventListener('click', closeRundownModal);

    if (btnSaveRundownItem) {
      btnSaveRundownItem.addEventListener('click', () => {
        const title = rundownFormTitle.value.trim();
        const time = rundownFormTime.value.trim() || '-';
        const durMin = parseInt(rundownFormDur.value, 10) || 5;
        const pic = rundownFormPic.value.trim();
        const isYellow = rundownFormHighlight.checked;

        if (!title) {
          showAlertDialog({ title: 'Data Belum Lengkap', message: 'Nama sesi rundown tidak boleh kosong.' });
          return;
        }

        const currentList = getCurrentRundownList();
        const editIdxStr = rundownItemId.value;

        if (editIdxStr !== '' && !isNaN(parseInt(editIdxStr, 10))) {
          const idx = parseInt(editIdxStr, 10);
          currentList[idx] = {
            ...currentList[idx],
            title,
            time,
            durMin,
            sec: durMin * 60,
            pic,
            isYellow
          };
        } else if (rundownInsertPositionIndex !== null && !isNaN(rundownInsertPositionIndex)) {
          currentList.splice(rundownInsertPositionIndex, 0, {
            no: rundownInsertPositionIndex + 1,
            title,
            time,
            durMin,
            sec: durMin * 60,
            pic,
            isYellow
          });
          rundownInsertPositionIndex = null;
        } else {
          currentList.push({
            no: currentList.length + 1,
            title,
            time,
            durMin,
            sec: durMin * 60,
            pic,
            isYellow
          });
        }

        currentList.forEach((it, i) => it.no = i + 1);
        setCurrentRundownList(currentList);
        renderRundownItems();
        closeRundownModal();
      });
    }

    function applyDayTabUI() {
      const btnDay1 = document.getElementById('tab-day1');
      const btnDay2 = document.getElementById('tab-day2');
      if (btnDay1 && btnDay2) {
        btnDay1.classList.toggle('active', currentDayTab === 'DAY_1');
        btnDay2.classList.toggle('active', currentDayTab === 'DAY_2');
      }
    }

    document.getElementById('tab-day1').addEventListener('click', () => {
      currentDayTab = 'DAY_1';
      persistLocalSessionMeta();
      applyDayTabUI();
      renderRundownItems();
      if (typeof emitSessionStateToFirebase === 'function') {
        emitSessionStateToFirebase();
      }
    });

    document.getElementById('tab-day2').addEventListener('click', () => {
      currentDayTab = 'DAY_2';
      persistLocalSessionMeta();
      applyDayTabUI();
      renderRundownItems();
      if (typeof emitSessionStateToFirebase === 'function') {
        emitSessionStateToFirebase();
      }
    });

    applyDayTabUI();
    renderRundownItems();

    // Wire Realtime Rundown Search Bar (Debounced to prevent typing stutter)
    const rundownSearchInput = document.getElementById('rundown-search-input');
    const btnClearRundownSearch = document.getElementById('btn-clear-rundown-search');
    let rundownSearchDebounceTimer = null;
    if (rundownSearchInput) {
      rundownSearchInput.addEventListener('input', (e) => {
        rundownSearchFilterText = e.target.value;
        if (rundownSearchDebounceTimer) clearTimeout(rundownSearchDebounceTimer);
        rundownSearchDebounceTimer = setTimeout(() => {
          renderRundownItems();
        }, 120);
      });
    }
    if (btnClearRundownSearch) {
      btnClearRundownSearch.addEventListener('click', () => {
        if (rundownSearchDebounceTimer) clearTimeout(rundownSearchDebounceTimer);
        rundownSearchFilterText = '';
        if (rundownSearchInput) {
          rundownSearchInput.value = '';
          rundownSearchInput.focus();
        }
        renderRundownItems();
      });
    }

    // === MINIMIZED RUNDOWN ACCORDION & DOCKING LOGIC (MOBILE VIEW) ===
    const stageRundownCard = document.getElementById('stage-rundown-card');
    const btnToggleRundown = document.getElementById('btn-toggle-rundown');
    const rundownToggleLabel = document.getElementById('rundown-toggle-label');
    const rundownToggleIcon = document.getElementById('rundown-toggle-icon');
    const rundownHeader = document.getElementById('rundown-header');

    function syncMobileRundownDocking() {
      const isMobile = window.innerWidth <= 920;
      const workspace = document.querySelector('.studio-workspace');
      const timerColumn = document.querySelector('.timer-stage-column');
      if (!workspace || !timerColumn || !stageRundownCard) return;

      if (isMobile) {
        // Pada mobile: pastikan rundown div berada di urutan paling bawah (setelah live chat)
        if (stageRundownCard.parentElement !== workspace) {
          workspace.appendChild(stageRundownCard);
        }
      } else {
        // Pada desktop: kembalikan rundown card ke dalam kolom kiri timer
        if (stageRundownCard.parentElement !== timerColumn) {
          timerColumn.appendChild(stageRundownCard);
        }
      }
    }

    function toggleRundownAccordion(forceState) {
      if (!stageRundownCard) return;
      const willBeCollapsed = (typeof forceState === 'boolean')
        ? forceState
        : !stageRundownCard.classList.contains('is-collapsed');

      stageRundownCard.classList.toggle('is-collapsed', willBeCollapsed);
      if (rundownToggleLabel) {
        rundownToggleLabel.textContent = willBeCollapsed ? 'Buka Rundown' : 'Tutup';
      }
      if (rundownToggleIcon) {
        rundownToggleIcon.style.transform = willBeCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
      }

      // Saat ditutup (collapsed), otomatis scroll chat ke bawah agar area chat yang melebar terisi pesan
      if (willBeCollapsed) {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
          setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }, 60);
        }
      }
    }

    if (btnToggleRundown) {
      btnToggleRundown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRundownAccordion();
      });
    }

    if (rundownHeader) {
      rundownHeader.addEventListener('click', (e) => {
        if (window.innerWidth <= 920 && !e.target.closest('#btn-add-rundown-item') && !e.target.closest('.rundown-tabs')) {
          toggleRundownAccordion();
        }
      });
    }

    window.addEventListener('resize', syncMobileRundownDocking);
    syncMobileRundownDocking();

    // === 2. GLOBAL STATE & NTP SYNC VARIABLES ===
    const socket = io();
    let clockOffset = 0;
    // activeTimerState is initialized at top of file
    let currentUser = null;
    let isUserAdmin = false;
    let isSuperAdmin = false;
    // currentActiveEvent is initialized at top of file

    // Fungsi Penguncian Akses Timer & Rundown untuk Non-Admin
    function updateTimerPermissionUI() {
      const timerControlsBar = document.getElementById('timer-controls-bar');
      const timerLockNotice = document.getElementById('timer-lock-notice');
      const btnOpenUserMgmt = document.getElementById('btn-open-user-mgmt');
      const btnAddRundown = document.getElementById('btn-add-rundown-item');
      const presetPills = document.querySelectorAll('.preset-pill');
      const mobilePresetBtn = document.getElementById('btn-mobile-preset');

      if (btnOpenUserMgmt) {
        btnOpenUserMgmt.style.display = 'none'; // Dipindahkan ke Profile Context Menu
      }
      if (currentUser) {
        renderAuthUI(currentUser);
      }

      if (isUserAdmin) {
        // Full Access untuk Admin / Game Master / Super Admin
        if (timerControlsBar) timerControlsBar.classList.remove('controls-locked');
        if (timerLockNotice) timerLockNotice.classList.remove('active');
        if (btnAddRundown) {
          btnAddRundown.style.opacity = '1';
          btnAddRundown.style.cursor = 'pointer';
        }
        presetPills.forEach(p => {
          p.style.opacity = '1';
          p.style.cursor = 'pointer';
        });
        if (mobilePresetBtn) {
          mobilePresetBtn.style.opacity = '1';
          mobilePresetBtn.style.cursor = 'pointer';
        }
      } else {
        // Terkunci untuk penonton / non-admin
        if (timerControlsBar) timerControlsBar.classList.add('controls-locked');
        if (timerLockNotice) timerLockNotice.classList.add('active');
        if (btnAddRundown) {
          btnAddRundown.style.opacity = '0.5';
          btnAddRundown.style.cursor = 'not-allowed';
        }
        presetPills.forEach(p => {
          p.style.opacity = '0.4';
          p.style.cursor = 'not-allowed';
        });
        if (mobilePresetBtn) {
          mobilePresetBtn.style.opacity = '0.4';
          mobilePresetBtn.style.cursor = 'not-allowed';
        }
      }
    }

    // Realtime Rundown vs Actual State Tracker
    // (currentActiveSession dideklarasikan di scope atas agar aman dari TDZ saat render awal)

    const rvaTrackerBadge = document.getElementById('rva-tracker-badge');
    const rvaSessionName = document.getElementById('rva-session-name');
    const rvaPlanVal = document.getElementById('rva-plan-val');
    const rvaActualVal = document.getElementById('rva-actual-val');
    const rvaDiffBadge = document.getElementById('rva-diff-badge');
    const rvaDiffText = document.getElementById('rva-diff-text');
    const rvaOverallPct = document.getElementById('rva-overall-pct');

    // Helper untuk mem-parsing waktu jam mulai sesi (misal "08:30 - 08:35" atau "09:00" -> 32400 detik)
    function parseRundownTimeStringToSeconds(timeStr) {
      if (!timeStr || typeof timeStr !== 'string') return null;
      const startPart = timeStr.split('-')[0].trim().replace('.', ':');
      const match = startPart.match(/^(\d{1,2}):(\d{2})/);
      if (!match) return null;
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      if (isNaN(hours) || isNaN(minutes)) return null;
      return (hours * 3600) + (minutes * 60);
    }

    // Mendapatkan jam rencana mulai sesi (berdasarkan time string atau kalkulasi kumulatif jadwal sebelumnya)
    function getPlannedStartSecondsForSession(list, activeIdx) {
      if (!list || list.length === 0) return null;
      const safeIdx = Math.max(0, Math.min(activeIdx, list.length - 1));
      const targetItem = list[safeIdx];
      if (!targetItem) return null;

      // 1. Coba parse langsung dari string time target
      const directSec = parseRundownTimeStringToSeconds(targetItem.time);
      if (directSec !== null) return directSec;

      // 2. Jika sesi ini tidak punya jam mulai yang terformat, telusuri mundur ke item sebelumnya yang valid
      let baseSec = null;
      let durationBetween = 0;
      for (let i = safeIdx - 1; i >= 0; i--) {
        const parsed = parseRundownTimeStringToSeconds(list[i].time);
        durationBetween += (list[i].sec || (list[i].durMin * 60) || 0);
        if (parsed !== null) {
          baseSec = parsed + durationBetween;
          break;
        }
      }
      if (baseSec !== null) return baseSec;

      // 3. Fallback: Cari item pertama di list
      const firstSec = parseRundownTimeStringToSeconds(list[0].time);
      if (firstSec !== null) {
        let acc = 0;
        for (let i = 0; i < safeIdx; i++) {
          acc += (list[i].sec || (list[i].durMin * 60) || 0);
        }
        return firstSec + acc;
      }

      return null;
    }

    // Format deviasi waktu Overall Rundown Pace:
    // Terlambat / Over -> +00:05 (Merah 🔴)
    // Tepat Waktu -> 00:00 (Hijau 🟢)
    // Lebih Cepat / Buffer -> -00:20 (Biru / Hijau Muda 🔵)
    function formatRundownDriftTime(diffSeconds) {
      const absSec = Math.abs(diffSeconds);
      const totalMinutes = Math.floor(absSec / 60);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

      // Toleransi tepat waktu: rentang < 30 detik dianggap on time (00:00)
      if (absSec < 30) {
        return {
          formatted: '00:00',
          status: 'ontime',
          badgeText: 'TEPAT WAKTU (00:00)',
          color: '#34d399', // Hijau 🟢
          diffMinutes: 0
        };
      } else if (diffSeconds > 0) {
        return {
          formatted: `+${formattedTime}`,
          status: 'over',
          badgeText: `MOLOR (+${formattedTime})`,
          color: '#f87171', // Merah 🔴
          diffMinutes: totalMinutes
        };
      } else {
        return {
          formatted: `-${formattedTime}`,
          status: 'early',
          badgeText: `AHEAD (-${formattedTime})`,
          color: '#38bdf8', // Biru / Hijau Muda 🔵
          diffMinutes: -totalMinutes
        };
      }
    }

    let cachedRvaPulseDot = null;
    let lastRenderedRvaPlan = '';
    let lastRenderedRvaSession = '';
    let lastRenderedRvaActual = '';
    let lastRenderedRvaOverall = '';
    let lastRenderedRvaBadge = '';
    let lastRenderedRvaTitle = '';

    function updateRundownVsActualUI(force = false) {
      if (!rvaTrackerBadge) return;

      const currentList = getCurrentRundownList() || [];

      // Default sesi pertama jika belum ada yang terpilih
      if (!currentActiveSession && currentList.length > 0) {
        currentActiveSession = {
          index: 0,
          title: currentList[0].title,
          planSeconds: currentList[0].sec || (currentList[0].durMin * 60) || 300,
          timeLabel: currentList[0].time || '-'
        };
      }

      const planSec = (currentActiveSession && currentActiveSession.planSeconds) 
        ? currentActiveSession.planSeconds 
        : (activeTimerState.durationSeconds || 300);

      const planFormatted = formatTime(planSec);
      if (rvaPlanVal && (force || planFormatted !== lastRenderedRvaPlan)) {
        rvaPlanVal.textContent = planFormatted;
        lastRenderedRvaPlan = planFormatted;
      }

      const sessTitle = currentActiveSession ? currentActiveSession.title : 'Sesi Acara';
      if (rvaSessionName && (force || sessTitle !== lastRenderedRvaSession)) {
        rvaSessionName.textContent = sessTitle;
        rvaSessionName.title = `Sesi: ${sessTitle}`;
        lastRenderedRvaSession = sessTitle;
      }

      // Hitung sisa detik aktif
      let remainingSec = activeTimerState.remainingSeconds;
      if (activeTimerState.status === 'RUNNING' && activeTimerState.targetEndTime) {
        const adjustedNow = Date.now() + clockOffset;
        const diffMs = activeTimerState.targetEndTime - adjustedNow;
        remainingSec = Math.max(0, Math.ceil(diffMs / 1000));
      }

      // Actual elapsed time timer sesi saat ini
      let actualElapsedSec = 0;
      if (activeTimerState.remainingSeconds < 0) {
        actualElapsedSec = planSec + Math.abs(activeTimerState.remainingSeconds);
      } else {
        actualElapsedSec = Math.max(0, planSec - remainingSec);
      }
      const actualFormatted = formatTime(actualElapsedSec);
      if (rvaActualVal && (force || actualFormatted !== lastRenderedRvaActual)) {
        rvaActualVal.textContent = actualFormatted;
        lastRenderedRvaActual = actualFormatted;
      }

      // Hitung Overall Selisih Waktu (Schedule Pace / Drift Clock)
      const activeIdx = (currentActiveSession && typeof currentActiveSession.index === 'number')
        ? currentActiveSession.index
        : currentList.findIndex(it => currentActiveSession && currentActiveSession.title === it.title);

      const plannedStartSec = getPlannedStartSecondsForSession(currentList, activeIdx >= 0 ? activeIdx : 0);
      if (!cachedRvaPulseDot) {
        cachedRvaPulseDot = rvaTrackerBadge.querySelector('.rva-pulse-dot');
      }

      if (plannedStartSec !== null) {
        // Waktu sekarang jam dinding (NTP synced) dalam detik hari ini
        const now = new Date(Date.now() + clockOffset);
        const nowSec = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();

        // Target jam dinding rencana: Jam Mulai Rencana Sesi + durasi timer yang sudah dihabiskan
        const targetPlanClockSec = plannedStartSec + actualElapsedSec;

        let diffSec = nowSec - targetPlanClockSec;
        // Koreksi pergantian hari (midnight)
        if (diffSec > 43200) diffSec -= 86400;
        else if (diffSec < -43200) diffSec += 86400;

        const drift = formatRundownDriftTime(diffSec);

        if (rvaOverallPct && (force || drift.formatted !== lastRenderedRvaOverall)) {
          rvaOverallPct.textContent = drift.formatted;
          rvaOverallPct.className = `rva-val ${drift.status}`;
          rvaOverallPct.style.color = drift.color;
          lastRenderedRvaOverall = drift.formatted;
        }

        if (rvaDiffBadge && (force || drift.badgeText !== lastRenderedRvaBadge)) {
          rvaDiffBadge.className = `rva-diff-badge ${drift.status}`;
          if (rvaDiffText) rvaDiffText.textContent = drift.badgeText;
          lastRenderedRvaBadge = drift.badgeText;
        }

        if (cachedRvaPulseDot) {
          cachedRvaPulseDot.className = `rva-pulse-dot ${drift.status}`;
        }

        const nowClockStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const planStartFmt = `${String(Math.floor(plannedStartSec / 3600)).padStart(2, '0')}:${String(Math.floor((plannedStartSec % 3600) / 60)).padStart(2, '0')}`;
        const newTitle = `Rundown Pace: ${drift.badgeText}\n• Jam Realtime: ${nowClockStr}\n• Rencana Sesi: ${planStartFmt}\n• Sesi Berjalan: ${actualFormatted}`;
        if (rvaTrackerBadge.title !== newTitle) {
          rvaTrackerBadge.title = newTitle;
        }
      } else {
        // Fallback jika tidak ada informasi waktu sama sekali
        if (rvaOverallPct && (force || lastRenderedRvaOverall !== '00:00')) {
          rvaOverallPct.textContent = '00:00';
          rvaOverallPct.className = 'rva-val ontime';
          lastRenderedRvaOverall = '00:00';
        }
        if (rvaDiffBadge && (force || lastRenderedRvaBadge !== 'TEPAT WAKTU')) {
          rvaDiffBadge.className = 'rva-diff-badge ontime';
          if (rvaDiffText) rvaDiffText.textContent = 'TEPAT WAKTU';
          lastRenderedRvaBadge = 'TEPAT WAKTU';
        }
      }
    }

    function syncNTPClock() {
      const t0 = Date.now();
      socket.emit('TC_TIME_SYNC', { clientTimestamp: t0 });
    }

    socket.on('TC_TIME_PONG', (data) => {
      const t3 = Date.now();
      const t0 = data.clientTimestamp;
      const t1 = data.serverTimestamp;
      const rtt = t3 - t0;
      clockOffset = t1 - (t3 - (rtt / 2));
      const syncBadge = document.getElementById('sync-latency-label');
      if (syncBadge) {
        syncBadge.textContent = `${Math.round(rtt / 2)}ms`;
      }
    });

    setInterval(syncNTPClock, 15000);
    syncNTPClock();

    function formatTime(totalSec) {
      const s = Math.max(0, Math.floor(totalSec));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function formatOvertime(totalSec) {
      const s = Math.max(0, Math.floor(totalSec));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `+${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function formatClockTime(isoOrTimestamp) {
      if (!isoOrTimestamp) return '';
      try {
        const d = new Date(isoOrTimestamp);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return '';
      }
    }

    // === 3. REALTIME TIMER RAF TICKER (0ms JITTER DENGAN OVERTIME SUPPORT) ===
    const timerDisplay = document.getElementById('timer-display');
    const chkAllowOvertime = document.getElementById('chk-allow-overtime');

    let isCurrentlyOvertime = false;
    let isCustomDurationSelected = false; // Flag apakah durasi dipilih dari preset custom cepat (30s, 1m, dll)
    let lastActiveSeparatorMessageId = null; // ID separator sesi yang sedang dimainkan
    let lastActiveSeparatorBaseTitle = 'Sesi Acara'; // Judul dasar tanpa info actual
    let latestChatHistoryList = []; // Cache riwayat chat terkini untuk validasi realtime

    let lastRenderedTimerText = '';
    let lastRenderedTimerClass = '';
    let lastRvaUpdateTime = 0;
    let prevEffectiveStatus = null;

    function getCleanSeparatorTitle(raw) {
      if (!raw) return '';
      let clean = String(raw).split(' - Aktual (')[0].split(' • Actual:')[0].split(' - Aktual:')[0].trim();
      clean = clean.replace(/\s*\(\d+m\)$/i, '').trim();
      return clean.toLowerCase().replace(/\s+/g, ' ');
    }

    function isSeparatorTitleAlreadyExists(titleToCheck) {
      const cleanTarget = getCleanSeparatorTitle(titleToCheck);
      if (!cleanTarget) return false;

      // 1. Cek dari elemen DOM separator di chat
      const sepElements = document.querySelectorAll('.chat-session-separator');
      for (const el of sepElements) {
        const textEl = el.querySelector('.sep-text') || el.querySelector('.separator-title-text');
        if (textEl) {
          const cleanCurrent = getCleanSeparatorTitle(textEl.textContent);
          if (cleanCurrent === cleanTarget) {
            return true;
          }
        }
      }

      // 2. Cek dari memori cache chat
      if (Array.isArray(latestChatHistoryList)) {
        const found = latestChatHistoryList.find(m => 
          m.isSeparator && !m.isDeleted && getCleanSeparatorTitle(m.sessionTitle || m.message || m.text) === cleanTarget
        );
        if (found) return true;
      }

      return false;
    }

    if (chkAllowOvertime) {
      chkAllowOvertime.addEventListener('change', () => {
        socket.emit('TC_SET_OVERTIME_TOGGLE', {
          allowOvertime: chkAllowOvertime.checked,
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }

    function updateTimerUI() {
      const mode = (activeTimerState && activeTimerState.mode) ? activeTimerState.mode.toUpperCase() : 'COUNTDOWN';
      let targetDisplayStr = '00:00';
      let targetClassStr = 'timer-display ready';

      if (mode === 'COUNTUP') {
        isCurrentlyOvertime = false;
        const isRunning = (activeTimerState.status === 'RUNNING' || activeTimerState.isRunning);
        if (isRunning) {
          const adjustedNow = Date.now() + clockOffset;
          let elapsed = 0;
          if (activeTimerState.startTime) {
            elapsed = Math.max(0, Math.floor((adjustedNow - activeTimerState.startTime) / 1000));
          } else {
            elapsed = activeTimerState.elapsedSeconds || 0;
          }
          targetDisplayStr = formatTime(elapsed);
          targetClassStr = 'timer-display running';
        } else if (activeTimerState.status === 'PAUSED') {
          const elapsed = activeTimerState.elapsedSeconds !== undefined ? activeTimerState.elapsedSeconds : (activeTimerState.remainingSeconds || 0);
          targetDisplayStr = formatTime(elapsed);
          targetClassStr = 'timer-display paused';
        } else if (activeTimerState.status === 'STOPPED') {
          const elapsed = activeTimerState.elapsedSeconds !== undefined ? activeTimerState.elapsedSeconds : (activeTimerState.remainingSeconds || 0);
          targetDisplayStr = formatTime(elapsed);
          targetClassStr = 'timer-display paused';
        } else {
          targetDisplayStr = '00:00';
          targetClassStr = 'timer-display ready';
        }
      } else {
        const allowOvertime = chkAllowOvertime ? chkAllowOvertime.checked : true;

        if (activeTimerState.status === 'RUNNING' && activeTimerState.targetEndTime) {
          const adjustedNow = Date.now() + clockOffset;
          const diffMs = activeTimerState.targetEndTime - adjustedNow;

          if (diffMs >= 0) {
            // Hitung mundur normal
            isCurrentlyOvertime = false;
            const remainingSec = Math.max(0, Math.ceil(diffMs / 1000));
            targetDisplayStr = formatTime(remainingSec);
            if (remainingSec <= 10 && remainingSec > 0) {
              targetClassStr = 'timer-display running blinking-alert';
            } else if (remainingSec === 0) {
              targetClassStr = 'timer-display over';
            } else {
              targetClassStr = 'timer-display running';
            }
          } else {
            // Melewati batas 00:00
            const overtimePassedSec = Math.floor(Math.abs(diffMs) / 1000);
            if (allowOvertime) {
              isCurrentlyOvertime = true;
              targetDisplayStr = formatOvertime(overtimePassedSec);
              targetClassStr = 'timer-display overtime';
            } else {
              isCurrentlyOvertime = false;
              targetDisplayStr = '00:00';
              targetClassStr = 'timer-display over';
            }
          }
        } else {
          // Status PAUSED, IDLE, atau TIME_OUT
          if (activeTimerState.remainingSeconds < 0) {
            isCurrentlyOvertime = true;
            const absOvertimeSec = Math.abs(activeTimerState.remainingSeconds);
            targetDisplayStr = formatOvertime(absOvertimeSec);
            targetClassStr = activeTimerState.status === 'PAUSED' ? 'timer-display overtime paused' : 'timer-display overtime';
          } else {
            isCurrentlyOvertime = false;
            targetDisplayStr = formatTime(activeTimerState.remainingSeconds);
            if (activeTimerState.status === 'PAUSED') {
              targetClassStr = 'timer-display paused';
            } else if (activeTimerState.status === 'TIME_OUT') {
              targetClassStr = 'timer-display over';
            } else {
              targetClassStr = 'timer-display ready';
            }
          }
        }
      }

      // Zero-Lag DOM Write Cache (Hanya manipulasi DOM saat nilai detik atau status benar-benar berubah!)
      if (timerDisplay) {
        if (targetDisplayStr !== lastRenderedTimerText) {
          timerDisplay.textContent = targetDisplayStr;
          lastRenderedTimerText = targetDisplayStr;
        }
        if (targetClassStr !== lastRenderedTimerClass) {
          timerDisplay.className = targetClassStr;
          lastRenderedTimerClass = targetClassStr;
        }
      }

      // Deteksi perubahan status otomatis (misal transisi otomatis dari RUNNING ke OVERTIME)
      const currentEffective = getEffectiveTimerStatus();
      if (currentEffective !== prevEffectiveStatus) {
        prevEffectiveStatus = currentEffective;
        renderTimerControlsStateMachine();
      }

      // Throttled Rundown vs Actual (Update tiap 500ms agar main thread bebas lag saat mengetik & beroperasi)
      const nowMs = Date.now();
      if (nowMs - lastRvaUpdateTime >= 500) {
        lastRvaUpdateTime = nowMs;
        updateRundownVsActualUI();
      }

      requestAnimationFrame(updateTimerUI);
    }
    requestAnimationFrame(updateTimerUI);

    // === 4. SESSION & CHAT PERSISTENCE HELPERS + SOCKET.IO LISTENERS ===
    function sanitizeClientChatList(chats) {
      if (!Array.isArray(chats)) return [];
      const legacyWelcomeText = 'Selamat datang di ruang Timer & Chat live! Silakan ajukan pertanyaan atau koordinasi di sini.';
      return chats.filter(c => {
        if (!c || typeof c !== 'object') return false;
        if (c.id === 'chat-init-1') return false;
        const txt = (c.text || c.message || '').trim();
        if (txt === legacyWelcomeText && (c.sender === 'Panitia Educamp' || c.email === 'panitia@educamp.local')) {
          return false;
        }
        return true;
      });
    }

    function getChatCacheKey(eventId) {
      const id = eventId || (currentActiveEvent && currentActiveEvent.id) || 'event-educamp-2026';
      return `tc_session_chats_${id}`;
    }

    function saveCachedChatHistory(eventId, chats) {
      try {
        const clean = sanitizeClientChatList(chats);
        const key = getChatCacheKey(eventId);
        const str = JSON.stringify(clean);
        sessionStorage.setItem(key, str);
        localStorage.setItem(key, str);
      } catch (e) {}
    }

    function getCachedChatHistory(eventId) {
      try {
        const key = getChatCacheKey(eventId);
        const raw = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return sanitizeClientChatList(parsed);
        }
      } catch (e) {}
      return [];
    }

    function buildCurrentSessionStatePayload() {
      return {
        eventId: currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026',
        currentDayTab,
        currentActiveSession,
        rundownDay1: rundownItemsDay1,
        rundownDay2: rundownItemsDay2,
        completedSessionsDay1: [...getCompletedSessionsForDay('DAY_1')],
        completedSessionsDay2: [...getCompletedSessionsForDay('DAY_2')],
        lastActiveSeparatorMessageId,
        lastActiveSeparatorBaseTitle,
        updatedAt: new Date().toISOString()
      };
    }

    function emitSessionStateToFirebase() {
      persistLocalSessionMeta();
      const payload = buildCurrentSessionStatePayload();
      socket.emit('TC_UPDATE_SESSION_STATE', payload);
    }

    function applyRemoteSessionState(remoteSession) {
      if (!remoteSession || typeof remoteSession !== 'object') return;

      if (remoteSession.currentDayTab === 'DAY_1' || remoteSession.currentDayTab === 'DAY_2') {
        currentDayTab = remoteSession.currentDayTab;
        applyDayTabUI();
      }
      if (remoteSession.currentActiveSession && remoteSession.currentActiveSession.title) {
        currentActiveSession = remoteSession.currentActiveSession;
      }
      if (Array.isArray(remoteSession.rundownDay1) && remoteSession.rundownDay1.length > 0) {
        rundownItemsDay1 = remoteSession.rundownDay1;
        saveStoredRundown('DAY_1', rundownItemsDay1);
      }
      if (Array.isArray(remoteSession.rundownDay2) && remoteSession.rundownDay2.length > 0) {
        rundownItemsDay2 = remoteSession.rundownDay2;
        saveStoredRundown('DAY_2', rundownItemsDay2);
      }
      if (Array.isArray(remoteSession.completedSessionsDay1)) {
        saveCompletedSessionsForDay('DAY_1', new Set(remoteSession.completedSessionsDay1), false);
      }
      if (Array.isArray(remoteSession.completedSessionsDay2)) {
        saveCompletedSessionsForDay('DAY_2', new Set(remoteSession.completedSessionsDay2), false);
      }
      if (remoteSession.lastActiveSeparatorMessageId) {
        lastActiveSeparatorMessageId = remoteSession.lastActiveSeparatorMessageId;
      }
      if (remoteSession.lastActiveSeparatorBaseTitle) {
        lastActiveSeparatorBaseTitle = remoteSession.lastActiveSeparatorBaseTitle;
      }

      persistLocalSessionMeta();
      renderRundownItems();
      updateRundownVsActualUI();
    }

    // Hydrate chat & event awal secara instan dari sessionStorage/localStorage sebelum socket merespons
    try {
      const savedEventRaw = sessionStorage.getItem('tc_cached_active_event') || localStorage.getItem('tc_cached_active_event');
      if (savedEventRaw) {
        const parsedEv = JSON.parse(savedEventRaw);
        if (parsedEv && parsedEv.id) {
          currentActiveEvent = parsedEv;
          if (typeof updateEventLabels === 'function') updateEventLabels(currentActiveEvent);
        }
      }
      const initialEvId = currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026';
      const initialCachedChats = getCachedChatHistory(initialEvId);
      if (initialCachedChats.length > 0) {
        latestChatHistoryList = initialCachedChats.slice();
        setTimeout(() => {
          if (latestChatHistoryList.length > 0 && typeof renderChatMessages === 'function') {
            renderChatMessages(latestChatHistoryList, initialEvId);
          }
        }, 0);
      }
    } catch (e) {}

    socket.on('TC_SESSION_STATE_UPDATED', (sessionState) => {
      applyRemoteSessionState(sessionState);
    });

    socket.on('TC_STATE_UPDATE', (state) => {
      if (!state) return;
      if (state.timer) {
        activeTimerState = state.timer;
      }
      if (chkAllowOvertime && activeTimerState && activeTimerState.allowOvertime !== undefined) {
        chkAllowOvertime.checked = !!activeTimerState.allowOvertime;
      }
      if (state.activeEvent) {
        currentActiveEvent = state.activeEvent;
        updateEventLabels(currentActiveEvent);
        try {
          const evStr = JSON.stringify({
            id: state.activeEvent.id,
            name: state.activeEvent.name,
            date: state.activeEvent.date,
            chatsClearedAt: state.activeEvent.chatsClearedAt || null
          });
          sessionStorage.setItem('tc_cached_active_event', evStr);
          localStorage.setItem('tc_cached_active_event', evStr);
        } catch (e) {}
      }
      if (state.overlayConfig && typeof updateOverlayChatToggleUI === 'function') {
        updateOverlayChatToggleUI(state.overlayConfig.showChat);
      }
      if (state.sessionState) {
        applyRemoteSessionState(state.sessionState);
      }
      if (state.chatHistory) {
        const evId = state.activeEvent ? state.activeEvent.id : (currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026');
        const serverChats = sanitizeClientChatList(state.chatHistory);
        const cachedChats = getCachedChatHistory(evId);
        const clearedAtMs = (state.activeEvent && state.activeEvent.chatsClearedAt)
          ? new Date(state.activeEvent.chatsClearedAt).getTime()
          : 0;

        // Gabungkan chat dari server/Firebase dan sessionStorage/localStorage agar chat tidak pernah hilang saat reload
        const map = new Map();
        serverChats.forEach(m => {
          if (m && m.id) map.set(m.id, m);
        });
        let clientHasMissingMessages = false;
        cachedChats.forEach(m => {
          if (!m || !m.id) return;
          const mTime = m.timestamp ? new Date(m.timestamp).getTime() : 0;
          if (clearedAtMs && mTime > 0 && mTime < clearedAtMs) return;
          if (!map.has(m.id)) {
            map.set(m.id, m);
            clientHasMissingMessages = true;
          }
        });

        const finalChats = Array.from(map.values()).sort((a, b) => {
          return new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime();
        });

        latestChatHistoryList = finalChats;
        saveCachedChatHistory(evId, finalChats);

        if (shouldRerenderChat(finalChats, evId)) {
          renderChatMessages(finalChats, evId);
        }

        // Jika client memiliki chat di session/localStorage yang belum ada di server, sinkronkan balik ke server & Firebase
        if (clientHasMissingMessages) {
          socket.emit('TC_SYNC_CLIENT_SESSION', {
            eventId: evId,
            chatHistory: finalChats,
            sessionState: buildCurrentSessionStatePayload()
          });
        }

        // Inisialisasi lastActiveSeparatorMessageId dari separator terakhir yang aktif
        const lastSep = finalChats.slice().reverse().find(m => m.isSeparator && !m.isDeleted);
        if (lastSep) {
          lastActiveSeparatorMessageId = lastSep.id;
          const rawTitle = lastSep.sessionTitle || lastSep.message || lastSep.text || 'Sesi Acara';
          lastActiveSeparatorBaseTitle = rawTitle.split(' - Aktual (')[0].split(' • Actual:')[0].trim();
        }
      }
      updateRundownVsActualUI();
      renderTimerControlsStateMachine();
    });

    socket.on('TC_OVERLAY_CHAT_VISIBILITY_CHANGED', (data) => {
      if (data && typeof data.visible === 'boolean' && typeof updateOverlayChatToggleUI === 'function') {
        updateOverlayChatToggleUI(data.visible);
      }
    });

    socket.on('TC_TIMER_STARTED', (data) => {
      activeTimerState.status = 'RUNNING';
      activeTimerState.isRunning = true;
      activeTimerState.targetEndTime = data.targetEndTime;
      activeTimerState.startTime = data.startTime || null;
      activeTimerState.durationSeconds = data.durationSeconds;
      activeTimerState.remainingSeconds = data.remainingSeconds !== undefined ? data.remainingSeconds : data.durationSeconds;
      if (data.mode) activeTimerState.mode = data.mode;
      if (data.startedBy) activeTimerState.startedBy = data.startedBy;
      updateRundownVsActualUI(true);
      renderTimerControlsStateMachine();
    });

    // Helper untuk sinkronisasi waktu aktual sesi ke separator obrolan saat timer di-stop/pause
    function syncActualTimeToSeparator() {
      if (!lastActiveSeparatorMessageId) {
        const sepEl = Array.from(document.querySelectorAll('.chat-session-separator-row, .chat-session-separator')).pop();
        if (sepEl && sepEl.dataset.msgId) {
          lastActiveSeparatorMessageId = sepEl.dataset.msgId;
          const textEl = sepEl.querySelector('.separator-title-text, .sep-text');
          if (textEl) {
            const raw = textEl.textContent || '';
            lastActiveSeparatorBaseTitle = raw.split(' - Aktual (')[0].split(' • Actual:')[0].trim();
          }
        }
      }
      if (!lastActiveSeparatorMessageId) return;

      const planSec = (currentActiveSession && currentActiveSession.planSeconds) 
        ? currentActiveSession.planSeconds 
        : (activeTimerState.durationSeconds || 300);

      let actualSec = 0;
      if (activeTimerState.remainingSeconds < 0) {
        actualSec = planSec + Math.abs(activeTimerState.remainingSeconds);
      } else {
        actualSec = Math.max(0, planSec - activeTimerState.remainingSeconds);
      }

      if (actualSec <= 0) return;

      const actualFmt = formatTime(actualSec);
      let updatedTitle = `${lastActiveSeparatorBaseTitle} - Aktual (${actualFmt})`;

      if (activeTimerState.remainingSeconds < 0) {
        const overSec = Math.abs(activeTimerState.remainingSeconds);
        updatedTitle = `${lastActiveSeparatorBaseTitle} - Aktual (${actualFmt} • Overtime +${formatTime(overSec)})`;
      }

      socket.emit('TC_UPDATE_MESSAGE', {
        messageId: lastActiveSeparatorMessageId,
        sessionTitle: updatedTitle,
        sessionDuration: planSec,
        eventId: currentActiveEvent ? currentActiveEvent.id : null,
        requesterEmail: currentUser ? currentUser.email : '',
        requesterName: currentUser ? currentUser.displayName : 'Operator',
        isAdmin: true
      });
    }

    socket.on('TC_TIMER_PAUSED', (data) => {
      activeTimerState.status = 'PAUSED';
      activeTimerState.isRunning = false;
      activeTimerState.remainingSeconds = data.remainingSeconds;
      if (data.mode) activeTimerState.mode = data.mode;
      updateRundownVsActualUI(true);
      renderTimerControlsStateMachine();
      syncActualTimeToSeparator();
    });

    socket.on('TC_TIMER_STOPPED', (data) => {
      activeTimerState.status = 'STOPPED';
      activeTimerState.isRunning = false;
      activeTimerState.remainingSeconds = data.remainingSeconds;
      activeTimerState.durationSeconds = data.durationSeconds;
      if (data.mode) activeTimerState.mode = data.mode;
      if (data.stoppedBy) activeTimerState.stoppedBy = data.stoppedBy;
      if (currentActiveSession && currentActiveSession.title) {
        markSessionAsCompleted(currentActiveSession.title, true);
      }
      updateRundownVsActualUI(true);
      renderTimerControlsStateMachine();
      syncActualTimeToSeparator();
      renderRundownItems();
    });

    socket.on('TC_TIMER_RESET', (data) => {
      activeTimerState.status = 'IDLE';
      activeTimerState.isRunning = false;
      activeTimerState.targetEndTime = null;
      activeTimerState.startTime = null;
      activeTimerState.pausedAt = null;
      activeTimerState.elapsedSeconds = 0;
      if (data && data.mode) activeTimerState.mode = data.mode;
      const isCountup = (activeTimerState.mode || '').toUpperCase() === 'COUNTUP';
      if (data && data.durationSeconds) activeTimerState.durationSeconds = data.durationSeconds;
      activeTimerState.remainingSeconds = isCountup ? 0 : (activeTimerState.durationSeconds || 300);
      if (timerDisplay) {
        timerDisplay.textContent = isCountup ? '00:00' : formatTime(activeTimerState.remainingSeconds);
        timerDisplay.className = 'timer-display ready';
      }
      updateRundownVsActualUI(true);
      renderTimerControlsStateMachine();
      syncActualTimeToSeparator();
    });

    socket.on('TC_TIMER_MODE_CHANGED', (data) => {
      if (!data) return;
      const newMode = (data.mode || 'COUNTDOWN').toUpperCase();
      activeTimerState.mode = newMode;
      activeTimerState.status = 'IDLE';
      activeTimerState.isRunning = false;
      activeTimerState.targetEndTime = null;
      activeTimerState.startTime = null;
      activeTimerState.pausedAt = null;
      activeTimerState.elapsedSeconds = 0;
      if (data.durationSeconds) activeTimerState.durationSeconds = data.durationSeconds;
      if (newMode === 'COUNTUP') {
        activeTimerState.remainingSeconds = 0;
      } else {
        activeTimerState.remainingSeconds = data.remainingSeconds !== undefined ? data.remainingSeconds : (activeTimerState.durationSeconds || 300);
      }
      if (timerDisplay) {
        timerDisplay.textContent = newMode === 'COUNTUP' ? '00:00' : formatTime(activeTimerState.remainingSeconds);
        timerDisplay.className = 'timer-display ready';
      }
      updateRundownVsActualUI(true);
      renderTimerControlsStateMachine();
    });

    socket.on('TC_NEW_MESSAGE', (msg) => {
      if (!msg || msg.id === 'chat-init-1') return;
      const existsIdx = latestChatHistoryList.findIndex(m => m.id === msg.id);
      if (existsIdx === -1) {
        latestChatHistoryList.push(msg);
      } else {
        latestChatHistoryList[existsIdx] = msg;
      }
      saveCachedChatHistory(msg.eventId || (currentActiveEvent ? currentActiveEvent.id : null), latestChatHistoryList);
      appendChatMessage(msg, true);
      if (msg && msg.isSeparator) {
        lastActiveSeparatorMessageId = msg.id;
        // Bersihkan title dari format sebelumnya jika ada
        const rawTitle = msg.sessionTitle || msg.message || 'Sesi Acara';
        lastActiveSeparatorBaseTitle = rawTitle.split(' - Aktual (')[0].split(' • Actual:')[0].trim();
        emitSessionStateToFirebase();
      }
    });

    socket.on('TC_MESSAGE_DELETED', ({ messageId, eventId, isPermanent, updatedMessage }) => {
      if (isPermanent) {
        latestChatHistoryList = latestChatHistoryList.filter(m => m.id !== messageId);
      } else if (updatedMessage) {
        latestChatHistoryList = latestChatHistoryList.map(m => m.id === messageId ? updatedMessage : m);
      }
      saveCachedChatHistory(eventId || (currentActiveEvent ? currentActiveEvent.id : null), latestChatHistoryList);
      const el = document.querySelector(`[data-msg-id="${messageId}"]`);
      if (el) {
        if (isPermanent) {
          // Separator atau hard deleted: fade out dan hapus dari DOM
          el.style.transition = 'all 0.25s ease';
          el.style.opacity = '0';
          el.style.transform = 'scale(0.9)';
          setTimeout(() => el.remove(), 250);
        } else {
          // Soft delete: bubble tetap ada, tampilkan tanda larang & Pesan telah dihapus / Pesan dihapus oleh [Role] [Nama]
          el.classList.add('is-deleted');
          el.classList.remove('is-single-emoji');
          const noticeText = (updatedMessage && (updatedMessage.deleteNotice || updatedMessage.message || updatedMessage.text)) || 'Pesan telah dihapus';
          const contentDiv = el.querySelector('.msg-content');
          if (contentDiv) {
            contentDiv.className = 'msg-content';
            contentDiv.innerHTML = `
              <div class="msg-deleted-notice">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>
                <span>${escapeHtml(noticeText)}</span>
              </div>
            `;
          }
          // Hilangkan attachment media jika ada
          const mediaEl = el.querySelector('.msg-media-attachment, .msg-sticker-wrapper');
          if (mediaEl) mediaEl.remove();

          // Sembunyikan tombol more / action menu
          const moreBtn = el.querySelector('.btn-msg-more');
          if (moreBtn) moreBtn.style.display = 'none';
          const menu = el.querySelector('.msg-actions-menu');
          if (menu) menu.remove();
        }
      }
    });

    socket.on('TC_REACTION_UPDATED', (data) => {
      if (!data || !data.messageId) return;
      if (data.updatedMessage) {
        latestChatHistoryList = latestChatHistoryList.map(m => m.id === data.messageId ? data.updatedMessage : m);
        saveCachedChatHistory(data.eventId || (currentActiveEvent ? currentActiveEvent.id : null), latestChatHistoryList);
      }
      const el = document.querySelector(`[data-msg-id="${data.messageId}"]`);
      if (!el) return;

      const bubbleCard = el.querySelector('.chat-bubble-card');
      if (!bubbleCard) return;

      let badgeBar = bubbleCard.querySelector('.msg-reactions-badge-bar');
      const reactions = data.reactions || {};
      const emojiKeys = Object.keys(reactions);

      if (emojiKeys.length === 0) {
        if (badgeBar) badgeBar.remove();
        return;
      }

      if (!badgeBar) {
        badgeBar = document.createElement('div');
        badgeBar.className = 'msg-reactions-badge-bar';
        const bottomMeta = bubbleCard.querySelector('.msg-bottom-meta');
        if (bottomMeta) {
          bubbleCard.insertBefore(badgeBar, bottomMeta);
        } else {
          bubbleCard.appendChild(badgeBar);
        }
      }

      const myId = (currentUser && currentUser.email ? currentUser.email : '') ||
                   (currentUser && currentUser.displayName ? currentUser.displayName : '') ||
                   ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '');

      badgeBar.innerHTML = emojiKeys.map(emoji => {
        const users = reactions[emoji] || [];
        const isReactedByMe = users.some(u => (typeof u === 'string' ? u : u.id).toLowerCase() === myId.toLowerCase());
        return `
          <div class="reaction-badge-pill ${isReactedByMe ? 'is-reacted-by-me' : ''}" data-emoji="${escapeHtml(emoji)}" title="${escapeHtml(users.join(', '))}">
            <span class="pill-emoji">${emoji}</span>
            <span class="pill-count">${users.length}</span>
          </div>
        `;
      }).join('');

      badgeBar.querySelectorAll('.reaction-badge-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          const emoji = pill.dataset.emoji;
          toggleMessageReaction(data.messageId, emoji);
        });
      });
    });

    socket.on('TC_MESSAGE_UPDATED', (updatedMsg) => {
      if (!updatedMsg) return;
      latestChatHistoryList = latestChatHistoryList.map(m => m.id === updatedMsg.id ? updatedMsg : m);
      saveCachedChatHistory(updatedMsg.eventId || (currentActiveEvent ? currentActiveEvent.id : null), latestChatHistoryList);
      const el = document.querySelector(`[data-msg-id="${updatedMsg.id}"]`);
      if (el) {
        if (updatedMsg.isSeparator) {
          const textSpan = el.querySelector('.sep-text');
          if (textSpan) {
            textSpan.textContent = updatedMsg.sessionTitle || updatedMsg.message || 'Sesi Baru';
          }
        } else {
          const contentDiv = el.querySelector('.msg-content');
          if (contentDiv) {
            contentDiv.textContent = updatedMsg.message || updatedMsg.text || '';
          }
        }
      }
    });

    socket.on('TC_CHAT_CLEARED', (data) => {
      const evId = (data && data.eventId) || (currentActiveEvent ? currentActiveEvent.id : null);
      latestChatHistoryList = [];
      saveCachedChatHistory(evId, []);
      const container = document.getElementById('chat-messages');
      if (container) container.innerHTML = '';
    });

    socket.on('TC_ERROR', (err) => {
      if (err && err.message) showAlertDialog({ title: 'Terjadi Kesalahan', message: err.message });
    });

    // === 5. TIMER CONTROLS (STATE MACHINE: 2 SLOTS MORPHING) ===
    function checkTimerControlPermission() {
      const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (!isUserAdmin && !isLocalHost) {
        showAlertDialog({ title: 'Akses Ditolak', message: 'Hanya pengguna terotorisasi yang dapat mengubah atau mengontrol timer.' });
        return false;
      }
      return true;
    }

    const btnTimerPrimary = document.getElementById('btn-timer-primary');
    const btnTimerSecondary = document.getElementById('btn-timer-secondary');

    function getEffectiveTimerStatus() {
      if (!activeTimerState) return 'IDLE';
      const mode = (activeTimerState.mode || 'COUNTDOWN').toUpperCase();
      const isRunning = (activeTimerState.status === 'RUNNING' || !!activeTimerState.isRunning);

      if (mode === 'COUNTUP') {
        if (isRunning) return 'RUNNING';
        if (activeTimerState.status === 'PAUSED') return 'PAUSED';
        if (activeTimerState.status === 'STOPPED') return 'STOPPED';
        return 'IDLE';
      }

      // COUNTDOWN
      if (isRunning) {
        if (activeTimerState.targetEndTime) {
          const adjustedNow = Date.now() + clockOffset;
          const diffMs = activeTimerState.targetEndTime - adjustedNow;
          if (diffMs < 0) {
            return 'OVERTIME';
          }
          return 'RUNNING';
        }
        return 'RUNNING';
      }

      if (activeTimerState.status === 'OVERTIME') return 'OVERTIME';
      if (activeTimerState.status === 'PAUSED') return 'PAUSED';
      if (activeTimerState.status === 'STOPPED') return 'STOPPED';
      if (activeTimerState.status === 'TIME_OUT') return 'TIME_OUT';
      return 'IDLE';
    }

    function renderTimerControlsStateMachine() {
      if (!btnTimerPrimary || !btnTimerSecondary) return;
      const effectiveStatus = getEffectiveTimerStatus();
      const mode = (activeTimerState && activeTimerState.mode) ? activeTimerState.mode.toUpperCase() : 'COUNTDOWN';

      // Sinkronkan Tab Mode Countdown vs Count-up
      const btnModeCountdown = document.getElementById('btn-mode-countdown');
      const btnModeCountup = document.getElementById('btn-mode-countup');
      if (btnModeCountdown && btnModeCountup) {
        btnModeCountdown.classList.toggle('active', mode !== 'COUNTUP');
        btnModeCountup.classList.toggle('active', mode === 'COUNTUP');
      }

      updateTimerOperatorNotice();

      if (effectiveStatus === 'RUNNING' || effectiveStatus === 'OVERTIME') {
        // State 2: Running / Overtime -> Primary: Jeda (Pause), Secondary: Stop (SELALU MUNCUL, HINDARI LOOPHOLE!)
        btnTimerPrimary.className = 'btn-action btn-pause';
        btnTimerPrimary.title = 'Jeda Timer (Spasi)';
        btnTimerPrimary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          <span>Jeda</span>
        `;
        btnTimerPrimary.style.display = 'inline-flex';

        btnTimerSecondary.className = 'btn-action btn-reset';
        btnTimerSecondary.title = 'Stop / Selesaikan Sesi (Esc)';
        btnTimerSecondary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>
          <span>Stop</span>
        `;
        btnTimerSecondary.style.display = 'inline-flex';

      } else if (effectiveStatus === 'PAUSED') {
        // State 3: Paused -> Primary: Lanjut (Resume), Secondary: Stop
        btnTimerPrimary.className = 'btn-action btn-start';
        btnTimerPrimary.title = 'Lanjutkan Timer (Spasi)';
        btnTimerPrimary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Lanjut</span>
        `;
        btnTimerPrimary.style.display = 'inline-flex';

        btnTimerSecondary.className = 'btn-action btn-reset';
        btnTimerSecondary.title = 'Stop / Selesaikan Sesi (Esc)';
        btnTimerSecondary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>
          <span>Stop</span>
        `;
        btnTimerSecondary.style.display = 'inline-flex';

      } else if (effectiveStatus === 'STOPPED') {
        // State 4: Selesai / Stopped -> Primary: Mulai Sesi Baru, Secondary: Reset
        btnTimerPrimary.className = 'btn-action btn-start';
        btnTimerPrimary.title = 'Mulai Timer (Spasi)';
        btnTimerPrimary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Mulai</span>
        `;
        btnTimerPrimary.style.display = 'inline-flex';

        btnTimerSecondary.className = 'btn-action btn-reset';
        btnTimerSecondary.title = 'Reset Timer ke Durasi Standar';
        btnTimerSecondary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          <span>Reset</span>
        `;
        btnTimerSecondary.style.display = 'inline-flex';

      } else if (effectiveStatus === 'TIME_OUT') {
        // State 5: Timeout -> Primary: Mulai Lagi, Secondary: Stop
        btnTimerPrimary.className = 'btn-action btn-start';
        btnTimerPrimary.title = 'Mulai Sesi Ulang (Spasi)';
        btnTimerPrimary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Mulai</span>
        `;
        btnTimerPrimary.style.display = 'inline-flex';

        btnTimerSecondary.className = 'btn-action btn-reset';
        btnTimerSecondary.title = 'Stop / Selesaikan Sesi (Esc)';
        btnTimerSecondary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>
          <span>Stop</span>
        `;
        btnTimerSecondary.style.display = 'inline-flex';

      } else {
        // State 1: Idle -> Primary: Mulai, Secondary: Hidden
        btnTimerPrimary.className = 'btn-action btn-start';
        btnTimerPrimary.title = 'Mulai Timer (Spasi)';
        btnTimerPrimary.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>Mulai</span>
        `;
        btnTimerPrimary.style.display = 'inline-flex';

        btnTimerSecondary.style.display = 'none';
      }
    }

    if (btnTimerPrimary) {
      btnTimerPrimary.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        const effectiveStatus = getEffectiveTimerStatus();
        const curMode = (activeTimerState && activeTimerState.mode) ? activeTimerState.mode.toUpperCase() : 'COUNTDOWN';

        // Fix Loophole: Jika timer sedang aktif running / overtime dalam bentuk apapun, tombol Primary PASTI MENJEDA (PAUSE)
        if (effectiveStatus === 'RUNNING' || effectiveStatus === 'OVERTIME') {
          activeTimerState.status = 'PAUSED';
          activeTimerState.isRunning = false;
          renderTimerControlsStateMachine();
          socket.emit('TC_PAUSE_TIMER', {
            userEmail: currentUser ? currentUser.email : '',
            userName: currentUser ? currentUser.name : '',
            eventId: currentActiveEvent ? currentActiveEvent.id : null
          });
          return;
        }

        if (effectiveStatus === 'PAUSED') {
          // Sedang jeda -> lanjutkan secara optimistik
          activeTimerState.status = 'RUNNING';
          activeTimerState.isRunning = true;
          if (curMode === 'COUNTDOWN') {
            activeTimerState.targetEndTime = Date.now() + (activeTimerState.remainingSeconds * 1000);
          } else {
            activeTimerState.startTime = Date.now() - ((activeTimerState.elapsedSeconds || 0) * 1000);
          }
          renderTimerControlsStateMachine();

          socket.emit('TC_START_TIMER', {
            userEmail: currentUser ? currentUser.email : '',
            userName: currentUser ? currentUser.name : '',
            mode: curMode,
            allowOvertime: chkAllowOvertime ? chkAllowOvertime.checked : true,
            eventId: currentActiveEvent ? currentActiveEvent.id : null
          });
          return;
        }

        // Sedang Idle, Stopped, atau Timeout -> Mulai Sesi Baru
        if (!isCustomDurationSelected) {
          if (!pendingSessionSeparator) {
            if (currentActiveSession && currentActiveSession.title && currentActiveSession.title !== 'Opening / Standby') {
              const durMin = Math.round((currentActiveSession.planSeconds || activeTimerState.durationSeconds || 300) / 60);
              pendingSessionSeparator = {
                eventId: currentActiveEvent ? currentActiveEvent.id : null,
                sessionTitle: `${currentActiveSession.title} (${durMin}m)`,
                sessionDuration: currentActiveSession.planSeconds || activeTimerState.durationSeconds || 300,
                userEmail: currentUser ? currentUser.email : '',
                userName: currentUser ? currentUser.name : ''
              };
            } else {
              showAlertDialog({
                title: 'Pilih Sesi Terlebih Dahulu',
                message: 'Silakan klik salah satu sesi di Rundown Acara terlebih dahulu agar separator otomatis tercatat di chat live, atau pilih tombol preset durasi cepat (30s, 1m, 5m, dll).'
              });
              return;
            }
          }

          // Validasi keras: Jangan izinkan separator ganda muncul
          if (pendingSessionSeparator && isSeparatorTitleAlreadyExists(pendingSessionSeparator.sessionTitle)) {
            showAlertDialog({
              title: 'Separator Sudah Ada di Chat',
              message: `Separator untuk sesi "${pendingSessionSeparator.sessionTitle}" sudah ada di riwayat obrolan! Tidak diperbolehkan ada separator ganda. Silakan hapus terlebih dahulu separator lama dari chat sebelum dapat menambahkan separator yang sama kembali.`
            });
            return;
          }

          if (pendingSessionSeparator) {
            socket.emit('TC_ADD_SEPARATOR', pendingSessionSeparator);
            lastActiveSeparatorBaseTitle = pendingSessionSeparator.sessionTitle;
            pendingSessionSeparator = null;
          }
        }

        isCustomDurationSelected = false;

        if (currentActiveSession && currentActiveSession.title && currentActiveSession.title !== 'Opening / Standby') {
          const currentList = getCurrentRundownList();
          const activeIdx = currentList.findIndex(it => it.title === currentActiveSession.title);
          if (activeIdx > 0) {
            const completedSet = getCompletedSessions();
            for (let i = 0; i < activeIdx; i++) {
              if (currentList[i] && currentList[i].title) {
                completedSet.add(currentList[i].title);
              }
            }
            saveCompletedSessions(completedSet);
            renderRundownItems();
          }
        }

        // Optimistic UI: Segera ubah button jadi Jeda dan Stop tanpa menunggu network delay!
        activeTimerState.status = 'RUNNING';
        activeTimerState.isRunning = true;
        if (curMode === 'COUNTDOWN') {
          const startSec = activeTimerState.remainingSeconds > 0 ? activeTimerState.remainingSeconds : (activeTimerState.durationSeconds || 300);
          activeTimerState.remainingSeconds = startSec;
          activeTimerState.targetEndTime = Date.now() + (startSec * 1000);
        } else {
          activeTimerState.startTime = Date.now();
        }
        renderTimerControlsStateMachine();

        socket.emit('TC_START_TIMER', {
          userEmail: currentUser ? currentUser.email : '',
          userName: currentUser ? currentUser.name : '',
          mode: curMode,
          sessionTitle: (currentActiveSession && currentActiveSession.title) ? currentActiveSession.title : null,
          allowOvertime: chkAllowOvertime ? chkAllowOvertime.checked : true,
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }

    if (btnTimerSecondary) {
      btnTimerSecondary.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        const effectiveStatus = getEffectiveTimerStatus();

        if (effectiveStatus === 'IDLE' || effectiveStatus === 'STOPPED') {
          // Klik Reset: reset durasi timer ke awal secara optimistik
          activeTimerState.status = 'IDLE';
          activeTimerState.isRunning = false;
          activeTimerState.targetEndTime = null;
          activeTimerState.startTime = null;
          activeTimerState.pausedAt = null;
          activeTimerState.elapsedSeconds = 0;
          if (activeTimerState.mode === 'COUNTUP') {
            activeTimerState.remainingSeconds = 0;
          } else {
            activeTimerState.remainingSeconds = activeTimerState.durationSeconds || 300;
          }
          renderTimerControlsStateMachine();
          updateRundownVsActualUI(true);

          socket.emit('TC_RESET_TIMER', {
            userEmail: currentUser ? currentUser.email : '',
            userName: currentUser ? currentUser.name : '',
            eventId: currentActiveEvent ? currentActiveEvent.id : null
          });
          return;
        }

        // Klik Stop: Tandai sesi ini dan sesi sebelumnya sebagai selesai/terlewat
        activeTimerState.status = 'STOPPED';
        activeTimerState.isRunning = false;
        renderTimerControlsStateMachine();

        if (currentActiveSession && currentActiveSession.title) {
          markSessionAsCompleted(currentActiveSession.title, true);
        }
        // Sinkronkan waktu aktual final ke separator dan freeze timer
        syncActualTimeToSeparator();
        socket.emit('TC_STOP_TIMER', {
          userEmail: currentUser ? currentUser.email : '',
          userName: currentUser ? currentUser.name : '',
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }

    // Wiring Tombol Reset Sesi Terpilih (Current Selection)
    const btnResetSelection = document.getElementById('btn-reset-selection');
    if (btnResetSelection) {
      btnResetSelection.addEventListener('click', async () => {
        if (!checkTimerControlPermission()) return;
        
        let targetSec = 300;
        let sessionTitle = 'Sesi Terpilih';
        if (currentActiveSession && currentActiveSession.planSeconds) {
          targetSec = currentActiveSession.planSeconds;
          sessionTitle = currentActiveSession.title || 'Sesi Terpilih';
        } else {
          const list = getCurrentRundownList();
          if (list && list.length > 0) {
            targetSec = list[0].sec || (list[0].durMin * 60) || 300;
            sessionTitle = list[0].title;
          }
        }

        const isRunning = (activeTimerState && (activeTimerState.status === 'RUNNING' || activeTimerState.isRunning));
        if (isRunning) {
          const confirmed = await showConfirmDialog({
            title: 'Reset Timer Sesi Berjalan',
            message: `Timer sedang berjalan untuk "${sessionTitle}". Apakah Anda yakin ingin mereset waktu kembali ke awal durasi rencana (${Math.round(targetSec / 60)} menit)?`,
            confirmText: 'Ya, Reset'
          });
          if (!confirmed) return;
        }

        // Optimistic UI reset
        const curMode = (activeTimerState && activeTimerState.mode) ? activeTimerState.mode.toUpperCase() : 'COUNTDOWN';
        activeTimerState.status = 'IDLE';
        activeTimerState.isRunning = false;
        activeTimerState.targetEndTime = null;
        activeTimerState.startTime = null;
        activeTimerState.pausedAt = null;
        activeTimerState.durationSeconds = targetSec;
        activeTimerState.elapsedSeconds = 0;
        activeTimerState.remainingSeconds = (curMode === 'COUNTUP') ? 0 : targetSec;

        if (timerDisplay) {
          timerDisplay.textContent = (curMode === 'COUNTUP') ? '00:00' : formatTime(targetSec);
          timerDisplay.className = 'timer-display ready';
        }
        renderTimerControlsStateMachine();
        updateRundownVsActualUI(true);

        socket.emit('TC_RESET_TIMER', {
          durationSeconds: targetSec,
          sessionTitle: sessionTitle,
          mode: curMode,
          userName: currentUser ? currentUser.name : 'Operator',
          userEmail: currentUser ? currentUser.email : '',
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });

        // Set juga durasi di server
        socket.emit('TC_SET_DURATION', {
          durationSeconds: targetSec,
          userEmail: currentUser ? currentUser.email : ''
        });
      });
    }

    // Wiring Timer Mode Switcher (Countdown vs Count-up) - Selalu Reset Timer Saat Ganti Mode!
    const btnModeCountdown = document.getElementById('btn-mode-countdown');
    const btnModeCountup = document.getElementById('btn-mode-countup');
    if (btnModeCountdown) {
      btnModeCountdown.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        // Optimistic reset: Ganti mode ke Countdown dan reset durasi ke rencana sesi
        activeTimerState.mode = 'COUNTDOWN';
        activeTimerState.status = 'IDLE';
        activeTimerState.isRunning = false;
        activeTimerState.targetEndTime = null;
        activeTimerState.startTime = null;
        activeTimerState.pausedAt = null;
        activeTimerState.elapsedSeconds = 0;
        const dur = (currentActiveSession && currentActiveSession.planSeconds) || activeTimerState.durationSeconds || 300;
        activeTimerState.durationSeconds = dur;
        activeTimerState.remainingSeconds = dur;
        if (timerDisplay) {
          timerDisplay.textContent = formatTime(dur);
          timerDisplay.className = 'timer-display ready';
        }
        renderTimerControlsStateMachine();
        updateRundownVsActualUI(true);

        socket.emit('TC_SET_TIMER_MODE', {
          mode: 'COUNTDOWN',
          userEmail: currentUser ? currentUser.email : '',
          userName: currentUser ? currentUser.name : '',
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }
    if (btnModeCountup) {
      btnModeCountup.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        // Optimistic reset: Ganti mode ke Count-up dan reset waktu ke 00:00
        activeTimerState.mode = 'COUNTUP';
        activeTimerState.status = 'IDLE';
        activeTimerState.isRunning = false;
        activeTimerState.targetEndTime = null;
        activeTimerState.startTime = null;
        activeTimerState.pausedAt = null;
        activeTimerState.elapsedSeconds = 0;
        activeTimerState.remainingSeconds = 0;
        if (timerDisplay) {
          timerDisplay.textContent = '00:00';
          timerDisplay.className = 'timer-display ready';
        }
        renderTimerControlsStateMachine();
        updateRundownVsActualUI(true);

        socket.emit('TC_SET_TIMER_MODE', {
          mode: 'COUNTUP',
          userEmail: currentUser ? currentUser.email : '',
          userName: currentUser ? currentUser.name : '',
          eventId: currentActiveEvent ? currentActiveEvent.id : null
        });
      });
    }

    // Wiring Operator Badge & Audit Logs Modal
    function updateTimerOperatorNotice(timerData) {
      const badgeText = document.getElementById('timer-operator-text');
      if (!badgeText) return;
      try {
        const t = timerData || activeTimerState;
        if (!t) {
          badgeText.innerHTML = '<span>Operator: <strong>Belum ada operator</strong></span>';
          return;
        }

        const modeStr = (t.mode === 'COUNTUP') ? 'Count-up' : 'Countdown';
        if (t.status === 'RUNNING' || t.isRunning) {
          const who = t.startedBy?.name || t.lastAction?.userName || 'Operator';
          const time = t.startedBy?.time ? formatClockTime(t.startedBy.time) : '';
          badgeText.innerHTML = `<span>▶ Dimulai oleh: <strong>${escapeHtml(who)}</strong> ${time ? `(${time})` : ''} • Mode: ${modeStr}</span>`;
        } else if (t.status === 'PAUSED') {
          const who = t.lastAction?.userName || 'Operator';
          const time = t.lastAction?.time ? formatClockTime(t.lastAction.time) : '';
          badgeText.innerHTML = `<span>⏸ Dijeda oleh: <strong>${escapeHtml(who)}</strong> ${time ? `(${time})` : ''}</span>`;
        } else if (t.status === 'STOPPED') {
          const who = t.stoppedBy?.name || t.lastAction?.userName || 'Operator';
          const time = t.stoppedBy?.time ? formatClockTime(t.stoppedBy.time) : '';
          badgeText.innerHTML = `<span>⏹ Di-Stop oleh: <strong>${escapeHtml(who)}</strong> ${time ? `(${time})` : ''}</span>`;
        } else if (t.lastAction) {
          const who = t.lastAction.userName || 'Operator';
          const time = t.lastAction.time ? formatClockTime(t.lastAction.time) : '';
          const act = t.lastAction.type || 'Aktivitas';
          badgeText.innerHTML = `<span>${act}: <strong>${escapeHtml(who)}</strong> ${time ? `(${time})` : ''}</span>`;
        } else {
          badgeText.innerHTML = '<span>Operator: <strong>Siap (Belum ada aksi)</strong></span>';
        }
      } catch (err) {
        console.warn('updateTimerOperatorNotice error:', err);
      }
    }

    async function openTimerLogsModal() {
      const modal = document.getElementById('timer-logs-modal');
      const listContainer = document.getElementById('timer-log-list');
      if (!modal || !listContainer) return;

      listContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">Memuat riwayat log audit...</div>';
      modal.classList.add('active');

      try {
        const evId = currentActiveEvent ? currentActiveEvent.id : '';
        const res = await fetch(`/api/timer-chat/timer/logs${evId ? `?eventId=${encodeURIComponent(evId)}` : ''}`);
        if (!res.ok) throw new Error('Gagal memuat log audit timer.');
        const data = await res.json();
        const logs = Array.isArray(data.logs) ? data.logs : [];

        if (logs.length === 0) {
          listContainer.innerHTML = '<div style="text-align: center; padding: 24px 10px; color: #64748b; font-size: 12px;">Belum ada riwayat aktivitas timer yang tercatat.</div>';
          return;
        }

        const reversed = logs.slice().reverse();
        listContainer.innerHTML = reversed.map(item => {
          const action = (item.action || '').toUpperCase();
          const tagClass = action.toLowerCase();
          const actionLabel = action === 'START' ? 'Mulai' : (action === 'PAUSE' ? 'Jeda' : (action === 'STOP' ? 'Stop' : (action === 'RESET' ? 'Reset' : action)));
          const who = escapeHtml(item.userName || item.userEmail || 'Operator');
          const time = item.timestamp ? new Date(item.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
          const modeLabel = item.mode ? `[${item.mode}]` : '';
          const session = item.sessionTitle ? `• Sesi: "${escapeHtml(item.sessionTitle)}"` : '';

          return `
            <div class="timer-log-item">
              <div class="timer-log-meta-left">
                <span class="timer-log-action-tag ${tagClass}">${actionLabel}</span>
                <div>
                  <strong style="color: #f1f5f9; font-size: 12px;">${who}</strong>
                  ${item.userEmail && item.userEmail !== who ? `<small style="color: #64748b; margin-left: 4px;">(${escapeHtml(item.userEmail)})</small>` : ''}
                  <div style="color: #94a3b8; font-size: 10.5px; margin-top: 1px;">
                    ${modeLabel} ${session}
                  </div>
                </div>
              </div>
              <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700; flex-shrink: 0;">${time}</span>
            </div>
          `;
        }).join('');
      } catch (err) {
        listContainer.innerHTML = `<div style="text-align: center; padding: 20px; color: #f87171; font-size: 12px;">Gagal memuat log: ${escapeHtml(err.message)}</div>`;
      }
    }

    const btnViewTimerLogs = document.getElementById('btn-view-timer-logs');
    if (btnViewTimerLogs) {
      btnViewTimerLogs.addEventListener('click', openTimerLogsModal);
    }
    const btnCloseTimerLogsModal = document.getElementById('btn-close-timer-logs-modal');
    if (btnCloseTimerLogsModal) {
      btnCloseTimerLogsModal.addEventListener('click', () => {
        const modal = document.getElementById('timer-logs-modal');
        if (modal) modal.classList.remove('active');
      });
    }
    const btnCloseTimerLogsAction = document.getElementById('btn-close-timer-logs-action');
    if (btnCloseTimerLogsAction) {
      btnCloseTimerLogsAction.addEventListener('click', () => {
        const modal = document.getElementById('timer-logs-modal');
        if (modal) modal.classList.remove('active');
      });
    }

    // Hidden compatibility aliases trigger handlers
    const legacyStart = document.getElementById('btn-timer-start');
    if (legacyStart) {
      legacyStart.addEventListener('click', () => {
        if (btnTimerPrimary) btnTimerPrimary.click();
      });
    }
    const legacyPause = document.getElementById('btn-timer-pause');
    if (legacyPause) {
      legacyPause.addEventListener('click', () => {
        if (!checkTimerControlPermission()) return;
        socket.emit('TC_PAUSE_TIMER', { userEmail: currentUser ? currentUser.email : '' });
      });
    }
    const legacyReset = document.getElementById('btn-timer-reset');
    if (legacyReset) {
      legacyReset.addEventListener('click', () => {
        if (btnTimerSecondary) btnTimerSecondary.click();
      });
    }

    // Keyboard Shortcuts (Spacebar: Start/Pause/Resume, Esc: Stop/Reset)
    document.addEventListener('keydown', (e) => {
      // Jangan trigger shortcut jika user sedang mengetik di input chat, pencarian, dsb
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (btnTimerPrimary) btnTimerPrimary.click();
      } else if (e.code === 'Escape') {
        if (btnTimerSecondary && btnTimerSecondary.style.display !== 'none') {
          e.preventDefault();
          btnTimerSecondary.click();
        }
      }
    });

    // Preset dropdown toggle & click outside
    const presetDropdownWrapper = document.getElementById('preset-dropdown-wrapper');
    const btnPresetDropdown = document.getElementById('btn-preset-dropdown');

    if (btnPresetDropdown && presetDropdownWrapper) {
      btnPresetDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        presetDropdownWrapper.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!presetDropdownWrapper.contains(e.target)) {
          presetDropdownWrapper.classList.remove('active');
        }
      });
    }

    // Overlay dropdown toggle & click outside (Mobile & Desktop)
    const overlayDropdownWrapper = document.getElementById('overlay-dropdown-wrapper');
    const btnOverlayDropdown = document.getElementById('btn-overlay-dropdown');

    if (btnOverlayDropdown && overlayDropdownWrapper) {
      btnOverlayDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        overlayDropdownWrapper.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!overlayDropdownWrapper.contains(e.target)) {
          overlayDropdownWrapper.classList.remove('active');
        }
      });
    }

    // Overlay Broadcast Chat Live Toggle (Admin Control)
    const btnToggleOverlayChat = document.getElementById('btn-toggle-overlay-chat');
    const statusOverlayChatText = document.getElementById('status-overlay-chat-text');
    let currentOverlayChatVisible = false;

    function updateOverlayChatToggleUI(visible) {
      currentOverlayChatVisible = !!visible;
      if (btnToggleOverlayChat) {
        btnToggleOverlayChat.classList.toggle('active', currentOverlayChatVisible);
      }
      if (statusOverlayChatText) {
        statusOverlayChatText.textContent = currentOverlayChatVisible ? 'Status: TAMPIL (AKTIF)' : 'Status: HIDE';
      }
    }

    if (btnToggleOverlayChat) {
      btnToggleOverlayChat.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!checkTimerControlPermission()) return;
        const newVisible = !currentOverlayChatVisible;
        socket.emit('TC_SET_OVERLAY_CHAT_VISIBILITY', {
          visible: newVisible,
          userEmail: currentUser ? currentUser.email : ''
        });
        updateOverlayChatToggleUI(newVisible);
      });
    }

    // Preset pills click (baik yang di luar maupun di dalam dropdown)
    document.querySelectorAll('.preset-pill[data-sec]').forEach(pill => {
      pill.addEventListener('click', () => {
        if (presetDropdownWrapper) presetDropdownWrapper.classList.remove('active');
        if (!checkTimerControlPermission()) return;

        // Cegah perubahan waktu saat timer sedang aktif berjalan
        if (activeTimerState.status === 'RUNNING') {
          showAlertDialog({
            title: 'Timer Sedang Berjalan',
            message: 'Timer saat ini sedang aktif berjalan! Mohon jeda atau hentikan (Stop / Pause) timer terlebih dahulu sebelum memilih preset durasi lain.'
          });
          return;
        }

        const sec = parseInt(pill.dataset.sec, 10);
        isCustomDurationSelected = true;
        pendingSessionSeparator = null;
        currentActiveSession = null;
        document.querySelectorAll('.rundown-row').forEach(r => r.classList.remove('is-current-playing'));

        socket.emit('TC_SET_DURATION', {
          durationSeconds: sec,
          userEmail: currentUser ? currentUser.email : ''
        });

        // Feedback visual aktif pada pill yang diklik
        document.querySelectorAll('.preset-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    // === 6. MODAL DURASI KUSTOM ELEGAN (Menggantikan window.prompt jelek) ===
    const customDurationModal = document.getElementById('custom-duration-modal');
    const customDurationInput = document.getElementById('custom-duration-input');
    const btnCustomDuration = document.getElementById('btn-custom-duration');
    const btnCloseDurationModal = document.getElementById('btn-close-duration-modal');
    const btnCancelCustomDuration = document.getElementById('btn-cancel-custom-duration');
    const btnConfirmCustomDuration = document.getElementById('btn-confirm-custom-duration');

    function openCustomDurationModal() {
      if (!checkTimerControlPermission()) return;
      if (activeTimerState.status === 'RUNNING') {
        showAlertDialog({
          title: 'Timer Sedang Berjalan',
          message: 'Timer saat ini sedang aktif berjalan! Mohon jeda atau hentikan (Stop / Pause) timer terlebih dahulu sebelum mengatur durasi kustom.'
        });
        return;
      }
      customDurationInput.value = '';
      customDurationModal.classList.add('active');
      setTimeout(() => customDurationInput.focus(), 150);
    }

    function closeCustomDurationModal() {
      customDurationModal.classList.remove('active');
    }

    btnCustomDuration.addEventListener('click', openCustomDurationModal);
    btnCloseDurationModal.addEventListener('click', closeCustomDurationModal);
    btnCancelCustomDuration.addEventListener('click', closeCustomDurationModal);

    function submitCustomDuration() {
      if (!checkTimerControlPermission()) return;
      if (activeTimerState.status === 'RUNNING') {
        showAlertDialog({
          title: 'Timer Sedang Berjalan',
          message: 'Timer saat ini sedang aktif berjalan! Mohon jeda atau hentikan (Stop / Pause) timer terlebih dahulu sebelum mengatur durasi kustom.'
        });
        return;
      }
      const val = customDurationInput.value.trim();
      if (!val) return;
      let totalSec = 0;
      if (val.toLowerCase().endsWith('m')) {
        totalSec = parseInt(val, 10) * 60;
      } else if (val.toLowerCase().endsWith('s')) {
        totalSec = parseInt(val, 10);
      } else {
        totalSec = parseInt(val, 10) * 60;
      }
      if (totalSec > 0) {
        isCustomDurationSelected = true;
        pendingSessionSeparator = null;
        currentActiveSession = null;
        document.querySelectorAll('.rundown-row').forEach(r => r.classList.remove('is-current-playing'));

        socket.emit('TC_SET_DURATION', {
          durationSeconds: totalSec,
          userEmail: currentUser ? currentUser.email : ''
        });
        closeCustomDurationModal();
      } else {
        showAlertDialog({ title: 'Format Tidak Valid', message: 'Format durasi tidak valid. Gunakan format seperti 7m atau 45s.' });
      }
    }

    btnConfirmCustomDuration.addEventListener('click', submitCustomDuration);
    customDurationInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitCustomDuration();
      if (e.key === 'Escape') closeCustomDurationModal();
    });

    // === 7. CONTEXT MENU LOGIC ===
    const timerCard = document.getElementById('timer-card');
    const ctxMenu = document.getElementById('timer-context-menu');
    const btnMobilePreset = document.getElementById('btn-mobile-preset');

    function showContextMenu(x, y) {
      const menuWidth = 220;
      const menuHeight = 280;
      const posX = Math.min(x, window.innerWidth - menuWidth - 10);
      const posY = Math.min(y, window.innerHeight - menuHeight - 10);

      ctxMenu.style.left = `${Math.max(10, posX)}px`;
      ctxMenu.style.top = `${Math.max(10, posY)}px`;
      ctxMenu.classList.add('active');
    }

    timerCard.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY);
    });

    btnMobilePreset.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = btnMobilePreset.getBoundingClientRect();
      showContextMenu(rect.left, rect.bottom + 6);
    });

    document.addEventListener('click', (e) => {
      if (!ctxMenu.contains(e.target) && e.target !== btnMobilePreset) {
        ctxMenu.classList.remove('active');
      }
    });

    ctxMenu.querySelectorAll('.context-item[data-sec]').forEach(item => {
      item.addEventListener('click', () => {
        if (activeTimerState.status === 'RUNNING') {
          showAlertDialog({
            title: 'Timer Sedang Berjalan',
            message: 'Timer saat ini sedang aktif berjalan! Mohon jeda atau hentikan (Stop / Pause) timer terlebih dahulu sebelum memilih preset durasi.'
          });
          ctxMenu.classList.remove('active');
          return;
        }
        const sec = parseInt(item.dataset.sec, 10);
        isCustomDurationSelected = true;
        pendingSessionSeparator = null;
        currentActiveSession = null;
        document.querySelectorAll('.rundown-row').forEach(r => r.classList.remove('is-current-playing'));

        socket.emit('TC_SET_DURATION', {
          durationSeconds: sec,
          userEmail: currentUser ? currentUser.email : ''
        });
        ctxMenu.classList.remove('active');
      });
    });

    document.getElementById('ctx-custom').addEventListener('click', () => {
      ctxMenu.classList.remove('active');
      openCustomDurationModal();
    });

    // === 8. CHAT & FONT RESIZER ===
    const fontResizerButtons = document.querySelectorAll('.btn-font-scale');
    const fontResizerDropdownWrapper = document.getElementById('font-resizer-dropdown-wrapper');
    const btnFontDropdownToggle = document.getElementById('btn-font-dropdown-toggle');
    const fontDropdownCurrentLabel = document.getElementById('font-dropdown-current-label');

    if (btnFontDropdownToggle && fontResizerDropdownWrapper) {
      btnFontDropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        fontResizerDropdownWrapper.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!fontResizerDropdownWrapper.contains(e.target)) {
          fontResizerDropdownWrapper.classList.remove('active');
        }
      });
    }

    fontResizerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        fontResizerButtons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`.btn-font-scale[data-size="${size}"]`).forEach(b => b.classList.add('active'));
        document.documentElement.style.setProperty('--chat-font-size', size);
        if (fontDropdownCurrentLabel) {
          const rawText = btn.textContent.trim().split(' ')[0] || 'Aa';
          fontDropdownCurrentLabel.textContent = `Aa (${rawText})`;
        }
        if (fontResizerDropdownWrapper) {
          fontResizerDropdownWrapper.classList.remove('active');
        }
      });
    });

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-messages');

    // Guest vs Login elements
    const guestNameBar = document.getElementById('guest-name-bar');
    const guestNameInput = document.getElementById('guest-name-input');
    const guestNameWarning = document.getElementById('guest-name-warning');
    const chatToolsGroup = document.getElementById('chat-tools-group');
    const charLimitCount = document.getElementById('char-limit-count');
    const cooldownIndicator = document.getElementById('cooldown-indicator');
    const cooldownSecondsEl = document.getElementById('cooldown-seconds');
    const btnSendChat = document.getElementById('btn-send-chat');

    // Emoji, Sticker & Media elements
    const btnOpenEmoji = document.getElementById('btn-open-emoji');
    const btnOpenSticker = document.getElementById('btn-open-sticker');
    const btnOpenMedia = document.getElementById('btn-open-media');
    const emojiPickerPanel = document.getElementById('emoji-picker-panel');
    const stickerPickerPanel = document.getElementById('sticker-picker-panel');
    const emojiGridContainer = document.getElementById('emoji-grid-container');
    const stickerGridContainer = document.getElementById('sticker-grid-container');
    const btnCloseEmojiPicker = document.getElementById('btn-close-emoji-picker');
    const btnCloseStickerPicker = document.getElementById('btn-close-sticker-picker');
    const btnCreateSticker = document.getElementById('btn-create-sticker');
    const chatFileInput = document.getElementById('chat-file-input');
    const stickerFileInput = document.getElementById('sticker-file-input');

    const mediaAttachmentPreview = document.getElementById('media-attachment-preview');
    const mediaPreviewImg = document.getElementById('media-preview-img');
    const mediaPreviewName = document.getElementById('media-preview-name');
    const btnRemoveMedia = document.getElementById('btn-remove-media');

    // Quote Attachment Preview Elements
    const chatQuoteBar = document.getElementById('chat-quote-bar');
    const quoteBarSender = document.getElementById('quote-bar-sender');
    const quoteBarText = document.getElementById('quote-bar-text');
    const btnCancelQuote = document.getElementById('btn-cancel-quote');

    // State Variables
    let currentAttachedMedia = null; // { url: base64/link, type: 'IMAGE' | 'STICKER', name: string }
    let activeQuoteMessage = null; // { id, userName, text }
    let guestCooldownRemaining = 0;
    let guestCooldownTimer = null;

    function setQuoteReply(quoteObj) {
      if (!quoteObj) return;
      activeQuoteMessage = {
        id: quoteObj.id,
        userName: quoteObj.userName || 'Peserta',
        text: (quoteObj.text || quoteObj.message || '').substring(0, 100)
      };
      if (chatQuoteBar && quoteBarSender && quoteBarText) {
        quoteBarSender.textContent = `Membalas ke ${activeQuoteMessage.userName}`;
        quoteBarText.textContent = activeQuoteMessage.text || 'Lampiran media';
        chatQuoteBar.style.display = 'flex';
      }
      if (chatInput) {
        chatInput.focus();
      }
    }

    function clearQuoteReply() {
      activeQuoteMessage = null;
      if (chatQuoteBar) {
        chatQuoteBar.style.display = 'none';
      }
    }

    if (btnCancelQuote) {
      btnCancelQuote.addEventListener('click', clearQuoteReply);
    }

    function toggleMessageReaction(messageId, emoji) {
      if (!messageId || !emoji) return;
      const myName = currentUser ? currentUser.displayName : ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || 'Peserta');
      const myEmail = currentUser ? currentUser.email : '';
      socket.emit('TC_TOGGLE_REACTION', {
        messageId,
        emoji,
        userName: myName,
        userEmail: myEmail,
        eventId: currentActiveEvent ? currentActiveEvent.id : null
      });
    }

    // Close actions menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.msg-actions-menu') && !e.target.closest('.btn-msg-more')) {
        document.querySelectorAll('.msg-actions-menu.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Helper: Validasi status aktif/disabled chat input & tombol Kirim
    function updateChatInputDisableState() {
      const isGuest = !currentUser;
      const guestName = guestNameInput ? guestNameInput.value.trim() : '';

      if (isGuest && !guestName) {
        if (chatInput) {
          chatInput.disabled = true;
          chatInput.placeholder = 'Silakan isi nama Anda di atas terlebih dahulu...';
        }
      } else {
        if (chatInput) {
          chatInput.disabled = false;
          chatInput.placeholder = isGuest
            ? 'Ketik pesan obrolan (maksimal 150 karakter)...'
            : 'Tulis pesan obrolan (opsional jika melampirkan media/sticker)...';
        }
      }
    }

    // Helper: Validasi status aktif/disabled tombol Kirim
    function updateSendButtonState() {
      if (!btnSendChat) return;

      // Jika guest belum isi nama, tombol kirim otomatis disabled
      if (!currentUser) {
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        if (!guestName || guestCooldownRemaining > 0) {
          btnSendChat.disabled = true;
          return;
        }
      }

      const hasText = !!(chatInput && chatInput.value.trim().length > 0);
      const hasMedia = !!currentAttachedMedia;

      // Disabled jika tidak ada teks dan tidak ada media attachment
      btnSendChat.disabled = !(hasText || hasMedia);
    }

    // Helper: Warning visual jika nama guest kosong
    let guestWarningTimer = null;
    function showGuestNameWarning(msg) {
      if (!guestNameBar) return;
      guestNameBar.classList.add('input-warning');
      if (guestNameWarning) {
        if (msg) {
          const span = guestNameWarning.querySelector('span');
          if (span) span.textContent = msg;
        }
        guestNameWarning.style.display = 'flex';
      }
      if (guestNameInput) {
        guestNameInput.focus();
      }
      if (guestWarningTimer) clearTimeout(guestWarningTimer);
      guestWarningTimer = setTimeout(() => {
        clearGuestNameWarning();
      }, 5000);
    }

    function clearGuestNameWarning() {
      if (guestWarningTimer) clearTimeout(guestWarningTimer);
      if (guestNameBar) guestNameBar.classList.remove('input-warning');
      if (guestNameWarning) guestNameWarning.style.display = 'none';
    }

    // Restore guest name if saved
    try {
      const savedGuestName = localStorage.getItem('tc_guest_name');
      if (savedGuestName && guestNameInput) {
        guestNameInput.value = savedGuestName;
      }
    } catch (e) {}

    if (guestNameInput) {
      guestNameInput.addEventListener('input', () => {
        const val = guestNameInput.value.trim();
        if (val.length > 0) {
          clearGuestNameWarning();
        }
        try {
          if (val) {
            localStorage.setItem('tc_guest_name', val);
          } else {
            localStorage.removeItem('tc_guest_name');
          }
        } catch (e) {}
        updateChatInputDisableState();
        updateSendButtonState();
      });
    }

    // === AUTO-RESIZING CHAT TEXTAREA (MAX 3 LINES + SCROLLING) ===
    let lastChatInputHeight = 0;
    function autoResizeChatInput() {
      if (!chatInput) return;
      const isMobile = window.innerWidth <= 920;
      const minSingleLine = isMobile ? 34 : 36;
      const maxThreeLines = isMobile ? 68 : 72;

      if (!chatInput.value) {
        if (lastChatInputHeight !== minSingleLine) {
          chatInput.style.height = `${minSingleLine}px`;
          chatInput.style.overflowY = 'hidden';
          lastChatInputHeight = minSingleLine;
        }
        return;
      }

      chatInput.style.height = 'auto';
      const scrollH = chatInput.scrollHeight;

      if (scrollH > maxThreeLines) {
        if (lastChatInputHeight !== maxThreeLines) {
          chatInput.style.height = `${maxThreeLines}px`;
          chatInput.style.overflowY = 'auto';
          lastChatInputHeight = maxThreeLines;
        }
      } else {
        const targetH = Math.max(minSingleLine, scrollH);
        if (lastChatInputHeight !== targetH) {
          chatInput.style.height = `${targetH}px`;
          chatInput.style.overflowY = 'hidden';
          lastChatInputHeight = targetH;
        }
      }
    }
    autoResizeChatInput();

    // Update Chat Input Character Counter
    function updateCharCounter() {
      if (!chatInput || !charLimitCount) return;
      const maxLen = 500;
      const currentLen = chatInput.value.length;
      charLimitCount.textContent = `${currentLen}/${maxLen}`;
      if (currentLen >= maxLen) {
        charLimitCount.style.color = '#ef4444';
      } else if (currentLen >= 420) {
        charLimitCount.style.color = '#f59e0b';
      } else {
        charLimitCount.style.color = '';
      }
    }

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          if (typeof chatForm.requestSubmit === 'function') {
            chatForm.requestSubmit();
          } else {
            chatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        } else {
          // Shift + Enter: new line
          setTimeout(() => {
            autoResizeChatInput();
          }, 0);
        }
      }
    });

    chatInput.addEventListener('input', () => {
      autoResizeChatInput();
      updateCharCounter();
      updateSendButtonState();
    });

    chatInput.addEventListener('paste', () => {
      setTimeout(() => {
        autoResizeChatInput();
        updateCharCounter();
        updateSendButtonState();
      }, 10);
    });

    // Apply Permissions based on Auth state
    function updateChatPermissionUI() {
      const isLoggedIn = !!currentUser;
      if (isLoggedIn) {
        // User Login: Full Access
        if (guestNameBar) guestNameBar.style.display = 'none';
        clearGuestNameWarning();
        if (chatToolsGroup) {
          chatToolsGroup.classList.remove('disabled');
          chatToolsGroup.querySelectorAll('.btn-chat-tool').forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
          });
          const btnEmoji = document.getElementById('btn-open-emoji');
          const btnSticker = document.getElementById('btn-open-sticker');
          const btnMedia = document.getElementById('btn-open-media');
          if (btnEmoji) btnEmoji.title = 'Pilih Emoji Cepat';
          if (btnSticker) btnSticker.title = 'Kirim Stiker & Buat Stiker Kustom';
          if (btnMedia) btnMedia.title = 'Lampirkan Gambar atau Screenshot';
        }
        chatInput.maxLength = 500;
        chatInput.placeholder = 'Tulis pesan obrolan (opsional jika melampirkan media/sticker)...';
        if (cooldownIndicator) cooldownIndicator.classList.remove('active');
        if (guestCooldownTimer) {
          clearInterval(guestCooldownTimer);
          guestCooldownTimer = null;
        }
      } else {
        // Guest (Belum Login): Chat Only, Name Required, 150 char limit, 15s cooldown
        if (guestNameBar) guestNameBar.style.display = 'flex';
        if (chatToolsGroup) {
          chatToolsGroup.classList.add('disabled');
          chatToolsGroup.querySelectorAll('.btn-chat-tool').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.4';
            btn.style.cursor = 'not-allowed';
          });
          const btnEmoji = document.getElementById('btn-open-emoji');
          const btnSticker = document.getElementById('btn-open-sticker');
          const btnMedia = document.getElementById('btn-open-media');
          if (btnEmoji) btnEmoji.title = 'Emoji hanya untuk pengguna yang telah login Google';
          if (btnSticker) btnSticker.title = 'Stiker hanya untuk pengguna yang telah login Google';
          if (btnMedia) btnMedia.title = 'Lampiran gambar hanya untuk pengguna yang telah login Google';
        }
        chatInput.maxLength = 150;
        chatInput.placeholder = 'Ketik pesan obrolan (maksimal 150 karakter)...';

        // Tutup picker jika terbuka
        if (emojiPickerPanel) emojiPickerPanel.classList.remove('active');
        if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        clearAttachedMedia();
      }
      updateCharCounter();
      updateChatInputDisableState();
      updateSendButtonState();
    }

    // Populate Emojis
    const EMOJI_LIST = [
      '👍', '👏', '🔥', '🎉', '💡', '❤️', '🙌', '🚀', 
      '😊', '🤝', '⭐', '💯', '✨', '🏆', '🎯', '💪',
      '👀', '🙋‍♂️', '🙋‍♀️', '🙏', '⚡', '🌟', '🏅', '☕'
    ];

    if (emojiGridContainer) {
      emojiGridContainer.innerHTML = '';
      EMOJI_LIST.forEach(em => {
        const item = document.createElement('div');
        item.className = 'emoji-grid-item';
        item.textContent = em;
        item.addEventListener('click', () => {
          chatInput.value += em;
          autoResizeChatInput();
          chatInput.focus();
          updateCharCounter();
          updateSendButtonState();
        });
        emojiGridContainer.appendChild(item);
      });
    }

    // Sticker Presets (Educamp, TPM & Quality Badges)
    const PRESET_STICKERS = [
      {
        name: 'Educamp 2026',
        url: '/images/Logo%20Educamp%202026.png'
      },
      {
        name: 'Semangat Juara',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#f59e0b" stroke="#b45309" stroke-width="6"/><text x="50%" y="45%" text-anchor="middle" font-size="34">🔥</text><text x="50%" y="75%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff">SEMANGAT!</text></svg>')
      },
      {
        name: 'TPM Excellent',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="20" fill="#0284c7" stroke="#0369a1" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="32">🏆</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="#ffffff">TPM EXCELLENT</text></svg>')
      },
      {
        name: 'Good Job',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#10b981" stroke="#047857" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="34">👏</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#ffffff">GOOD JOB!</text></svg>')
      },
      {
        name: 'Question / Tanya',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#6366f1" stroke="#4338ca" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="34">❓</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff">Q&amp;A SESI</text></svg>')
      },
      {
        name: 'Zero Breakdown',
        url: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="10" width="100" height="100" rx="20" fill="#ef4444" stroke="#b91c1c" stroke-width="6"/><text x="50%" y="48%" text-anchor="middle" font-size="32">🛡️</text><text x="50%" y="78%" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#ffffff">ZERO BREAKDOWN</text></svg>')
      }
    ];

    function getStickerStorageKey() {
      if (!currentUser) return null;
      const id = (currentUser.email || currentUser.uid || currentUser.displayName || '').trim().toLowerCase();
      return id ? `tc_custom_stickers_${id}` : null;
    }

    function getCustomStickers() {
      const key = getStickerStorageKey();
      if (!key) return [];
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveCustomSticker(stk) {
      if (!currentUser) {
        showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker.' });
        return false;
      }
      const key = getStickerStorageKey();
      if (!key) return false;

      try {
        const list = getCustomStickers();
        // Cek duplikasi url
        const exists = list.some(item => item.url === stk.url);
        if (exists) {
          showAlertDialog({ title: 'Stiker Tersedia', message: 'Stiker ini sudah ada di koleksi stiker akun Anda.' });
          return false;
        }

        const rawName = (stk.fullName || stk.name || 'Sticker').trim();
        const shortenedName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;

        list.unshift({
          name: shortenedName,
          fullName: rawName,
          url: stk.url
        });
        // Batasi maksimal 20 custom stickers per user
        if (list.length > 20) list.pop();
        localStorage.setItem(key, JSON.stringify(list));
        return true;
      } catch (e) {
        console.error('Gagal menyimpan stiker:', e);
        return false;
      }
    }

    function deleteCustomSticker(url) {
      const key = getStickerStorageKey();
      if (!key) return;
      try {
        let list = getCustomStickers();
        list = list.filter(item => item.url !== url);
        localStorage.setItem(key, JSON.stringify(list));
        renderStickerGrid();
      } catch (e) {}
    }

    // Expose helper secara global agar bisa dipanggil dari action menu / lightbox
    window.saveStickerToMySlot = function(stkUrl, stkName = 'Sticker') {
      if (!currentUser) {
        showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker ke slot Anda.' });
        return;
      }
      const success = saveCustomSticker({
        url: stkUrl,
        name: stkName,
        fullName: stkName
      });
      if (success) {
        renderStickerGrid();
        showAlertDialog({ title: 'Stiker Disimpan', message: 'Stiker berhasil disimpan ke slot stiker akun Anda!' });
      }
    };

    function renderStickerGrid() {
      if (!stickerGridContainer) return;
      stickerGridContainer.innerHTML = '';
      
      const customList = getCustomStickers();
      const allStickers = [...customList, ...PRESET_STICKERS];

      allStickers.forEach(stk => {
        const item = document.createElement('div');
        item.className = 'sticker-grid-item';
        const rawName = (stk.fullName || stk.name || 'Sticker').trim();
        const displayName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;
        item.title = rawName;

        const isCustom = customList.some(c => c.url === stk.url);

        item.innerHTML = `
          ${isCustom ? `
          <button type="button" class="btn-del-sticker" title="Hapus dari koleksi">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 10px; height: 10px; pointer-events: none;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>` : ''}
          <img src="${stk.url}" alt="${displayName}" loading="lazy">
          <span>${displayName}</span>
        `;

        if (isCustom) {
          const btnDel = item.querySelector('.btn-del-sticker');
          if (btnDel) {
            btnDel.addEventListener('click', async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const ok = await showConfirmDialog({
                title: 'Hapus Stiker',
                message: `Apakah Anda yakin ingin menghapus stiker "${rawName}" dari koleksi akun Anda?`,
                confirmText: 'Hapus Stiker'
              });
              if (ok) {
                deleteCustomSticker(stk.url);
              }
            });
          }
        }

        item.addEventListener('click', () => {
          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login Google terlebih dahulu untuk mengirim stiker.' });
            return;
          }
          currentAttachedMedia = {
            url: stk.url,
            type: 'STICKER',
            name: displayName
          };
          renderMediaPreview();
          if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        });
        stickerGridContainer.appendChild(item);
      });
    }

    renderStickerGrid();

    // Trigger Bikin Sticker Sendiri (PNG / GIF Only)
    if (btnCreateSticker) {
      btnCreateSticker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur Buat Stiker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (stickerFileInput) stickerFileInput.click();
      });
    }

    // Helper: Resize & Crop Sticker ke Ukuran Kecil (Max 160x160 px, PNG / GIF Only)
    function processStickerFile(file) {
      return new Promise((resolve, reject) => {
        const validTypes = ['image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
          return reject(new Error('Format stiker hanya diperbolehkan file PNG atau GIF transparan!'));
        }

        // Jika GIF animasi, pertahankan format dan batasi ukuran file maksimal 1 MB
        if (file.type === 'image/gif') {
          if (file.size > 1.5 * 1024 * 1024) {
            return reject(new Error('Ukuran file GIF animasi maksimal 1.5 MB agar ringan.'));
          }
          const reader = new FileReader();
          reader.onload = (e) => resolve({ dataUrl: e.target.result, name: file.name.replace(/\.[^/.]+$/, '') });
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        // Jika PNG, lakukan kompresi & resize ke dimensi stiker kecil (maks 160x160 px)
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const maxDim = 160;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const pngDataUrl = canvas.toDataURL('image/png');
            resolve({
              dataUrl: pngDataUrl,
              name: file.name.replace(/\.[^/.]+$/, '')
            });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    if (stickerFileInput) {
      stickerFileInput.addEventListener('change', async () => {
        const file = stickerFileInput.files[0];
        if (!file) return;

        try {
          const result = await processStickerFile(file);
          const rawName = (result.name || 'Sticker').trim();
          const shortenedName = rawName.length > 5 ? rawName.substring(0, 5) + '...' : rawName;
          const newStk = {
            name: shortenedName,
            fullName: rawName,
            url: result.dataUrl
          };
          saveCustomSticker(newStk);
          renderStickerGrid();

          // Otomatis attach sticker yang baru dibuat
          currentAttachedMedia = {
            url: newStk.url,
            type: 'STICKER',
            name: newStk.name
          };
          renderMediaPreview();
          if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
          stickerFileInput.value = '';
        } catch (err) {
          showAlertDialog({ title: 'Gagal Membuat Stiker', message: err.message });
          stickerFileInput.value = '';
        }
      });
    }

    // Toggle Panels
    if (btnOpenEmoji) {
      btnOpenEmoji.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Emoji picker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (stickerPickerPanel) stickerPickerPanel.classList.remove('active');
        if (emojiPickerPanel) emojiPickerPanel.classList.toggle('active');
      });
    }

    if (btnOpenSticker) {
      btnOpenSticker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur Stiker hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        if (emojiPickerPanel) emojiPickerPanel.classList.remove('active');
        if (stickerPickerPanel) stickerPickerPanel.classList.toggle('active');
      });
    }

    if (btnOpenMedia) {
      btnOpenMedia.addEventListener('click', () => {
        if (!currentUser) {
          showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur unggah media hanya tersedia bagi pengguna yang telah login Google.' });
          return;
        }
        chatFileInput.click();
      });
    }

    if (btnCloseEmojiPicker) {
      btnCloseEmojiPicker.addEventListener('click', () => emojiPickerPanel.classList.remove('active'));
    }
    if (btnCloseStickerPicker) {
      btnCloseStickerPicker.addEventListener('click', () => stickerPickerPanel.classList.remove('active'));
    }

    // Close pickers on click outside
    document.addEventListener('click', (e) => {
      if (emojiPickerPanel && emojiPickerPanel.classList.contains('active') && !emojiPickerPanel.contains(e.target) && e.target !== btnOpenEmoji) {
        emojiPickerPanel.classList.remove('active');
      }
      if (stickerPickerPanel && stickerPickerPanel.classList.contains('active') && !stickerPickerPanel.contains(e.target) && e.target !== btnOpenSticker) {
        stickerPickerPanel.classList.remove('active');
      }
    });

    // Helper: Kompresi Gambar Otomatis (Full Client-side Canvas Compression)
    function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
      return new Promise((resolve, reject) => {
        // GIF dibiarkan agar animasinya tidak hilang
        if (file.type === 'image/gif') {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ dataUrl: e.target.result, size: file.size });
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
              if (width / height > maxWidth / maxHeight) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve({ dataUrl: compressedDataUrl, width, height });
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    // Handle Media File Selection (Kompresi Otomatis sebelum attach)
    if (chatFileInput) {
      chatFileInput.addEventListener('change', async () => {
        const file = chatFileInput.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          showAlertDialog({ title: 'Format Tidak Didukung', message: 'Hanya file gambar yang diizinkan (PNG, JPG, WebP, GIF).' });
          chatFileInput.value = '';
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          showAlertDialog({ title: 'Ukuran Terlalu Besar', message: 'Ukuran file asli melebihi batas maksimal 10 MB.' });
          chatFileInput.value = '';
          return;
        }

        try {
          const compressed = await compressImageFile(file);
          currentAttachedMedia = {
            url: compressed.dataUrl,
            type: 'IMAGE',
            name: file.name
          };
          renderMediaPreview();
        } catch (err) {
          console.error('Gagal mengompresi gambar:', err);
          showAlertDialog({ title: 'Gagal Memproses Gambar', message: err.message });
        }
      });
    }

    // Handle Clipboard Paste Image (Ctrl+V / Paste gambar langsung ke chat)
    document.addEventListener('paste', async (e) => {
      const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();

          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Fitur lampiran gambar hanya tersedia bagi pengguna yang telah login Google.' });
            return;
          }

          const file = item.getAsFile();
          if (!file) return;

          try {
            const compressed = await compressImageFile(file);
            currentAttachedMedia = {
              url: compressed.dataUrl,
              type: 'IMAGE',
              name: `Pasted_Image_${Date.now()}.jpg`
            };
            renderMediaPreview();
            if (chatInput) chatInput.focus();
          } catch (err) {
            console.error('Gagal memproses gambar dari clipboard:', err);
            showAlertDialog({ title: 'Gagal Memproses Gambar', message: err.message });
          }
          break;
        }
      }
    });

    function renderMediaPreview() {
      if (!mediaAttachmentPreview) return;
      if (currentAttachedMedia) {
        mediaPreviewImg.src = currentAttachedMedia.url;
        mediaPreviewName.textContent = currentAttachedMedia.name || 'Lampiran Gambar';
        mediaAttachmentPreview.classList.add('active');
      } else {
        mediaAttachmentPreview.classList.remove('active');
        mediaPreviewImg.src = '';
        mediaPreviewName.textContent = '';
      }
      updateSendButtonState();
    }

    function clearAttachedMedia() {
      currentAttachedMedia = null;
      if (chatFileInput) chatFileInput.value = '';
      renderMediaPreview();
      updateSendButtonState();
    }

    if (btnRemoveMedia) {
      btnRemoveMedia.addEventListener('click', clearAttachedMedia);
    }

    // Cooldown Timer Logic for Guests (15s)
    function startGuestCooldown() {
      guestCooldownRemaining = 15;
      if (cooldownIndicator) cooldownIndicator.classList.add('active');
      if (cooldownSecondsEl) cooldownSecondsEl.textContent = guestCooldownRemaining;
      updateSendButtonState();

      if (guestCooldownTimer) clearInterval(guestCooldownTimer);
      guestCooldownTimer = setInterval(() => {
        guestCooldownRemaining--;
        if (cooldownSecondsEl) cooldownSecondsEl.textContent = guestCooldownRemaining;
        if (guestCooldownRemaining <= 0) {
          clearInterval(guestCooldownTimer);
          guestCooldownTimer = null;
          if (cooldownIndicator) cooldownIndicator.classList.remove('active');
          updateSendButtonState();
        }
      }, 1000);
    }

    chatInput.addEventListener('focus', () => {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        chatInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = chatInput.value.trim();
      const hasMedia = !!currentAttachedMedia;

      if (!text && !hasMedia) return;

      // 1. Validasi Guest (Non-Login)
      if (!currentUser) {
        const guestName = guestNameInput ? guestNameInput.value.trim() : '';
        if (!guestName) {
          showGuestNameWarning('Wajib isi nama Anda terlebih dahulu sebelum mengirim pesan!');
          return;
        }
        if (guestCooldownRemaining > 0) {
          showAlertDialog({
            title: 'Batas Kirim Pesan',
            message: `Mohon tunggu ${guestCooldownRemaining} detik lagi sebelum mengirim pesan berikutnya.`
          });
          return;
        }
      }

      // 2. Siapkan Payload
      const guestName = guestNameInput ? guestNameInput.value.trim() : 'Peserta';
      const payload = {
        eventId: currentActiveEvent ? currentActiveEvent.id : null,
        userName: currentUser ? currentUser.displayName : (guestName || 'Peserta'),
        userEmail: currentUser ? currentUser.email : '',
        userPhoto: currentUser ? currentUser.photoURL : null,
        role: isUserAdmin ? 'ADMIN' : (currentUser ? 'USER' : 'AUDIENCE'),
        message: text,
        text: text,
        mediaUrl: currentAttachedMedia ? currentAttachedMedia.url : null,
        mediaType: currentAttachedMedia ? currentAttachedMedia.type : null,
        quote: activeQuoteMessage ? { ...activeQuoteMessage } : null
      };

      // Emit typing stop on submit
      stopTypingIndicator();

      socket.emit('TC_SEND_MESSAGE', payload);

      // 3. Reset Input
      chatInput.value = '';
      chatInput.style.height = '';
      autoResizeChatInput();
      clearAttachedMedia();
      clearQuoteReply();
      updateCharCounter();
      updateSendButtonState();

      // 4. Guest 15s Cooldown Activation
      if (!currentUser) {
        startGuestCooldown();
      }
    });

    // === TYPING INDICATOR BEHAVIOUR (VibeLocator Pattern) ===
    let typingTimeoutTimer = null;
    let isCurrentlyTypingSignal = false;
    let lastTypingTime = 0;

    const typingIndicatorBubble = document.getElementById('typing-indicator-bubble');
    const typingIndicatorText = document.getElementById('typing-indicator-text');
    let remoteTypingHideTimer = null;

    function emitTypingSignal() {
      const now = Date.now();
      if (!isCurrentlyTypingSignal || (now - lastTypingTime > 1500)) {
        isCurrentlyTypingSignal = true;
        lastTypingTime = now;
        const senderName = currentUser ? currentUser.displayName : (guestNameInput && guestNameInput.value.trim() ? guestNameInput.value.trim() : 'Peserta');
        socket.emit('TC_USER_TYPING', {
          userName: senderName,
          userEmail: currentUser ? currentUser.email : '',
          isTyping: true
        });
      }

      if (typingTimeoutTimer) clearTimeout(typingTimeoutTimer);
      typingTimeoutTimer = setTimeout(() => {
        stopTypingIndicator();
      }, 2500);
    }

    function stopTypingIndicator() {
      if (typingTimeoutTimer) clearTimeout(typingTimeoutTimer);
      if (isCurrentlyTypingSignal) {
        isCurrentlyTypingSignal = false;
        socket.emit('TC_USER_TYPING', {
          userName: currentUser ? currentUser.displayName : 'Peserta',
          userEmail: currentUser ? currentUser.email : '',
          isTyping: false
        });
      }
    }

    chatInput.addEventListener('input', () => {
      if (chatInput.value.trim().length > 0) {
        emitTypingSignal();
      } else {
        stopTypingIndicator();
      }
    });

    chatInput.addEventListener('blur', () => {
      stopTypingIndicator();
    });

    socket.on('TC_USER_TYPING', (data) => {
      if (!typingIndicatorBubble || !typingIndicatorText) return;
      if (data && data.isTyping) {
        const who = escapeHtml(data.userName || 'Seseorang');
        typingIndicatorText.textContent = `${who} sedang mengetik...`;
        typingIndicatorBubble.classList.add('active');

        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        if (remoteTypingHideTimer) clearTimeout(remoteTypingHideTimer);
        remoteTypingHideTimer = setTimeout(() => {
          typingIndicatorBubble.classList.remove('active');
        }, 3500);
      } else {
        if (remoteTypingHideTimer) clearTimeout(remoteTypingHideTimer);
        typingIndicatorBubble.classList.remove('active');
      }
    });

    // Tracking last rendered message for Smart Consecutive Grouping
    let lastRenderedMessage = null;

    function updateMessagesGrouping() {
      if (!chatContainer) return;
      const rows = Array.from(chatContainer.querySelectorAll('.chat-message-row'));
      if (rows.length === 0) return;

      rows.forEach((row, idx) => {
        const prevRow = rows[idx - 1];
        const nextRow = rows[idx + 1];

        const isOwn = row.classList.contains('is-own-message');
        const MAX_CONSECUTIVE_GAP_MS = 10 * 60 * 1000; // Reset ke bubble 1 jika jeda chat >= 10 menit

        let prevIsSame = false;
        if (prevRow && (prevRow.classList.contains('is-own-message') === isOwn) && 
            (prevRow.dataset.senderKey === row.dataset.senderKey)) {
          const prevTime = new Date(prevRow.dataset.timestamp || 0).getTime();
          const currTime = new Date(row.dataset.timestamp || 0).getTime();
          if (Math.abs(currTime - prevTime) < MAX_CONSECUTIVE_GAP_MS) {
            prevIsSame = true;
          }
        }

        let nextIsSame = false;
        if (nextRow && (nextRow.classList.contains('is-own-message') === isOwn) && 
            (nextRow.dataset.senderKey === row.dataset.senderKey)) {
          const nextTime = new Date(nextRow.dataset.timestamp || 0).getTime();
          const currTime = new Date(row.dataset.timestamp || 0).getTime();
          if (Math.abs(nextTime - currTime) < MAX_CONSECUTIVE_GAP_MS) {
            nextIsSame = true;
          }
        }

        row.classList.remove('is-standalone', 'is-first', 'is-middle', 'is-last', 'is-consecutive');

        const avatarCol = row.querySelector('.msg-avatar-col');

        if (!prevIsSame && !nextIsSame) {
          // STANDALONE MESSAGE
          row.classList.add('is-standalone');
          if (avatarCol) avatarCol.classList.remove('consecutive-hidden');
        } else if (!prevIsSame && nextIsSame) {
          // FIRST MESSAGE IN GROUP
          row.classList.add('is-first');
          if (avatarCol) avatarCol.classList.remove('consecutive-hidden');
        } else if (prevIsSame && nextIsSame) {
          // MIDDLE MESSAGE IN GROUP
          row.classList.add('is-middle', 'is-consecutive');
          if (avatarCol) avatarCol.classList.add('consecutive-hidden');
        } else if (prevIsSame && !nextIsSame) {
          // LAST MESSAGE IN GROUP
          row.classList.add('is-last', 'is-consecutive');
          if (avatarCol) avatarCol.classList.add('consecutive-hidden');
        }
      });
    }

    let currentRenderedEventId = null;

    function shouldRerenderChat(newHistory, eventId) {
      if (!chatContainer) return true;
      if (!Array.isArray(newHistory)) return false;

      // 1. Jika active event berubah, wajib render ulang
      if (eventId && currentRenderedEventId && currentRenderedEventId !== eventId) {
        return true;
      }

      // 2. Ambil list ID pesan yang saat ini ter-render di DOM
      const renderedElements = chatContainer.querySelectorAll('[data-msg-id]');
      if (renderedElements.length !== newHistory.length) {
        return true;
      }

      if (newHistory.length === 0) return false;

      // 3. Bandingkan ID urutan pertama dan terakhir secara cepat
      if (renderedElements[0].dataset.msgId !== newHistory[0].id ||
          renderedElements[renderedElements.length - 1].dataset.msgId !== newHistory[newHistory.length - 1].id) {
        return true;
      }

      // 4. Periksa apakah ada pesan yang status deleted-nya berbeda
      for (let i = 0; i < newHistory.length; i++) {
        const domEl = renderedElements[i];
        const msg = newHistory[i];
        if (domEl.dataset.msgId !== msg.id) {
          return true;
        }
        if (msg.isDeleted && !domEl.classList.contains('is-deleted')) {
          return true;
        }
      }

      return false;
    }

    function renderChatMessages(messages, eventId = null) {
      if (!chatContainer) return;
      const targetEventId = eventId || (currentActiveEvent ? currentActiveEvent.id : null);
      currentRenderedEventId = targetEventId;

      const fragment = document.createDocumentFragment();
      lastRenderedMessage = null;
      messages.forEach(msg => appendChatMessage(msg, false, false, fragment));

      // Sinkronkan separator aktif terakhir jika ada
      const lastSep = [...messages].reverse().find(m => m.isSeparator);
      if (lastSep) {
        lastActiveSeparatorMessageId = lastSep.id;
        const rawTitle = lastSep.sessionTitle || lastSep.message || 'Sesi Acara';
        lastActiveSeparatorBaseTitle = rawTitle.split(' • Actual:')[0].trim();
      }

      chatContainer.innerHTML = '';
      chatContainer.appendChild(fragment);
      updateMessagesGrouping();
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendChatMessage(msg, isNew = false, triggerGrouping = true, targetParent = chatContainer) {
      if (!chatContainer || !targetParent) return;

      // Handle Sesi Separator Khusus
      if (msg.isSeparator) {
        const sep = document.createElement('div');
        sep.className = 'chat-session-separator';
        sep.dataset.msgId = msg.id;
        sep.innerHTML = `
          <div class="separator-badge">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="sep-text">${escapeHtml(msg.sessionTitle || msg.message || 'Sesi Baru')}</span>
            <div class="sep-actions">
              <button class="btn-sep-action edit" title="Ubah nama separator" data-sep-id="${msg.id}">✎</button>
              <button class="btn-sep-action del" title="Hapus separator ini" data-sep-id="${msg.id}">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 11px; height: 11px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          </div>
        `;

        // Separator Edit button
        const btnEditSep = sep.querySelector('.btn-sep-action.edit');
        if (btnEditSep) {
          btnEditSep.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditSeparatorModal(msg);
          });
        }

        // Separator Delete button
        const btnDelSep = sep.querySelector('.btn-sep-action.del');
        if (btnDelSep) {
          btnDelSep.addEventListener('click', async (e) => {
            e.stopPropagation();
            const ok = await showConfirmDialog({
              title: 'Hapus Separator Sesi',
              message: `Apakah Anda yakin ingin menghapus separator "${msg.sessionTitle || msg.message || 'Sesi'}" dari obrolan?`,
              confirmText: 'Hapus Separator'
            });
            if (ok) {
              socket.emit('TC_DELETE_MESSAGE', {
                messageId: msg.id,
                eventId: currentActiveEvent ? currentActiveEvent.id : null,
                requesterEmail: currentUser ? currentUser.email : '',
                requesterName: currentUser ? currentUser.displayName : 'Operator',
                isAdmin: isUserAdmin
              });
            }
          });
        }

        targetParent.appendChild(sep);
        if (isNew) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        return;
      }

      const row = document.createElement('div');
      row.className = 'chat-message-row';
      row.dataset.msgId = msg.id;
      row.dataset.timestamp = msg.timestamp || new Date().toISOString();

      // WhatsApp-Style Consistent Author Name Colors
      const AUTHOR_COLORS = [
        '#38bdf8', '#fbbf24', '#34d399', '#f472b6', 
        '#a78bfa', '#fb923c', '#2dd4bf', '#e879f9', 
        '#4ade80', '#60a5fa', '#f87171', '#c084fc'
      ];
      function getAuthorColor(nameStr) {
        if (!nameStr) return AUTHOR_COLORS[0];
        let hash = 0;
        for (let i = 0; i < nameStr.length; i++) {
          hash = nameStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % AUTHOR_COLORS.length;
        return AUTHOR_COLORS[index];
      }

      function getInitials(name) {
        if (!name) return '??';
        const clean = name.replace(/[()\[\]{}]/g, '').trim();
        const parts = clean.split(/\s+/).filter(Boolean);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }

      const initials = getInitials(msg.userName || 'Peserta');
      const photoSrc = msg.userPhoto || msg.photoURL;
      const avatarHtml = photoSrc
        ? `<img src="${photoSrc}" alt="${escapeHtml(msg.userName || 'User')}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.parentElement.textContent='${initials}';">`
        : initials;

      const isOperator = !msg.userEmail || msg.role === 'ADMIN';

      const guestInputVal = (guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '';
      const msgEmail = (msg.userEmail || msg.email || '').trim().toLowerCase();
      const myEmail = (currentUser && currentUser.email ? currentUser.email : '').trim().toLowerCase();
      const myName = (currentUser && currentUser.displayName ? currentUser.displayName : '').trim().toLowerCase();
      const msgName = (msg.userName || msg.sender || '').trim().toLowerCase();
      
      const isSender = (myEmail && msgEmail && myEmail === msgEmail) ||
                       (myName && msgName && myName === msgName) ||
                       (!myEmail && !msgEmail && guestInputVal && msgName === guestInputVal.toLowerCase());

      const canDelete = isSender || isUserAdmin || isSuperAdmin;

      if (isSender) {
        row.classList.add('is-own-message');
      }

      // Quote reply block inside bubble if available
      let quoteHtml = '';
      if (msg.quote) {
        quoteHtml = `
          <div class="msg-quote-card">
            <div class="msg-quote-author">${escapeHtml(msg.quote.userName || 'Kutipan')}</div>
            <div class="msg-quote-snippet">${escapeHtml(msg.quote.text || '')}</div>
          </div>
        `;
      }

      // Check if message is soft deleted
      const isSoftDeleted = !!msg.isDeleted;
      if (isSoftDeleted) {
        row.classList.add('is-deleted');
      }

      let mediaHtml = '';
      if (msg.mediaUrl) {
        const authorSafe = escapeHtml(msg.userName || 'Peserta');
        if (msg.mediaType === 'STICKER') {
          row.classList.add('is-sticker-message');
          mediaHtml = `
            <div class="msg-sticker-wrapper" title="Klik untuk perbesar sticker">
              <img src="${msg.mediaUrl}" class="msg-sticker-attachment" alt="Sticker" onclick="openMediaLightbox(this.src, 'Sticker oleh ${authorSafe}')" loading="lazy">
            </div>
          `;
        } else {
          mediaHtml = `
            <div class="msg-media-attachment" title="Klik untuk perbesar / zoom gambar">
              <img src="${msg.mediaUrl}" alt="Media Chat" onclick="openMediaLightbox(this.src, 'Lampiran oleh ${authorSafe}')" loading="lazy">
            </div>
          `;
        }
      }

      let textHtml = '';
      if (isSoftDeleted) {
        const noticeText = msg.deleteNotice || msg.message || msg.text || 'Pesan telah dihapus';
        textHtml = `
          <div class="msg-content">
            <div class="msg-deleted-notice">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>
              <span>${escapeHtml(noticeText)}</span>
            </div>
          </div>
        `;
      } else if (msg.message || msg.text) {
        const rawContent = (msg.message || msg.text || '').trim();
        // Regex single emoji (1 s/d 2 unicode emoji standalone)
        const singleEmojiRegex = /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(?:\u200D(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*$/u;
        const isSingleEmoji = singleEmojiRegex.test(rawContent);

        if (isSingleEmoji && !msg.quote && !msg.mediaUrl) {
          row.classList.add('is-single-emoji');
          textHtml = `
            <div class="msg-content single-emoji-content">
              <span class="animated-single-emoji">${escapeHtml(rawContent)}</span>
            </div>
          `;
        } else {
          textHtml = `<div class="msg-content">${escapeHtml(rawContent)}</div>`;
        }
      }

      // 3-Dots Vertical Trigger Button & Floating Menu
      const moreBtnHtml = !isSoftDeleted ? `
        <button class="btn-msg-more" title="Opsi pesan" data-msg-id="${msg.id}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
        <div class="msg-actions-menu" id="menu-${msg.id}">
          <div class="msg-quick-emojis">
            <button class="btn-quick-emoji" data-emoji="👍" title="Suka">👍</button>
            <button class="btn-quick-emoji" data-emoji="❤️" title="Hati">❤️</button>
            <button class="btn-quick-emoji" data-emoji="😂" title="Tertawa">😂</button>
            <button class="btn-quick-emoji" data-emoji="😮" title="Terkejut">😮</button>
            <button class="btn-quick-emoji" data-emoji="😢" title="Sedih">😢</button>
            <button class="btn-quick-emoji" data-emoji="🙏" title="Terima kasih">🙏</button>
          </div>
          <button class="msg-action-item action-quote" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
            <span>Kutip / Balas</span>
          </button>
          <button class="msg-action-item action-copy" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            <span>Salin Teks</span>
          </button>
          ${msg.mediaUrl && msg.mediaType === 'STICKER' ? `
          <button class="msg-action-item action-save-sticker" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>
            <span>Simpan Stiker</span>
          </button>
          ` : ''}
          ${canDelete ? `
          <button class="msg-action-item danger action-delete" data-msg-id="${msg.id}">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>Hapus Pesan</span>
          </button>
          ` : ''}
        </div>
      ` : '';

      // Reaction badges bar
      let reactionBadgesHtml = '';
      if (!isSoftDeleted && msg.reactions && typeof msg.reactions === 'object') {
        const emojiKeys = Object.keys(msg.reactions);
        if (emojiKeys.length > 0) {
          const myId = (currentUser && currentUser.email ? currentUser.email : '') ||
                       (currentUser && currentUser.displayName ? currentUser.displayName : '') ||
                       ((guestNameInput && guestNameInput.value.trim()) || localStorage.getItem('tc_guest_name') || '');
          const badgeItems = emojiKeys.map(emoji => {
            const users = msg.reactions[emoji] || [];
            if (users.length === 0) return '';
            const isReactedByMe = users.some(u => (typeof u === 'string' ? u : u.id).toLowerCase() === myId.toLowerCase());
            return `
              <div class="reaction-badge-pill ${isReactedByMe ? 'is-reacted-by-me' : ''}" data-emoji="${escapeHtml(emoji)}" title="${escapeHtml(users.join(', '))}">
                <span class="pill-emoji">${emoji}</span>
                <span class="pill-count">${users.length}</span>
              </div>
            `;
          }).join('');
          if (badgeItems.trim()) {
            reactionBadgesHtml = `<div class="msg-reactions-badge-bar">${badgeItems}</div>`;
          }
        }
      }

      // Smart Consecutive Message Grouping (VibeLocator Behaviour)
      let isConsecutive = false;
      if (lastRenderedMessage && !lastRenderedMessage.isSeparator) {
        const sameUser = (lastRenderedMessage.userName === msg.userName) &&
                         (lastRenderedMessage.userEmail === msg.userEmail);
        const timeDiffMs = Math.abs(new Date(msg.timestamp) - new Date(lastRenderedMessage.timestamp));
        // Reset ke bubble 1 jika jeda chat >= 10 menit (600.000 ms)
        if (sameUser && timeDiffMs < 600000) {
          isConsecutive = true;
          row.classList.add('is-consecutive');
        }
      }
      lastRenderedMessage = msg;

      const timeFormatted = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

      const authorColorStyle = isSender ? '' : `style="color: ${getAuthorColor(msg.userName || 'Peserta')} !important;"`;

      row.innerHTML = `
        <div class="msg-avatar-col ${isConsecutive ? 'consecutive-hidden' : ''}">
          <div class="msg-avatar">${avatarHtml}</div>
        </div>
        <div class="chat-bubble-card">
          ${moreBtnHtml}
          <div class="msg-meta">
            <span class="msg-author ${isOperator ? 'operator' : ''}" ${authorColorStyle}>${escapeHtml(msg.userName || 'Peserta')}</span>
          </div>
          ${quoteHtml}
          ${textHtml}
          ${!isSoftDeleted ? mediaHtml : ''}
          ${reactionBadgesHtml}
          <div class="msg-bottom-meta">
            <span class="msg-time-bottom">${timeFormatted}</span>
          </div>
        </div>
      `;

      // Event Listeners for 3-Dots Menu & Actions
      if (!isSoftDeleted) {
        const moreBtn = row.querySelector('.btn-msg-more');
        const actionsMenu = row.querySelector('.msg-actions-menu');

        if (moreBtn && actionsMenu) {
          moreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open menus
            document.querySelectorAll('.msg-actions-menu.active').forEach(m => {
              if (m !== actionsMenu) m.classList.remove('active');
            });
            actionsMenu.classList.toggle('active');
          });

          // Action 1: Quick Emoji Reaction
          actionsMenu.querySelectorAll('.btn-quick-emoji').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const emoji = btn.dataset.emoji;
              toggleMessageReaction(msg.id, emoji);
            });
          });

          // Action 2: Quote / Reply
          const btnQuote = actionsMenu.querySelector('.action-quote');
          if (btnQuote) {
            btnQuote.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              setQuoteReply({
                id: msg.id,
                userName: msg.userName || 'Peserta',
                text: msg.message || msg.text || (msg.mediaUrl ? '[Lampiran Gambar]' : '')
              });
            });
          }

          // Action 3: Copy Text
          const btnCopy = actionsMenu.querySelector('.action-copy');
          if (btnCopy) {
            btnCopy.addEventListener('click', async (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const textToCopy = msg.message || msg.text || '';
              if (!textToCopy) return;
              try {
                await navigator.clipboard.writeText(textToCopy);
                const originalLabel = btnCopy.querySelector('span').textContent;
                btnCopy.querySelector('span').textContent = 'Tersalin!';
                setTimeout(() => {
                  btnCopy.querySelector('span').textContent = originalLabel;
                }, 1500);
              } catch (err) {
                console.error('Gagal menyalin:', err);
              }
            });
          }

          // Action: Save Sticker to My Slot
          const btnSaveStk = actionsMenu.querySelector('.action-save-sticker');
          if (btnSaveStk && msg.mediaUrl) {
            btnSaveStk.addEventListener('click', (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              window.saveStickerToMySlot(msg.mediaUrl, 'Stiker');
            });
          }

          // Action 4: Delete Message (Soft delete)
          const btnDel = actionsMenu.querySelector('.action-delete');
          if (btnDel) {
            btnDel.addEventListener('click', async (e) => {
              e.stopPropagation();
              actionsMenu.classList.remove('active');
              const ok = await showConfirmDialog({
                title: 'Hapus Pesan Obrolan',
                message: 'Apakah Anda yakin ingin menghapus pesan obrolan ini?',
                confirmText: 'Hapus Pesan'
              });
              if (ok) {
                const myRole = isSuperAdmin ? 'Super Admin' : (isUserAdmin ? 'Admin' : 'Peserta');
                const myName = currentUser ? currentUser.displayName : (guestNameInput && guestNameInput.value.trim() ? guestNameInput.value.trim() : 'Peserta');
                socket.emit('TC_DELETE_MESSAGE', {
                  messageId: msg.id,
                  eventId: currentActiveEvent ? currentActiveEvent.id : null,
                  requesterEmail: currentUser ? currentUser.email : '',
                  requesterName: myName,
                  requesterRole: myRole,
                  isAdmin: !!(isUserAdmin || isSuperAdmin)
                });
              }
            });
          }
        }

        // Reaction Badge Pills Click
        row.querySelectorAll('.reaction-badge-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            e.stopPropagation();
            const emoji = pill.dataset.emoji;
            toggleMessageReaction(msg.id, emoji);
          });
        });
      }

      row.dataset.senderKey = msgEmail || msgName || 'peserta';

      targetParent.appendChild(row);

      if (triggerGrouping) {
        updateMessagesGrouping();
      }
      
      // Auto-scroll dan highlight hanya untuk pesan baru yang masuk (live)
      if (isNew) {
        markMessageAsNew(row, msg.id);
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight + 120;
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text || '';
      return div.innerHTML;
    }

    // === 9. MULTI-EVENT MANAGEMENT MODAL (TAMPILAN RAPI DENGAN BUTTON PROPORSI) ===
    const eventModal = document.getElementById('event-modal');
    const btnOpenEventModal = document.getElementById('btn-open-event-modal');
    const btnCloseEventModal = document.getElementById('btn-close-event-modal');
    const modalEventList = document.getElementById('modal-event-list');
    const currentEventLabel = document.getElementById('current-event-label');
    const chatHeaderEvent = document.getElementById('chat-header-event');

    btnOpenEventModal.addEventListener('click', async () => {
      await loadEventsIntoModal();
      eventModal.classList.add('active');
    });

    btnCloseEventModal.addEventListener('click', () => {
      eventModal.classList.remove('active');
    });

    async function loadEventsIntoModal() {
      try {
        const res = await fetch('/api/timer-chat/events');
        const data = await res.json();
        modalEventList.innerHTML = '';
        const eventsList = (data && data.events) || [];
        const totalEvents = eventsList.length;

        eventsList.forEach(evt => {
          const isActive = data.activeEvent && data.activeEvent.id === evt.id;
          const item = document.createElement('div');
          item.className = `event-item ${isActive ? 'active' : ''}`;
          
          const sessionPill = evt.sessionId ? `<span class="event-session-pill">ID: ${escapeHtml(evt.sessionId)}</span>` : '';
          
          item.innerHTML = `
            <div class="event-item-info" style="cursor: pointer; flex: 1; min-width: 0;">
              <strong class="event-item-title">${escapeHtml(evt.name)}</strong>
              <div class="event-item-meta">
                <span>Tanggal: ${evt.date || '-'}</span>
                ${sessionPill}
              </div>
            </div>
            <div class="event-item-actions">
              <button type="button" class="btn-select-event" title="${isActive ? 'Acara ini sedang aktif' : 'Pilih acara ini'}">
                ${isActive ? '✓ Aktif' : 'Pilih'}
              </button>
              ${totalEvents > 1 ? `
                <button type="button" class="btn-delete-event" title="Hapus acara ini dan semua riwayat chat & data terkait">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              ` : ''}
            </div>
          `;

          const infoDiv = item.querySelector('.event-item-info');
          const btnSelect = item.querySelector('.btn-select-event');
          const handleSelect = (e) => {
            e.stopPropagation();
            if (!isActive) {
              selectEvent(evt.id);
            }
          };
          if (infoDiv) infoDiv.addEventListener('click', handleSelect);
          if (btnSelect) btnSelect.addEventListener('click', handleSelect);

          const btnDelete = item.querySelector('.btn-delete-event');
          if (btnDelete) {
            btnDelete.addEventListener('click', async (e) => {
              e.stopPropagation();
              if (!checkTimerControlPermission()) return;

              const confirmed = await showConfirmDialog({
                title: 'Hapus Acara & Seluruh Data Terkait',
                message: `Apakah Anda yakin ingin menghapus permanen acara "${evt.name}"?\n\nSemua riwayat live chat, status timer, rundown, dan data sesi terkait di server dan Cloud Firestore akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`,
                confirmText: 'Hapus Permanen'
              });

              if (!confirmed) return;

              btnDelete.disabled = true;
              btnDelete.style.opacity = '0.5';

              try {
                const myRole = isSuperAdmin ? 'Super Admin' : (isUserAdmin ? 'Admin' : 'Operator');
                const myName = currentUser ? currentUser.displayName : (guestNameInput && guestNameInput.value.trim() ? guestNameInput.value.trim() : 'Operator');

                const delRes = await fetch(`/api/timer-chat/events/${encodeURIComponent(evt.id)}`, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    requesterEmail: currentUser ? currentUser.email : '',
                    requesterName: myName,
                    requesterRole: myRole
                  })
                });

                const delData = await delRes.json();
                if (!delRes.ok || !delData.success) {
                  showAlertDialog({
                    title: 'Gagal Menghapus Acara',
                    message: delData.error || 'Terjadi kesalahan saat menghapus acara dari server.'
                  });
                  await loadEventsIntoModal();
                  return;
                }

                // Hapus local cache untuk event yang dihapus
                try {
                  localStorage.removeItem(`tc_chat_cache_${evt.id}`);
                } catch (e) {}

                // Jika event yang dihapus adalah yang sedang aktif, update ke event aktif pengganti
                if (delData.activeEvent) {
                  currentActiveEvent = delData.activeEvent;
                  updateEventLabels(currentActiveEvent);

                  const cleanSessionId = currentActiveEvent.sessionId || currentActiveEvent.id.replace(/^event-/, '') || 'educamp-2026';
                  sessionStorage.setItem('tc_joined_session_id', cleanSessionId);

                  try {
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set('session', cleanSessionId);
                    window.history.replaceState(null, '', currentUrl.toString());
                  } catch (e) {}

                  socket.emit('TC_SELECT_EVENT', { eventId: currentActiveEvent.id });
                  socket.emit('TC_JOIN_SESSION', { sessionId: cleanSessionId });

                  await fetchAndApplyEventChat(currentActiveEvent.id);
                }

                // Muat ulang daftar acara pada modal
                await loadEventsIntoModal();

                showAlertDialog({
                  title: 'Acara Berhasil Dihapus',
                  message: `Acara "${evt.name}" dan semua data terkait (live chat, timer, dan sesi) telah berhasil dihapus secara permanen.`
                });
              } catch (err) {
                console.error('Error deleting event:', err);
                showAlertDialog({
                  title: 'Kesalahan Sistem',
                  message: 'Gagal menghubungi server untuk menghapus acara. Silakan periksa koneksi Anda.'
                });
                await loadEventsIntoModal();
              }
            });
          }

          modalEventList.appendChild(item);
        });
      } catch (err) {
        console.error('Gagal memuat events', err);
      }
    }

    async function fetchAndApplyEventChat(evId) {
      if (!evId) evId = currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026';
      try {
        const chatRes = await fetch(`/api/timer-chat/chat?eventId=${encodeURIComponent(evId)}`);
        const chats = await chatRes.json();
        if (Array.isArray(chats)) {
          const cleanServer = sanitizeClientChatList(chats);
          const cached = getCachedChatHistory(evId);
          const clearedAtMs = (currentActiveEvent && currentActiveEvent.chatsClearedAt)
            ? new Date(currentActiveEvent.chatsClearedAt).getTime()
            : 0;
          const map = new Map();
          cleanServer.forEach(m => { if (m && m.id) map.set(m.id, m); });
          cached.forEach(m => {
            if (!m || !m.id) return;
            const mTime = m.timestamp ? new Date(m.timestamp).getTime() : 0;
            if (clearedAtMs && mTime > 0 && mTime < clearedAtMs) return;
            if (!map.has(m.id)) map.set(m.id, m);
          });
          const merged = Array.from(map.values()).sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
          latestChatHistoryList = merged;
          saveCachedChatHistory(evId, merged);
          renderChatMessages(merged, evId);
        } else {
          const cached = getCachedChatHistory(evId);
          latestChatHistoryList = cached;
          renderChatMessages(cached, evId);
        }
      } catch (e) {
        const cached = getCachedChatHistory(evId);
        latestChatHistoryList = cached;
        renderChatMessages(cached, evId);
      }
    }

    async function selectEvent(eventId) {
      if (!eventId) return;
      try {
        const res = await fetch('/api/timer-chat/events/select', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId })
        });
        const data = await res.json();
        if (data && data.success && data.activeEvent) {
          currentActiveEvent = data.activeEvent;
          updateEventLabels(currentActiveEvent);

          const cleanSessionId = currentActiveEvent.sessionId || currentActiveEvent.id.replace(/^event-/, '') || 'educamp-2026';
          sessionStorage.setItem('tc_joined_session_id', cleanSessionId);

          try {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('session', cleanSessionId);
            window.history.replaceState(null, '', currentUrl.toString());
          } catch (e) {}

          socket.emit('TC_SELECT_EVENT', { eventId });
          socket.emit('TC_JOIN_SESSION', { sessionId: cleanSessionId });

          await fetchAndApplyEventChat(currentActiveEvent.id);
        } else {
          socket.emit('TC_SELECT_EVENT', { eventId });
        }
      } catch (err) {
        console.warn('Gagal selectEvent via REST:', err);
        socket.emit('TC_SELECT_EVENT', { eventId });
      } finally {
        if (eventModal) eventModal.classList.remove('active');
      }
    }

    socket.on('TC_EVENT_SELECTED', async (activeEv) => {
      if (!activeEv) return;
      currentActiveEvent = activeEv;
      updateEventLabels(currentActiveEvent);
      await fetchAndApplyEventChat(currentActiveEvent.id);
    });

    socket.on('TC_EVENT_DELETED', async (payload) => {
      if (!payload) return;
      const { deletedEventId, activeEvent } = payload;
      try {
        localStorage.removeItem(`tc_chat_cache_${deletedEventId}`);
      } catch (e) {}

      if (activeEvent && (!currentActiveEvent || currentActiveEvent.id === deletedEventId)) {
        currentActiveEvent = activeEvent;
        updateEventLabels(currentActiveEvent);

        const cleanSessionId = currentActiveEvent.sessionId || currentActiveEvent.id.replace(/^event-/, '') || 'educamp-2026';
        sessionStorage.setItem('tc_joined_session_id', cleanSessionId);

        try {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('session', cleanSessionId);
          window.history.replaceState(null, '', currentUrl.toString());
        } catch (e) {}

        await fetchAndApplyEventChat(currentActiveEvent.id);
      }

      if (eventModal && eventModal.classList.contains('active')) {
        await loadEventsIntoModal();
      }
    });

    socket.on('TC_EVENTS_UPDATE', async () => {
      if (eventModal && eventModal.classList.contains('active')) {
        await loadEventsIntoModal();
      }
    });

    if (eventModal) {
      eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) eventModal.classList.remove('active');
      });
    }

    const btnQuickJoinSession = document.getElementById('btn-quick-join-session');
    const inputQuickSession = document.getElementById('quick-input-session-id');
    if (btnQuickJoinSession && inputQuickSession) {
      const doQuickJoin = () => {
        const val = inputQuickSession.value.trim();
        if (!val) return;
        eventModal.classList.remove('active');
        if (typeof window.__validateAndJoinSession === 'function') {
          window.__validateAndJoinSession(val);
        }
      };
      btnQuickJoinSession.addEventListener('click', doQuickJoin);
      inputQuickSession.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          doQuickJoin();
        }
      });
    }

    function updateEventLabels(event) {
      if (!event) return;
      currentEventLabel.textContent = event.name;
      chatHeaderEvent.textContent = `Event: ${event.name}`;
      const rundownTitleText = document.getElementById('rundown-header-title-text');
      if (rundownTitleText) {
        rundownTitleText.textContent = `Rundown - ${event.name}`;
      }
      const quickSessionBadge = document.getElementById('quick-share-session-id');
      const cleanSessionId = event.sessionId || event.id.replace(/^event-/, '') || 'educamp-2026';
      if (quickSessionBadge) {
        quickSessionBadge.textContent = `ID: ${cleanSessionId}`;
      }

      // Muat ulang daftar rundown sesuai event yang sedang aktif
      try {
        rundownItemsDay1 = getStoredRundown('DAY_1', event.id);
        rundownItemsDay2 = getStoredRundown('DAY_2', event.id);
        if (typeof renderRundownItems === 'function') {
          renderRundownItems();
        }
      } catch (e) {
        console.warn('Gagal render ulang rundown saat switch event:', e);
      }
      try {
        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.get('session') !== cleanSessionId) {
          currentUrl.searchParams.set('session', cleanSessionId);
          window.history.replaceState(null, '', currentUrl.toString());
        }
      } catch (e) {}
    }

    document.getElementById('btn-submit-new-event').addEventListener('click', async () => {
      const nameInput = document.getElementById('new-event-name');
      const dateInput = document.getElementById('new-event-date');
      const name = nameInput.value.trim();
      const date = dateInput.value;
      if (!name) {
        showAlertDialog({ title: 'Data Belum Lengkap', message: 'Nama acara wajib diisi!' });
        return;
      }

      try {
        const res = await fetch('/api/timer-chat/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, date })
        });
        const result = await res.json();
        if (result.success) {
          nameInput.value = '';
          dateInput.value = '';
          await loadEventsIntoModal();
        }
      } catch (err) {
        showAlertDialog({ title: 'Gagal Membuat Acara', message: err.message });
      }
    });

    const newEventNameInput = document.getElementById('new-event-name');
    if (newEventNameInput) {
      newEventNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const submitBtn = document.getElementById('btn-submit-new-event');
          if (submitBtn) submitBtn.click();
        }
      });
    }

    // === 10. FIREBASE GOOGLE AUTH & ROLE VERIFICATION ===
    async function initFirebaseAuth() {
      try {
        const res = await fetch('/api/auth/firebase-config');
        const config = await res.json();
        if (config && config.apiKey) {
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }
          const auth = firebase.auth();

          auth.onAuthStateChanged(async (user) => {
            currentUser = user;
            if (user && user.email) {
              try {
                // Catat & daftarkan pengguna Google login ke Kelola Akses secara otomatis
                const regRes = await fetch('/api/auth/record-login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: user.email,
                    name: user.displayName || user.email.split('@')[0],
                    photoURL: user.photoURL || ''
                  })
                });
                const regData = await regRes.json();
                const role = regData.user ? regData.user.role : 'GAME_MASTER';
                isUserAdmin = !!regData.isAdmin || role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'GAME_MASTER' || !!regData.user?.isOwner;
                isSuperAdmin = !!regData.isSuperAdmin || role === 'SUPER_ADMIN' || !!regData.user?.isOwner;
              } catch (e) {
                try {
                  const roleRes = await fetch(`/api/auth/status?email=${encodeURIComponent(user.email)}`);
                  const roleData = await roleRes.json();
                  isUserAdmin = !!(roleData && (roleData.role === 'SUPER_ADMIN' || roleData.role === 'ADMIN' || roleData.role === 'GAME_MASTER' || roleData.isOwner));
                  isSuperAdmin = !!(roleData && (roleData.role === 'SUPER_ADMIN' || roleData.isOwner));
                } catch (err) {
                  isUserAdmin = false;
                  isSuperAdmin = false;
                }
              }
            } else {
              isUserAdmin = false;
              isSuperAdmin = false;
            }
            renderAuthUI(user);
            updateChatPermissionUI();
            updateTimerPermissionUI();
            renderStickerGrid();
            // Muat ulang obrolan agar pesan milik user yang baru login otomatis terformat sebagai is-own-message (hijau & kanan)
            try {
              const evId = currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026';
              const chatRes = await fetch(`/api/timer-chat/chat?eventId=${encodeURIComponent(evId)}`);
              const chats = await chatRes.json();
              if (Array.isArray(chats)) {
                const cleanServer = sanitizeClientChatList(chats);
                const cached = getCachedChatHistory(evId);
                const clearedAtMs = (currentActiveEvent && currentActiveEvent.chatsClearedAt)
                  ? new Date(currentActiveEvent.chatsClearedAt).getTime()
                  : 0;
                const map = new Map();
                cleanServer.forEach(m => { if (m && m.id) map.set(m.id, m); });
                cached.forEach(m => {
                  if (!m || !m.id) return;
                  const mTime = m.timestamp ? new Date(m.timestamp).getTime() : 0;
                  if (clearedAtMs && mTime > 0 && mTime < clearedAtMs) return;
                  if (!map.has(m.id)) map.set(m.id, m);
                });
                const merged = Array.from(map.values()).sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
                latestChatHistoryList = merged;
                saveCachedChatHistory(evId, merged);
                renderChatMessages(merged, evId);
              } else if (latestChatHistoryList.length > 0) {
                renderChatMessages(latestChatHistoryList, evId);
              }
            } catch (e) {
              if (latestChatHistoryList.length > 0) {
                renderChatMessages(latestChatHistoryList, currentActiveEvent ? currentActiveEvent.id : 'event-educamp-2026');
              }
            }
          });

          document.getElementById('btn-google-login').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(err => {
              console.error('Login error', err);
              showAlertDialog({ title: 'Gagal Login Google', message: err.message });
            });
          });
        }
      } catch (err) {
        console.warn('Firebase config fetch skipped or failed', err);
      }
    }

    let currentAppTheme = localStorage.getItem('tc_app_theme') || 'dark';
    let globalApplyTheme = null;

    function renderAuthUI(user) {
      const authBox = document.getElementById('auth-box');
      const btnThemeStandalone = document.getElementById('btn-theme-switcher');
      const themeMenuStandalone = document.getElementById('theme-dropdown-menu');

      if (!authBox) return;

      if (user) {
        // Sembunyikan switcher tema standalone saat login (karena sudah menyatu di profile context menu)
        if (btnThemeStandalone) btnThemeStandalone.style.display = 'none';
        if (themeMenuStandalone) themeMenuStandalone.classList.remove('active');

        // Nama panggilan pendek
        const rawName = user.displayName || user.email || 'User';
        const firstName = user.displayName ? user.displayName.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'User');
        const roleLabel = isSuperAdmin ? 'SUPER ADMIN' : (isUserAdmin ? 'ADMIN MODERATOR' : 'VIEWER');
        const roleBadgeClass = isSuperAdmin ? 'badge-super' : (isUserAdmin ? 'badge-admin' : 'badge-viewer');

        authBox.innerHTML = `
          <div class="user-profile-wrapper" id="user-profile-wrapper">
            <button class="user-profile-btn" id="btn-user-profile" title="Akun & Pengaturan (${escapeHtml(rawName)})" type="button">
              <img src="${user.photoURL || '/images/Logo%20Educamp%202026.png'}" alt="${escapeHtml(rawName)}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/images/Logo%20Educamp%202026.png';">
              <span class="user-name-label">${escapeHtml(firstName)}</span>
              ${isSuperAdmin ? '<span class="admin-badge-indicator" title="Super Admin">SUPER</span>' : (isUserAdmin ? '<span class="admin-badge-indicator" title="Admin Moderator">ADMIN</span>' : '')}
              <svg class="profile-chevron" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
            </button>

            <!-- Profile Dropdown Context Menu -->
            <div class="profile-context-menu" id="profile-context-menu">
              <div class="pcm-header">
                <img src="${user.photoURL || '/images/Logo%20Educamp%202026.png'}" alt="Avatar" class="pcm-avatar" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/images/Logo%20Educamp%202026.png';">
                <div class="pcm-userinfo">
                  <div class="pcm-name">${escapeHtml(user.displayName || 'Pengguna')}</div>
                  <div class="pcm-email">${escapeHtml(user.email || '')}</div>
                  <div class="pcm-role">
                    <span class="pcm-badge ${roleBadgeClass}">${roleLabel}</span>
                  </div>
                </div>
              </div>

              <div class="pcm-divider"></div>

              <div class="pcm-section-label">Mode Tampilan</div>
              <div class="pcm-theme-grid">
                <button type="button" class="pcm-theme-btn ${currentAppTheme === 'dark' ? 'active' : ''}" data-theme="dark" title="Dark Studio">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
                  <span>Dark</span>
                </button>
                <button type="button" class="pcm-theme-btn ${currentAppTheme === 'light' ? 'active' : ''}" data-theme="light" title="Light Mode">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
                  <span>Light</span>
                </button>
                <button type="button" class="pcm-theme-btn ${currentAppTheme === 'oled' ? 'active' : ''}" data-theme="oled" title="Pitch OLED">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/></svg>
                  <span>OLED</span>
                </button>
              </div>

              ${isSuperAdmin ? `
                <div class="pcm-divider"></div>
                <button type="button" class="pcm-menu-item" id="btn-pcm-user-mgmt">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: #c084fc;"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  <span>Kelola Hak Akses</span>
                </button>
              ` : ''}

              <div class="pcm-divider"></div>

              <button type="button" class="pcm-menu-item pcm-logout-item" id="btn-logout">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                <span>Keluar dari Akun</span>
              </button>
            </div>
          </div>
        `;

        const userProfileBtn = document.getElementById('btn-user-profile');
        const profileContextMenu = document.getElementById('profile-context-menu');
        const profileWrapper = document.getElementById('user-profile-wrapper');

        if (userProfileBtn && profileContextMenu) {
          userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileContextMenu.classList.toggle('active');
            if (profileWrapper) profileWrapper.classList.toggle('active', isOpen);
          });
        }

        // Listener tombol ganti tema di profile context menu
        authBox.querySelectorAll('.pcm-theme-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const chosen = btn.dataset.theme;
            if (globalApplyTheme) {
              globalApplyTheme(chosen);
            }
          });
        });

        // Listener tombol Kelola Hak Akses di profile context menu
        const btnPcmUserMgmt = document.getElementById('btn-pcm-user-mgmt');
        if (btnPcmUserMgmt) {
          btnPcmUserMgmt.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileContextMenu) profileContextMenu.classList.remove('active');
            if (profileWrapper) profileWrapper.classList.remove('active');
            const btnOpenUserMgmt = document.getElementById('btn-open-user-mgmt');
            if (btnOpenUserMgmt) {
              btnOpenUserMgmt.click();
            } else {
              openUserMgmtModal();
            }
          });
        }

        // Listener logout
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
          btnLogout.addEventListener('click', () => {
            firebase.auth().signOut();
          });
        }
      } else {
        // User logout: Tampilkan kembali tombol tema standalone
        if (btnThemeStandalone) btnThemeStandalone.style.display = 'inline-flex';

        authBox.innerHTML = `
          <button class="btn-google-login" id="btn-google-login">
            <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/></svg>
            Login
          </button>
        `;
        document.getElementById('btn-google-login').addEventListener('click', () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);
        });
      }
    }

    // Listener global untuk menutup Profile Context Menu saat klik di luar
    document.addEventListener('click', (e) => {
      const profileContextMenu = document.getElementById('profile-context-menu');
      const profileWrapper = document.getElementById('user-profile-wrapper');
      const userProfileBtn = document.getElementById('btn-user-profile');
      if (profileContextMenu && profileContextMenu.classList.contains('active')) {
        if (!profileContextMenu.contains(e.target) && e.target !== userProfileBtn && !userProfileBtn?.contains(e.target)) {
          profileContextMenu.classList.remove('active');
          if (profileWrapper) profileWrapper.classList.remove('active');
        }
      }
    });

    // === 11. MODAL KONFIRMASI CUSTOM ELEGAN (Pengganti confirm / prompt jelek) ===
    const confirmModal = document.getElementById('confirm-dialog-modal');
    const confirmModalTitle = document.getElementById('confirm-modal-title');
    const confirmModalMessage = document.getElementById('confirm-modal-message');
    const btnCloseConfirmModal = document.getElementById('btn-close-confirm-modal');
    const btnCancelConfirm = document.getElementById('btn-cancel-confirm');
    const btnAcceptConfirm = document.getElementById('btn-accept-confirm');
    let onConfirmAcceptCallback = null;

    function showConfirmDialog({ title = 'Konfirmasi Tindakan', message = 'Apakah Anda yakin?', confirmText = 'Hapus' }) {
      return new Promise((resolve) => {
        if (!confirmModal) {
          resolve(window.confirm(message));
          return;
        }

        confirmModalTitle.textContent = title;
        confirmModalMessage.textContent = message;
        btnAcceptConfirm.textContent = confirmText;

        onConfirmAcceptCallback = () => {
          closeConfirmDialog();
          resolve(true);
        };

        const onCancel = () => {
          closeConfirmDialog();
          resolve(false);
        };

        btnAcceptConfirm.onclick = onConfirmAcceptCallback;
        btnCancelConfirm.onclick = onCancel;
        btnCloseConfirmModal.onclick = onCancel;

        const onKeyDown = (e) => {
          if (e.key === 'Escape') {
            document.removeEventListener('keydown', onKeyDown);
            onCancel();
          } else if (e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            onConfirmAcceptCallback();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        confirmModal.classList.add('active');
      });
    }

    function closeConfirmDialog() {
      if (confirmModal) confirmModal.classList.remove('active');
    }

    // Modal Input / Prompt Elegan (Pengganti window.prompt)
    const promptModal = document.getElementById('app-prompt-modal');
    const promptModalTitle = document.getElementById('app-prompt-modal-title');
    const promptModalMessage = document.getElementById('app-prompt-modal-message');
    const promptModalInput = document.getElementById('app-prompt-modal-input');
    const btnClosePromptModal = document.getElementById('btn-close-app-prompt-modal');
    const btnCancelPrompt = document.getElementById('btn-cancel-app-prompt');
    const btnAcceptPrompt = document.getElementById('btn-accept-app-prompt');

    function showPromptDialog({ title = 'Input Data', message = 'Masukkan nilai:', defaultValue = '', placeholder = '' }) {
      return new Promise((resolve) => {
        if (!promptModal || !promptModalInput) {
          resolve(window.prompt(message, defaultValue));
          return;
        }

        promptModalTitle.textContent = title;
        promptModalMessage.textContent = message;
        promptModalInput.value = defaultValue || '';
        promptModalInput.placeholder = placeholder || '';

        const closePrompt = () => {
          promptModal.classList.remove('active');
        };

        const onAccept = () => {
          const val = promptModalInput.value;
          closePrompt();
          resolve(val);
        };

        const onCancel = () => {
          closePrompt();
          resolve(null);
        };

        btnAcceptPrompt.onclick = onAccept;
        btnCancelPrompt.onclick = onCancel;
        if (btnClosePromptModal) btnClosePromptModal.onclick = onCancel;

        const onKeyDown = (e) => {
          if (e.key === 'Escape') {
            document.removeEventListener('keydown', onKeyDown);
            onCancel();
          } else if (e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            onAccept();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        promptModal.classList.add('active');
        setTimeout(() => {
          promptModalInput.focus();
          promptModalInput.select();
        }, 50);
      });
    }

    // Modal Alert / Pemberitahuan Elegan (Pengganti window.alert)
    const alertModal = document.getElementById('app-alert-modal');
    const alertModalTitle = document.getElementById('app-alert-modal-title');
    const alertModalMessage = document.getElementById('app-alert-modal-message');
    const btnCloseAlertModal = document.getElementById('btn-close-app-alert-modal');
    const btnAcceptAlert = document.getElementById('btn-accept-app-alert');

    function showAlertDialog({ title = 'Pemberitahuan', message = '' }) {
      return new Promise((resolve) => {
        if (!alertModal) {
          window.alert(message);
          resolve();
          return;
        }

        alertModalTitle.textContent = title;
        alertModalMessage.textContent = message;

        const closeAlert = () => {
          alertModal.classList.remove('active');
          resolve();
        };

        btnAcceptAlert.onclick = closeAlert;
        if (btnCloseAlertModal) btnCloseAlertModal.onclick = closeAlert;

        const onKeyDown = (e) => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            document.removeEventListener('keydown', onKeyDown);
            closeAlert();
          }
        };
        document.addEventListener('keydown', onKeyDown);

        alertModal.classList.add('active');
        setTimeout(() => {
          if (btnAcceptAlert) btnAcceptAlert.focus();
        }, 50);
      });
    }

    // Expose helpers & safe overrides
    window.showConfirmDialog = showConfirmDialog;
    window.showPromptDialog = showPromptDialog;
    window.showAlertDialog = showAlertDialog;

    // === 12. MODAL EDIT SEPARATOR SESI CHAT ===
    const sepModal = document.getElementById('separator-edit-modal');
    const editSepMsgId = document.getElementById('edit-sep-msg-id');
    const editSepTitle = document.getElementById('edit-sep-title');
    const btnCloseSepModal = document.getElementById('btn-close-sep-modal');
    const btnCancelSepModal = document.getElementById('btn-cancel-sep-modal');
    const btnSaveSepModal = document.getElementById('btn-save-sep-modal');

    function openEditSeparatorModal(msg) {
      if (!sepModal) return;
      editSepMsgId.value = msg.id;
      editSepTitle.value = msg.sessionTitle || msg.message || '';
      sepModal.classList.add('active');
      setTimeout(() => editSepTitle.focus(), 150);
    }

    function closeEditSeparatorModal() {
      if (sepModal) sepModal.classList.remove('active');
    }

    if (btnCloseSepModal) btnCloseSepModal.addEventListener('click', closeEditSeparatorModal);
    if (btnCancelSepModal) btnCancelSepModal.addEventListener('click', closeEditSeparatorModal);

    if (btnSaveSepModal) {
      btnSaveSepModal.addEventListener('click', () => {
        const msgId = editSepMsgId.value;
        const newTitle = editSepTitle.value.trim();
        if (!newTitle) {
          showAlertDialog({ title: 'Data Belum Lengkap', message: 'Judul sesi separator tidak boleh kosong.' });
          return;
        }

        socket.emit('TC_UPDATE_MESSAGE', {
          messageId: msgId,
          sessionTitle: newTitle,
          text: newTitle,
          eventId: currentActiveEvent ? currentActiveEvent.id : null,
          requesterEmail: currentUser ? currentUser.email : '',
          requesterName: currentUser ? currentUser.displayName : 'Operator',
          isAdmin: isUserAdmin
        });

        closeEditSeparatorModal();
      });
    }

    // === 12. DRAGGABLE SPLIT RESIZER FOR STUDIO WORKSPACE ===
    function initDraggableWorkspace() {
      const workspace = document.querySelector('.studio-workspace');
      const gutter = document.getElementById('gutter-resizer');
      if (!workspace || !gutter) return;

      // Restore saved split preference
      try {
        const savedSplit = localStorage.getItem('tc_studio_split');
        if (savedSplit && parseFloat(savedSplit) >= 25 && parseFloat(savedSplit) <= 75) {
          workspace.style.setProperty('--split-left', `${savedSplit}%`);
        }
      } catch (e) {}

      let isDragging = false;

      function onMouseDown(e) {
        if (window.innerWidth <= 920) return; // Nonaktif di mobile view
        isDragging = true;
        workspace.classList.add('is-resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
      }

      function onMouseMove(e) {
        if (!isDragging) return;
        const rect = workspace.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offsetLeft = clientX - rect.left;
        let percentage = (offsetLeft / rect.width) * 100;

        // Batasi range proporsi antara 30% dan 75%
        if (percentage < 30) percentage = 30;
        if (percentage > 75) percentage = 75;

        workspace.style.setProperty('--split-left', `${percentage.toFixed(2)}%`);
      }

      function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        workspace.classList.remove('is-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        try {
          const currentSplit = workspace.style.getPropertyValue('--split-left');
          if (currentSplit) {
            localStorage.setItem('tc_studio_split', parseFloat(currentSplit));
          }
        } catch (e) {}
      }

      gutter.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      gutter.addEventListener('touchstart', onMouseDown, { passive: true });
      window.addEventListener('touchmove', onMouseMove, { passive: true });
      window.addEventListener('touchend', onMouseUp);
    }

    // === 12B. DRAGGABLE VERTICAL RESIZER (ANTARA TIMER DAN RUNDOWN) ===
    function initDraggableTimerVertical() {
      const resizer = document.getElementById('horizontal-resizer');
      const timerCard = document.getElementById('timer-card');
      const stageCol = document.querySelector('.timer-stage-column');
      if (!resizer || !timerCard || !stageCol) return;

      // Restore saved timer height
      try {
        const savedHeight = localStorage.getItem('tc_timer_height');
        if (savedHeight && parseInt(savedHeight, 10) >= 160) {
          timerCard.style.height = `${parseInt(savedHeight, 10)}px`;
          timerCard.style.flex = 'none';
        }
      } catch (e) {}

      let isDraggingV = false;
      let startY = 0;
      let startHeight = 0;

      function onMouseDownV(e) {
        if (window.innerWidth <= 920) return;
        isDraggingV = true;
        stageCol.classList.add('is-resizing-v');
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        startHeight = timerCard.getBoundingClientRect().height;
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
      }

      function onMouseMoveV(e) {
        if (!isDraggingV) return;
        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = currentY - startY;
        const colHeight = stageCol.getBoundingClientRect().height;
        
        let newHeight = startHeight + deltaY;
        const minHeight = 180;
        const maxHeight = colHeight * 0.72;

        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;

        timerCard.style.height = `${Math.round(newHeight)}px`;
        timerCard.style.flex = 'none';
      }

      function onMouseUpV() {
        if (!isDraggingV) return;
        isDraggingV = false;
        stageCol.classList.remove('is-resizing-v');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        try {
          const finalHeight = parseInt(timerCard.style.height, 10);
          if (finalHeight) {
            localStorage.setItem('tc_timer_height', finalHeight);
          }
        } catch (e) {}
      }

      resizer.addEventListener('mousedown', onMouseDownV);
      window.addEventListener('mousemove', onMouseMoveV);
      window.addEventListener('mouseup', onMouseUpV);

      resizer.addEventListener('touchstart', onMouseDownV, { passive: true });
      window.addEventListener('touchmove', onMouseMoveV, { passive: true });
      window.addEventListener('touchend', onMouseUpV);
    }

    initDraggableWorkspace();
    initDraggableTimerVertical();

    // === 13. THEME & BACKGROUND SWITCHER (LIGHT / DARK / OLED) ===
    function initThemeSwitcher() {
      const btnTheme = document.getElementById('btn-theme-switcher');
      const themeMenu = document.getElementById('theme-dropdown-menu');
      const themeLabel = document.getElementById('theme-label-indicator');
      const themeIcon = document.getElementById('theme-icon-indicator');
      if (!btnTheme || !themeMenu) return;

      const THEMES = {
        dark: {
          label: 'Dark',
          iconSvg: '<path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>'
        },
        light: {
          label: 'Light',
          iconSvg: '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>'
        },
        oled: {
          label: 'OLED',
          iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>'
        }
      };

      function applyTheme(themeKey) {
        const theme = THEMES[themeKey] ? themeKey : 'dark';
        currentAppTheme = theme;

        if (theme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }

        if (themeLabel) themeLabel.textContent = THEMES[theme].label;
        if (themeIcon) themeIcon.innerHTML = THEMES[theme].iconSvg;

        themeMenu.querySelectorAll('.theme-menu-item').forEach(item => {
          if (item.dataset.theme === theme) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Sinkronkan juga active indicator pada Profile Context Menu
        document.querySelectorAll('.pcm-theme-btn').forEach(btn => {
          if (btn.dataset.theme === theme) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        try {
          localStorage.setItem('tc_app_theme', theme);
        } catch (e) {}
      }

      globalApplyTheme = (themeKey) => {
        applyTheme(themeKey);
      };

      // Restore stored theme
      try {
        const savedTheme = localStorage.getItem('tc_app_theme') || 'dark';
        applyTheme(savedTheme);
      } catch (e) {
        applyTheme('dark');
      }

      btnTheme.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && e.target !== btnTheme) {
          themeMenu.classList.remove('active');
        }
      });

      themeMenu.querySelectorAll('.theme-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          const selected = item.dataset.theme;
          applyTheme(selected);
          themeMenu.classList.remove('active');
        });
      });
    }

    // === 14. ANTI-DISTRACTION (FOCUS MODE) CONTROLLER ===
    function initFocusMode() {
      const btnFocus = document.getElementById('btn-focus-mode');
      const focusLabel = document.getElementById('focus-mode-label');
      if (!btnFocus) return;

      function setFocusState(isActive) {
        if (isActive) {
          document.body.classList.add('focus-mode-active');
          btnFocus.classList.add('active');
          if (focusLabel) focusLabel.textContent = 'Fokus ON';
        } else {
          document.body.classList.remove('focus-mode-active');
          btnFocus.classList.remove('active');
          if (focusLabel) focusLabel.textContent = 'Fokus';
        }
        try {
          localStorage.setItem('tc_focus_mode', isActive ? 'true' : 'false');
        } catch (e) {}
      }

      // Restore saved focus preference
      try {
        const savedFocus = localStorage.getItem('tc_focus_mode') === 'true';
        setFocusState(savedFocus);
      } catch (e) {
        setFocusState(false);
      }

      btnFocus.addEventListener('click', () => {
        const isCurrentlyActive = document.body.classList.contains('focus-mode-active');
        setFocusState(!isCurrentlyActive);
      });

      // Delegated click pada media masking agar bisa di-unmask sementara jika diklik
      if (chatContainer) {
        chatContainer.addEventListener('click', (e) => {
          if (!document.body.classList.contains('focus-mode-active')) return;
          const maskTarget = e.target.closest('.msg-media-attachment, .msg-sticker-wrapper');
          if (maskTarget) {
            maskTarget.classList.toggle('revealed');
          }
        });
      }
    }

    // === 15. NEW CHAT HIGHLIGHT QUEUE (MAX 3 ITEMS, CONFIGURABLE TIMER) ===
    // Queue menyimpan array { msgId: string, element: HTMLElement, timer: TimeoutID, badgeEl: HTMLElement }
    const newChatQueue = [];
    let highlightDurationSec = 30;

    try {
      const savedDuration = localStorage.getItem('tc_highlight_duration_sec');
      if (savedDuration && !isNaN(savedDuration)) {
        highlightDurationSec = Math.max(5, Math.min(300, parseInt(savedDuration, 10)));
      }
    } catch (e) {}

    const cfgHighlightDurationInput = document.getElementById('cfg-highlight-duration');
    if (cfgHighlightDurationInput) {
      cfgHighlightDurationInput.value = highlightDurationSec;
      cfgHighlightDurationInput.addEventListener('change', () => {
        let val = parseInt(cfgHighlightDurationInput.value, 10);
        if (isNaN(val) || val < 5) val = 5;
        if (val > 300) val = 300;
        highlightDurationSec = val;
        cfgHighlightDurationInput.value = val;
        try {
          localStorage.setItem('tc_highlight_duration_sec', val);
        } catch (e) {}
      });
    }

    function markMessageAsNew(rowElement, msgId) {
      if (!rowElement) return;

      // 1. Jika queue sudah 3 item, hapus highlight item tertua lebih awal
      while (newChatQueue.length >= 3) {
        const oldest = newChatQueue.shift();
        removeNewHighlight(oldest);
      }

      // 2. Pasang class highlight dan badge 'NEW MESSAGES'
      rowElement.classList.add('is-new-chat');
      const msgMeta = rowElement.querySelector('.msg-meta');
      let badge = null;
      if (msgMeta && !msgMeta.querySelector('.badge-new-chat')) {
        badge = document.createElement('span');
        badge.className = 'badge-new-chat';
        badge.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg> NEW MESSAGES`;
        msgMeta.appendChild(badge);
      }

      // 3. Set timer otomatis sesuai konfigurasi admin untuk menghapus highlight
      const durationMs = highlightDurationSec * 1000;
      const timer = setTimeout(() => {
        const idx = newChatQueue.findIndex(item => item.msgId === msgId);
        if (idx !== -1) {
          const [removed] = newChatQueue.splice(idx, 1);
          removeNewHighlight(removed);
        }
      }, durationMs);

      // 4. Catat ke queue
      newChatQueue.push({
        msgId,
        element: rowElement,
        timer,
        badgeEl: badge
      });
    }

    function removeNewHighlight(item) {
      if (!item) return;
      if (item.timer) clearTimeout(item.timer);
      if (item.element) {
        item.element.classList.remove('is-new-chat');
      }
      if (item.badgeEl && item.badgeEl.parentElement) {
        item.badgeEl.remove();
      }
    }

    // === 14. USER MANAGEMENT (HAK AKSES TIMER & RUNDOWN - SUPER ADMIN ONLY) ===
    const userMgmtModal = document.getElementById('user-mgmt-modal');
    const btnOpenUserMgmt = document.getElementById('btn-open-user-mgmt');
    const btnCloseUserMgmt = document.getElementById('btn-close-user-mgmt');
    const userMgmtList = document.getElementById('user-mgmt-list');
    const newUserEmailInput = document.getElementById('new-user-email');
    const newUserNameInput = document.getElementById('new-user-name');
    const btnSubmitNewUser = document.getElementById('btn-submit-new-user');

    if (btnOpenUserMgmt) {
      btnOpenUserMgmt.addEventListener('click', async () => {
        if (!isSuperAdmin) {
          showAlertDialog({ title: 'Akses Ditolak', message: 'Hanya Super Admin yang berhak mengelola akses pengguna.' });
          return;
        }
        await loadUserMgmtList();
        if (userMgmtModal) userMgmtModal.classList.add('active');
      });
    }

    if (btnCloseUserMgmt) {
      btnCloseUserMgmt.addEventListener('click', () => {
        if (userMgmtModal) userMgmtModal.classList.remove('active');
      });
    }

    async function loadUserMgmtList() {
      if (!userMgmtList) return;
      try {
        const res = await fetch('/api/auth/admins');
        const data = await res.json();
        const users = data.users || [];
        userMgmtList.innerHTML = '';

        if (users.length === 0) {
          userMgmtList.innerHTML = '<div style="color: #64748b; font-size: 12px; text-align: center; padding: 12px;">Belum ada user terdaftar.</div>';
          return;
        }

        users.forEach(u => {
          const item = document.createElement('div');
          item.className = 'user-mgmt-item';
          const isSuper = u.role === 'SUPER_ADMIN' || u.isOwner;
          const isOwnerPermanent = u.email.toLowerCase() === 'nandang.dhe@gmail.com' || u.isOwner;

          let avatarHtml = `<div class="user-mgmt-avatar">${(u.name || u.email).charAt(0).toUpperCase()}</div>`;
          if (u.photoURL) {
            avatarHtml = `<img src="${escapeHtml(u.photoURL)}" alt="" class="user-mgmt-avatar" style="object-fit: cover;" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/images/Logo%20Educamp%202026.png';">`;
          }

          item.innerHTML = `
            <div class="user-mgmt-info">
              ${avatarHtml}
              <div class="user-mgmt-details">
                <span class="user-mgmt-name">${escapeHtml(u.name || u.email)}</span>
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <span class="user-mgmt-email">${escapeHtml(u.email)}</span>
                  ${u.admittedBy === 'GOOGLE_LOGIN' || u.photoURL ? `
                    <span class="user-source-tag" title="Pengguna terdaftar otomatis via Google Sign-In">
                      <svg width="10" height="10" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/></svg>
                      Google
                    </span>
                  ` : ''}
                </div>
              </div>
            </div>
            <div class="user-mgmt-actions">
              ${isOwnerPermanent ? `
                <span class="role-badge super">👑 OWNER / SUPER ADMIN</span>
              ` : `
                <select class="user-role-select" data-email="${escapeHtml(u.email)}" title="Ubah hak akses pengguna">
                  <option value="SUPER_ADMIN" ${u.role === 'SUPER_ADMIN' ? 'selected' : ''}>Super Admin</option>
                  <option value="GAME_MASTER" ${u.role === 'GAME_MASTER' || (!u.role || u.role === 'ADMIN') ? 'selected' : ''}>Game Master (Akses Timer)</option>
                  <option value="AUDIENCE" ${u.role === 'AUDIENCE' ? 'selected' : ''}>Audience (Terkunci)</option>
                </select>
                <button class="btn-revoke-user" data-email="${escapeHtml(u.email)}" title="Cabut Akses Pengguna">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px; margin-right: 4px;"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  <span>Hapus</span>
                </button>
              `}
            </div>
          `;

          const roleSelect = item.querySelector('.user-role-select');
          if (roleSelect) {
            roleSelect.addEventListener('change', async (e) => {
              const newRole = e.target.value;
              try {
                const res = await fetch(`/api/auth/admins/${encodeURIComponent(u.email)}/role`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    role: newRole,
                    updatedBy: currentUser ? currentUser.email : 'Super Admin'
                  })
                });
                const data = await res.json();
                if (!data.success) {
                  showAlertDialog({ title: 'Gagal Mengubah Akses', message: data.error || 'Terjadi kesalahan' });
                  await loadUserMgmtList();
                }
              } catch (err) {
                showAlertDialog({ title: 'Gagal Mengubah Akses', message: err.message });
                await loadUserMgmtList();
              }
            });
          }

          const revokeBtn = item.querySelector('.btn-revoke-user');
          if (revokeBtn) {
            revokeBtn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const ok = await showConfirmDialog({
                title: 'Cabut Akses Pengguna',
                message: `Apakah Anda yakin ingin mencabut akses untuk ${u.email}? Pengguna tidak akan bisa lagi mengontrol timer atau rundown.`,
                confirmText: 'Cabut Akses'
              });
              if (ok) {
                try {
                  const delRes = await fetch(`/api/auth/admins/${encodeURIComponent(u.email)}`, { method: 'DELETE' });
                  const delData = await delRes.json();
                  if (delData.success) {
                    await loadUserMgmtList();
                  } else {
                    showAlertDialog({ title: 'Gagal Mencabut Akses', message: delData.error || 'Terjadi kesalahan' });
                  }
                } catch (err) {
                  showAlertDialog({ title: 'Gagal Mencabut Akses', message: err.message });
                }
              }
            });
          }

          userMgmtList.appendChild(item);
        });
      } catch (err) {
        console.error('Gagal memuat user admin:', err);
      }
    }

    // Socket realtime listener untuk pembaruan Kelola Akses & hak pengguna
    socket.on('AUTH_ACCESS_UPDATED', (data) => {
      if (currentUser && currentUser.email && Array.isArray(data.users)) {
        const me = data.users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
        if (me) {
          isUserAdmin = me.role === 'SUPER_ADMIN' || me.role === 'ADMIN' || me.role === 'GAME_MASTER' || !!me.isOwner;
          isSuperAdmin = me.role === 'SUPER_ADMIN' || !!me.isOwner;
          updateTimerPermissionUI();
          renderAuthUI(currentUser);
        }
      }
      if (userMgmtModal && userMgmtModal.classList.contains('active')) {
        loadUserMgmtList();
      }
    });

    socket.on('AUTH_USER_ADMITTED', (data) => {
      if (currentUser && currentUser.email && data && data.email && data.email.toLowerCase() === currentUser.email.toLowerCase()) {
        isUserAdmin = data.role === 'SUPER_ADMIN' || data.role === 'ADMIN' || data.role === 'GAME_MASTER';
        isSuperAdmin = data.role === 'SUPER_ADMIN';
        updateTimerPermissionUI();
        renderAuthUI(currentUser);
      }
      if (userMgmtModal && userMgmtModal.classList.contains('active')) {
        loadUserMgmtList();
      }
    });

    if (btnSubmitNewUser) {
      btnSubmitNewUser.addEventListener('click', async () => {
        const email = newUserEmailInput.value.trim();
        const name = newUserNameInput.value.trim();
        if (!email || !email.includes('@')) {
          showAlertDialog({ title: 'Email Tidak Valid', message: 'Mohon masukkan alamat email Google yang valid.' });
          return;
        }

        try {
          const res = await fetch('/api/auth/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              name: name || email.split('@')[0],
              role: 'GAME_MASTER',
              admittedBy: currentUser ? currentUser.email : 'nandang.dhe@gmail.com'
            })
          });
          const result = await res.json();
          if (result.success) {
            newUserEmailInput.value = '';
            newUserNameInput.value = '';
            await loadUserMgmtList();
          } else {
            showAlertDialog({ title: 'Gagal Menambah User', message: result.error || 'Terjadi kesalahan' });
          }
        } catch (err) {
          showAlertDialog({ title: 'Gagal Menambah User', message: err.message });
        }
      });
    }

    // === 16. CHAT FONT RESIZER PERSISTENCE (LOCALSTORAGE) ===
    function initFontResizer() {
      const fontButtons = document.querySelectorAll('.btn-font-scale');
      if (!fontButtons.length) return;

      function setChatFontSize(size) {
        document.documentElement.style.setProperty('--chat-font-size', size);
        fontButtons.forEach(btn => {
          if (btn.dataset.size === size) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
        try {
          localStorage.setItem('tc_chat_font_size', size);
        } catch (e) {}
      }

      // Restore saved font size or default 15px
      try {
        const savedSize = localStorage.getItem('tc_chat_font_size') || '15px';
        setChatFontSize(savedSize);
      } catch (e) {
        setChatFontSize('15px');
      }

      fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const size = btn.dataset.size;
          if (size) setChatFontSize(size);
        });
      });
    }

    // Direct click handler for EXE download link
    const btnDownloadExe = document.getElementById('btn-download-exe');
    if (btnDownloadExe) {
      btnDownloadExe.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // === 17. INTERACTIVE MEDIA LIGHTBOX / ENLARGE VIEWER (ZOOM & PAN) ===
    let currentLightboxScale = 1;
    let currentLightboxTranslateX = 0;
    let currentLightboxTranslateY = 0;
    let isLightboxPanning = false;
    let lightboxStartX = 0;
    let lightboxStartY = 0;

    function initMediaLightbox() {
      const lightbox = document.getElementById('chat-media-lightbox');
      const img = document.getElementById('lightbox-image');
      const title = document.getElementById('lightbox-image-title');
      const zoomPct = document.getElementById('lightbox-zoom-pct');
      const btnZoomIn = document.getElementById('btn-lightbox-zoom-in');
      const btnZoomOut = document.getElementById('btn-lightbox-zoom-out');
      const btnZoomReset = document.getElementById('btn-lightbox-zoom-reset');
      const btnDownload = document.getElementById('btn-lightbox-download');
      const btnSaveSticker = document.getElementById('btn-lightbox-save-sticker');
      const btnClose = document.getElementById('btn-lightbox-close');
      const viewport = document.getElementById('lightbox-viewport');

      let currentLightboxMediaUrl = '';
      let currentLightboxMediaTitle = '';

      if (!lightbox || !img) return;

      function updateImageTransform() {
        img.style.transform = `translate(${currentLightboxTranslateX}px, ${currentLightboxTranslateY}px) scale(${currentLightboxScale})`;
        if (zoomPct) {
          zoomPct.textContent = `${Math.round(currentLightboxScale * 100)}%`;
        }
      }

      function resetZoom() {
        currentLightboxScale = 1;
        currentLightboxTranslateX = 0;
        currentLightboxTranslateY = 0;
        updateImageTransform();
      }

      window.openMediaLightbox = function(url, imageTitle = 'Gambar Lampiran') {
        img.src = url;
        currentLightboxMediaUrl = url;
        currentLightboxMediaTitle = imageTitle;
        if (title) title.textContent = imageTitle;
        if (btnDownload) {
          btnDownload.href = url;
          btnDownload.setAttribute('download', `Educamp_${Date.now()}.png`);
        }

        // Tampilkan tombol Simpan Stiker jika media adalah stiker
        if (btnSaveSticker) {
          const isSticker = (imageTitle || '').toLowerCase().includes('sticker') || (imageTitle || '').toLowerCase().includes('stiker');
          btnSaveSticker.style.display = isSticker ? 'inline-flex' : 'none';
        }

        resetZoom();
        lightbox.style.display = 'flex';
        // Force reflow
        void lightbox.offsetWidth;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      if (btnSaveSticker) {
        btnSaveSticker.addEventListener('click', () => {
          if (!currentUser) {
            showAlertDialog({ title: 'Akses Dibatasi', message: 'Silakan login terlebih dahulu untuk menyimpan stiker ke slot Anda.' });
            return;
          }
          if (currentLightboxMediaUrl) {
            window.saveStickerToMySlot(currentLightboxMediaUrl, 'Stiker');
          }
        });
      }

      function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
          lightbox.style.display = 'none';
          img.src = '';
          currentLightboxMediaUrl = '';
          currentLightboxMediaTitle = '';
          document.body.style.overflow = '';
        }, 200);
      }

      if (btnClose) btnClose.addEventListener('click', closeLightbox);

      // Close on backdrop click (outside image)
      viewport.addEventListener('click', (e) => {
        if (e.target === viewport) {
          closeLightbox();
        }
      });

      // Keyboard shortcut (Escape to close, +/- to zoom)
      window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === '+' || e.key === '=') {
          zoomIn();
        } else if (e.key === '-' || e.key === '_') {
          zoomOut();
        } else if (e.key === '0') {
          resetZoom();
        }
      });

      function zoomIn() {
        currentLightboxScale = Math.min(5, currentLightboxScale + 0.35);
        updateImageTransform();
      }

      function zoomOut() {
        currentLightboxScale = Math.max(0.4, currentLightboxScale - 0.35);
        if (currentLightboxScale <= 1) {
          currentLightboxTranslateX = 0;
          currentLightboxTranslateY = 0;
        }
        updateImageTransform();
      }

      if (btnZoomIn) btnZoomIn.addEventListener('click', zoomIn);
      if (btnZoomOut) btnZoomOut.addEventListener('click', zoomOut);
      if (btnZoomReset) btnZoomReset.addEventListener('click', resetZoom);

      // Mouse Wheel Zoom
      viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }, { passive: false });

      // Pan / Drag image when zoomed
      viewport.addEventListener('mousedown', (e) => {
        if (currentLightboxScale <= 1 && e.target !== img) return;
        isLightboxPanning = true;
        viewport.classList.add('is-panning');
        lightboxStartX = e.clientX - currentLightboxTranslateX;
        lightboxStartY = e.clientY - currentLightboxTranslateY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isLightboxPanning) return;
        currentLightboxTranslateX = e.clientX - lightboxStartX;
        currentLightboxTranslateY = e.clientY - lightboxStartY;
        updateImageTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isLightboxPanning) {
          isLightboxPanning = false;
          viewport.classList.remove('is-panning');
        }
      });

      // Touch pinch and pan
      let initialPinchDist = 0;
      let initialPinchScale = 1;

      viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isLightboxPanning = true;
          lightboxStartX = e.touches[0].clientX - currentLightboxTranslateX;
          lightboxStartY = e.touches[0].clientY - currentLightboxTranslateY;
        } else if (e.touches.length === 2) {
          isLightboxPanning = false;
          initialPinchDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialPinchScale = currentLightboxScale;
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isLightboxPanning) {
          currentLightboxTranslateX = e.touches[0].clientX - lightboxStartX;
          currentLightboxTranslateY = e.touches[0].clientY - lightboxStartY;
          updateImageTransform();
        } else if (e.touches.length === 2 && initialPinchDist > 0) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          currentLightboxScale = Math.max(0.4, Math.min(5, initialPinchScale * (dist / initialPinchDist)));
          updateImageTransform();
        }
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        isLightboxPanning = false;
        initialPinchDist = 0;
      });
    }

    // === 18. SESSION ID & CHAT ID JOIN & SHARE MANAGEMENT ===
    function initSessionJoinAndShare() {
      const urlParams = new URLSearchParams(window.location.search);
      let urlSessionParam = urlParams.get('session') || urlParams.get('chat') || urlParams.get('id') || urlParams.get('event') || urlParams.get('room');
      if (urlSessionParam) urlSessionParam = urlSessionParam.trim();

      const gatewayModal = document.getElementById('join-session-gateway-modal');
      const gatewayInput = document.getElementById('gateway-session-input');
      const gatewayError = document.getElementById('gateway-error-msg');
      const btnGatewayJoin = document.getElementById('btn-gateway-join');
      const btnGatewayDefault = document.getElementById('btn-gateway-default');
      const btnCloseGateway = document.getElementById('btn-close-gateway-modal');

      const shareModal = document.getElementById('share-session-modal');
      const btnOpenShare = document.getElementById('btn-share-session');
      const btnQuickShareChat = document.getElementById('btn-quick-share-chat');
      const btnCloseShareModal = document.getElementById('btn-close-share-modal');

      const shareEventName = document.getElementById('share-modal-event-name');
      const shareEventDesc = document.getElementById('share-modal-event-desc');
      const shareSessionId = document.getElementById('share-modal-session-id');
      const shareLinkInput = document.getElementById('share-modal-link-input');
      const btnCopySessionId = document.getElementById('btn-copy-session-id');
      const btnCopyShareLink = document.getElementById('btn-copy-share-link');
      const shareCopyToast = document.getElementById('share-copy-toast');
      const btnShareWa = document.getElementById('btn-share-whatsapp');
      const btnShareNative = document.getElementById('btn-share-native');
      const btnShareOpenTab = document.getElementById('btn-share-open-tab');
      const qrImg = document.getElementById('share-modal-qr-img');
      const qrLoading = document.getElementById('share-qr-loading');
      const btnDownloadQr = document.getElementById('btn-download-qr');
      const btnCopyVmix = document.getElementById('btn-copy-vmix-source');
      const btnCopyPresenter = document.getElementById('btn-copy-presenter-source');

      function extractSessionIdFromRaw(raw) {
        if (!raw) return '';
        const trimmed = String(raw).trim();
        // Cek jika pengguna menempelkan URL penuh
        if (trimmed.includes('http://') || trimmed.includes('https://') || trimmed.includes('?') || trimmed.includes('/')) {
          try {
            const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
            const fromParam = urlObj.searchParams.get('session') || urlObj.searchParams.get('chat') || urlObj.searchParams.get('id') || urlObj.searchParams.get('event') || urlObj.searchParams.get('room');
            if (fromParam) return fromParam.trim();
          } catch (e) {
            const match = trimmed.match(/[?&](?:session|chat|id|event|room)=([^&#]+)/i);
            if (match && match[1]) return decodeURIComponent(match[1]).trim();
          }
        }
        return trimmed.replace(/^#/, '');
      }

      async function copyToClipboardRobust(text, notifyMsg) {
        let copied = false;
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(text);
            copied = true;
          } catch (e) {
            copied = false;
          }
        }
        if (!copied) {
          try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            copied = document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (err) {
            copied = false;
          }
        }
        if (copied && notifyMsg) {
          showAlertDialog({ title: 'Tersalin', message: notifyMsg });
        } else if (!copied) {
          window.prompt('Salin teks di bawah ini (Ctrl+C / Cmd+C):', text);
        }
        return copied;
      }

      async function validateAndJoinSession(candidateId) {
        const cleanId = extractSessionIdFromRaw(candidateId);
        if (!cleanId) {
          if (gatewayError) {
            gatewayError.textContent = 'Harap masukkan Session ID atau Chat ID.';
            gatewayError.style.display = 'block';
          }
          return false;
        }

        try {
          if (btnGatewayJoin) btnGatewayJoin.disabled = true;
          const res = await fetch(`/api/timer-chat/session/validate?id=${encodeURIComponent(cleanId)}`);
          const data = await res.json();
          if (res.ok && data.valid && data.event) {
            if (gatewayError) gatewayError.style.display = 'none';
            if (gatewayModal) gatewayModal.classList.remove('active');
            
            currentActiveEvent = data.event;
            updateEventLabels(currentActiveEvent);

            const activeSessionId = data.event.sessionId || data.event.id.replace(/^event-/, '') || 'educamp-2026';
            sessionStorage.setItem('tc_joined_session_id', activeSessionId);

            // Update URL browser agar selalu menyertakan parameter session ID
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('session', activeSessionId);
            window.history.replaceState(null, '', currentUrl.toString());

            // Pilih event aktif dan join socket room
            socket.emit('TC_SELECT_EVENT', { eventId: data.event.id });
            socket.emit('TC_JOIN_SESSION', { sessionId: activeSessionId });
            
            await fetchAndApplyEventChat(data.event.id);

            if (btnGatewayJoin) btnGatewayJoin.disabled = false;
            return true;
          } else {
            if (gatewayError) {
              gatewayError.textContent = data.error || `Session ID "${cleanId}" tidak ditemukan.`;
              gatewayError.style.display = 'block';
            }
            if (btnGatewayJoin) btnGatewayJoin.disabled = false;
            return false;
          }
        } catch (err) {
          if (gatewayError) {
            gatewayError.textContent = `Gagal memverifikasi sesi: ${err.message}`;
            gatewayError.style.display = 'block';
          }
          if (btnGatewayJoin) btnGatewayJoin.disabled = false;
          return false;
        }
      }

      window.__validateAndJoinSession = validateAndJoinSession;

      // Validasi parameter awal di URL
      if (urlSessionParam) {
        // Pengguna membuka link dengan parameter ID: langsung validasi & join
        validateAndJoinSession(urlSessionParam).then((ok) => {
          if (!ok && gatewayModal) {
            gatewayModal.classList.add('active');
            if (gatewayInput) {
              gatewayInput.value = urlSessionParam;
              setTimeout(() => gatewayInput.focus(), 150);
            }
          }
        });
      } else {
        // Buka URL polos tanpa parameter: Otomatis masuk ke sesi aktif/default tanpa blokir layar
        const previouslyJoined = sessionStorage.getItem('tc_joined_session_id') || 'educamp-2026';
        validateAndJoinSession(previouslyJoined);
      }

      if (btnGatewayJoin && gatewayInput) {
        btnGatewayJoin.addEventListener('click', () => {
          validateAndJoinSession(gatewayInput.value);
        });
        gatewayInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            validateAndJoinSession(gatewayInput.value);
          }
        });
      }

      if (btnGatewayDefault) {
        btnGatewayDefault.addEventListener('click', () => {
          validateAndJoinSession('educamp-2026');
        });
      }

      if (btnCloseGateway && gatewayModal) {
        btnCloseGateway.addEventListener('click', () => {
          gatewayModal.classList.remove('active');
        });
      }

      if (gatewayModal) {
        gatewayModal.addEventListener('click', (e) => {
          if (e.target === gatewayModal) {
            gatewayModal.classList.remove('active');
          }
        });
      }

      // Share Modal Logic
      function openShareModal() {
        if (!shareModal) return;
        const activeEv = currentActiveEvent || {
          id: 'event-educamp-2026',
          sessionId: 'educamp-2026',
          name: 'Educamp & Team Building 2026',
          description: 'Sesi utama Educamp, sharing session, dan live presentation.'
        };

        const cleanSession = activeEv.sessionId || activeEv.id.replace(/^event-/, '') || 'educamp-2026';
        const origin = window.location.origin;
        const fullShareUrl = `${origin}/timer-chat.html?session=${encodeURIComponent(cleanSession)}`;
        const vmixSourceUrl = `${origin}/timer-overlay.html?session=${encodeURIComponent(cleanSession)}&chroma=green`;
        const presenterSourceUrl = `${origin}/timer-overlay.html?session=${encodeURIComponent(cleanSession)}&view=presenter&chroma=black`;

        if (shareEventName) shareEventName.textContent = activeEv.name;
        if (shareEventDesc) shareEventDesc.textContent = activeEv.description || 'Sesi live timer dan obrolan interaktif.';
        if (shareSessionId) shareSessionId.textContent = cleanSession;
        if (shareLinkInput) shareLinkInput.value = fullShareUrl;

        if (btnShareWa) {
          const waText = `Halo! Bergabunglah ke sesi *${activeEv.name}* di Educamp Live Timer & Chat:\n${fullShareUrl}\n\nSession ID: *${cleanSession}*`;
          btnShareWa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
        }

        if (btnShareOpenTab) {
          btnShareOpenTab.href = fullShareUrl;
        }

        // Fetch QR Code Dinamis
        if (qrImg && qrLoading) {
          qrImg.style.display = 'none';
          qrLoading.style.display = 'block';
          qrLoading.textContent = 'Menyiapkan QR...';

          fetch(`/api/timer-chat/qr?url=${encodeURIComponent(fullShareUrl)}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.qr) {
                qrImg.src = data.qr;
                qrImg.style.display = 'block';
                qrLoading.style.display = 'none';
                if (btnDownloadQr) {
                  btnDownloadQr.href = data.qr;
                  btnDownloadQr.download = `QR_Session_${cleanSession}.png`;
                  btnDownloadQr.style.display = 'inline-flex';
                }
              } else {
                qrLoading.textContent = 'QR Code tidak tersedia';
              }
            })
            .catch(() => {
              qrLoading.textContent = 'Gagal memuat QR Code';
            });
        }

        // Action Copy Tautan & ID
        if (btnCopySessionId) {
          btnCopySessionId.onclick = async () => {
            await copyToClipboardRobust(cleanSession, `Session ID "${cleanSession}" berhasil disalin ke clipboard!`);
          };
        }

        if (btnCopyShareLink) {
          btnCopyShareLink.onclick = async () => {
            await copyToClipboardRobust(fullShareUrl);
            if (shareCopyToast) {
              shareCopyToast.style.display = 'block';
              setTimeout(() => { shareCopyToast.style.display = 'none'; }, 2500);
            }
          };
        }

        if (btnCopyVmix) {
          btnCopyVmix.onclick = async () => {
            await copyToClipboardRobust(vmixSourceUrl, `Tautan vMix Chroma Green berhasil disalin:\n${vmixSourceUrl}`);
          };
        }

        if (btnCopyPresenter) {
          btnCopyPresenter.onclick = async () => {
            await copyToClipboardRobust(presenterSourceUrl, `Tautan Monitor Presenter berhasil disalin:\n${presenterSourceUrl}`);
          };
        }

        if (btnShareNative) {
          if (navigator.share) {
            btnShareNative.style.display = 'inline-flex';
            btnShareNative.onclick = async () => {
              try {
                await navigator.share({
                  title: `Educamp 2026 - ${activeEv.name}`,
                  text: `Bergabung ke sesi ${activeEv.name} (Session ID: ${cleanSession})`,
                  url: fullShareUrl
                });
              } catch (e) {}
            };
          } else {
            btnShareNative.style.display = 'none';
          }
        }

        shareModal.classList.add('active');
      }

      function closeShareModal() {
        if (shareModal) shareModal.classList.remove('active');
      }

      if (btnOpenShare) btnOpenShare.addEventListener('click', openShareModal);
      if (btnQuickShareChat) btnQuickShareChat.addEventListener('click', openShareModal);
      if (btnCloseShareModal) btnCloseShareModal.addEventListener('click', closeShareModal);

      if (shareModal) {
        shareModal.addEventListener('click', (e) => {
          if (e.target === shareModal) closeShareModal();
        });
      }

      // Listen respon event joined via socket
      socket.on('TC_SESSION_JOINED', (resData) => {
        if (resData && resData.event) {
          currentActiveEvent = resData.event;
          updateEventLabels(currentActiveEvent);
        }
      });
    }

    initFontResizer();
    initThemeSwitcher();
    initFocusMode();
    initMediaLightbox();
    initSessionJoinAndShare();

    updateChatPermissionUI();
    updateTimerPermissionUI();

    initFirebaseAuth();

    // Helper for debugging / test simulation
    window.__simulateOtherMessage = function(name = 'Rina Wulandari (QC)', text = 'Halo tim, apakah materi sesi TPM Pillar sudah bisa diakses?', photo = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100') {
      appendChatMessage({
        id: 'sim-' + Date.now(),
        userName: name,
        userEmail: 'rina.wulandari@kalbenutritionals.com',
        userPhoto: photo,
        photoURL: photo,
        role: 'AUDIENCE',
        message: text,
        text: text,
        timestamp: new Date().toISOString()
      }, false);
    };
  