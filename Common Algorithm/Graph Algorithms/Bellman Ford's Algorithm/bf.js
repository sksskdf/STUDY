class Graph {
    constructor(numVertices) {
      this.V = numVertices;
      this.edges = [];
    }
  
    addEdge(src, dest, weight) {
      this.edges.push([src, dest, weight]);
    }
  
    bellmanFord(startVertex) {
      let dist = new Array(this.V).fill(Infinity);
      dist[startVertex] = 0;
  
      for (let i = 0; i < this.V - 1; i++) {
        for (let [src, dest, weight] of this.edges) {
          if (dist[src] !== Infinity && dist[src] + weight < dist[dest]) {
            dist[dest] = dist[src] + weight;
          }
        }
      }
  
      for (let [src, dest, weight] of this.edges) {
        if (dist[src] !== Infinity && dist[src] + weight < dist[dest]) {
          console.log("there is negative cycle");
          return;
        }
      }
  
      return dist;
    }
  }
  
  const g = new Graph(5);
  g.addEdge(0, 1, -1);
  g.addEdge(0, 2, 4);
  g.addEdge(1, 2, 3);
  g.addEdge(1, 3, 2);
  g.addEdge(1, 4, 2);
  g.addEdge(3, 2, 5);
  g.addEdge(3, 1, 1);
  g.addEdge(4, 3, -3);
  
  console.log(g.bellmanFord(0));