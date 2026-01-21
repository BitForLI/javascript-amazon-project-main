class Cart {
  cartItems; // 统一为复数
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

    if (this.cartItems.length === 0) {
      this.cartItems = [{
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          priceCents: 1090,
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          name: "Wireless Bluetooth Over-Ear Headphones with Mic",
          priceCents: 2599,
          quantity: 1,
          deliveryOptionId: "2",
        }
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // --- 新增的异步加载方法 ---
  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    let cartData = null;

    try {
      cartData = await response.json();
    } catch (error) {
      return;
    }

    if (Array.isArray(cartData)) {
      this.cartItems = cartData.map((item) => ({
        id: item.id || item.productId,
        quantity: item.quantity ?? 1,
        deliveryOptionId: item.deliveryOptionId || '1'
      })).filter((item) => item.id);

      this.saveToStorage();
    }
  }

  addToCart(product, quantity = 1) {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      item.quantity += quantity;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.deliveryOptionId = deliveryOptionId;
    }
    this.saveToStorage();
  }
}

// 修改这里：使用 export 导出实例，供 checkout.js 使用
export const cart = new Cart('cart-OOP');