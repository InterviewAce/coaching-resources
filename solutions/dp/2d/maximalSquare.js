const ZERO = '0';
const ONE = '1';

const getMaxSquareCorneredAt = (
  row,
  col,
  matrix,
  maxSquareLengthCorneredAt,
) => {
  const curPosition = `${row},${col}`;

  const curPositionInCache =
    maxSquareLengthCorneredAt.hasOwnProperty(curPosition);
  if (curPositionInCache) return maxSquareLengthCorneredAt[curPosition];

  const rowInBounds = row >= 0;
  const colInBounds = col >= 0;

  if (!rowInBounds || !colInBounds) return 0;

  const curPositionValue = matrix[row][col];
  if (curPositionValue === ZERO) return 0;

  const maxSquareLengthCorneredAtLeft = getMaxSquareCorneredAt(
    row,
    col - 1,
    matrix,
    maxSquareLengthCorneredAt,
  );
  const maxSquareLengthCorneredAtUp = getMaxSquareCorneredAt(
    row - 1,
    col,
    matrix,
    maxSquareLengthCorneredAt,
  );
  const maxSquareLengthCorneredAtUpLeft = getMaxSquareCorneredAt(
    row - 1,
    col - 1,
    matrix,
    maxSquareLengthCorneredAt,
  );

  const maxSquareLengthCorneredAtCur =
    Math.min(
      maxSquareLengthCorneredAtLeft,
      maxSquareLengthCorneredAtUp,
      maxSquareLengthCorneredAtUpLeft,
    ) + 1;

  maxSquareLengthCorneredAt[curPosition] = maxSquareLengthCorneredAtCur;
  return maxSquareLengthCorneredAt[curPosition];
};

const maximalSquare = (matrix) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  let maxSquareSideLength = 0;

  /*
    We'll say a square is "cornered at" a position if it's bottom-right corner lies on the specified position.
    
    */
  const maxSquareLengthCorneredAt = {};

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const curVal = matrix[row][col];

      if (curVal === ZERO) continue;

      const maxSquareCorneredAtCurPosition = getMaxSquareCorneredAt(
        row,
        col,
        matrix,
        maxSquareLengthCorneredAt,
      );

      maxSquareSideLength = Math.max(
        maxSquareSideLength,
        maxSquareCorneredAtCurPosition,
      );
    }
  }

  const maxSquareArea = maxSquareSideLength ** 2;
  return maxSquareArea;
};
