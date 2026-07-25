// Sound Effects Synthesizer and Web Speech API Pronunciation Utility

let audioCtx: AudioContext | null = null;
let soundMuted = false;
let speechMuted = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const setSoundMuted = (muted: boolean) => {
  soundMuted = muted;
};

export const setSpeechMuted = (muted: boolean) => {
  speechMuted = muted;
};

export const isSoundMuted = () => soundMuted;
export const isSpeechMuted = () => speechMuted;

// Subtle mechanical keypress click sound
export const playKeyClick = () => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Ignore audio context errors on un-interacted DOMs
  }
};

// Bright "Ding!" for correct answer
export const playCorrectChime = () => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();

    // Two-tone chord (E5 -> B5)
    const now = ctx.currentTime;
    
    // First note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Second note slightly delayed
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.08); // B5
    gain2.gain.setValueAtTime(0.25, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.5);
  } catch (e) {}
};

// Error buzzer sound
export const playErrorBuzzer = () => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {}
};

// Combo streak ascending chime
export const playComboChime = (comboCount: number) => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Pitch scales with combo count up to 12
    const baseFreq = 440 + Math.min(comboCount * 40, 600);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
};

// Fanfare / Victory Arpeggio
export const playVictoryFanfare = () => {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.1;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (e) {}
};

// Web Speech API + High-Quality Proxy TTS Audio for Accurate Vietnamese Pronunciation
let activeAudioElement: HTMLAudioElement | null = null;

export const speakVietnamese = (text: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (speechMuted) {
      resolve(false);
      return;
    }

    const cleanText = text.trim();
    if (!cleanText) {
      resolve(false);
      return;
    }

    try {
      // 1. Stop active audio playback
      if (activeAudioElement) {
        activeAudioElement.pause();
        activeAudioElement.currentTime = 0;
        activeAudioElement = null;
      }

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      // 2. Primary method: High-Definition Standard Vietnamese Audio Proxy
      const proxyUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
      const audio = new Audio(proxyUrl);
      activeAudioElement = audio;

      let hasResolved = false;

      audio.onended = () => {
        activeAudioElement = null;
        if (!hasResolved) {
          hasResolved = true;
          resolve(true);
        }
      };

      audio.onerror = () => {
        activeAudioElement = null;
        if (!hasResolved) {
          // If proxy fails, try fallback endpoints or WebSpeech if native VI voice exists
          tryFallbackTTS(cleanText).then(res => {
            if (!hasResolved) {
              hasResolved = true;
              resolve(res);
            }
          });
        }
      };

      audio.play().catch(() => {
        if (!hasResolved) {
          tryFallbackTTS(cleanText).then(res => {
            if (!hasResolved) {
              hasResolved = true;
              resolve(res);
            }
          });
        }
      });

      // Safety timeout
      setTimeout(() => {
        if (!hasResolved) {
          hasResolved = true;
          resolve(true);
        }
      }, 5000);

    } catch (e) {
      tryFallbackTTS(cleanText).then(resolve);
    }
  });
};

const tryFallbackTTS = (cleanText: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if WebSpeech API has an EXPLICIT Vietnamese voice
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.toLowerCase().startsWith('vi') || v.name.toLowerCase().includes('viet'));

      if (viVoice) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.voice = viVoice;
        utterance.lang = 'vi-VN';
        utterance.rate = 0.85;

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        window.speechSynthesis.speak(utterance);
        return;
      }
    }

    // Direct client fallback endpoint
    try {
      const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=gtx&q=${encodeURIComponent(cleanText)}`;
      const directAudio = new Audio(directUrl);
      activeAudioElement = directAudio;

      directAudio.onended = () => {
        activeAudioElement = null;
        resolve(true);
      };
      directAudio.onerror = () => {
        activeAudioElement = null;
        resolve(false);
      };

      directAudio.play().catch(() => resolve(false));
    } catch (e) {
      resolve(false);
    }
  });
};
