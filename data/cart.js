export const cart = [];

export function addToCart(product) {

    //在购物车中查找该商品（只做一次查找）
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        quantity: 1,
      });
    }
}