const booksTableBody = document.querySelector("[data-books-table-body");

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
    </tr>`;
}

function displayBooks(books) {
  const booksHtml = books.map(bookToHtml).join("");
  booksTableBody.innerHTML = booksHtml;
}

// Add default books to the collection
for (const book of defaultBooks) {
  storeBook(book);
}

displayBooks(books);
