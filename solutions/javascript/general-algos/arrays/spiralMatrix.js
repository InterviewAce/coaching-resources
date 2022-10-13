/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
];

const RIGHT = 0;

const getPositionString = (row, col) => `${row}, ${col}`;

const getNextDirectionIdx = (directionIdx) => {
    const numDirections = directions.length;
    
    return (directionIdx + 1) % numDirections;
};

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    const isRowInBounds = row >= 0 && row < numRows;
    const isColInBounds = col >= 0 && col < numCols;
    
    return isRowInBounds && isColInBounds;
};

const moveUntilHitVisitedOrOob = (
    matrix,
    startRow,
    startCol,
    curDirectionIdx,
    visited,
    elementsInSpiralOrder,
) => {
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

const spiralOrder = (matrix) => {
    const elementsInSpiralOrder = [];
    const visited = new Set();
    
    let curRow = 0;
    let curCol = 0;
    
    let curDirectionIdx = RIGHT;
    
    elementsInSpiralOrder.push(matrix[curRow][curCol]);
    visited.add(getPositionString(curRow, curCol));
    
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const numElementsInMatrix = numRows * numCols;
    while (visited.size < numElementsInMatrix) {
        const [newRow, newCol] = moveUntilHitVisitedOrOob(
            matrix,
            curRow,
            curCol,
            curDirectionIdx,
            visited,
            elementsInSpiralOrder,
        );
        
        curDirectionIdx = getNextDirectionIdx(curDirectionIdx);
        
        curRow = newRow;
        curCol = newCol;
    }
    
    return elementsInSpiralOrder;
};