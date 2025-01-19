// Inventory data
let inventory = [];

// Proxy for stock validation
const createInventoryProxy = (product) => {
  return new Proxy(product, {
    set(target, property, value) {
      if (property === "quantity" && value < 0) {
        throw new Error("Stock quantity cannot be negative!");
      }
      target[property] = value;
      return true;
    },
  });
};

// Fetch inventory data from server
const fetchInventory = async () => {
  try {
    const response = await fetch("https://api.example.com/inventory");
    if (!response.ok) throw new Error("Failed to fetch inventory");
    const data = await response.json();
    inventory = data.map((product) =>
      createInventoryProxy({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
      })
    );
    renderInventory();
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

// Add product to inventory
document.getElementById("add-product-btn").addEventListener("click", () => {
  const name = document.getElementById("product-name").value;
  const quantity = parseInt(
    document.getElementById("product-quantity").value,
    10
  );

  if (!name || isNaN(quantity)) {
    alert("Please provide valid product details!");
    return;
  }

  const newProduct = createInventoryProxy({
    id: Date.now(),
    name,
    quantity,
  });

  inventory.push(newProduct);
  saveToLocalStorage();
  renderInventory();

  // Clear input fields
  document.getElementById("product-name").value = "";
  document.getElementById("product-quantity").value = "";
});

// Save inventory to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("inventory", JSON.stringify(inventory));
};

// Load inventory from localStorage
const loadFromLocalStorage = () => {
  const storedInventory = localStorage.getItem("inventory");
  if (storedInventory) {
    inventory = JSON.parse(storedInventory).map((product) =>
      createInventoryProxy(product)
    );
  }
};

// Render inventory dynamically
const renderInventory = () => {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  inventory.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className =
      "p-4 border rounded flex justify-between items-center";

    productElement.innerHTML = `
      <div>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Quantity:</strong> ${product.quantity}</p>
      </div>
      <div>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mb-2" 
          onclick="updateProduct(${product.id}, 'increase')">Increase</button>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mb-2" 
          onclick="updateProduct(${product.id}, 'decrease')">Decrease</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" 
          onclick="removeProduct(${product.id})">Remove</button>
      </div>
    `;

    productsContainer.appendChild(productElement);
  });
};

// Update product quantity
const updateProduct = (id, action) => {
  const product = inventory.find((p) => p.id === id);
  if (product) {
    if (action === "increase") {
      product.quantity++;
    } else if (action === "decrease" && product.quantity > 0) {
      product.quantity--;
    }
    saveToLocalStorage();
    renderInventory();
  }
};

// Remove product
const removeProduct = (id) => {
  inventory = inventory.filter((product) => product.id !== id);
  saveToLocalStorage();
  renderInventory();
};

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderInventory();
});
