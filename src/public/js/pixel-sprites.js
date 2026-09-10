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
    facing = 1 // 1: kanan, -1: kiri
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

    // 1. Gambar Nama di atas kepala
    ctx.save();
    ctx.scale(facing, 1); // Kembalikan teks agar tidak terbalik
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.fillText(name, 0, -totalHeight - 6);
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
    } else {
      // Idle berdiri tegak / antre
      const bounce = Math.sin(animFrame * 0.2) * 2;
      ctx.fillRect(-bodyW * pixelSize / 2 + 2, legY + bounce, (bodyW * pixelSize / 2) - 4, legH * pixelSize);
      ctx.fillRect(2, legY + bounce, (bodyW * pixelSize / 2) - 4, legH * pixelSize);
    }

    // 3. Badan / Kaos Tim (Warna Tim)
    ctx.fillStyle = teamColor;
    ctx.fillRect(-bodyW * pixelSize / 2, bodyY, bodyW * pixelSize, bodyH * pixelSize);

    // Detail garis kaos / kerah
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(-bodyW * pixelSize / 2, bodyY + (bodyH * pixelSize) - 4, bodyW * pixelSize, 4);

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
    if (state === 'FALL') {
      // Mata silang / panik 'X'
      ctx.fillText('x', 2, headY + 18);
    } else {
      ctx.fillRect(2, headY + 14, 3, 3);
    }

    // 5. Tangan
    ctx.fillStyle = skin;
    if (state === 'CLIMB') {
      // Tangan memeluk pinang ke depan
      ctx.fillRect(-2, bodyY + 4, (bodyW * pixelSize) + 8, 6);
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
