const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);

it('Gets the first review', async () => {
  const res = await request.get('/reviews?product_id=1');
  expect(res.status).toBe(200);
});

it('Add a review to specific product_id', async () => {
  const res = await request.post('/reviews?product_id=1');
  expect(res.status).toBe(201);
});