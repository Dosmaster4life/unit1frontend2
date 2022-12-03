import { loadHeaderFooter } from './utils.js';
// check if the user has ever been to the site before, if not, set the user's visited status to true
if (localStorage.getItem('visited') === null) {

   
    // create a banner of html content to the user to let them know about the site
    const banner = document.createElement('div');
    // The banner sould be red and have a box shadow
    banner.classList.add('banner');
    // when the banner button is clicked hide the banner and say that the user has registered


    // button listener 
  
    banner.innerHTML = `
    <div class="banner__content">
    <h6 class="banner__title">Welcome to Sleep Outside! Register within 24 hours to be entered in a giveaway for a Tent!</h6>
    <button class="banner__button onclick="registered()">Register</button>
    
    `;
    // add the banner to the header of the page
    document.querySelector('header').appendChild(banner);   
    banner.querySelector('.banner__button').addEventListener('click', () => {
        localStorage.setItem('visited', true)
        // remove the banner from the page
        banner.remove();
        // show alert to user that they have registered
        alert('You have registered for the giveaway!');
    });
  


}

    
   
loadHeaderFooter();
