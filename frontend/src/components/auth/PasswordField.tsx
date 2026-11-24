'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ZbField } from '../check/zb/ZbField';

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, helperText, onKeyDown, onKeyUp, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [capsLockActive, setCapsLockActive] = useState(false);

    const handleKeyDetection = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };

    return (
      <div className="relative w-full">
        <ZbField
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          label={label}
          error={error}
          helperText={helperText}
          onKeyDown={(e) => {
            handleKeyDetection(e);
            onKeyDown?.(e);
          }}
          onKeyUp={(e) => {
            handleKeyDetection(e);
            onKeyUp?.(e);
          }}
          rightElement={
            <div className="flex items-center gap-1.5">
              {capsLockActive && (
                <span 
                  role="status" 
                  aria-live="polite"
                  className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#F5A524]/20 text-[#B26A00] border border-[#F5A524]/40"
                  title="Caps Lock is active"
                >
                  CAPS
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="p-1.5 text-[#6B6B66] hover:text-[#0B0B0B] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          }
          {...props}
        />
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
