const booksRepo = require("../repositories/books.repositories");
const generateId = require("../utils/generateRandomId");

const getAllBooks = async (query) => {
  const { name, reading, finished } = query;
  let books = booksRepo;
  if (books.length === 0) {
    return [];
  }

  if (name) {
    books = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading == 1 || reading == 0) {
    books = books.filter((book) => book.reading === Boolean(Number(reading)));
  }

  if (finished == 1 || finished == 0) {
    books = books.filter((book) => book.finished === Boolean(Number(finished)));
  }

  return books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
};

const getDetailBook = async (id) => {
  const book = booksRepo.filter((book) => book.id === id)[0];
  if (book === undefined) {
    throw new Error(404);
  }

  return book;
};

const addBook = async (data) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = data;
  const id = await generateId();
  const finished = Number(pageCount) === Number(readPage) ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
  } else if (readPage > pageCount) {
    throw new Error(
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    );
  }

  const newBook = {
    id,
    name: String(name),
    year: Number(year),
    author: String(author),
    summary: String(summary),
    publisher: String(publisher),
    pageCount: Number(pageCount),
    readPage: Number(readPage),
    finished,
    reading: Boolean(reading),
    insertedAt,
    updatedAt,
  };

  booksRepo.push(newBook);

  const isSuccess = booksRepo.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return id;
  } else {
    throw new Error("Gagal menambahkan buku.");
  }
};

const updateBook = async (id, data) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = data;
  const finished = Number(pageCount) === Number(readPage) ? true : false;
  const updatedAt = new Date().toISOString();

  if (!name) {
    throw new Error("Gagal memperbarui buku. Mohon isi nama buku");
  } else if (readPage > pageCount) {
    throw new Error(
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    );
  }

  const index = booksRepo.findIndex((book) => book.id === id);
  if (index === -1) {
    throw new Error("Gagal memperbarui buku. Id tidak ditemukan");
  }

  return (booksRepo[index] = {
    ...booksRepo[index],
    name: String(name),
    year: Number(year),
    author: String(author),
    summary: String(summary),
    publisher: String(publisher),
    pageCount: Number(pageCount),
    readPage: Number(readPage),
    finished,
    reading: Boolean(reading),
    updatedAt,
  });
};

const deleteBook = async (id) => {
  const index = booksRepo.findIndex((book) => book.id === id);
  if (index === -1) {
    throw new Error("Buku gagal dihapus. Id tidak ditemukan");
  }

  return booksRepo.splice(index, 1);
};

module.exports = {
  getAllBooks,
  getDetailBook,
  addBook,
  updateBook,
  deleteBook,
};
