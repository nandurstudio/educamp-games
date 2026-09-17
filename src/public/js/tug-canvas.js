/**
 * Tug of War (Tarik Tambang) Canvas 2D Pixel Art Renderer
 * Mengatur render horizontal: Tim Kiri, Tim Kanan, Tali Rami Tebal, Pita Merah Tengah, Garis Batas & Efek Debu
 */

class TugCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = null;
    this.animFrame = 0;
    this.dustParticles = [];

    // Nilai render interpolasi halus untuk tali
    this.renderedRopeOffset = 0;
    // Reaksi situasional sementara pasca jawaban ({ left: { mood, until }, right: { mood, until } })
    this.recentReactions = { left: null, right: null };

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

  triggerPullEffect(side, isSlip = false) {
    const now = Date.now();
    // Efek reaksi kawan satu tim selama 3 detik (3000ms):
    // Jika benar (bukan slip): kawan menyemangati (CHEERING_FRIEND)
    // Jika salah (slip): kawan marah / gemas pada anggota yang salah (ANGRY_AT_MISTAKE)
    this.recentReactions[side] = {
      mood: isSlip ? 'ANGRY_AT_MISTAKE' : 'CHEERING_FRIEND',
      until: now + 3500
    };

    // Tambah partikel debu di bawah kaki tim
    const w = this.canvas.width;
    const h = this.canvas.height;
    const groundY = h * 0.72;
    const baseX = (side === 'left') ? w * 0.25 : w * 0.75;

    for (let i = 0; i < 15; i++) {
      this.dustParticles.push({
        x: baseX + (Math.random() * 200 - 100),
        y: groundY + (Math.random() * 10 - 5),
        vx: (side === 'left' ? -1 : 1) * (Math.random() * 4 + 1),
        vy: -(Math.random() * 3 + 1),
        radius: Math.random() * 5 + 3,
        alpha: 1,
        color: isSlip ? 'rgba(231, 76, 60, 0.8)' : 'rgba(218, 186, 151, 0.8)'
      });
    }
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

    // 0. Bersihkan Total Frame Sebelumnya (Cegah Artefak / Ghosting)
    ctx.clearRect(0, 0, w, h);

    // A. Latar Belakang Lapangan Rumput & Langit Cerah
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.65);

    // Bukit-bukit Pixel Art di Latar Belakang
    ctx.fillStyle = '#86efac';
    ctx.beginPath();
    ctx.arc(w * 0.2, h * 0.65, w * 0.35, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.65, w * 0.4, Math.PI, 0);
    ctx.fill();

    // Lapangan Tanah & Rumput
    const groundY = h * 0.72;
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(0, groundY, w, h - groundY);

    // Lapangan Lumpur Tengah (Arena Tarik Tambang)
    ctx.fillStyle = '#b45309';
    ctx.fillRect(w * 0.1, groundY + 4, w * 0.8, 55);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(w * 0.1, groundY + 10, w * 0.8, 45);

    // B. Garis Pembatas Putih & Bendera Patok Batas
    const centerX = w / 2;
    const boundaryDist = w * 0.22; // Jarak garis batas kekalahan dari tengah

    // Garis Tengah Netral
    ctx.strokeStyle = '#ffffff';
    ctx.setLineDash([8, 6]);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, groundY - 90);
    ctx.lineTo(centerX, groundY + 55);
    ctx.stroke();
    ctx.setLineDash([]);

    // Garis Batas Kiri (Jika pita merah lewati garis ini -> Tim Kiri Menang)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX - boundaryDist, groundY - 210);
    ctx.lineTo(centerX - boundaryDist, groundY + 55);
    ctx.stroke();

    // Garis Batas Kanan (Jika pita merah lewati garis ini -> Tim Kanan Menang)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX + boundaryDist, groundY - 210);
    ctx.lineTo(centerX + boundaryDist, groundY + 55);
    ctx.stroke();

    // Label Batas Kemenangan (Dibuat Sangat Tinggi di atas kepala agar bebas halangan)
    ctx.font = 'bold 12px "Kalbe Rounded", "Inter", sans-serif';
    ctx.textAlign = 'center';

    // Badge Pill Kiri
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.beginPath();
    ctx.roundRect(centerX - boundaryDist - 80, groundY - 225, 160, 24, 6);
    ctx.fill();
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('◄ GARIS MENANG KIRI', centerX - boundaryDist, groundY - 209);

    // Badge Pill Kanan
    ctx.fillStyle = 'rgba(59, 130, 246, 0.85)';
    ctx.beginPath();
    ctx.roundRect(centerX + boundaryDist - 85, groundY - 225, 170, 24, 6);
    ctx.fill();
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText('GARIS MENANG KANAN ►', centerX + boundaryDist, groundY - 209);

    // Label Tengah
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(centerX - 40, groundY - 120, 80, 20, 4);
    ctx.fill();
    ctx.fillStyle = '#f1c40f';
    ctx.fillText('TENGAH', centerX, groundY - 106);

    if (!this.state) return;

    // C. Interpolasi Posisi Tali (Smooth Lerp)
    const targetOffset = this.state.ropeOffset || 0;
    this.renderedRopeOffset += (targetOffset - this.renderedRopeOffset) * 0.1;

    // Konversi offset -100 s.d +100 ke koordinat pixel layar
    const currentRopeX = centerX + (this.renderedRopeOffset / 100) * boundaryDist;
    // Ketinggian tali sejajar dengan tangan/genggaman setinggi dada pemain (groundY - 48px)
    const ropeY = groundY - 48;

    // Evaluasi Situational Mood Cerdas Berdasarkan Posisi Tali (-100 s.d +100) & Reaksi Terkini
    const now = Date.now();
    let leftMood = null;
    let rightMood = null;

    if (this.state.status === 'FINISHED') {
      // Saat pertandingan selesai: pemenang bersuka cita penuh, yang kalah sedih/menyesal/marah
      const isLeftWinner = this.state.winner?.id === 'left';
      const isRightWinner = this.state.winner?.id === 'right';
      leftMood = isLeftWinner ? 'VICTORY' : 'DEFEATED';
      rightMood = isRightWinner ? 'VICTORY' : 'DEFEATED';
    } else if (this.recentReactions.left && now < this.recentReactions.left.until) {
      leftMood = this.recentReactions.left.mood;
    } else if (this.state.status === 'PLAYING') {
      if (this.renderedRopeOffset <= -40) {
        leftMood = 'CELEBRATING_LEAD'; // Hampir menang, percaya diri & gembira
      } else if (this.renderedRopeOffset >= 40) {
        leftMood = 'DESPERATE_LOSING'; // Terdesak hampir kalah, ngotot & tegang
      }
    }

    if (this.state.status !== 'FINISHED') {
      if (this.recentReactions.right && now < this.recentReactions.right.until) {
        rightMood = this.recentReactions.right.mood;
      } else if (this.state.status === 'PLAYING') {
        if (this.renderedRopeOffset >= 40) {
          rightMood = 'CELEBRATING_LEAD'; // Hampir menang, percaya diri & gembira
        } else if (this.renderedRopeOffset <= -40) {
          rightMood = 'DESPERATE_LOSING'; // Terdesak hampir kalah, ngotot & tegang
        }
      }
    }

    // E. Render Karakter Tim Kiri (Menghadap Kanan, facing = 1)
    const teamLeft = this.state.teamLeft;
    let leftmostCharX = currentRopeX - 70;
    if (teamLeft && Array.isArray(teamLeft.members)) {
      const leftStartX = currentRopeX - 65;
      const spacing = 58; // Jarak antar karakter lebih lega
      leftmostCharX = leftStartX - ((teamLeft.members.length - 1) * spacing);
      teamLeft.members.forEach((m, idx) => {
        const charX = leftStartX - (idx * spacing);
        const isCurrentTurn = idx === teamLeft.currentTurnIndex;
        let charState = 'PULL';
        if (this.state.status === 'FINISHED') {
          charState = (this.state.winner?.id === 'left') ? 'VICTORY' : 'FALL';
        }

        // Jika giliran kawan yang salah menjawab, kawan-kawan di sampingnya marah padanya
        const memberMood = (leftMood === 'ANGRY_AT_MISTAKE' && isCurrentTurn) ? 'SLIP' : leftMood;
        // Staggered Y offset nama agar nama antar kawan bersebelahan tidak bertumpuk
        const staggeredNameOffsetY = (idx % 2 === 0) ? 0 : -14;

        PixelSprites.drawCharacter(ctx, charX, groundY, {
          name: m.name,
          bodyType: m.bodyType,
          skinTone: m.skinTone,
          teamColor: teamLeft.color,
          state: charState,
          animFrame: this.animFrame + (idx * 4),
          facing: 1,
          situationalMood: memberMood,
          nameOffsetY: staggeredNameOffsetY,
          isCurrentTurn: isCurrentTurn
        });
      });
    }

    // F. Render Karakter Tim Kanan (Menghadap Kiri, facing = -1)
    const teamRight = this.state.teamRight;
    let rightmostCharX = currentRopeX + 70;
    if (teamRight && Array.isArray(teamRight.members)) {
      const rightStartX = currentRopeX + 65;
      const spacing = 58;
      rightmostCharX = rightStartX + ((teamRight.members.length - 1) * spacing);
      teamRight.members.forEach((m, idx) => {
        const charX = rightStartX + (idx * spacing);
        const isCurrentTurn = idx === teamRight.currentTurnIndex;
        let charState = 'PULL';
        if (this.state.status === 'FINISHED') {
          charState = (this.state.winner?.id === 'right') ? 'VICTORY' : 'FALL';
        }

        const memberMood = (rightMood === 'ANGRY_AT_MISTAKE' && isCurrentTurn) ? 'SLIP' : rightMood;
        const staggeredNameOffsetY = (idx % 2 === 0) ? 0 : -14;

        PixelSprites.drawCharacter(ctx, charX, groundY, {
          name: m.name,
          bodyType: m.bodyType,
          skinTone: m.skinTone,
          teamColor: teamRight.color,
          state: charState,
          animFrame: this.animFrame + (idx * 4),
          facing: -1,
          situationalMood: memberMood,
          nameOffsetY: staggeredNameOffsetY,
          isCurrentTurn: isCurrentTurn
        });
      });
    }

    // D. Render Tali Rami Tambang Proporsional (Ramping, Pas Sepanjang Barisan Tim)
    // Panjang tali disesuaikan dari ujung pemain belakang kiri sampai kanan + sisa ujung 50px
    const ropeLeftAnchor = Math.max(15, leftmostCharX - 50);
    const ropeRightAnchor = Math.min(w - 15, rightmostCharX + 50);

    // Bayangan Tali Ramping
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(ropeLeftAnchor, ropeY + 3);
    ctx.lineTo(ropeRightAnchor, ropeY + 3);
    ctx.stroke();

    // Tali Utama (Kuningan Tambang Rami Alami Ramping 8px)
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(ropeLeftAnchor, ropeY);
    ctx.lineTo(ropeRightAnchor, ropeY);
    ctx.stroke();

    // Tekstur Lilitan Serat Tambang
    ctx.strokeStyle = '#92400e';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ropeLeftAnchor, ropeY);
    ctx.lineTo(ropeRightAnchor, ropeY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlight Cahaya di Atas Tali
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ropeLeftAnchor, ropeY - 3);
    ctx.lineTo(ropeRightAnchor, ropeY - 3);
    ctx.stroke();

    // Ujung rumbai tali kiri & kanan
    ctx.fillStyle = '#b45309';
    ctx.fillRect(ropeLeftAnchor - 4, ropeY - 5, 6, 10);
    ctx.fillRect(ropeRightAnchor - 2, ropeY - 5, 6, 10);

    // Pita Merah di Tengah Tali (Penanda Tarikan)
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(currentRopeX - 7, ropeY - 16, 14, 32);
    // Simpul pita tengah
    ctx.beginPath();
    ctx.arc(currentRopeX, ropeY, 8, 0, Math.PI * 2);
    ctx.fill();
    // Ekor pita menjuntai ke bawah
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(currentRopeX - 3, ropeY + 12);
    ctx.lineTo(currentRopeX - 9, ropeY + 28);
    ctx.moveTo(currentRopeX + 3, ropeY + 12);
    ctx.lineTo(currentRopeX + 9, ropeY + 28);
    ctx.stroke();

    // G. Partikel Debu
    for (let i = this.dustParticles.length - 1; i >= 0; i--) {
      const p = this.dustParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      ctx.fillStyle = p.color.replace('0.8', p.alpha.toString());
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha <= 0) {
        this.dustParticles.splice(i, 1);
      }
    }

    // H. Overlay Kemenangan Jika Selesai
    if (this.state.status === 'FINISHED' && this.state.winner) {
      this.renderVictoryOverlay(w, h);
    }
  }

  renderVictoryOverlay(w, h) {
    const { ctx } = this;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1c40f';
    ctx.font = 'bold 46px "Kalbe Rounded", "Kalbe Geometric", "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 10;
    ctx.fillText("🏆 JUARA TARIK TAMBANG! 🏆", w / 2, h / 2 - 40);

    ctx.fillStyle = this.state.winner.color;
    ctx.font = 'bold 40px "Kalbe Rounded", "Inter", sans-serif';
    ctx.fillText(`${this.state.winner.name.toUpperCase()} MENANG MUTLAK!`, w / 2, h / 2 + 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = '18px "Kalbe System", "Inter", sans-serif';
    const reasonText = (this.state.winnerReason === 'KNOCKOUT')
      ? 'Berhasil menarik tali melewati garis batas lawan!'
      : 'Unggul tarikan tali saat waktu pertandingan habis!';
    ctx.fillText(reasonText, w / 2, h / 2 + 70);
    ctx.restore();
  }
}

if (typeof window !== 'undefined') {
  window.TugCanvas = TugCanvas;
}
