import React, { useState } from 'react';
import { Heart, Sparkles, Coffee, Gift, MessageCircleHeart, Smile, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

const SISTER_COMPLIMENTS = [
  "Teddy Fact: Science proves your smile can brighten any room in less than 0.2 seconds! ☀️",
  "Teddy Secret: Your brother talks about you with so much pride and respect to everyone! 💖",
  "Official Teddy Diagnosis: 100% precious, 0% replaceable, 1000% the best sister in the universe! 💎",
  "Warning: Extreme cuteness, wisdom, and sweetness detected in one human sister! 🧸",
  "Blood relations are okay, but our heart connection is gold-standard premium luxury! 👑",
  "Teddy's Wisdom: Whenever you feel stressed, take a deep breath — you have a brother who would move mountains for you!",
  "Teddy note: You make this world 10x warmer just by being your authentic, wonderful self! ✨",
  "If there was a Nobel Prize for being an awesome sister, you would win it every single year without competition! 🏆"
];

export default function TeddyCompanion({ sisterName, onSendHug, hugsCount }) {
  const [teddyPose, setTeddyPose] = useState('rakhi'); // 'rakhi' or 'hug'
  const [currentCompliment, setCurrentCompliment] = useState(
    `Teddy says: Hello ${sisterName}! I am your official Rakhi companion delivering infinite hugs! 🧸`
  );
  const [sweetCount, setSweetCount] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Trigger Bear Hug
  const handleBearHug = () => {
    setTeddyPose('hug');
    setIsWiggling(true);
    audio.playHugSound();

    // Spawn floating heart particles
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      left: 30 + Math.random() * 40,
      scale: 0.8 + Math.random() * 0.5,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 1800);

    // Trigger Heart Confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF4D6D', '#FF758F', '#FF8FA3', '#FFCCD5', '#D4AF37'],
    });

    setCurrentCompliment(`*SQUEEEEEZE*! Warmest, tightest digital bear hug delivered directly to ${sisterName}! 🧸💖`);

    setTimeout(() => setIsWiggling(false), 800);

    if (onSendHug) {
      onSendHug();
    }
  };

  // Dispense Compliment
  const handleNextCompliment = () => {
    audio.playSparkleChime();
    const randomIndex = Math.floor(Math.random() * SISTER_COMPLIMENTS.length);
    setCurrentCompliment(SISTER_COMPLIMENTS[randomIndex]);
  };

  // Feed Sweet
  const handleFeedSweet = () => {
    audio.playSparkleChime();
    setSweetCount((prev) => prev + 1);
    setCurrentCompliment(`*Nom nom nom*! Yum! That sweet was delicious! Thank you ${sisterName}, you are the sweetest sister ever! 🍯😋`);
  };

  return (
    <section id="teddy-corner" className="py-10 sm:py-16 md:py-24 bg-gradient-to-b from-[#FFFDF8] via-rose-50/50 to-[#FFFDF8] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span className="text-sm">🧸</span>
            Teddy's Cozy Corner
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-2.5 sm:mb-4">
            Meet Your Rakhi Teddy Bear!
          </h2>
          <p className="text-stone-600 text-xs sm:text-base md:text-lg px-2">
            Your brother ordered this special 3D plush teddy bear straight from the Internet to protect your smile, dispense endless warm hugs, and remind you how precious you are!
          </p>
        </div>

        {/* Teddy Bear Main Interactive Showcase */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 border-2 border-rose-200/80 shadow-lg sm:shadow-xl max-w-4xl mx-auto relative">
          
          {/* Floating Hearts Animation Container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                className="absolute text-rose-500 animate-float"
                style={{
                  left: `${h.left}%`,
                  bottom: '30%',
                  transform: `scale(${h.scale})`,
                  animationDuration: '1.5s',
                }}
              >
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-500 text-rose-500 drop-shadow-md" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left: Teddy Bear Image & Pose Controller */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                className={`relative w-48 h-48 xs:w-60 xs:h-60 sm:w-72 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-amber-300 transition-transform duration-300 ${
                  isWiggling ? 'scale-105 rotate-2' : 'hover:scale-[1.02]'
                }`}
              >
                <img
                  src={teddyPose === 'rakhi' ? '/assets/teddy_rakhi.jpg' : '/assets/teddy_hug.jpg'}
                  alt="Cute Teddy Bear"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                
                {/* Pose Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-stone-950/75 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-white flex items-center gap-1">
                  <span>{teddyPose === 'rakhi' ? '🪢 Rakhi Pose' : '🤗 Hug Pose'}</span>
                </div>

                {/* Sweets Counter on Teddy */}
                {sweetCount > 0 && (
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-amber-500/95 text-white font-bold text-[11px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow">
                    Fed {sweetCount} Sweets 🍬
                  </div>
                )}
              </div>

              {/* Pose Switcher Buttons */}
              <div className="flex gap-2 mt-3 sm:mt-4">
                <button
                  onClick={() => setTeddyPose('rakhi')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                    teddyPose === 'rakhi'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Rakhi Teddy
                </button>
                <button
                  onClick={() => setTeddyPose('hug')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                    teddyPose === 'hug'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  Hugging Teddy
                </button>
              </div>
            </div>

            {/* Right: Teddy Speech & Interactive Actions */}
            <div className="md:col-span-7 flex flex-col gap-3 sm:gap-4">
              
              {/* Teddy's Live Speech Bubble */}
              <div className="relative bg-gradient-to-br from-amber-50 to-rose-50 p-4 sm:p-5 rounded-2xl border border-amber-300/80 shadow-xs sm:shadow-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shrink-0">
                    🧸
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-800">
                    Teddy Bear Transmission
                  </span>
                </div>
                <p className="text-stone-800 text-xs xs:text-sm sm:text-base font-medium leading-relaxed italic">
                  "{currentCompliment}"
                </p>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                
                {/* 1. Request Warm Bear Hug */}
                <button
                  onClick={handleBearHug}
                  className="min-h-[48px] p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-rose-400/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white shrink-0" />
                  <span>Ask for Bear Hug!</span>
                </button>

                {/* 2. Dispense Secret Compliment */}
                <button
                  onClick={handleNextCompliment}
                  className="min-h-[48px] p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-400/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Teddy Compliment 🎁</span>
                </button>

                {/* 3. Feed Sweet */}
                <button
                  onClick={handleFeedSweet}
                  className="min-h-[48px] p-3 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>🍬 Feed Teddy Kaju Katli</span>
                </button>

                {/* 4. Hug Counter Indicator */}
                <div className="min-h-[48px] p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                  <span>Hugs Exchanged:</span>
                  <span className="text-rose-600 font-mono text-base">{hugsCount}</span>
                </div>

              </div>

              {/* Teddy's Sisterhood Note */}
              <div className="mt-1 text-[11px] sm:text-xs text-stone-500 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                <span>Teddy Bear Approved: 100% Most Lovable Sister in the Universe!</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
