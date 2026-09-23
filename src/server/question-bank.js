const fs = require('fs');
const path = require('path');
const firebaseService = require('./firebase-service');

// Bank Soal Hasil Ekstraksi Dokumen TPM PT Sanghiang Perkasa (Kalbe Nutritionals)
// Dialokasikan:
// - Panjat Pinang: 5 Easy, 5 Medium, 5 Hard (Total 15 Soal)
// - Tarik Tambang: 5 Easy, 5 Medium, 5 Hard (Total 15 Soal)
// - Bank Soal Lengkap: 55 Soal Korporasi Kalbe Nutritionals (Termasuk Master Plan & Extra Susah)
const defaultQuestions = [
  // =========================================================================
  // 1. DOKUMEN MASTER PLAN & UMUM TPM PT SANGHIANG PERKASA (ID 1 - 15)
  // =========================================================================
  {
    id: 1,
    question: "Apa visi dari PT Sanghiang Perkasa (Kalbe Nutritionals)?",
    options: [
      "Leading Global Nutrition Driven by Innovation, Strong Brands, and Excellent Management",
      "Providing Best Nutrition Solution for a Better Life",
      "Nutrition Solutions in Every Stage of Human Life Cycle",
      "Accelerate Sustainable Growth through Digitalization"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 2,
    question: "Di kawasan industri manakah lokasi pabrik PT Sanghiang Perkasa Cikampek berada?",
    options: [
      "Kawasan Industri Jababeka, Cikarang",
      "Kawasan Industri MM2100, Cibitung",
      "Kawasan Industri Suryacipta, Karawang",
      "Indotaisei Industrial Area Sektor 1A, Blok Q2, Kota Bukit Indah, Cikampek"
    ],
    correctIndex: 3,
    difficulty: "EASY",
    game: "ALL"
  },
  {
    id: 3,
    question: "Pada tahun berapa PT Sanghiang Perkasa meraih penghargaan TPM Excellence Award Category A?",
    options: ["2016", "2019", "2022", "2024"],
    correctIndex: 2,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 4,
    question: "Apa nama Circle Group (CG) Autonomous Maintenance untuk lini produksi Model Line A?",
    options: ["EVOLUTION", "AUTOBOT", "BRAVE", "GOMU-GOMU"],
    correctIndex: 1,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 5,
    question: "Sistem aplikasi internal apa yang digunakan untuk memantau performa pabrik seperti POE, Customer Complaint, SCR 4, dan Conversion Cost?",
    options: ["Portal Pandawa", "Oracle EAM", "Node-RED Dashboard", "Tableau SCM"],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 6,
    question: "Program peningkatan kapabilitas operator AM melalui transfer keterampilan perawatan mesin dari pilar PM disebut...",
    options: [
      "IPC (Inline Process Control)",
      "IMC (Inline Maintenance Control)",
      "Q-Point Inspection",
      "S-Point Mapping"
    ],
    correctIndex: 1,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 7,
    question: "Program alih keterampilan inspeksi mutu fisik produk dari pilar QM ke operator AM disebut...",
    options: [
      "IMC (Inline Maintenance Control)",
      "IPC (Inline Process Control)",
      "Dojo Competency",
      "HIRAODC"
    ],
    correctIndex: 1,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 8,
    question: "Sistem tagging keselamatan kerja (Safety) yang diterapkan pada AM Step 5.3 menggunakan label berwarna...",
    options: ["Red Tag", "Green Tag", "Orange Tag", "Blue Tag"],
    correctIndex: 2,
    difficulty: "EASY",
    game: "ALL"
  },
  {
    id: 9,
    question: "Empat tahapan terstruktur dalam '4-Phase Zero Breakdown' pada pilar PM secara berurutan adalah...",
    options: [
      "Establish Basic Conditions, Correct Weakness, Restore Deterioration, Predict & Extend Equipment Lifetimes",
      "Initial Cleaning, Countermeasure, Temporary Standard, General Inspection",
      "Define, Measure, Analyze, Improve, Control",
      "Evaluate Equipment, Understand Situation, Periodic Maintenance, Smart Maintenance"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "ALL"
  },
  {
    id: 10,
    question: "Software enterprise asset management yang digunakan PT Sanghiang Perkasa untuk mengelola Work Order perawatan dan database mesin adalah...",
    options: ["SAP PM", "Oracle EAM", "Maximo Asset System", "Microsoft Dynamics"],
    correctIndex: 1,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 11,
    question: "Menurut Master Plan, target implementasi AM Step 7 secara penuh (World Class) ditargetkan tercapai pada tahun...",
    options: ["2025", "2026", "2027", "2028"],
    correctIndex: 3,
    difficulty: "HARD",
    game: "ALL"
  },
  {
    id: 12,
    question: "Pendekatan inovasi perbaikan waktu pergantian produk (changeover) yang dikembangkan pilar FI dari konsep Nobuhiro Otsuka dinamakan...",
    options: [
      "SMED Manual System",
      "Red Zone Digitalization",
      "5S Physical Reorganizing",
      "Autonomous Resetting"
    ],
    correctIndex: 1,
    difficulty: "HARD",
    game: "ALL"
  },
  {
    id: 13,
    question: "Berapa target zero accident untuk insiden Major Accident (LTI & MTI) dalam KPI TPM PT Sanghiang Perkasa?",
    options: ["0 kasus per tahun", "Maksimal 1 kasus per tahun", "Maksimal 2 kasus per tahun", "Toleransi 0,1% jam kerja"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "ALL"
  },
  {
    id: 14,
    question: "Pada AM Step 6 (Standardization), kegiatan kolaborasi AM dengan SHE berfokus pada peninjauan...",
    options: [
      "Review HIRAODC dan Standard Operating Procedure (SOP/WI)",
      "Perbaikan jalur pipa distribusi",
      "Pengurangan konsumsi bahan baku",
      "Pengadaan mesin baru"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "ALL"
  },
  {
    id: 15,
    question: "Implementasi teknologi apa yang dilakukan pilar PM pada Cartoning Line G untuk mengatasi cetakan tanggal/kode yang sering terpotong atau buram?",
    options: [
      "Mengganti Inkjet Printer menjadi Laser Printer serta memprogram auto-reject pada dua kemasan awal",
      "Mengurangi kecepatan conveyor hingga separuh kapasitas",
      "Menghilangkan proses cetak kode pada kemasan primer",
      "Menambah operator manual khusus pengecekan stempel"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "ALL"
  },

  // =========================================================================
  // 2. LEVEL: MUDAH (ID 16 - 25) -> DIBAGI 5 PANJAT PINANG & 5 TARIK TAMBANG
  // =========================================================================
  // --- 5 MUDAH: PANJAT PINANG ---
  {
    id: 16,
    question: "Apa moto dari Kalbe Nutritionals?",
    options: [
      "Nutrition for Life",
      "Healthy Everyday",
      "Innovation for All",
      "Zero Loss Forever"
    ],
    correctIndex: 0,
    difficulty: "EASY",
    game: "PINANG"
  },
  {
    id: 17,
    question: "Prinsip utama yang menjadi semboyan dasar operator pada pelaksanaan AM Step 1 adalah...",
    options: [
      "Cleaning is Checking",
      "Repair after Breakdown",
      "Speed is Everything",
      "Automation First"
    ],
    correctIndex: 0,
    difficulty: "EASY",
    game: "PINANG"
  },
  {
    id: 18,
    question: "Apa kepanjangan dari OPL yang sering dibuat oleh tim circle group di shop floor?",
    options: [
      "One Point Lesson",
      "Operational Process Line",
      "Online Production Level",
      "Overall Plant Limit"
    ],
    correctIndex: 0,
    difficulty: "EASY",
    game: "PINANG"
  },
  {
    id: 21,
    question: "Berapa jumlah lantai gedung proses produksi konvensional di PT Sanghiang Perkasa Plant Cikampek?",
    options: ["3 Lantai", "4 Lantai", "6 Lantai", "8 Lantai"],
    correctIndex: 2,
    difficulty: "EASY",
    game: "PINANG"
  },
  {
    id: 25,
    question: "Manakah yang merupakan produk nutrisi ibu hamil unggulan dari Kalbe Nutritionals?",
    options: ["Prenagen", "Fitbar", "Hydro Coco", "Zee"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "PINANG"
  },

  // --- 5 MUDAH: TARIK TAMBANG ---
  {
    id: 19,
    question: "Media sosial apa yang dimanfaatkan PT Sanghiang Perkasa untuk mempercepat promosi budaya TPM bagi karyawan Gen Z dan Milenial?",
    options: ["Instagram", "Twitter / X", "Facebook", "TikTok Shop"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "TUG"
  },
  {
    id: 20,
    question: "Kegiatan gathering tahunan yang diadakan untuk menyelaraskan seluruh aktivitas TPM dan mempererat keterikatan antar anggota disebut...",
    options: ["Edumeet / Educamp", "Townhall Meeting", "Family Vacation", "Kaizen Expo"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "TUG"
  },
  {
    id: 22,
    question: "Tagging yang dipasang oleh operator AM untuk temuan yang harus diselesaikan oleh tim maintenance (PM) berwarna...",
    options: ["Red Tag", "Green Tag", "Blue Tag", "Yellow Tag"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "TUG"
  },
  {
    id: 23,
    question: "Tagging yang dipasang dan dapat diselesaikan sendiri secara mandiri oleh operator AM berwarna...",
    options: ["Green Tag", "Red Tag", "Black Tag", "Grey Tag"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "TUG"
  },
  {
    id: 24,
    question: "Apa nama ajang kompetisi continuous improvement internal yang diselenggarakan di SHP Plant sejak tahun 2023?",
    options: ["Pandawa Award", "Kalbe Got Talent", "Kaizen Champion Cup", "Zero Loss Medal"],
    correctIndex: 0,
    difficulty: "EASY",
    game: "TUG"
  },

  // =========================================================================
  // 3. LEVEL: MEDIUM (ID 26 - 35) -> DIBAGI 5 PANJAT PINANG & 5 TARIK TAMBANG
  // =========================================================================
  // --- 5 MEDIUM: PANJAT PINANG ---
  {
    id: 26,
    question: "Apa singkatan dari indikator utama efektivitas keseluruhan pabrik yang digunakan di SHP (POE)?",
    options: [
      "Plant Overall Effectiveness",
      "Production Operational Efficiency",
      "Process Output Evaluation",
      "Predictive Operation Engine"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "PINANG"
  },
  {
    id: 27,
    question: "Berapa standar nilai kelulusan minimal (passing criteria) untuk audit mandiri (AMD) pada flow audit AM Step?",
    options: ["≥ 90", "≥ 85", "≥ 80", "≥ 75"],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "PINANG"
  },
  {
    id: 28,
    question: "Apa nama jenis OPL yang berfokus mendalami 'Know-Why' prinsip kerja mesin yang mulai banyak dibuat pada AM Step 4?",
    options: [
      "Know Why Sheet (KWS)",
      "Basic Knowledge OPL",
      "Improvement Sheet",
      "Safety Warning Sheet"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "PINANG"
  },
  {
    id: 29,
    question: "Di bawah implementasi IMC Program, penanganan 'Number of Middle Stoppages' (downtime 10–60 menit) dialihkan dari tim PM kepada...",
    options: [
      "Operator IMC (AM member)",
      "Department Head",
      "Vendor mesin luar",
      "Tim QA Inline"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "PINANG"
  },
  {
    id: 30,
    question: "Lini produksi manakah yang berstatus 'Idle Line' pada pemetaan line produksi di SHP Plant?",
    options: ["Line D (D One)", "Line B (Brave)", "Line C (Champion)", "Line H (Hero)"],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "PINANG"
  },

  // --- 5 MEDIUM: TARIK TAMBANG ---
  {
    id: 31,
    question: "Teknologi kompresor hemat energi apa yang dipasang pada sistem pendingin (chiller) pada proyek Energy Saving di Plant SHP?",
    options: [
      "Turbocore",
      "Centrifugal Standard",
      "Reciprocating Piston",
      "Rotary Screw Low"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "TUG"
  },
  {
    id: 32,
    question: "Dalam kategori perankingan mesin pada pilar PM, mesin yang wajib memiliki perizinan resmi pemerintah masuk ke dalam kategori...",
    options: ["Rank Law", "Rank A", "Rank B", "Rank C"],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "TUG"
  },
  {
    id: 33,
    question: "Alat bantu simulator in-house apa saja yang digunakan di fasilitas Dojo Maintenance untuk pelatihan praktikal teknisi?",
    options: [
      "Vibration Simulator dan PLC Simulator",
      "Flight Simulator dan Driving Rig",
      "Hydraulic Valve Tester saja",
      "Thermal Camera Portable saja"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "TUG"
  },
  {
    id: 34,
    question: "Sub-step 5.4 pada pilar Autonomous Maintenance (AM Step 5) membahas tentang inspeksi proses untuk aspek...",
    options: ["Energy", "Quality", "Safety", "Morale"],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "TUG"
  },
  {
    id: 35,
    question: "Pabrik toll manufacturing (POTS) rekanan non-sister company yang telah diaudit implementasi AM Step 1 & 2 oleh tim SHP adalah...",
    options: [
      "PT Fairpack Indonesia (FIN)",
      "PT Kalbe Milko Indonesia (KAM)",
      "PT Netania Kasih Karunia (NKK)",
      "PT Tata Nutrisana (TNU)"
    ],
    correctIndex: 0,
    difficulty: "MEDIUM",
    game: "TUG"
  },

  // =========================================================================
  // 4. LEVEL: SUSAH (ID 36 - 45) -> DIBAGI 5 PANJAT PINANG & 5 TARIK TAMBANG
  // =========================================================================
  // --- 5 SUSAH: PANJAT PINANG ---
  {
    id: 36,
    question: "Berdasarkan evaluasi Master Plan pilar FI, berapa target durasi kecepatan eksekusi proyek (Speed Execution Project) pada target World Class 2027–2028?",
    options: ["3 minggu", "4 minggu", "5 minggu", "7 minggu"],
    correctIndex: 0,
    difficulty: "HARD",
    game: "PINANG"
  },
  {
    id: 37,
    question: "Berdasarkan analisis korelasi Pearson antara jenis loss dan biaya pada model prediktif FI, korelasi terkuat ditemukan antara kerugian Setup & Adjustment dengan...",
    options: [
      "Raw Material Cost (r = 0,71)",
      "Overtime Cost (r = 0,46)",
      "Electricity Cost (r = 0,35)",
      "Spare Part Maintenance Cost (r = 0,22)"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "PINANG"
  },
  {
    id: 38,
    question: "Metode waktu baku kerja berstandar internasional yang diterapkan bersama pilar OSA untuk workload analysis operator adalah...",
    options: [
      "PMTS (Predetermined Motion Time System) / MTM-1",
      "Stopwatch Time Study Biasa",
      "Takt Time Approximation",
      "Historical Lead Time Calculation"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "PINANG"
  },
  {
    id: 39,
    question: "Pada investigasi kronis kerusakan pusher insert di mesin Cartoning Line A, modifikasi apa yang berhasil meniadakan patahnya cylinder rod?",
    options: [
      "Mengganti fixed connector menjadi floating joint connector pada rod-end",
      "Menurunkan kecepatan mesin menjadi 50%",
      "Mengganti material pendorong menjadi kayu jati",
      "Menambah pelumasan oli cair secara manual setiap 10 menit"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "PINANG"
  },
  {
    id: 40,
    question: "Solusi perbaikan apa yang diterapkan untuk mengatasi kabel unclamp gripper robot palletizer yang sering tergores dan putus?",
    options: [
      "Mengganti transmisi data kabel menjadi sistem nirkabel (wireless data transmission)",
      "Membalut kabel dengan lakban tebal",
      "Mengganti motor servo dengan ukuran lebih kecil",
      "Memperlambat putaran arm robot palletizer"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "PINANG"
  },

  // --- 5 SUSAH: TARIK TAMBANG ---
  {
    id: 41,
    question: "Dalam proyek Quick Change Over Line A, waktu proses cleaning saat pergantian produk berhasil dipangkas dari 80 menit menjadi 30 menit melalui strategi...",
    options: [
      "Pekerjaan cleaning antar lantai dilakukan paralel dengan penambahan peran Dandori Operator & high-speed vacuum",
      "Menghilangkan tahap pembersihan saringan round siever",
      "Menggunakan air bertekanan tinggi di semua lantai tanpa pengeringan",
      "Meniadakan flushing bahan pada mesin filling"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "TUG"
  },
  {
    id: 42,
    question: "Untuk mengatasi gangguan sinyal intermittens pada soket motor reversal Line A, perbaikan corrective yang dilakukan adalah...",
    options: [
      "Mengganti koneksi plug socket menjadi terminal connection permanen",
      "Menyemprot contact cleaner setiap awal shift",
      "Mengganti kabel komunikasi dengan kabel audio biasa",
      "Mengelas soket secara langsung ke bodi motor"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "TUG"
  },
  {
    id: 43,
    question: "Berdasarkan Cost Tree Plant SHP 2023, kategori biaya operasional apakah yang menempati porsi terbesar dari total pengeluaran pabrik?",
    options: [
      "Direct Labor Cost (29,8%)",
      "Indirect Labor Cost (21,53%)",
      "Other FOH Cost (13,83%)",
      "Energy Cost (6,6%)"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "TUG"
  },
  {
    id: 44,
    question: "Pada AM Step 6, tiga inovasi utama yang dilakukan untuk mentransformasi Line G menjadi 'Super Flexible Line' (Gomu-Gomu Line) adalah...",
    options: [
      "Pokayoke mesh comil, interlock discharging IBC dengan filling, dan auto changeover polyroll",
      "Pemasangan conveyor baru, penambahan 5 operator, dan pengecatan bodi mesin",
      "Penggantian seluruh mesin filling menjadi sistem kaleng, SMED manual, dan sensor RFID",
      "Pengurangan varian SKU, instalasi elevator barang baru, dan penambahan jam lembur"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "TUG"
  },
  {
    id: 45,
    question: "Karakteristik perubahan model pemeliharaan spare part untuk mesin Rank A pada strategi pilar PM adalah...",
    options: [
      "60% Scheduled Procurement, 20% Min-Max System, dan 20% On Request",
      "100% On Request saat mesin mengalami kerusakan",
      "75% Breakdown Replacement dan 25% Min-Max System",
      "Hanya mengandalkan garansi servis dari vendor mesin"
    ],
    correctIndex: 0,
    difficulty: "HARD",
    game: "TUG"
  },

  // =========================================================================
  // 5. LEVEL: EXTRA SUSAH (ID 46 - 55)
  // =========================================================================
  {
    id: 46,
    question: "Pada proyek Machine Learning Filling Machine (Quick Win FI), parameter fisik serbuk apa sajakah yang dianalisis oleh algoritma adaptif untuk memprediksi parameter setting akurat tanpa trial-and-error?",
    options: [
      "S/L ratio, avalanche angle, avalanche energy, dynamic density, target weight, angle of repose, dan bulk density",
      "Kadar air, keasaman pH, kelarutan air dingin, dan warna serbuk",
      "Viskositas larutan, indeks bias cahaya, tegangan permukaan, dan kadar lemak",
      "Ukuran kemasan sachet, ketebalan plastik polyroll, dan kecepatan motor pengaduk"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 47,
    question: "Berdasarkan KPI Master Target 2028, berapa target spesifik untuk Conversion Cost pabrik dan Productivity kerja karyawan?",
    options: [
      "Rp3.700 / Kg dan 12,66 Ton / Man",
      "Rp4.100 / Kg dan 11,71 Ton / Man",
      "Rp4.900 / Kg dan 10,11 Ton / Man",
      "Rp5.600 / Kg dan 8,90 Ton / Man"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 48,
    question: "Berdasarkan target roadmap jangka panjang, berapa target angka Number of Failure (NOF) dan MTBF Line A pada tahun 2028?",
    options: [
      "NOF: 15 kejadian dan MTBF: 1.356 jam",
      "NOF: 29 kejadian dan MTBF: 785 jam",
      "NOF: 46 kejadian dan MTBF: 545 jam",
      "NOF: 57 kejadian dan MTBF: 454 jam"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 49,
    question: "Pada hasil pencapaian Zero Breakdown per Rank hingga tahun 2025, rank manakah yang memiliki persentase ketercapaian terendah sehingga menjadi prioritas utama penanganan selanjutnya?",
    options: [
      "Rank A (85%)",
      "Rank B (90%)",
      "Rank C (97%)",
      "Rank Law (100%)"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 50,
    question: "Dalam proyek Manpower Distribution Simulation pilar FI, berapa jumlah tenaga kerja optimal hasil simulasi berbasis data untuk mencapai target produktivitas 9,2 ton/man (dibandingkan aktual 182 orang)?",
    options: ["162 orang", "145 orang", "175 orang", "150 orang"],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 51,
    question: "Pada proyek Waste-to-Value hasil kolaborasi pilar FI, QM, dan RnD, berapa proporsi residu material flushing yang berhasil diformulasikan kembali menjadi rework input per batch?",
    options: ["5% - 10%", "1% - 3%", "15% - 20%", "25% - 30%"],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 52,
    question: "Pada implementasi modul Smart Maintenance, berapa efisiensi waktu pengambilan suku cadang (parts retrieval) setelah diterapkannya integrasi Virtual Bill of Material (BOM)?",
    options: [
      "Turun dari 35 menit menjadi hanya 8 menit",
      "Turun dari 60 menit menjadi 20 menit",
      "Turun dari 15 menit menjadi 2 menit",
      "Turun dari 45 menit menjadi 12 menit"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 53,
    question: "Pada analisis rasio NmS per 1.000 menit loading time (YTD Okt 2025), berapa angka kejadian NmS yang dicapai masing-masing pada Model Line A dan Line G?",
    options: [
      "Line A = 3 kejadian : 1.000 menit ; Line G = 1 kejadian : 1.000 menit",
      "Line A = 12 kejadian : 1.000 menit ; Line G = 6 kejadian : 1.000 menit",
      "Line A = 7 kejadian : 1.000 menit ; Line G = 2 kejadian : 1.000 menit",
      "Line A = 9 kejadian : 1.000 menit ; Line G = 5 kejadian : 1.000 menit"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 54,
    question: "Berdasarkan data profil demografi tenaga kerja di SHP Plant, berapa persentase komposisi karyawan generasi Milenial (kelahiran 1981–1996)?",
    options: ["55%", "37%", "8%", "65%"],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  },
  {
    id: 55,
    question: "Pada AM Step 4.2 hingga 4.4, apa solusi mekanis yang diterapkan pada bucket conveyor mesin packing untuk mencegah sachet tertabrak pusher?",
    options: [
      "Mengubah posisi standby pusher dari posisi atas ke posisi bawah",
      "Memasang sensor laser tambahan di atas bucket",
      "Mengurangi kecepatan conveyor hingga separuhnya",
      "Membuat ukuran sachet menjadi lebih pendek"
    ],
    correctIndex: 0,
    difficulty: "EXTRA_HARD",
    game: "ALL"
  }
];

class QuestionBank {
  constructor() {
    this.questions = [...defaultQuestions];
    this.source = 'DEFAULT'; // DEFAULT, AI, CSV, CUSTOM
    this.loadFromFirestore();
  }

  loadFromFirestore() {
    if (firebaseService.isAvailable()) {
      this.reloadFromFirebase();
    }
  }

  async reloadFromFirebase() {
    if (!firebaseService.isAvailable()) return false;
    try {
      const cloudData = await firebaseService.loadDoc('question_bank');
      if (cloudData && typeof cloudData === 'object' && Array.isArray(cloudData.questions) && cloudData.questions.length > 0) {
        this.setQuestions(cloudData.questions, cloudData.source || 'RESTORED', false);
        console.log(`[QuestionBank Firebase] Berhasil memuat ${this.questions.length} soal kustom dari Firestore!`);
        return true;
      }
    } catch (err) {
      console.error('[QuestionBank Firebase] Gagal load dari Firestore:', err.message);
    }
    return false;
  }

  getAll() {
    return this.questions;
  }

  getSource() {
    return this.source || 'DEFAULT';
  }

  resetToDefault() {
    this.questions = [...defaultQuestions];
    this.source = 'DEFAULT';
    if (firebaseService.isAvailable()) {
      firebaseService.saveDoc('question_bank', {
        source: 'DEFAULT',
        total: this.questions.length,
        questions: this.questions
      }).catch(err => console.error('[QuestionBank Firebase] Gagal reset di Firestore:', err.message));
    }
    return this.questions;
  }

  setQuestions(newList, source = 'CUSTOM', syncToCloud = true) {
    if (Array.isArray(newList) && newList.length > 0) {
      this.questions = newList.map((q, idx) => ({
        id: q.id || idx + 1,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        difficulty: q.difficulty || 'MEDIUM',
        game: q.game || 'ALL'
      }));
      this.source = source;
      if (syncToCloud && firebaseService.isAvailable()) {
        firebaseService.saveDoc('question_bank', {
          source: this.source,
          total: this.questions.length,
          questions: this.questions
        }).catch(err => console.error('[QuestionBank Firebase] Gagal menyimpan soal ke Firestore:', err.message));
      }
    }
  }

  getStorageData() {
    return {
      source: this.source || 'DEFAULT',
      total: this.questions.length,
      questions: this.questions || []
    };
  }

  restoreData(data) {
    if (!data || typeof data !== 'object') return false;
    if (Array.isArray(data.questions) && data.questions.length > 0) {
      this.setQuestions(data.questions, data.source || 'RESTORED');
      return true;
    }
    return false;
  }

  // Ambil soal terfilter khusus untuk Game tertentu (PINANG atau TUG)
  getQuestionsForGame(gameName, strict = true) {
    const targetGame = (gameName || '').toUpperCase();
    if (this.source !== 'DEFAULT') {
      // Jika kustom/AI/CSV, pakai semua
      return this.questions;
    }
    if (strict) {
      const strictList = this.questions.filter(q => q.game === targetGame);
      if (strictList.length > 0) return strictList;
    }
    return this.questions.filter(q => q.game === targetGame || q.game === 'ALL');
  }

  // Parser CSV pintar
  loadFromCSV(csvText) {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      throw new Error("File CSV harus memiliki baris header dan minimal 1 baris soal.");
    }

    const parsedQuestions = [];
    const startIndex = (lines[0].toLowerCase().includes('soal') || lines[0].toLowerCase().includes('question')) ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      const cols = line.match(/(".*?"|[^",\t]+)(?=\s*[,|\t]|\s*$)/g);
      if (!cols || cols.length < 6) continue;

      const cleanCols = cols.map(c => c.replace(/^["']|["']$/g, '').trim());
      const question = cleanCols[0];
      const optA = cleanCols[1];
      const optB = cleanCols[2];
      const optC = cleanCols[3];
      const optD = cleanCols[4];
      const rawAns = cleanCols[5].toUpperCase();

      let correctIndex = 0;
      if (rawAns === 'A' || rawAns === '0') correctIndex = 0;
      else if (rawAns === 'B' || rawAns === '1') correctIndex = 1;
      else if (rawAns === 'C' || rawAns === '2') correctIndex = 2;
      else if (rawAns === 'D' || rawAns === '3') correctIndex = 3;
      else {
        const optionsList = [optA, optB, optC, optD];
        const matchIdx = optionsList.findIndex(o => o.toLowerCase() === cleanCols[5].toLowerCase());
        if (matchIdx !== -1) correctIndex = matchIdx;
      }

      parsedQuestions.push({
        id: parsedQuestions.length + 1,
        question,
        options: [optA, optB, optC, optD],
        correctIndex,
        difficulty: cleanCols[6] ? cleanCols[6].toUpperCase() : 'MEDIUM',
        game: cleanCols[7] ? cleanCols[7].toUpperCase() : 'ALL'
      });
    }

    if (parsedQuestions.length === 0) {
      throw new Error("Tidak ada soal valid yang dapat diekstraksi dari CSV.");
    }

    this.questions = parsedQuestions;
    this.source = 'CSV';
    return parsedQuestions;
  }

  // Mengambil soal acak dengan dukungan filter game dan level kesulitan
  getRandomPool(count = 1, options = {}) {
    let sourcePool = [...this.questions];

    // Filter berdasarkan game jika disediakan
    if (options.game) {
      const g = options.game.toUpperCase();
      const filteredByGame = sourcePool.filter(q => q.game === g);
      if (filteredByGame.length > 0) {
        sourcePool = filteredByGame;
      }
    }

    // Filter berdasarkan tingkat kesulitan jika disediakan
    if (options.difficulty) {
      const diff = options.difficulty.toUpperCase();
      const filteredByDiff = sourcePool.filter(q => q.difficulty === diff);
      if (filteredByDiff.length > 0) {
        sourcePool = filteredByDiff;
      }
    }

    // Exclude recent question IDs jika disediakan
    if (Array.isArray(options.excludeIds) && options.excludeIds.length > 0) {
      const excluded = sourcePool.filter(q => !options.excludeIds.includes(q.id));
      if (excluded.length > 0) {
        sourcePool = excluded;
      }
    }

    // Acak urutan
    const shuffled = [...sourcePool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count || 1);

    // Acak posisi pilihan jawaban (A, B, C, D) sehingga jawaban benar tidak selalu di index yang sama
    return selected.map(q => {
      const originalOptions = [...q.options];
      const correctOptionText = originalOptions[q.correctIndex];

      // Shuffle options dengan Fisher-Yates
      const newOptions = [...originalOptions];
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }

      const newCorrectIndex = newOptions.indexOf(correctOptionText);

      return {
        id: q.id,
        question: q.question,
        options: newOptions,
        correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
        difficulty: q.difficulty,
        game: q.game
      };
    });
  }
}

module.exports = new QuestionBank();
