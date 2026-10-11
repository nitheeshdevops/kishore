import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  MapPin,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import type { GalleryPhoto } from '../../types';

export const PhotoGallery: React.FC = () => {
  const { config } = useWedding();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'portraits', label: 'Royal Portraits' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'candid', label: 'Candid Moments' },
    { id: 'moments', label: 'Vows & Rings' },
  ];

  const filteredPhotos = config.gallery.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const activePhoto: GalleryPhoto | null =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] || null : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  // Keyboard navigation for accessible lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#1F070E] overflow-hidden">
      {/* Decorative Golden Arch Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-champagne/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Poetry</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            Pre-Wedding Editorial Gallery
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic">
            "A collection of timeless frames capturing glances, smiles, and the quiet promise of tomorrow."
          </p>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-gold-champagne to-gold-light text-[#2C1B1B] shadow-gold-glow'
                  : 'glass-burgundy text-ivory-warm/80 hover:text-gold-champagne border border-gold-champagne/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isTall = photo.aspectRatio === 'portrait';
            const isWide = photo.aspectRatio === 'landscape';

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-2xl glass-wine border border-gold-champagne/25 cursor-pointer shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500 ${
                  isTall ? 'sm:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isTall ? 'h-[460px] sm:h-full' : isWide ? 'h-72' : 'h-80'
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F070E] via-[#1F070E]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Hover Information Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs uppercase tracking-widest text-gold-champagne font-medium">
                        {photo.category}
                      </span>
                      <div className="w-8 h-8 rounded-full glass-burgundy border border-gold-champagne/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-3.5 h-3.5 text-gold-champagne" />
                      </div>
                    </div>

                    <h3 className="font-cormorant text-2xl font-bold text-ivory-warm">
                      {photo.title}
                    </h3>

                    {photo.caption && (
                      <p className="text-xs text-rose-blush/90 italic font-cormorant mt-1">
                        "{photo.caption}"
                      </p>
                    )}

                    {photo.location && (
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-gold-light/80">
                        <MapPin className="w-3 h-3 text-gold-champagne" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Accessible Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && activePhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
              <div className="text-gold-light text-xs uppercase tracking-widest">
                <span>{lightboxIndex + 1}</span>
                <span className="opacity-50 mx-2">/</span>
                <span>{filteredPhotos.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne transition-all"
                  aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClose}
                  className="p-2.5 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne transition-all"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne hover:scale-110 transition-all"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Display Image */}
            <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
              <motion.img
                key={activePhoto.id}
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.35 : 1 }}
                transition={{ duration: 0.3 }}
                className={`max-w-full max-h-[75vh] object-contain rounded-lg border border-gold-champagne/30 shadow-[0_0_50px_rgba(216,183,121,0.25)] transition-transform duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Photo Caption & Location */}
              <div className="mt-4 text-center max-w-xl">
                <h3 className="font-cormorant text-2xl font-bold text-gold-shimmer">
                  {activePhoto.title}
                </h3>
                {activePhoto.caption && (
                  <p className="text-sm font-cormorant italic text-ivory-warm/90 mt-1">
                    "{activePhoto.caption}"
                  </p>
                )}
                {activePhoto.location && (
                  <p className="text-xs text-gold-champagne mt-1 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activePhoto.location}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-champagne hover:border-gold-champagne hover:scale-110 transition-all"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
