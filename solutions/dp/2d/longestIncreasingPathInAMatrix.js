const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getLongestPathStartingAt = (
  row,
  col,
  matrix,
  longestIncreasingPathStartingAt,
) => {
  const curPosition = `${row},${col}`;

  const curPositionInCache =
    longestIncreasingPathStartingAt.hasOwnProperty(curPosition);
  if (curPositionInCache) return longestIncreasingPathStartingAt[curPosition];

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const curPositionValue = matrix[row][col];
  longestIncreasingPathStartingAt[curPosition] = 1;

  for (const direction of directions) {
    const [rowChange, colChange] = direction;

    const newRow = row + rowChange;
    const newCol = col + colChange;

    // Validate positions
    const newRowInBounds = newRow >= 0 && newRow < numRows;
    const newColInBounds = newCol >= 0 && newCol < numCols;

    if (!newRowInBounds || !newColInBounds) continue;

    const newPositionValue = matrix[newRow][newCol];
    const newPositionGreaterThanCur = newPositionValue > curPositionValue;

    if (newPositionGreaterThanCur) {
      const pathSizeWithNewPosition =
        1 +
        getLongestPathStartingAt(
          newRow,
          newCol,
          matrix,
          longestIncreasingPathStartingAt,
        );

      longestIncreasingPathStartingAt[curPosition] = Math.max(
        longestIncreasingPathStartingAt[curPosition],
        pathSizeWithNewPosition,
      );
    }
  }

  return longestIncreasingPathStartingAt[curPosition];
};

const longestIncreasingPath = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const longestIncreasingPathStartingAt = {};

  let longestIncreasingPathSize = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const longestPathStartingAtCur = getLongestPathStartingAt(
        row,
        col,
        matrix,
        longestIncreasingPathStartingAt,
      );

      longestIncreasingPathSize = Math.max(
        longestIncreasingPathSize,
        longestPathStartingAtCur,
      );
    }
  }

  return longestIncreasingPathSize;
};
