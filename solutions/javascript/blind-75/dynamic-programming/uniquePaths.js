/*
Recursion with memoization
*/
const getMinPathsToPosition = (row, col, uniquePathsToPosition) => {
  const key = `${row}-${col}`;

  const keyInCache = uniquePathsToPosition.hasOwnProperty(key);

  if (keyInCache) return uniquePathsToPosition[key];

  const isAtStart = row === 0 && col === 0;
  const isOutOfBounds = row < 0 || col < 0;

  if (isAtStart) return 1;
  if (isOutOfBounds) return 0;

  const numWaysToReachLeft = getMinPathsToPosition(
    row,
    col - 1,
    uniquePathsToPosition,
  );
  const numWaysToReachUp = getMinPathsToPosition(
    row - 1,
    col,
    uniquePathsToPosition,
  );

  uniquePathsToPosition[key] = numWaysToReachLeft + numWaysToReachUp;
  return uniquePathsToPosition[key];
};

const uniquePaths = (numRows, numCols) => {
  const lastRow = numRows - 1;
  const lastCol = numCols - 1;

  const uniquePathsToPosition = {};

  return getMinPathsToPosition(lastRow, lastCol, uniquePathsToPosition);
};

/*
Tabulation
*/
const INVALID_INPUT = -1;

const createArrayOfSize = (numRows, numCols, fillValue) => {
  const array = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    array[i] = new Array(numCols).fill(fillValue);
  }

  return array;
};

const uniquePaths = (m, n) => {
  const numRows = m;
  const numCols = n;

  if (numRows === 0 || numCols === 0) return INVALID_INPUT;

  const numPathsFromStartToPosition = createArrayOfSize(numRows, numCols, 0);

  for (let row = 0; row < numRows; row++) {
    numPathsFromStartToPosition[row][0] = 1;
  }

  for (let col = 0; col < numCols; col++) {
    numPathsFromStartToPosition[0][col] = 1;
  }

  for (let row = 1; row < numRows; row++) {
    for (let col = 1; col < numCols; col++) {
      const numPathsToLeftNeighbor = numPathsFromStartToPosition[row][col - 1];
      const numPathsToUpNeighbor = numPathsFromStartToPosition[row - 1][col];

      const numPathsToCurPosition =
        numPathsToLeftNeighbor + numPathsToUpNeighbor;

      numPathsFromStartToPosition[row][col] = numPathsToCurPosition;
    }
  }

  const numWaysToReachEnd =
    numPathsFromStartToPosition[numRows - 1][numCols - 1];

  return numWaysToReachEnd;
};
