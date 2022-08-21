const RIGHT = 0;

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]; // Note that the order of this array DOES matter for this problem

const getPositionString = (row, col) => `${row}, ${col}`;

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const areSamePosition = (rowOne, colOne, rowTwo, colTwo) =>
    rowOne === rowTwo && colOne === colTwo;

const moveUntilHitVisitedOrOob = (
    matrix,
    startRow,
    startCol,
    curDirectionIdx,
    visited,
    elementsInSpiralOrder,
) => {
    const direction = directions[curDirectionIdx];

    let row = startRow;
    let col = startCol;

    const [rowChange, colChange] = directions[curDirectionIdx];

    while (
        isInBounds(matrix, row + rowChange, col + colChange) &&
        !visited.has(getPositionString(row + rowChange, col + colChange))
    ) {
        row += rowChange;
        col += colChange;

        elementsInSpiralOrder.push(matrix[row][col]);
        visited.add(getPositionString(row, col));
    }

    return [row, col];
};

const getNextDirectionIdx = (curDirectionIdx) => {
    const numDirections = directions.length;

    // If we go past the length of the array, then we should wrap around and go to the beginning of the array
    return (curDirectionIdx + 1) % numDirections;
};

const spiralOrder = (matrix) => {
    const elementsInSpiralOrder = [];
    const visited = new Set();

    let curDirectionIdx = RIGHT;

    let curRow = 0;
    let curCol = 0;

    elementsInSpiralOrder.push(matrix[curRow][curCol]);
    visited.add(getPositionString(curRow, curCol));

    let numTimesAtCurPosition = 0;

    // If we try all 4 directions and stay at the same spot, then we know that we're done
    while (numTimesAtCurPosition !== directions.length) {
        const [newRow, newCol] = moveUntilHitVisitedOrOob(
            matrix,
            curRow,
            curCol,
            curDirectionIdx,
            visited,
            elementsInSpiralOrder,
        );

        if (areSamePosition(curRow, curCol, newRow, newCol)) {
            numTimesAtCurPosition += 1;
        } else {
            numTimesAtCurPosition = 0;
        }

        curDirectionIdx = getNextDirectionIdx(curDirectionIdx);

        curRow = newRow;
        curCol = newCol;
    }

    return elementsInSpiralOrder;
};
