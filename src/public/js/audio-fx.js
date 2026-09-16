/**
 * Web Audio API Prosedural SFX untuk Educamp Panjat Pinang
 * Tanpa file mp3 eksternal, instan, zero-latency!
 */

class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Suara Jawaban Benar (Chime Ding Ding!)
  playCorrect() {
    this.init();
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
    osc1.frequency.setValueAtTime(1046.50, now + 0.3); // C6

    osc2.frequency.setValueAtTime(1046.50, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.3);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  // Suara Jatuh / Wipeout (Slide Whistle Down + Thud!)
  playWipeout() {
    this.init();
    const now = this.ctx.currentTime;

    // 1. Whistle slide down
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.6);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);

    // 2. Thud debu di tanah
    setTimeout(() => {
      if (!this.ctx) return;
      const tNow = this.ctx.currentTime;
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();

      thud.type = 'sine';
      thud.frequency.setValueAtTime(120, tNow);
      thud.frequency.exponentialRampToValueAtTime(30, tNow + 0.3);

      thudGain.gain.setValueAtTime(0.4, tNow);
      thudGain.gain.exponentialRampToValueAtTime(0.001, tNow + 0.3);

      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);

      thud.start(tNow);
      thud.stop(tNow + 0.3);
    }, 550);
  }

  // Suara Menang / Fanfare Juara
  playVictory() {
    this.init();
    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 523.25, d: 0.15 }, // C5
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.4 },  // E5
      { f: 587.33, d: 0.2 },  // D5
      { f: 523.25, d: 0.2 },  // C5
      { f: 659.25, d: 0.2 },  // E5
      { f: 783.99, d: 0.8 }   // G5
    ];

    let t = this.ctx.currentTime;
    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);

      t += note.d + 0.05;
    });
    this.bgmPlaying = false;
    this.bgmTimeout = null;
    this.bgmMasterGain = null;
    this.activeNodes = [];
  }

  // Melodi 8-bit Chiptune: Hari Merdeka (Tujuh belas agustus tahun empat lima...)
  start8BitAgustusanBGM() {
    this.init();
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;

    // Master Gain khusus BGM agar bisa di-mute / stop seketika
    this.bgmMasterGain = this.ctx.createGain();
    this.bgmMasterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.bgmMasterGain.connect(this.ctx.destination);

    // Frekuensi Nada (Hz)
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
      REST: 0
    };

    // Partitur Melodi Hari Merdeka 8-bit tempo cepat & bersemangat
    const melody = [
      // Tu-juh be-las a-gus-tus ta-hun em-pat li-ma
      { f: N.G4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.E4, d: 0.2 }, { f: N.F4, d: 0.2 },
      { f: N.G4, d: 0.3 }, { f: N.C5, d: 0.3 }, { f: N.G4, d: 0.4 }, { f: N.REST, d: 0.1 },
      // I-tu-lah ha-ri ke-mer-de-ka-an ki-ta
      { f: N.E4, d: 0.2 }, { f: N.F4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.E4, d: 0.2 },
      { f: N.F4, d: 0.3 }, { f: N.D4, d: 0.3 }, { f: N.C4, d: 0.4 }, { f: N.REST, d: 0.1 },
      // Ha-ri mer-de-ka nu-sa dan bang-sa
      { f: N.G4, d: 0.25 }, { f: N.G4, d: 0.25 }, { f: N.A4, d: 0.25 }, { f: N.B4, d: 0.25 },
      { f: N.C5, d: 0.4 }, { f: N.G4, d: 0.4 }, { f: N.REST, d: 0.1 },
      // Ha-ri la-hir-nya bang-sa In-do-ne-sia
      { f: N.A4, d: 0.25 }, { f: N.G4, d: 0.25 }, { f: N.F4, d: 0.25 }, { f: N.E4, d: 0.25 },
      { f: N.D4, d: 0.6 }, { f: N.REST, d: 0.15 },
      // Mer-de-ka!
      { f: N.G4, d: 0.3 }, { f: N.C5, d: 0.6 }, { f: N.REST, d: 0.1 },
      // S'ka-li mer-de-ka te-tap mer-de-ka
      { f: N.G4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.E4, d: 0.2 }, { f: N.F4, d: 0.2 },
      { f: N.G4, d: 0.3 }, { f: N.C5, d: 0.4 }, { f: N.G4, d: 0.4 },
      // Se-la-ma ha-yat ma-sih di-kan-dung ba-dan
      { f: N.E4, d: 0.2 }, { f: N.F4, d: 0.2 }, { f: N.G4, d: 0.2 }, { f: N.E4, d: 0.2 },
      { f: N.F4, d: 0.3 }, { f: N.D4, d: 0.3 }, { f: N.C4, d: 0.5 }, { f: N.REST, d: 0.2 }
    ];

    const playLoop = () => {
      if (!this.bgmPlaying || !this.bgmMasterGain) return;
      let curTime = this.ctx.currentTime;
      let totalDuration = 0;

      melody.forEach(note => {
        if (note.f > 0 && this.bgmPlaying) {
          // Lead Synth (Square Wave khas NES)
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'square';
          osc.frequency.setValueAtTime(note.f, curTime);

          // Bass arpeggio pengiring (Triangle Wave)
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(note.f / 2, curTime);

          gain.gain.setValueAtTime(0.35, curTime);
          gain.gain.exponentialRampToValueAtTime(0.001, curTime + note.d);

          bassGain.gain.setValueAtTime(0.25, curTime);
          bassGain.gain.exponentialRampToValueAtTime(0.001, curTime + note.d);

          osc.connect(gain);
          gain.connect(this.bgmMasterGain);

          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmMasterGain);

          try {
            osc.start(curTime);
            osc.stop(curTime + note.d);
            bassOsc.start(curTime);
            bassOsc.stop(curTime + note.d);
            this.activeNodes.push(osc, bassOsc);
          } catch(e) {}
        }

        curTime += note.d + 0.04;
        totalDuration += (note.d + 0.04);
      });

      // Loop terus selama pertandingan berlangsung
      this.bgmTimeout = setTimeout(() => {
        if (this.bgmPlaying) playLoop();
      }, totalDuration * 1000);
    };

    playLoop();
  }

  stop8BitAgustusanBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
    // Langsung mute master gain agar nada yang sedang berjalan langsung hening
    if (this.bgmMasterGain) {
      try {
        this.bgmMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.bgmMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.bgmMasterGain.disconnect();
      } catch(e) {}
      this.bgmMasterGain = null;
    }
    if (this.activeNodes) {
      this.activeNodes.forEach(node => {
        try { node.stop(); } catch(e) {}
      });
      this.activeNodes = [];
    }
  }

  toggle8BitBGM() {
    if (this.bgmPlaying) {
      this.stop8BitAgustusanBGM();
      return false;
    } else {
      this.start8BitAgustusanBGM();
      return true;
    }
  }
}

if (typeof window !== 'undefined') {
  window.soundFX = new SoundFX();
}
