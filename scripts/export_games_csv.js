const fs = require('fs');
const path = require('path');

const baseDir = 'e:/SHP/Games/Educamp';
const pinangPath = path.join(baseDir, 'data/game-storage.json');
const tugPath = path.join(baseDir, 'data/tug-storage.json');

const pinang = JSON.parse(fs.readFileSync(pinangPath, 'utf-8'));
const tug = JSON.parse(fs.readFileSync(tugPath, 'utf-8'));
const superAdminEngine = require(path.join(baseDir, 'src/server/super-admin-engine'));
const lb = superAdminEngine.getUnifiedLeaderboard();

const outDir = path.join(baseDir, 'exports');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

// 1. CSV Panjat Pinang
const pinangRows = [
  ['No', 'ID Sesi', 'Waktu Pertandingan', 'Mode', 'Wipeout Mode', 'Durasi Setting (dtk)', 'Waktu Selesai (dtk)', 'Tim Pemenang', 'Alasan Kemenangan', 'Tim 1', 'Skor Tim 1', 'Pemanjat Tim 1', 'Tim 2', 'Skor Tim 2', 'Pemanjat Tim 2']
];

(pinang.history || []).forEach((h, idx) => {
  const teams = Object.values(h.scores || {});
  const t1 = teams[0] || { name: '-', finalMatchScore: 0, climbers: 0 };
  const t2 = teams[1] || { name: '-', finalMatchScore: 0, climbers: 0 };
  const winnerName = h.isDraw ? 'SERI' : (h.winner ? h.winner.name : '-');
  pinangRows.push([
    idx + 1,
    h.id,
    new Date(h.timestamp).toLocaleString('id-ID'),
    h.mode,
    h.wipeoutMode,
    h.durationSeconds,
    h.elapsedSeconds,
    winnerName,
    h.winnerReason,
    t1.name,
    t1.finalMatchScore,
    t1.climbers,
    t2.name,
    t2.finalMatchScore,
    t2.climbers
  ]);
});

const pinangCsv = '\uFEFF' + pinangRows.map(r => r.map(escapeCsv).join(',')).join('\r\n');
const pinangFile = path.join(outDir, 'riwayat_panjat_pinang.csv');
fs.writeFileSync(pinangFile, pinangCsv, 'utf-8');
console.log('Saved:', pinangFile);

// 2. CSV Tarik Tambang
const tugRows = [
  ['No', 'ID Sesi', 'Waktu Pertandingan', 'Game', 'Durasi Setting (dtk)', 'Waktu Berjalan (dtk)', 'Posisi Akhir Tali (Offset)', 'Tim Pemenang', 'Alasan Kemenangan', 'Tim Kiri', 'Skor Tim Kiri', 'Tim Kanan', 'Skor Tim Kanan']
];

(tug.history || []).forEach((h, idx) => {
  const left = (h.scores && h.scores.left) ? h.scores.left : { name: '-', score: 0 };
  const right = (h.scores && h.scores.right) ? h.scores.right : { name: '-', score: 0 };
  const winnerName = h.winner ? h.winner.name : 'SERI';
  tugRows.push([
    idx + 1,
    h.id,
    new Date(h.timestamp).toLocaleString('id-ID'),
    h.game,
    h.durationSeconds,
    h.elapsedSeconds,
    h.finalRopeOffset,
    winnerName,
    h.winnerReason,
    left.name,
    left.score,
    right.name,
    right.score
  ]);
});

const tugCsv = '\uFEFF' + tugRows.map(r => r.map(escapeCsv).join(',')).join('\r\n');
const tugFile = path.join(outDir, 'riwayat_tarik_tambang.csv');
fs.writeFileSync(tugFile, tugCsv, 'utf-8');
console.log('Saved:', tugFile);

// 3. CSV Klasemen Gabungan / Unified Leaderboard
const lbRows = [
  ['Peringkat', 'Nama Tim', 'Jumlah Anggota', 'Poin Panjat Pinang', 'Menang Panjat Pinang', 'Poin Tarik Tambang', 'Menang Tarik Tambang', 'Total Poin Digital', 'Total Poin Non-Digital', 'Grand Total Poin']
];

(lb.leaderboard || []).forEach(t => {
  lbRows.push([
    t.rank,
    t.teamName,
    t.membersCount,
    t.digital.pinangScore,
    t.digital.pinangWins,
    t.digital.tugScore,
    t.digital.tugWins,
    t.digital.totalDigital,
    t.totalNonDigital,
    t.grandTotal
  ]);
});

const lbCsv = '\uFEFF' + lbRows.map(r => r.map(escapeCsv).join(',')).join('\r\n');
const lbFile = path.join(outDir, 'klasemen_akhir_games_educamp.csv');
fs.writeFileSync(lbFile, lbCsv, 'utf-8');
console.log('Saved:', lbFile);

