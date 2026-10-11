import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Quote, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const StoryTimeline: React.FC = () => {
  const { config } = useWedding();

  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F070E] via-[#351018] to-[#1F070E] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-burgundy-royal/20 via-gold-champagne/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-wine border border-gold-champagne/30 text-gold-champagne text-xs uppercase tracking-[0.25em] mb-4">
            <Heart className="w-3.5 h-3.5 fill-rose-blush text-rose-blush" />
            <span>Our Journey of Love</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-gold-shimmer mb-4">
            A Love Story in Three Dimensions
          </h2>

          <p className="text-base sm:text-lg text-rose-blush/80 font-cormorant italic">
            "Every step of our path was written in the stars, leading us to this beautiful tomorrow."
          </p>

          <div className="w-24 h-0.5 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold-champagne to-transparent" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Central Gold Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gold-champagne/10 via-gold-champagne/60 to-gold-champagne/10" />

          {/* Timeline Milestones */}
          <div className="space-y-16 md:space-y-24">
            {config.milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-16`}
                >
                  {/* Image Card */}
                  <div className="w-full md:w-1/2">
                    <div className="relative group overflow-hidden rounded-2xl p-2 glass-wine border border-gold-champagne/30 shadow-burgundy-deep hover:border-gold-champagne transition-all duration-500">
                      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl">
                        <img
                          src={milestone.imageUrl}
                          alt={milestone.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F070E] via-transparent to-transparent opacity-60" />

                        {/* Location Tag */}
                        {milestone.location && (
                          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-burgundy border border-gold-champagne/30 text-gold-light text-xs backdrop-blur-md">
                            <MapPin className="w-3.5 h-3.5 text-gold-champagne" />
                            <span>{milestone.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-burgundy border-2 border-gold-champagne items-center justify-center shadow-gold-glow z-20">
                    <Sparkles className="w-5 h-5 text-gold-champagne" />
                  </div>

                  {/* Content Narrative Card */}
                  <div className="w-full md:w-1/2 text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-champagne/10 border border-gold-champagne/30 text-gold-champagne text-xs font-semibold tracking-widest uppercase">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{milestone.year} • {milestone.date}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-cormorant font-bold text-ivory-warm">
                      {milestone.title}
                    </h3>

                    <h4 className="text-sm uppercase tracking-widest text-rose-blush font-medium">
                      {milestone.subtitle}
                    </h4>

                    <p className="text-sm sm:text-base text-ivory-warm/85 leading-relaxed font-light">
                      {milestone.description}
                    </p>

                    {milestone.quote && (
                      <div className="p-4 rounded-xl glass-burgundy border-l-2 border-gold-champagne mt-4 flex items-start gap-3">
                        <Quote className="w-5 h-5 text-gold-champagne flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-cormorant italic text-gold-light">
                          {milestone.quote}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
