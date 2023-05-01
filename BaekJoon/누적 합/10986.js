function accSum(arr) {
  let cnt = 0;
  //find the acc arr
  const modularArr = new Array(M).fill(0);
  let remainder = 0;

  for (let i = 0; i < arr.length; i++) {
    remainder = (remainder + arr[i]) % M;
    cnt += modularArr[remainder];
    if (remainder === 0) {
      cnt++;
    }

    modularArr[remainder]++;
  }

  return cnt;
}

const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `5 3
// 1 2 3 1 2`.split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((e) => +e);
const arr = input
  .shift()
  .split(" ")
  .map((e) => +e);

const result = accSum(arr);
console.log(result);
