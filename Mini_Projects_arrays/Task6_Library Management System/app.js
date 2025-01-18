const libraryManagement = {
  books: [],

  // Add a new book
  addBook(title, author) {
    const newBook = {
      id: Date.now(),
      title,
      author,
      isAvailable: true, // Book is available when first added
    };

    this.books.push(newBook);
    this.renderBooks();
    this.resetForm();
  },

  // Borrow a book
  borrowBook(bookId) {
    const book = this.books.find((book) => book.id === bookId);
    if (book && book.isAvailable) {
      book.isAvailable = false;
      this.renderBooks();
    } else {
      alert("This book is currently unavailable!");
    }
  },

  // Return a book
  returnBook(bookId) {
    const book = this.books.find((book) => book.id === bookId);
    if (book && !book.isAvailable) {
      book.isAvailable = true;
      this.renderBooks();
    } else {
      alert("This book is not currently borrowed!");
    }
  },

  // Filter available books
  filterAvailableBooks() {
    return this.books.filter((book) => book.isAvailable);
  },

  // Sort books alphabetically by title
  sortBooks() {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
    this.renderBooks();
  },

  // Render book list
  renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear existing list

    this.books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "bg-white p-4 rounded shadow";

      bookDiv.innerHTML = `
          <p class="font-semibold">${book.title} by ${book.author}</p>
          <p class="text-sm text-gray-600">${
            book.isAvailable ? "Available" : "Borrowed"
          }</p>
          <div class="mt-4">
            ${
              book.isAvailable
                ? `<button
                    class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onclick="libraryManagement.borrowBook(${book.id})"
                  >
                    Borrow
                  </button>`
                : `<button
                    class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onclick="libraryManagement.returnBook(${book.id})"
                  >
                    Return
                  </button>`
            }
          </div>
        `;

      bookList.appendChild(bookDiv);
    });
  },

  // Reset the form
  resetForm() {
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
  },
};

// Handle Add Book form submission
document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("bookTitle").value.trim();
  const author = document.getElementById("bookAuthor").value.trim();

  libraryManagement.addBook(title, author);
});
