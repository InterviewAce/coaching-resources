const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const getPositionString = (row, col) => `${row}, ${col}`;

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getLongestPathStartingAt = (matrix, row, col, longestIncreasingPathStartingAt) => {
    // Base cases
    const curPositionString = getPositionString(row, col);
    const curPositionInCache = longestIncreasingPathStartingAt.hasOwnProperty(curPositionString);

    if (curPositionInCache) return longestIncreasingPathStartingAt[curPositionString];

    // Process node
    longestIncreasingPathStartingAt[curPositionString] = 1;

    // Recurse on neighbors
    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(matrix, newRow, newCol)) continue;

        const isIncreasing = matrix[row][col] < matrix[newRow][newCol];
        if (isIncreasing) {
            const pathSizeWithNewPosition =
                1 +
                getLongestPathStartingAt(matrix, newRow, newCol, longestIncreasingPathStartingAt);

            longestIncreasingPathStartingAt[curPositionString] = Math.max(
                longestIncreasingPathStartingAt[curPositionString],
                pathSizeWithNewPosition,
            );
        }
    }

    return longestIncreasingPathStartingAt[curPositionString];
};

const longestIncreasingPath = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    let longestIncreasingPathLength = 0;
    const longestIncreasingPathStartingAt = {};

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            const longestIncreasingPathStartingAtCur = getLongestPathStartingAt(
                matrix,
                row,
                col,
                longestIncreasingPathStartingAt,
            );

            longestIncreasingPathLength = Math.max(
                longestIncreasingPathLength,
                longestIncreasingPathStartingAtCur,
            );
        }
    }

    return longestIncreasingPathLength;
};
