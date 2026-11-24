'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { PasswordField } from './PasswordField';
import { AuthDivider } from './AuthDivider';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidIdentifier } from '@/lib/auth/validators';

export const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [shake, setShake] = useState(false);

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const validate = (): boolean => {
    let valid = true;
    setGeneralError(null);

    if (!identifier.trim()) {
      setIdentifierError('Email or phone number is required.');
      valid = false;
    } else if (!isValidIdentifier(identifier)) {
      setIdentifierError('Enter a valid email address or Sri Lankan phone (+94 / 07x).');
      valid = false;
    } else {
      setIdentifierError(null);
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    if (!validate()) {
      triggerShake();
      if (!identifier.trim() || !isValidIdentifier(identifier)) {
        identifierRef.current?.focus();
      } else if (!password || password.length < 8) {
        passwordRef.current?.focus();
      }
      return;
    }

    setIsLoading(true);
    setGeneralError(null);

    try {
      const res = await mockAuthClient.login({
        identifier,
        password,
        rememberMe,
      });

      if (res.success) {
        setIsSuccess(true);
        setPassword('');
      } else {
        triggerShake();
        setGeneralError(res.error || 'Email or password is incorrect.');
        if (res.cooldownSeconds) {
          setCooldown(res.cooldownSeconds);
        }
        passwordRef.current?.focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="zb-form-sheet zb-pop-in" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--zb-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--zb-black)', marginBottom: '1.25rem' }}>
          <Check style={{ width: '2rem', height: '2rem', strokeWidth: 3 }} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--zb-black)' }}>Signed in (demo)</h2>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--zb-muted)', maxWidth: '24rem' }}>
          No credentials or sessions were stored. This interface is running against Moatix’s mock auth client.
        </p>

        <div style={{ marginTop: '2rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link href="/check" style={{ textDecoration: 'none' }}>
            <ZbButton variant="primary" fullWidth>
              Go to checker
              <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
            </ZbButton>
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setIdentifier('');
            }}
            style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--zb-muted)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            Sign in with another account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`zb-form-sheet ${shake ? 'zb-shake' : ''}`}>
      {isLoading && <div className="zb-scan-line" />}

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--zb-muted)', display: 'block', marginBottom: '0.25rem' }}>
          SIGN IN
        </span>
        <h1 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--zb-black)', margin: 0, letterSpacing: '-0.02em' }}>
          Sign in to Moatix
        </h1>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--zb-muted)' }}>
          Enter your credentials to access your verified reports.
        </p>
      </div>

      {generalError && (
        <div role="alert" style={{ marginBottom: '1.25rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(198, 40, 40, 0.1)', border: '1px solid rgba(198, 40, 40, 0.25)', display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.75rem', color: 'var(--zb-error-light)', fontWeight: 500 }}>
          <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <ZbField
          ref={identifierRef}
          label="Email or phone number"
          placeholder="name@example.lk or 07x..."
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (identifierError) setIdentifierError(null);
          }}
          error={identifierError || undefined}
          autoComplete="username"
          inputMode="email"
          icon={<Mail style={{ width: '1rem', height: '1rem' }} />}
          disabled={isLoading || cooldown > 0}
        />

        <div style={{ marginBottom: '1rem' }}>
          <PasswordField
            ref={passwordRef}
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(null);
            }}
            error={passwordError || undefined}
            autoComplete="current-password"
            disabled={isLoading || cooldown > 0}
          />
        </div>

        {/* Remember me & Forgot Password */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', padding: '0.25rem 0 1.25rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: '1rem', height: '1rem', accentColor: 'var(--zb-black)' }}
            />
            <span style={{ color: 'var(--zb-muted)', fontWeight: 500 }}>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            style={{ fontSize: '0.8125rem', color: 'var(--zb-muted)', textDecoration: 'none', fontWeight: 500 }}
          >
            Forgot password?
          </Link>
        </div>

        {/* Primary CTA */}
        <div>
          <ZbButton
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? (
              <span style={{ fontFamily: 'var(--font-mono)' }}>Try again in {cooldown}s</span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Sign in
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </span>
            )}
          </ZbButton>
        </div>
      </form>

      <AuthDivider />

      <Link href="/check" style={{ textDecoration: 'none' }}>
        <ZbButton variant="outline" fullWidth>
          Continue as guest
        </ZbButton>
      </Link>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--zb-muted)' }}>
        New to Moatix?{' '}
        <Link href="/register" style={{ color: 'var(--zb-black)', fontWeight: 700, textDecoration: 'underline' }}>
          Create an account
        </Link>
      </div>
    </div>
  );
};
