import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

//get param category
const category = getParams("category");
//create ProductData object
const dataSource = new ProductData();
//get element for rendering
const element = ".product-list";
//create listing object
const listing = new ProductList(category, dataSource, element);
//initialize listing object
listing.init();

document.querySelector(".title").textContent =
  category.charAt(0).toUpperCase() + category.substring(1);

async function init() {
  await loadHeaderFooter(); // Wait for the header to fully load
  // renderCartCount(); // Ensure the cart counter updates correctly
}

init();
