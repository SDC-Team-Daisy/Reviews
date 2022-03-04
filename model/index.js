const { Pool } = require('pg')

const pool = new Pool({
  user: 'gchen',
  host: 'localhost',
  database: 'sdcreviews',
  password: ''
  // port: 3000
})

  // console.log(err, res)
  // pool.end()
const getReview = (callback) => {
  pool.query('SELECT * FROM review limit 10', (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
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

module.exports = {
  getReview
}
