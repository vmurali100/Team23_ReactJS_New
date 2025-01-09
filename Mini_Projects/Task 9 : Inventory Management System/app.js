// Product Class
class Product {
    constructor(name, quantity) {
      this.id = Date.now(); // Unique ID
      this.name = name;
      this.quantity = quantity;
    }
  
    updateQuantity(amount) {
      this.quantity += amount;
    }
  }
  
  // Inventory
  const inventory = [];
  
  // Add Product
  document.getElementById("addProduct").addEventListener("click", () => {
    const name = document.getElementById("productName").value.trim();
    const quantity = parseInt(document.getElementById("productQuantity").value);
  
    if (name && quantity > 0) {
      const newProduct = new Product(name, quantity);
      inventory.push(newProduct);
      renderProducts();
      document.getElementById("productName").value = "";
      document.getElementById("productQuantity").value = "";
    } else {
      alert("Please enter a valid product name and quantity.");
    }
  });
  
  // Render Products
  function renderProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear existing products
  
    inventory.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "bg-white shadow-md rounded-lg p-6 flex justify-between items-center";
  
      productElement.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold">${product.name}</h3>
          <p class="text-gray-600">Quantity: ${product.quantity}</p>
        </div>
        <div>
          <button onclick="updateProductQuantity(${product.id}, 1)" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2">
            +1
          </button>
          <button onclick="updateProductQuantity(${product.id}, -1)" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2">
            -1
          </button>
          <button onclick="removeProduct(${product.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Remove
          </button>
        </div>
      `;
  
      productList.appendChild(productElement);
    });
  }
  
  // Update Product Quantity
  function updateProductQuantity(productId, amount) {
    const product = inventory.find(p => p.id === productId);
    if (product) {
      if (product.quantity + amount < 0) {
        alert("Quantity cannot be less than 0.");
        return;
      }
      product.updateQuantity(amount);
      renderProducts();
    }
  }
  
  // Remove Product
  function removeProduct(productId) {
    const productIndex = inventory.findIndex(p => p.id === productId);
    if (productIndex > -1) {
      inventory.splice(productIndex, 1);
      renderProducts();
    }
  }
  