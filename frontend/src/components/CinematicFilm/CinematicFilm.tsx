import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Play,
  RotateCcw,
  Sparkles,
  Music,
  ExternalLink,
  Share2,
  Volume2,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const CinematicFilm: React.FC = () => {
  const { config, pauseMusic } = useWedding();
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const youtubeId = config.videoTeaser.youtubeId || 'FWH-fg0ZW-o';
  const youtubeUrl = `https://youtu.be/${youtubeId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`;

  const handleStartFilm = () => {
    pauseMusic();
    setIsPlayingYouTube(true);
  };

  const handleResetToPoster = () => {
    setIsPlayingYouTube(false);
  };

  const handleShare = () => {
    const text = `Watch the official Pre-Wedding Film of Kishore & Shrika: ${youtubeUrl}`;
    if (navigator.share) {
      navigator.share({
        title: 'Kishore & Shrika Pre-Wedding Film',
        text,
        url: youtubeUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <section id="film" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#351018] to-[#1F070E] overflow-hidden">
      {/* Background Volumetric Gold Glow & Light Pillars */}
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
            "Under the golden twilight of eternal sands, Kishore &amp; Shrika invite you into their cinematic journey."
          </p>

          {/* Song Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-gold-champagne/25 text-gold-light text-xs">
            <Music className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
            <span>InspireStudio Official Wedding Invite Song &amp; Romance BGM</span>
          </div>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Video Theater Frame */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Animated Golden Filigree Border */}
          <div className="relative p-3 sm:p-5 rounded-3xl glass-burgundy border-2 border-gold-champagne/40 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-champagne/70 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-champagne/70 pointer-events-none" />

            {/* Inner Video Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                {isPlayingYouTube ? (
                  /* YouTube Embed Player */
                  <motion.div
                    key="youtube-player"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <iframe
                      src={embedUrl}
                      title="Kishore & Shrika Pre-Wedding Film"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />

                    {/* Floating Overlay Controls on Top of Player */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-auto">
                      <button
                        onClick={handleResetToPoster}
                        className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-gold-champagne hover:text-white border border-gold-champagne/40 text-xs flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md"
                        title="Return to poster frame"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Poster View</span>
                      </button>

                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-red-700/80 hover:bg-red-700 text-white text-xs flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md"
                        title="Open in YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">YouTube</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Cinema Poster Preview with Desert Sunset Animation */
                  <motion.div
                    key="poster-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full cursor-pointer group/poster"
                    onClick={handleStartFilm}
                  >
                    {/* High-Resolution Desert Sunset Couple Photo */}
                    <img
                      src="/images/kishore_shrika_dunes_sunset.png"
                      alt="Kishore & Shrika Desert Sunset Vows"
                      className="w-full h-full object-cover object-center group-hover/poster:scale-105 transition-transform duration-1000 ease-out"
                    />

                    {/* Warm Solar Flare & Lens Flare Animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 group-hover/poster:via-black/20 transition-colors duration-500" />

                    {/* Animated Sunbeam Pulse */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-[#F5E6C8]/25 via-[#D8B779]/15 to-transparent rounded-full blur-2xl animate-pulse pointer-events-none" />

                    {/* Golden Particle / Sparkle Accents */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold-champagne blur-[1px] animate-ping opacity-60" />
                      <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-gold-light blur-[1px] animate-pulse opacity-75" />
                      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-gold-champagne animate-bounce opacity-50" />
                    </div>

                    {/* Top Quality Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-champagne/40 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold-champagne flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-gold-champagne" />
                        InspireStudio 4K Ultra HD
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#991B1B]/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                        Official Song
                      </span>
                    </div>

                    {/* Center Animated Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-deep flex items-center justify-center shadow-gold-glow text-[#2C1B1B] cursor-pointer"
                      >
                        <Play className="w-8 sm:w-12 h-8 sm:h-12 ml-1 fill-[#2C1B1B]" />
                        {/* Double Concentric Pulsing Ripples */}
                        <span className="absolute -inset-3 rounded-full border-2 border-gold-champagne/60 animate-ping opacity-50 pointer-events-none" />
                        <span className="absolute -inset-6 rounded-full border border-gold-champagne/30 animate-pulse pointer-events-none" />
                      </motion.div>

                      {/* Film Title & Description Overlay */}
                      <div className="mt-6 text-center max-w-lg px-4 bg-black/40 backdrop-blur-sm rounded-2xl py-3 border border-white/10">
                        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-champagne font-bold block mb-1 drop-shadow">
                          {config.videoTeaser.title}
                        </span>
                        <p className="text-[11px] sm:text-xs text-rose-blush/90 line-clamp-1 font-cormorant italic">
                          Click to play with InspireStudio official romance song
                        </p>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex items-center justify-between text-xs text-rose-blush/80">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-champagne/30">
                        <Volume2 className="w-3.5 h-3.5 text-gold-champagne" />
                        <span className="text-[11px] text-gold-light font-medium">Original Wedding Invite Audio</span>
                      </div>

                      <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-champagne/30 text-[11px] text-gold-champagne font-medium">
                        Duration: {config.videoTeaser.duration}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Film Action Bar & Credits */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl glass-wine border border-gold-champagne/25">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 flex items-center justify-center text-gold-champagne">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-cormorant font-bold text-lg text-ivory-warm">
                  InspireStudio Pre-Wedding Song
                </h4>
                <p className="text-xs text-rose-blush/80">
                  Venkat &amp; Anitha Wedding Invite BGM | Kishore &amp; Shrika Edition
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-full glass-burgundy hover:bg-gold-champagne/20 text-gold-champagne border border-gold-champagne/40 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied!' : 'Share Film'}</span>
              </button>

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-gradient-to-r from-gold-champagne to-gold-light text-[#2C1B1B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-gold-glow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
