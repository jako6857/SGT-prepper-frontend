import { productPage } from './controllers/productController.js';
import { LoginPage } from './controllers/logincontroller.js'; 
import { Cartpage } from './controllers/cartController.js';
import { router } from './router/index.js';
import { CheckoutPage } from './controllers/checkoutController.js';


const ROOT = document.getElementById("app");

router({
  '/': () => productPage(), // Forside
  '/login': () => LoginPage(), // Login
  '/cart': () => Cartpage(), // Indkøbskurv
  '/checkout': () => CheckoutPage(), // Checkout
}, '#app');


