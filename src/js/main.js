//js for the main html page
import { loadHeaderFooter } from "./utils.mjs";

//load header/footer wk 3
loadHeaderFooter();

// newsletter
const form = document.getElementById("newsletter-form");
const message = document.getElementById("subscribe-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = form.email;

  if (emailInput.checkValidity()) {
    message.textContent = `Sweet! You're now subscribed to our newsletter with ${emailInput.value}!`;
    message.classList.remove("hidden");
    form.reset();
  } else {
    message.textContent = "Please enter a valid email address.";
    message.classList.remove("hidden");
  }
});
