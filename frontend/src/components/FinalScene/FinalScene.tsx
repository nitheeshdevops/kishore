import React from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Share2,
  Heart,
  ArrowUp,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { CinematicCanvas } from '../Scene3D/CinematicCanvas';

export const FinalScene: React.FC = () => {
  const { config, replayIntro } = useWedding();

  const handleShareWhatsApp = () => {
    const encodedText = encodeURIComponent(
      `💍 *A Beautiful Beginning — Kishore & ${config.bride.firstName}*\n\n` +
      `"${config.subtagline}"\n\n` +
      `📅 Wedding Date: ${config.weddingDateFormatted}\n` +
      `✨ ${config.shareMessage}\n\n` +
      `Experience our 3D cinematic pre-wedding story:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-24 bg-gradient-to-t from-[#1F070E] via-[#351018] to-[#1F070E]">
      {/* 3D Real-time canvas backdrop */}
      <div className="absolute inset-0 z-0 opacity-85">
        <CinematicCanvas
          interactive={false}
          ringsScale={1.1}
          ringsPosition={[0, 0, 0]}
          showArch={true}
          particleCount={180}
          petalCount={45}
        />
      </div>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1F070E]/60 to-[#1F070E]/95 pointer-events-none z-10" />

      {/* Outro Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Monogram emblem */}
        <div className="w-16 h-16 rounded-full border border-gold-champagne/50 flex items-center justify-center bg-burgundy-royal/60 shadow-gold-glow mb-6">
          <Heart className="w-8 h-8 text-rose-blush fill-rose-blush/80 animate-pulse" />
        </div>

        {/* Names in Gold */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-3"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-cormorant font-bold text-gold-shimmer">
            {config.groom.firstName} &amp; {config.bride.firstName}
          </h2>

          <p className="font-script text-3xl sm:text-5xl text-rose-blush py-2">
            Our story is just beginning...
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-champagne/90">
            {config.weddingDateFormatted} • {config.hashtag}
          </p>
        </motion.div>

        {/* Buttons: WhatsApp Share & Replay Intro */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="group px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-emerald-900/50 flex items-center gap-2.5"
            aria-label="Share on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invitation via WhatsApp</span>
          </button>

          {/* Replay Intro */}
          <button
            onClick={replayIntro}
            className="px-7 py-3.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-light hover:text-white hover:border-gold-champagne transition-all duration-300 text-xs uppercase tracking-widest font-medium flex items-center gap-2.5"
            aria-label="Replay intro"
          >
            <RotateCcw className="w-4 h-4 text-gold-champagne" />
            <span>Replay Cinematic Experience</span>
          </button>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all duration-300"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Credit */}
        <div className="mt-16 pt-8 border-t border-gold-champagne/20 text-center text-xs text-rose-blush/60">
          <p>© {new Date().getFullYear()} {config.groom.firstName} &amp; {config.bride.firstName} Pre-Wedding Experience. Crafted with eternal love.</p>
        </div>
      </div>
    </section>
  );
};
