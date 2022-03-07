import http from 'k6/http';
import { sleep } from 'k6';
// import { counter } from 'k6/metrics';

// export const requests = new Counter('http_reqs');

//virtual users
//target 100 requests (vsu) in 1 sec
export const options = {
  vus: 100,
  duration: '15s',
};

const url = 'http://localhost:3000/reviews?id=2';

export default function () {
  http.get(url);
  sleep(1);
}