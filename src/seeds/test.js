// let error = true

// let res = [
//   db.books.drop(),


//   // db.container.drop(),
//   // db.container.drop(),
//   // db.container.createIndex({ myfield: 1 }, { unique: true }),
//   // db.container.createIndex({ thatfield: 1 }),
//   // db.container.createIndex({ thatfield: 1 }),
//   // db.container.insert({ myfield: 'hello', thatfield: 'testing' }),
//   // db.container.insert({ myfield: 'hello2', thatfield: 'testing' }),
//   // db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
//   // db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
// ]

// printjson(res)

// if (error) {
//   print('Error, exiting')
//   quit(1)
// }

db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "books"
    }
  ]
});

db.books.insert({
  name: 'First Book',
  description: 'My awesome first book'
});

db.books.insert({
  name: 'Second Book',
  description: 'My awesome second book'
});