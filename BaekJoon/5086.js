//const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const input = `8 16
32 4
17 5
0 0`.split("\n");
input.pop();
for (let i = 0; i < input.length; i++) {
  const [a, b] = input[i]
    .split(" ")
    .map((e) => +e);
  let result = "";
  if (b % a === 0) result = "factor";
  else if (a % b === 0) result = "multiple";
  else result = "neither";

  console.log(result);
}
