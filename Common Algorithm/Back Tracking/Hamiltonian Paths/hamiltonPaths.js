function hamiltonPaths(graph) {
    const n = graph.length;
    const path = [];
  
    function hamiltonRecursive(v) {
      if (path.length === n) {
        return true; // 모든 노드를 다 방문했으므로 true 반환
      }
  
      for (let i = 0; i < n; i++) {
        if (graph[v][i] && !path.includes(i)) { // 방문하지 않은 인접 노드 찾기
          path.push(i);
          if (hamiltonRecursive(i)) {
            return true;
          }
          path.pop();
        }
      }
  
      return false; // 더 이상 방문할 인접 노드가 없으면 false 반환
    }
  
    path.push(0); // 시작 노드를 경로에 추가
    if (hamiltonRecursive(0)) {
      return path; // 해답이 존재하면 경로 반환
    } else {
      return null; // 해답이 존재하지 않으면 null 반환
    }
  }
  
  // 예시 그래프
  const graph = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
  ];
  
  const path = hamiltonPaths(graph);
  if (path) {
    console.log('Hamilton Path:', path);
  } else {
    console.log('No Hamilton Path');
  }