const {
  BookNotFoundError
} = require('../errors/books');

const books = [
  {
    _id: '8365315017',
    name: 'Metro 2033',
    description: 'The protagonist of the novel is a 20-year-old man named Artyom who was born before the nuclear war. He was saved from a horde of carnivorous rats that killed his mother and the inhabitants of his station as a baby by Sukhoi, a military officer. Sukhoi is now one of the authorities of VDNKh, one of the stations in the Metro, and has raised Artyom as his son. Artyom spends his time on patrol in the tunnels and working in the mushroom factories.',
  },
  {
    _id: '0670813028',
    name: 'It',
    description: 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. "It" primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.'
  }
];

module.exports.findAllBooks = async (lean = false) => {
  return new Promise(resolve => resolve(books));
}

module.exports.findBookById = async (id, lean = false) => {
  const book = books.find(x => x._id === id);

  if (!book) {
    throw new BookNotFoundError('Cannot find book ' + id);
  }

  return new Promise(resolve => resolve(book)); 
}