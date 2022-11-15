import ProductData from './productData.js';
import ProductList from './productList.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const tentList = new ProductList('tents', dataSource, listElement);

tentList.init();