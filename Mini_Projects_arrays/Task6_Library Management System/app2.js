const libraryManagement = {
  books: [
    { bookTitle: "Book 1", bookAuthor: "author 1", isAvailable: true },
    { bookTitle: "Book 2", bookAuthor: "author 2", isAvailable: true },
    { bookTitle: "Book 3", bookAuthor: "author 3", isAvailable: true },
    { bookTitle: "Book 4", bookAuthor: "author 4", isAvailable: true },
  ],
  borrowBook(i) {
    this.books[i].isAvailable = !this.books[i].isAvailable;
    this.renderBooks();
  },
  addBook() {
    const newBook = {
      id: Date.now(),
      bookTitle: document.getElementById("bookTitle").value,
      bookAuthor: document.getElementById("bookAuthor").value,
      isAvailable: true,
    };
    this.books.push(newBook);
    this.renderBooks();
    this.resetForm()
  },

  returnBook(i) {
    this.books[i].isAvailable = !this.books[i].isAvailable;
    this.renderBooks();
  },
  renderBooks() {
    document.getElementById("bookList").innerHTML = "";
    this.books.forEach((book, i) => {
      const bookDiv = document.createElement("div");
      bookDiv.setAttribute("class", "bg-white p-4 rounded shadow");
      const para1 = document.createElement("p");
      para1.setAttribute("class", "font-semibold");
      para1.innerHTML =
        "Book Title : " + book.bookTitle + " by " + book.bookAuthor;
      bookDiv.appendChild(para1);

      const para2 = document.createElement("p");
      para2.setAttribute("class", "text-sm text-gray-60");
      para2.innerHTML = book.isAvailable ? "Available" : "Borrowed";
      bookDiv.appendChild(para2);

      const bookButton = document.createElement("button");
      bookButton.innerHTML = book.isAvailable ? "Available" : "Borrowed";
      bookButton.setAttribute(
        "class",
        book.isAvailable
          ? "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          : "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
      );
      bookButton.setAttribute(
        "onclick",
        book.isAvailable
          ? "libraryManagement.borrowBook(" + i + ")"
          : "libraryManagement.returnBook(" + i + ")"
      );
      bookDiv.appendChild(bookButton);

      document.getElementById("bookList").appendChild(bookDiv);
    });
  },
  resetForm() {
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
  },
};

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  libraryManagement.addBook();
});
