const isInBounds = (row, col) => {
    const rowInBounds = row >= 0;
    const colInBounds = col >= 0;

    return rowInBounds && colInBounds;
};

const getNumWaysFromStartToTarget = (targetRow, targetCol) => {
    // Base case
    const isStartPosition = targetRow === 0 && targetCol === 0;
    if (isStartPosition) return 1;

    if (!isInBounds(targetRow, targetCol)) return 0;

    const numWaysFromStartToLeftCell = getNumWaysFromStartToTarget(targetRow, targetCol - 1);
    const numWaysFromStartToUpCell = getNumWaysFromStartToTarget(targetRow - 1, targetCol);

    const numWaysFromStartToTarget = numWaysFromStartToLeftCell + numWaysFromStartToUpCell;

    return numWaysFromStartToTarget;
};

const uniquePaths = (numRows, numCols) => {
    const targetRow = numRows - 1;
    const targetCol = numCols - 1;

    return getNumWaysFromStartToTarget(targetRow, targetCol);
};
