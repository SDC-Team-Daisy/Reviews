// const controller = require ('../controller');
const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);

it('Gets the first review', async () => {
  const res = await request.get('/reviews?product_id=1');
  // console.log(res.body);
  expect(res.status).toBe(200);
  // expect(res.body.length).toBe(1);
});

// const getReviews = async (reviews) => {
//   return await request
//   app.get('/reviews')
//   .send({ reviews });
// }

// describe('Movies', () => {

//   after(() => {
//     app.close()
//   })

//   describe('/reviews', () => {

//     it('should return a list of reviews', async () => {
//           const response = await getReviews();
//           expect(response.status).toBe(200);
//           done()
//     });
//   })
// })


  // const response = await request.get('/reviews/test')
  //     expect(response.status).to.eql(200)
