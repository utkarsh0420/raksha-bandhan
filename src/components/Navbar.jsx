import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Sparkles, UserCheck, Music2 } from 'lucide-react';
import { audio } from '../utils/audio';

export default function Navbar({ sisterName, onOpenLogin, hugsCount }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ title: 'Tula Japnar Aahe' });

  useEffect(() => {
    const unsubscribe = audio.subscribe((state) => {
      setIsPlayingMusic(state.isPlaying);
      if (state.currentTrack) {
        setTrackInfo(state.currentTrack);
      }
    });
    return unsubscribe;
  }, []);

  const toggleMusic = () => {
    audio.toggleBackgroundMusic();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs transition-all">
      {/* Primary Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-2">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 flex items-center justify-center shadow-md animate-pulse-glow shrink-0">
            <span className="text-base sm:text-xl">🪢</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-lg md:text-xl font-bold font-serif text-stone-900 tracking-tight flex items-center gap-1">
              <span>Raksha Bandhan</span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.2 sm:py-0.5 rounded-full bg-rose-100 text-rose-700 font-sans font-semibold hidden xxs:inline-flex">
                Bond ❤️
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-amber-800/80 font-medium hidden sm:block">Closer Than Blood Relation</p>
          </div>
        </div>

        {/* Right Section: Sister Name, Hugs, Music, CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Logged-in Sister Name Badge & Quick Switch */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-rose-50 hover:from-amber-100 hover:to-rose-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-300/80 shadow-2xs transition-all active:scale-95 group shrink-0"
            title="Click to change logged-in Sister's Name"
          >
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 group-hover:scale-110 transition-transform shrink-0" />
            <div className="text-left flex items-center gap-1">
              <span className="text-[11px] text-stone-500 font-medium hidden md:inline">Sister:</span>
              <span className="text-xs font-bold text-rose-600 truncate max-w-[70px] xxs:max-w-[90px] sm:max-w-[140px]">
                {sisterName}
              </span>
              <span className="text-[9px] sm:text-[10px] bg-rose-200/80 text-rose-800 font-semibold px-1 py-0.2 rounded-full hidden xxs:inline-block">
                Edit
              </span>
            </div>
          </button>

          {/* Real-time Hug Counter Pill */}
          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-rose-200 text-xs font-bold shadow-xs shrink-0">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-bounce-slow shrink-0" />
            <span className="hidden sm:inline">Hugs:</span>
            <span className="text-rose-700 font-mono text-xs sm:text-sm">{hugsCount}</span>
          </div>

          {/* Ambient Marathi Music Toggle (Tula Japnar Aahe) */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 shrink-0 ${
              isPlayingMusic
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white border-amber-400 shadow-sm shadow-rose-500/25 ring-1 sm:ring-2 ring-amber-300/60 animate-pulse-glow'
                : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50 shadow-2xs'
            }`}
            title={
              isPlayingMusic
                ? 'Pause "Tula Japnar Aahe" Music'
                : 'Play Marathi Anthem: "Tula Japnar Aahe" (Khari Biscuit)'
            }
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
                <span className="hidden md:inline font-semibold truncate max-w-[120px]">
                  Tula Japnar Aahe
                </span>
                <span className="text-[10px] bg-white/20 px-1 py-0.2 rounded-full font-bold">
                  मराठी 🎵
                </span>
              </>
            ) : (
              <>
                <Music2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" />
                <span className="hidden md:inline text-amber-950 font-medium">Tula Japnar Aahe</span>
                <span className="text-[10px] bg-amber-100 text-rose-700 px-1.5 py-0.2 rounded-full font-bold">
                  Play 🎶
                </span>
              </>
            )}
          </button>

          {/* Quick Jump to Ceremony (Desktop) */}
          <a
            href="#ceremony"
            className="hidden lg:flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-rose-600 to-amber-500 text-white px-3.5 py-1.5 rounded-full hover:brightness-105 shadow-md shadow-rose-500/20 transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tie Rakhi
          </a>
        </div>

      </div>

      {/* Mobile Quick-Navigation Strip (Touch Swipe Friendly) */}
      <nav aria-label="Mobile Navigation" className="flex md:hidden border-t border-amber-200/50 bg-[#FFFDF8]/90 overflow-x-auto no-scrollbar py-1 px-2 text-[11px] font-semibold text-stone-700">
        <div className="flex items-center gap-1.5 mx-auto min-w-max">
          <a
            href="#ceremony"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 active:bg-amber-100"
          >
            <span>🪔</span>
            <span>Aarti</span>
          </a>
          <a
            href="#letter"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-900 active:bg-rose-100"
          >
            <span>💌</span>
            <span>Letter</span>
          </a>
          <a
            href="#teddy-corner"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-pink-900 active:bg-pink-100"
          >
            <span>🧸</span>
            <span>Teddy</span>
          </a>
          <a
            href="#promises"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 active:bg-emerald-100"
          >
            <span>🛡️</span>
            <span>Vows</span>
          </a>
          <a
            href="#reply"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-stone-900 active:bg-amber-200"
          >
            <span>💬</span>
            <span>Reply</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
