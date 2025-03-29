//purpose is to generate a list of product cards in HTML from an array

import { renderListWithTemplate, createBreadcrumbs } from "./utils.mjs";
import { generateDiscount,  } from "./ProductDetails.mjs";

//Template literal for product cards on main page
function productCardTemplate(product){
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name} ">
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    ${generateDiscount(product)}
    <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    <button 
        class="product-details-button"
        data-id="${product.Id}"
        data-brand="${product.Brand.Name}"
        data-name="${product.NameWithoutBrand}"
        data-image="${product.Images.PrimaryLarge}"
        data-color="${product.Colors[0].ColorName}"
        data-description="${encodeURIComponent(product.DescriptionHtmlSimple)}"
    >Preview
    </button>
</li>`
}

export function renderModalDetails(event) {
    const button = event.target;
    
    // Retrieve product details from data attributes
    const product = {
        Brand: { Name: button.dataset.brand },
        NameWithoutBrand: button.dataset.name,
        Images: { PrimaryLarge: button.dataset.image },
        Colors: [{ ColorName: button.dataset.color }],
        DescriptionHtmlSimple: decodeURIComponent(button.dataset.description) // Decode here
    };

    // Check if modal already exists and remove it
    let existingModal = document.querySelector('.product-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create the modal container
    const modal = document.createElement('div');
    modal.classList.add('product-modal');

    // Populate modal with product details
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span> <!-- Close button -->
            <h3>${product.Brand.Name}</h3>
            <h2 class="divider">${product.NameWithoutBrand}</h2>
            <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
            <p class="product__description"><strong>Description: </strong>${product.DescriptionHtmlSimple}</p>
            <p class="product__color"><strong>Color: </strong>${product.Colors[0].ColorName}</p>
        </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);

    // Show the modal
    modal.style.display = 'flex';

    // Close modal when clicking the close button
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = document.querySelector(".product-list");
        this.productList = [];
    }
    async init(sortBy = "name"){
        this.productList = await this.dataSource.getData(this.category);
        this.sortProducts(sortBy);
        this.renderList(this.productList)
        document.querySelectorAll('.product-details-button').forEach(button => {
            button.addEventListener('click', renderModalDetails);
          });
    }
    
    renderList(productList){
        //filter out bad products before sending to render
        this.listElement.textContent = ''
        this.filter(productList);
        renderListWithTemplate(productCardTemplate, this.listElement, productList, 'afterbegin', false);

        //add breadcrumbs based on existing (valid) products.
        const validProducts = productList.filter(product => product);
        const count = validProducts.length;
        createBreadcrumbs(this.category, count);
    }

    filter(productList){
        //filtering out by hardcoded id.  feels brute force but not seeing another way to filter?
        const idFilters = ["880RT", "989CG"];
        Object.keys(productList).forEach(key => {
            const product = productList[key];
            if (idFilters.includes(product.Id)) {
                delete productList[key];
            }
        });
    }
    sortProducts(sortBy) {
        if (sortBy === "name") {
            this.productList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand))
        } else if (sortBy === "price") {
            this.productList.sort((a, b) => a.FinalPrice - b.FinalPrice)
        }
    }

}