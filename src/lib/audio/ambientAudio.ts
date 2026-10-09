// Native Web Audio API ambient noise generator (Rain & Brown Noise) - 0kb assets needed
let audioCtx: AudioContext | null = null;
let noiseNode: AudioBufferSourceNode | null = null;
let gainNode: GainNode | null = null;
let filterNode: BiquadFilterNode | null = null;

export function isAudioContextSupported(): boolean {
  return typeof window !== "undefined" && ("AudioContext" in window || "webkitAudioContext" in window);
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function createRainBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
  const bufferSize = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  let lastOutL = 0.0;
  let lastOutR = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const whiteL = Math.random() * 2 - 1;
    const whiteR = Math.random() * 2 - 1;

    // Pink / Brown noise filter integration
    lastOutL = (lastOutL + 0.02 * whiteL) / 1.02;
    lastOutR = (lastOutR + 0.02 * whiteR) / 1.02;

    left[i] = lastOutL * 2.5;
    right[i] = lastOutR * 2.5;
  }
  return buffer;
}

export function playAmbientSound(type: "rain" | "hum" = "rain", volume = 0.15): boolean {
  if (!isAudioContextSupported()) return false;

  stopAmbientSound();

  try {
    const ctx = getAudioContext();
    const buffer = createRainBuffer(ctx, 6);

    noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    filterNode = ctx.createBiquadFilter();
    filterNode.type = "lowpass";
    filterNode.frequency.value = type === "rain" ? 850 : 350;

    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.01, Math.min(volume, 0.4)), ctx.currentTime + 1.2);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();
    return true;
  } catch (err) {
    console.warn("Could not start ambient sound:", err);
    return false;
  }
}

export function setAmbientVolume(volume: number) {
  if (gainNode && audioCtx) {
    gainNode.gain.setValueAtTime(Math.max(0.01, Math.min(volume, 0.4)), audioCtx.currentTime);
  }
}

export function stopAmbientSound() {
  if (gainNode && audioCtx) {
    try {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        try {
          noiseNode?.stop();
          noiseNode?.disconnect();
          noiseNode = null;
        } catch {}
      }, 500);
    } catch {
      noiseNode?.stop();
      noiseNode = null;
    }
  } else {
    noiseNode?.stop();
    noiseNode = null;
  }
}
