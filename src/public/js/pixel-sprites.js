/**
 * Procedural Pixel Art Sprite Generator for Panjat Pinang Characters
 * Mendukung 4 tipe postur:
 * - tall-skinny (Tinggi - Kurus)
 * - short-skinny (Pendek - Kurus)
 * - tall-chubby (Tinggi - Gemuk)
 * - short-chubby (Pendek - Gemuk)
 *
 * Pilihan warna kulit: fair, olive, tan, deep
 */

class PixelSprites {
  static getSkinColor(tone) {
    switch (tone) {
      case 'fair': return '#ffd1b3';
      case 'olive': return '#e0ac69';
      case 'tan': return '#c68642';
      case 'deep': return '#8d5524';
      default: return '#e0ac69';
    }
  }

  static drawCharacter(ctx, x, y, {
    name = '',
    bodyType = 'tall-skinny',
    skinTone = 'tan',
    teamColor = '#e74c3c',
    state = 'IDLE', // IDLE, CLIMB, FALL, VICTORY
    animFrame = 0,
    facing = 1, // 1: kanan, -1: kiri
    situationalMood = null, // CELEBRATING_LEAD, DESPERATE_LOSING, CHEERING_FRIEND, ANGRY_AT_MISTAKE
    nameOffsetY = 0, // Offset vertikal tambahan untuk selang-seling baris nama
    isCurrentTurn = false // Highlight aktif penjawab
  }) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(facing, 1);

    const skin = this.getSkinColor(skinTone);
    const pixelSize = 3; // Ukuran 1 grid pixel art

    // Tentukan dimensi berdasarkan postur
    let headW = 10, headH = 10;
    let bodyW = 10, bodyH = 14;
    let legH = 10;

    if (bodyType === 'tall-skinny') {
      bodyW = 8;
      bodyH = 18;
      legH = 14;
    } else if (bodyType === 'short-skinny') {
      bodyW = 8;
      bodyH = 12;
      legH = 8;
    } else if (bodyType === 'tall-chubby') {
      bodyW = 14;
      bodyH = 18;
      legH = 12;
    } else if (bodyType === 'short-chubby') {
      bodyW = 14;
      bodyH = 12;
      legH = 8;
    }

    const totalHeight = (headH + bodyH + legH) * pixelSize;

    // 1. Gambar Nama di atas kepala (dengan highlight khusus penjawab & nameOffsetY agar tidak bertumpuk)
    ctx.save();
    ctx.scale(facing, 1); // Kembalikan teks agar tidak terbalik
    const computedNameY = -totalHeight - 10 + nameOffsetY;

    if (isCurrentTurn) {
      // Highlight Badge Glowing Emas Terang untuk penjawab saat ini
      ctx.font = 'bold 12px "Courier New", monospace';
      const textMetrics = ctx.measureText(name);
      const textW = textMetrics.width;
      const padX = 8, padY = 4;
      const badgeH = 18;

      // Glow effect
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.roundRect(-textW / 2 - padX, computedNameY - 14, textW + (padX * 2), badgeH, 6);
      ctx.fill();

      // Border badge emas
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#d97706';
      ctx.stroke();

      // Teks nama gelap kontras tajam
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#78350f';
      ctx.textAlign = 'center';
      ctx.fillText(name, 0, computedNameY);
    } else {
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.fillText(name, 0, computedNameY);
    }

    // 1b. Emoji Ekspresif Cerdas & Selektif di Atas Kepala Sesuai Kondisi & Reaksi Kawan
    // Hash nama untuk konsistensi individual
    let nameHash = 0;
    for (let ci = 0; ci < (name || '').length; ci++) {
      nameHash = (nameHash * 31 + name.charCodeAt(ci)) | 0;
    }
    nameHash = Math.abs(nameHash);

    // Kecepatan perubahan lambat: 1 perubahan tiap ~150-200 frames (sekitar 3-4 detik)
    const slowCycle = Math.floor((animFrame + (nameHash % 70)) / 180);

    // Selektivitas: Tidak semua anggota menampilkan emoji bersamaan (hanya 35-50% karakter aktif per periode)
    // Kecuali saat kondisi ekstrem (hampir menang, hampir kalah, victory, atau baru saja ada jawaban)
    const isSpecialState = ['VICTORY', 'FALL', 'SLIP', 'ANGRY', 'CHEER'].includes(state) || !!situationalMood;
    const isExpressiveNow = isSpecialState || ((nameHash + slowCycle) % 3 === 0);

