const minPathSumHelper = (grid, row, col, minPathToReach) => {
  const curPosition = `${row}-${col}`;

  const curPositionInMinPathToReach =
    minPathToReach.hasOwnProperty(curPosition);

  if (curPositionInMinPathToReach) return minPathToReach[curPosition];

  if (row < 0 || col < 0) return Infinity;
  if (row === 0 && col === 0) return grid[row][col];

  const up = minPathSumHelper(grid, row - 1, col, minPathToReach);
  const left = minPathSumHelper(grid, row, col - 1, minPathToReach);

  const curPositionNum = grid[row][col];

  minPathToReach[curPosition] = Math.min(up, left) + curPositionNum;

  return minPathToReach[curPosition];
};

const minPathSum = (grid) => {
  const minPathToReach = {};

  const lastRow = grid.length - 1;
  const lastCol = grid[0].length - 1;

  return minPathSumHelper(grid, lastRow, lastCol, minPathToReach);
};
