import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default function modal() {
    //check if this is first visit
    if (getLocalStorage("visited")) return

    //display modal
    const modal = document.createElement("dialog");
    modal.classList.add("welcome-modal");

    modal.innerHTML = `
        <h2 class="modal-heading">Welcome to Sleep Outside!</h2>
        <p class="modal-message">
            Adventure starts here! Whether you’re a seasoned explorer or just getting started with outdoor adventures, Sleep Outside has everything you need—from premium tents and hammocks to rugged backpacks and more!
            <br>
            <strong>Why Register? 🚀 </strong>
            <br>
            By signing up, you unlock exclusive benefits designed for true outdoor enthusiasts:
            <ul>
                <li class="modal-list">✅ First-time welcome discount – Enjoy 10% off your first order!</li>
                <li class="modal-list">✅ Early access to sales & new gear – Get ahead of the crowd on limited-edition gear.</li>
                <li class="modal-list">✅ Exclusive members-only deals – Special discounts just for registered users.</li>
                <li class="modal-list">✅ Camping tips & adventure guides – Stay inspired with expert advice and curated content.</li>
            </ul>
            <br>
            🔹 Join now and make your next outdoor escape even better!
            <br>
            → Sign up today and claim your adventure-ready rewards! 🌲🔥🏕️
        </p>
        <button id="close-modal">Close</button>
    `
    // Append modal to the body
    document.body.appendChild(modal); 
    modal.showModal();

    // Mark as visited
    document.getElementById("close-modal").addEventListener("click", () => {
        modal.close();
        setLocalStorage("visited", true);
    });

    // Mark as visited
    modal.addEventListener("click", (event) => {
        const rect = modal.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          modal.close();
          setLocalStorage("visited", true);
        }
    });
}