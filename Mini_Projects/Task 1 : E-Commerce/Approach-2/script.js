class ShoppingCart {
    constructor() {
      this.cart = {};
    }
  
    addProduct(product) {
      const { id, name, price, quantity } = product;
      if (this.cart[id]) {
        this.cart[id].quantity += quantity;
      } else {
        this.cart[id] = { name, price, quantity };
      }
      this.renderCart();
    }
  
    removeProduct(id) {
      if (this.cart[id]) {
        delete this.cart[id];
      }
      this.renderCart();
    }
  
    calculateTotal() {
      return Object.keys(this.cart).reduce((total, id) => {
        return total + this.cart[id].price * this.cart[id].quantity;
      }, 0);
    }
  
    renderCart() {
      const cartTable = document.getElementById("cart-items");
      cartTable.innerHTML = ""; // Clear existing items
  
      Object.entries(this.cart).forEach(([id, details]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="border p-2">${id}</td>
          <td class="border p-2">${details.name}</td>
          <td class="border p-2">${details.price}</td>
          <td class="border p-2">${details.quantity}</td>
          <td class="border p-2">${details.price * details.quantity}</td>
          <td class="border p-2 text-center">
            <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="cart.removeProduct('${id}')">
              Remove
            </button>
          </td>
        `;
        cartTable.appendChild(row);
      });
  
      // Update total price
      document.getElementById("total-price").textContent = this.calculateTotal();
    }
  }
  
  const cart = new ShoppingCart();
  
  document.getElementById("add-product").addEventListener("click", () => {
    const id = document.getElementById("product-id").value.trim();
    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);
  
    if (!id || !name || isNaN(price) || isNaN(quantity)) {
      alert("Please fill all fields correctly!");
      return;
    }
  
    cart.addProduct({ id, name, price, quantity });
  
    // Clear input fields
    document.getElementById("product-id").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
  });
  