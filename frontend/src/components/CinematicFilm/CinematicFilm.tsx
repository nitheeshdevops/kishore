import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Music,
  Share2,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

interface FilmScene {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  imageUrl: string;
  location: string;
}

export const CinematicFilm: React.FC = () => {
  const { config, isPlayingMusic, playMusic, pauseMusic, toggleMusic } = useWedding();
  const [isPlayingFilm, setIsPlayingFilm] = useState<boolean>(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Exclusive cinematic scenes starring Kishore & Shrika
  const filmScenes: FilmScene[] = [
    {
      id: 'scene-1',
      title: 'The Royal Mandap Union',
      subtitle: 'Our Forever Begins',
      caption: 'Adorned in royal gold and scarlet silk, Kishore & Shrika step across the sacred threshold united in holy matrimony.',
      imageUrl: '/images/kishore_shrika_royal.png',
      location: 'The Royal Mandapam • June 10, 2032',
    },
    {
      id: 'scene-2',
      title: 'Desert Sunset Couture',
      subtitle: 'A Promise Etched in Sands of Time',
      caption: 'Against the golden desert dunes bathed in warm amber twilight, Kishore & Shrika seal their eternal promise.',
      imageUrl: '/images/kishore_shrika_dunes_sunset.png',
      location: 'The Golden Dunes',
    },
    {
      id: 'scene-3',
      title: 'Ocean Symphony Double Exposure',
      subtitle: 'Two Minds, One Symphony',
      caption: 'Back to back by crashing waves, with peaceful closed eyes amidst the sky. Their minds meet in eternal serenity.',
      imageUrl: '/images/kishore_shrika_double_exposure.png',
      location: 'Coastal Cliffs Promenade',
    },
    {
      id: 'scene-4',
      title: 'The Sacred Seven Vows (Saptapadi)',
      subtitle: 'Bound Around the Holy Agni Fire',
      caption: 'Walking the sacred seven steps hand in hand, swearing eternal devotion and companionship for lifetimes to come.',
      imageUrl: '/images/kishore_shrika_fire.png',
      location: 'Sacred Mandapam Fire',
    },
    {
      id: 'scene-5',
      title: 'Under the Garden Heritage Arch',
      subtitle: 'Shared Smiles & Gentle Promises',
      caption: 'Under the arched white verandas and blooming plumeria flowers, every quiet glance speaks volumes of gentle care.',
      imageUrl: '/images/kishore_shrika_arch.png',
      location: 'Botanical Heritage Estate',
    },
    {
      id: 'scene-6',
      title: 'Unscripted Laughter & Joy',
      subtitle: 'Two Hearts, Pure Joy',
      caption: 'Unscripted smiles, warm embraces, and pure joy — ready to walk hand in hand forever.',
      imageUrl: '/images/kishore_shrika_candid.png',
      location: 'The Memory Wall',
    },
  ];

  const currentScene = filmScenes[currentSceneIndex];
  const totalDurationSeconds = 73; // 1:13 mins matching the song length

  // Auto-advance scenes and progress timer when playing
  useEffect(() => {
    let interval: any = null;

    if (isPlayingFilm) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingFilm(false);
            return 0;
          }
          return prev + 1.37; // ~73 seconds total
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingFilm]);

  // Sync scene change every ~12 seconds
  useEffect(() => {
    if (!isPlayingFilm) return;

    const sceneTimer = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % filmScenes.length);
    }, 12000);

    return () => clearInterval(sceneTimer);
  }, [isPlayingFilm, filmScenes.length]);

  const handleStartFilm = () => {
    setIsPlayingFilm(true);
    playMusic();
  };

  const handlePauseFilm = () => {
    setIsPlayingFilm(false);
    pauseMusic();
  };

  const handleNextScene = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSceneIndex((prev) => (prev + 1) % filmScenes.length);
  };

  const handlePrevScene = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSceneIndex((prev) => (prev - 1 + filmScenes.length) % filmScenes.length);
  };

  const handleReplay = () => {
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPlayingFilm(true);
    playMusic();
  };

  const handleFullScreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleShare = () => {
    const text = `Watch the official Pre-Wedding Film of Kishore & Shrika! Two hearts, one promise: ${window.location.href}#film`;
    if (navigator.share) {
      navigator.share({
        title: 'Kishore & Shrika Pre-Wedding Film',
        text,
        url: `${window.location.href}#film`,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Format progress seconds
  const currentSeconds = Math.floor((progress / 100) * totalDurationSeconds);
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <section id="film" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#351018] to-[#1F070E] overflow-hidden">
      {/* Background Volumetric Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gold-champagne/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#D8B779]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#991B1B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematography &amp; Love Symphony</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            The Pre-Wedding Film
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/85 font-cormorant italic max-w-2xl mx-auto">
            "A cinematic journey through our sacred vows and stolen glances, starring Kishore &amp; Shrika."
          </p>

          {/* Song Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 border border-gold-champagne/30 text-gold-light text-xs">
            <Music className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
            <span>Soundtrack: InspireStudio Wedding Love Tone (Chiri Thottu • Justin Prabhakaran &amp; Chinmayi Sripada)</span>
          </div>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Video Theater Frame */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Animated Golden Filigree Border */}
          <div
            ref={containerRef}
            className="relative p-3 sm:p-5 rounded-3xl glass-burgundy border-2 border-gold-champagne/40 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500 overflow-hidden"
          >
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-gold-champagne/70 pointer-events-none" />

            {/* Cinema Screen Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="relative w-full h-full"
                >
                  {/* High Resolution Couple Scene Photo */}
                  <img
                    src={currentScene.imageUrl}
                    alt={`${config.groom.firstName} & ${config.bride.firstName} — ${currentScene.title}`}
                    className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow"
                  />

                  {/* Cinematic Letterbox Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50 pointer-events-none" />

                  {/* Pulsing Golden Solar Flare in Center */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-[#F5E6C8]/20 via-[#D8B779]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

                  {/* Floating Golden Stardust Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <span className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold-champagne blur-[1px] animate-ping opacity-60" />
                    <span className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-gold-light blur-[1px] animate-pulse opacity-75" />
                    <span className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-gold-champagne animate-bounce opacity-50" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top Film Badges & Scene Indicator */}
              <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-6 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-gold-champagne/40 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold-champagne flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-gold-champagne" />
                    Kishore &amp; Shrika • 4K Film
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#991B1B]/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Scene {currentSceneIndex + 1} of {filmScenes.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={handleFullScreen}
                    className="p-2 rounded-full bg-black/65 backdrop-blur-md border border-gold-champagne/30 text-gold-champagne hover:text-white transition-all shadow-sm"
                    title="Fullscreen"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prev / Next Scene Nav Arrows */}
              <button
                onClick={handlePrevScene}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-gold-champagne/30 text-gold-champagne hover:scale-110 active:scale-95 transition-all shadow-md z-20"
                aria-label="Previous scene"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNextScene}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-gold-champagne/30 text-gold-champagne hover:scale-110 active:scale-95 transition-all shadow-md z-20"
                aria-label="Next scene"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Central Large Play / Pause Overlay When Not Playing */}
              {!isPlayingFilm && (
                <div
                  onClick={handleStartFilm}
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/40 hover:bg-black/25 cursor-pointer transition-colors duration-300 z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-deep flex items-center justify-center shadow-gold-glow text-[#2C1B1B] cursor-pointer"
                  >
                    <Play className="w-8 sm:w-12 h-8 sm:h-12 ml-1 fill-[#2C1B1B]" />
                    <span className="absolute -inset-3 rounded-full border-2 border-gold-champagne/60 animate-ping opacity-50 pointer-events-none" />
                    <span className="absolute -inset-6 rounded-full border border-gold-champagne/30 animate-pulse pointer-events-none" />
                  </motion.div>

                  <div className="mt-6 text-center max-w-lg px-4 bg-black/50 backdrop-blur-md rounded-2xl py-3 border border-gold-champagne/20">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-champagne font-bold block mb-1 drop-shadow">
                      PLAY KISHORE &amp; SHRIKA CINEMATIC FILM
                    </span>
                    <p className="text-[11px] sm:text-xs text-rose-blush/90 font-cormorant italic">
                      With InspireStudio Official Romantic Wedding Song
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Film Narrative & Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-3 z-20">
                {/* Scene Caption */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-champagne font-bold block">
                      {currentScene.location}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-ivory-warm">
                      {currentScene.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-blush/90 font-cormorant italic line-clamp-1 max-w-2xl">
                      "{currentScene.caption}"
                    </p>
                  </div>

                  {/* Time and Duration Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-xs font-mono text-gold-champagne bg-black/60 px-2.5 py-1 rounded-full border border-gold-champagne/30">
                      {timeFormatted} / 1:13
                    </span>
                  </div>
                </div>

                {/* Film Progress Bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-gold-champagne to-gold-light transition-all duration-300"
                  />
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={isPlayingFilm ? handlePauseFilm : handleStartFilm}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:text-white flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      aria-label={isPlayingFilm ? 'Pause Film' : 'Play Film'}
                    >
                      {isPlayingFilm ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      <span className="hidden sm:inline">{isPlayingFilm ? 'Pause' : 'Play'}</span>
                    </button>

                    <button
                      onClick={toggleMusic}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full glass-burgundy border border-gold-champagne/40 text-gold-champagne hover:text-white flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                      aria-label="Toggle Sound"
                    >
                      {isPlayingMusic ? <Volume2 className="w-4 h-4 text-gold-champagne animate-pulse" /> : <VolumeX className="w-4 h-4 text-rose-blush" />}
                      <span className="hidden sm:inline">{isPlayingMusic ? 'Music On' : 'Music Off'}</span>
                    </button>

                    <button
                      onClick={handleReplay}
                      className="p-2 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-champagne hover:text-white"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scene Thumbnails Quick Jump Dock */}
                  <div className="hidden md:flex items-center gap-1.5">
                    {filmScenes.map((scene, idx) => (
                      <button
                        key={scene.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSceneIndex(idx);
                        }}
                        className={`w-9 h-6 rounded-md overflow-hidden border transition-all ${
                          currentSceneIndex === idx
                            ? 'border-gold-champagne scale-110 shadow-gold-glow'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        title={scene.title}
                      >
                        <img src={scene.imageUrl} alt={scene.title} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Film Action Bar & Credits */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl glass-wine border border-gold-champagne/25">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 flex items-center justify-center text-gold-champagne">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-cormorant font-bold text-lg text-ivory-warm">
                  InspireStudio Pre-Wedding Love Song
                </h4>
                <p className="text-xs text-rose-blush/80">
                  Chiri Thottu (Justin Prabhakaran &amp; Chinmayi Sripada) • Kishore &amp; Shrika Official Soundtrack
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-champagne to-gold-light text-[#2C1B1B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-gold-glow cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied!' : 'Share Film on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
