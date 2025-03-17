//js for the main html page
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, renderCartCount } from "./utils.mjs";

// Initialize site
async function init() {
  await loadHeaderFooter(); // Ensure header/footer are loaded
  renderCartCount(); // Update the cart count in the header
}

init();

//create ProductData object
const dataSource = new ProductData("tents");
//create listing object
const listing = new ProductList("tents", dataSource, "ul");
//initialize listing object
listing.init();