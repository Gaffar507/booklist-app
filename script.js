// book class: represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static disPlayBooks() {
    const storedBooks = Store.getStore();

    const books = storedBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("row");
    row.classList.add("mt-2");

    row.innerHTML = `
    <td> <span>${book.title}</span></td>
    <td> <span>${book.author}</span></td>
    <td> <span>${book.isbn}</span></td>
    <td><a href='#' style="text-decoration: none" class='btn btn-danger btn-sm delete'>X</a></td>
    `;

    list.appendChild(row);
  }

  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static removeBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.remove();
      Store.removeStore(target.previousElementSibling.textContent);
      this.showMessage("Book is removed!", "red");
    }
  }

  static showMessage(message, type) {
    const mainContainer = document.querySelector(".container");
    const bookList = document.querySelector(".table-striped");
    const p = document.createElement("p");

    if (type === "blue") {
      p.style.color = type;
      p.innerHTML = message;
    }
    p.style.color = type;
    p.innerHTML = message;

    setTimeout(() => {
      p.innerHTML = "";
    }, 1000);

    mainContainer.insertBefore(p, bookList);
  }
}

// Storage Class: Handle Storage

class Store {
  static getStore() {
    return localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];
  }

  static setStore(book) {
    const store = this.getStore();
    store.push(book);
    localStorage.setItem("books", JSON.stringify(store));
  }

  static removeStore(isbn) {
    const store = this.getStore();
    const newValue = store.filter((book) => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(newValue));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.disPlayBooks);
// Event: Add a Book

document.querySelector(".book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // add book to list
  const book = new Book(title, author, isbn);
  UI.addBookToList(book);

  Store.setStore(book);
  // show  message
  UI.showMessage("Book is added!", "blue");

  // clear field
  UI.clearField();
});

// Event: Remove a Book
document
  .querySelector("#book-list")
  .addEventListener("click", (e) => UI.removeBook(e.target));
