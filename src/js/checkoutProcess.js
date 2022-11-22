import {
  getLocalStorage,
} from './utils.js';

export default class CheckoutProcess {

  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.qty = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    let items = getLocalStorage('so-cart');
    items.forEach(item => {
      this.itemTotal += item.FinalPrice * item.Quantity;
      this.qty += item.Quantity;
    });
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    if (this.qty > 1) {
      this.shipping = 10.00 + (this.qty * 2);
    } else {
      this.shipping = 10.00;
    }
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector('.total-cart-quantity').textContent = this.qty;
    document.querySelector('.cart-subtotal').textContent = '$' + this.itemTotal.toFixed(2);
    document.querySelector('.shipping-cost').textContent = '$' + this.shipping.toFixed(2);
    document.querySelector('.tax-cost').textContent = '$' + this.tax.toFixed(2);
    document.querySelector('.total-cost').textContent = '$' + this.orderTotal.toFixed(2);
  }

}
