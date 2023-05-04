// const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const input = `5 21
5 6 7 8 9`.toString().split('\n');
const [N, targetNumber] = input.shift().split(' ').map(e => +e);
const arr = input.shift().split(' ').map(e => +e);
let result = 0;

function findMaxSum(index, count, sum) {
    if (count === 3) {
        if (sum <= targetNumber && result < sum) result = sum;
        return;
    }
    if (index >= N) return;
    findMaxSum(index + 1, count + 1, sum + arr[index]);
    findMaxSum(index + 1, count, sum);
}

findMaxSum(0, 0, 0);
console.log(result);