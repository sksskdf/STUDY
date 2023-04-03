class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = new Map();
  }

  addVertex(v) {
    this.adjList.set(v, []);
  }

  addUndirectedEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  addDirectedEdge(v, w) {
    this.adjList.get(v).push(w);
  }

  printGraph() {
    let keys = this.adjList.keys();

    for (let key of keys) {
      const values = this.adjList.get(key).values();
      let txt = "";
      for (let value of values) {
        txt += value + " ";
      }
      console.log(key, "->", txt);
    }
  }
}

const g = new Graph(5);
const vertices = [1, 2, 3, 4, 5];

vertices.forEach((e) => g.addVertex(e));

g.addUndirectedEdge(1, 2);
g.addUndirectedEdge(1, 4);
g.addUndirectedEdge(3, 5);

g.printGraph();