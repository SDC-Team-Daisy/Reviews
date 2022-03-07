const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
//require db
const db = require('./model');
//require controller
const controller = require('./controller');
// app.use(express.static('client/dist'));

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

app.get('/reviews', controller.getReviews);
app.get('/reviews/meta', controller.getMeta);
// app.post('/reviews', controller.getReviews);
// app.put('/reviews/:review_id/helpful', controller.putReviews);
// app.put('/reviews/:review_id/report', controller.putReviews);

//BEFORE REFACTOR
// app.get('/reviews', (req, res) => {
//   db.getReview((err, results) => {
//     if (err) {
//       res.status(500).send();
//     } else {
//       res.send(results);
//     }
//   });
// })

// app.post('/reviews', (req, res) => {
//   db.postReview((err, results) => {
//     if (err) {
//       res.status(500).send();
//     } else {
//       res.send(results);
//     }
//   });
// })

module.exports = app;