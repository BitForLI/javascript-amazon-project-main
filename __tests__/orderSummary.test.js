import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { renderOrderSummary } from '../scripts/checkout/orderSummary.js';
import { cart } from '../data/cart-class.js';

describe('renderOrderSummary', () => {
  let originalItems = [];

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    originalItems = [...cart.cartItems];
    cart.cartItems = [
      {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];
  });

  afterEach(() => {
    cart.cartItems = [...originalItems];
  });

  it('renders cart item and delivery options', () => {
    renderOrderSummary();

    const orderSummaryText = document.querySelector('.js-order-summary')
      .textContent;

    expect(orderSummaryText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(orderSummaryText).toContain('Choose a delivery option:');
    expect(orderSummaryText).toContain('Delivery Date: Test Date');
  });
});
