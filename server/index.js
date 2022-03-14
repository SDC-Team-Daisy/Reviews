require('newrelic');
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

const db = require('./model');
const controller = require('./controller');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

app.get('/reviews', controller.getReviews);
app.get('/reviews/meta', controller.getMeta);
app.post('/reviews', controller.postReviews);

module.exports = app;