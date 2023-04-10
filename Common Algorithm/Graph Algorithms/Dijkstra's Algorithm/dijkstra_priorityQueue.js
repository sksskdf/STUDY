class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    const queueElement = new QueueElement(item, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        this.items.splice(i, 0, queueElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

function dijkstra(graph, start) {
  const dist = {};
  const visited = {};
  const pq = new PriorityQueue();

  for (let node in graph) {
    dist[node] = Infinity;
    visited[node] = false;
  }

  dist[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const u = pq.dequeue().element;

    if (!visited[u]) {
      visited[u] = true;

      for (let v in graph[u]) {
        if (graph[u][v] !== 0 && !visited[v]) {
          const alt = dist[u] + graph[u][v];
          if (alt < dist[v]) {
            dist[v] = alt;
            pq.enqueue(v, dist[v]);
          }
        }
      }
    }
  }

  return dist;
}

const graph = {
  A: { B: 2, C: 1 },
  B: { A: 2, D: 3, E: 2 },
  C: { A: 1, F: 3 },
  D: { B: 3, E: 1 },
  E: { B: 2, D: 1, F: 2 },
  F: { C: 3, E: 2 },
};

const startNode = "A";

const shortestDistances = dijkstra(graph, startNode);

console.log(shortestDistances);
