const {
  findCoverUrl
} = require('../repositories/covers');

module.exports = class CoverController {

  // GET /covers/:id
  async index(req, res) {
    const id = req.params.id;

    let response;
    try {
      response = {
        isbn: id,
        cover: await findCoverUrl(id)
      }; 
    } catch (error) {
      response = error.response;
      res = res.status(error.httpCode);
    }

    res.json(response);
  }
}