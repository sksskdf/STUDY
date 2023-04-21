/*4
2 3 1
5 2 4 1 -> 18

4
3 3 4
1 1 1 1 -> 10
*/

const str = `4
3 3 4
1 1 1 1`;

const input = str.split("\n");
const edges = input[1].split(" ").map(BigInt);
const vertices = input[2].split(" ").map(BigInt);

const curPrice = vertices[0];
let result = 0n;

for (let i = 0; i < vertices.length - 1; i++) {
  result += curPrice * edges[i];

  if (vertices[i + 1] < curPrice) curPrice = vertices[i + 1];
}

console.log(String(result));
