import { describe, it, expect } from '@jest/globals';
import { formatCurrency } from '../scripts/utils/money.js';

describe('formatCurrency', () => {
  it('formats basic cents', () => {
    expect(formatCurrency(2095)).toBe('20.95');
  });

  it('formats zero cents', () => {
    expect(formatCurrency(0)).toBe('0.00');
  });

  it('formats whole dollars', () => {
    expect(formatCurrency(2000)).toBe('20.00');
  });

  it('rounds correctly', () => {
    expect(formatCurrency(2000.5)).toBe('20.01');
    expect(formatCurrency(2000.4)).toBe('20.00');
  });
});
