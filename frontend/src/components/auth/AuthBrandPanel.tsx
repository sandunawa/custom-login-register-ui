'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ZegBitLogo } from './ZegBitLogo';
import { ZbBackground } from '../check/zb/ZbBackground';
import { ArrowLeft, ShieldCheck, Lock, Eye, AlertTriangle } from 'lucide-react';

interface AuthBrandPanelProps {
  pageType: 'login' | 'register' | 'forgot-password';
}

const TIPS = [
  { text: 'Banks never ask for your OTP or online banking password.', author: 'Moatix Rule #1' },
  { text: 'Check the sender identity before clicking links in SMS messages.', author: 'Moatix Rule #2' },
  { text: 'Urgent request + financial payment = pause and verify independently.', author: 'Moatix Rule #3' },
];

export const AuthBrandPanel: React.FC<AuthBrandPanelProps> = ({ pageType }) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'var(--zb-black)',
      color: 'var(--zb-white)',
      overflow: 'hidden'
    }}>
      <ZbBackground />

      {/* Top Header: Logo + Back link */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <ZegBitLogo className="w-9 h-9" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Moatix</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--zb-lime)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>by ZegBit</span>
          </div>
        </Link>

        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--zb-muted-dark)', textDecoration: 'none' }}
        >
          <ArrowLeft style={{ width: '0.875rem', height: '0.875rem' }} />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Center: Headline & Trust points */}
      <div style={{ position: 'relative', zIndex: 10, margin: '2.5rem 0', maxWidth: '32rem' }}>
        {pageType === 'login' ? (
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--zb-lime)', display: 'block', marginBottom: '0.75rem' }}>
              SECURE VERIFICATION
            </span>
            <h1 style={{ fontSize: '2.75rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, color: '#FFFFFF' }}>
              Welcome <span style={{ color: 'var(--zb-lime)', position: 'relative', display: 'inline-block' }}>
                back.
              </span>
            </h1>
            <p style={{ marginTop: '1rem', fontSize: '1rem', color: 'var(--zb-muted-dark)', lineHeight: 1.5 }}>
              Verify suspected scams across Sri Lanka with real-time heuristic intelligence.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                    Your past checks, in one place <span style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: '#262626', color: 'var(--zb-muted-dark)', marginLeft: '6px' }}>Coming soon</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>Easily re-verify phone numbers and payment slips.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Eye style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>Feedback you submitted</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>Track community reports and verified flags.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Lock style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>Nothing shared without you</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>Zero tracking, zero credential exposure.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--zb-lime)', display: 'block', marginBottom: '0.75rem' }}>
              CITIZEN SAFETY INITIATIVE
            </span>
            <h1 style={{ fontSize: '2.75rem', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, color: '#FFFFFF' }}>
              Check <span style={{ color: 'var(--zb-lime)' }}>smarter.</span>
            </h1>
            <p style={{ marginTop: '1rem', fontSize: '1rem', color: 'var(--zb-muted-dark)', lineHeight: 1.5 }}>
              Join thousands of Sri Lankan users protecting their families from digital financial deception.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>No spam, ever</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>We only notify you on critical security alerts.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Lock style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>Delete your account any time</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>Full control over your data with one-click erasure.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#1A1A1A', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <AlertTriangle style={{ width: '0.875rem', height: '0.875rem', color: 'var(--zb-lime)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>We never ask for OTPs or PINs</div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--zb-muted-dark)' }}>Legitimate verification engines do not need banking access.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Rotating Safety Tip Card */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '1.5rem', borderTop: '1px solid #262626' }}>
        <div style={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid #262626', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--zb-lime)' }} />
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--zb-lime)', fontWeight: 600, letterSpacing: '0.05em' }}>
              {TIPS[tipIndex].author}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#F4F4F2', lineHeight: 1.4 }}>
            &ldquo;{TIPS[tipIndex].text}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
