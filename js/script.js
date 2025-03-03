document.addEventListener("DOMContentLoaded", () => {
  // Navbar Toggle (for mobile view)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    let username = localStorage.getItem("username");
    if (username) {
      document.getElementById("user-name").textContent = username;
    }
  });

  // Sticky Navbar
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) header.classList.toggle("sticky", window.scrollY > 50);
  });

  // Wishlist & Cart Management
  const wishlistCount = document.querySelector(".wishlist-count");
  const cartCount = document.querySelector(".cart-count");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateCounts();

  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("wishlist-btn")) {
      addToWishlist(target);
    } else if (target.classList.contains("cart-btn")) {
      addToCart(target);
    } else if (target.classList.contains("buy-now-btn")) {
      window.location.href = "payment.html";
    }
  });

  function addToWishlist(button) {
    const product = getProductDetails(button);
    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateCounts();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Retrieve and display username if logged in
    let username = localStorage.getItem("username");
    if (username) {
      let userNameElement = document.getElementById("user-name");
      if (userNameElement) {
        userNameElement.textContent = username;
      }
    }

    // Retrieve and display cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
      cartContainer.innerHTML = "";
      if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      } else {
        cartItems.forEach((item) => {
          let cartItemElement = document.createElement("div");
          cartItemElement.classList.add("cart-item");
          cartItemElement.innerHTML = `
                        <p>${item.name} - $${item.price}</p>
                    `;
          cartContainer.appendChild(cartItemElement);
        });
      }
    }
  });

  // Function to store username after login
  function storeUsername(username) {
    localStorage.setItem("username", username);
  }

  // Function to add items to cart and persist them
  function addToCart(item) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  // Logout function
  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("cart");
    window.location.href = "login.html"; // Redirect to login page
  }

  function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert", type);
    alertBox.innerText = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 2000); // Remove alert after 2 seconds
  }

  function getProductDetails(button) {
    return {
      id: button.getAttribute("data-id"),
      name: button.getAttribute("data-name"),
      image: button.getAttribute("data-image"),
    };
  }

  function updateCounts() {
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
    if (cartCount) cartCount.textContent = cart.length;
  }

  // Dynamic Product Loading
  const products = [
    {
      id: 1,
      name: "Facial Cleanser",
      price: 20,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZeCHtcy-w3_lcUKUulAmP_cqKgEg-M3i5rrwvQJ_J4C8CFesCRAnVJRoBCCvZdXDmu6dx-Y_93qVxByZTg-lgkFXoCDiqpWgZJ_mpM2c5ez8YFdkdEuZa",
    },
    {
      id: 2,
      name: "Hydrating Moisturizer",
      price: 25,
      img: "https://www.melume-skinscience.com/cdn/shop/files/Produktfotos_1000x1000_NEU_2_288x.jpg?v=1695116956",
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      price: 30,
      img: "https://m.media-amazon.com/images/I/51wERqBeGLL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      name: "SPF 50 Sunscreen",
      price: 18,
      img: "https://www.dotandkey.com/cdn/shop/files/vitcsun80_6d354c0c-118e-4763-b38a-e0666f185414.jpg?v=1727354539",
    },
    {
      id: 1,
      name: "Facial Cleanser",
      price: 20,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZeCHtcy-w3_lcUKUulAmP_cqKgEg-M3i5rrwvQJ_J4C8CFesCRAnVJRoBCCvZdXDmu6dx-Y_93qVxByZTg-lgkFXoCDiqpWgZJ_mpM2c5ez8YFdkdEuZa",
    },
    {
      id: 2,
      name: "Hydrating Moisturizer",
      price: 25,
      img: "https://www.melume-skinscience.com/cdn/shop/files/Produktfotos_1000x1000_NEU_2_288x.jpg?v=1695116956",
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      price: 30,
      img: "https://m.media-amazon.com/images/I/51wERqBeGLL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      name: "SPF 50 Sunscreen",
      price: 18,
      img: "https://www.dotandkey.com/cdn/shop/files/vitcsun80_6d354c0c-118e-4763-b38a-e0666f185414.jpg?v=1727354539",
    },
    {
      id: 1,
      name: "Facial Cleanser",
      price: 20,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZeCHtcy-w3_lcUKUulAmP_cqKgEg-M3i5rrwvQJ_J4C8CFesCRAnVJRoBCCvZdXDmu6dx-Y_93qVxByZTg-lgkFXoCDiqpWgZJ_mpM2c5ez8YFdkdEuZa",
    },
    {
      id: 2,
      name: "Hydrating Moisturizer",
      price: 25,
      img: "https://www.melume-skinscience.com/cdn/shop/files/Produktfotos_1000x1000_NEU_2_288x.jpg?v=1695116956",
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      price: 30,
      img: "https://m.media-amazon.com/images/I/51wERqBeGLL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      name: "SPF 50 Sunscreen",
      price: 18,
      img: "https://www.dotandkey.com/cdn/shop/files/vitcsun80_6d354c0c-118e-4763-b38a-e0666f185414.jpg?v=1727354539",
    },
  ];

  const productContainer = document.querySelector(".product-container");
  if (productContainer) {
    productContainer.innerHTML = products
      .map(
        (product) => `
            <div class="product">
                <button class="wishlist-btn" data-id="${product.id}" data-name="${product.name}" data-image="${product.img}">
                    ❤️
                </button>
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <div class="product-buttons">
                    <button class="btn cart-btn" data-id="${product.id}" data-name="${product.name}" data-image="${product.img}">Add to Cart</button>
                    <button class="btn buy-now-btn" data-id="${product.id}">Buy Now</button>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Form Validation
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("input[name='name']").value.trim();
      const email = document.querySelector("input[name='email']").value.trim();
      const message = document
        .querySelector("textarea[name='message']")
        .value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields!");
      } else {
        alert("Thank you for reaching out! We will get back to you soon.");
        contactForm.reset();
      }
    });
  }

  // Reveal Products on Scroll
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".product").forEach((product) => {
      if (product.getBoundingClientRect().top < window.innerHeight * 0.8) {
        product.classList.add("show");
      }
    });
  });
});
