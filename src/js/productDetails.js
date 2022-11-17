import { setLocalStorage, getLocalStorage, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

export default class ProductDetails {
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.productId)
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    
   let items = getLocalStorage('so-cart') != null ? getLocalStorage('so-cart') : [];
   items.push(this.product)
       setLocalStorage('so-cart', items)

}
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$<s>${this.product.FinalPrice}</s> $${this.product.FinalPrice - (this.product.FinalPrice * .15).toFixed(2)}<span class="discount">15% Off Today Only!</spam></p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }

}