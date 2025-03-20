// This module is responsible for dynamically rendering product details on the product page
// It feeds data into `product.js`, which then populates the `product_pages/index.html` page with the relevant information.
// Additionally, it includes an 'Add to Cart' functionality for adding the product to the shopping cart.
import { setLocalStorage, renderCartCount} from './utils.mjs';

//function to generate discount
export function generateDiscount(product) {
    if (product.SuggestedRetailPrice > product.FinalPrice) {
        const discount = product.SuggestedRetailPrice - product.FinalPrice;
        const discountPercentage = Math.round(discount / product.SuggestedRetailPrice * 100);
        return `<p class="product-card-price"><span class="product-original">$${product.SuggestedRetailPrice}</span> <span class="product-final">$${product.FinalPrice}</span> <span class="product-percentage">(-${discountPercentage}%)</span>
        </p>`
    } else {
        return `<p class="product-card-price">$${product.FinalPrice}</p>`
    }
}

// Template function that generates the HTML structure for the product details section.
// It receives a product object and returns a string of HTML populated with product data.
function productDetailsTemplate(product) {
    return `<section class="product-detail"> 
              <h3>${product.Brand.Name}</h3> <!-- Displays the product's brand -->
              <h2 class="divider">${product.NameWithoutBrand}</h2> <!-- Displays the product's name without the brand -->
              <img
                class="divider"
                src="${product.Images.PrimaryLarge}" <!-- Displays the main product image -->
                alt="${product.NameWithoutBrand}" <!-- Image alt text for accessibility -->
              />
              <p class="product-card__price">$${product.FinalPrice}</p> <!-- Displays the product's price -->
              <p class="product__color">${product.Colors[0].ColorName}</p> <!-- Displays the product's first color -->
              <p class="product__description">
                ${product.DescriptionHtmlSimple} <!-- Displays a simplified HTML description of the product -->
              </p>
              <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button> <!-- Add to Cart button -->
              </div>
            </section>`;
}

// The ProductDetail class handles fetching and displaying detailed product information
// It dynamically loads the data based on the product ID and the category (tent, backpack, etc.).
// This class also manages the 'Add to Cart' button functionality.
export default class ProductDetail {
    constructor(productId, dataSource) {
        // Initializes with the product's ID and the source from which product data will be fetched.
        this.productId = productId;
        this.product = {}; // This will hold the product details after fetching
        this.dataSource = dataSource; // This is used to build the path to the JSON file (category)
    }

    // Initializes the class by fetching the product data based on the product ID
    // and rendering the details in the HTML page. It also sets up the event listener for 'Add to Cart' functionality.
    async init() {
        // Fetch product data using the dataSource to find the specific product by its ID.
        // The `findProductById` method returns a promise, so we use `await` to wait for the data.
        const productData = await this.dataSource.findProductById(this.productId);

        // Once the data is fetched, store it in the product object.
        this.product = productData;

        // Render the product details in the HTML.
        document.querySelector('.product-details-container').innerHTML = productDetailsTemplate(this.product);

        // Add event listener to 'Add to Cart' button after rendering.
        // This ensures that when the button is clicked, the product is added to the shopping cart.
        const addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', () => {
            setLocalStorage('cart', this.product); // Adds the product to localStorage (cart)
            renderCartCount(); // Updates the cart count displayed on the page
        });
    }
}