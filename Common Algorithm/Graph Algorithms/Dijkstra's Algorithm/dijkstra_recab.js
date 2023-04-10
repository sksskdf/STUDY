class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    const queueElement = new PriorityQueueElement(item, priority);
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority < priority) {
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
    if (this.isEmpty()) return "underflow";
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class PriorityQueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

function dijkstra(graph, startVertex) {
    
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
