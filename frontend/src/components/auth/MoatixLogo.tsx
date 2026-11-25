import React from 'react';

export const MoatixLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      {/* Dark Navy Shield Icon with checkmark */}
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(15,23,42,0.15)'
      }}>
        <svg style={{ width: '20px', height: '20px', color: '#60a5fa' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)' }}>
            Moatix<span style={{ color: '#1d4ed8' }}>Check</span>
          </span>
          <span style={{
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#1d4ed8',
            backgroundColor: '#dbeafe',
            padding: '2px 6px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            BY ZEGBIT
          </span>
        </div>
        <span style={{ fontSize: '0.6875rem', color: '#64748b', fontWeight: 500 }}>
          Scam Assessment Portal • Sri Lanka
        </span>
      </div>
    </div>
  );
};
