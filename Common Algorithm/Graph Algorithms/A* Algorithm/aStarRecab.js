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

function aStar(start, goal, grid) {
  //set start node and goal node
  let currentNode = start;
  let goalNode = goal;

  // check visited of start node
  currentNode.visited = true;

  // initialize openSet array to start node
  let openSet = [currentNode];

  // iterate until openSet is empty
  while (openSet.length > 0) {
    let index = 0;
    // find node which has smallest f value
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[index].f) {
        index = i;
      }
    }

    // remove current node from open set and add to closed set
    currentNode = openSet[index];
    currentNode.closed = true;
    openSet.splice(index, 1);

    // check node is reached to goal
    if (currentNode === goalNode) {
      let path = [];
      let temp = currentNode;

      while (temp.parent) {
        path.push(temp);
        temp = temp.parent;
      }

      return path.reverse();
    }

    //get neighbor nodes from current node
    let neighbors = getNeighbors(currentNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.closed) continue;

      let gScore = currentNode.g + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (gScore >= neighbor.g) {
        continue;
      }

      neighbor.parent = currentNode;
      neighbor.g = gScore;
      neighbor.h = heuristic(neighbor, goalNode);
      neighbor.f = neighbor.g + neighbor.h;
      neighbor.visited = true;
    }
  }

  return null;
}

function heuristic(node1, node2) {
  let dx = Math.abs(node1.x - node2.x);
  let dy = Math.abs(node1.y - node2.y);
  return dx + dy;
}

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

function makeGrid(x, y) {
  let grid = [];

  for (let i = 0; i < x; i++) {
    grid[i] = [];
    for (let j = 0; j < y; j++) {
      grid[i][j] = new Node(i, j, false);
    }
  }

  return grid;
}

function printPath(path) {
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
}

let grid = makeGrid(5, 5);

grid[1][1].wall = true;
grid[1][2].wall = true;
grid[1][3].wall = true;
grid[2][1].wall = true;
grid[2][2].wall = true;
grid[2][4].wall = true;

let start = grid[0][0];
let goal = grid[2][3];

const path = aStar(start, goal, grid);

printPath(path);
