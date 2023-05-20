class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class BookLibrary {
  constructor() {
    this.allBooks = [];
  }

  getBook(title) {
    return this.allBooks.find((book) => book.title === title);
  }

  ifBookExists(newBook) {
    this.allBooks.some((book) => book.title === newBook.title);
  }

  addBookToLibrary(newBook) {
    if (!this.ifBookExists(newBook)) {
      this.allBooks.push(newBook);
    }
  }

  removeBook(title) {
    this.allBooks = this.allBooks.filter((book) => book.title !== title);
  }
}

const library = new BookLibrary();

const getInputFromUser = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").checked;

  return new Book(title, author, pages, status);
};

const resetInput = () => {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("status");

  title.value = "";
  author.value = "";
  pages.value = "";
  status.checked = false;
};

const addBook = (e) => {
  e.preventDefault();
  newBook = getInputFromUser();

  if (library.ifBookExists(newBook)) {
    console.log("Book already exists");
  } else {
    library.addBookToLibrary(newBook);
    console.log(library.allBooks);
  }
  display(newBook);
  resetInput();
  closeModal();
};

const removeBookFromDisplay = () => {
  const bookContainer = document.querySelector(".book-container");

  bookContainer.innerHTML = "";

  for (let book of library.allBooks) {
    display(book);
  }
};

const display = (book) => {
  const bookContainer = document.querySelector(".book-container");
  const container = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("h3");
  const bookPages = document.createElement("h3");
  const statusBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  statusBtn.id = "stat-btn";
  removeBtn.id = "remove-btn";

  bookTitle.textContent = `Book title: ${book.title}`;
  bookAuthor.textContent = `Book author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;
  book.isRead
    ? (statusBtn.textContent = "Read")
    : (statusBtn.textContent = "Not read");
  removeBtn.textContent = "Remove";

  book.isRead
    ? (statusBtn.style.backgroundColor = "aqua")
    : (statusBtn.style.backgroundColor = "#dd7b7b");

  container.appendChild(bookTitle);
  container.appendChild(bookAuthor);
  container.appendChild(bookPages);
  container.appendChild(statusBtn);
  container.appendChild(removeBtn);
  bookContainer.appendChild(container);

  statusBtn.addEventListener("click", () => {
    statusBtn.textContent === "Read"
      ? (statusBtn.textContent = "Not read")
      : (statusBtn.textContent = "Read");

    statusBtn.textContent === "Read"
      ? (statusBtn.style.backgroundColor = "aqua")
      : (statusBtn.style.backgroundColor = "#dd7b7b");
  });

  removeBtn.addEventListener("click", () => {
    library.removeBook(book.title);
    removeBookFromDisplay();

    // console.log(library.allBooks);
  });
};

const form = document.getElementById("formSubmit");
form.onsubmit = addBook;

const bookModal = document.querySelector(".book-modal");
const addBookModal = document.querySelector(".add-btn");
const overlay = document.getElementById("overlay");

const openModal = () => {
  bookModal.classList.add("open");
  overlay.classList.add("active");
};

const closeModal = () => {
  bookModal.classList.remove("open");
  overlay.classList.remove("active");
};

addBookModal.onclick = openModal;
overlay.onclick = closeModal;
