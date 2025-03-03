// Sample products array
const products = [
    {
        id: 1,
        name: "Facial Cleanser",
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZeCHtcy-w3_lcUKUulAmP_cqKgEg-M3i5rrwvQJ_J4C8CFesCRAnVJRoBCCvZdXDmu6dx-Y_93qVxByZTg-lgkFXoCDiqpWgZJ_mpM2c5ez8YFdkdEuZa",
        description: "Deep cleanses and hydrates skin.",
        price: 25,
        category: "cleanser"
    },
    {
        id: 2,
        name: "Moisturizing Lotion",
        image: "https://via.placeholder.com/300x300.png?text=Moisturizer",
        description: "Hydrates skin and locks in moisture.",
        price: 30,
        category: "moisturizer"
    },
    // Add more products...
];

// Function to display products
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-buttons">
                <button class="add-to-wishlist" onclick="addToWishlist(${product.id})"><i class="fas fa-heart"></i></button>
                <button class="add-to-cart">Add to Cart</button>
                <button class="buy-now">Buy Now</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Function to filter products by category
function filterByCategory(category) {
    if (category === "all") {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Function to sort products by price
function sortByPrice(products, order) {
    return products.sort((a, b) => {
        if (order === "asc") {
            return a.price - b.price;
        } else if (order === "desc") {
            return b.price - a.price;
        }
    });
}

// Event listener for filtering and sorting
document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");

    categoryFilter.addEventListener("change", function () {
        const filteredProducts = filterByCategory(categoryFilter.value);
        displayProducts(filteredProducts);
    });

    priceSort.addEventListener("change", function () {
        const sortedProducts = sortByPrice(products, priceSort.value);
        displayProducts(sortedProducts);
    });

    // Display products initially
    displayProducts(products);
});
