'use client';

import React from 'react';
import Link from 'next/link';
import { MoatixLogo } from './MoatixLogo';

export const AuthNavbar: React.FC = () => {
  return (
    <header className="mx-navbar">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <MoatixLogo />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link 
          href="/check" 
          style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none', transition: 'color 150ms' }}
        >
          Checker
        </Link>
        <Link 
          href="/#how-it-works" 
          style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none', transition: 'color 150ms' }}
        >
          How It Works
        </Link>
        <Link href="/check" style={{ textDecoration: 'none' }}>
          <button className="mx-btn-primary" style={{ height: '40px', padding: '0 1.25rem', fontSize: '0.875rem' }}>
            Start Checking →
          </button>
        </Link>
      </nav>
    </header>
  );
};
