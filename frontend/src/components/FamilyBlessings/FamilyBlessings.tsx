import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const FamilyBlessings: React.FC = () => {
  const { config } = useWedding();

  return (
    <section id="blessings" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF8EF] via-[#FAF3E7] to-[#F4EADA] text-[#2C1B1B] overflow-hidden">
      {/* Decorative Warm Golden Floral Flourishes */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#1F070E] to-transparent opacity-10" />
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#1F070E] to-transparent opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBC3C5]/40 border border-[#B66B78]/40 text-[#641B2B] text-xs uppercase tracking-[0.25em] mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#B66B78] text-[#B66B78]" />
            <span>Sacred Family Blessings</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-bold text-[#641B2B] mb-4">
            Words of Grace &amp; Wisdom
          </h2>

          <p className="text-base sm:text-lg text-[#2C1B1B]/80 font-cormorant italic">
            "Carried on the prayers of those who guided our footsteps, our journey begins in love and honor."
          </p>

          {/* Golden Filigree Divider */}
          <div className="flex items-center justify-center gap-4 my-6">
            <span className="w-16 h-px bg-[#D8B779]" />
            <Sparkles className="w-4 h-4 text-[#A37A33]" />
            <span className="w-16 h-px bg-[#D8B779]" />
          </div>
        </div>

        {/* Blessings Grid - Groom's Side & Bride's Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {config.familyBlessings.map((blessing, idx) => {
            const isGroom = blessing.side === 'groom';

            return (
              <motion.div
                key={blessing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative p-8 sm:p-12 rounded-3xl bg-white/80 border border-[#D8B779]/40 shadow-xl hover:shadow-2xl hover:border-[#D8B779] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Corner Floral Accent */}
                <div className="absolute top-4 right-4 text-[#D8B779]/40 font-serif text-3xl select-none">
                  ❦
                </div>

                <div>
                  {/* Side Tag */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#641B2B]/10 text-[#641B2B] text-xs uppercase tracking-widest font-semibold mb-4">
                    <span>{blessing.title}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#641B2B] mb-2">
                    {blessing.members}
                  </h3>

                  <h4 className="text-xs uppercase tracking-widest text-[#B66B78] font-medium mb-6">
                    {blessing.relationship}
                  </h4>

                  {/* Blessing Message */}
                  <div className="relative pl-6 border-l-2 border-[#D8B779] my-6">
                    <Quote className="absolute -left-3 -top-2 w-5 h-5 text-[#D8B779] fill-white" />
                    <p className="font-cormorant text-lg sm:text-xl text-[#2C1B1B] italic leading-relaxed">
                      "{blessing.blessing}"
                    </p>
                  </div>
                </div>

                {/* Footer Signature */}
                <div className="pt-6 border-t border-[#D8B779]/20 flex items-center justify-between">
                  <span className="font-script text-2xl text-[#641B2B]">
                    {isGroom ? 'Forever in love, Kishore' : 'With eternal devotion'}
                  </span>
                  <Heart className="w-4 h-4 text-[#B66B78] fill-[#B66B78]/40" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
