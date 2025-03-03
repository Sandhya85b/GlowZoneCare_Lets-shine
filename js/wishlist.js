// Retrieve wishlist from localStorage or initialize it
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to get product details (from product page)
function getProductDetails(button) {
  const productDiv = button.closest(".product");
  return {
    id: productDiv.querySelector(".product-title").innerText, // Using title as ID
    title: productDiv.querySelector(".product-title").innerText,
    image: productDiv.querySelector("img").src,
    description: productDiv.querySelector("p").innerText,
  };
}

// Function to add item to wishlist
function addToWishlist(button) {
  const product = getProductDetails(button);

  // Check if product already exists in wishlist
  if (!wishlist.some((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist! ❤️");
    updateWishlistCount();
  } else {
    alert("Already in Wishlist!");
  }
}

// Function to display wishlist on the wishlist page
function displayWishlist() {
  const wishlistContainer = document.getElementById("wishlist-items");
  wishlistContainer.innerHTML = ""; // Clear existing items

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((product, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("wishlist-item");
    itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="wishlist-info">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <button class="remove-wishlist" onclick="removeFromWishlist(${index})">Remove</button>
               <button class="btn buy-now-btn" data-id="${product.id}">Buy Now</button>
            </div>
        `;
    wishlistContainer.appendChild(itemDiv);
  });
}

// Function to remove item from wishlist
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayWishlist(); // Refresh wishlist UI
  updateWishlistCount(); // Update wishlist count in nav
}

// Update the wishlist count on the wishlist icon
function updateWishlistCount() {
  const wishlistCount = document.querySelector(".wishlist-count");
  wishlistCount.textContent = wishlist.length;
}

// Call displayWishlist() when the wishlist page loads
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("wishlist-items")) {
    displayWishlist();
  }
  updateWishlistCount(); // Ensure the count is accurate when loading the page
});

function updateWishlistCount() {
  const wishlistCount = document.querySelector('.wishlist-count');
  wishlistCount.textContent = wishlist.length;
}

// Update count after adding an item to wishlist
function addToWishlist(button) {
  const product = getProductDetails(button);

  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showAlert('Added to Wishlist! ❤️', 'success');
    updateWishlistCount();
  } else {
    showAlert('Already in Wishlist!', 'warning');
  }
}

// Update the wishlist count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateWishlistCount();
});
