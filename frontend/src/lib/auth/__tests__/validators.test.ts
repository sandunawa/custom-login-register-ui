import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidIdentifier, validateFullName, evaluatePasswordStrength } from './validators';

describe('Auth Validators', () => {
  describe('isValidEmail', () => {
    it('accepts valid email addresses', () => {
      expect(isValidEmail('demo@zegbit.lk')).toBe(true);
      expect(isValidEmail('user.name+tag@sub.domain.com')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
    });
  });

  describe('isValidIdentifier', () => {
    it('accepts emails and Sri Lankan phone numbers', () => {
      expect(isValidIdentifier('demo@zegbit.lk')).toBe(true);
      expect(isValidIdentifier('0771234567')).toBe(true);
      expect(isValidIdentifier('+94771234567')).toBe(true);
    });

    it('rejects invalid identifiers', () => {
      expect(isValidIdentifier('   ')).toBe(false);
      expect(isValidIdentifier('12345')).toBe(false);
      expect(isValidIdentifier('not-an-email')).toBe(false);
    });
  });

  describe('validateFullName', () => {
    it('accepts valid names including Sinhala and Tamil characters', () => {
      expect(validateFullName('Kasun Perera').isValid).toBe(true);
      expect(validateFullName('සඳුන් පෙරේරා').isValid).toBe(true); // Sinhala
      expect(validateFullName('கார்த்திக்').isValid).toBe(true); // Tamil
    });

    it('rejects empty or excessively short/long names', () => {
      expect(validateFullName('').isValid).toBe(false);
      expect(validateFullName('A').isValid).toBe(false);
      expect(validateFullName('A'.repeat(61)).isValid).toBe(false);
    });
  });

  describe('evaluatePasswordStrength', () => {
    it('rates empty or short passwords as weak', () => {
      expect(evaluatePasswordStrength('').score).toBe(0);
      expect(evaluatePasswordStrength('short').level).toBe('weak');
    });

    it('rates complex passwords as strong with 4 segments', () => {
      const res = evaluatePasswordStrength('Demo@1234#Moatix');
      expect(res.score).toBe(4);
      expect(res.level).toBe('strong');
      expect(res.rules.every(r => r.met)).toBe(true);
    });
  });
});
