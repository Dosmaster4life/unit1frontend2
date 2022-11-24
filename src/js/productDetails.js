import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter, 
  alertMessage,
  getCartCount
} from './utils.js';

loadHeaderFooter();

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;

  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    this.addDiscount();
    // add listener to Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {

    let items = getLocalStorage('so-cart') != null ? getLocalStorage('so-cart') : [];
    // if item is in cart, increase quantity
    const item = items.find(item => item.Id === this.product.Id);
    if (item) {
      item.Quantity != null ? item.Quantity++ : item.Quantity = 2;

    } else {
      // add item to cart
      this.product.Quantity = 1;
      items.push(this.product)
    }
    // items.push(this.product)
    setLocalStorage('so-cart', items)
    this.animateAddToCart();
    alertMessage('Item added to cart', 'success');

  }
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$<s>${this.product.FinalPrice}</s></p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }

  addDiscount() {
    if (this.product.IsClearance === true) {
      document.querySelector('.product-card__price').innerHTML = `<span class="strikethroughPrice">$${this.product.FinalPrice}</span> <span class="discount">$${(this.product.FinalPrice - (this.product.FinalPrice * .15)).toFixed(2)}</span> <span class="discountMessage">15% Off Today Only!</span>`;
    } else {
      document.querySelector('.product-card__price').innerHTML = `<p class="product-card__price">$${this.product.FinalPrice}</p>`;
    }
  }

  animateAddToCart() {
    const cart = document.querySelector('.cart');
    const cartIcon = document.querySelector('#svgCart');
    getCartCount();
    cart.classList.add('apply-shake');
    cartIcon.classList.add('apply-shake');
    cart.addEventListener('animationend', (e) => {
      cart.classList.remove('apply-shake');
    });
    cartIcon.addEventListener('animationend', (e) => {
      cartIcon.classList.remove('apply-shake');
    });
  }


}
