// Cannot find a book in the cover API search
function CoverBookNotFoundError(message) {
  const error = new Error(message);
  error.response = {code: 2, message: message};
  error.httpCode = 400;

  return error;
}
CoverBookNotFoundError.prototype = Object.create(Error.prototype);
module.exports.CoverBookNotFoundError = CoverBookNotFoundError;

// Cannot find a cover in the cover API search
function CoverNotFoundError(message) {
  const error = new Error(message);
  error.response = {code: 3, message: message};
  error.httpCode = 400;

  return error;
}
CoverNotFoundError.prototype = Object.create(Error.prototype);
module.exports.CoverNotFoundError = CoverNotFoundError;