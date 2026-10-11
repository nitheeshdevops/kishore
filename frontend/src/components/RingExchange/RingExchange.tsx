import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Zap, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import { WeddingRings } from '../Scene3D/WeddingRings';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export const RingExchange: React.FC = () => {
  const { config } = useWedding();
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(20);
  const [isExchanged, setIsExchanged] = useState<boolean>(false);
  const [exchangeCount, setExchangeCount] = useState<number>(0);

  const triggerRingExchange = () => {
    setIsExchanged(true);
    setExchangeCount((prev) => prev + 1);

    // 20x Golden Ring Confetti Burst
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#D8B779', '#F4D998', '#EBC3C5', '#FFF8EF'],
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#D8B779', '#F4D998', '#EBC3C5', '#B66B78'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const resetExchange = () => {
    setIsExchanged(false);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#2D0B15] to-[#1F070E] overflow-hidden">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold-champagne/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
          <span>Interactive 3D Ceremony</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
          The Sacred Ring Exchange
        </h2>

        <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic max-w-2xl mx-auto mb-8">
          "Kishore places the diamond solitaire upon Shrika’s finger, as Shrika crowns Kishore with pure gold."
        </p>

        {/* 3D Ring Exchange Interactive Stage */}
        <div className="relative max-w-3xl mx-auto h-[380px] sm:h-[440px] rounded-3xl glass-burgundy border-2 border-gold-champagne/40 shadow-burgundy-deep overflow-hidden">
          {/* Couple Photo Floating Watermarks in Stage Background */}
          <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-16 pointer-events-none opacity-20">
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden border-2 border-gold-champagne/40">
              <img src="/images/kishore_shrika_candid.png" alt="Kishore" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden border-2 border-gold-champagne/40">
              <img src="/images/kishore_shrika_arch.png" alt="Shrika" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Interactive R3F Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 0.2, 4.2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.8} color="#641B2B" />
            <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFF1D0" />
            <directionalLight position={[-4, 3, 2]} intensity={1.2} color="#EBC3C5" />
            <pointLight position={[0, 0, 1]} intensity={2} color="#FCE8B3" />

            <Float speed={2} rotationIntensity={0.25} floatIntensity={0.35}>
              <WeddingRings
                scale={1.35}
                position={[0, 0, 0]}
                interactive={true}
                exchangeMode={true}
                speedMultiplier={speedMultiplier}
              />
            </Float>
          </Canvas>

          {/* Dynamic Ring Labels Overlay */}
          <div className="absolute top-6 inset-x-8 flex items-center justify-between pointer-events-none text-xs sm:text-sm uppercase tracking-widest text-gold-light font-cormorant font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-champagne animate-ping" />
              <span>Kishore's Band</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Shrika's Solitaire</span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-blush animate-ping" />
            </div>
          </div>

          {/* Exchanged Banner Overlay */}
          <AnimatePresence>
            {isExchanged && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-6 inset-x-6 sm:inset-x-12 py-3 px-6 rounded-2xl glass-wine border border-gold-champagne/60 text-center shadow-gold-glow backdrop-blur-md"
              >
                <div className="flex items-center justify-center gap-2 text-gold-champagne mb-1">
                  <Heart className="w-4 h-4 fill-rose-blush text-rose-blush animate-pulse" />
                  <span className="font-cormorant text-xl sm:text-2xl font-bold text-gold-shimmer">
                    {config.groom.firstName} &amp; {config.bride.firstName} — Rings Exchanged!
                  </span>
                  <Heart className="w-4 h-4 fill-rose-blush text-rose-blush animate-pulse" />
                </div>
                <p className="text-xs text-rose-blush/90 font-cormorant italic">
                  Two rings locked in eternal harmony • Vows sealed forever
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls: 20x Exchange Button & Speed Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Main 20x Exchange Action Button */}
          <button
            onClick={triggerRingExchange}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#D8B779] via-[#F3E5C8] to-[#D8B779] text-[#2C1B1B] font-cormorant text-xl tracking-[0.15em] font-bold uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 cursor-pointer"
          >
            <Zap className="w-5 h-5 text-[#641B2B] group-hover:scale-125 transition-transform" />
            <span>Exchange Rings (20x Magic)</span>
          </button>

          {/* Speed Presets (1x, 5x, 20x) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full glass-burgundy border border-gold-champagne/30 text-xs">
            <span className="px-3 text-gold-champagne uppercase tracking-wider text-[10px] font-semibold">Speed:</span>
            {[1, 5, 20].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                  speedMultiplier === spd
                    ? 'bg-gold-champagne text-[#2C1B1B] shadow-sm'
                    : 'text-ivory-warm/70 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Reset button */}
          {isExchanged && (
            <button
              onClick={resetExchange}
              className="p-3.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all"
              title="Reset ceremony"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {exchangeCount > 0 && (
          <p className="mt-4 text-xs text-gold-champagne/80 tracking-widest uppercase">
            Ceremony Blessed {exchangeCount} {exchangeCount === 1 ? 'time' : 'times'} by loved ones ✨
          </p>
        )}
      </div>
    </section>
  );
};
