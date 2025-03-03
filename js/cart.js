document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.querySelector(".cart-count");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Update the cart display and total
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "0.00";  // Display 0 if cart is empty
        } else {
            let total = 0;

            cartItems.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="100">
                    <div>
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price}</p>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
                
                total += parseFloat(item.price);  // Accumulate price for total calculation
            });

            // Set the total amount
            cartTotal.textContent = total.toFixed(2);  // Show total with 2 decimal points
        }

        // Update cart count
        cartCount.textContent = cartItems.length;
    }

    // Remove item from cart
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartDisplay();
        }
    });

    // Clear the cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            cartItems = [];
            updateCartDisplay();
        });
    }

    // Proceed to checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cartItems.length > 0) {
                alert("Proceeding to checkout...");
            } else {
                alert("Your cart is empty.");
            }
        });
    }

    // Initial cart display update
    updateCartDisplay();
});

// Function to add items to the cart
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (!existingItem) {
        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Product added to cart!");
    } else {
        alert("Product already in cart!");
    }

    // Update cart count in UI
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}
