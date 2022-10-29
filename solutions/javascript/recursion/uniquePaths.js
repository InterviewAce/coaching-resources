/*
Approach 1:
*/
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

/*
Approach 2:
*Note: this approach pretty much does the same thing as approach 1, the code is just
structured differently.
*/
const getNumWaysToGetFromPositionToTarget = (curPosition, targetPosition) => {
    const { row: curPositionRow, col: curPositionCol } = curPosition;
    const { row: targetRow, col: targetCol } = targetPosition;

    const isInBounds = curPositionRow <= targetRow && curPositionCol <= targetCol;
    if (!isInBounds) return 0;

    const isTargetPosition = curPositionRow === targetRow && curPositionCol === targetCol;
    if (isTargetPosition) return 1;

    const downPosition = {
        row: curPositionRow + 1,
        col: curPositionCol,
    };

    const rightPosition = {
        row: curPositionRow,
        col: curPositionCol + 1,
    };

    const numWaysFromDownPositionToTarget = getNumWaysToGetFromPositionToTarget(
        downPosition,
        targetPosition,
    );
    const numWaysFromRightPositionToTarget = getNumWaysToGetFromPositionToTarget(
        rightPosition,
        targetPosition,
    );

    const numWaysFromCurPositionToTarget =
        numWaysFromDownPositionToTarget + numWaysFromRightPositionToTarget;
    return numWaysFromCurPositionToTarget;
};

const uniquePaths = (numRows, numCols) => {
    const startPosition = {
        row: 0,
        col: 0,
    };

    const targetPosition = {
        row: numRows - 1,
        col: numCols - 1,
    };

    return getNumWaysToGetFromPositionToTarget(startPosition, targetPosition);
};
