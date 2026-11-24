import React from 'react';

export const ZegBitLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer black diamond / rounded square */}
      <rect width="40" height="40" rx="8" fill="#111111" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#262626" />
      
      {/* Slanted Z-bolt in Lime */}
      <path 
        d="M12 11H27L19.5 20.5H26L13 30L16.5 22H11L12 11Z" 
        fill="#B8F52A" 
      />
    </svg>
  );
};
