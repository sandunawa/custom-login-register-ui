'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { PasswordStrengthResult } from '@/lib/auth/types';

interface PasswordStrengthProps {
  strength: PasswordStrengthResult;
  showRules?: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength, showRules = true }) => {
  const { score, level, label, rules } = strength;

  // Segment colors based on strength level
  // 1: Red (Weak), 2: Amber (Fair), 3: Black (Good), 4: Black with Lime tip (Strong)
  const getSegmentColor = (index: number) => {
    if (index >= score) return 'bg-[#E3E3DF]';
    if (level === 'weak') return 'bg-[#E5484D]';
    if (level === 'fair') return 'bg-[#F5A524]';
    if (level === 'good') return 'bg-[#0B0B0B]';
    if (level === 'strong') {
      return index === 3 ? 'bg-[#B8F52A]' : 'bg-[#0B0B0B]';
    }
    return 'bg-[#E3E3DF]';
  };

  return (
    <div className="flex flex-col gap-2 mt-1">
      {/* 4 Segment Progress Rail */}
      <div className="flex items-center gap-1.5 w-full h-1.5">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`h-full flex-1 rounded-full transition-all duration-200 ${getSegmentColor(idx)}`}
          />
        ))}
      </div>

      {/* Label & Accessibility Live Region */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-[#6B6B66]">Strength</span>
        <span 
          role="status" 
          aria-live="polite" 
          className={`font-semibold ${
            level === 'weak' ? 'text-[#C62828]' :
            level === 'fair' ? 'text-[#B26A00]' :
            'text-[#0B0B0B]'
          }`}
        >
          {score > 0 ? label : 'None'}
        </span>
      </div>

      {/* Live Rules Checklist with Check / Circle Icons */}
      {showRules && (
        <ul className="grid grid-cols-1 gap-1 mt-1 text-xs text-[#6B6B66]">
          {rules.map((rule) => (
            <li key={rule.id} className="flex items-center gap-1.5">
              {rule.met ? (
                <Check className="w-3.5 h-3.5 text-[#0B0B0B] stroke-[2.5]" aria-hidden="true" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#E3E3DF] stroke-[2]" aria-hidden="true" />
              )}
              <span className={rule.met ? 'text-[#0B0B0B] font-medium' : 'text-[#6B6B66]'}>
                {rule.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-[11px] text-[#6B6B66] italic mt-0.5">
        Strength is a hint, not a guarantee.
      </p>
    </div>
  );
};
