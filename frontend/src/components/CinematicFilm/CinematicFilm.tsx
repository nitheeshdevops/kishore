import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const CinematicFilm: React.FC = () => {
  const { config } = useWedding();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((e) => {
        console.warn('Video play prevented:', e);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="film" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#351018] to-[#1F070E] overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-champagne/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematography</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            The Pre-Wedding Film
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic">
            "{config.videoTeaser.subtitle}"
          </p>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Video Theater Frame */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Outer Gold Filigree Glow Frame */}
          <div className="p-3 sm:p-5 rounded-3xl glass-burgundy border-2 border-gold-champagne/40 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/90 shadow-2xl">
              {/* Video Element */}
              <video
                ref={videoRef}
                src={config.videoTeaser.videoUrl}
                poster={config.videoTeaser.posterUrl}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Overlay Poster & Initial Play Button */}
              {!hasStarted && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/25 cursor-pointer transition-colors duration-300"
                >
                  {/* Glowing Animated Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-br from-gold-light via-gold-champagne to-gold-deep flex items-center justify-center shadow-gold-glow text-[#2C1B1B] cursor-pointer"
                    aria-label="Play pre-wedding film"
                  >
                    <Play className="w-8 sm:w-10 h-8 sm:h-10 ml-1 fill-[#2C1B1B]" />
                    <span className="absolute -inset-2 rounded-full border border-gold-champagne/60 animate-ping opacity-40 pointer-events-none" />
                  </motion.button>

                  <div className="mt-6 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-champagne font-semibold block mb-1">
                      {config.videoTeaser.title}
                    </span>
                    <span className="text-xs text-rose-blush/80">
                      Duration: {config.videoTeaser.duration}
                    </span>
                  </div>
                </div>
              )}

              {/* Custom Player Controls Bar (Visible during playback) */}
              {hasStarted && (
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full glass-burgundy text-gold-champagne hover:text-white"
                      aria-label={isPlaying ? 'Pause film' : 'Play film'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full glass-burgundy text-gold-champagne hover:text-white"
                      aria-label={isMuted ? 'Unmute film' : 'Mute film'}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="text-xs text-gold-light/80 hidden sm:inline">
                      {config.videoTeaser.title}
                    </span>
                  </div>

                  <button
                    onClick={handleFullScreen}
                    className="p-2 rounded-full glass-burgundy text-gold-champagne hover:text-white"
                    aria-label="Full screen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
