class Cart {
  cartItem;
  #localStorageKey;

  constructor(localStorageKey){

    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();

  }

  loadFromStorage() {

    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if(!this.cartItem|| this.cartItem.length === 0){
      this.cartItem = [ 
    {
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
}];
}
  }

saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
} 

addToCart(product) {

    //在购物车中查找该商品（只做一次查找）
    const cartItem = this.cartItem.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.cartItem.push({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        quantity: 1,
        deliveryOptionId: '1' // 默认配送选项ID 
      });
    }

    this.saveToStorage();
}

removeFromCart(productId) {
    const itemIndex = this.cartItem.findIndex(item => item.id === productId);  
    if (itemIndex !== -1) {
      // 从购物车中移除该商品
        this.cartItem.splice(itemIndex, 1);
    }
    this.saveToStorage();
}

updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.cartItem.find(item => item.id === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = deliveryOptionId;
    }
    this.saveToStorage();
}
};

const cart = new Cart('cart-OOP');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart)

console.log(businessCart instanceof Cart);

















