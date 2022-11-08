import { setLocalStorage } from './utils.js';
import { getLocalStorage } from './utils.js';

export default class ProductDetails {
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    
//     let items = getLocalStorage('so-cart')

//   // if there are no items in the cart, add the item to the cart
//    if (items === null) {
//      setLocalStorage('so-cart', [this.product])
//    } else {
//     // check if  product is already in the cart called items
//     // const item = items.find(item => item.Id === this.product.Id)
//     //   if (item) {
//     //     // if it is, increase the quantity in the cart, and update the cart

//     //   }
//         // if the item is not in the cart, add it to the cart
//       items.push(this.product)
//       setLocalStorage('so-cart', items)
//   }
}
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Image}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }

}