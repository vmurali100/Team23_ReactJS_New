// Proxy for managing book lending
const createLibraryProxy = (library) => {
  return new Proxy(library, {
    get(target, property) {
      return target[property];
    },
    set(target, property, value) {
      if (
        property === "status" &&
        value !== "Available" &&
        value !== "Lent Out"
      ) {
        throw new Error("Invalid book status!");
      }
      target[property] = value;
      return true;
    },
  });
};

// Book data
let library = [];

// Closures for lending durations
const createLendingTracker = () => {
  const lendingDurations = new Map();

  return {
    lendBook: (bookId) => {
      lendingDurations.set(bookId, Date.now());
    },
    returnBook: (bookId) => {
      const lendTime = lendingDurations.get(bookId);
      const duration = lendTime ? (Date.now() - lendTime) / 1000 : 0;
      lendingDurations.delete(bookId);
      return duration.toFixed(2); // Duration in seconds
    },
  };
};

const lendingTracker = createLendingTracker();

// Fetch books from an API
const fetchBooks = async () => {
  try {
    const response = await fetch(
      "https://openlibrary.org/subjects/science.json?limit=5"
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    library = data.works.map((book) =>
      createLibraryProxy({
        id: book.key,
        title: book.title,
        author: book.authors?.[0]?.name || "Unknown",
        status: "Available",
      })
    );
    renderBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Add a book to the library
document.getElementById("add-book-btn").addEventListener("click", () => {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("author").value;

  if (!title || !author) {
    alert("Please enter both title and author!");
    return;
  }

  const newBook = createLibraryProxy({
    id: Date.now().toString(),
    title,
    author,
    status: "Available",
  });

  library.push(newBook);
  renderBooks();

  // Clear input fields
  document.getElementById("book-title").value = "";
  document.getElementById("author").value = "";
});

// Render books dynamically
const renderBooks = () => {
  const booksContainer = document.getElementById("books");
  booksContainer.innerHTML = "";

  library.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className =
      "p-4 border rounded flex justify-between items-center";

    bookElement.innerHTML = `
        <div>
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Status:</strong> ${book.status}</p>
        </div>
        <div>
          <button class="bg-yellow-500 text-white px-2 py-1 rounded mb-2" 
            onclick="lendBook('${book.id}')">Lend</button>
          <button class="bg-green-500 text-white px-2 py-1 rounded mb-2" 
            onclick="returnBook('${book.id}')">Return</button>
        </div>
      `;

    booksContainer.appendChild(bookElement);
  });
};

// Lend a book
const lendBook = (bookId) => {
  const book = library.find((b) => b.id === bookId);
  if (book && book.status === "Available") {
    book.status = "Lent Out";
    lendingTracker.lendBook(bookId);
    renderBooks();
  } else {
    alert("Book is not available!");
  }
};

// Return a book
const returnBook = (bookId) => {
  const book = library.find((b) => b.id === bookId);
  if (book && book.status === "Lent Out") {
    const duration = lendingTracker.returnBook(bookId);
    book.status = "Available";
    renderBooks();
    alert(`Book returned! Lending duration: ${duration} seconds`);
  } else {
    alert("Book is not lent out!");
  }
};

// Initialize application
document.addEventListener("DOMContentLoaded", fetchBooks);
