import React, { useState } from 'react';
import { Shield, PhoneCall, Smile, Gift, Sparkles, CheckCircle2, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

const PROMISES = [
  {
    id: 1,
    icon: Shield,
    color: 'rose',
    title: 'The Eternal Shield Vow',
    short: 'No storm will ever touch you alone.',
    full: 'No matter the miles between us or how busy life gets, you will never fight any battle alone. If someone or something hurts you, your brother stands right in front.',
  },
  {
    id: 2,
    icon: PhoneCall,
    color: 'amber',
    title: 'The 24/7 Unconditional Hotline',
    short: 'Call at 3 AM or 3 PM, I will listen.',
    full: 'Whether it is a minor annoyance, huge news, happy tears, or crazy vents — I am your safe space. Zero judgment, 100% ear and brotherly love.',
  },
  {
    id: 3,
    icon: Smile,
    color: 'emerald',
    title: 'The Anti-Sadness Guarantee',
    short: 'I will always restore your smile.',
    full: 'Whenever the world feels overwhelming, I promise to find a way to make you laugh — even if I have to make silly jokes or send ridiculous teddy bear memes.',
  },
  {
    id: 4,
    icon: Gift,
    color: 'purple',
    title: 'The Sister Privilege Treaty',
    short: 'Unlimited treat demands & gifts.',
    full: 'You have permanent VIP rights: demand chocolates, snacks, shopping support, or favorite dishes anytime. A sister like you deserves royalty treatment!',
  },
  {
    id: 5,
    icon: Sparkles,
    color: 'amber',
    title: 'Chosen Sister Forever',
    short: 'Closer than any blood connection.',
    full: 'DNA does not define brotherhood; soul, loyalty, and heart do. I will honor, cherish, and celebrate you as my sister for all the days of my life.',
  },
];

export default function PromisesVault({ sisterName }) {
  const [unlocked, setUnlocked] = useState([1]); // first one unlocked by default

  const toggleUnlock = (id) => {
    if (!unlocked.includes(id)) {
      setUnlocked((prev) => [...prev, id]);
      audio.playSparkleChime();
      if (unlocked.length + 1 === PROMISES.length) {
        audio.playCelebration();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }
  };

  return (
    <section id="promises" className="py-10 sm:py-16 md:py-24 bg-white/70">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Shield className="w-3.5 h-3.5" />
            Sacred Brotherly Vows
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-2.5 sm:mb-4">
            The Brother's Promises Vault
          </h2>
          <p className="text-stone-600 text-xs sm:text-base md:text-lg px-2">
            A Rakhi is not just a thread; it is a sacred covenant. Tap each vow below to unlock your brother's lifelong promises to you.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 max-w-5xl mx-auto">
          {PROMISES.map((item) => {
            const Icon = item.icon;
            const isOpen = unlocked.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleUnlock(item.id)}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 transition-all duration-300 relative group flex flex-col justify-between active:scale-[0.98] ${
                  isOpen
                    ? 'bg-gradient-to-br from-white via-amber-50/50 to-rose-50/40 border-amber-300 shadow-xs sm:shadow-md hover:shadow-xl hover:-translate-y-1'
                    : 'bg-stone-50/70 border-stone-200 hover:border-amber-300 hover:bg-white'
                }`}
              >
                {/* Top Status & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isOpen
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <span
                      className={`text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        isOpen
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {isOpen ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Sealed</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Tap to Unlock</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-1">
                    {item.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs font-semibold text-rose-600 mb-2 sm:mb-3">
                    "{item.short}"
                  </p>

                  {/* Full body revealed when unlocked */}
                  {isOpen ? (
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed animate-fade-in">
                      {item.full}
                    </p>
                  ) : (
                    <p className="text-xs text-stone-400 italic">
                      Locked with sibling trust. Tap to reveal brother's vow...
                    </p>
                  )}
                </div>

                {/* Footer Tag */}
                <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Promise #{item.id}</span>
                  <span className="font-semibold text-stone-500">For {sisterName}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Promises Unlocked Celebration */}
        {unlocked.length === PROMISES.length && (
          <div className="mt-6 sm:mt-10 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white text-center shadow-lg animate-bounce-slow">
            <p className="font-serif font-bold text-sm xs:text-base sm:text-lg">
              ✨ All 5 Vows Are Sealed In Gold & Love! ✨
            </p>
            <p className="text-[11px] sm:text-xs text-amber-100 mt-0.5">
              These promises remain active for a lifetime and beyond.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
