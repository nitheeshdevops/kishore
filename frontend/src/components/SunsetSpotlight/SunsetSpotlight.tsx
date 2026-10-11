import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Heart, Film, ArrowRight, Sun, Music } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const SunsetSpotlight: React.FC = () => {
  const { config } = useWedding();
  const [isLoved, setIsLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(384);
  const [sparkleBurst, setSparkleBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  // 3D Tilt Card physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerSparkles = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBurst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
    }));

    setSparkleBurst((prev) => [...prev, ...newBurst]);
    if (!isLoved) {
      setIsLoved(true);
      setLoveCount((c) => c + 1);
    }

    setTimeout(() => {
      setSparkleBurst((prev) => prev.filter((p) => !newBurst.some((nb) => nb.id === p.id)));
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#2A0B14] to-[#1F070E] overflow-hidden">
      {/* Background Volumetric Sunset Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-[#D8B779]/15 via-[#E67E22]/10 to-[#991B1B]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Golden Embers in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold-champagne blur-[1px] animate-pulse" />
        <div className="absolute top-3/4 right-16 w-3 h-3 rounded-full bg-[#E67E22] blur-[1px] animate-ping opacity-40" />
        <div className="absolute bottom-10 left-1/3 w-1.5 h-1.5 rounded-full bg-gold-light animate-bounce opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive 3D Perspective Card with Attractive Animations */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              style={{ perspective: 1200 }}
              className="relative w-full max-w-lg cursor-pointer"
            >
              <motion.div
                ref={cardRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={triggerSparkles}
                className="group relative rounded-3xl p-3 sm:p-5 glass-burgundy border-2 border-gold-champagne/40 shadow-burgundy-deep hover:border-gold-champagne transition-colors duration-500 overflow-hidden"
              >
                {/* Outer Rotating Gradient Border Shimmer */}
                <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-gold-champagne/40 via-[#E67E22]/30 to-gold-deep/40 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Photo Display with Animated Sunbeam and Ken Burns Drift */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/80 shadow-2xl">
                  <motion.img
                    src="/images/kishore_shrika_dunes_sunset.png"
                    alt="Kishore G & Shrika Arul A — Desert Sunset Couture"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />

                  {/* Sunset Solar Flare Light Leak Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/10 transition-colors duration-500 pointer-events-none" />

                  {/* Pulsing Sunbeam Glow between the Couple */}
                  <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-radial from-[#F9E79F]/30 via-[#E67E22]/20 to-transparent rounded-full blur-2xl animate-pulse pointer-events-none" />

                  {/* Floating Gold Sand Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <span className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-gold-champagne animate-ping opacity-60" />
                    <span className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-gold-light animate-pulse opacity-80" />
                    <span className="absolute bottom-1/4 left-1/2 w-1 h-1 rounded-full bg-[#E67E22] animate-bounce opacity-70" />
                  </div>

                  {/* Ornate Gold Crown Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-champagne/40 text-gold-champagne text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-[#E67E22] animate-spin" style={{ animationDuration: '16s' }} />
                      <span>Desert Twilight Couture</span>
                    </div>
                  </div>

                  {/* Interactive Heart Button on Photo */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLoved(!isLoved);
                        setLoveCount((c) => (isLoved ? c - 1 : c + 1));
                      }}
                      className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-champagne/40 text-gold-champagne hover:scale-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                      aria-label="Send love"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isLoved ? 'text-red-500 fill-red-500' : 'text-gold-champagne'
                        }`}
                      />
                      <span className="text-[11px] font-bold text-ivory-warm">{loveCount}</span>
                    </button>
                  </div>

                  {/* Romantic Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-champagne font-bold block mb-1">
                      Save The Date — {config.weddingDateFormatted}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-ivory-warm leading-tight drop-shadow">
                      {config.groom.firstName} &amp; {config.bride.firstName}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-blush/90 font-cormorant italic mt-1 line-clamp-2">
                      "Two hearts standing steadfast under the amber twilight, bound forever in the sands of time."
                    </p>
                  </div>

                  {/* Sparkle Click Burst */}
                  {sparkleBurst.map((sb) => (
                    <motion.div
                      key={sb.id}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1.4, 0],
                        opacity: [1, 1, 0],
                        y: -30,
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      style={{ top: sb.y, left: sb.x }}
                      className="absolute pointer-events-none"
                    >
                      <Sparkles className="w-5 h-5 text-gold-champagne fill-gold-champagne drop-shadow-[0_0_8px_rgba(216,183,121,0.8)]" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Direct Link to Song / Film */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
              <span>Cinematic Editorial</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-cormorant font-bold text-gold-shimmer leading-tight">
              A Promise Etched in the Sands of Time
            </h2>

            <p className="text-base sm:text-lg text-rose-blush/90 font-cormorant italic leading-relaxed">
              "As the golden sun sets across the dunes, Kishore and Shrika stand side by side in timeless black couture — a portrait of quiet strength, boundless affection, and a promise that outshines the stars."
            </p>

            {/* Song Feature Box */}
            <div className="p-4 rounded-2xl glass-wine border border-gold-champagne/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-champagne/20 border border-gold-champagne/50 flex items-center justify-center text-gold-champagne shrink-0">
                <Music className="w-6 h-6 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-bold block">
                  Featured Soundtrack
                </span>
                <p className="text-sm font-semibold text-ivory-warm truncate">
                  InspireStudio Wedding Love Tone
                </p>
                <p className="text-xs text-rose-blush/80">
                  Venkat &amp; Anitha Invite Song • Romantic Flute &amp; Love Symphony
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('film')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-champagne to-gold-light text-[#2C1B1B] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-gold-glow cursor-pointer"
              >
                <Film className="w-4 h-4" />
                <span>Watch The Pre-Wedding Film</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollToSection('ring-exchange')}
                className="px-6 py-3 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:text-white hover:border-gold-champagne text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Ring Ceremony</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
