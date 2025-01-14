// Initialize cart
const createCart = () => {
  let cart = [];
  let totalPrice = 0;

  return {
    addProduct: (product) => {
      cart.push(product);
      totalPrice += product.price;
      saveCartToLocalStorage(cart);
      renderCart(cart);
    },
    removeProduct: (productId) => {
      cart = cart.filter((p) => p.id !== productId);
      totalPrice = cart.reduce((sum, p) => sum + p.price, 0);
      saveCartToLocalStorage(cart);
      renderCart(cart);
    },
    getCart: () => cart,
    getTotalPrice: () => totalPrice,
  };
};

const cart = createCart();

// LocalStorage utilities
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Render cart
const renderCart = (cart) => {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear current items

  cart.forEach((item) => {
    cartItemsContainer.innerHTML += `
        <div class="flex justify-between items-center p-2 border-b">
          <span>${item.name}</span>
          <span>$${item.price}</span>
          <button class="text-red-500" onclick="cart.removeProduct(${item.id})">Remove</button>
        </div>
      `;
  });

  document.getElementById("total-price").textContent = `$${cart.reduce(
    (sum, item) => sum + item.price,
    0
  )}`;
};

// Fetch and display products
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

// Render product list
const renderProducts = (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += `
        <div class="flex justify-between items-center p-2 border rounded-lg">
          <span>${product.title}</span>
          <span>$${product.price}</span>
          <button class="bg-blue-500 text-white px-4 py-1 rounded" 
            onclick="cart.addProduct({ id: ${product.id}, name: '${product.title}', price: ${product.price} })">
            Add to Cart
          </button>
        </div>
      `;
  });
};

// Debouncing search
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const searchProducts = debounce(async (query) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    const filteredProducts = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
  } catch (error) {
    console.error("Error during search:", error);
  }
}, 300);

// Event listeners
document.getElementById("search").addEventListener("input", (e) => {
  searchProducts(e.target.value);
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  const storedCart = loadCartFromLocalStorage();
  renderCart(storedCart);
  fetchProducts();
});
