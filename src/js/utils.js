function convertToText (res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
//Get URL Parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  })
}
export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if(callback) {
    clone = callback(clone,data);
  } try {
    parent.appendChild(clone);
  } catch(e) {
    console.log(e);
  }
  
}
export async function loadTemplate (path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}
export async function loadHeaderFooter () {
  const header = await loadTemplate('../partials/header.html');
  const footer = await loadTemplate('../partials/footer.html');
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');

  //add sign up box to the footer that has an email input and a submit button, when the button is clicked, save the email to localstorage and don't show the box again
  const signUpBox = document.createElement('div');
  signUpBox.classList.add('sign-up-box');
  signUpBox.innerHTML = `
  <div class="sign-up-box__content">
  <h6 class="sign-up-box__title">Sign up for our newsletter!</h6>
  <input class="sign-up-box__input" type="email" placeholder="Email">
  <button class="sign-up-box__button">Submit</button>
  </div>
  `;
  // button listener for sign up box
  signUpBox.querySelector('.sign-up-box__button').addEventListener('click', () => {
    // get the email from the input
    const email = signUpBox.querySelector('.sign-up-box__input').value;
    // save the email to local storage
    setLocalStorage('email', email);
    // remove the sign up box from the page
    signUpBox.remove();
    // show alert to user that they have registered
    alert('You have registered for the newsletter!');
  });
  if(localStorage.getItem('email') === null) {
    footerElement.appendChild(signUpBox);
  }
  renderWithTemplate(header, headerElement);
  getCartCount();
  renderWithTemplate(footer, footerElement);
}

export function alertMessage (message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.textContent = message;
  // add alert to top of main element
  document.querySelector('main').prepend(alert);
  if(scroll) {
    alert.scrollIntoView();
  }
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

export function getCartCount() {
  let cartQty = 0;
    let items = getLocalStorage('so-cart') != null ? getLocalStorage('so-cart') : [];
    items.forEach(item => {
      cartQty += item.Quantity;
    });
  document.querySelector('.cart-count').textContent = cartQty;
}