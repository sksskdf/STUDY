const input = `5
5
2
3
4
1`.split("\n");

const set = new Set();

input.forEach((e) => set.add(+e));
let result = '';
[...set].sort((a, b) => a - b).forEach((e) => result += e + '\n');
console.log(result.trim());