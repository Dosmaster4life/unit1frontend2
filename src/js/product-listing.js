import ProductData from './productData.js';
import ProductList from './productList.js';
import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const product_list = new ProductList(category, dataSource, listElement);

product_list.init();