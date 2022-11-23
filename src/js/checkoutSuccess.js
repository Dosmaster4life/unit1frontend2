import { loadHeaderFooter, getParam } from './utils.js';
loadHeaderFooter();


document.getElementById('order-number').textContent = getParam('orderNumber');
