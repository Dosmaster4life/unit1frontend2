import CheckoutProcess from './checkoutProcess';
import { loadHeaderFooter } from './utils';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', document.querySelector('.product-list'));
checkout.init();