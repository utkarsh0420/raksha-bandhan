import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

export default function FloatingMusicPlayer() {
  const initial = audio.getState();
  const [isPlaying, setIsPlaying] = useState(initial.isPlaying);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initial.currentTrackIndex);
  const [tracks, setTracks] = useState(initial.tracks);
  const [volume, setVolume] = useState(initial.volume);
  const [isMuted, setIsMuted] = useState(initial.isMuted);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = audio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrackIndex(state.currentTrackIndex);
      setTracks(state.tracks);
      setVolume(state.volume);
      setIsMuted(state.isMuted);
    });
    return unsubscribe;
  }, []);

  const togglePlay = () => {
    audio.toggleBackgroundMusic();
  };

  const handleTrackChange = (index) => {
    audio.setTrack(index);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    audio.setVolume(newVol);
  };

  const toggleMute = () => {
    audio.toggleMute();
  };

  const currentTrack = tracks[currentTrackIndex] || {
    title: 'Tula Japnar Aahe (तुला जपणार आहे)',
    sub: 'Bansuri / Flute Instrumental • Khari Biscuit',
    tag: 'Bansuri / Flute',
    quote: 'मी सारी जिंदगी माझी तुला जपणार आहे ❤️'
  };

  return (
    <aside aria-label="Festive Marathi Music Player" className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none pb-safe">
      {/* Expanded Player View */}
      {isExpanded ? (
        <div className="bg-[#FFFDF8]/95 backdrop-blur-xl border-2 border-amber-300 rounded-2xl shadow-2xl p-3.5 sm:p-4 w-80 max-w-[calc(100vw-1.5rem)] max-h-[85vh] overflow-y-auto no-scrollbar animate-fade-in text-stone-900 ring-2 sm:ring-4 ring-amber-400/20">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-2 mb-2.5 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base">🪢</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] sm:text-xs font-bold text-rose-700 uppercase tracking-wider">मराठी संगीत</span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full font-semibold">Festive</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Background Melody</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-amber-100/60 transition-colors"
              title="Minimize player"
              aria-label="Minimize player"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Album Art & Title */}
          <div className="flex items-center gap-3 mb-2.5 sm:mb-3 bg-gradient-to-r from-amber-50 to-rose-50/70 p-2 sm:p-2.5 rounded-xl border border-amber-200/60">
            {/* Spinning Disc / Icon */}
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-700 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <Disc className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-stone-800 truncate font-serif">
                {currentTrack.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-stone-600 truncate mt-0.5">{currentTrack.sub}</p>
              {currentTrack.quote && (
                <p className="text-[9px] sm:text-[10px] font-medium text-rose-600 italic mt-0.5 truncate">
                  "{currentTrack.quote}"
                </p>
              )}

              {/* Soundwaves if playing */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-3 mt-1">
                  <span className="w-1 h-2 bg-rose-500 rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
                  <span className="w-1 h-3 bg-amber-500 rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
                  <span className="w-1 h-1.5 bg-rose-500 rounded-full animate-pulse" style={{ animationDuration: '0.7s' }} />
                  <span className="w-1 h-2.5 bg-amber-500 rounded-full animate-pulse" style={{ animationDuration: '0.5s' }} />
                </div>
              )}
            </div>
          </div>

          {/* Track Switcher (if multiple tracks) */}
          {tracks.length > 1 && (
            <div className="mb-2.5 sm:mb-3">
              <div className="text-[10px] sm:text-[11px] font-semibold text-stone-500 mb-1 flex items-center justify-between">
                <span>Select Audio Version:</span>
                <span className="text-[9px] sm:text-[10px] text-rose-700 font-bold">Khari Biscuit (खारी बिस्कीट)</span>
              </div>
              <div className="flex flex-col gap-1 bg-amber-100/40 p-1 rounded-xl border border-amber-200/60">
                {tracks.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackChange(idx)}
                    className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all text-left flex items-center justify-between ${
                      currentTrackIndex === idx
                        ? 'bg-white text-rose-700 shadow-xs font-bold border border-amber-300/80 ring-1 ring-amber-300'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5 text-xs">
                      <span>🪈</span>
                      <span>{track.title}</span>
                    </span>
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-stone-100 text-stone-500 shrink-0 ml-1">
                      {track.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Controls */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 pt-1">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`flex-1 min-h-[42px] py-2 px-3 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
                isPlaying
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-rose-500/25 hover:brightness-105'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-amber-500/25 hover:brightness-105'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause Melody</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play Tula Japnar Aahe</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1 bg-stone-100/80 px-2 py-1.5 rounded-full border border-stone-200 shrink-0">
              <button
                onClick={toggleMute}
                className="text-stone-600 hover:text-rose-600 transition-colors p-0.5"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-stone-600" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="w-12 sm:w-14 accent-rose-500 cursor-pointer h-1.5 bg-stone-300 rounded-lg"
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Pill */
        <div className="flex items-center gap-1 bg-[#FFFDF8]/95 backdrop-blur-md border-2 border-amber-300/80 hover:border-amber-400 rounded-full shadow-lg p-1 pr-2.5 sm:p-1.5 sm:pr-3 transition-all hover:shadow-xl ring-1 sm:ring-2 ring-amber-400/20 group">
          {/* Main Action (Play / Pause) */}
          <button
            onClick={togglePlay}
            className={`w-8 h-8 xs:w-9 xs:h-9 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-95 shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-tr from-rose-600 to-amber-500 animate-pulse'
                : 'bg-gradient-to-tr from-amber-500 to-rose-500 hover:brightness-105'
            }`}
            title={isPlaying ? 'Pause Tula Japnar Aahe' : 'Play Tula Japnar Aahe (तुला जपणार आहे)'}
            aria-label={isPlaying ? 'Pause Tula Japnar Aahe' : 'Play Tula Japnar Aahe (तुला जपणार आहे)'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white translate-x-0.5" />
            )}
          </button>

          {/* Track Info & expand click */}
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1.5 cursor-pointer pl-1"
            title="Click to open music controls"
          >
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-rose-600 uppercase tracking-wider">मराठी 🎵</span>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                )}
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-stone-800 truncate max-w-[95px] xxs:max-w-[110px] xs:max-w-[130px] sm:max-w-[150px]">
                {currentTrack.title.split('(')[0].trim()}
              </p>
            </div>

            <ChevronUp className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-transform group-hover:-translate-y-0.5 shrink-0" />
          </div>
        </div>
      )}
    </aside>
  );
}
