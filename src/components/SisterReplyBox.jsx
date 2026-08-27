import React, { useState } from 'react';
import { Send, Mail, User, CheckCircle, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

const QUICK_CHIPS = [
  "You're truly the best brother in the universe! 💖",
  "Blessed to have you in my corner always! 🛡️",
  "Where is my real cash gift though? 😜🎁",
  "No matter the distance, we are always connected! ✨",
  "Sending you 1,000,000 teddy hugs right back! 🧸"
];

const TARGET_EMAIL = 'utkarsh0420nikam@gmail.com';

export default function SisterReplyBox({ sisterName, onNewMessage }) {
  const [inputText, setInputText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('❤️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusNotice, setStatusNotice] = useState('');
  const [lastSentText, setLastSentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    const messageContent = inputText.trim();
    const payload = {
      sender: sisterName,
      text: messageContent,
      emoji: selectedEmoji,
    };

    // 1. Send via local backend API
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Backend API offline, falling back to direct cloud dispatch:', err);
    }

    // 2. Direct cloud email dispatch via FormSubmit (delivers directly into brother's Gmail inbox)
    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: `Sister ${sisterName}`,
          _subject: `💌 Raksha Bandhan Note from your Sister (${sisterName}) ${selectedEmoji}`,
          message: `"${messageContent}"\n\n- With love from your dearest sister, ${sisterName} ${selectedEmoji}\n(Raksha Bandhan 2026)`,
          _captcha: 'false',
          _template: 'box',
        }),
      });
    } catch (cloudErr) {
      console.warn('Cloud dispatch attempt:', cloudErr);
    }

    // Clear input & trigger celebratory sister feedback
    setLastSentText(messageContent);
    setInputText('');
    setStatusNotice(`Your heartfelt note has been dispatched with love to your brother! ❤️`);
    audio.playCelebration();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#E63946', '#D4AF37', '#FF9900', '#FF4D6D', '#FFB703'],
    });

    if (onNewMessage) onNewMessage();
    setIsSubmitting(false);
    setTimeout(() => setStatusNotice(''), 10000);
  };

  return (
    <section id="reply" className="py-10 sm:py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            Direct Note to Brother's Inbox
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-2.5 sm:mb-3">
            Send a Love Note to Your Brother
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Write your heartfelt message, tease him for gifts, or send your blessings. Your note will be delivered straight to your brother's email (<span className="text-rose-600 font-semibold break-all">{TARGET_EMAIL}</span>)!
          </p>
        </div>

        {/* Centered Clean Note Form */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-amber-50/80 via-rose-50/60 to-amber-50/80 p-4 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-amber-200/80 shadow-lg sm:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  From Sister
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-stone-200 shadow-xs">
                  <User className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-bold text-xs sm:text-sm text-stone-800 truncate">{sisterName}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Recipient Brother
                </label>
                <div className="flex items-center gap-2 bg-rose-50 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-rose-200 text-xs text-rose-800 font-semibold">
                  <Mail className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="truncate">{TARGET_EMAIL}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Choose Mood Stamp
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {['❤️', '🧸', '🪢', '🌟', '🍫', '👑'].map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl transition-all active:scale-95 ${
                      selectedEmoji === emoji
                        ? 'bg-rose-500 text-white scale-105 shadow-md ring-2 ring-rose-300'
                        : 'bg-white border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Your Note or Wish
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder="Write your heartfelt note for your brother..."
                className="w-full text-base sm:text-sm p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white resize-none shadow-xs text-stone-900"
              />
            </div>

            {/* Quick Chip Inserters */}
            <div>
              <p className="text-[11px] font-semibold text-stone-500 mb-1.5">Tap to quick-fill:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map((chip, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setInputText(chip)}
                    className="text-xs bg-white border border-stone-200 hover:border-rose-300 hover:bg-rose-50/50 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-stone-700 transition-colors text-left shadow-2xs active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !inputText.trim()}
              className="w-full min-h-[48px] py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>{isSubmitting ? 'Delivering Note...' : 'Send Note Directly to Brother’s Email'}</span>
            </button>

            {/* Heartwarming Sister Confirmation Card */}
            {statusNotice && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-950 text-xs sm:text-sm font-medium space-y-2 shadow-sm animate-fade-in text-center">
                <div className="flex items-center justify-center gap-2 font-bold text-sm sm:text-base text-emerald-800">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Note Sent to Brother with Love! 💌</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                  {statusNotice}
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-white/85 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  <span>🧸 Your brother will read and cherish your note forever!</span>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
