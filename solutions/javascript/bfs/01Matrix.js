/* Single-sourced BFS solution, passes 49/50 test cases on LeetCode. A passing solution can be found later in this file. */

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

class CellDistancePair {
    constructor(row, col, distanceFromStart) {
        this.row = row;
        this.col = col;
        this.distanceFromStart = distanceFromStart;
    }

    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

const create2dArrayOfSize = (numRows, numCols) => {
    const array = new Array(numRows);

    for (let row = 0; row < numRows; row++) {
        array[row] = new Array(numCols);
    }

    return array;
};

const getAdjacentPositions = (row, col) => {
    const adjacentPositions = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const adjacentPositionRow = row + rowChange;
        const adjacentPositionCol = col + colChange;

        adjacentPositions.push([adjacentPositionRow, adjacentPositionCol]);
    }

    return adjacentPositions;
};

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const getNeighborPositions = (matrix, row, col) => {
    const adjacentPositions = getAdjacentPositions(row, col);
    const neighbors = [];

    for (const adjacentPosition of adjacentPositions) {
        const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;

        if (!isInBounds(matrix, adjacentPositionRow, adjacentPositionCol)) continue;

        neighbors.push(adjacentPosition);
    }

    return neighbors;
};

const getDistanceToNearestZero = (matrix, startRow, startCol) => {
    const queue = new Queue();
    const visited = new Set();

    const startCellDistancePair = new CellDistancePair(startRow, startCol, 0);
    queue.enqueue(startCellDistancePair);
    visited.add(startCellDistancePair.getPositionString());

    while (queue.size() > 0) {
        // Remove node
        const { row, col, distanceFromStart } = queue.dequeue();

        // Process node
        const curValue = matrix[row][col];
        if (curValue === 0) return distanceFromStart;

        // Add neighbors
        const neighborPositions = getNeighborPositions(matrix, row, col);
        for (const neighborPosition of neighborPositions) {
            const [neighborRow, neighborCol] = neighborPosition;

            const neighborCellDistancePair = new CellDistancePair(
                neighborRow,
                neighborCol,
                distanceFromStart + 1,
            );

            const neighborPositionString = neighborCellDistancePair.getPositionString();
            if (visited.has(neighborPositionString)) continue;

            visited.add(neighborPositionString);
            queue.enqueue(neighborCellDistancePair);
        }
    }
};

const updateMatrix = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const distanceToNearestZeroGrid = create2dArrayOfSize(numRows, numCols);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const curValue = matrix[row][col];

            let distanceToNearestZero = 0;

            if (curValue === 1) {
                distanceToNearestZero = getDistanceToNearestZero(matrix, row, col);
            }

            distanceToNearestZeroGrid[row][col] = distanceToNearestZero;
        }
    }

    return distanceToNearestZeroGrid;
};

/* Multi-sourced BFS solution, passes on LeetCode */
const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
];

const getLocationString = (location) => {
    const { row, col } = location;

    return `${row}, ${col}`;
};

const getTargetCellLocations = (matrix, targetValue) => {
    const targetCellLocations = [];

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            if (matrix[row][col] === targetValue) {
                targetCellLocations.push({
                    row,
                    col,
                });
            }
        }
    }

    return targetCellLocations;
};

const create2dArrayOfSize = (numRows, numCols, fillValue = undefined) => {
    const array = new Array(numRows);

    for (let row = 0; row < numRows; row += 1) {
        array[row] = new Array(numCols).fill(fillValue);
    }

    return array;
};

const isInBounds = (matrix, row, col) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const isRowInBounds = row >= 0 && row < numRows;
    const isColInBounds = col >= 0 && col < numCols;

    return isRowInBounds && isColInBounds;
};

const getNeighborLocations = (matrix, row, col) => {
    const neighborLocations = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        if (!isInBounds(matrix, newRow, newCol) || matrix[newRow][newCol] === 0) continue;

        neighborLocations.push({ row: newRow, col: newCol });
    }

    return neighborLocations;
};

const updateMatrix = (matrix) => {
    if (matrix.length === 0) return matrix;

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const queue = new Queue();
    const visited = new Set();

    const distanceToNearestZeroMatrix = create2dArrayOfSize(numRows, numCols, 0);
    const zeroCellLocations = getTargetCellLocations(matrix, 0);

    for (const zeroCellLocation of zeroCellLocations) {
        queue.enqueue({
            ...zeroCellLocation,
            distanceFromZero: 0,
        });

        const zeroCellLocationString = getLocationString(zeroCellLocation);
        visited.add(zeroCellLocationString);
    }

    while (queue.size() > 0) {
        // Remove node
        const { row, col, distanceFromZero } = queue.dequeue();

        // Process node
        // We know that we have a 1 that is unvisited, which means we have just found the
        // length of the shortest path to that 1
        distanceToNearestZeroMatrix[row][col] = distanceFromZero;

        // Add neighbors
        const neighborLocations = getNeighborLocations(matrix, row, col);
        for (const neighborLocation of neighborLocations) {
            const neighborLocationString = getLocationString(neighborLocation);

            if (visited.has(neighborLocationString)) continue;
            visited.add(neighborLocationString);

            queue.enqueue({
                ...neighborLocation,
                distanceFromZero: distanceFromZero + 1,
            });
        }
    }

    return distanceToNearestZeroMatrix;
};
