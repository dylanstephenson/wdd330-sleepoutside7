// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to local storage
export function setLocalStorage(key, data) {
  let existingData = getLocalStorage(key) || [];
  existingData.push(data);
  localStorage.setItem(key, JSON.stringify(existingData));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get URL parameters
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Render header/footer with template
export function renderWithTemplate(templateFn, parentElement) {
  if (parentElement) {
    parentElement.innerHTML = templateFn;
  } else {
    console.warn(`Element not found for template insertion.`);
  }
}

export async function loadHeaderFooter() {
  // Detect if we're in `src/` (index.html) or a subdirectory (cart/index.html)
  const basePath = window.location.pathname.includes("/cart") ||
                   window.location.pathname.includes("/product_pages") ? 
                   ".." : "."; 

  // Grab header/footer elements
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  // Grab the template data using the correct basePath
  const headerTemplate = await loadTemplate(`${basePath}/public/partials/header.html`);
  const footerTemplate = await loadTemplate(`${basePath}/public/partials/footer.html`);

  // Insert templates into the DOM
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  // Ensure the cart count updates AFTER the header is fully loaded
  setTimeout(() => {
    renderCartCount();
  }, 100);
}

// Fetch template content
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.text();
  } catch (error) {
    console.error("Error loading template:", error);
    return "";
  }
}

// FIXED: Cart superscript updates correctly across all pages
export function renderCartCount() {
  const cartCounter = document.getElementById("cart-count");
  if (!cartCounter) {
    console.warn("Cart counter element not found.");
    return;
  }

  const cartCount = getCartCount();
  cartCounter.innerText = cartCount;

  if (cartCount > 0) {
    showCartCounter(cartCounter);
  } else {
    hideCartCounter(cartCounter);
  }
}

// Toggle cart counter visibility
function showCartCounter(element) {
  element.classList.add("visible");
  element.classList.remove("hidden");
}

function hideCartCounter(element) {
  element.classList.add("hidden");
  element.classList.remove("visible");
}

// FIXED: Prevent null issues when fetching cart count
export function getCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  return cart.length;
}
