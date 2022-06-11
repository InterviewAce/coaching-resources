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
