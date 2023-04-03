class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjMatrix = Array(vertices)
      .fill()
      .map(() => Array(vertices).fill(0));
  }

  addUndirectedEdge(v, w) {
    this.adjMatrix[v][w] = 1;
    this.adjMatrix[w][v] = 1;
  }

  addDirectedEdge(v, w) {
    this.adjMatrix[v][w] = 1;
  }

  printGraph() {
    for (let adjList of this.adjMatrix) {
      console.log(adjList);
    }
  }
}

let g = new Graph(5);

g.addUndirectedEdge(0, 1);
g.addUndirectedEdge(0, 2);
g.addUndirectedEdge(3, 4);

g.printGraph();