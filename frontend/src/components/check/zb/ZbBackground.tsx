import React from 'react';

export const ZbBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Deep black stage background */}
      <div className="absolute inset-0 bg-[#0B0B0B]" />

      {/* Subtle perspective grid */}
      <div className="absolute inset-0 zb-grid-pattern opacity-40" />

      {/* Slanted lime light beam echoing the ZegBit angle */}
      <div className="zb-slant-beam" />

      {/* Ambient vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0B0B0B]/80" />

      {/* Grain / Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
