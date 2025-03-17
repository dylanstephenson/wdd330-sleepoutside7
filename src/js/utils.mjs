// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  // get existing Data from localStorage. If it doesn't exist yet, make an empty array
  let existingData = getLocalStorage(key) || [];
  // append the new data to the existingData
  existingData.push(data);

  // save to localStorage
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

// week2 team - dynamic product data and details
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  // use clear to wipe the element before loading with the template
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Week3 render header/footer with template
export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin") {
  if (callback) {
    callback(data);
  }
  parentElement.insertAdjacentHTML(position, templateFn);
}

// ✅ FIXED loadHeaderFooter to ensure cart count updates after header loads
export async function loadHeaderFooter() {
  // Grab header/footer elements
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  // Grab the template data
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const footerTemplate = await loadTemplate("../public/partials/footer.html");

  // Insert templates into the DOM
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  // Ensure the cart count updates AFTER the header is fully loaded
  setTimeout(() => {
    renderCartCount();
  }, 100);
}

// fetch the template info
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// ✅ FIXED cart superscript update
export function renderCartCount() {
  const cartCounter = document.getElementById("cart-count");
  if (!cartCounter) {
    console.warn("Cart counter element not found.");
    return;
  }

  const cartCount = getCartCount();

  if (cartCount > 0) {
    showCartCounter(cartCounter);
  } else {
    hideCartCounter(cartCounter);
  }

  cartCounter.innerText = cartCount;
}

// Toggle visibility of the cart counter
function showCartCounter(element) {
  element.classList.add("visible");
  element.classList.remove("hidden");
}

function hideCartCounter(element) {
  element.classList.add("hidden");
  element.classList.remove("visible");
}

// ✅ FIXED getCartCount to avoid potential null issues
export function getCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  return cart.length;
}
