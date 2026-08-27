import React, { useState } from 'react';
import { Sparkles, Flame, CheckCircle, RotateCcw, Heart, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export default function RakhiCeremony({ sisterName, onRakhiTied }) {
  const [diyaLit, setDiyaLit] = useState(false);
  const [tilakApplied, setTilakApplied] = useState(false);
  const [sweetOffered, setSweetOffered] = useState(false);
  const [rakhiTied, setRakhiTied] = useState(false);
  const [ritualMessage, setRitualMessage] = useState('Begin the sacred ceremony by lighting the Diya 🪔');

  const handleLightDiya = () => {
    if (!diyaLit) {
      setDiyaLit(true);
      audio.playTempleBell();
      setRitualMessage('The holy Diya is glowing with warmth and protection! Now apply the auspicious Tilak ✨');
    }
  };

  const handleApplyTilak = () => {
    if (!tilakApplied) {
      setTilakApplied(true);
      audio.playSparkleChime();
      setRitualMessage('Auspicious Tilak & Akshat applied on brother’s forehead! Now sweeten his day with sweets 🍬');
    }
  };

  const handleOfferSweet = () => {
    if (!sweetOffered) {
      setSweetOffered(true);
      audio.playHugSound();
      setRitualMessage('Moo Meetha Ho Gaya! Delicious Kaju Katli offered! Now tie the sacred Rakhi thread 🪢');
    }
  };

  const handleTieRakhi = () => {
    if (!rakhiTied) {
      setRakhiTied(true);
      audio.playCelebration();
      audio.playTempleBell();
      setRitualMessage(`Happy Raksha Bandhan! The sacred Rakhi is tied! You have my eternal love and protection, ${sisterName}! ❤️`);

      // Grand confetti burst
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#E63946', '#FF9900', '#FFFFFF', '#06D6A0']
      });

      if (onRakhiTied) {
        onRakhiTied();
      }
    }
  };

  const handleReset = () => {
    setDiyaLit(false);
    setTilakApplied(false);
    setSweetOffered(false);
    setRakhiTied(false);
    setRitualMessage('Begin the sacred ceremony by lighting the Diya 🪔');
  };

  const progressCount = [diyaLit, tilakApplied, sweetOffered, rakhiTied].filter(Boolean).length;

  return (
    <section id="ceremony" className="py-10 sm:py-16 md:py-24 bg-gradient-to-b from-[#FFFDF8] via-amber-50/40 to-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Bell className="w-3.5 h-3.5" />
            Sacred Festive Ritual
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-2.5 sm:mb-4">
            Virtual Rakhi & Aarti Ceremony
          </h2>
          <p className="text-stone-600 text-xs sm:text-base md:text-lg px-2">
            Follow the traditional steps to perform the Raksha Bandhan ritual virtually. Distance or blood can never weaken the thread of our heart's bond.
          </p>

          {/* Progress Tracker */}
          <div className="mt-4 sm:mt-6 max-w-md mx-auto px-2">
            <div className="flex justify-between text-xs font-bold text-stone-600 mb-1.5">
              <span>Ceremony Progress</span>
              <span className="text-rose-600">{progressCount} of 4 Complete</span>
            </div>
            <div className="h-2.5 w-full bg-amber-100 rounded-full overflow-hidden border border-amber-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${(progressCount / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* The Interactive Puja Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left / Center: Interactive Aarti Thali Visual */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Mobile Interaction Hint */}
            <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-[11px] font-semibold">
              <span>👆 Tap items on Thali or use buttons below</span>
            </div>

            <div className="relative w-full max-w-[310px] xs:max-w-[350px] sm:max-w-md aspect-square rounded-full p-3 sm:p-4 bg-gradient-to-tr from-amber-300 via-amber-100 to-amber-400 shadow-xl sm:shadow-2xl border-2 sm:border-4 border-amber-400/80 flex items-center justify-center">
              
              {/* Thali Rim Detail */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border-2 border-dashed border-amber-500/50 pointer-events-none" />

              {/* Central Aarti Thali Image with interactive overlay hotspots */}
              <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden shadow-inner bg-amber-950/10">
                <img
                  src="/assets/rakhi_thali.jpg"
                  alt="Aarti Thali"
                  className="w-full h-full object-cover select-none"
                />

                {/* Hotspot 1: Diya */}
                <div
                  onClick={handleLightDiya}
                  className={`absolute top-[38%] left-[46%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all z-20 active:scale-90`}
                  title="Tap to Light the Diya"
                >
                  <div className={`p-2.5 sm:p-3 rounded-full transition-transform group-hover:scale-125 min-w-[48px] min-h-[48px] flex items-center justify-center ${diyaLit ? 'bg-amber-400/35 ring-2 ring-amber-400' : 'bg-black/40 hover:bg-black/50 ring-1 ring-amber-300 animate-pulse'}`}>
                    <Flame
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-all ${
                        diyaLit
                          ? 'text-amber-400 fill-amber-400 animate-flame drop-shadow-[0_0_15px_#ffaa00]'
                          : 'text-amber-200'
                      }`}
                    />
                  </div>
                  {!diyaLit && (
                    <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-amber-950/90 text-amber-100 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap border border-amber-300/40">
                      Tap Diya 🪔
                    </span>
                  )}
                </div>

                {/* Hotspot 2: Tilak (Roli Bowl) */}
                <div
                  onClick={handleApplyTilak}
                  className={`absolute bottom-[28%] left-[26%] -translate-x-1/2 translate-y-1/2 cursor-pointer group transition-all z-20 active:scale-90`}
                  title="Tap to Apply Tilak"
                >
                  <div className={`p-2 sm:p-2.5 rounded-full transition-transform group-hover:scale-125 min-w-[44px] min-h-[44px] flex items-center justify-center ${tilakApplied ? 'bg-rose-500/35 ring-2 ring-rose-400' : 'bg-black/40 hover:bg-black/50 ring-1 ring-rose-300 animate-pulse'}`}>
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs ${tilakApplied ? 'bg-rose-600 text-white' : 'bg-rose-700 text-rose-100'}`}>
                      {tilakApplied ? '✓' : '🔴'}
                    </div>
                  </div>
                  {!tilakApplied && (
                    <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-rose-950/90 text-rose-100 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap border border-rose-300/40">
                      Tilak 🔴
                    </span>
                  )}
                </div>

                {/* Hotspot 3: Sweets (Kaju Katli) */}
                <div
                  onClick={handleOfferSweet}
                  className={`absolute bottom-[30%] right-[22%] -translate-x-1/2 translate-y-1/2 cursor-pointer group transition-all z-20 active:scale-90`}
                  title="Tap to Offer Sweets"
                >
                  <div className={`p-2 sm:p-2.5 rounded-full transition-transform group-hover:scale-125 min-w-[44px] min-h-[44px] flex items-center justify-center ${sweetOffered ? 'bg-amber-400/35 ring-2 ring-amber-400' : 'bg-black/40 hover:bg-black/50 ring-1 ring-amber-300 animate-pulse'}`}>
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-white flex items-center justify-center text-xs ${sweetOffered ? 'bg-white shadow text-amber-900 font-bold' : 'bg-amber-100/90'}`}>
                      {sweetOffered ? '✓' : '🍬'}
                    </div>
                  </div>
                  {!sweetOffered && (
                    <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-amber-950/90 text-amber-100 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap border border-amber-300/40">
                      Sweets 🍬
                    </span>
                  )}
                </div>

                {/* Hotspot 4: Rakhi Center */}
                <div
                  onClick={handleTieRakhi}
                  className={`absolute bottom-[10%] left-[58%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all z-30 active:scale-90`}
                  title="Tap to Tie Rakhi"
                >
                  <div className={`p-2.5 sm:p-3 rounded-full transition-all group-hover:scale-125 min-w-[48px] min-h-[48px] flex items-center justify-center ${rakhiTied ? 'bg-emerald-500/40 ring-4 ring-emerald-400' : 'bg-rose-600/80 ring-2 ring-amber-300 animate-pulse'}`}>
                    <span className="text-xl sm:text-2xl">🪢</span>
                  </div>
                  {!rakhiTied && (
                    <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-rose-950/95 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap border border-amber-300">
                      Tie Rakhi ✨
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* Ritual Status Box */}
            <div className="mt-4 sm:mt-6 w-full max-w-[310px] xs:max-w-[350px] sm:max-w-md bg-white p-3 sm:p-4 rounded-2xl border border-amber-200 shadow-sm sm:shadow-md text-center">
              <p className="text-[10px] sm:text-xs font-semibold uppercase text-amber-700 tracking-wider mb-0.5 sm:mb-1">
                Ceremony Status
              </p>
              <p className="text-xs xs:text-sm sm:text-base font-bold text-stone-800 transition-all leading-snug">
                {ritualMessage}
              </p>
            </div>
          </div>

          {/* Right: Step-by-Step Action Controls */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5">
            
            {/* Step 1: Light Diya */}
            <div
              onClick={handleLightDiya}
              className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                diyaLit
                  ? 'bg-amber-50 border-amber-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${diyaLit ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-stone-100 text-stone-500'}`}>
                  🪔
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">Step 1: Light the Holy Diya</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Kindle the flame of eternal love & protection</p>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {diyaLit ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-md">Tap</span>
                )}
              </div>
            </div>

            {/* Step 2: Apply Tilak */}
            <div
              onClick={handleApplyTilak}
              className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                tilakApplied
                  ? 'bg-rose-50 border-rose-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:border-rose-300 hover:bg-rose-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${tilakApplied ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'bg-stone-100 text-stone-500'}`}>
                  ✨
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">Step 2: Apply Sacred Tilak</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Roli & Akshat for health, happiness & wisdom</p>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {tilakApplied ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded-md">Tap</span>
                )}
              </div>
            </div>

            {/* Step 3: Offer Sweets */}
            <div
              onClick={handleOfferSweet}
              className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                sweetOffered
                  ? 'bg-amber-50 border-amber-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${sweetOffered ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'bg-stone-100 text-stone-500'}`}>
                  🍬
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">Step 3: Sweeten the Bond</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Offer Kaju Katli sweets to celebrate sweetness</p>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {sweetOffered ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-md">Tap</span>
                )}
              </div>
            </div>

            {/* Step 4: Tie Rakhi Thread */}
            <div
              onClick={handleTieRakhi}
              className={`p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                rakhiTied
                  ? 'bg-emerald-50 border-emerald-400 shadow-md'
                  : 'bg-gradient-to-r from-rose-50 to-amber-50 border-rose-400 hover:border-rose-500 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shrink-0 ${rakhiTied ? 'bg-emerald-600 text-white' : 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white'}`}>
                  🪢
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">Step 4: Tie The Sacred Rakhi</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">The unbreakable vow of eternal brotherhood</p>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {rakhiTied ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <span className="text-xs font-bold text-white bg-rose-600 px-3 py-1 rounded-md shadow-xs animate-bounce">
                    Tie Now!
                  </span>
                )}
              </div>
            </div>

            {/* Reset Button */}
            {progressCount > 0 && (
              <div className="pt-1 sm:pt-2 flex justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-rose-600 transition-colors p-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Perform Ritual Again
                </button>
              </div>
            )}

            {/* Brother's Sacred Return Blessing when Rakhi is tied */}
            {rakhiTied && (
              <div className="mt-2 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xl animate-fade-in">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 fill-white text-white shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wider">Brother's Sacred Rakhi Blessing</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  "May laughter forever fill your days, courage guide your steps, and happiness wrap around you like sunlight. As your brother, I am always right behind you, cheering for you in every chapter of life!"
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
