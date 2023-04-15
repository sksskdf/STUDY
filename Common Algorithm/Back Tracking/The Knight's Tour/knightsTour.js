function knightsTour(n) {
  const board = new Array(n).fill(null).map(() => new Array(n).fill(null));
  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  function canMove(row, col) {
    if (
      row < 0 ||
      row >= n ||
      col < 0 ||
      col >= n ||
      board[row][col] !== null
    ) {
      return false;
    }
    return true;
  }

  function move(row, col, step) {
    board[row][col] = step;
    if (step === n * n) {
      return true;
    }
    for (let i = 0; i < moves.length; i++) {
      const [r, c] = moves[i];
      const newRow = row + r;
      const newCol = col + c;
      if (canMove(newRow, newCol)) {
        if (move(newRow, newCol, step + 1)) {
          return true;
        }
      }
    }
    board[row][col] = null;
    return false;
  }

  if (move(0, 0, 1)) {
    console.log(board);
  } else {
    console.log("Solution does not exist.");
  }
}

knightsTour(8); // 8x8 체스판에서 나이트 이동경로 구하기

/*
    [ 52, 47, 56, 45, 54,  5, 22, 13 ]
    [ 57, 44, 53, 4, 23, 14, 25, 6 ],
    [ 48, 51, 46, 55, 26, 21, 12, 15 ],
    [ 43, 58, 3, 50, 41, 24, 7, 20 ],
    [ 36, 49, 42, 27, 62, 11, 16, 29 ],
    [ 59,  2, 37, 40, 33, 28, 19,  8 ],
    [ 38, 35, 32, 61, 10, 63, 30, 17 ],
    [ 1, 60, 39, 34, 31, 18,  9, 64 ],
*/