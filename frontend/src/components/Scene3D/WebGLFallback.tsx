import React from 'react';

export const WebGLFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1F070E] via-[#351018] to-[#1F070E]">
      {/* Radial volumetric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,183,121,0.2)_0%,_transparent_65%)]" />

      {/* Decorative Golden Arch Silhouette */}
      <div className="absolute w-[340px] md:w-[500px] h-[340px] md:h-[500px] border-2 border-gold-champagne/30 rounded-full animate-pulse-subtle" />
      <div className="absolute w-[380px] md:w-[560px] h-[380px] md:h-[560px] border border-gold-champagne/15 rounded-full" />

      {/* Stylized CSS Wedding Rings */}
      <div className="relative flex items-center justify-center animate-gentle-drift">
        {/* Ring 1 */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-[7px] border-[#F2D794] shadow-[0_0_25px_rgba(242,215,148,0.6)] transform -rotate-12 translate-x-4" />
        {/* Ring 2 with Diamond */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-[#EED38A] shadow-[0_0_25px_rgba(238,211,138,0.5)] transform rotate-12 -translate-x-4">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-[0_0_15px_#fff]" />
        </div>
      </div>

      {/* Floating Petals Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-4 bg-[#EBC3C5]/50 rounded-full blur-[0.5px] animate-float-slow"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 5)}s`,
              transform: `rotate(${i * 25}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
