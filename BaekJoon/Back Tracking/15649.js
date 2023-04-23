const input = `4 4`.split(" ");
const N = Number(input.shift());
const M = Number(input.shift());

const visited = new Array(N).fill(false);
const output = [];
let result = '';

function dfs(cnt) {
    if (cnt === M) {
        result += `${output.join(' ')}\n`;
        return;
    }

    for (let i = 0; i < N; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        output.push(i + 1);
        dfs(cnt + 1);
        output.pop();
        visited[i] =false;
    }
}

dfs(0);
console.log(result.trim());
