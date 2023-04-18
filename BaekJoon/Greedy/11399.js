const input = `5
3 1 4 3 2`.split("\n");

const waitArr = input[1].split(" ").map((e) => +e);

waitArr.sort((a, b) => a - b);

let result = 0;
let resultArr = [];

waitArr.forEach((e) => {
  result += e;
  resultArr.push(result);
});

console.log(resultArr.reduce((acc, cur) => acc + cur));