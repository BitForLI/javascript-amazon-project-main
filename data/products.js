import { formatCurrency } from "../scripts/utils/money.js";


//获取配对的商品
export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

//商品类的方法与属性
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

//继承
class Clothing extends Product {
  sizeChartLink;
  
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    super.extraInfoHTML();
    return `
      <div class="size-chart-link-container">
        <a href="${this.sizeChartLink}" target="_blank" class="size-chart-link link-primary">
          Size Chart
        </a>
      </div>
    `;
  }

}

export let products = []// 建议统一变量名

//异步操作:实例化商品对象
export async function loadProductsFetch() {
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    //将传回来的数据转换成js可以使用的数据
    const productsData = await response.json();
    
    // 将获取到的数据赋值给导出的 products 变量
    //.map:遍历数组，对每个元素执行一个函数，并返回一个新数组
    products = productsData.map((productDetails) => {
      //如果商品类型是服装，则创建一个服装对象，否则创建一个普通商品对象
      return productDetails.type === 'clothing' 
        ? new Clothing(productDetails) 
        : new Product(productDetails); 
    });
    //如果出现错误，则打印错误信息
  } catch (error) {
    console.error('Error loading products:', error);
  }
}
