const model = require('../model');

module.exports = {

  getReviews: function (req, res) {
    // let params = req.query.id;
    let params = req.query.id;
    console.log('params', params);

    model.getReviews(params, (err, results) => {
      if (err) {
        res.status(500).send();
      } else {
        res.send(results);
      }
    });
  },

  getMeta: function (req, res) {
    model.getMeta((err, results) => {
      if (err) {
        res.status(500).send();
      } else {
        res.send(results);
      }
    })
  }
}