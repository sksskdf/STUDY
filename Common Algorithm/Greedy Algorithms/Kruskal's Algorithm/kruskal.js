class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adj = new Array(vertices).fill(null).map(() => []);
  }

  addEdge(v, w, weight) {
    this.adj[v].push({ to: w, weight });
    this.adj[w].push({ to: v, weight });
  }
}

class DisjointSet {
  constructor(n) {
    this.parent = new Array(n);
    this.rank = new Array(n);

    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x);
    const py = this.find(y);

    if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else if (this.rank[py] > this.rank[px]) {
      this.parent[px] = py;
    } else {
      this.parent[px] = py;
      this.rank[py]++;
    }
  }
}

function kruskal(graph) {
  const edges = [];

  for (let v = 0; v < graph.V; v++) {
    for (const edge of graph.adj[v]) {
      edges.push([v, edge.to, edge.weight]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const dsu = new DisjointSet(graph.V);
  const result = [];

  for (const [u, v, weight] of edges) {
    if (dsu.find(u) !== dsu.find(v)) {
      dsu.union(u, v);
      result.push([u, v, weight]);
    }
  }

  return result;
}

const graph = new Graph(6);

graph.addEdge(0, 1, 10);
graph.addEdge(0, 2, 6);
graph.addEdge(0, 3, 5);
graph.addEdge(1, 3, 15);
graph.addEdge(2, 3, 4);
graph.addEdge(3, 4, 1);
graph.addEdge(3, 5, 2);

const result = kruskal(graph);

console.log(result); // [ [ 2, 3, 4 ], [ 0, 3, 5 ], [ 0, 1, 10 ] ]
