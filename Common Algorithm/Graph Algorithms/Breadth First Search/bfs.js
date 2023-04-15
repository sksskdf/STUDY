class Graph {
  constructor(v) {
    this.V = v;
    this.adj = new Array(v);
    this.adj = Array.from({ length: v }, () => []);
    // this.adj.fill([]);
    // for (let i = 0; i < v; i++) this.adj[i] = [];
  }

  addEdge(v, w) {
    this.adj[v].push(w);
  }

  BFS(s) {
    let visited = new Array(this.V);
    visited.fill(false);

    let queue = [];

    visited[s] = true;
    queue.push(s);

    while (queue.length > 0) {
      s = queue[0];
      console.log(s + " ");
      queue.shift();

      this.adj[s].forEach(adjacent => {
        if (!visited[adjacent]) {
          visited[adjacent] = true;
          queue.push(adjacent);
        }
      });
    }
  }
}

g = new Graph(8);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 1);
g.addEdge(2, 4);
g.addEdge(3, 2);
g.addEdge(4, 3);
g.addEdge(3, 5);
g.addEdge(4, 5);

g.BFS(0);
