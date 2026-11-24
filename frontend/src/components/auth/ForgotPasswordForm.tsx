'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidEmail } from '@/lib/auth/validators';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      triggerShake();
      emailRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      await mockAuthClient.forgotPassword({ email });
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="zb-form-sheet p-8 sm:p-10 flex flex-col items-center text-center zb-pop-in">
        <div className="w-16 h-16 rounded-full bg-[#B8F52A] flex items-center justify-center text-[#0B0B0B] mb-5 shadow-sm">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-[#0B0B0B]">Check your email</h2>
        <p className="mt-2 text-sm text-[#6B6B66] max-w-sm">
          If an account exists for that email, a reset link has been sent (demo: nothing was sent).
        </p>

        <div className="mt-8 w-full">
          <Link href="/login" className="w-full">
            <ZbButton variant="primary" fullWidth>
              Return to sign in
            </ZbButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`zb-form-sheet p-6 sm:p-8 lg:p-10 ${shake ? 'zb-shake' : ''}`}>
      {isLoading && <div className="zb-scan-line" />}

      <div className="mb-6">
        <span className="text-[11px] font-mono tracking-widest text-[#6B6B66] uppercase block mb-1">
          PASSWORD RECOVERY
        </span>
        <h1 className="text-2xl sm:text-[28px] font-heading font-bold text-[#0B0B0B] tracking-tight">
          Reset password
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#6B6B66]">
          Enter your registered email address and we will send you verification instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <ZbField
          ref={emailRef}
          label="Email Address"
          placeholder="name@example.lk"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
          error={emailError || undefined}
          autoComplete="email"
          inputMode="email"
          icon={<Mail className="w-4 h-4" />}
          disabled={isLoading}
        />

        <div className="pt-2">
          <ZbButton type="submit" variant="primary" fullWidth isLoading={isLoading}>
            Send reset link
          </ZbButton>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#6B6B66] hover:text-[#0B0B0B] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  );
};
