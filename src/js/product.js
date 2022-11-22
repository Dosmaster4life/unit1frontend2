import ExternalServices from './externalServices';
import ProductDetails from './productDetails.js';
import { getParam } from './utils.js';


const dataSource = new ExternalServices();
const productId = getParam('product');


const product = new ProductDetails(productId, dataSource);
product.init();