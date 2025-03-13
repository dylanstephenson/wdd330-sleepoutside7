// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  //get existing Data from localStorage.  If it doesn't exist yet, make an empty array
  let existingData = getLocalStorage(key) || [];
  //append the new data to the existingData
  existingData.push(data);

  //save to localStorage
  localStorage.setItem(key, JSON.stringify(existingData));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


//week2 team - dynamic product data and details
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

//used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear=false){
  const htmlStrings = list.map(templateFn);
  //use clear to wipe the element before loading with the template
  if (clear){
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

//Week3 render header footer with template
export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin"){
  //No idea what this is for...
  if(callback) {
    callback(data)
  }
  //insert the template data at the beginning of the element.
  parentElement.insertAdjacentHTML(position, templateFn);
}

export async function loadHeaderFooter(){
  //grab header/footer elements
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  //grab the template data
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  //moved renderCartCount into here so it's loaded after the Header/Footer is created since that is an async function.
  renderCartCount()
}
//fetch the template info
//note this is generic so could be reused if needed.
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template
}
//cart superscript
export function renderCartCount(){
  const cartCounter = document.getElementById("cart-count");
  const cartCount = getCartCount();

  if (cartCount>0){
    showCartCounter(cartCounter);
  }
  else{
    hideCartCounter(cartCounter);
  }
  console.log(cartCount)
  cartCounter.innerText = cartCount;

}
//Toggle visibility of the cart depending on if something is in it
//default is hidden
function showCartCounter(element){
  element.classList.add("visible");
  element.classList.remove("hidden");
}
function hideCartCounter(element){
  element.classList.add("hidden");
  element.classList.remove("visible");
}
function getCartCount() {
  const cart = getLocalStorage("so-cart");
  let cartCount = 0;
  if (cart !== null && cart !== undefined) {
    cartCount = cart.length;
  }
  return cartCount;
}
