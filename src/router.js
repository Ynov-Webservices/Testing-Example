const BookController = require('./controllers/books');
const CoverController = require('./controllers/covers');

module.exports = (app) => {

  // Books
  
  app.get('/books', (req, res) => {
    new BookController().list(req, res);
  });

  app.get('/books/:id', (req, res) => {
    new BookController().index(req, res);
  });

  // Covers

  app.get('/covers/:id', (req, res) => {
    new CoverController().index(req, res);
  });
}