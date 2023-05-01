// const input = `5 20
// 4 42 40 26 46`
//   .toString()
//   .trim()
//   .split("\n");
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((e) => +e);
const heights = input
  .shift()
  .split(" ")
  .map((e) => +e);

let min = 0;
let max = heights.sort((a, b) => b - a)[0];
let answer = 0;

while (min <= max) {
  let mid = Math.floor((min + max) / 2);
  let sum = heights
    .filter((e) => e - mid > 0)
    .map((e) => e - mid)
    .reduce((acc, sum) => acc + sum);

  if (sum >= M) {
    if (mid > answer) answer = mid;
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}
console.log(max);