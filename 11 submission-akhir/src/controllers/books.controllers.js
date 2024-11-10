const booksServices = require("../services");

const getAllBooksHandler = async (req, h) => {
  const { name, reading, finished } = req.query;
  try {
    const getData = await booksServices.getAllBooks({
      name,
      reading,
      finished,
    });

    return h
      .response({
        status: "success",
        data: {
          books: getData,
        },
      })
      .code(200);
  } catch (err) {
    return h
      .response({
        status: "fail",
        message: err.message,
      })
      .code(500);
  }
};

const getDetailBookHandler = async (req, h) => {
  const { bookId } = req.params;
  try {
    const getData = await booksServices.getDetailBook(bookId);

    return h
      .response({
        status: "success",
        data: {
          book: getData,
        },
      })
      .code(200);
  } catch (err) {
    if (err.message == 404) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    } else {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }
};

const addBookHandler = async (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  try {
    const addData = await booksServices.addBook({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: addData,
        },
      })
      .code(201);
  } catch (err) {
    if (
      err.message === "Gagal menambahkan buku. Mohon isi nama buku" ||
      err.message ===
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    ) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(400);
    } else {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }
};

const updateBookHandler = async (req, h) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  try {
    await booksServices.updateBook(bookId, {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });
    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  } catch (err) {
    if (
      err.message === "Gagal memperbarui buku. Mohon isi nama buku" ||
      err.message ===
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    ) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(400);
    } else if (err.message === "Gagal memperbarui buku. Id tidak ditemukan") {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(404);
    } else {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }
};

const deleteBookHandler = async (req, h) => {
  const { bookId } = req.params;
  try {
    await booksServices.deleteBook(bookId);
    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (err) {
    if (err.message === "Buku gagal dihapus. Id tidak ditemukan") {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(404);
    } else {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(500);
    }
  }
};

module.exports = {
  getAllBooksHandler,
  getDetailBookHandler,
  addBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
