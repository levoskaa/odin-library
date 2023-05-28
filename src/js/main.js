const booksTableBody = document.querySelector("[data-books-table-body");
const addBookButton = document.querySelector(".add-book-btn");
const newBookModal = document.querySelector(".new-book-modal");
const newBookForm = newBookModal.querySelector("#new-book-form");
const newBookModalCancelButton =
  newBookModal.querySelector("[data-cancel-btn]");

const books = [];
const defaultBooks = [
  new Book("Robert Jordan", "The Eye of the World", 782, true),
  new Book("Naomi Novik", "In His Majesty's Service ", 833, true),
  new Book("J.R.R. Tolkien", "The Lord of the Rings", 1178, false),
];

function Book(author, title, pageCount, hasBeenRead) {
  this.author = author;
  this.title = title;
  this.pageCount = pageCount;
  this.hasBeenRead = hasBeenRead;
}

Book.prototype.toggleRead = function () {
  this.hasBeenRead = !this.hasBeenRead;
};

function storeBook(book) {
  books.push(book);
}

function removeBook(index) {
  books.splice(index, 1);
}

function bookToHtml(book) {
  return `
    <tr>
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td class="numeric page-count">${book.pageCount}</td>
      <td>${
        book.hasBeenRead
          ? '<span class="read">Yes</span>'
          : '<span class="not-read">No</span>'
      }</td>
      <td class="operations fit-width">
        <button type="button" class="icon-btn toggle-status">
          <span class="iconify icon" data-icon="${
            book.hasBeenRead ? "mdi:book-remove" : "mdi:book-check"
          }"></span>
        </button>     
        <button type="button" class="icon-btn icon-btn--remove">
          <span class="iconify icon" data-icon="mdi:bin"></span>
        </button>
      </td>
    </tr>`;
}

function displayBooks(books) {
  const booksHtml = books.map(bookToHtml).join("");
  booksTableBody.innerHTML = booksHtml;
  addBookEventListeners();
}

function addBookEventListeners() {
  const removeButtons = booksTableBody.querySelectorAll(".icon-btn--remove");
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeBook(index);
      displayBooks(books);
    });
  });
  const toggleButtons = booksTableBody.querySelectorAll(".toggle-status");
  toggleButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      books[index].toggleRead();
      displayBooks(books);
    });
  });
}

addBookButton.addEventListener("click", () => newBookModal.showModal());
newBookModalCancelButton.addEventListener("click", () => newBookModal.close());
newBookModal.addEventListener("click", (e) => {
  if (e.detail === 0) {
    // If the click was triggered by keyboard
    return;
  }
  const modalRect = newBookModal.getBoundingClientRect();
  const clickedOutside =
    e.clientX < modalRect.left ||
    e.clientX > modalRect.right ||
    e.clientY < modalRect.top ||
    e.clientY > modalRect.bottom;
  if (clickedOutside) {
    newBookModal.close();
  }
});
newBookModal.addEventListener("close", () => newBookForm.reset());

newBookForm.addEventListener("submit", () => {
  const author = newBookForm.querySelector("#author").value;
  const title = newBookForm.querySelector("#title").value;
  const pageCount = newBookForm.querySelector("#page-count").value;
  const readAlready = newBookForm.querySelector("#read-already").checked;
  const book = new Book(author, title, pageCount, readAlready);
  storeBook(book);
  displayBooks(books);
});

// Add default books to the collection
for (const book of defaultBooks) {
  storeBook(book);
}

displayBooks(books);
