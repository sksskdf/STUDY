function dijkstra(graph, startNode) {
    const distances = {};
    const visited = {};
    const unvisited = {};
  
    for (let node in graph) {
      distances[node] = Infinity;
      unvisited[node] = true;
    }
  
    distances[startNode] = 0;
  
    while (Object.keys(unvisited).length > 0) {
      let currentNode = null;
  
      for (let node in unvisited) {
        if (currentNode === null || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }
  
      for (let neighborNode in graph[currentNode]) {
        let tentativeDistance = distances[currentNode] + graph[currentNode][neighborNode];
        if (tentativeDistance < distances[neighborNode]) {
          distances[neighborNode] = tentativeDistance;
        }
      }
  
      delete unvisited[currentNode];
      visited[currentNode] = true;
    }
  
    return distances;
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