// Expense Class
class Expense {
    constructor(description, amount, category) {
      this.id = Date.now(); // Unique ID
      this.description = description;
      this.amount = amount;
      this.category = category;
    }
  }
  
  // Expenses Array
  const expenses = [];
  
  // Add Expense
  document.getElementById("addExpense").addEventListener("click", () => {
    const description = document.getElementById("expenseDescription").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
  
    if (description && amount > 0) {
      const newExpense = new Expense(description, amount, category);
      expenses.push(newExpense);
      renderExpenses();
      document.getElementById("expenseDescription").value = "";
      document.getElementById("expenseAmount").value = "";
    } else {
      alert("Please enter a valid description and amount.");
    }
  });
  
  // Render Expenses
  function renderExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ""; // Clear existing expenses
  
    expenses.forEach(expense => {
      const expenseElement = document.createElement("div");
      expenseElement.className = "bg-white shadow-md rounded-lg p-6 flex justify-between items-center";
  
      expenseElement.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold">${expense.description}</h3>
          <p class="text-gray-600">Category: ${expense.category}</p>
          <p class="text-gray-600">Amount: $${expense.amount}</p>
        </div>
        <button onclick="removeExpense(${expense.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Remove
        </button>
      `;
  
      expenseList.appendChild(expenseElement);
    });
  
    updateTotalExpenses();
  }
  
  // Remove Expense
  function removeExpense(expenseId) {
    const expenseIndex = expenses.findIndex(e => e.id === expenseId);
    if (expenseIndex > -1) {
      expenses.splice(expenseIndex, 1);
      renderExpenses();
    }
  }
  
  // Update Total Expenses
  function updateTotalExpenses() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById("totalExpenses").textContent = `$${total.toFixed(2)}`;
  }
  