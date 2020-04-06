const {
  findAllBooks,
  findBookById
} = require('../repositories/books');

module.exports = class BookController {

  // GET /books
  async list(_, res) {
    const books = await findAllBooks();

    res.json(books);
  }

  // GET /books/:id
  async index(req, res) {
    const id = req.params.id;

    let response;
    try {
      response = await findBookById(id); 
    } catch (error) {
      response = error.response;
      res = res.status(error.httpCode);
    }

    res.json(response);
  }
}