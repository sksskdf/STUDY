class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Map();
  }

  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  bfs(startingNode) {
    let visited = {};
    let queue = [];

    visited[startingNode] = true;
    queue.push(startingNode);

    while (queue.length !== 0) {
      let currentVertex = queue.shift();
      let neighbors = this.adjList.get(currentVertex);

      for (let neighbor of neighbors) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }

    return this.vertices.filter(v => visited[v]);
  }
}

const g = new Graph();

g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);

g.addEdge(1, 3);
g.addEdge(2, 4);
g.addEdge(2, 5);
g.addEdge(3, 6);

console.log(g.bfs(1));