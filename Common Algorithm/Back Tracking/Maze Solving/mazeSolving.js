function solveMaze(maze, startRow, startCol, endRow, endCol) {
    const ROW = maze.length;
    const COL = maze[0].length;
    
    // 방문한 칸을 저장하는 배열
    const visited = new Array(ROW);
    for (let i = 0; i < ROW; i++) {
      visited[i] = new Array(COL).fill(false);
    }
    
    // 시작점을 큐에 넣음
    const queue = [{row: startRow, col: startCol, path: []}];
    visited[startRow][startCol] = true;
    
    while (queue.length > 0) {
      // 큐의 맨 앞에서 부터 하나를 꺼내옴
      const { row, col, path } = queue.shift();
      
      // 도착점에 도달하면 경로를 반환
      if (row === endRow && col === endCol) {
        return path.concat([{row, col}]);
      }
      
      // 현재 위치에서 이동할 수 있는 방향 (상하좌우)
      const directions = [
        { row: -1, col: 0, direction: 'up' },
        { row: 1, col: 0, direction: 'down' },
        { row: 0, col: -1, direction: 'left' },
        { row: 0, col: 1, direction: 'right' }
      ];
      
      for (let i = 0; i < directions.length; i++) {
        const { row: dr, col: dc, direction } = directions[i];
        const newRow = row + dr;
        const newCol = col + dc;
        
        // 미로 범위를 벗어나거나 벽인 경우 skip
        if (newRow < 0 || newRow >= ROW || newCol < 0 || newCol >= COL || maze[newRow][newCol] === 1) {
          continue;
        }
        
        // 이미 방문한 칸인 경우 skip
        if (visited[newRow][newCol]) {
          continue;
        }
        
        // 새로운 칸을 큐에 넣음
        queue.push({ row: newRow, col: newCol, path: path.concat([{row, col, direction}]) });
        visited[newRow][newCol] = true;
      }
    }
    
    // 도착점까지 도달할 수 없는 경우 null 반환
    return null;
  }

  const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0]
  ];
  
  const startRow = 0;
  const startCol = 0;
  const endRow = 4;
  const endCol = 4;
  
  const path = solveMaze(maze, startRow, startCol, endRow, endCol);
  
  if (path === null) {
    console.log('There is no path to the destination.');
  } else {
    console.log('Path:', path);
  }