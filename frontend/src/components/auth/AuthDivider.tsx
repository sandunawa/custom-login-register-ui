import React from 'react';

export const AuthDivider: React.FC<{ label?: string }> = ({ label = 'OR' }) => {
  return (
    <div className="relative flex items-center justify-center my-5 w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#E3E3DF]" />
      </div>
      <div className="relative px-3 bg-white text-[11px] font-mono tracking-widest text-[#6B6B66] uppercase">
        {label}
      </div>
    </div>
  );
};
