import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { renderPaymentSummary } from '../scripts/checkout/paymentSummary.js';
import { cart } from '../data/cart-class.js';
import { formatCurrency } from '../scripts/utils/money.js';

describe('renderPaymentSummary', () => {
  let originalItems = [];

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="js-payment-summary"></div>
      <div class="js-item-number"></div>
    `;

    originalItems = [...cart.cartItems];
    cart.cartItems = [
      {
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  });

  afterEach(() => {
    cart.cartItems = [...originalItems];
  });

  it('renders totals and item count', () => {
    renderPaymentSummary();

    const paymentSummaryText = document.querySelector('.js-payment-summary')
      .textContent;
    const itemNumberText = document.querySelector('.js-item-number')
      .textContent;

    const productTotal = 1090 * 2 + 2095 * 1;
    const shippingTotal = 499;
    const beforeTax = productTotal + shippingTotal;
    const tax = beforeTax * 0.1;
    const total = beforeTax + tax;

    expect(paymentSummaryText).toContain(`Items (3):`);
    expect(paymentSummaryText).toContain(`$${formatCurrency(productTotal)}`);
    expect(paymentSummaryText).toContain(`$${formatCurrency(shippingTotal)}`);
    expect(paymentSummaryText).toContain(`$${formatCurrency(beforeTax)}`);
    expect(paymentSummaryText).toContain(`$${formatCurrency(tax)}`);
    expect(paymentSummaryText).toContain(`$${formatCurrency(total)}`);
    expect(itemNumberText).toBe('3 items');
  });
});
