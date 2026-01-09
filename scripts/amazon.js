import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML = productsHTML + `
    <div class="product-container">

          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart 
          </button>
        </div>`;

});



function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

 //在js中找到products-grid这个class，并把上面生成的HTML代码放进去
 document.querySelector('.js-products-grid').innerHTML = productsHTML;

 //为所有“添加到购物车”按钮添加点击事件监听器
 document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
  button.addEventListener('click',()=> {

    //找到按钮对应的商品
    const product = products.find((p) => p.id === button.dataset.productId);
    addToCart(product);
    updateCartQuantity();

  });
 });