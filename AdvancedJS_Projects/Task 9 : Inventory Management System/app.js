// IndexedDB setup
const dbRequest = indexedDB.open("InventoryDB", 1);
dbRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("products", { keyPath: "id", autoIncrement: true });
};

const saveToIndexedDB = (product) => {
  const db = dbRequest.result;
  const transaction = db.transaction("products", "readwrite");
  const store = transaction.objectStore("products");
  store.add(product);
};

// Proxy for stock validation
const createInventoryProxy = (inventory) => {
  return new Proxy(inventory, {
    set(target, property, value) {
      if (property === "quantity" && value < 0) {
        throw new Error("Stock quantity cannot be negative!");
      }
      target[property] = value;
      return true;
    },
  });
};

// Inventory data
let inventory = [];

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
  const quantity = parseInt(document.getElementById("product-quantity").value, 10);

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
  saveToIndexedDB(newProduct);
  renderInventory();

  // Clear input fields
  document.getElementById("product-name").value = "";
  document.getElementById("product-quantity").value = "";
});

// Render inventory dynamically
const renderInventory = () => {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  inventory.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "p-4 border rounded flex justify-between items-center";

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
    renderInventory();
  }
};

// Remove product
const removeProduct = (id) => {
  inventory = inventory.filter((product) => product.id !== id);
  renderInventory();
};

// Initialize application
document.addEventListener("DOMContentLoaded", fetchInventory);
