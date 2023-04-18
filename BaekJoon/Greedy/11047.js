const str = `10 4790
1
5
10
50
100
500
1000
5000
10000
50000`;

const input = str.split("\n");
let [n, k] = input.shift().split(" ");

const mapInput = input.sort((a, b) => b - a).map((e) => +e);
let i = 0;
let count = 0;

while (k > 0) {
  if (k >= mapInput[i]) {
    let tempCount = Math.floor(k / mapInput[i]);
    count += tempCount;
    k -= mapInput[i] * tempCount;
  }

  i++;
}

console.log(count);
