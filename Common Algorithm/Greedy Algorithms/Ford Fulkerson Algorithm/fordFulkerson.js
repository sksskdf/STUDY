function maxFlow(graph, source, sink) {
  let residual = [];
  let max_flow = 0;

  for (let i = 0; i < graph.length; i++) {
    residual.push([]);
    for (let j = 0; j < graph[i].length; j++) {
      residual[i].push(graph[i][j]);
    }
  }

  while (bfs(residual, source, sink)) {
    let path_flow = Infinity;
    let v = sink;

    while (v != source) {
      let u = parents[v];
      path_flow = Math.min(path_flow, residual[u][v]);
      v = u;
    }

    v = sink;
    while (v != source) {
      let u = parents[v];
      residual[u][v] -= path_flow;
      residual[v][u] += path_flow;
      v = u;
    }

    max_flow += path_flow;
  }

  return max_flow;
}

function bfs(residual, source, sink) {
  let visited = new Array(residual.length).fill(false);
  let queue = [];

  queue.push(source);
  visited[source] = true;
  parents[source] = -1;

  while (queue.length > 0) {
    let u = queue.shift();

    for (let v = 0; v < residual.length; v++) {
      if (visited[v] == false && residual[u][v] > 0) {
        queue.push(v);
        parents[v] = u;
        visited[v] = true;
      }
    }
  }

  return visited[sink] == true;
}

let graph = [
  [0, 16, 13, 0, 0, 0],
  [0, 0, 10, 12, 0, 0],
  [0, 4, 0, 0, 14, 0],
  [0, 0, 9, 0, 0, 20],
  [0, 0, 0, 7, 0, 4],
  [0, 0, 0, 0, 0, 0],
];

let source = 0;
let sink = 5;

console.log(maxFlow(graph, source, sink)); // 출력: 23
