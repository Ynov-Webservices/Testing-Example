const bookModel = require('../models/book');
const {
  BookNotFoundError
} = require('../errors/books');

module.exports.findAllBooks = async () => {
  return await bookModel.find({});
}

module.exports.findBookById = async (id) => {
  const book = await bookModel.findOne({_id: id});

  if (!book) {
    throw new BookNotFoundError('Cannot find book ' + id);
  }

  return book; 
}