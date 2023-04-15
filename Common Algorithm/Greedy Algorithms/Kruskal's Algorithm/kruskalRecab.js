class Graph {
  constructor(v) {
    this.V = v;
    this.adj = new Array(v).fill().map(() => []);
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
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];
  }

  union(x, y) {
    const px = this.parent[x];
    const py = this.parent[y];

    if (this.rank[px] > this.rank[py]) {
      this.parent[py] = this.parent[px];
    } else if (this.rank[py] > this.rank[px]) {
      this.parent[px] = this.parent[py];
    } else {
      this.parent[px] = this.parent[py];
      this.rank[py]++;
    }
  }
}

function kruskal(graph) {
  let edges = [];

  for (let i = 0; i < graph.V; i++) {
    for (let edge of graph.adj[i]) {
      edges.push([i, edge.to, edge.weight]);
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

const graph = new Graph(5);

graph.addEdge(0, 1, 1);
graph.addEdge(0, 2, 2);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 4);
graph.addEdge(2, 4, 6);
graph.addEdge(3, 4, 5);

console.log(kruskal(graph));
