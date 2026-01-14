import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.0/esm/index.js';
import {deliveryOptions} from '../data/deliveryoptions.js';

const today = dayjs();
const deliveryDate = today.add(5, 'day').format('dddd, MMMM D'); 

// const time = new Date().toISOString();
let cartSummaryHtml = '';




cart.forEach((cartItem) => {

  const product = products.find((product) => product.id === cartItem.id);

  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      const optionDeliveryDate = today.add(
        option.deliveryDate, 'days').format('dddd, MMMM D');
  
  cartSummaryHtml +=
  `
    <div class="cart-item-container 
    js-cart-item-container-${product.id}">
      <div class="delivery-date">
        Delivery Date: ${optionDeliveryDate}
      </div>
      
      <div class="cart-item-details-grid">
        <img class="product-image"
      src="${product.image}">
      
      <div class="cart-item-details">
      <div class="product-name">
      ${product.name}
      </div>
      <div class="product-price">
      $${formatCurrency(product.priceCents)}
      </div>
      <div class="product-quantity">
      <span>
      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
      Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-item " data-product-id="${product.id}">
      Delete
      </span>
      </div>
      </div>
      
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(product,cartItem)}
        </div>
      </div>
    </div>
  `;
    }
  });
      });

function deliveryOptionsHTML(product, cartItem) {
  let html = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const optionDeliveryDate = today.add(
      option.deliveryDate, 'days').format('dddd, MMMM D');

    const optionPrice = option.priceCents === 0 ? 'FREE Shipping' 
    : `$${formatCurrency(option.priceCents)}`;
      
    const isChecked = 
      cartItem.deliveryOptionId === option.id ? 'checked' : '';
    html +=
    `
      <div class="delivery-option js-delivery-option"
        data-product-id="${cartItem.id}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
          ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${cartItem.id}">
        <div>
          <div class="delivery-option-date">    
            ${optionDeliveryDate}
          </div>
          <div class="delivery-option-price">
            ${optionPrice} Shipping
          </div>
        </div>
      </div>
    `
  }); 
  return html; 
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-item').forEach((deleteItem) => {
  deleteItem.addEventListener('click', () => {
    const productId = deleteItem.dataset.productId;
    removeFromCart(productId);
    
    document.querySelector(
      `.js-cart-item-container-${productId}`).remove();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click',() =>{
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
  })
})