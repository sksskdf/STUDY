function fordFulkerson(graph, source, sink) {
  const n = graph.length;
  const residual = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      residual[i][j] = graph[i][j];
    }
  }

  const parent = new Array(n).fill(-1);
  let maxFlow = 0;

  while (bfs(residual, source, sink, parent)) {
    let pathFlow = Infinity;

    for (let v = sink; v != source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, residual[u][v]);
    }

    for (let v = sink; v != source; v = parent[v]) {
      const u = parent[v];
      residual[u][v] -= pathFlow;
      residual[v][u] += pathFlow;
    }

    maxFlow += pathFlow;
  }

  return maxFlow;
}

function bfs(residual, source, sink, parent) {
  const n = residual.length;
  const visited = new Array(n).fill(false);
  const queue = [];

  visited[source] = true;
  queue.push(source);

  while (queue.length > 0) {
    const u = queue.shift();

    for (let v = 0; v < n; v++) {
      if (!visited[v] && residual[u][v] > 0) {
        visited[v] = true;
        parent[v] = u;
        queue.push(v);
      }
    }
  }

  return visited[sink];
}

// 클라이언트 코드
const graph = [
  [0, 16, 13, 0, 0, 0],
  [0, 0, 10, 12, 0, 0],
  [0, 4, 0, 0, 14, 0],
  [0, 0, 9, 0, 0, 20],
  [0, 0, 0, 7, 0, 4],
  [0, 0, 0, 0, 0, 0],
];

const source = 0;
const sink = 5;

console.log(fordFulkerson(graph, source, sink)); // 출력: 23
