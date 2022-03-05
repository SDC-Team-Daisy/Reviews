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

    let queryStr = 'SELECT * FROM review WHERE product_id = ($1) limit 10';
    let queryArgs = [params]

    pool.query(queryStr, queryArgs, (err, results) => {
      if (err) {
        callback(err);
      } else {
        console.log('res', results);
        callback(null, results);
      }
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