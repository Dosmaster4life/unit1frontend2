import CheckoutProcess from './checkoutProcess';
import { loadHeaderFooter, getParam } from './utils';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
    .querySelector('#zip')
    .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if(chk_status) {
        myCheckout.checkout();
    }
});



