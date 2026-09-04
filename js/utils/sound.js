// TPC BUILD - Realistic Mechanical & Motherboard Audio Synthesizer
// Uses Web Audio API for zero-latency, realistic hardware acoustic feedback

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Authentic mechanical wall lightswitch toggle snap
  playPowerClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Transient 1: Sharp high-frequency mechanical rocker snap (3200 Hz bandpass burst)
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    const snapFilter = this.ctx.createBiquadFilter();

    snapOsc.type = 'square';
    snapOsc.frequency.setValueAtTime(3200, t);
    snapOsc.frequency.exponentialRampToValueAtTime(1800, t + 0.012);

    snapFilter.type = 'bandpass';
    snapFilter.frequency.setValueAtTime(3400, t);
    snapFilter.Q.value = 4.0;

    snapGain.gain.setValueAtTime(0.4, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snapOsc.start(t);
    snapOsc.stop(t + 0.015);

    // Transient 2: Low-mid plastic housing latch resonance (520 Hz decaying 'clack')
    const latchOsc = this.ctx.createOscillator();
    const latchGain = this.ctx.createGain();

    latchOsc.type = 'triangle';
    latchOsc.frequency.setValueAtTime(520, t + 0.004);
    latchOsc.frequency.exponentialRampToValueAtTime(160, t + 0.035);

    latchGain.gain.setValueAtTime(0.5, t + 0.004);
    latchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.038);

    latchOsc.connect(latchGain);
    latchGain.connect(this.ctx.destination);

    latchOsc.start(t + 0.004);
    latchOsc.stop(t + 0.04);
  }

  // Classic BIOS affirmative single POST beep: Hardware verified!
  playPostSuccessBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, t); // Note B5 (classic IBM / AMI beep)

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
    gain.gain.setValueAtTime(0.2, t + 0.12);
    gain.gain.linearRampToValueAtTime(0, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Motherboard error alarm: 3 short urgent diagnostic error beeps
  playPostErrorAlarm() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const beep = (offsetTime, freq = 600) => {
      const t = this.ctx.currentTime + offsetTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    };

    beep(0.0, 520);
    beep(0.18, 520);
    beep(0.36, 520);
  }

  // Realistic fan ramp-up woosh simulation
  playFanSpinUp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 1.2);
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.4);
    gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 1.5);
  }
}

export const sound = new SoundEngine();
