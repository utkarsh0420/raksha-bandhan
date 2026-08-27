import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { audio } from '../utils/audio';

export default function Footer({ sisterName, onOpenHugModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1435] text-amber-100/90 pt-10 pb-20 sm:pt-12 sm:pb-12 border-t-4 border-amber-400 relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Festive Diya and Rakhi icon */}
        <div className="inline-flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <span className="text-xl sm:text-2xl animate-bounce-slow">🪔</span>
          <span className="text-2xl sm:text-3xl animate-pulse-glow">🪢</span>
          <span className="text-xl sm:text-2xl animate-bounce-slow">🧸</span>
        </div>

        <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-2">
          Happy Raksha Bandhan, {sisterName}!
        </h3>
        
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed font-light px-2">
          "A sister not tied by blood, but bonded by eternity. Thank you for filling my world with laughter, kindness, and pride. I will cherish and protect our bond forever."
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold mb-6 sm:mb-8">
          <button
            onClick={onOpenHugModal}
            className="px-4 py-2.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <span>🧸 Send Bear Hug</span>
          </button>

          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

        <div className="border-t border-amber-500/20 pt-4 sm:pt-6 text-[10px] sm:text-[11px] text-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 max-w-3xl mx-auto">
          <span>Crafted with pure love by your brother ❤️</span>
          <span>Raksha Bandhan 2026 • Sacred Bond Beyond Blood</span>
        </div>

      </div>
    </footer>
  );
}
