import { getLocalStorage } from "./utils.mjs"

// Creating class that will add the totals to the checkout information
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
        this.calculateItemSummary();
      }
    
      calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        this.list.forEach((product) => {
            this.itemTotal += product.FinalPrice;
        })
      }
    
      calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * .06)
        if (this.list.length() > 0){
            this.shipping = 10 + (this.list.length() * 2) - 2
        }
        console.log(this.shipping);
        this.orderTotal = this.itemTotal + this.shipping + this.tax
    
        // display the totals.
        this.displayOrderTotals();
        
      }
    
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`)
        const tax = document.querySelector(`${this.outputSelector} #tax`)
        const shipping = document.querySelector(`${this.outputSelector} #shipping`)
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`)

        subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
      }
    }
    

