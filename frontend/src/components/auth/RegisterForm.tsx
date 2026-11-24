'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, User, Phone, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';
import { ZbButton } from '../check/zb/ZbButton';
import { PasswordField } from './PasswordField';
import { PasswordStrength } from './PasswordStrength';
import { mockAuthClient } from '@/lib/auth/mock-auth';
import { isValidEmail, validateFullName, evaluatePasswordStrength } from '@/lib/auth/validators';
import { isValidSriLankanPhone } from '@/lib/phone';

export const RegisterForm: React.FC = () => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  // Field errors
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Refs for focusing first invalid field
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const passwordStrength = evaluatePasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 240);
  };

  const validate = (): boolean => {
    let valid = true;
    let firstFocusTarget: React.RefObject<HTMLInputElement | null> | null = null;

    // 01 Details
    const nameRes = validateFullName(fullName);
    if (!nameRes.isValid) {
      setFullNameError(nameRes.error || 'Name is invalid');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = fullNameRef;
    } else {
      setFullNameError(null);
    }

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = emailRef;
    } else {
      setEmailError(null);
    }

    if (phone.trim() && !isValidSriLankanPhone(phone)) {
      setPhoneError('Please enter a valid Sri Lankan mobile number.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = phoneRef;
    } else {
      setPhoneError(null);
    }

    // 02 Security
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = passwordRef;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = confirmRef;
    } else {
      setConfirmError(null);
    }

    if (!acceptTerms) {
      setTermsError('You must agree to the Terms and Privacy Policy.');
      valid = false;
      if (!firstFocusTarget) firstFocusTarget = termsRef;
    } else {
      setTermsError(null);
    }

    if (firstFocusTarget?.current) {
      firstFocusTarget.current.focus();
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      const res = await mockAuthClient.register({
        fullName,
        email,
        phone: phone.trim() ? phone : undefined,
        password,
        acceptTerms,
        marketingOptIn,
      });

      if (res.success) {
        setIsSuccess(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        triggerShake();
        if (res.fieldErrors?.email) {
          setEmailError(res.fieldErrors.email);
          emailRef.current?.focus();
        }
      }
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
        <h2 className="text-2xl font-heading font-bold text-[#0B0B0B]">Account created (demo)</h2>
        <p className="mt-2 text-sm text-[#6B6B66] max-w-sm">
          No real account was stored in any database. This mock registration verified input rules and simulation flow.
        </p>

        <div className="mt-8 w-full flex flex-col gap-3">
          <Link href="/login" className="w-full">
            <ZbButton variant="primary" fullWidth>
              Go to sign in
              <ArrowRight className="w-4 h-4 ml-1" />
            </ZbButton>
          </Link>
          <Link href="/check" className="w-full">
            <ZbButton variant="outline" fullWidth>
              Start checking scams
            </ZbButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`zb-form-sheet p-6 sm:p-8 lg:p-10 ${shake ? 'zb-shake' : ''}`}>
      {isLoading && <div className="zb-scan-line" />}

      {/* Header */}
      <div className="mb-6">
        <span className="text-[11px] font-mono tracking-widest text-[#6B6B66] uppercase block mb-1">
          CREATE ACCOUNT
        </span>
        <h1 className="text-2xl sm:text-[28px] font-heading font-bold text-[#0B0B0B] tracking-tight">
          Create your Moatix account
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#6B6B66]">
          One unified account to verify messages, numbers and slips.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* SECTION 01: YOUR DETAILS */}
        <div className="relative pl-3 border-l-2 border-[#0B0B0B] space-y-3.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B0B0B]">
            01 YOUR DETAILS
          </div>

          <ZbField
            ref={fullNameRef}
            label="Full Name"
            placeholder="e.g. Kasun Perera"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (fullNameError) setFullNameError(null);
            }}
            error={fullNameError || undefined}
            autoComplete="name"
            icon={<User className="w-4 h-4" />}
            disabled={isLoading}
          />

          <ZbField
            ref={emailRef}
            label="Email Address"
            placeholder="kasun@example.lk"
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

          <ZbField
            ref={phoneRef}
            label="Phone Number (Optional)"
            placeholder="077 123 4567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (phoneError) setPhoneError(null);
            }}
            error={phoneError || undefined}
            helperText="Optional. Used only for account recovery."
            autoComplete="tel"
            icon={<Phone className="w-4 h-4" />}
            disabled={isLoading}
          />
        </div>

        {/* SECTION 02: SECURE YOUR ACCOUNT */}
        <div className="relative pl-3 border-l-2 border-[#0B0B0B] space-y-3.5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B0B0B]">
            02 SECURE YOUR ACCOUNT
          </div>

          <div>
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
              autoComplete="new-password"
              disabled={isLoading}
            />
            {password.length > 0 && <PasswordStrength strength={passwordStrength} />}
          </div>

          <div className="relative">
            <PasswordField
              ref={confirmRef}
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError(null);
              }}
              error={confirmError || undefined}
              autoComplete="new-password"
              disabled={isLoading}
            />
            {passwordsMatch && (
              <p className="text-xs text-[#0B0B0B] flex items-center gap-1.5 font-medium mt-1 font-mono">
                <Check className="w-3.5 h-3.5 text-[#B8F52A] bg-black rounded-full p-0.5" />
                <span>Passwords match</span>
              </p>
            )}
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-2 pt-1 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              ref={termsRef}
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (termsError) setTermsError(null);
              }}
              className="w-4 h-4 mt-0.5 rounded border-[#E3E3DF] text-[#0B0B0B] focus:ring-[#B8F52A]/40 accent-[#0B0B0B]"
            />
            <span className="text-[#6B6B66] leading-tight">
              I agree to the{' '}
              <Link href="/privacy" className="text-[#0B0B0B] underline font-medium">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/help" className="text-[#0B0B0B] underline font-medium">
                Terms of Service
              </Link>
            </span>
          </label>
          {termsError && (
            <p role="alert" className="text-xs text-[#C62828] flex items-center gap-1 font-medium pl-6.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{termsError}</span>
            </p>
          )}

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#E3E3DF] text-[#0B0B0B] focus:ring-[#B8F52A]/40 accent-[#0B0B0B]"
            />
            <span className="text-[#6B6B66] leading-tight">
              Send me critical scam advisories and fraud trend alerts (optional).
            </span>
          </label>
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <ZbButton type="submit" variant="primary" fullWidth isLoading={isLoading}>
            Create account
            <ArrowRight className="w-4 h-4 ml-1" />
          </ZbButton>
        </div>
      </form>

      {/* Switch Link */}
      <div className="mt-6 text-center text-xs text-[#6B6B66]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#0B0B0B] font-semibold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};
