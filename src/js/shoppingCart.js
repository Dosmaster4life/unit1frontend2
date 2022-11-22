import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage
} from './utils.js';

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key);
    if (list !== null) {
      this.renderList(list);
      document.querySelectorAll('.minus').forEach(item => {
        item.addEventListener('click', this.minus.bind(this));
      });
      document.querySelectorAll('.plus').forEach(item => {
        item.addEventListener('click', this.plus.bind(this));
      });
      document.querySelectorAll('.remove').forEach(item => {
        item.addEventListener('click', this.remove.bind(this));
      });
      this.calculateCartTotal();
    } else {
      this.listElement.innerHTML = '';
      document.querySelector('.cart-footer').classList.add('hide');
    }
  }

  prepareTemplate(template, product) {
    // template.querySelector('.cart-card a').setAttribute('href', `../productpages/productDetails.html?product=${product.Id}`);
    template.querySelector('.cart-card__image img').src = product.Images.PrimarySmall;
    // template.getElementById('product-details-link').setAttribute('href', `../productpages/productDetails.html?product=${product.Id}`);
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
    template.querySelector('.cart-card__price').textContent += product.FinalPrice;
    template.querySelector('.cart-card__quantity').textContent += product.Quantity;
    template.querySelector('.minus').setAttribute('data-id', product.Id);
    template.querySelector('.plus').setAttribute('data-id', product.Id);
    template.querySelector('.remove').setAttribute('data-id', product.Id);
    template.querySelector('.cart-card__total').textContent += product.FinalPrice * product.Quantity;
    return template;
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);

  }

  minus(e) {
    let items = getLocalStorage('so-cart');
    const item = items.find(item => item.Id === e.target.getAttribute('data-id'));
    if (item.Quantity > 1) {
      item.Quantity--;
      setLocalStorage('so-cart', items);
      this.init();
    } else {
      item.Quantity = 1;
    }
  }
  plus(e) {
    let items = getLocalStorage('so-cart');
    const item = items.find(item => item.Id === e.target.getAttribute('data-id'));
    item.Quantity != null ? item.Quantity++ : item.Quantity = 2;
    setLocalStorage('so-cart', items);
    this.init();
  }

  remove(e) {
    let items = getLocalStorage('so-cart');
    const item = items.find(item => item.Id === e.target.getAttribute('data-id'));
    items.splice(items.indexOf(item), 1);
    setLocalStorage('so-cart', items);
    this.init()
  }

  calculateCartTotal() {
    if (document.querySelector('.product-list').innerHTML != '') {
      let items = getLocalStorage('so-cart');
      let total = 0;
      items.forEach(item => {
        total += item.FinalPrice * item.Quantity;
      });
      document.querySelector('.cart-value').textContent = total.toFixed(2);
      document.querySelector('.cart-footer').classList.remove('hide');
    } else {
      document.querySelector('.cart-footer').classList.add('hide');
    }
  }

}
