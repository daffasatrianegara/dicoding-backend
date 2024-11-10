const booksControllers = require("../controllers");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: booksControllers.getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: booksControllers.getDetailBookHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: booksControllers.addBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: booksControllers.updateBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: booksControllers.deleteBookHandler,
  },
];

module.exports = routes;
