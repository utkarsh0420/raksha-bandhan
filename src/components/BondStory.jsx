import React, { useState } from 'react';
import { Scroll, Heart, Sparkles, Shield, Star, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export default function BondStory({ sisterName }) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    audio.playSparkleChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E63946', '#D4AF37', '#FFD166']
    });
  };

  return (
    <section id="letter" className="py-10 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Decorative floral motifs in corners */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            Bond Beyond Blood
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-2.5 sm:mb-4">
            Chosen by Destiny, Bonded by Soul
          </h2>
          <p className="text-stone-600 text-xs sm:text-base md:text-lg px-2">
            People often assume family must share genetics. But genuine love, loyalty, and empathy create ties that are infinitely stronger than any bloodline.
          </p>
        </div>

        {/* 3 Pillars of Our Sisterhood */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-14">
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200/80 shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3 sm:mb-4">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1.5 sm:mb-2">
              Closer Than Blood
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Blood relations are an accident of birth; having you as my sister is the conscious, beautiful choice of my heart every single day.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200/80 shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 sm:mb-4">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1.5 sm:mb-2">
              Precious Beyond Measure
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Your kindness, your radiant smile, and your wisdom make you a treasure in my life. I am eternally lucky to have you.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-amber-200/80 shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 sm:mb-4">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1.5 sm:mb-2">
              My Safe Harbor
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No matter what problems we encounter, you know that your brother has your back with zero hesitation, always.
            </p>
          </div>

        </div>

        {/* Interactive Wax Sealed Letter */}
        <div className="max-w-3xl mx-auto">
          {!isLetterOpen ? (
            /* Envelope closed with Golden Wax Seal */
            <div
              onClick={handleOpenLetter}
              className="relative cursor-pointer group bg-gradient-to-br from-amber-100 via-rose-50 to-amber-200 p-5 xs:p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-amber-300 shadow-lg sm:shadow-xl text-center transform transition-all duration-300 active:scale-[0.98] hover:scale-[1.01]"
            >
              <div className="inline-block sm:absolute sm:top-4 sm:right-4 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-rose-600 text-white shadow-xs mb-3 sm:mb-0">
                Confidential For {sisterName}
              </div>

              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-400 p-1 shadow-lg group-hover:rotate-6 transition-transform">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-700 to-amber-900 flex items-center justify-center text-white border-2 border-amber-300/80">
                  <span className="text-2xl sm:text-3xl">💌</span>
                </div>
              </div>

              <h3 className="font-serif font-bold text-xl xs:text-2xl sm:text-3xl text-stone-900 mt-4 sm:mt-6 mb-2">
                A Letter From My Heart to Yours
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-stone-600 max-w-md mx-auto mb-4 sm:mb-6">
                "Some words are too important to keep unsaid on Raksha Bandhan. Click below to crack the royal wax seal."
              </p>

              <button className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md group-hover:shadow-rose-500/30 group-hover:brightness-110 active:scale-95 transition-all">
                <Sparkles className="w-4 h-4" />
                <span>Break Golden Wax Seal & Read</span>
              </button>
            </div>
          ) : (
            /* Unfolded Royal Parchment Letter */
            <div className="relative bg-[#FFFDF7] p-4 xs:p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-amber-300 shadow-xl sm:shadow-2xl transition-all duration-700 animate-fade-in">
              {/* Top Ornate Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2">
                <div>
                  <h3 className="font-serif font-bold text-xl xs:text-2xl sm:text-3xl text-stone-900">
                    Dearest <span className="font-cursive text-rose-600 font-normal text-2xl xs:text-3xl sm:text-4xl">{sisterName}</span>,
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-rose-600 mt-0.5 sm:mt-1 flex items-center gap-1.5">
                    <span>Happy Raksha Bandhan!</span>
                    <span>🎉</span>
                  </p>
                </div>
                <div className="self-start sm:self-auto">
                  <span className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-300">
                    Sacred Seal Broken 🪢
                  </span>
                </div>
              </div>

              {/* Letter Prose Body */}
              <div className="space-y-3 sm:space-y-4 font-serif text-stone-800 text-xs xs:text-sm sm:text-base leading-relaxed">
                <p>
                  Today, as everyone celebrates their siblings, I want you to know something — even though we don't share blood, you have a special place in my heart. You are one of the people closest to me, and truly precious.
                </p>

                <p>
                  Whenever I needed someone to talk to, someone to understand me without judgment, you were always there. You've celebrated my happy moments with me and supported me through the hard ones too.
                </p>

                <p className="p-3 sm:p-4 rounded-xl bg-amber-50/90 border-l-4 border-rose-500 italic text-stone-900 font-medium text-xs sm:text-sm">
                  "You don't choose your family — but if I could, I would choose you as my sister, every single time."
                </p>

                <p>
                  This Raksha Bandhan, I want you to know: no matter what life brings, I will always be there for you, just like you've always been there for me.
                </p>

                <p className="pt-2 sm:pt-3 font-serif text-base sm:text-lg md:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Happy Raksha Bandhan, my dear sister!</span>
                  <span className="text-lg sm:text-xl">💛</span>
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="font-serif font-bold text-stone-900 text-sm sm:text-base md:text-lg">Forever your brother</p>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-sans">Always by your side • Raksha Bandhan 2026</p>
                </div>
                <button
                  onClick={() => setIsLetterOpen(false)}
                  className="text-xs text-stone-500 hover:text-rose-600 font-sans underline transition-colors p-1"
                >
                  Fold Letter Back
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
