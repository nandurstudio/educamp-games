const fs = require('fs');
const path = require('path');

const baseDir = 'e:/SHP/Games/Educamp';
const qb = require(path.join(baseDir, 'src/server/question-bank'));

const outDir = path.join(baseDir, 'exports');
const publicOutDir = path.join(baseDir, 'src/public/exports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(publicOutDir)) fs.mkdirSync(publicOutDir, { recursive: true });

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const letterMap = ['A', 'B', 'C', 'D'];

function generateCsv(questionsList) {
  const header = [
    'No',
    'ID Soal',
    'Pertanyaan',
    'Pilihan A',
    'Pilihan B',
    'Pilihan C',
    'Pilihan D',
    'Kunci Jawaban',
    'Teks Kunci Jawaban',
    'Tingkat Kesulitan',
    'Peruntukan Game'
  ];

  const rows = [header];

  questionsList.forEach((q, idx) => {
    const opts = q.options || [];
    const optA = opts[0] || '';
    const optB = opts[1] || '';
    const optC = opts[2] || '';
    const optD = opts[3] || '';
    const correctLetter = letterMap[q.correctIndex] || 'A';
    const correctText = opts[q.correctIndex] || '';

    rows.push([
      idx + 1,
      q.id,
      q.question,
      optA,
      optB,
      optC,
      optD,
      correctLetter,
      correctText,
      q.difficulty || 'MEDIUM',
      q.game || 'ALL'
    ]);
  });

  return '\uFEFF' + rows.map(r => r.map(escapeCsv).join(',')).join('\r\n');
}

// 1. Bank Soal Lengkap (55 Soal)
const allCsv = generateCsv(qb.questions);
const allFile = path.join(outDir, 'bank_soal_lengkap_educamp.csv');
fs.writeFileSync(allFile, allCsv, 'utf-8');
fs.writeFileSync(path.join(publicOutDir, 'bank_soal_lengkap_educamp.csv'), allCsv, 'utf-8');
console.log('Saved:', allFile, `(${qb.questions.length} soal)`);

// 2. Bank Soal Panjat Pinang (Soal Game PINANG + ALL)
const pinangQuestions = qb.questions.filter(q => q.game === 'PINANG' || q.game === 'ALL' || !q.game);
const pinangCsv = generateCsv(pinangQuestions);
const pinangFile = path.join(outDir, 'bank_soal_panjat_pinang.csv');
fs.writeFileSync(pinangFile, pinangCsv, 'utf-8');
fs.writeFileSync(path.join(publicOutDir, 'bank_soal_panjat_pinang.csv'), pinangCsv, 'utf-8');
console.log('Saved:', pinangFile, `(${pinangQuestions.length} soal)`);

// 3. Bank Soal Tarik Tambang (Soal Game TUG + ALL)
const tugQuestions = qb.questions.filter(q => q.game === 'TUG' || q.game === 'ALL' || !q.game);
const tugCsv = generateCsv(tugQuestions);
const tugFile = path.join(outDir, 'bank_soal_tarik_tambang.csv');
fs.writeFileSync(tugFile, tugCsv, 'utf-8');
fs.writeFileSync(path.join(publicOutDir, 'bank_soal_tarik_tambang.csv'), tugCsv, 'utf-8');
console.log('Saved:', tugFile, `(${tugQuestions.length} soal)`);
