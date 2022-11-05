let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
function getProductsData() {
  fetch('../json/tents.json')
  .then(convertToJson)
  .then(data => {
    products = data
  })
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  // get the product id
   const product = products.find(item => item.Id === e.target.dataset.id)
  // get the cart from local storage
  let localItems = getLocalStorage('so-cart')
  // if there is no cart in local storage, create an array with 1 product, and set it in local storage other wise add the product to the cart in local storage
   localItems === null ?  setLocalStorage('so-cart', [product]) :  setLocalStorage('so-cart',  localItems.push(product))
}

getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
