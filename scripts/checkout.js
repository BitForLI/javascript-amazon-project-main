import { renderOrderSummary } from "./checkout/orderSummary.js"; 
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from '../data/products.js';
import { cart } from '../data/cart-class.js';

async function loadPage() {
  try {
    // 1. 先等待产品数据加载
    await loadProductsFetch();

    // 2. 修改这里：调用你刚才在 cart-class 里面新增的异步方法
    await cart.loadCartFetch(); 

    // 3. 渲染页面
    renderOrderSummary();
    renderPaymentSummary();
    
  } catch (error) {
    console.error('加载页面时出错:', error);
  }
}

loadPage(); // 调用这个异步主函数