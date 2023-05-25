const books = [];

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

function displayBooks(books) {
  for (const book of books) {
    // TODO
    console.log(book);
  }
}

displayBooks(books);
