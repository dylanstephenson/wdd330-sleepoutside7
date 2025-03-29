import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

//Import modal function
import modal from "./modal.mjs";

//load modal on first visit following document loading
document.addEventListener("DOMContentLoaded", () => {
  modal();
});

const productId = getParams("product");
const dataSource = new ExternalServices("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

//wk3 dynamic header footer
loadHeaderFooter();
