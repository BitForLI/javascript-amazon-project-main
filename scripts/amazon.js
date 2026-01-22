import {cart} from '../data/cart-class.js'
import {products, loadProductsFetch} from '../data/products.js';

async function renderProducts() {
  //确保商品数据停在这里，等待数据全部加载完成
  await loadProductsFetch();

  let productsHTML = '';

  //拼接商品的html代码
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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector"
              data-product-id="${product.id}">
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

          ${product.extraInfoHTML()}

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


//更新购物车数量
function updateCartQuantity() {
    let cartQuantity = 0;
    cart.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

 //在js中找到products-grid这个class，并把上面生成的html代码放进去
 document.querySelector('.js-products-grid').innerHTML = productsHTML;

 //为所有“添加到购物车”按钮添加点击事件监听器
 document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
  button.addEventListener('click',()=> {

    //找到对应的商品id
    const product = products.find((p) => p.id === button.dataset.productId);
    const quantitySelector = document.querySelector(
      //找到对应的商品
      `.js-quantity-selector[data-product-id="${product.id}"]`
    );
    //找到对应的商品数量
    const quantity = Number(quantitySelector?.value) || 1;
    cart.addToCart(product, quantity);
    //更新购物车数量，只有点击时
    updateCartQuantity();

  });
 });
//更新购物车数量，初始化
 updateCartQuantity();
}
//渲染商品
renderProducts();
