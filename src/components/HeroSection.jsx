import React from 'react';
import { Sparkles, Heart, Gift, Award, Scroll, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export default function HeroSection({ sisterName, onOpenHugModal }) {
  const triggerCheer = () => {
    audio.playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E63946', '#D4AF37', '#FF9900', '#FF4D6D', '#FFB703']
    });
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 md:pt-14 md:pb-24 overflow-hidden">
      {/* Subtle glowing orbs in background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-4 sm:right-10 w-60 sm:w-72 h-60 sm:h-72 bg-rose-200/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Celebration Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 border border-amber-300/80 shadow-sm text-[11px] sm:text-xs md:text-sm font-semibold text-rose-900 animate-pulse-glow text-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 animate-spin-slow shrink-0" />
            <span>Sacred Thread of Love • Only this website is fully vibe-coded ✨</span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 animate-spin-slow shrink-0" />
          </div>
        </div>

        {/* Hero Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-cursive text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-rose-600 mb-1.5">
            To My Dearest Sister,
          </h2>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.2] mb-4 sm:mb-6">
            Not Blooded by Birth, <br className="hidden sm:inline" />
            <span className="festive-red-gradient italic">Closer Than Any Blood</span> Relation.
          </h1>
          
          {/* Heartfelt subtext addressing the user's prompt */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-stone-700 leading-relaxed font-normal max-w-2xl mx-auto mb-6 sm:mb-8 px-1">
            They say family is bound by blood, but the universe gave me something even rarer —
            a sister chosen by destiny and bonded by pure love. You are <strong className="text-rose-600 font-semibold">{sisterName}</strong>, 
            the most precious, irreplaceable, and truly the best sister anyone could ever dream of having.
          </p>

          {/* Interactive CTAs: Responsive Stack on Small Screens */}
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center gap-2.5 sm:gap-4 mb-8 sm:mb-12">
            <a
              href="#ceremony"
              onClick={triggerCheer}
              className="w-full xs:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white font-semibold text-xs sm:text-sm md:text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>🪢</span>
              <span>Perform Virtual Rakhi Ritual</span>
            </a>

            <button
              onClick={onOpenHugModal}
              className="w-full xs:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 border-2 border-rose-300 font-semibold text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>🧸</span>
              <span>Send Teddy Bear Hug</span>
            </button>

            <a
              href="#letter"
              className="w-full xs:w-auto px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-2"
            >
              <Scroll className="w-4 h-4 text-amber-700" />
              <span>Read My Letter</span>
            </a>
          </div>
        </div>

        {/* Showcase Visual Hero Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto items-center">
          
          {/* Card 2 First on Mobile: Center Feature Image (Teddy & Rakhi Hero) */}
          <div className="order-first md:order-none relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-amber-300/80 group max-w-md mx-auto w-full">
            <div className="aspect-[4/3] xs:aspect-square w-full overflow-hidden bg-amber-100">
              <img
                src="/assets/teddy_rakhi.jpg"
                alt="Festive Teddy with Rakhi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/90 text-white w-fit mb-1 shadow-sm">
                Forever Protected
              </span>
              <p className="font-serif text-base sm:text-lg font-bold">
                "Best Sister in the Whole Galaxy"
              </p>
              <p className="text-[11px] sm:text-xs text-amber-200">
                Blessed to have you walking by my side.
              </p>
            </div>
          </div>

          {/* Card 1: Sacred Bond */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl shadow-sm sm:shadow-md border border-amber-200/80 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1">
              Pure Unconditional Bond
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No genetic code needed — our bond is forged in mutual trust, shared laughter, and unwavering support.
            </p>
          </div>

          {/* Card 3: The Brother's Oath */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl shadow-sm sm:shadow-md border border-rose-200/80 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-rose-500" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1">
              Lifelong Promise
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Whenever life feels heavy, remember you have a brother who will stand in front of any storm for you.
            </p>
          </div>

        </div>

        {/* Quick Ribbon Stats: Mobile Adaptive */}
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 rounded-2xl p-0.5 shadow-lg">
          <div className="bg-white/95 rounded-[14px] px-3 sm:px-6 py-3 sm:py-4 grid grid-cols-3 divide-x divide-stone-200 text-center">
            <div className="px-1">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-semibold">Sister Status</p>
              <p className="text-xs xs:text-sm sm:text-base font-bold text-rose-600 mt-0.5 leading-tight">Most Precious 💎</p>
            </div>
            <div className="px-1">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-semibold">Bond Type</p>
              <p className="text-xs xs:text-sm sm:text-base font-bold text-amber-600 mt-0.5 leading-tight">Beyond Blood 💖</p>
            </div>
            <div className="px-1">
              <p className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-semibold">Expiry Date</p>
              <p className="text-xs xs:text-sm sm:text-base font-bold text-emerald-600 mt-0.5 leading-tight">Never • Forever ♾️</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
