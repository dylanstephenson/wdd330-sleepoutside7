//js for the main html page
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
// import { loadHeaderFooter, renderCartCount } from "./utils.mjs";

//create ProductData object
const dataSource = new ProductData("tents");
//create listing object
const listing = new ProductList("tents", dataSource, "ul");
//initialize listing object
listing.init();

// Update page with new sorted product list
const sortBySelect = document.getElementById("sort-by");

sortBySelect.addEventListener("change", () => {
  if (listing) {
    listing.init(sortBySelect.value);
  }
})

async function init() {
    await loadHeaderFooter(); // Wait for the header to fully load
    // renderCartCount(); // Ensure the cart counter updates correctly
  }
  
  init();