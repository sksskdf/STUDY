function solveNQueens(n) {
  const cols = new Set();
  const diagonal1 = new Set();
  const diagonal2 = new Set();
  const result = [];

  function backtrack(row, path) {
    if (row === n) {
      result.push(path);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        cols.has(col) ||
        diagonal1.has(row + col) ||
        diagonal2.has(row - col)
      ) {
        continue;
      }

      cols.add(col);
      diagonal1.add(row + col);
      diagonal2.add(row - col);

      backtrack(row + 1, path.concat([col]));

      cols.delete(col);
      diagonal1.delete(row + col);
      diagonal2.delete(row - col);
    }
  }

  backtrack(0, []);

  return result;
}

const n = 4;
const solutions = solveNQueens(n);

console.log(`Solutions for ${n}-Queen Problem:`);
for (let i = 0; i < solutions.length; i++) {
  const solution = solutions[i];
  console.log(`Solution ${i + 1}:`);
  for (let row = 0; row < n; row++) {
    let rowString = "";
    for (let col = 0; col < n; col++) {
      rowString += solution[row] === col ? "Q" : ".";
    }
    console.log(rowString);
  }
}
