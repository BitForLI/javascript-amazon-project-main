import { describe, it, expect } from '@jest/globals';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryoptions.js';

describe('delivery options', () => {
  it('returns matching option by id', () => {
    const option = getDeliveryOption('2');
    expect(option).toEqual(deliveryOptions[1]);
  });

  it('falls back to first option when id not found', () => {
    const option = getDeliveryOption('missing');
    expect(option).toEqual(deliveryOptions[0]);
  });
});
