import { renderListWithTemplate } from './utils.js';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sorterValue = 0;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    // capitilize the first letter of this.category
    document.querySelector('.category_title').innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    this.renderList(list);
  }
  sortListbyPrice(list) {
    return list.sort((a, b) => {
      return a.FinalPrice - b.FinalPrice;
    });
  }
  sortListByName(list) {
    return list.sort((a, b) => {
      return a.NameWithoutBrand.localeCompare(b.NameWithoutBrand);
    });
  }

  
  
  prepareTemplate(template, product) {
    console.log(product)
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
    // only add discountText if IsClearance property is true

    if (product.IsClearance) {
      const discountText = document.createElement('span');
      // add class to discount text
      discountText.classList.add('discount');
      // add text to discount text
      discountText.textContent = '15% Off Today Only!';
      // add text to discount price and limit to 2 decimal places
      // add red color to discount price
      discountPrice.innerHTML = `<span style="color:red">$${(product.FinalPrice - (product.FinalPrice * .15)).toFixed(2)}</span>`;


   
      // add text to strikeout price
      strikeoutPrice.textContent = `$${product.FinalPrice}`;
     
      // remove any text in price
      // add strikeout price to price element
      price.appendChild(strikeoutPrice);
      price.appendChild(discountPrice);
      template.querySelector('.product-card__price').appendChild(discountText);
      // remove $ from .product-card__price
    }else {
      price.textContent = `$${product.FinalPrice}`;

    }
      // add strikeout price
    
    template.querySelector('.product-card__price').textContent = '';
    template.querySelector('.product-card__price').appendChild(price);
    // add discount price to price element
    // add 15% Off Today Only
  
   

    template.querySelector
    return template;
  }
  renderList(list) {
    this.listElement.innerHTML = '';
    // filter out products that do not have an  id of 880RR,985RF,989CG, 985PR in list
    //const filteredList = list.filter(item => item.Id === '880RR' || item.Id === '985RF' || item.Id === '989CG' || item.Id === '985PR');
    const template = document.getElementById('product-card-template');
    const fragment = document.createDocumentFragment();
    // list fragment should be a dropdown list with 4 options: sort by name ascending, sort by name descending, sort by price ascending, sort by price descending
    // create dropdown list
    const dropdown = document.createElement('select');
    // add class to dropdown list
    dropdown.classList.add('dropdown');
   
    // create options for dropdown list
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    const option3 = document.createElement('option');
    const option4 = document.createElement('option');

    // add text to options
    option1.textContent = 'Sort by Name Ascending';
    option2.textContent = 'Sort by Name Descending';
    option3.textContent = 'Sort by Price Ascending';
    option4.textContent = 'Sort by Price Descending';

    // add options to dropdown list
    dropdown.appendChild(option1);
    dropdown.appendChild(option2);
    dropdown.appendChild(option3);
    dropdown.appendChild(option4);
    dropdown.selectedIndex = this.sorterValue;

    // add dropdown list to fragment
    fragment.appendChild(dropdown);

    // add event listener to dropdown list
    dropdown.addEventListener('change', (event) => {
      // if option1 is selected, sort list by name ascending
      if (event.target.value === 'Sort by Name Ascending') {
        this.sorterValue = 0;
        this.sortListByName(list);
        this.renderList(list);
      
      }
      // if option2 is selected, sort list by name descending
      if (event.target.value === 'Sort by Name Descending') {
        this.sorterValue = 1;
        this.sortListByName(list).reverse();
        this.renderList(list);
       
      }
      // if option3 is selected, sort list by price ascending
      if (event.target.value === 'Sort by Price Ascending') {
        this.sorterValue = 2;
        this.sortListbyPrice(list);
        this.renderList(list);
      }
      // if option4 is selected, sort list by price descending
      if (event.target.value === 'Sort by Price Descending') {
        this.sorterValue = 3;
        this.sortListbyPrice(list).reverse();
        this.renderList(list);
      }
    });
    // add framgent to listElement
    this.listElement.appendChild(fragment);


 


    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    
  }
}