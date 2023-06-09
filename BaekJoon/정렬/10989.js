const str = `10
5
2
3
1
4
2
3
5
1
7`;
/*
1
1
2
2
3
3
4
5
5
7
*/
// const [N, ...input] = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(e => +e);
const [N, ...input] = str.split("\n").map((e) => +e);
const checkArr = new Array(N).fill(0);

input.forEach((e, idx) => {
  checkArr[e - 1] += 1;
});

checkArr.forEach((e, idx) => {
  for (let i = 0; i < e; i++) {
    console.log(idx + 1);
  }
});
