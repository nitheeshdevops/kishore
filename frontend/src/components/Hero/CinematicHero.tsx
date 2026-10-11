import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Calendar,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { CinematicCanvas } from '../Scene3D/CinematicCanvas';

export const CinematicHero: React.FC = () => {
  const {
    config,
    replayIntro,
  } = useWedding();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* 3D Real-time canvas backdrop */}
      <div className="absolute inset-0 z-0">
        <CinematicCanvas
          interactive={true}
          ringsScale={1.15}
          ringsPosition={[0, 0, 0]}
          showArch={true}
          particleCount={170}
          petalCount={45}
        />
      </div>

      {/* Atmospheric Vignette & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F070E] via-transparent to-[#1F070E]/70 pointer-events-none z-10" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Filigree & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold-champagne/80" />
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-gold-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
            {config.tagline}
          </span>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold-champagne/80" />
        </motion.div>

        {/* Groom & Bride Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="my-2 sm:my-3"
        >
          {/* KISHORE */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cormorant font-bold tracking-wider text-gold-shimmer drop-shadow-[0_4px_30px_rgba(216,183,121,0.45)]">
            {config.groom.firstName}
          </h1>

          {/* Romantic Ampersand & Floral Divider */}
          <div className="flex items-center justify-center gap-6 my-1 sm:my-2 text-rose-blush">
            <span className="w-12 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
            <span className="font-script text-4xl sm:text-6xl text-rose-blush drop-shadow-md">
              &amp;
            </span>
            <span className="w-12 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
          </div>

          {/* Bride's Name: SHRIKA */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cormorant tracking-wide text-ivory-warm font-light drop-shadow-md">
            {config.bride.firstName}
          </h2>
        </motion.div>

        {/* Floating Couple Photo Montage Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-2 sm:gap-6 my-4 sm:my-6"
        >
          {/* Kishore Candid Frame */}
          <div className="group relative w-16 sm:w-24 h-20 sm:h-32 rounded-2xl overflow-hidden p-1 glass-wine border border-gold-champagne/40 shadow-gold-glow transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <img
              src="/images/kishore_shrika_candid.png"
              alt="Kishore & Shrika"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Central Crown Jewel: Royal Mandap Portrait */}
          <div className="group relative w-32 sm:w-48 h-44 sm:h-64 rounded-t-full rounded-b-3xl overflow-hidden p-2 glass-burgundy border-2 border-gold-champagne shadow-gold-glow-lg transform scale-105 hover:scale-110 transition-all duration-500 cursor-pointer">
            <img
              src="/images/kishore_shrika_royal.png"
              alt="Kishore G & Shrika Arul A — Royal Wedding Mandap"
              className="w-full h-full object-cover rounded-t-full rounded-b-2xl group-hover:scale-105 transition-transform duration-700"
            />
            {/* Ornate Gold Crown Tag */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gold-champagne/90 text-[#2C1B1B] text-[9px] sm:text-[10px] uppercase font-bold tracking-widest shadow-sm">
              Royal Mandap
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F070E]/85 via-transparent to-transparent flex items-end justify-center pb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-champagne font-bold drop-shadow">
                June 10, 2032
              </span>
            </div>
          </div>

          {/* Shrika Arch Frame */}
          <div className="group relative w-16 sm:w-24 h-20 sm:h-32 rounded-2xl overflow-hidden p-1 glass-wine border border-gold-champagne/40 shadow-gold-glow transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <img
              src="/images/kishore_shrika_arch.png"
              alt="Shrika & Kishore"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Subtitle & Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-xl font-cormorant italic text-rose-blush/90">
            "{config.subtagline}"
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-wine border border-gold-champagne/30 text-gold-light text-xs sm:text-sm tracking-widest uppercase shadow-sm">
            <Calendar className="w-4 h-4 text-gold-champagne" />
            <span>{config.weddingDateFormatted}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollToSection('story')}
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-[#D8B779] via-[#F3E5C8] to-[#D8B779] text-[#2C1B1B] font-cormorant text-base sm:text-lg tracking-[0.15em] font-bold uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2.5 cursor-pointer"
          >
            <span>Explore Our Journey</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Ring Exchange 20x Button */}
          <button
            onClick={() => scrollToSection('ring-exchange')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-burgundy-royal to-[#4A1522] border border-gold-champagne text-gold-light hover:text-white transition-all duration-300 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold shadow-gold-glow cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-gold-champagne" />
            <span>Ring Exchange (20x)</span>
          </button>

          {/* Film Section Shortcut */}
          <a
            href="#film"
            className="px-5 py-3 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-light hover:text-white hover:border-gold-champagne transition-all duration-300 flex items-center gap-2 text-xs tracking-widest uppercase font-medium"
          >
            <Play className="w-3.5 h-3.5 text-gold-champagne fill-gold-champagne" />
            <span>Watch Film</span>
          </a>

          {/* Replay 3D intro */}
          <button
            onClick={replayIntro}
            className="p-3 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all duration-300 cursor-pointer"
            title="Replay 3D Cinematic Intro"
            aria-label="Replay intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <button
        onClick={() => scrollToSection('story')}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-gold-champagne/70 hover:text-gold-champagne transition-colors group cursor-pointer"
        aria-label="Scroll to story"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-champagne" />
      </button>
    </section>
  );
};
