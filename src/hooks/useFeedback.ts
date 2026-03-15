// Sound effects & haptic feedback utilities

const audioCtx = () => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
};

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function vibrate(pattern: number | number[]) {
  try {
    navigator?.vibrate?.(pattern);
  } catch {
    // Vibration not available
  }
}

export function playSwipe() {
  playTone(600, 0.08, "sine", 0.1);
  vibrate(15);
}

export function playScore() {
  playTone(880, 0.1, "sine", 0.15);
  setTimeout(() => playTone(1100, 0.15, "sine", 0.12), 80);
  vibrate([20, 30, 20]);
}

export function playFail() {
  playTone(300, 0.15, "sawtooth", 0.08);
  vibrate(30);
}

export function playWinner() {
  playTone(523, 0.15, "sine", 0.15);
  setTimeout(() => playTone(659, 0.15, "sine", 0.15), 150);
  setTimeout(() => playTone(784, 0.2, "sine", 0.18), 300);
  setTimeout(() => playTone(1047, 0.3, "sine", 0.2), 450);
  vibrate([30, 50, 30, 50, 60]);
}

export function playSelect() {
  playTone(700, 0.06, "sine", 0.1);
  vibrate(10);
}
