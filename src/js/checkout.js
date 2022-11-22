import CheckoutProcess from './checkoutProcess';
import { loadHeaderFooter } from './utils';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
    .querySelector('#zip')
    .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    myCheckout.checkout();
});
