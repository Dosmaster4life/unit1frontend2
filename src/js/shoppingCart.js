import { renderListWithTemplate, getLocalStorage, setLocalStorage } from './utils.js';

export default class CartList {
  constructor (key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
    document.getElementById('minus').addEventListener('click', this.minus.bind(this));
    document.getElementById('plus').addEventListener('click', this.plus.bind(this));
  }
  
  prepareTemplate(template, product) {
    template.querySelector('.cart-card__image img').src =  product.Images.PrimarySmall;
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
    template.querySelector('.cart-card__price').textContent += product.FinalPrice;
    template.querySelector('.cart-card__quantity').textContent += product.Quantity; 
    return template;
  }
  
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    
  }

  minus() {
    let items = getLocalStorage('so-cart');
    const item = items.find(item => item.Id);
    item.Quantity != null ? item.Quantity-- : item.Quantity = 0;
    setLocalStorage('so-cart', items);
    this.renderList(items);
  }
  plus() {
    let items = getLocalStorage('so-cart');
    const item = items.find(item => item.Id);
    item.Quantity != null ? item.Quantity++ : item.Quantity = 2;
    setLocalStorage('so-cart', items);
    this.renderList(items);
  }
}