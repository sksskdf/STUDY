function aStar(start, end, grid) {
  // 시작 노드와 목적지 노드를 설정합니다.
  let currentNode = start;
  let goalNode = end;

  // 시작 노드를 방문한 것으로 표시합니다.
  start.visited = true;

  // 초기 openSet 배열을 시작 노드로 초기화합니다.
  let openSet = [start];

  // openSet이 빌 때까지 반복합니다.
  while (openSet.length > 0) {
    // 현재 openSet에서 가장 작은 f 값을 가진 노드를 찾습니다.
    let index = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[index].f) {
        index = i;
      }
    }

    // 현재 노드를 openSet에서 삭제하고 closedSet에 추가합니다.
    currentNode = openSet[index];
    currentNode.closed = true;
    openSet.splice(index, 1);

    // 목적지에 도달했는지 확인합니다.
    if (currentNode === goalNode) {
      let path = [];
      let temp = currentNode;
      while (temp.parent) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    // 이웃 노드들을 탐색합니다.
    let neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      // 이미 closedSet에 있는 노드는 건너뜁니다.
      if (neighbor.closed) {
        continue;
      }

      // 이웃 노드와 시작 노드 사이의 거리를 계산합니다.
      let gScore = currentNode.g + 1;

      // 이웃 노드가 openSet에 없으면 추가합니다.
      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (gScore >= neighbor.g) {
        // 이웃 노드의 g 값이 더 크다면 계산할 필요가 없습니다.
        continue;
      }

      // 이웃 노드의 값들을 업데이트합니다.
      neighbor.parent = currentNode;
      neighbor.g = gScore;
      neighbor.h = heuristic(neighbor, goalNode);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.visited = true;
    }
  }

  // 목적지까지 경로가 없으면 null을 반환합니다.
  return null;
}

// 현재 노드의 이웃 노드를 가져오는 함수
function getNeighbors(node, grid) {
  let neighbors = [];
  let x = node.x;
  let y = node.y;

  if (x > 0) {
    neighbors.push(grid[x - 1][y]);
  }
  if (x < grid.length - 1) {
    neighbors.push(grid[x + 1][y]);
  }
  if (y > 0) {
    neighbors.push(grid[x][y - 1]);
  }
  if (y < grid[0].length - 1) {
    neighbors.push(grid[x][y + 1]);
  }

  return neighbors.filter((neighbor) => !neighbor.wall);
}

// 두 노드 사이의 맨해튼 거리를 구하는 함수
function heuristic(node1, node2) {
  let dx = Math.abs(node1.x - node2.x);
  let dy = Math.abs(node1.y - node2.y);
  return dx + dy;
}

// Node 클래스
class Node {
  constructor(x, y, wall) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
    this.wall = wall;
  }
}

// 그리드 생성
let grid = [];
for (let i = 0; i < 5; i++) {
  grid[i] = [];
  for (let j = 0; j < 5; j++) {
    grid[i][j] = new Node(i, j, false);
  }
}

// 벽 추가
grid[1][1].wall = true;
grid[2][2].wall = true;
grid[3][1].wall = true;
grid[4][1].wall = true;
grid[4][3].wall = true;

// 시작 노드와 목적지 노드 설정
let start = grid[0][0];
let end = grid[4][4];

// A* 알고리즘 실행
let path = aStar(start, end, grid);

// 경로 출력
if (path === null) {
  console.log("경로가 없습니다.");
} else {
  let output = "";
  for (let i = 0; i < path.length; i++) {
    output += `(${path[i].x}, ${path[i].y})`;
    if (i < path.length - 1) {
      output += " -> ";
    }
  }
  console.log(output);
}
