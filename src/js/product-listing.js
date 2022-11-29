import ExternalServices from './externalServices';
import ProductList from './productList.js';
import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const product_list = new ProductList(category, dataSource, listElement);
#
product_list.init();