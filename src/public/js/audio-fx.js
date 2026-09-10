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
  }
}

if (typeof window !== 'undefined') {
  window.soundFX = new SoundFX();
}
