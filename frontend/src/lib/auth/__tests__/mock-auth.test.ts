import { describe, it, expect } from 'vitest';
import { mockAuthClient } from '../mock-auth';

describe('mockAuthClient', () => {
  it('authenticates demo user successfully', async () => {
    const res = await mockAuthClient.login({
      identifier: 'demo@zegbit.lk',
      password: 'Demo@1234',
    });
    expect(res.success).toBe(true);
    expect(res.data?.user.email).toBe('demo@zegbit.lk');
  });

  it('rejects unknown credentials with generic message (no user enumeration)', async () => {
    const res = await mockAuthClient.login({
      identifier: 'nonexistent@zegbit.lk',
      password: 'RandomPassword123',
    });
    expect(res.success).toBe(false);
    expect(res.error).toBe('Email or password is incorrect.');
  });

  it('rejects registered email with taken@zegbit.lk', async () => {
    const res = await mockAuthClient.register({
      fullName: 'Taken User',
      email: 'taken@zegbit.lk',
      password: 'ValidPassword123!',
      acceptTerms: true,
    });
    expect(res.success).toBe(false);
    expect(res.fieldErrors?.email).toBe('An account with this email already exists.');
  });

  it('returns success for forgot password without revealing existence', async () => {
    const res = await mockAuthClient.forgotPassword({
      email: 'anybody@zegbit.lk',
    });
    expect(res.success).toBe(true);
  });
});
