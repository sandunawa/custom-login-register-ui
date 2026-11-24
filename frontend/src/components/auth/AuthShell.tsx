'use client';

import React from 'react';
import { AuthBrandPanel } from './AuthBrandPanel';
import { AuthNotice } from './AuthNotice';

interface AuthShellProps {
  children: React.ReactNode;
  pageType: 'login' | 'register' | 'forgot-password';
}

export const AuthShell: React.FC<AuthShellProps> = ({ children, pageType }) => {
  return (
    <div className="zb-auth-split min-h-[100dvh] w-full bg-[#F4F4F2]">
      {/* Left Brand Panel (Collapses into top banner on mobile) */}
      <div className="zb-auth-brand-col shrink-0 min-h-[280px] lg:min-h-[100dvh]">
        <AuthBrandPanel pageType={pageType} />
      </div>

      {/* Right Form Col */}
      <div className="zb-auth-form-col flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative z-20 -mt-8 lg:mt-0">
        <AuthNotice />
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
