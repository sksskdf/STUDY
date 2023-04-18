const input = `11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14`.split("\n");
input.shift();

const mapInput = input
  .map((e) => e.split(" ").map((e) => +e))
  .sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

let [endTime, count] = [0, 0, 0];

mapInput.forEach((e) => {
  if (e[0] >= endTime) {
    endTime = e[1];
    count++;
  }
});

console.log(count);
