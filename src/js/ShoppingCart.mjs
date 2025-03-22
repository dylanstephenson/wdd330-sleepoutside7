import {
  getLocalStorage,
  hideElement,
  showElement,
  getCartCount,
} from './utils.mjs';

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key; // Ensure this matches what is being used in local storage
    this.parentSelector = parentSelector;
  }

  // Renders the cart contents into the cart page
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems || cartItems.length === 0) {
      this.displayEmptyCartMessage();
      return;
    }
    
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join('');
  }

  // Displays a message when the cart is empty
  displayEmptyCartMessage() {
    document.querySelector(this.parentSelector).innerHTML = `
      <p class="empty-cart">Your cart is empty.</p>
    `;
  }

  // Removes an item from the cart and updates the UI
  removeItem(id) {
    let cartItems = getLocalStorage('cart');
    if (cartItems) {
      const itemIndex = cartItems.findIndex((item) => item.Id === id);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    }

    const itemToDelete = document.getElementById(id);
    if (itemToDelete) {
      itemToDelete.remove();
    }

    this.calculateTotal();
    
    if (cartItems.length === 0) {
      this.displayEmptyCartMessage();
    }
  }

  // Calculates and displays the total price
  calculateTotal() {
    const element = document.getElementById('cart-footer');
    const totalElement = document.getElementById('cart-total');
    let finalPrice = 0;

    const cartItems = getLocalStorage('cart')
    if (cartItems && cartItems.length > 0) {
      showElement(element);
      cartItems.forEach(item => finalPrice += item.FinalPrice);
      totalElement.innerText = `Total: $${finalPrice.toFixed(2)}`;
    } else {
      hideElement(element);
    }
  }
}

// Template for rendering each cart item
function cartItemTemplate(item) {
  return `
    <li class='cart-card divider' id='${item.Id}'>
      <button class='close-btn' data-id='${item.Id}'>X</button>
      <a href='#' class='cart-card__image'>
        <img src='${item.Images.PrimaryMedium}' alt='${item.Name}' />
      </a>
      <a href='#'>
        <h2 class='card__name'>${item.Name}</h2>
      </a>
      <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
      <p class='cart-card__quantity'>Qty: ${item.Q || 1}</p>
      <p class='cart-card__price'>$${item.FinalPrice}</p>
    </li>
  `;
}