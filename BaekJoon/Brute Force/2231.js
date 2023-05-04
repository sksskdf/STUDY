// const input = +require('fs').readFileSync('/dev/stdin').toString();
const input = +`1423`;

let output = 0;

for (let i = input - 1; i > 0; i--) {
  let length = i.toString().length;
  let result = i;
  for (let j = 0; j < length; j++) {
    result += Number(i.toString()[j]);
  }

  if (result === input) output = i;
}

console.log(output);
