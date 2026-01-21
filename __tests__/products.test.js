import { describe, it, expect } from '@jest/globals';
import { getProduct } from '../data/products.js';

describe('products', () => {
  it('gets product by id', () => {
    const product = getProduct('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product?.name).toBe('Black and Gray Athletic Cotton Socks - 6 Pairs');
  });

  it('returns undefined for unknown id', () => {
    const product = getProduct('unknown-id');
    expect(product).toBeUndefined();
  });
});
