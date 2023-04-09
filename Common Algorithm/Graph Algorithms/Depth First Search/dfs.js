class Graph {
  constructor(v) {
    this.adj = new Array(v);
    // for (let i = 0; i < v; i++) this.adj[i] = [];
    this.adj = Array.from({ length: v }, () => []);
    this.visited = new Array(v);
    this.visited.fill(false);
  }

  addEdge(v, w) {
    this.adj[v].push(w);
  }

  DFSUtil(root) {
    this.visited[root] = true;
    console.log(root);

    for (let adjElem of this.adj[root]) {
      if (!this.visited[adjElem]) this.DFSUtil(adjElem);
    }
  }

  DFS(root) {
    this.DFSUtil(root);
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
