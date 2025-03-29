import { getLocalStorage,  alertMessage, removeAllAlerts, } from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs";
// Creating class that will add the totals to the checkout information
// Convert formDataToJSON for the checkout form

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
  convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON
}

function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    // An Array.map would be perfect for this process.
    const newList = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrince,
            name: item.Name,
            quantity: 1,
        };
    });
    return newList;
  }

export default class CheckoutProcess {
    // Calculate and display the subtotal
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
      }
    
      init() {
        this.list = getLocalStorage(this.key);
        
        if (!this.list || this.list.length === 0) {
          alertMessage("Your cart is empty. Please add items before checking out.");
          return;
        }
      
        this.calculateItemSummary();
      }
    
      calculateItemSummary() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        itemNumElement.innerText = this.list.length;
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;
      }
    
      calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * .06)
        if (this.list.length> 0){
            this.shipping = 10 + (this.list.length * 2) - 2
        }
        console.log(this.shipping);
        this.orderTotal = (
        parseFloat(this.itemTotal) + 
        parseFloat(this.shipping) + 
        parseFloat(this.tax)
        )
        // display the totals.
        this.displayOrderTotals();
        
      }
    
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        
        const tax = document.querySelector(`${this.outputSelector} #tax`)
        const shipping = document.querySelector(`${this.outputSelector} #shipping`)
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`)

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
      }
      
      async checkout() {
        const form = document.forms["checkout-form"];
        const order = formDataToJSON(form);
      
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
      
        try {
          const response = await services.checkout(order);
          console.log(response);
      
          // SUCCESS: redirect to confirmation and clear cart
          localStorage.removeItem(this.key);
          window.location.href = "success.html";
      
        } catch (err) {
          console.error("Checkout failed:", err);
          
          let message = "There was a problem processing your order. Please try again.";
        
          // If the message is an object (field-level errors), format them into a list
          if (err?.message && typeof err.message === "object") {
            const messages = Object.entries(err.message).map(
              ([field, msg]) => `<strong>${field}</strong>: ${msg}`
            );
            message = messages.join("<br>");
          }
        
          alertMessage(message);
        }
      }
}
    

