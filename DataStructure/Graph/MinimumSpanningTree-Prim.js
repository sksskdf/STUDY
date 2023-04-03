let graph = [
  [0, 2, 0, 6, 0],
  [2, 0, 3, 8, 5],
  [0, 3, 0, 0, 7],
  [6, 8, 0, 0, 9],
  [0, 5, 7, 9, 0],
];

function primMST(graph) {
  let parent = [];
  let key = [];
  let visited = [];

  for (let i = 0; i < graph.length; i++) {
    key[i] = Infinity;
    visited[i] = false;
  }

  key[0] = 0;
  parent[0] = -1;

  for (let i = 0; i < graph.length - 1; i++) {
    let minKey = Infinity;
    let u;

    for (let j = 0; j < graph.length; j++) {
      if (visited[j] === false && key[j] < minKey) {
        minKey = key[j];
        u = j;
      }
    }

    visited[u] = true;

    for (let v = 0; v < graph.length; v++) {
      if (graph[u][v] !== 0 && visited[v] === false && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }

  for (let i = 1; i < graph.length; i++) {
    console.log(parent[i] + " - " + i + "\t" + graph[i][parent[i]]);
  }
}

primMST(graph);
