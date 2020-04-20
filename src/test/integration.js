const chai = require('chai');
const expect = chai.expect;

const app = require('../server');

const filmListMock = require('./mocks/film_list.json');
const coverMock = require('./mocks/cover.json');

describe('GET /books', () => {
  it('should return a list of books', done => {
    chai
      .request(app)
      .get('/books')
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(filmListMock);
        done();
      });
  });
});

describe('GET /book/:id', () => {
  it('should return a book', done => {
    const bookId = filmListMock[0]._id;

    chai
      .request(app)
      .get(`/books/${bookId}`)
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(filmListMock[0]);
        done();
      });
  });

  it('should throw an code 1 error', done => {
    const bookId = 'notabook';

    chai
      .request(app)
      .get(`/books/${bookId}`)
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('code', 1);
        done();
      });
  });
});

describe('GET /covers/:id', () => {
  it('should return a cover', done => {
    const bookId = filmListMock[0]._id;

    chai
      .request(app)
      .get(`/covers/${bookId}`)
      .end((_, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(coverMock);
        done();
      });
  });

  it('should throw an code 2 error', done => {
    const bookId = 'notabook';

    chai
      .request(app)
      .get(`/covers/${bookId}`)
      .end((_, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('code', 2);
        done();
      });
  });
});