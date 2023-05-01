// const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const input = `5 3
1 2 3 1 2`.split("\n");
const [N, M] = input
  .shift()
  .split(" ")
  .map((e) => +e);
const arr = input
  .shift()
  .split(" ")
  .map((e) => +e);

const modularArr = arr.map((e) => e % M);
let cnt = modularArr.filter((e) => e === 0).length;
let recent = modularArr[0];
for (let i = 0; i < N; i++) {
    recent = modularArr[i] % M;

    if (recent === 0) cnt++;
}