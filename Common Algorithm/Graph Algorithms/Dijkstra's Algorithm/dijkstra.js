class PriorityQueue {
    constructor() {
      this.elements = [];
    }
  
    enqueue(item, priority) {
      this.elements.push({ item, priority });
    }
  
    dequeue() {
      return this.elements.shift();
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  }
  
  class Graph {
    constructor(vertexNumber) {
      this.v = vertexNumber;
      this.adj = Array.from({ length: vertexNumber }, () => []);
    }
  
    addEdge(u, v, w) {
      this.adj[u].push({ v, w });
      this.adj[v].push({ v: u, w });
    }
  
    dijkstra(start) {
      const pq = new PriorityQueue();
      const dist = new Array(this.v).fill(Infinity);
  
      pq.enqueue(start, 0);
      dist[start] = 0;
  
      while (!pq.isEmpty()) {
        const { item: vertex, priority: distance } = pq.dequeue();
  
        for (const { v: adjVertex, w: weight } of this.adj[vertex]) {
          const newDistance = dist[vertex] + weight;
          if (newDistance < dist[adjVertex]) {
            dist[adjVertex] = newDistance;
            pq.enqueue(adjVertex, newDistance);
          }
        }
      }
  
      return dist;
    }
  }
  
  const g = new Graph(8);
  
  g.addEdge(0, 1, 4);
  g.addEdge(0, 2, 3);
  g.addEdge(1, 3, 2);
  g.addEdge(1, 4, 3);
  g.addEdge(2, 5, 5);
  g.addEdge(2, 6, 4);
  g.addEdge(4, 7, 2);
  g.addEdge(5, 7, 1);
  g.addEdge(6, 7, 3);
  
  console.log(g.dijkstra(0)); // [0, 4, 3, 6, 7, 8, 7, 9]