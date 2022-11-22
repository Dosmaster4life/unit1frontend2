import { getLocalStorage } from './utils.js';
import ExternalServices from './externalServices.js';

const services = new ExternalServices();
function formDataToJSON(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};
    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };  
    });
    return simplifiedItems;
}

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
      this.shipping = 10.00 + ((this.qty - 1) * 2);
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

  async checkout(form) {
    const formElement = document.forms['checkout'];
    const json = formDataToJSON(formElement);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
        const res = await services.checkout(json);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
  }
}
