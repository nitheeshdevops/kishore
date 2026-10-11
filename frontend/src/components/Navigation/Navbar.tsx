import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  Menu,
  X,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const Navbar: React.FC = () => {
  const {
    config,
    isPlayingMusic,
    toggleMusic,
    replayIntro,
    setIsConfigDrawerOpen,
  } = useWedding();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Rings (20x)', href: '#ring-exchange' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'The Film', href: '#film' },
    { name: 'Countdown', href: '#countdown' },
    { name: 'Events', href: '#events' },
    { name: 'Blessings', href: '#blessings' },
    { name: 'Wishes', href: '#wishes' },
  ];

  const groomInitial = config.groom.firstName ? config.groom.firstName.charAt(0) : 'K';
  const brideInitial = config.bride.firstName && !config.bride.firstName.startsWith('[')
    ? config.bride.firstName.charAt(0)
    : 'A';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1F070E]/98 backdrop-blur-2xl border-b border-gold-champagne/35 py-3 shadow-burgundy-deep'
            : 'bg-gradient-to-b from-[#1F070E]/90 via-[#1F070E]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3 cursor-pointer"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 rounded-full border border-gold-champagne/40 flex items-center justify-center bg-burgundy-royal/40 group-hover:border-gold-champagne transition-all shadow-gold-glow">
              <span className="font-cormorant font-bold text-lg text-gold-shimmer">
                {groomInitial}&amp;{brideInitial}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-cormorant text-lg tracking-widest text-ivory-warm font-medium">
                {config.groom.firstName} &amp; {config.bride.firstName}
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-gold-champagne uppercase">
                {config.hashtag}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-ivory-warm/80 hover:text-gold-champagne transition-colors duration-200 relative group py-1"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-champagne group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleMusic}
              className="p-2 sm:px-3 sm:py-2 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all flex items-center gap-2 text-xs"
              title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
              aria-label="Toggle background music"
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-4 h-4 text-gold-champagne animate-pulse" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Sound On</span>
                  {/* Wave equalizer bars */}
                  <span className="hidden sm:flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-gold-champagne animate-pulse h-2" />
                    <span className="w-0.5 bg-gold-champagne animate-pulse h-3.5 delay-100" />
                    <span className="w-0.5 bg-gold-champagne animate-pulse h-2.5 delay-200" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-blush" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase">Sound Off</span>
                </>
              )}
            </button>

            {/* Replay Cinematic Intro */}
            <button
              onClick={replayIntro}
              className="p-2 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all"
              title="Replay Cinematic Intro"
              aria-label="Replay 3D cinematic opening"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Live Customizer Drawer Button */}
            <button
              onClick={() => setIsConfigDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-gold-champagne/20 to-burgundy-royal border border-gold-champagne/40 text-gold-champagne hover:border-gold-champagne hover:text-white transition-all text-xs tracking-wider"
              title="Customize Wedding Details"
              aria-label="Open customization drawer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-medium uppercase">Customize</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 lg:hidden glass-burgundy border-b border-gold-champagne/30 p-6 shadow-burgundy-deep backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-ivory-warm hover:text-gold-champagne transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs text-gold-champagne">
                <span>{config.weddingDateFormatted}</span>
                <span>{config.hashtag}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
