import { renderListWithTemplate } from './utils.js';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    // capitilize the first letter of this.category
    document.querySelector('.category_title').innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    this.renderList(list);
  }
  
  prepareTemplate(template, product) {
    template.querySelector('a').href +=  product.Id;
    template.querySelector('img').src = product.Images.PrimaryMedium ;
    template.querySelector('img').alt += product.Name;
    template.querySelector('.card__brand').textContent = product.Brand.Name;
    template.querySelector('.card__name').textContent = product.NameWithoutBrand;
    //template.querySelector('.product-card__price').textContent += product.FinalPrice; 
    const price = document.createElement('p');
    // create child element to hold strikeout price
    const strikeoutPrice = document.createElement('s');
    // create child element to hold discount price
    const discountPrice = document.createElement('span');
    // create child element to hold discount text
    const discountText = document.createElement('span');
    // add class to discount text
    discountText.classList.add('discount');
    // add text to discount text
    discountText.textContent = '15% Off Today Only!';
    // add text to discount price and limit to 2 decimal places

    discountPrice.textContent = `$${(product.FinalPrice - (product.FinalPrice * .15)).toFixed(2)}`;
    // add text to strikeout price
    strikeoutPrice.textContent = `$${product.FinalPrice}`;
   
    // remove any text in price
    // add strikeout price to price element
    price.appendChild(strikeoutPrice);
    price.appendChild(discountPrice);
    // remove $ from .product-card__price
    template.querySelector('.product-card__price').textContent = '';
    template.querySelector('.product-card__price').appendChild(price);
    // add discount price to price element
    // add 15% Off Today Only
    template.querySelector('.product-card__price').appendChild(discountText);
   

    template.querySelector
    return template;
  }
  renderList(list) {
    this.listElement.innerHTML = '';
    // filter out products that do not have an  id of 880RR,985RF,989CG, 985PR in list
    //const filteredList = list.filter(item => item.Id === '880RR' || item.Id === '985RF' || item.Id === '989CG' || item.Id === '985PR');
    const template = document.getElementById('product-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    
  }
}