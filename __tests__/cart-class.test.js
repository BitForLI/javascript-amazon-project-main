import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { cart } from '../data/cart-class.js';

describe('cart-class', () => {
  const storageKey = 'cart-OOP';
  const testProduct = {
    id: 'test-product-1',
    name: 'Test Product',
    priceCents: 1234
  };

  let originalItems = [];

  beforeEach(() => {
    originalItems = [...cart.cartItems];
    localStorage.removeItem(storageKey);
    cart.loadFromStorage();
  });

  afterEach(() => {
    cart.cartItems = [...originalItems];
    cart.saveToStorage();
  });

  it('loads default items when storage empty', () => {
    expect(Array.isArray(cart.cartItems)).toBe(true);
    expect(cart.cartItems.length).toBeGreaterThan(0);
  });

  it('adds item with quantity', () => {
    const initialCount = cart.cartItems.length;
    cart.addToCart(testProduct, 3);
    const addedItem = cart.cartItems.find(item => item.id === testProduct.id);
    expect(addedItem?.quantity).toBe(3);
    expect(cart.cartItems.length).toBe(initialCount + 1);
  });

  it('increments existing item quantity', () => {
    cart.addToCart(testProduct, 2);
    cart.addToCart(testProduct, 1);
    const updatedItem = cart.cartItems.find(item => item.id === testProduct.id);
    expect(updatedItem?.quantity).toBe(3);
  });

  it('updates delivery option', () => {
    cart.addToCart(testProduct, 1);
    cart.updateDeliveryOption(testProduct.id, '2');
    const updatedItem = cart.cartItems.find(item => item.id === testProduct.id);
    expect(updatedItem?.deliveryOptionId).toBe('2');
  });

  it('removes item', () => {
    cart.addToCart(testProduct, 1);
    cart.removeFromCart(testProduct.id);
    const removedItem = cart.cartItems.find(item => item.id === testProduct.id);
    expect(removedItem).toBeUndefined();
  });
});
