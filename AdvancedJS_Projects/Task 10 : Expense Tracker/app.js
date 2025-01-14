// Expenses data
let expenses = [];

// Proxy for validation
const createExpenseProxy = (expense) => {
  return new Proxy(expense, {
    set(target, property, value) {
      if (property === "amount" && (isNaN(value) || value < 0)) {
        throw new Error("Invalid expense amount!");
      }
      target[property] = value;
      return true;
    },
  });
};

// Fetch expense data from server
const fetchExpenses = async () => {
  try {
    const response = await fetch("https://api.example.com/expenses");
    if (!response.ok) throw new Error("Failed to fetch expenses");
    const data = await response.json();
    expenses = data.map((expense) =>
      createExpenseProxy({
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
      })
    );
    renderExpenses();
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

// Add expense
document.getElementById("add-expense-btn").addEventListener("click", () => {
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;

  if (!description || isNaN(amount)) {
    alert("Please provide valid expense details!");
    return;
  }

  const newExpense = createExpenseProxy({
    id: Date.now(),
    description,
    amount,
    category,
  });

  expenses.push(newExpense);
  saveToLocalStorage();
  renderExpenses();

  // Clear input fields
  document.getElementById("expense-description").value = "";
  document.getElementById("expense-amount").value = "";
});

// Render expenses dynamically
const renderExpenses = () => {
  const expenseContainer = document.getElementById("expenses");
  expenseContainer.innerHTML = "";

  expenses.forEach((expense) => {
    const expenseElement = document.createElement("div");
    expenseElement.className =
      "p-4 border rounded flex justify-between items-center";

    expenseElement.innerHTML = `
      <div>
        <p><strong>${expense.description}</strong></p>
        <p>Category: ${expense.category}</p>
        <p>Amount: $${expense.amount}</p>
      </div>
      <button class="bg-red-500 text-white px-4 py-2 rounded" 
        onclick="deleteExpense(${expense.id})">Delete</button>
    `;

    expenseContainer.appendChild(expenseElement);
  });

  calculateTotal();
};

// Calculate total expenses
const calculateTotal = () => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById("total-expenses").textContent = total.toFixed(2);
};

// Delete expense
const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
  saveToLocalStorage();
  renderExpenses();
};

// Save expenses to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// Load expenses from localStorage
const loadFromLocalStorage = () => {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  expenses = storedExpenses.map((expense) =>
    createExpenseProxy({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    })
  );
  renderExpenses();
};

// Initialize application
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
