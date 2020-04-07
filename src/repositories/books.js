const bookModel = require('../models/book');
const {
  BookNotFoundError
} = require('../errors/books');

module.exports.findAllBooks = async (lean = false) => {
  return await bookModel.find({}).lean(lean);
}

module.exports.findBookById = async (id, lean = false) => {
  const book = await bookModel.findOne({_id: id}).lean(lean);

  if (!book) {
    throw new BookNotFoundError('Cannot find book ' + id);
  }

  return book; 
}