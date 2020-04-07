const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const should = require('chai').should();

const booksRepo = require('../repositories/books');

const filmListMock = require('./mocks/film_list.json');

before(() => {
  mongoose.connect('mongodb://mongo:27017/books_test', {useNewUrlParser: true, useUnifiedTopology: true});
});

describe('Books list', () => {
  it('should return two books with lean option', async () => {
    const response = await booksRepo.findAllBooks(true);

    expect(response).to.be.deep.equal(filmListMock);
  });

  it('should return two books without lean option', async () => {
    const response = await booksRepo.findAllBooks();

    expect(response).to.have.length(2);
    expect(response[0]).to.have.property("_id");
    expect(response[1]).to.have.property("_id");
  });
});

describe('Book', () => {
  it('should return metro book', async () => {
    const response = await booksRepo.findBookById('8365315017', true);

    expect(response).to.be.deep.equal(filmListMock[0]);
  });

  it('should throw a BookNotFoundError', (done) => {
    expect(booksRepo.findBookById('10')).to.be.rejectedWith(Error, 'Cannot find book 10').notify(done);
  });
})