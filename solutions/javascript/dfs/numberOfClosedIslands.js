const LAND = 0;
const WATER = 1;
const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const getPositionString = (row, col) => `${row}, ${col}`;

const getAdjacentPositions = (row, col) => {
    const adjacentPositions = [];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const newRow = row + rowChange;
        const newCol = col + colChange;

        adjacentPositions.push([newRow, newCol]);
    }

    return adjacentPositions;
};

const isInBounds = (grid, row, col) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const rowInBounds = row >= 0 && row < numRows;
    const colInBounds = col >= 0 && col < numCols;

    return rowInBounds && colInBounds;
};

const checkIfIsClosed = (grid, row, col, visited) => {
    // Base case
    if (!isInBounds(grid, row, col)) return false;

    const curPositionString = getPositionString(row, col);
    if (visited.has(curPositionString)) return true;

    if (grid[row][col] !== LAND) return true;

    // Process node
    visited.add(curPositionString);
    let isClosed = true;

    // Recurse on potential neighbors
    const adjacentPositions = getAdjacentPositions(row, col);
    for (const adjacentPosition of adjacentPositions) {
        const [adjacentPositionRow, adjacentPositionCol] = adjacentPosition;

        const remainingIslandPortionIsClosed = checkIfIsClosed(
            grid,
            adjacentPositionRow,
            adjacentPositionCol,
            visited,
        );

        isClosed = isClosed && remainingIslandPortionIsClosed;
    }

    return isClosed;
};

const closedIsland = (grid) => {
    const numRows = grid.length;
    const numCols = grid[0].length;

    let numClosedIslands = 0;
    const visited = new Set();

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const curPositionString = getPositionString(row, col);

            if (visited.has(curPositionString)) continue;
            if (grid[row][col] !== LAND) continue;

            const isClosed = checkIfIsClosed(grid, row, col, visited);

            if (isClosed) numClosedIslands++;
        }
    }

    return numClosedIslands;
};
