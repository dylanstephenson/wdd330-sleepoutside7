//js for the main html page
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderCartCount } from "./utils.mjs";

//create ProductData object
const dataSource = new ProductData("tents");

//create listing object
const listing = new ProductList("tents", dataSource, "ul");
//initialize listing object
listing.init();
//grabs cart count on main html pag
renderCartCount();
