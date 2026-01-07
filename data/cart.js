export const cart = [ {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    priceCents: 1090,
    quantity: 2,
},
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    name: "Wireless Bluetooth Over-Ear Headphones with Mic",
    priceCents: 2599,
    quantity: 1,
}];

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