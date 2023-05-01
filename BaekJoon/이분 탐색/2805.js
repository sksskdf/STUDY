// const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const input = `5 20
4 42 40 26 46`.split("\n");
const [N, M] = input
  .shift()
  .split(" ")
  .map((e) => +e);
const heights = input
  .shift()
  .split(" ")
  .map((e) => +e);

let sum = heights.reduce((acc, height) => acc + height);
let avg = Math.floor(sum / N);

heights.sort((a, b) => b - a);
let max = 0;
while (true) {
  let newSum = 0;
  for (let i = 0; i < N; i++) {
    if (heights[i] <= avg) break;
    newSum += heights[i] - avg;
  }

  if (newSum === M) break;

  if (newSum > M) {
    max = avg;
    avg *= 2;
  } else {
    avg = max + Math.floor(max / 2);
    max--;
  }
}

console.log(avg);