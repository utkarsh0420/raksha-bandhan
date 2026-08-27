import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, User, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export default function LoginModal({ isOpen, onLogin, initialName = '', onClose }) {
  const [nameInput, setNameInput] = useState(initialName);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNameInput(initialName || '');
      setError('');
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setError('Please enter your lovely name or nickname!');
      return;
    }

    audio.playCelebration();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E63946', '#FF9900', '#FF4D6D', '#FFB703']
    });

    onLogin(nameInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 shadow-2xl border-2 sm:border-4 border-amber-300 max-h-[92vh] overflow-y-auto no-scrollbar transform transition-all">
        
        {/* Optional Close Button (for when opened from Navbar) */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Top Ornate Glow */}
        <div className="absolute -top-10 -left-10 w-32 sm:w-36 h-32 sm:h-36 bg-amber-300/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 sm:w-36 h-32 sm:h-36 bg-rose-300/40 rounded-full blur-2xl pointer-events-none" />

        {/* Header Icon */}
        <div className="text-center relative z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 p-1 shadow-md sm:shadow-lg flex items-center justify-center mb-2.5 animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl sm:text-2xl">
              🪢
            </div>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-1.5 sm:mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
            <span>Sister's VIP Access Gate</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight mb-1">
            Welcome, Dearest Sister!
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-4 sm:mb-6 leading-relaxed px-1">
            Your brother built this exclusive website for you. Enter your name to customize your Raksha Bandhan celebration!
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Your Name or Sister Nickname *</span>
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  setError('');
                }}
                placeholder="Enter your lovely name or nickname"
                autoFocus
                className="w-full text-base font-semibold px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-stone-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none bg-white shadow-xs transition-all text-stone-900"
              />
              <p className="text-[10px] sm:text-[11px] text-stone-400 mt-1">
                Whatever name you enter will be replicated across your entire website and Letter!
              </p>
            </div>



            {error && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[48px] py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Unlock My Celebration Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </form>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-200 flex items-center justify-center gap-1.5 text-stone-500 text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span>Encrypted with 100% Unconditional Brotherly Love</span>
          </div>

        </div>

      </div>
    </div>
  );
}
