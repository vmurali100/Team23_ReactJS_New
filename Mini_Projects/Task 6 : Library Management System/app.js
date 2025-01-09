// Book Class
class Book {
    constructor(title, author) {
      this.id = Date.now(); // Unique ID
      this.title = title;
      this.author = author;
      this.isLent = false; // Default to not lent
    }
  
    toggleLentStatus() {
      this.isLent = !this.isLent;
    }
  }
  
  // Library
  const library = [];
  
  // Add Book
  document.getElementById("addBook").addEventListener("click", () => {
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
  
    if (title && author) {
      const newBook = new Book(title, author);
      library.push(newBook);
      renderBooks();
      document.getElementById("bookTitle").value = "";
      document.getElementById("bookAuthor").value = "";
    } else {
      alert("Please enter both title and author.");
    }
  });
  
  // Render Books
  function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear the existing list
  
    library.forEach(book => {
      const bookElement = document.createElement("div");
      bookElement.className = "bg-white shadow-md rounded-lg p-6";
  
      bookElement.innerHTML = `
        <h3 class="text-xl font-semibold">${book.title}</h3>
        <p class="text-gray-600">Author: ${book.author}</p>
        <p class="text-gray-600">Status: ${book.isLent ? "Lent Out" : "Available"}</p>
        <button onclick="toggleLentStatus(${book.id})" class="bg-${book.isLent ? "green" : "red"}-500 text-white px-4 py-2 rounded-lg hover:bg-${book.isLent ? "green" : "red"}-600 mt-4">
          Mark as ${book.isLent ? "Returned" : "Lent"}
        </button>
      `;
  
      bookList.appendChild(bookElement);
    });
  }
  
  // Toggle Lent Status
  function toggleLentStatus(bookId) {
    const book = library.find(b => b.id === bookId);
    if (book) {
      book.toggleLentStatus();
      renderBooks();
    }
  }
  