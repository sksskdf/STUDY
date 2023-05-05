// const input = +require('fs').readFileSync('/dev/stdin').toString();
const input = +`11`;

let cnt = 0;
let printed = false;

while (cnt * 3 <= input) {
  const [q, r] = [Math.floor((input - 3 * cnt) / 5), (input - 3 * cnt) % 5];
  if (!r) {
    console.log(cnt + q);
    printed = true;
    break;
  }

  cnt++;
}

if (!printed) console.log(-1);

// cnt -> 1
// input - cnt = 8 / 5 -> 1, 3 -> q, r -> r = 0 -> cnt + q 
