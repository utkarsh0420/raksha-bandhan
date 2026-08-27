import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export default function TeddyHugModal({ isOpen, onClose, sisterName, onSendHug, hugsCount }) {
  if (!isOpen) return null;

  const handleHugMore = () => {
    audio.playHugSound();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FF4D6D', '#FF758F', '#FFCCD5', '#D4AF37']
    });
    if (onSendHug) onSendHug();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-2 sm:border-4 border-amber-300 max-h-[92vh] overflow-y-auto no-scrollbar transform transition-all scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10 active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          
          <div className="relative w-36 h-36 xs:w-44 xs:h-44 sm:w-48 sm:h-48 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-rose-300 mb-3 sm:mb-4 animate-bounce-slow">
            <img
              src="/assets/teddy_hug.jpg"
              alt="Teddy Bear Hug"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-1.5 sm:mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
            <span>Incoming Ultra-Warm Bear Hug!</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1.5 sm:mb-2">
            A Giant Squeeze For {sisterName}!
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 sm:mb-6 px-1">
            "Miles cannot stop a brother's love, and genetics don't measure the depth of a heart. 
            Here is a fluffy, warm, unconditional bear hug just for you!" 🧸💖
          </p>

          <div className="bg-rose-50 rounded-2xl p-2.5 sm:p-3 mb-4 sm:mb-6 border border-rose-200 flex items-center justify-center gap-2 text-xs font-bold text-rose-900">
            <span>Current Hugs Shared:</span>
            <span className="font-mono text-base text-rose-600">{hugsCount}</span>
          </div>

          <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
            <button
              onClick={handleHugMore}
              className="flex-1 min-h-[46px] py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white shrink-0" />
              <span>Hug Again! (+1)</span>
            </button>

            <button
              onClick={onClose}
              className="min-h-[46px] px-5 py-3 rounded-xl sm:rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs sm:text-sm transition-all active:scale-95"
            >
              Got It!
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
