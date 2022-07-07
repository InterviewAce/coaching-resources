const LAND = '1';

const isInBounds = (grid, row, col) => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  if (row < 0 || row >= numRows) return false;
  if (col < 0 || col >= numCols) return false;

  return true;
};

const markWholeIslandAsVisited = (grid, startRow, startCol, visited) => {
  const queue = new Queue();
  queue.enqueue([startRow, startCol]);

  while (queue.size() > 0) {
    // Remove node
    const [row, col] = queue.dequeue();

    // Process node
    if (!isInBounds(grid, row, col)) continue;
    if (grid[row][col] !== LAND) continue; // Note this must come AFTER the isInBounds check

    const coordinates = row + ' ' + col;
    if (visited.has(coordinates)) continue;
    visited.add(coordinates);

    // Add neighbors
    queue.enqueue([row - 1, col]); // up
    queue.enqueue([row + 1, col]); // down
    queue.enqueue([row, col - 1]); // left
    queue.enqueue([row, col + 1]); // right
  }
};

const numIslands = function (grid) {
  const numRows = grid.length;
  if (numRows == 0) return 0;
  const numCols = grid[0].length;

  let numberOfIslands = 0;
  const visited = new Set();

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] != LAND) continue;

      const coordinates = row + ' ' + col;
      if (visited.has(coordinates)) continue;

      numberOfIslands++;
      markWholeIslandAsVisited(grid, row, col, visited);
    }
  }

  return numberOfIslands;
};
