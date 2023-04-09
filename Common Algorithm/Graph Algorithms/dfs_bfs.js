class Graph {
  constructor(vertexNumber) {
    this.v = vertexNumber;
    this.adj = Array.from({ length: vertexNumber }, () => []);
    this.visited = new Array(vertexNumber).fill(false);
  }

  addEdge(u, v) {
    this.adj[u].push(v);
  }

  dfs(vertex) {
    this.visited.fill(false);
    this.dfsUtil(vertex);
  }

  dfsUtil(vertex) {
    this.visited[vertex] = true;
    console.log(vertex);

    for (let adj of this.adj[vertex]) {
      if (!this.visited[adj]) this.dfsUtil(adj);
    }
  }

  bfs(vertex) {
    this.visited.fill(false);

    const vertexQueue = [];
    this.visited[vertex] = true;
    vertexQueue.push(vertex);

    while (vertexQueue.length > 0) {
        vertex = vertexQueue.shift();
        console.log(vertex);

        for (let adj of this.adj[vertex]) {
            if (!this.visited[adj]) {
                this.visited[adj] = true;
                vertexQueue.push(adj)
            }
        }
    }
  }
}

const g = new Graph(8);

g.addEdge(0, 1);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(4, 6);
g.addEdge(1, 2);
g.addEdge(0, 3);

g.dfs(0);
console.log('------------------');
g.bfs(0);