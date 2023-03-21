class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = new Map();
  }

  addVertex(v) {
    this.adjList.set(v, []);
  }

  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
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

g.addEdge(1, 2);
g.addEdge(1, 4);
g.addEdge(3, 5);

g.printGraph();
