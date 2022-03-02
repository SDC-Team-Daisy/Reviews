const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/reviewrating');

let schema = mongoose.Schema({
  "product_id": number,
  "page": number,
  "count": number,
  "results": [
    {
      "review_id": number,
      "rating": number,
      "summary": string,
      "recommend": boolean,
      "response": string,
      "body": string,
      "date": date,
      "reviewer_name": string,
      "helpfulness": number,
      "photos": [{
          "id": number,
          "url": string
        }]
    }],
  "characteristics": {
      "type": string,
      "value": number
    }
});

const Model = mongoose.model('review', schema);