import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Music,
  HeartHandshake,
  PartyPopper,
  ExternalLink,
  Shirt,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import type { WeddingEvent } from '../../types';

export const WeddingEvents: React.FC = () => {
  const { config } = useWedding();

  const getEventIcon = (type: WeddingEvent['iconType']) => {
    switch (type) {
      case 'music':
        return <Music className="w-5 h-5 text-gold-champagne" />;
      case 'sparkler':
        return <Sparkles className="w-5 h-5 text-gold-champagne" />;
      case 'sacred':
        return <HeartHandshake className="w-5 h-5 text-gold-champagne" />;
      case 'celebration':
        return <PartyPopper className="w-5 h-5 text-gold-champagne" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-champagne" />;
    }
  };

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#2A0E16] to-[#1F070E] overflow-hidden">
      {/* Decorative Ornate Floral Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-champagne/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-burgundy-royal/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ceremonies &amp; Celebrations</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            The Wedding Itinerary
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic">
            "{config.invitationNote}"
          </p>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group p-8 sm:p-10 rounded-3xl glass-burgundy border border-gold-champagne/30 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500 flex flex-col justify-between"
            >
              {/* Top Accent Filigree */}
              <div className="flex items-center justify-between pb-6 border-b border-gold-champagne/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl glass-wine border border-gold-champagne/40 flex items-center justify-center shadow-gold-glow">
                    {getEventIcon(event.iconType)}
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-gold-champagne font-semibold block">
                      Event 0{idx + 1}
                    </span>
                    <span className="text-xs text-rose-blush/80">
                      {event.date}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-champagne/10 border border-gold-champagne/30 text-gold-light text-xs">
                  <Clock className="w-3.5 h-3.5 text-gold-champagne" />
                  <span>{event.time}</span>
                </div>
              </div>

              {/* Event Titles */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-ivory-warm group-hover:text-gold-light transition-colors">
                  {event.name}
                </h3>
                <p className="text-xs sm:text-sm font-cormorant italic text-rose-blush">
                  "{event.tagline}"
                </p>
              </div>

              {/* Venue & Location Details */}
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex items-start gap-3 text-ivory-warm/90">
                  <MapPin className="w-4 h-4 text-gold-champagne flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold block text-gold-light">
                      {event.venueName}
                    </span>
                    <span className="text-xs text-ivory-warm/70 block">
                      {event.address}
                    </span>
                    <span className="text-xs text-gold-champagne/80 block">
                      {event.city}
                    </span>
                  </div>
                </div>

                {/* Dress Code */}
                {event.dressCode && (
                  <div className="flex items-start gap-3 text-ivory-warm/85 bg-white/5 p-3.5 rounded-xl border border-white/5">
                    <Shirt className="w-4 h-4 text-gold-champagne flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold-champagne block">
                        Dress Code: {event.dressCode}
                      </span>
                      {event.dressCodeDescription && (
                        <span className="text-xs text-rose-blush/80 block mt-0.5">
                          {event.dressCodeDescription}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: Get Directions */}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl glass-wine border border-gold-champagne/40 hover:border-gold-champagne hover:bg-gold-champagne hover:text-[#2C1B1B] text-gold-light transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold group/btn"
              >
                <span>View Venue Map &amp; Directions</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
