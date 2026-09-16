const fs = require('fs');
const path = require('path');

// Default Bank Soal bawaan (Edukasi, Teamwork, Budaya Kaizen/5R, Outbound Educamp)
const defaultQuestions = [
  {
    id: 1,
    question: "Apa singkatan dari istilah 5R dalam budaya kerja industri?",
    options: ["Ringkas, Rapi, Resik, Rawat, Rajin", "Rileks, Rapi, Rutin, Ramah, Rukun", "Rencana, Rapat, Realisasi, Review, Raport", "Rapi, Resik, Rekreasi, Rawat, Rezeki"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "Dalam dinamika kelompok, apa kunci utama mencapai target bersama?",
    options: ["Bekerja sendiri-sendiri", "Komunikasi dan saling percaya", "Menyalahkan orang lain saat gagal", "Menunggu instruksi tanpa inisiatif"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "Pohon pinang biasanya dilumuri apa agar licin saat perayaan?",
    options: ["Saus tomat", "Cat tembok", "Minyak goreng / Pelumas oli", "Air kelapa"],
    correctIndex: 2
  },
  {
    id: 4,
    question: "Karakter orang yang berada di posisi penopang dasar harus memiliki sifat...",
    options: ["Egois dan mudah lelah", "Kuat, sabar, dan berjiwa penopang", "Ingin cepat menang sendiri", "Mudah panik"],
    correctIndex: 1
  },
  {
    id: 5,
    question: "Apa tujuan utama kegiatan Educamp / Outbound bagi tim?",
    options: ["Sekadar jalan-jalan santai", "Mencari siapa yang paling hebat", "Menghabiskan sisa anggaran", "Mempererat sinergi, komunikasi & resiliensi"],
    correctIndex: 3
  },
  {
    id: 6,
    question: "Bila terjadi kesalahan strategi dalam tim, tindakan terbaik adalah...",
    options: ["Mengevaluasi bersama dan bangkit lagi", "Mencari kambing hitam", "Mogok bertanding", "Menertawakan teman"],
    correctIndex: 0
  },
  {
    id: 7,
    question: "Tanda utama tim yang memiliki 'Growth Mindset' adalah...",
    options: ["Menolak tantangan baru", "Melihat kegagalan sebagai kesempatan belajar", "Cepat puas dengan hasil minimal", "Menghindari kritik yang membangun"],
    correctIndex: 1
  },
  {
    id: 8,
    question: "Di puncak pohon pinang tradisional, biasanya digantungkan apa?",
    options: ["Sepatu usang", "Batu kali", "Hadiah dan bendera merah putih", "Laptop rusak"],
    correctIndex: 2
  },
  {
    id: 9,
    question: "Prinsip Kaizen dalam manajemen manufaktur Jepang bermakna...",
    options: ["Perbaikan berkesinambungan (Continuous Improvement)", "Bekerja tanpa henti 24 jam", "Mengurangi gaji karyawan", "Membuat gedung bertingkat"],
    correctIndex: 0
  },
  {
    id: 10,
    question: "Apa yang harus dilakukan jika rekan setim mulai kelelahan saat menarik tali?",
    options: ["Tinggalkan dan marahi dia", "Dorong agar jatuh", "Beri semangat, atur ritme, dan saling menopang", "Lepas tali dan menyerah"],
    correctIndex: 2
  },
  {
    id: 11,
    question: "Dalam lomba tarik tambang, apa posisi kuda-kuda kaki yang paling kokoh?",
    options: ["Kaki rapat berdiri tegak", "Satu kaki di depan sedikit ditekuk, satu di belakang menancap miring", "Kedua kaki melompat-lompat", "Kaki bersila di tanah"],
    correctIndex: 1
  },
  {
    id: 12,
    question: "Apa fungsi komando ritme (seperti 'Satu... Dua... Tarik!') dalam tarik tambang?",
    options: ["Membuat lawan tertawa", "Menyinkronkan tenaga hentakan seluruh tim secara serentak", "Menghemat suara kapten", "Membuat pertandingan lebih lama"],
    correctIndex: 1
  },
  {
    id: 13,
    question: "Anggota tim yang berada di posisi paling belakang tali (jangkar) idealnya memiliki postur...",
    options: ["Paling pendek dan lincah", "Paling ringan agar mudah gerak", "Paling berat, kuat, dan bertindak sebagai penahan beban", "Suka melamun"],
    correctIndex: 2
  },
  {
    id: 14,
    question: "Langkah pertama dalam konsep 5R (Ringkas / Seiri) adalah...",
    options: ["Mengecat ulang lantai", "Memilah barang yang diperlukan dan menyingkirkan yang tidak perlu", "Membersihkan debu mesin", "Membuat poster slogan"],
    correctIndex: 1
  },
  {
    id: 15,
    question: "Apa arti dari 'Resik' (Seiso) dalam budaya industri?",
    options: ["Menjaga kebersihan area kerja bebas dari debu, kotoran, dan potensi bahaya", "Menyimpan barang di lemari tertutup", "Membeli seragam baru", "Datang tepat waktu"],
    correctIndex: 0
  },
  {
    id: 16,
    question: "Konsep 'Rapi' (Seiton) mengedepankan prinsip penataan barang...",
    options: ["Ditumpuk setinggi mungkin", "Setiap barang punya tempatnya dan mudah diambil dalam waktu singkat", "Disembunyikan di bawah meja", "Diacak agar kreatif"],
    correctIndex: 1
  },
  {
    id: 17,
    question: "Sikap sportivitas sejati saat tim kita memenangkan pertandingan adalah...",
    options: ["Mengejek dan menertawakan lawan", "Rendah hati, menghormati lawan, dan merayakan kemenangan bersama", "Mengabaikan jabat tangan lawan", "Menolak bertanding lagi"],
    correctIndex: 1
  },
  {
    id: 18,
    question: "Jika tali tambang terasa licin oleh keringat atau lumpur, apa reaksi terbaik tim?",
    options: ["Langsung melepas tali", "Tetap tenang, pererat genggaman bersama, dan sesuaikan pijakan kaki", "Menyalahkan cuaca", "Berhenti menarik"],
    correctIndex: 1
  },
  {
    id: 19,
    question: "Dalam metode PDCA, huruf 'C' adalah singkatan dari...",
    options: ["Control", "Cancel", "Check (Evaluasi hasil terhadap target)", "Create"],
    correctIndex: 2
  },
  {
    id: 20,
    question: "Apa bahaya utama dari sikap 'Silo Mentality' (bekerja terkotak-kotak) di perusahaan?",
    options: ["Ruang kerja menjadi luas", "Komunikasi tersumbat dan target organisasi sulit tercapai", "Gaji karyawan meningkat", "Koneksi internet jadi cepat"],
    correctIndex: 1
  },
  {
    id: 21,
    question: "Mengapa pembagian peran (role division) penting dalam tim tarik tambang?",
    options: ["Agar ada yang bisa istirahat", "Setiap anggota tahu kapan harus mengunci posisi dan kapan menarik serentak", "Agar terlihat rapi di foto", "Untuk formalitas lomba"],
    correctIndex: 1
  },
  {
    id: 22,
    question: "Istilah 'Active Listening' (mendengarkan aktif) berarti...",
    options: ["Mendengarkan sambil bermain HP", "Fokus penuh memahami pesan lawan bicara tanpa memotong terburu-buru", "Mendengar dari kejauhan", "Menyetujui semua hal tanpa berpikir"],
    correctIndex: 1
  },
  {
    id: 23,
    question: "Ketika tim tertinggal poin, mentalitas juara yang harus dinyalakan adalah...",
    options: ["Panik dan saling menyalahkan", "Resiliensi (pantang menyerah) dan fokus pada tarikan berikutnya", "Pasrah menunggu waktu habis", "Keluar dari arena lomba"],
    correctIndex: 1
  },
  {
    id: 24,
    question: "Apa tujuan dari 'After Action Review' (AAR) setelah sebuah tantangan selesai?",
    options: ["Menghukum orang yang salah", "Mengidentifikasi pelajaran yang didapat (lesson learned) untuk perbaikan ke depan", "Membuat laporan tebal", "Menghabiskan waktu santai"],
    correctIndex: 1
  },
  {
    id: 25,
    question: "Sikap 'Rajin' (Shitsuke) dalam 5R mencerminkan...",
    options: ["Disiplin menjadikan standar kerja bersih dan teratur sebagai kebiasaan alami", "Bekerja lembur setiap hari", "Sering memuji atasan", "Menghafal buku peraturan"],
    correctIndex: 0
  },
  {
    id: 26,
    question: "Dalam situasi tarik tambang yang imbang (stagnan di tengah), faktor penentu kemenangan adalah...",
    options: ["Siapa yang paling keras berteriak", "Ketahanan mental, kekompakan nafas, dan kesabaran menunggu momentum lawan lengah", "Berapa banyak penonton yang bersorak", "Sepatu paling mahal"],
    correctIndex: 1
  },
  {
    id: 27,
    question: "Faktor terpenting dalam menjaga keselamatan kerja (K3) di arena lomba adalah...",
    options: ["Mengabaikan arahan instruktur", "Mematuhi batas garis, menggunakan alas kaki yang aman, dan siap berhenti jika peluit ditiup", "Memaksakan diri saat cedera", "Bermain curang tanpa ketahuan"],
    correctIndex: 1
  },
  {
    id: 28,
    question: "Apa arti pepatah 'Berat sama dipikul, ringan sama dijinjing' dalam kerja tim?",
    options: ["Beban pekerjaan dibagi dan diselesaikan bersama dengan penuh tanggung jawab", "Beban berat ditinggalkan", "Hanya mengangkat barang yang ringan", "Menyerahkan beban ke orang lain"],
    correctIndex: 0
  },
  {
    id: 29,
    question: "Mengapa rasa saling percaya (trust) adalah fondasi tim berkinerja tinggi?",
    options: ["Tanpa trust, tim ragu melangkah dan energi habis untuk saling curiga", "Supaya tidak perlu absen kerja", "Biar cepat pulang ke rumah", "Agar tidak perlu evaluasi pekerjaan"],
    correctIndex: 0
  },
  {
    id: 30,
    question: "Peregangan (stretching) sebelum memulai lomba fisik seperti tarik tambang berguna untuk...",
    options: ["Menghabiskan waktu tanding", "Mencegah kram, cedera otot, dan menyiapkan detak jantung", "Memamerkan seragam olahraga", "Membuat lawan merasa takut"],
    correctIndex: 1
  },
  {
    id: 31,
    question: "Tanda dari komunikasi tim yang efektif saat kondisi genting adalah...",
    options: ["Semua orang berteriak bersamaan", "Instruksi singkat, jelas, dan dapat dipahami secara instan oleh seluruh anggota", "Mengirim pesan panjang via email", "Diam membisu tanpa kata"],
    correctIndex: 1
  },
  {
    id: 32,
    question: "Jika salah satu anggota tim salah menjawab soal di tablet, respon tim terbaik adalah...",
    options: ["Mencemooh dan memarahinya", "Tetap solid, beri dorongan moril, dan fokus merebut poin di giliran berikutnya", "Mengeluarkannya dari tim", "Membanting tablet"],
    correctIndex: 1
  },
  {
    id: 33,
    question: "Prinsip 'Rawat' (Seiketsu) dalam budaya 5R bertujuan untuk...",
    options: ["Mempertahankan kondisi 3R sebelumnya dengan standardisasi dan konsistensi", "Membawa tanaman hias ke meja kerja", "Menyiram air setiap jam", "Memperbaiki mesin yang rusak parah"],
    correctIndex: 0
  },
  {
    id: 34,
    question: "Dalam filosofi Educamp, apa yang dimaksud dengan 'Zone of Proximal Development'?",
    options: ["Area santai tanpa tantangan", "Zona di mana seseorang berkembang pesat saat menghadapi tantangan dengan bimbingan dan dukungan tim", "Area makan siang bersama", "Batas garis lapangan"],
    correctIndex: 1
  },
  {
    id: 35,
    question: "Kunci utama untuk menjaga kekompakan tim jangka panjang pasca Educamp adalah...",
    options: ["Melupakan semua materi yang dipelajari", "Menerapkan komitmen, empati, dan budaya kolaborasi dalam pekerjaan sehari-hari", "Hanya akrab saat ada acara piknik", "Menyimpan foto dokumentasi di memori"],
    correctIndex: 1
  }
];

class QuestionBank {
  constructor() {
    this.questions = [...defaultQuestions];
    this.source = 'DEFAULT'; // DEFAULT, AI, CSV
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
    return this.questions;
  }

  setQuestions(newList, source = 'CUSTOM') {
    if (Array.isArray(newList) && newList.length > 0) {
      this.questions = newList.map((q, idx) => ({
        id: q.id || idx + 1,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0
      }));
      this.source = source;
    }
  }

  // Parser CSV pintar untuk format:
  // Soal, PilihanA, PilihanB, PilihanC, PilihanD, JawabanBenar (A/B/C/D atau 0/1/2/3 atau Teks)
  loadFromCSV(csvText) {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      throw new Error("File CSV harus memiliki baris header dan minimal 1 baris soal.");
    }

    const parsedQuestions = [];
    const startIndex = (lines[0].toLowerCase().includes('soal') || lines[0].toLowerCase().includes('question')) ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      // Regex split CSV menangani tanda kutip
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
        // Cek jika jawaban berupa teks pilihan yang cocok
        const optionsList = [optA, optB, optC, optD];
        const matchIdx = optionsList.findIndex(o => o.toLowerCase() === cleanCols[5].toLowerCase());
        if (matchIdx !== -1) correctIndex = matchIdx;
      }

      parsedQuestions.push({
        id: parsedQuestions.length + 1,
        question,
        options: [optA, optB, optC, optD],
        correctIndex
      });
    }

    if (parsedQuestions.length === 0) {
      throw new Error("Tidak ada soal valid yang dapat diekstraksi dari CSV.");
    }

    this.questions = parsedQuestions;
    this.source = 'CSV';
    return parsedQuestions;
  }

  getRandomPool(count) {
    // Acak urutan soal
    const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count || this.questions.length);

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
        correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0
      };
    });
  }
}

module.exports = new QuestionBank();
