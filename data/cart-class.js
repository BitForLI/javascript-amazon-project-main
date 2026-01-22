class Cart {
  cartItems; // 统一为复数
  #localStorageKey;

  //构造函数：初始化购物车
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    //getItem:获取本地存储中的数据
    //JSON.parse:将字符串转换成js可以使用的数据
    //||:如果本地存储中没有数据，则返回空数组
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

    //如果本地存储中没有数据，则返回默认数据
    if (this.cartItems.length === 0) {
      //默认数据
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

  //保存到本地存储
  saveToStorage() {
    //setItem:设置本地存储中的数据
    //JSON.stringify:将js可以使用的数据转换成字符串
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  //异步加载方法
  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    let cartData = null;
    //如果出现错误，则返回

    try {
      cartData = await response.json();
      //如果数据是数组，则将数据转换成js可以使用的数据
    } catch (error) {
      return;
    }

    if (Array.isArray(cartData)) {
      //.map:遍历数组，对每个元素执行一个函数，并返回一个新数组
      this.cartItems = cartData.map((item) => ({
        id: item.id || item.productId,
        quantity: item.quantity ?? 1,
        deliveryOptionId: item.deliveryOptionId || '1'
      })).filter((item) => item.id);

      //保存到本地存储
      this.saveToStorage();
    }
  }

  //添加到购物车
  addToCart(product, quantity = 1) {
    //find:查找数组中第一个符合条件的元素
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      //如果商品存在，则增加商品数量
      item.quantity += quantity;
    } else {
      //如果商品不存在，则添加到购物车
      //添加到购物车
      this.cartItems.push({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        quantity,
        deliveryOptionId: '1'
      });
    }
    //保存到本地存储
    this.saveToStorage();
  }

  //删除购物车
  removeFromCart(productId) {
    //findIndex:查找数组中第一个符合条件的元素的索引
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      //splice:删除数组中指定索引的元素
      this.cartItems.splice(itemIndex, 1);
    }
    //保存到本地存储
    this.saveToStorage();
  }

  //更新配送选项
  updateDeliveryOption(productId, deliveryOptionId) {
    //find:查找数组中第一个符合条件的元素
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      //更新配送选项
      item.deliveryOptionId = deliveryOptionId;
    }
    //保存到本地存储
    this.saveToStorage();
  }
}
//实例化购物车
// 导出实例，供checkout.js使用
export let cart = new Cart('cart-OOP');