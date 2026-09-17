/**
 * Arena Canvas 2D Engine
 * Menggambar arena lapangan, pohon pinang beroda hadiah di puncak,
 * tiang bendera, animasi pemanjat bertumpuk, dan efek jatuh rontok.
 */

class ArenaCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = null;
    this.animFrame = 0;
    this.fallProgress = {}; // { team1: progress, team2: progress }
    this.recentReactions = {}; // { [teamId]: { mood, until } }

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.startLoop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateState(state) {
    this.state = state;
  }

  triggerFall(teamId) {
    this.fallProgress[teamId] = 1.0; // 1.0 = sedang di atas, meluncur ke 0
    this.recentReactions[teamId] = { mood: 'ANGRY_AT_MISTAKE', until: Date.now() + 3500 };
    if (window.soundFX) window.soundFX.playWipeout();
  }

  triggerClimb(teamId) {
    this.recentReactions[teamId] = { mood: 'CHEERING_FRIEND', until: Date.now() + 3500 };
    if (window.soundFX) window.soundFX.playCorrect();
  }

  triggerVictory(winner) {
    if (window.soundFX) window.soundFX.playVictory();
  }

  startLoop() {
    const loop = () => {
      this.animFrame++;
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  render() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // Bersihkan frame sebelumnya
    ctx.clearRect(0, 0, w, h);

    // 1. Gambar Langit Biru Gradasi Sore/Cerah
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#4a90e2');
    skyGrad.addColorStop(0.6, '#87ceeb');
    skyGrad.addColorStop(1, '#dff9fb');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Awan Pixel Art Berjalan
    this.drawPixelCloud((this.animFrame * 0.5) % (w + 200) - 100, 80);
    this.drawPixelCloud(((this.animFrame * 0.3) + 400) % (w + 200) - 100, 140);

    // 2. Lapangan Rumput & Tanah
    const groundY = h - 130;
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, groundY, w, 20); // Garis rumput atas
    ctx.fillStyle = '#1e824c';
    ctx.fillRect(0, groundY + 20, w, 110); // Tanah bawah (menjangkau dasar canvas)

    // Detail Pixel Rumput
    ctx.fillStyle = '#2ecc71';
    for (let x = 0; x < w; x += 15) {
      const grassH = ((x % 30 === 0) ? 6 : 4);
      ctx.fillRect(x, groundY - grassH, 6, grassH);
    }

    if (!this.state || !this.state.teams) {
      // Tampilan standby
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Kalbe Rounded", "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("MENUNGGU GAME DIMULAI DARI ADMIN...", w / 2, h / 2);
      return;
    }

    // 3. Render Tim dan Pohon Pinang
    const teamEntries = Object.entries(this.state.teams);
    const numTeams = teamEntries.length;
    const spacing = w / (numTeams + 1);

    teamEntries.forEach(([teamId, team], idx) => {
      const poleX = spacing * (idx + 1);
      this.renderTeamArena(poleX, groundY, teamId, team);
    });

    // 4. Banner Kemenangan jika Game Over
    if (this.state.status === 'FINISHED' && this.state.winner) {
      this.renderVictoryOverlay(w, h);
    }
  }

  drawPixelCloud(x, y) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(x, y, 90, 24);
    ctx.fillRect(x + 15, y - 12, 60, 14);
    ctx.fillRect(x + 30, y - 20, 30, 10);
  }

  renderTeamArena(poleX, groundY, teamId, team) {
    const { ctx } = this;
    const poleWidth = 24;
    const memberCount = Math.max(1, team.members.length);
    const stepHeight = Math.min(50, Math.max(28, Math.floor(360 / memberCount)));
    const poleHeight = Math.max(380, (memberCount * stepHeight) + 40);
    const topY = groundY - poleHeight;

    // A. Gambar Batang Pohon Pinang (Coklat Mengkilap Oli)
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(poleX - poleWidth / 2, topY, poleWidth, poleHeight);

    // Efek Kilau Oli Licin di Batang Pinang
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(poleX - poleWidth / 2, topY, 4, poleHeight);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(poleX + 2, topY, 4, poleHeight);

    // B. Roda Hadiah & Bendera di Puncak Pinang
    this.renderPinangWheel(poleX, topY);

    // C. Nama & Papan Skor Tim di Bawah
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillStyle = team.color;
    ctx.fillText(team.name.toUpperCase(), poleX, groundY + 38);

    ctx.font = '14px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Skor: ${team.score} | Memanjat: ${team.currentClimbers}/${team.members.length}`, poleX, groundY + 58);
    ctx.restore();

    // D. Update Animasi Jatuh (Wipeout) jika aktif
    if (this.fallProgress[teamId] > 0) {
      this.fallProgress[teamId] -= 0.05;
      if (this.fallProgress[teamId] <= 0) {
        this.fallProgress[teamId] = 0;
        // Efek Debu Poof di Tanah
        this.drawDustPoof(poleX, groundY);
      }
    }

    const isFalling = this.fallProgress[teamId] > 0;
    const now = Date.now();

    // Hitung Situational Mood Tim Panjat Pinang
    let teamMood = null;
    if (this.recentReactions[teamId] && now < this.recentReactions[teamId].until) {
      teamMood = this.recentReactions[teamId].mood;
    } else if (this.state.status === 'PLAYING') {
      const progressRatio = team.currentClimbers / (team.members.length || 1);
      if (progressRatio >= 0.75) {
        teamMood = 'CELEBRATING_LEAD'; // Hampir sampai puncak!
      } else {
        // Cek apakah tertinggal jauh dari tim lain
        const allTeams = Object.values(this.state.teams || {});
        const maxClimbers = Math.max(...allTeams.map(t => t.currentClimbers || 0));
        if (maxClimbers >= 4 && maxClimbers - team.currentClimbers >= 3) {
          teamMood = 'DESPERATE_LOSING'; // Tertinggal jauh, tegang & ngotot!
        }
      }
    }

    // E. Render Karakter yang Sudah Memeluk Pinang (Climbers)
    for (let i = 0; i < team.currentClimbers; i++) {
      const member = team.members[i];
      if (!member) continue;

      let climberY = groundY - (i * stepHeight) - 20;

      // Jika sedang wipeout, posisi Y di-interpolasi melorot cepat ke tanah
      if (isFalling) {
        const fallRatio = this.fallProgress[teamId];
        climberY = groundY - (i * stepHeight * fallRatio) - 20;
      }

      const isTopWinner = (i === team.members.length - 1) && this.state.winner?.id === team.id;
      const charState = isFalling ? 'FALL' : (isTopWinner ? 'VICTORY' : 'CLIMB');

      PixelSprites.drawCharacter(ctx, poleX, climberY, {
        name: member.name,
        bodyType: member.bodyType,
        skinTone: member.skinTone,
        teamColor: team.color,
        state: charState,
        animFrame: this.animFrame,
        facing: (i % 2 === 0) ? 1 : -1, // Selang-seling hadap kiri kanan memeluk tiang
        situationalMood: teamMood
      });
    }

    // F. Render Sisa Anggota yang Mengantre di Belakang Pohon
    const queueStartX = poleX - 50;
    let queueIdx = 0;
    for (let i = team.currentClimbers; i < team.members.length; i++) {
      const member = team.members[i];
      if (!member) continue;

      const queueX = queueStartX - (queueIdx * 44);
      const isCurrentTurn = (i === team.currentTurnIndex);
      const staggeredNameOffsetY = (queueIdx % 2 === 0) ? 0 : -14;

      PixelSprites.drawCharacter(ctx, queueX, groundY, {
        name: member.name,
        bodyType: member.bodyType,
        skinTone: member.skinTone,
        teamColor: team.color,
        state: 'IDLE',
        animFrame: this.animFrame + (queueIdx * 5),
        facing: 1,
        situationalMood: teamMood,
        nameOffsetY: staggeredNameOffsetY,
        isCurrentTurn: isCurrentTurn
      });
      queueIdx++;
    }
  }

  renderPinangWheel(x, y) {
    const { ctx } = this;

    // Roda Penyangga Bambu Melingkar
    ctx.strokeStyle = '#d35400';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(x, y, 50, 16, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Rangka Silang Roda
    ctx.beginPath();
    ctx.moveTo(x - 50, y);
    ctx.lineTo(x + 50, y);
    ctx.stroke();

    // Hadiah Menggantung (Bingkisan, Sepeda, Tas, Baju, Piala) - Memakai emoji Unicode universal
    const gifts = ['🎁', '🚲', '🎒', '👕', '🏆'];
    ctx.font = '22px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif';
    ctx.textAlign = 'center';
    gifts.forEach((g, idx) => {
      const angle = (idx / gifts.length) * Math.PI * 2;
      const gx = x + Math.cos(angle) * 45;
      const gy = y + Math.sin(angle) * 14 + 18;

      // Tali gantungan
      ctx.strokeStyle = '#7f8c8d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, y);
      ctx.lineTo(gx, gy - 8);
      ctx.stroke();

      ctx.fillText(g, gx, gy);
    });

    // Tiang Bendera Puncak Merah Putih
    ctx.fillStyle = '#bdc3c7';
    ctx.fillRect(x - 2, y - 50, 4, 50);

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x + 2, y - 50, 24, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 2, y - 40, 24, 10);
  }

  drawDustPoof(x, y) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(218, 186, 151, 0.7)';
    ctx.beginPath();
    ctx.arc(x - 25, y - 10, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 10, 20, 0, Math.PI * 2);
    ctx.arc(x, y - 18, 25, 0, Math.PI * 2);
    ctx.fill();
  }

  renderVictoryOverlay(w, h) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 46px "Kalbe Rounded", "Kalbe Geometric", "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 10;
    ctx.fillText("🏆 JUARA PANJAT PINANG! 🏆", w / 2, h / 2 - 40);

    ctx.fillStyle = this.state.winner.color;
    ctx.font = 'bold 38px "Kalbe Rounded", "Inter", sans-serif';
    ctx.fillText(`${this.state.winner.name.toUpperCase()} MENANG!`, w / 2, h / 2 + 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = '18px "Kalbe System", "Inter", sans-serif';
    ctx.fillText("Selamat kepada seluruh anggota tim atas kerja sama yang luar biasa!", w / 2, h / 2 + 70);
    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.ArenaCanvas = ArenaCanvas;
}
