// Web Audio API Synthesizer for Festive Raksha Bandhan Sounds & Melodic Tones

class FestiveAudioService {
  constructor() {
    this.ctx = null;
    this.bgOscillators = [];
    this.bgGain = null;
    this.isPlayingBg = false;

    // Background Music: Only Tula Japnar Aahe (Khari Biscuit)
    this.tracks = [
      {
        id: 'tula_japnar_aahe',
        title: 'Tula Japnar Aahe (तुला जपणार आहे)',
        sub: 'Khari Biscuit • Marathi Melody',
        quote: 'मी सारी जिंदगी माझी तुला जपणार आहे ❤️',
        src: '/audio/tula_japnar_aahe.mp3'
      }
    ];
    this.currentTrackIndex = 0;
    this.volume = 0.5;
    this.isMuted = false;
    this.bgAudio = null;
    this.subscribers = new Set();
  }

  init() {
    this.initAudioElement();
  }

  initAudioElement() {
    if (!this.bgAudio && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio(this.tracks[this.currentTrackIndex].src);
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = this.isMuted ? 0 : this.volume;

        audio.addEventListener('play', () => {
          this.isPlayingBg = true;
          this.notify();
        });

        audio.addEventListener('pause', () => {
          this.isPlayingBg = false;
          this.notify();
        });

        audio.addEventListener('ended', () => {
          this.isPlayingBg = false;
          this.notify();
        });

        audio.addEventListener('error', (err) => {
          console.warn('Background audio error:', err);
          this.isPlayingBg = false;
          this.notify();
        });

        this.bgAudio = audio;
      } catch (err) {
        console.warn('Audio initialization warning:', err);
      }
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notify() {
    const state = this.getState();
    this.subscribers.forEach((cb) => {
      try {
        cb(state);
      } catch (e) {
        console.error(e);
      }
    });
  }

  getState() {
    return {
      isPlaying: this.isPlayingBg,
      currentTrack: this.tracks[this.currentTrackIndex],
      currentTrackIndex: this.currentTrackIndex,
      tracks: this.tracks,
      volume: this.volume,
      isMuted: this.isMuted
    };
  }

  // Secondary sound effect tones removed per user request: only "Tula Japnar Aahe" plays
  playTempleBell() {}
  playSparkleChime() {}
  playHugSound() {}
  playCelebration() {}

  // Background Music: "Tula Japnar Aahe"
  startBackgroundMusic() {
    this.initAudioElement();
    if (!this.bgAudio) return;

    this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    const playPromise = this.bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlayingBg = true;
          this.notify();
        })
        .catch((err) => {
          console.warn('Playback deferred until user interaction:', err);
          this.isPlayingBg = false;
          this.notify();
        });
    }
  }

  stopBackgroundMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.isPlayingBg = false;
    this.notify();
  }

  toggleBackgroundMusic(onStateChange) {
    if (this.isPlayingBg) {
      this.stopBackgroundMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBackgroundMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  setTrack(index) {
    if (index < 0 || index >= this.tracks.length) return;
    const wasPlaying = this.isPlayingBg;
    this.currentTrackIndex = index;

    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = this.tracks[this.currentTrackIndex].src;
      this.bgAudio.currentTime = 0;
      if (wasPlaying) {
        this.startBackgroundMusic();
      } else {
        this.notify();
      }
    } else {
      this.notify();
    }
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % this.tracks.length;
    this.setTrack(nextIdx);
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.volume > 0) {
      this.isMuted = false;
    }
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }
}

export const audio = new FestiveAudioService();
