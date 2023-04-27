const input = `3 3`.split(" ");
const N = +input.shift();
const M = +input.shift();

function dfs(start) {
  const stack = [];
  const visited = new Array(N).fill(false);
  const output = [];
  let checkReturn = false;
  let result = "";
  let recent = Infinity;

  stack.push(start);
  output.push(start + 1);

  while (stack.length) {
    let elem = stack[stack.length - 1];

    if (output.length === M) {
      result += `${output.join(" ")}\n`;
      checkReturn = true;
    }

    if (checkReturn) {
      elem = stack.pop();
      visited[elem] = false;
      output.pop();
    }

    if (!checkReturn && recent === elem) elem = stack.pop();

    for (let i = elem + 1; i < N; i++) {
      if (visited[i]) continue;
      checkReturn = false;
      visited[i] = true;
      output.push(i + 1);
      stack.push(i);
      recent = i;
    }
  }

  return result;
}

const result = dfs(0);
console.log(result);
