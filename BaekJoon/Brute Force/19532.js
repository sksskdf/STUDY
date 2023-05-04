// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split(' ');
const input = `1 3 -1 4 1 7`.split(" ").map(e => +e);
const [a, b, c, d, e, f] = [...input];

for (let i = -999; i <= 999; i++) {
  for (let j = -999; j <= 999; j++) {
    const conditionA = a * i + b * j === c;
    const conditionB = d * i + e * j === f;
    if (conditionA && conditionB) {
      console.log(`${i}\n${j}`);
      break;
    }
  }
}
