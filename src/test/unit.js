const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;

const booksRepo = require('../repositories/books');

const filmListMock = require('./mocks/film_list.json');

before(() => {
  mongoose.connect('mongodb://mongo:27017/books_test', {useNewUrlParser: true, useUnifiedTopology: true});
});

describe('Books list', () => {
  it('should return all books', async () => {
    const response = await booksRepo.findAllBooks(true);

    expect(response).to.be.deep.equal(filmListMock);
  });

  it('should return metro book', async () => {
    const response = await booksRepo.findBookById("8365315017", true);

    expect(response).to.be.deep.equal(filmListMock[0]);
  });
});