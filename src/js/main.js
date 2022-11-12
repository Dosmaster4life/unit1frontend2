import ProductData from './productData.js';
import ProductList from './productList.js';

const dataSource = new ProductData('tents');
const productListings = new ProductList(dataSource);
console.log(productListings.init());