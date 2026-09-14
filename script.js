/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3299,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Classic Denim Jacket",
        category: "fashion",
        price: 1999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Running Sneakers",
        category: "shoes",
        price: 2799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Leather Backpack",
        category: "accessories",
        price: 1599,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Premium Sunglasses",
        category: "accessories",
        price: 999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Oversized T-Shirt",
        category: "fashion",
        price: 799,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Sports Sneakers",
        category: "shoes",
        price: 2499,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
    }
];


/* ================= STATE ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

let currentProducts = [...products];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(items) {

    const grid = document.getElementById("productsGrid");

    grid.innerHTML = "";

    if (items.length === 0) {

        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:50px">
                No products found.
            </p>
        `;

        return;
    }

    items.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <button
                    class="wishlist ${isWishlisted ? "active" : ""}"
                    onclick="toggleProductWishlist(${product.id})"
                >
                    ${isWishlisted ? "❤️" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ⭐ ${product.rating}
                    <span>(120)</span>
                </div>

                <div class="price-row">

                    <span class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        + Cart
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });
}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    showToast("Added to cart 🛒");

    updateCartCount();

    renderCart();
}


/* ================= CART ================= */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
            </div>
        `;

        document.getElementById("cartTotal").innerText = "₹0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <div class="cart-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </div>

                <div class="quantity">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(div);

    });

    document.getElementById("cartTotal").innerText =
        "₹" + total.toLocaleString("en-IN");
}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

    renderCart();

    updateCartCount();
}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    renderCart();

    updateCartCount();
}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").innerText = count;
}


/* ================= CART OPEN/CLOSE ================= */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("show");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

    renderCart();
}


function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("show");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");
}


/* ================= SEARCH ================= */

function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    currentProducts = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(query)

        ||

        product.category
            .toLowerCase()
            .includes(query)

    );

    displayProducts(currentProducts);
}


/* Search while typing */

document
    .getElementById("searchInput")
    .addEventListener("input", searchProducts);


/* ================= CATEGORY ================= */

function filterCategory(category) {

    document
        .querySelectorAll(".category")
        .forEach(button => {
            button.classList.remove("active");
        });

    event.currentTarget.classList.add("active");

    if (category === "all") {

        currentProducts = [...products];

    } else {

        currentProducts =
            products.filter(
                product => product.category === category
            );

    }

    displayProducts(currentProducts);
}


/* ================= SORT ================= */

function sortProducts() {

    const type =
        document.getElementById("sortProducts").value;

    let sorted = [...currentProducts];

    if (type === "low") {

        sorted.sort((a, b) => a.price - b.price);

    }

    else if (type === "high") {

        sorted.sort((a, b) => b.price - a.price);

    }

    else if (type === "rating") {

        sorted.sort((a, b) => b.rating - a.rating);

    }

    displayProducts(sorted);
}


/* ================= WISHLIST ================= */

function toggleProductWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(productId => productId !== id);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");
    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();

    displayProducts(currentProducts);
}


function toggleWishlist() {

    const wishlistedProducts =
        products.filter(product =>
            wishlist.includes(product.id)
        );

    if (wishlistedProducts.length === 0) {

        showToast("Your wishlist is empty");

        return;
    }

    displayProducts(wishlistedProducts);

    window.scrollTo({
        top: document
            .getElementById("products")
            .offsetTop - 80,
        behavior: "smooth"
    });
}


function updateWishlistCount() {

    document.getElementById("wishlistCount").innerText =
        wishlist.length;
}


/* ================= LOCAL STORAGE ================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;
    }

    alert(
        "Checkout page coming soon! 🚀"
    );
}


/* ================= SCROLL ================= */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= INITIAL LOAD ================= */

displayProducts(products);

renderCart();

updateCartCount();

updateWishlistCount();
