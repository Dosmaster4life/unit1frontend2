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
   
   const product = products.find(item => item.Id === e.target.dataset.id)
 
  let items = getLocalStorage('so-cart')

  // if there are no items in the cart, add the item to the cart
   if (items === null) {
     setLocalStorage('so-cart', [product])
   } else {
    // check if  product is already in the cart called items
    const item = items.find(item => item.Id === product.Id)
      if (item) {
        // if it is, increase the quantity in the cart, and update the cart

      }
        // if the item is not in the cart, add it to the cart
      items.push(product)
      setLocalStorage('so-cart', items)
   
}
}
getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
