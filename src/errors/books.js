function BookNotFoundError(message) {
  const error = new Error(message);
  error.response = {code: 1, message: message};
  error.httpCode = 400;

  return error;
}

BookNotFoundError.prototype = Object.create(Error.prototype);

module.exports.BookNotFoundError = BookNotFoundError;