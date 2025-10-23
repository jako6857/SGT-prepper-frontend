import { HomePage } from './controllers/homeController.js';
import { router } from './router/index.js';

const ROOT = document.getElementById("container");

router({
  '/': () => HomePage(), // /index.htm
}, '#app');