    if (isExpressiveNow) {
      let activeEmoji = null;

      if (state === 'VICTORY' || situationalMood === 'VICTORY') {
        // Tim pemenang: bergembira, cheerful, joyful sepuasnya!
        const pool = ['👑', '🏆', '🎉', '🥳', '🤩', '✌️', '✨', '😎', '🎊', '🥇'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (state === 'DEFEATED' || situationalMood === 'DEFEATED' || state === 'FALL') {
        // Tim kalah: sedih, marah, nyesel, menangis
        const pool = ['😭', '😡', '🤦‍♂️', '💔', '😫', '😢', '🤬', '🥀', '🥺', '🌧️'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (state === 'SLIP') {
        const pool = ['😱', '💦', '😵', '💥', '🍂'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (situationalMood === 'ANGRY_AT_MISTAKE') {
        // Marah / gemas saat kawan tim salah menjawab / tergelincir
        const pool = ['😡', '🤦‍♂️', '😤', '💢', '🙄', '🤬'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (situationalMood === 'CHEERING_FRIEND') {
        // Menyemangati kawan yang baru menjawab benar / berhasil menarik
        const pool = ['🔥', '👏', '💪', '✨', '🤩', '🙌', '💯'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (situationalMood === 'CELEBRATING_LEAD') {
        // Tim sedang unggul jauh / hampir menang (aura gembira, percaya diri)
        const pool = ['😄', '😁', '🔥', '💪', '😎', '✌️', '🎉'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (situationalMood === 'DESPERATE_LOSING') {
        // Tim sedang terdesak / mau kalah (gemas, ngotot, panik berjuang)
        const pool = ['😤', '💥', '😬', '😰', '😡', '⚡', '🥵'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (state === 'PULL' || state === 'STRAIN') {
        // Tarik tambang normal
        const pool = ['😤', '💪', '😬', '🔥', '✊'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else if (state === 'CLIMB') {
        // Sedang memanjat pinang
        const pool = ['🧗', '💪', '🔥', '😅'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      } else {
        // Idle santai di barisan
        const pool = ['👀', '✊', '😎', '☕', '✨'];
        activeEmoji = pool[(nameHash + slowCycle) % pool.length];
      }

      if (activeEmoji) {
        // Animasi floating bobbing halus (frekuensi rendah), posisikan di atas nama
        const floatBounce = Math.sin((animFrame * 0.08) + (nameHash % 5)) * 3;
        const emojiY = computedNameY - 16 + floatBounce;

        ctx.font = '16px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 4;
        ctx.fillText(activeEmoji, 0, emojiY);
      }
    }
    ctx.restore();

    // Posisi Y anchor di tanah (0,0 adalah titik pijakan kaki)
    const legY = -legH * pixelSize;
    const bodyY = legY - (bodyH * pixelSize);
    const headY = bodyY - (headH * pixelSize);

    // 2. Kaki / Celana
    ctx.fillStyle = '#2c3e50';
    if (state === 'CLIMB') {
      // Kaki merangkul / mengapit tiang
      const legOffset = (animFrame % 2 === 0) ? 2 : -2;
      ctx.fillRect(-bodyW * pixelSize / 2 - 4, legY, (bodyW * pixelSize / 2) + 2, legH * pixelSize);
      ctx.fillRect(2, legY + legOffset, (bodyW * pixelSize / 2) + 4, legH * pixelSize);
    } else if (state === 'FALL') {
      // Kaki kangkang / panik jatuh
      ctx.fillRect(-bodyW * pixelSize / 2 - 6, legY - 4, 8, legH * pixelSize);
      ctx.fillRect(bodyW * pixelSize / 2 - 2, legY - 4, 8, legH * pixelSize);
    } else if (state === 'PULL' || state === 'STRAIN') {
      // Kuda-kuda tarik tambang: kaki belakang condong menancap ke tanah
      ctx.fillRect(-bodyW * pixelSize / 2 - 8, legY + 2, 8, legH * pixelSize - 2);
      ctx.fillRect(bodyW * pixelSize / 2 - 2, legY - 2, 8, legH * pixelSize + 2);
    } else if (state === 'SLIP') {
      // Tergelincir / terseret ke depan
      ctx.fillRect(-bodyW * pixelSize / 2 - 2, legY - 2, 8, legH * pixelSize);
      ctx.fillRect(bodyW * pixelSize / 2 + 4, legY + 2, 8, legH * pixelSize - 2);
    } else {
      // Idle berdiri tegak / antre
      const bounce = Math.sin(animFrame * 0.2) * 2;
      ctx.fillRect(-bodyW * pixelSize / 2 + 2, legY + bounce, (bodyW * pixelSize / 2) - 4, legH * pixelSize);
      ctx.fillRect(2, legY + bounce, (bodyW * pixelSize / 2) - 4, legH * pixelSize);
    }

    // 3. Badan / Kaos Tim (Warna Tim)
    ctx.fillStyle = teamColor;
    if (state === 'PULL') {
      // Condong ke belakang saat menarik kuat
      ctx.save();
      ctx.rotate(-0.15); // Bersandar ke belakang
      ctx.fillRect(-bodyW * pixelSize / 2, bodyY, bodyW * pixelSize, bodyH * pixelSize);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(-bodyW * pixelSize / 2, bodyY + (bodyH * pixelSize) - 4, bodyW * pixelSize, 4);
      ctx.restore();
    } else {
      ctx.fillRect(-bodyW * pixelSize / 2, bodyY, bodyW * pixelSize, bodyH * pixelSize);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(-bodyW * pixelSize / 2, bodyY + (bodyH * pixelSize) - 4, bodyW * pixelSize, 4);
    }

    // 4. Kepala (Warna Kulit)
    ctx.fillStyle = skin;
    ctx.fillRect(-headW * pixelSize / 2, headY, headW * pixelSize, headH * pixelSize);

    // Rambut Hitam Pixel
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(-headW * pixelSize / 2, headY, headW * pixelSize, 8);
    ctx.fillRect(-headW * pixelSize / 2 - 2, headY, 4, 14);

    // Ikat Kepala Tim (Headband)
    ctx.fillStyle = teamColor;
    ctx.fillRect(-headW * pixelSize / 2, headY + 8, headW * pixelSize, 4);

    // Mata Pixel
    ctx.fillStyle = '#111';
    if (state === 'FALL' || state === 'SLIP') {
      // Mata silang / panik 'X'
      ctx.font = 'bold 10px monospace';
      ctx.fillText('x', 2, headY + 18);
    } else if (state === 'PULL' || state === 'STRAIN') {
      // Mata fokus / menyipit bertenaga '>'
      ctx.fillRect(2, headY + 15, 5, 2);
    } else {
      ctx.fillRect(2, headY + 14, 3, 3);
    }

    // 5. Tangan
    ctx.fillStyle = skin;
    if (state === 'CLIMB') {
      // Tangan memeluk pinang ke depan
      ctx.fillRect(-2, bodyY + 4, (bodyW * pixelSize) + 8, 6);
    } else if (state === 'PULL' || state === 'STRAIN') {
      // Koordinat tali tambang di canvas adalah (groundY - 48), sehingga relatif thd kaki = -48px
      const targetRopeY = -48;
      const shoulderY = bodyY + 6; // Bahu karakter
      const armStartX = (bodyW * pixelSize / 2) - 4;
      const handX = (bodyW * pixelSize) + 6; // Posisi genggaman tangan di depan

      if (bodyType.startsWith('tall')) {
        // Karakter tinggi: Bahu lebih tinggi dari tali, tangan turun diagonal ke bawah memegang tali
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = skin;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(armStartX, shoulderY);
        // Siku sedikit menekuk bertenaga
        const elbowX = armStartX + 8;
        const elbowY = (shoulderY + targetRopeY) / 2 - 1;
        ctx.lineTo(elbowX, elbowY);
        ctx.lineTo(handX, targetRopeY);
        ctx.stroke();

        // Genggaman tangan mencengkeram tali tambang tepat di targetRopeY
        ctx.fillRect(handX - 2, targetRopeY - 5, 9, 10);
        // Jemari melingkari tali
        ctx.fillStyle = '#b45309';
        ctx.fillRect(handX, targetRopeY - 6, 5, 2);
        ctx.fillRect(handX, targetRopeY + 4, 5, 2);
        ctx.fillStyle = skin;
      } else {
        // Karakter pendek: Bahu pas sejajar dengan tali tambang (lurus ke depan)
        ctx.fillRect(armStartX - 2, targetRopeY - 3, (handX - armStartX) + 4, 6);
        // Genggaman tangan
        ctx.fillRect(handX - 2, targetRopeY - 5, 9, 10);
        // Jemari melingkari tali
        ctx.fillStyle = '#b45309';
        ctx.fillRect(handX, targetRopeY - 6, 5, 2);
        ctx.fillRect(handX, targetRopeY + 4, 5, 2);
        ctx.fillStyle = skin;
      }
    } else if (state === 'VICTORY') {
      // Angkat tangan ke atas mengibarkan bendera
      ctx.fillRect(-4, bodyY - 14, 6, 16);
      // Bendera Merah Putih
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(2, bodyY - 26, 16, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(2, bodyY - 18, 16, 8);
    } else if (state === 'FALL') {
      // Tangan ke atas panik
      ctx.fillRect(-bodyW * pixelSize / 2 - 6, bodyY - 10, 6, 16);
      ctx.fillRect(bodyW * pixelSize / 2, bodyY - 10, 6, 16);
    } else {
      // Tangan santai di samping
      ctx.fillRect(-bodyW * pixelSize / 2 - 4, bodyY + 4, 4, (bodyH * pixelSize) - 4);
    }

    ctx.restore();
  }
}

// Ekspor ke window global untuk browser
if (typeof window !== 'undefined') {
  window.PixelSprites = PixelSprites;
}
