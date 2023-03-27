const input = "77 7777 7";

const result = input.split(' ')
    .map(e => +e)
    .reduce((acc, cur) => acc + cur);

console.log(result);

