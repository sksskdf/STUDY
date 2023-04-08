class Graph {
  constructor(v) {
    this.V = v;
    this.adj = new Array(v);
    for (let i = 0; i < v; i++) this.adj[i] = [];
  }

  addEdge(v, w) {
    this.adj[v].push(w);
  }

  DFSUtil(v, visited) {
    visited[v] = true;
    console.log(v + " ");

    for (let i of this.adj[v].values()) {
      let n = i;
      if (!visited[n]) this.DFSUtil(n, visited);
    }
  }

  DFS(v) {
    let visited = new Array(this.V);
    for (let i = 0; i < this.V; i++) visited[i] = false;

    this.DFSUtil(v, visited);
  }
}

g = new Graph(8);

g.addEdge(0, 1);
g.addEdge(0, 3);
g.addEdge(0, 4);
g.addEdge(3, 2);
g.addEdge(2, 5);
g.addEdge(2, 7);
g.addEdge(7, 6);
g.addEdge(6, 1);

g.DFS(0);
