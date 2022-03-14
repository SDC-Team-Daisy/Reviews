const pool = require('../../config/config.js');

module.exports = {

  getReviews: function (params, callback) {
    pool
      .query(`SELECT json_agg
        (json_build_object(
          'review_id',review.id,
          'rating', review.rating,
          'summary', review.summary,
          'recommend', review.recommend,
          'response', review.response,
          'body', review.body,
          'date', review.date,
          'reviewer_name', review.reviewer_name,
          'helpfulness', review.helpfulness,
          'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'id', photos.id,'url', photos.url) ) AS photos from photos WHERE photos.review_id = review.id) AS photos))) AS results FROM review WHERE product_id = $1;`, [params])
      .then((results) => {
        const resultObj = {
          product_id: params,
          results: results.rows[0].results
        }
        callback(null, resultObj);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getMeta: function (params, callback) {
    pool
      .query(`SELECT json_build_object(
        'ratings', json_build_object('1', review.rating, '2', review.rating, '3', review.rating, '4', review.rating, '5', review.rating),
        'recommended', json_build_object(
          'true', review.recommend, 'false', review.recommend),
        'characteristics', json_build_object(
          'size', json_build_object('id', review.rating, 'value', review.rating))) AS results FROM review WHERE product_id = $1;`,
        [params])
      .then((results) => {
        const resultObj = {
          product_id: params,
          ratings: results.rows[0].results.ratings,
          recommended: results.rows[0].results.recommended,
          characteristics: results.rows[0].results.characteristics
        }
        callback(null, resultObj);
      })
      .catch((err) => {
        callback(err);
      })
  },

  postReviews: function (params, callback) {
    let queryStr = 'INSERT INTO review (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    let queryArgs = params

    pool.query(queryStr, queryArgs, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
};