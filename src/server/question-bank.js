const fs = require('fs');
const path = require('path');

// Default Bank Soal bawaan (Edukasi, Teamwork, General Camp Fun)
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
    options: ["Minyak goreng / Pelumas oli", "Saus tomat", "Cat tembok", "Air kelapa"],
    correctIndex: 0
  },
  {
    id: 4,
    question: "Karakter orang yang berada di posisi paling dasar pohon pinang harus memiliki sifat...",
    options: ["Egois dan mudah lelah", "Kuat, sabar, dan berjiwa penopang", "Ingin cepat menang sendiri", "Mudah panik"],
    correctIndex: 1
  },
  {
    id: 5,
    question: "Apa tujuan utama kegiatan Educamp / Outbound bagi tim?",
    options: ["Sekadar jalan-jalan", "Mempererat sinergi, komunikasi & resiliensi", "Mencari siapa yang paling hebat", "Menghabiskan anggaran"],
    correctIndex: 1
  },
  {
    id: 6,
    question: "Bila terjadi kesalahan dalam tim, tindakan terbaik adalah...",
    options: ["Mengevaluasi bersama dan bangkit lagi", "Mencari kambing hitam", "Mogok bertanding", "Menertawakan teman"],
    correctIndex: 0
  },
  {
    id: 7,
    question: "Tanda utama tim yang memiliki 'Growth Mindset' adalah...",
    options: ["Melihat kegagalan sebagai kesempatan belajar", "Menolak tantangan baru", "Cepat puas dengan hasil minimal", "Menghindari kritik yang membangun"],
    correctIndex: 0
  },
  {
    id: 8,
    question: "Di puncak pohon pinang, biasanya digantungkan apa?",
    options: ["Hadiah dan bendera merah putih", "Sepatu usang", "Batu kali", "Laptop rusak"],
    correctIndex: 0
  },
  {
    id: 9,
    question: "Prinsip Kaizen dalam manajemen Jepang bermakna...",
    options: ["Perbaikan berkesinambungan (Continuous Improvement)", "Bekerja tanpa henti 24 jam", "Mengurangi gaji karyawan", "Membuat gedung bertingkat"],
    correctIndex: 0
  },
  {
    id: 10,
    question: "Apa yang harus dilakukan jika anggota tim merasa lelah saat memanjat?",
    options: ["Beri semangat dan saling menopang", "Tinggalkan di bawah", "Dorong agar jatuh", "Marahi dia"],
    correctIndex: 0
  }
];

class QuestionBank {
  constructor() {
    this.questions = [...defaultQuestions];
  }

  getAll() {
    return this.questions;
  }

  setQuestions(newList) {
    if (Array.isArray(newList) && newList.length > 0) {
      this.questions = newList.map((q, idx) => ({
        id: q.id || idx + 1,
        question: q.question,
        options: q.options,
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0
      }));
    }
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
