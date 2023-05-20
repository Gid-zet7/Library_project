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
