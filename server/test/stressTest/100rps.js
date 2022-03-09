import http from 'k6/http';
import { sleep } from 'k6';

//virtual users
//target 100 requests (vsu) in 1 sec
export const options = {
  vus: 1000,
  duration: '15s',
};
const id = Math.floor(Math.random() * 1000011);
// console.log(id);
//generate random id
const url = `http://localhost:3000/reviews?id=${id}`;

export default function () {
  http.get(url);
  sleep(1);
}

// import http from 'k6/http';
// import { sleep } from 'k6';

// export const options = {
//   vus: 1000,
//   duration: '15s',
// };


// const id = Math.floor(Math.random() * 1000011);
// const urlProduct = `http://localhost:3000/api/products/${id}`
// const urlStyles = `http://localhost:3000/api/products/${id}/styles`

// export default function () {
//   // http.get(url);
//   // sleep(1);
//   const responses = http.batch([
//     ['GET', urlProduct],
//     ['GET', urlStyles]
//   ]);
// }