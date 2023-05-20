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
};
