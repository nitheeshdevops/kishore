import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Calendar,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { CinematicCanvas } from '../Scene3D/CinematicCanvas';

export const CinematicHero: React.FC = () => {
  const {
    config,
    replayIntro,
  } = useWedding();

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
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
          className="flex items-center gap-3 mb-4"
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
          className="my-3 sm:my-5"
        >
          {/* KISHORE */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cormorant font-bold tracking-wider text-gold-shimmer drop-shadow-[0_4px_30px_rgba(216,183,121,0.45)]">
            {config.groom.firstName}
          </h1>

          {/* Romantic Ampersand & Floral Divider */}
          <div className="flex items-center justify-center gap-6 my-2 text-rose-blush">
            <span className="w-12 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
            <span className="font-script text-4xl sm:text-6xl text-rose-blush drop-shadow-md">
              &amp;
            </span>
            <span className="w-12 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
          </div>

          {/* Configurable Bride's Name */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant tracking-wide text-ivory-warm font-light drop-shadow-md">
            {config.bride.firstName}
          </h2>
        </motion.div>

        {/* Subtitle & Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-xl font-cormorant italic text-rose-blush/90">
            "{config.subtagline}"
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-wine border border-gold-champagne/30 text-gold-light text-xs sm:text-sm tracking-widest uppercase">
            <Calendar className="w-4 h-4 text-gold-champagne" />
            <span>{config.weddingDateFormatted}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToStory}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D8B779] via-[#F3E5C8] to-[#D8B779] text-[#2C1B1B] font-cormorant text-lg tracking-[0.15em] font-bold uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <span>Explore Our Journey</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Film Section Shortcut */}
          <a
            href="#film"
            className="px-6 py-3.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-light hover:text-white hover:border-gold-champagne transition-all duration-300 flex items-center gap-2.5 text-xs tracking-widest uppercase font-medium"
          >
            <Play className="w-3.5 h-3.5 text-gold-champagne fill-gold-champagne" />
            <span>Watch Film</span>
          </a>

          {/* Replay 3D intro */}
          <button
            onClick={replayIntro}
            className="p-3.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all duration-300"
            title="Replay 3D Cinematic Intro"
            aria-label="Replay intro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <button
        onClick={scrollToStory}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gold-champagne/70 hover:text-gold-champagne transition-colors group cursor-pointer"
        aria-label="Scroll to story"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-champagne" />
      </button>
    </section>
  );
};
