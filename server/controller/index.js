const model = require('../model');

module.exports = {

  getReviews: function (req, res) {
    // let params = req.query.id;
    let params = req.query.id;
    // console.log('params', params);

    model.getReviews(params, (err, results) => {
      if (err) {
        res.status(500).send();
      } else {
        res.send(results);
      }
    });
  },

  getMeta: function (req, res) {
    let params = req.query.id;

    model.getMeta(params, (err, results) => {
      if (err) {
        res.status(500).send();
      } else {
        res.send(results);
      }
    })
  },

  postReviews: function (req, res) {
    let params = [req.body.product_id, req.body.rating, req.body.date, req.body.summary, req.body.body, req.body.recommend, req.body.reported, req.body.reviewer_name, req.body.reviewer_email, req.body.response, req.body.helpfulness];

    model.postReviews(params, (err, results) => {
      if (err) {
        console.log('error', err);

        res.status(501).send();
      } else {
        res.status(201).send();
      }
    })
  }
}