import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Heart,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GuestWish } from '../../types';

const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-nitheesh',
    name: 'Nitheesh',
    relation: 'Best Friend & Brother',
    message: '✨ Heavenly Grace & Eternal Love — Seeing my brother Kishore find his perfect half in Shrika is the greatest blessing! You two bring out the purest joy and radiance in each other. May your journey together be showered with boundless laughter, unwavering strength, and a love that deepens with every sunrise. Here is to your forever! 🥂💍',
    createdAt: 'Pinned Blessing',
    likes: 48,
  },
  {
    id: 'wish-1',
    name: 'Vikram & Meera',
    relation: 'Close Friends',
    message: 'Wishing Kishore and Shrika a lifetime of endless adventures, laughter, and unbreakable bonds! You two are pure magic together.',
    createdAt: '10 mins ago',
    likes: 18,
  },
  {
    id: 'wish-2',
    name: 'Uncle Rajesh & Family',
    relation: 'Family',
    message: 'Heartiest congratulations to Kishore & Shrika! May God shower his choicest blessings upon you both as you build a heavenly home together.',
    createdAt: '2 hours ago',
    likes: 24,
  },
  {
    id: 'wish-3',
    name: 'Pooja Sharma',
    relation: 'Colleague',
    message: 'The website and your love story are utterly breathtaking! So thrilled for you Kishore and Shrika. Have the most magical wedding!',
    createdAt: 'Yesterday',
    likes: 12,
  },
];

export const GuestWishes: React.FC = () => {

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const stored = localStorage.getItem('kishore_guest_wishes_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [reaction, setReaction] = useState('💍 Eternal Love');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch from backend API if available
  useEffect(() => {
    const fetchBackendWishes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/wishes');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setWishes(data);
          }
        }
      } catch {
        // Local fallback is active
      }
    };
    fetchBackendWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please enter your name (at least 2 characters).');
      setSubmitStatus('error');
      return;
    }

    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please write a blessing message (at least 5 characters).');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: relation,
      message: `${reaction} — ${message.trim()}`,
      createdAt: 'Just now',
      likes: 1,
    };

    let savedSuccessfully = false;

    // Try posting to backend server
    try {
      const response = await fetch('http://localhost:5000/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish),
      });

      if (response.ok) {
        savedSuccessfully = true;
      }
    } catch {
      // Backend is optional/local fallback
    }

    // Save locally to ensure persistent user feedback
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('kishore_guest_wishes', JSON.stringify(updated));
      savedSuccessfully = true;
    } catch {
      // ignore
    }

    setIsSubmitting(false);

    if (savedSuccessfully) {
      setSubmitStatus('success');
      setName('');
      setMessage('');

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D8B779', '#EBC3C5', '#FFF8EF', '#B66B78'],
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } else {
      setErrorMessage('Unable to save message. Please try again.');
      setSubmitStatus('error');
    }
  };

  const handleLike = (id: string) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem('kishore_guest_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="wishes" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1F070E] overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-burgundy-royal/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Guestbook of Love</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            Send Your Blessings
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic">
            "Your love, prayers, and heartfelt wishes mean the world to Kishore and his beloved."
          </p>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Submission Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl glass-burgundy border border-gold-champagne/40 shadow-burgundy-deep">
              <h3 className="font-cormorant text-2xl font-bold text-gold-light mb-2">
                Write a Blessing for the Couple
              </h3>
              <p className="text-xs text-rose-blush/70 mb-6">
                Your message will be displayed on the digital wall of blessings.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-champagne font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2C1019] border border-gold-champagne/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors placeholder-ivory-warm/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-champagne font-medium mb-1">
                    Your Relationship
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2C1019] border border-gold-champagne/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors"
                  >
                    <option value="Family">Family Member</option>
                    <option value="Friend">Close Friend</option>
                    <option value="Colleague">Colleague / Peer</option>
                    <option value="Well-wisher">Warm Well-wisher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-champagne font-medium mb-1">
                    Blessing Token
                  </label>
                  <select
                    value={reaction}
                    onChange={(e) => setReaction(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2C1019] border border-gold-champagne/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors"
                  >
                    <option value="💍 Eternal Love">💍 Eternal Love</option>
                    <option value="🌸 Boundless Joy">🌸 Boundless Joy</option>
                    <option value="✨ Heavenly Grace">✨ Heavenly Grace</option>
                    <option value="🥂 Toast to Forever">🥂 Toast to Forever</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gold-champagne font-medium mb-1">
                    Your Message / Blessing *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your prayers, heartfelt memories, or well-wishes..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2C1019] border border-gold-champagne/30 text-ivory-warm text-sm focus:outline-none focus:border-gold-champagne transition-colors placeholder-ivory-warm/30 resize-none"
                    required
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Your blessing has been lovingly shared on the wall!</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-champagne via-gold-light to-gold-champagne text-[#2C1B1B] font-cormorant text-lg uppercase tracking-widest font-bold shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending Blessings...</span>
                  ) : (
                    <>
                      <span>Send Blessing</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Live Blessings Wall (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gold-champagne/20 mb-4">
              <span className="font-cormorant text-xl font-bold text-gold-light">
                Recent Blessings ({wishes.length})
              </span>
              <span className="text-xs text-rose-blush uppercase tracking-widest">
                Real-Time Feed
              </span>
            </div>

            <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 custom-scroll">
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl glass-wine border border-gold-champagne/25 shadow-sm hover:border-gold-champagne/60 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-cormorant text-lg font-bold text-ivory-warm">
                        {w.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-gold-champagne">
                        <span className="px-2 py-0.5 rounded-full bg-gold-champagne/10 border border-gold-champagne/20">
                          {w.relation}
                        </span>
                        <span>• {w.createdAt}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(w.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-rose-blush/20 border border-white/10 text-xs text-rose-blush transition-colors"
                      aria-label="Heart blessing"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{w.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-ivory-warm/90 leading-relaxed font-light">
                    {w.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
