const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');
const request = require('request-promise');
const expect = chai.expect;

const booksRepo = require('../repositories/books');
const coversRepo = require('../repositories/covers');

const filmListMock = require('./mocks/film_list.json');

before(() => {
  mongoose.connect('mongodb://mongo:27017/books_test', {useNewUrlParser: true, useUnifiedTopology: true});
});

after(() => {
  mongoose.connection.close();
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

  it('should throw a BookNotFoundError', () => {
    expect(booksRepo.findBookById('10')).to.be.rejectedWith(Error, 'Cannot find book 10');
  });
});

describe('Cover', () => {
  afterEach(function() {
    request.get.restore();
  });

  it('should return cover url', async () => {
    sinon.stub(request, 'get').returns(new Promise(resolve => {
      resolve({docs:[{cover_edition_key: 'TESTIMAGE'}]});
    }));

    const response = await coversRepo.findCoverUrl('8365315017');

    expect(response).to.be.equal(`http://covers.openlibrary.org/b/olid/TESTIMAGE-L.jpg`);
  });

  it('should throw a CoverBookNotFoundError', async () => {
    sinon.stub(request, 'get').returns(new Promise(resolve => {
      resolve({docs:[]});
    }));

    expect(coversRepo.findCoverUrl('notabook')).to.be.rejectedWith(Error, 'Cannot find document for book id notabook');
  });

  it('should throw a CoverNotFoundError', async () => {
    sinon.stub(request, 'get').returns(new Promise(resolve => {
      resolve({docs:[{}]});
    }));

    expect(coversRepo.findCoverUrl('notabook')).to.be.rejectedWith(Error, 'Cannot find cover for book id notabook');
  });
});