/*
8 8
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBBBWBW
WBWBWBWB
BWBWBWBW
WBWBWBWB
BWBWBWBW
*/
// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `10 13
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
BBBBBBBBWBWBW
BBBBBBBBBWBWB
WWWWWWWWWWBWB
WWWWWWWWWWBWB`.split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((e) => +e);

const pivot1 = [
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
];

const pivot2 = [
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
];

function check2(i, j, arr) {
  let result_w = 0;
  let result_b = 0;

  for (let di = 0; di < 8; di++) {
    for (let dj = 0; dj < 8; dj++) {
      let [ni, nj] = [di + i, dj + j];
      if (arr[ni][nj] !== pivot1[di][dj]) result_w++;
      if (arr[ni][nj] !== pivot2[di][dj]) result_b++;
    }
  }

  return Math.min(result_w, result_b);
}

function check(arr) {
  let result = Infinity;

  for (let i = 0; i < N - 7; i++) {
    for (let j = 0; j < M - 7; j++) {
      result = Math.min(result, check2(i, j, arr));
    }
  }

  return result;
}

console.log(check(input));
