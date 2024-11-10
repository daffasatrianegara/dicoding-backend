const { nanoid } = require("nanoid");
const booksRepo = require("../repositories/books.repositories");

const generateId = async () => {
  const id = nanoid(16);
  const isDuplicate = booksRepo.findIndex((book) => book.id === id);

  if (isDuplicate !== -1) {
    return generateId();
  }

  return String(id);
};

module.exports = generateId;
