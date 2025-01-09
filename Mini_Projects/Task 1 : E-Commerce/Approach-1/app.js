// Cart Object
const cart = {
    items: [],
    totalPrice: 0,
  
    addItem(product) {
      this.items.push(product);
      this.calculateTotal();
      renderCart();
    },
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.calculateTotal();
      renderCart();
    },
  
    calculateTotal() {
      this.totalPrice = this.items.reduce((sum, item) => sum + item.price, 0);
      document.getElementById("totalPrice").textContent = this.totalPrice;
    }
  };
  
  // Add Product to Cart
  document.getElementById("addProduct").addEventListener("click", () => {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
  
    if (name && !isNaN(price) && price > 0) {
      const id = cart.items.length ? cart.items[cart.items.length - 1].id + 1 : 1;
      cart.addItem({ id, name, price });
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
    } else {
      alert("Please enter valid product details.");
    }
  });
  
  // Render Cart Items
  function renderCart() {
    const cartItemsTable = document.getElementById("cartItems");
    cartItemsTable.innerHTML = ""; // Clear existing items
  
    cart.items.forEach(item => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <button onclick="removeItem(${item.id})">Remove</button>
        </td>
      `;
  
      cartItemsTable.appendChild(row);
    });
  }
  
  // Remove Item from Cart
  function removeItem(productId) {
    cart.removeItem(productId);
  }
  