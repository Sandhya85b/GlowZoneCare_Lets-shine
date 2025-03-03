// Selecting elements
const accountIcon = document.getElementById("account-icon");
const accountModal = document.getElementById("account-modal");
const closeModal = document.querySelector(".close");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const userNameDisplay = document.getElementById("user-name");

// Show modal when clicking the account icon
accountIcon.addEventListener("click", () => {
    accountModal.style.display = "flex";
});

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
    accountModal.style.display = "none";
});

// Switch to Login tab
loginTab.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
});

// Switch to Register tab
registerTab.addEventListener("click", () => {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
});

// Register a new user
registerBtn.addEventListener("click", () => {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists. Choose another.");
        return;
    }

    // Store user data in localStorage
    localStorage.setItem(username, JSON.stringify({ password, cart: [], wishlist: [] }));
    alert("Registration successful! Please log in.");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});

// Login user
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const userData = localStorage.getItem(username);
    if (!userData) {
        alert("User not found. Please register first.");
        return;
    }

    const user = JSON.parse(userData);
    if (user.password !== password) {
        alert("Incorrect password.");
        return;
    }

    sessionStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    accountModal.style.display = "none";
    updateUI(username);
});

// Logout user
logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    alert("Logged out.");
    updateUI(null);
});

// Update UI on login/logout
function updateUI(username) {
    logoutBtn.style.display = username ? "inline-block" : "none";
    accountIcon.style.display = username ? "none" : "inline-block";
    userNameDisplay.textContent = username ? `Welcome, ${username}` : "";

    if (username) {
        // Load cart and wishlist from localStorage
        const userData = JSON.parse(localStorage.getItem(username));
        updateCartAndWishlist(userData.cart, userData.wishlist);
    }
}

// Update cart and wishlist UI
function updateCartAndWishlist(cart, wishlist) {
    // Update cart count
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = cart.length;

    // Update wishlist (example, you can show it dynamically on the page)
    const wishlistCount = document.querySelector(".wishlist-count");
    wishlistCount.textContent = wishlist.length;
}

// Check if user is logged in on page load
document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        updateUI(loggedInUser);
    }
});
