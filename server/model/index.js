const { Pool } = require('pg')

const pool = new Pool({
  user: 'gchen',
  host: 'localhost',
  database: 'sdcreviews',
  password: '',
  port: 5432
})

module.exports = {

  getReviews: function (params, callback) {

    // let queryStr = 'SELECT * FROM review WHERE product_id = ($1) limit 10';
    // let queryArgs = [params]

    // pool.query(queryStr, queryArgs, (err, results) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     console.log('res', results);
    //     callback(null, results);
    //   }
    // })
    pool
      .query("SELECT json_agg(json_build_object('review_id',review.id,'rating', review.rating,'summary', review.summary,'recommend', review.recommend,'response', review.response,'body', review.body,'date', review.date,'reviewer_name', review.reviewer_name,'helpfulness', review.helpfulness,'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'id', photos.id,'url', photos.url) ) AS photos from photos WHERE photos.review_id = review.id) AS photos))) AS results FROM review WHERE product_id = $1;", [params])
      .then((results) => {
        console.log('model results', results);
        const resultObj = {
          product_id: params,
          results: results.rows[0].results
        }
        // results.rows[0]['id'] = id;
        callback(null, resultObj);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
  },

  getMeta: function (callback) {
    pool.query('SELECT * FROM characteristic limit 10', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
}

  //
  // ‘photos’, (SELECT json_agg(row_to_json( ‘id’, (SELECT review_id from reviews_photos where product_id = $1), ‘url’ (SELECT url from reviews_photos where product_id = $1),)))))));"
  // // postReviews: function (callback) {

  //   pool.query('INSERT INTO review (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) VALUES ($1, $2', (err, results) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       callback(null, results);
  //     }
  //   })
  // }
//}

// const postReview = (callback) => {
//   pool.query('INSERT * FROM characteristic limit 10', (err, results) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, results);
//     }
//   })
// }

// module.exports = {
//   getReview
// }