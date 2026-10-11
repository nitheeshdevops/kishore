import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { CinematicCanvas } from '../Scene3D/CinematicCanvas';

export const CinematicIntro: React.FC = () => {
  const {
    config,
    isIntroActive,
    skipIntro,
    isPlayingMusic,
    toggleMusic,
  } = useWedding();

  const [scene, setScene] = useState<1 | 2 | 3 | 4>(1);

  // Scene progression timer
  useEffect(() => {
    if (!isIntroActive) return;

    setScene(1);

    const t1 = setTimeout(() => {
      setScene(2);
    }, 2800);

    const t2 = setTimeout(() => {
      setScene(3);
    }, 5600);

    const t3 = setTimeout(() => {
      setScene(4);
    }, 8400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isIntroActive]);

  const handleEnterStory = () => {
    if (!isPlayingMusic) {
      toggleMusic();
    }
    skipIntro();
  };

  if (!isIntroActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F070E] overflow-hidden"
      >
        {/* 3D Real-time canvas backdrop */}
        <div className="absolute inset-0 z-0">
          <CinematicCanvas
            interactive={scene === 4}
            ringsScale={scene === 1 ? 0.8 : scene === 2 ? 1.25 : 1.05}
            ringsPosition={[0, scene >= 3 ? -0.4 : 0.1, 0]}
            showArch={scene >= 1}
            particleCount={scene === 1 ? 120 : 200}
            petalCount={scene >= 2 ? 50 : 25}
          />
        </div>

        {/* Ambient Volumetric Radial Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#351018]/50 to-[#1F070E]/90 pointer-events-none z-10" />

        {/* Top Controls: Sound & Skip */}
        <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between">
          {/* Sound control */}
          <button
            onClick={toggleMusic}
            aria-label={isPlayingMusic ? 'Mute romantic music' : 'Play romantic music'}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-wine gold-border text-gold-light hover:text-white transition-all text-xs tracking-wider uppercase backdrop-blur-md"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-gold-champagne animate-pulse" />
                <span>Music Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-blush" />
                <span>Enable Music</span>
              </>
            )}
          </button>

          {/* Skip Intro button */}
          <button
            onClick={handleEnterStory}
            className="group flex items-center gap-2 px-5 py-2 rounded-full glass-burgundy gold-border text-gold-light hover:bg-[#641B2B] hover:text-white transition-all text-xs tracking-widest uppercase font-medium shadow-gold-glow"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Central Narrative Overlays by Scene */}
        <div className="relative z-20 max-w-4xl px-6 text-center flex flex-col items-center">
          {/* SCENE 1: The Anticipation */}
          {scene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.3em]">
                <Sparkles className="w-3 h-3 text-gold-champagne" />
                <span>Chapter I — The Destiny</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-cormorant italic tracking-wide text-rose-blush font-light">
                When destiny orchestrates a timeless love...
              </h2>
              <p className="text-xs md:text-sm text-gold-light/70 tracking-[0.25em] uppercase">
                A golden symphony begins
              </p>
            </motion.div>
          )}

          {/* SCENE 2: The 3D Reveal */}
          {scene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
              transition={{ duration: 1.2 }}
              className="space-y-3 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.3em]">
                <Heart className="w-3 h-3 text-rose-antique fill-rose-antique animate-pulse" />
                <span>Twin Hearts Intertwined</span>
              </div>
              <p className="text-xl md:text-3xl font-cormorant italic text-gold-shimmer">
                Two souls bound by love, crafted for eternity
              </p>
            </motion.div>
          )}

          {/* SCENE 3 & 4: Name Reveal & Enter Button */}
          {scene >= 3 && (
            <motion.div
              key="scene-3-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 md:space-y-8"
            >
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.4em' }}
                animate={{ opacity: 1, letterSpacing: '0.25em' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="text-xs md:text-sm font-semibold text-gold-champagne uppercase tracking-[0.25em]"
              >
                {config.tagline}
              </motion.div>

              {/* Groom's Name: KISHORE prominent with Bride's Name */}
              <div className="py-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cormorant font-bold tracking-wider text-gold-shimmer drop-shadow-[0_4px_25px_rgba(216,183,121,0.5)]">
                    {config.groom.firstName}
                  </h1>

                  <div className="flex items-center justify-center gap-4 text-gold-champagne">
                    <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-gold-champagne" />
                    <span className="font-script text-3xl md:text-5xl text-rose-blush">&amp;</span>
                    <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-gold-champagne" />
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant tracking-wide text-ivory-warm font-light">
                    {config.bride.firstName}
                  </h2>
                </motion.div>
              </div>

              {/* Royal Mandap Portrait Reveal in Cinematic Intro */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="flex justify-center"
              >
                <div className="relative w-28 sm:w-36 h-36 sm:h-44 rounded-full sm:rounded-t-full overflow-hidden p-1 glass-burgundy border-2 border-gold-champagne shadow-gold-glow-lg">
                  <img
                    src="/images/kishore_shrika_royal.png"
                    alt="Kishore G & Shrika Arul A Royal Union"
                    className="w-full h-full object-cover rounded-full sm:rounded-t-full transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F070E]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Subheading & Configurable Date */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-2"
              >
                <p className="text-sm md:text-lg font-cormorant italic text-rose-petal">
                  "{config.subtagline}"
                </p>
                <div className="text-xs md:text-sm text-gold-champagne/90 tracking-widest uppercase">
                  {config.weddingDateFormatted}
                </div>
              </motion.div>

              {/* SCENE 4: Interactive ENTER OUR STORY CTA */}
              {scene === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <button
                    onClick={handleEnterStory}
                    className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-[#D8B779] via-[#F3E5C8] to-[#D8B779] text-[#2C1B1B] font-cormorant text-xl tracking-[0.2em] font-bold uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span>ENTER OUR STORY</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    {/* Glowing highlight */}
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Bottom scene progress indicator dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setScene(s as any)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                scene === s
                  ? 'w-8 bg-gold-champagne shadow-gold-glow'
                  : 'w-2 bg-gold-champagne/30 hover:bg-gold-champagne/60'
              }`}
              aria-label={`Jump to scene ${s}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
