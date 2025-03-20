import { loadHeaderFooter } from "./utils.mjs";
// import { loadHeaderFooter, renderCartCount } from "./utils.mjs";

async function init() {
  await loadHeaderFooter(); // Wait for the header to fully load
  // renderCartCount(); // Ensure the cart counter updates correctly
}

init();
